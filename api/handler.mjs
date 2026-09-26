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
  { fetchImpl = fetch, cache = globalThis.caches?.default } = {},
) {
  if (!["GET", "HEAD"].includes(request.method)) {
    return new Response(JSON.stringify({ error: "此接口只支持读取" }), {
      status: 405,
      headers: { ...headers, allow: "GET, HEAD" },
    });
  }
  const cacheKey = request.method === "GET" && cache
    ? new Request(request.url, { method: "GET" })
    : null;
  const responseHeaders = cacheKey
    ? {
        ...headers,
        // The edge cache keeps the expensive upstream polling result for two
        // minutes; max-age=0 prevents browsers from hiding a newer response.
        "cache-control": "public, max-age=0, s-maxage=120, stale-while-revalidate=30",
      }
    : headers;
  if (cacheKey) {
    try {
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    } catch {
      // A cache outage must not take the data endpoint down.
    }
  }
  try {
    const result = await getOverview({
      apiUrl: env.API_URL,
      serverName: env.SERVER_NAME,
      pollIntervalMinutes: env.POLL_INTERVAL_MINUTES,
      fetchImpl,
    });
    const response = new Response(
      request.method === "HEAD" ? null : JSON.stringify(result),
      { headers: responseHeaders },
    );
    if (cacheKey) {
      try {
        await cache.put(cacheKey, response.clone());
      } catch {
        // Return fresh data even when the edge cache cannot be written.
      }
    }
    return response;
  } catch (error) {
    console.error("[api/overview] request failed", {
      method: request.method,
      path: new URL(request.url).pathname,
      error: error instanceof Error ? error.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      code: error?.code,
    });
    const configurationError = error?.code === "CONFIGURATION_ERROR";
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
