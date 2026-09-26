import { getOverview } from "./overview.mjs";

const headers = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer",
};

// Shared by the local server and Cloudflare Pages. Never expose env or raw errors.
export async function handleOverviewRequest(
  request,
  env,
  { fetchImpl = fetch } = {},
) {
  if (!["GET", "HEAD"].includes(request.method)) {
    return new Response(JSON.stringify({ error: "此接口只支持读取" }), {
      status: 405,
      headers: { ...headers, allow: "GET, HEAD" },
    });
  }
  try {
    const result = await getOverview({
      apiUrl: env.API_URL,
      serverName: env.SERVER_NAME,
      pollIntervalMinutes: env.POLL_INTERVAL_MINUTES,
      fetchImpl,
    });
    return new Response(
      request.method === "HEAD" ? null : JSON.stringify(result),
      { headers },
    );
  } catch (error) {
    const configurationError = error.code === "CONFIGURATION_ERROR";
    const body = {
      error: configurationError
        ? "尚未正确配置 API_URL，请联系看板管理员。"
        : "暂时无法连接采集接口，请稍后刷新。",
      code: configurationError ? "CONFIGURATION_ERROR" : "UPSTREAM_UNAVAILABLE",
    };
    return new Response(
      request.method === "HEAD" ? null : JSON.stringify(body),
      {
        status: configurationError ? 503 : 502,
        headers,
      },
    );
  }
}
