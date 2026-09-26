// Local development/preview server. Production runs on Cloudflare Pages.
import http from "node:http";
import { readFile, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";
import { handleOverviewRequest } from "./api/handler.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const staticFiles = new Map([
  ["/index.html", "text/html; charset=utf-8"],
  ["/app.js", "text/javascript; charset=utf-8"],
  ["/styles.css", "text/css; charset=utf-8"],
]);
const assetTypes = new Map([
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

export async function loadConfiguration({
  root = directory,
  environment = process.env,
} = {}) {
  let fileEnvironment = {};
  try {
    fileEnvironment = parseEnv(await readFile(path.join(root, ".env"), "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  return { ...fileEnvironment, ...environment };
}

function portFromEnv(value, fallback = 5173) {
  if (value == null || value === "") return fallback;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("PORT 必须是 1 到 65535 之间的整数");
  return port;
}

function respond(
  response,
  statusCode,
  content,
  contentType = "application/json; charset=utf-8",
  method = "GET",
) {
  const body =
    typeof content === "string" || Buffer.isBuffer(content)
      ? content
      : JSON.stringify(content);
  response.writeHead(statusCode, {
    "content-type": contentType,
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "referrer-policy": "no-referrer",
  });
  response.end(method === "HEAD" ? undefined : body);
}

export function createServer({
  env = {},
  publicDirectory = path.join(directory, "public"),
  fetchImpl = fetch,
} = {}) {
  publicDirectory = path.resolve(publicDirectory);
  return http.createServer(async (request, response) => {
    try {
      let pathname;
      try {
        pathname = decodeURIComponent(
          new URL(request.url, "http://localhost").pathname,
        );
      } catch {
        respond(response, 400, { error: "请求地址无效" });
        return;
      }
      if (pathname === "/api/overview") {
        const apiResponse = await handleOverviewRequest(
          new Request("http://localhost/api/overview", {
            method: request.method,
          }),
          env,
          { fetchImpl },
        );
        response.writeHead(
          apiResponse.status,
          Object.fromEntries(apiResponse.headers),
        );
        response.end(Buffer.from(await apiResponse.arrayBuffer()));
        return;
      }
      if (!["GET", "HEAD"].includes(request.method)) {
        response.setHeader("allow", "GET, HEAD");
        respond(response, 405, { error: "此页面只支持读取" });
        return;
      }
      if (pathname === "/") pathname = "/index.html";
      let contentType = staticFiles.get(pathname);
      if (
        !contentType &&
        /^\/assets\/[a-zA-Z0-9_./-]+$/.test(pathname) &&
        !pathname.split("/").includes("..")
      ) {
        contentType = assetTypes.get(path.extname(pathname).toLowerCase());
      }
      if (!contentType) {
        respond(response, 404, { error: "页面不存在" });
        return;
      }
      try {
        const [resolvedRoot, resolvedFile] = await Promise.all([
          realpath(publicDirectory),
          realpath(path.join(publicDirectory, pathname.slice(1))),
        ]);
        const relativePath = path.relative(resolvedRoot, resolvedFile);
        if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
          respond(response, 404, { error: "页面不存在" });
          return;
        }
        respond(
          response,
          200,
          await readFile(resolvedFile),
          contentType,
          request.method,
        );
      } catch {
        respond(response, 404, { error: "页面不存在" });
      }
    } catch {
      respond(response, 500, { error: "暂时无法读取数据，请稍后重试" });
    }
  });
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const env = await loadConfiguration();
  const port = portFromEnv(env.PORT);
  const preview = process.argv.includes("--preview");
  const server = createServer({
    env,
    publicDirectory: path.join(directory, preview ? "dist" : "public"),
  });
  server.on("error", (error) => {
    console.error(
      error.code === "EADDRINUSE"
        ? `端口 ${port} 已被占用，可在 .env 中设置 PORT 使用其他端口。`
        : "前端服务启动失败。",
    );
    process.exitCode = 1;
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`在线人数看板：http://127.0.0.1:${port}`);
    console.log("在当前窗口按 Ctrl+C 停止。");
    if (!env.API_URL)
      console.log("尚未配置 API_URL，请参考 .env.example 创建 .env。");
  });
}
