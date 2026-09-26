import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, mkdir, readFile, readdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { once } from 'node:events';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { createServer, loadConfiguration } from './server.mjs';
import { onRequest } from './functions/api/overview.js';

const frontendRoot = path.dirname(fileURLToPath(import.meta.url));
const runFile = promisify(execFile);
const online = { code: 0, checkedAt: '2026-09-26T10:00:00Z', data: [{ name: '起床战争', online: 123 }] };
const status = { code: 0, data: { nodeStarted: true, interceptorStarted: true, nodeExitCode: null, account: { token: 'private-account-token' }, nodeLastOutput: 'private-raw-output', server: { name: '测试服务器', token: 'private-server-token' } } };

async function temporaryDirectory(t) {
  const directory = await mkdtemp(path.join(tmpdir(), 'independent-dashboard-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

async function listen(t, server) {
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => {
    server.closeAllConnections();
    return new Promise(resolve => server.close(resolve));
  });
  return `http://127.0.0.1:${server.address().port}`;
}

async function upstreamServer(t, { fail = false } = {}) {
  const requests = [];
  const base = await listen(t, http.createServer((request, response) => {
    requests.push({ path: request.url, method: request.method });
    if (fail) {
      response.writeHead(500, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ error: 'private-upstream-error' }));
      return;
    }
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify(request.url.endsWith('/online') ? online : status));
  }));
  return { base, requests };
}

test('configuration loads only the supplied frontend directory and environment overrides its .env', async t => {
  const parent = await temporaryDirectory(t);
  const root = path.join(parent, 'Frontend');
  await mkdir(root);
  await writeFile(path.join(parent, '.env'), 'API_URL=https://private-parent.example\nPARENT_SECRET=private-parent-secret\n');
  await writeFile(path.join(root, '.env'), '# local settings\nAPI_URL="https://file.example/prefix"\nSERVER_NAME="我的服务器"\nPORT=5173\n');

  const fromFile = await loadConfiguration({ root, environment: {} });
  assert.deepEqual(fromFile, { API_URL: 'https://file.example/prefix', SERVER_NAME: '我的服务器', PORT: '5173' });
  const overridden = await loadConfiguration({ root, environment: { API_URL: 'https://environment.example', PORT: '6123' } });
  assert.equal(overridden.API_URL, 'https://environment.example');
  assert.equal(overridden.PORT, '6123');
  assert.equal(overridden.SERVER_NAME, '我的服务器');
  assert.equal(Object.hasOwn(overridden, 'PARENT_SECRET'), false);

  await rm(path.join(root, '.env'));
  assert.deepEqual(await loadConfiguration({ root, environment: {} }), {});
  assert.deepEqual(await loadConfiguration({ root, environment: { SERVER_NAME: '环境配置' } }), { SERVER_NAME: '环境配置' });
});

test('local frontend reaches configured API_URL with its prefix and only returns display fields', async t => {
  const upstream = await upstreamServer(t);
  const base = await listen(t, createServer({ env: { API_URL: `${upstream.base}/collector/v1/`, SERVER_NAME: '独立前端', POLL_INTERVAL_MINUTES: '8' } }));
  const response = await fetch(`${base}/api/overview`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match(response.headers.get('content-type'), /application\/json/);
  const result = await response.json();
  assert.equal(result.source, 'live');
  assert.equal(result.server.name, '独立前端');
  assert.equal(result.pollIntervalMinutes, 8);
  assert.equal(result.modes[0].id, 'red_bed');
  assert.equal(result.summary.totalOnline, 123);
  assert.equal(result.status.collectorRunning, true);
  assert.equal(JSON.stringify(result).includes('private-'), false);
  assert.deepEqual(upstream.requests, [
    { path: '/collector/v1/online', method: 'GET' },
    { path: '/collector/v1/status', method: 'GET' },
  ]);
});

test('static routes never expose .env, source files, collector data, or traversal paths', async t => {
  const root = await temporaryDirectory(t);
  const publicDirectory = path.join(root, 'public');
  await mkdir(path.join(publicDirectory, 'assets'), { recursive: true });
  await writeFile(path.join(publicDirectory, 'index.html'), '<!doctype html><title>Independent Dashboard</title>');
  await writeFile(path.join(publicDirectory, 'assets', 'icon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  // Fixtures deliberately place forbidden files even inside public/.
  for (const name of ['.env', 'account.txt', 'online.json', 'server.mjs', 'config.json']) {
    await writeFile(path.join(publicDirectory, name), `private-${name}`);
    await writeFile(path.join(root, name), `private-parent-${name}`);
  }
  const base = await listen(t, createServer({ publicDirectory }));
  const home = await fetch(base);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Independent Dashboard/);
  assert.equal((await fetch(`${base}/assets/icon.svg`)).status, 200);
  for (const requestPath of ['/.env', '/account.txt', '/online.json', '/config.json', '/server.mjs', '/api/overview.mjs', '/../account.txt', '/assets/%2e%2e%2faccount.txt', '/assets/%2e%2e%5caccount.txt']) {
    const response = await fetch(`${base}${requestPath}`);
    assert.equal(response.status, 404, requestPath);
    assert.equal((await response.text()).includes('private-'), false);
  }
});

test('missing or invalid API_URL returns a fixed 503 response without echoing configuration', async t => {
  for (const env of [{}, { API_URL: 'https://user:private-password@example.test' }]) {
    const base = await listen(t, createServer({ env }));
    const response = await fetch(`${base}/api/overview`);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: '尚未正确配置 API_URL，请联系看板管理员。',
      code: 'CONFIGURATION_ERROR',
    });
    const head = await fetch(`${base}/api/overview`, { method: 'HEAD' });
    assert.equal(head.status, 503);
    assert.equal(await head.text(), '');
  }
});

