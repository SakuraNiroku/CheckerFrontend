import test from 'node:test';
import assert from 'node:assert/strict';
import { getOverview, OverviewError } from './overview.mjs';
import { MODE_METADATA } from './mode-metadata.mjs';

const apiUrl = 'https://api.example.test';
const online = { code: 0, checkedAt: '2026-09-26T10:00:00Z', data: [{ name: '新玩法', online: 123 }] };
const status = { code: 0, data: { nodeStarted: true, interceptorStarted: true, nodeExitCode: null } };
const response = body => ({ ok: true, json: async () => body });
const upstream = (onlineBody = online, statusBody = status) => async url => response(url.endsWith('/online') ? onlineBody : statusBody);

test('API_URL preserves a path prefix and handles trailing slashes without changing request methods', async () => {
  for (const base of ['https://api.example.test/checker/v1', 'https://api.example.test/checker/v1///']) {
    const calls = [];
    const result = await getOverview({
      apiUrl: base,
      fetchImpl: async (url, options) => {
        calls.push({ url, options });
        return upstream()(url);
      },
    });
    assert.deepEqual(calls.map(call => call.url), ['https://api.example.test/checker/v1/online', 'https://api.example.test/checker/v1/status']);
    assert.ok(calls.every(call => call.options.method === 'GET' && call.options.signal instanceof AbortSignal));
    assert.equal(result.source, 'live');
    assert.equal(result.checkedAt, '2026-09-26T10:00:00.000Z');
    assert.equal(result.summary.totalOnline, 123);
  }
});

test('response only contains approved presentation fields, never account values or raw logs', async () => {
  const result = await getOverview({
    apiUrl,
    fetchImpl: upstream({
      ...online,
      secret: 'private-online-secret',
      data: [{ name: '§a新玩法', online: 42, password: 'private-password', description: ['private-description'] }],
    }, {
      code: 0,
      data: {
        ...status.data,
        account: { token: 'private-token' },
        nodeLastOutput: 'private-output',
        lastError: 'private-error',
        server: { name: '测试服务器', token: 'private-server-token' },
      },
    }),
  });
  assert.equal(JSON.stringify(result).includes('private-'), false);
  assert.deepEqual(result.server, { name: '测试服务器' });
  assert.deepEqual(result.modes, [{ id: '新玩法', name: '新玩法', online: 42, description: [] }]);
  assert.equal(result.status.hasError, true);
  assert.equal(result.status.collectorRunning, true);
});

test('known modes retain bundled descriptions and stable IDs without reading collector files', async () => {
  const [name, metadata] = Object.entries(MODE_METADATA)[0];
  assert.ok(name && metadata.id && metadata.description.length);
  const result = await getOverview({ apiUrl, fetchImpl: upstream({ ...online, data: [{ name, online: 12 }] }) });
  assert.deepEqual(result.modes[0], { name, id: metadata.id, description: metadata.description, online: 12 });
});

test('unknown counts stay unknown, valid zero stays zero, and invalid names are ignored', async () => {
  const result = await getOverview({
    apiUrl,
    fetchImpl: upstream({ code: 0, checkedAt: 'invalid-date', data: [
      { name: 'zero', online: 0 },
      { name: 'string', online: '123' },
      { name: 'negative', online: -1 },
      { name: 'fraction', online: 2.5 },
      { name: '__proto__', online: null },
      { name: 'toString' },
      { name: '', online: 999 },
      null,
    ] }),
  });
  assert.equal(result.checkedAt, null);
  assert.equal(result.summary.totalOnline, 0);
  assert.equal(result.summary.modeCount, 6);
  assert.deepEqual(result.modes.map(mode => mode.online), [0, null, null, null, null, null]);
  assert.deepEqual(result.modes[4].description, []);
});

test('optional status failure keeps online data live without claiming a running collector', async () => {
  const result = await getOverview({
    apiUrl,
    fetchImpl: async url => {
      if (url.endsWith('/status')) throw new Error('private-connect-error');
      return response(online);
    },
  });
  assert.equal(result.source, 'live');
  assert.equal(result.status.apiReachable, true);
  assert.equal(result.status.collectorRunning, null);
  assert.equal(result.status.hasError, false);
  assert.equal(result.summary.totalOnline, 123);
});

test('a valid empty online list remains a live response and configured display settings take precedence', async () => {
  const result = await getOverview({
    apiUrl,
    serverName: '§a独立看板',
    pollIntervalMinutes: '10',
    fetchImpl: upstream({ code: 0, checkedAt: null, data: [] }),
  });
  assert.equal(result.source, 'live');
  assert.deepEqual(result.modes, []);
  assert.equal(result.checkedAt, null);
  assert.equal(result.server.name, '独立看板');
  assert.equal(result.pollIntervalMinutes, 10);
});

test('failed or malformed online responses raise a recognizable error without exposing upstream contents', async () => {
  for (const fetchImpl of [
    async () => { throw new Error('private-upstream-error'); },
    async () => ({ ok: false, json: async () => ({ error: 'private-upstream-error' }) }),
    async () => ({ ok: true, json: async () => { throw new Error('private-json-error'); } }),
    upstream({ code: 1, data: [], message: 'private-upstream-error' }),
    upstream({ code: 0, data: null }),
  ]) {
    await assert.rejects(getOverview({ apiUrl, fetchImpl }), error => {
      assert.ok(error instanceof OverviewError);
      assert.equal(error.code, 'UPSTREAM_UNAVAILABLE');
      assert.equal(String(error).includes('private-'), false);
      return true;
    });
  }
});

test('invalid API_URL values fail before making a request and never echo credentials', async () => {
  for (const value of [undefined, '', '/api', 'https:example.test', 'file:///private-path', 'https://user:private-password@example.test', 'https://api.example.test?token=private-token', 'https://api.example.test#secret', 'https://api.example.test?']) {
    let requested = false;
    await assert.rejects(getOverview({ apiUrl: value, fetchImpl: async () => { requested = true; } }), error => {
      assert.ok(error instanceof OverviewError);
      assert.equal(error.code, 'CONFIGURATION_ERROR');
      assert.equal(String(error).includes('private-'), false);
      return true;
    });
    assert.equal(requested, false);
  }
});

test('unresponsive upstream requests are aborted within the configured timeout', async () => {
  let aborted = 0;
  const fetchImpl = (url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => { aborted += 1; reject(new Error('private-timeout')); }, { once: true });
  });
  await assert.rejects(getOverview({ apiUrl, fetchImpl, timeoutMs: 20 }), { code: 'UPSTREAM_UNAVAILABLE' });
  assert.equal(aborted, 2);
});

test('status timeout does not discard available online counts', async () => {
  let statusAborted = false;
  const result = await getOverview({
    apiUrl,
    timeoutMs: 20,
    fetchImpl: (url, { signal }) => url.endsWith('/online') ? Promise.resolve(response(online))
      : new Promise((resolve, reject) => signal.addEventListener('abort', () => {
        statusAborted = true;
        reject(new Error('status timed out'));
      }, { once: true })),
  });
  assert.equal(statusAborted, true);
  assert.equal(result.summary.totalOnline, 123);
  assert.equal(result.status.collectorRunning, null);
});
