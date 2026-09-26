import { handleOverviewRequest } from "../../api/handler.mjs";

export async function onRequest(context) {
  // Pages supplies the platform Cache API globally. Passing it explicitly also
  // keeps the shared handler usable by a Worker-style entry point and locally.
  try {
    return await handleOverviewRequest(context.request, context.env, {
      cache: globalThis.caches?.default,
    });
  } catch (error) {
    console.error("[pages-function/api/overview] unhandled request failure", {
      method: context.request?.method,
      path: context.request ? new URL(context.request.url).pathname : undefined,
      error: error instanceof Error ? error.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return new Response(JSON.stringify({
      error: "看板接口运行异常，请查看 Pages Function 日志。",
      code: "FUNCTION_RUNTIME_ERROR",
    }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}