test('upstream failures produce a fixed 502 error and HEAD has no response body', async t => {
  const upstream = await upstreamServer(t, { fail: true });
  const base = await listen(t, createServer({ env: { API_URL: upstream.base } }));
  const response = await fetch(`${base}/api/overview`);
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {
    error: '暂时无法连接采集接口，请稍后刷新。',
    code: 'UPSTREAM_UNAVAILABLE',
  });
  const head = await fetch(`${base}/api/overview`, { method: 'HEAD' });
  assert.equal(head.status, 502);
  assert.equal(await head.text(), '');
});

test('read-only methods work consistently for API and static pages', async t => {
  const upstream = await upstreamServer(t);
  const base = await listen(t, createServer({ env: { API_URL: upstream.base } }));
  for (const route of ['/api/overview', '/']) {
    const head = await fetch(`${base}${route}`, { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), '');
    const before = upstream.requests.length;
    for (const method of ['POST', 'PUT', 'DELETE', 'OPTIONS']) {
      const response = await fetch(`${base}${route}`, { method });
      assert.equal(response.status, 405);
      assert.equal(response.headers.get('allow'), 'GET, HEAD');
    }
    assert.equal(upstream.requests.length, before, 'non-reading methods must not reach the backend');
  }
});

test('Cloudflare Pages entry uses context.env and shares the same safe response contract', async t => {
  const upstream = await upstreamServer(t);
  const result = await onRequest({
    request: new Request('https://dashboard.example.test/api/overview'),
    env: { API_URL: `${upstream.base}/edge`, SERVER_NAME: 'Cloudflare 看板', POLL_INTERVAL_MINUTES: '12' },
  });
  assert.equal(result.status, 200);
  const body = await result.json();
  assert.equal(body.server.name, 'Cloudflare 看板');
  assert.equal(body.pollIntervalMinutes, 12);
  assert.equal(body.summary.totalOnline, 123);
  assert.equal(JSON.stringify(body).includes('private-'), false);
  assert.deepEqual(upstream.requests.map(request => request.path), ['/edge/online', '/edge/status']);

  const unconfigured = await onRequest({ request: new Request('https://dashboard.example.test/api/overview'), env: {} });
  assert.equal(unconfigured.status, 503);
  const denied = await onRequest({ request: new Request('https://dashboard.example.test/api/overview', { method: 'POST' }), env: {} });
  assert.equal(denied.status, 405);

  // Follow actual imports to ensure the deployed graph needs no Node APIs.
  const visited = new Set();
  async function inspectModule(filename) {
    if (visited.has(filename)) return;
    visited.add(filename);
    const source = await readFile(filename, 'utf8');
    assert.doesNotMatch(source, /\b(?:process|Buffer|__dirname|require)\b/, filename);
    for (const match of source.matchAll(/\bimport\s+(?:[^;]+?\s+from\s+)?['"]([^'"]+)['"]/g)) {
      assert.ok(match[1].startsWith('.'), `edge dependency must be local: ${match[1]}`);
      await inspectModule(path.resolve(path.dirname(filename), match[1]));
    }
  }
  await inspectModule(path.join(frontendRoot, 'functions', 'api', 'overview.js'));
  assert.equal(visited.size, 4);
});

test('a standalone copied frontend builds without parent files and publishes only intended public assets', async t => {
  const parent = await temporaryDirectory(t);
  const isolatedRoot = path.join(parent, 'standalone');
  await mkdir(isolatedRoot);
  // Copy only known source paths, never this workspace's .env, dist, or collector data.
  const sourceEntries = ['api', 'functions', 'public', 'scripts', 'server.mjs', 'package.json', 'wrangler.jsonc'];
  await Promise.all(sourceEntries.map(entry => cp(path.join(frontendRoot, entry), path.join(isolatedRoot, entry), { recursive: true })));
  await writeFile(path.join(isolatedRoot, '.env'), 'API_URL=https://private-build-api.example.test/secret-prefix\n');
  await writeFile(path.join(parent, 'account.txt'), 'private-parent-account');
  await writeFile(path.join(isolatedRoot, 'public', 'account.txt'), 'private-accidental-public-file');
  await mkdir(path.join(isolatedRoot, 'dist'));
  await writeFile(path.join(isolatedRoot, 'dist', 'stale-secret.txt'), 'private-old-build');

  const result = await runFile(process.execPath, [path.join(isolatedRoot, 'scripts', 'build.mjs')], { cwd: parent });
  assert.match(result.stdout, /dist/);
  const output = path.join(isolatedRoot, 'dist');
  assert.deepEqual((await readdir(output)).sort(), ['_headers', '_routes.json', 'app.js', 'assets', 'index.html', 'styles.css']);
  async function inspectOutput(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) await inspectOutput(filename);
      else assert.doesNotMatch(await readFile(filename, 'utf8'), /private-build-api|secret-prefix|private-parent-account|private-accidental-public-file|private-old-build/);
    }
  }
  await inspectOutput(output);
  assert.deepEqual(JSON.parse(await readFile(path.join(output, '_routes.json'), 'utf8')), { version: 1, include: ['/api/*'], exclude: [] });
});
