import { handleOverviewRequest } from "../../api/handler.mjs";

export function onRequest(context) {
  // Pages supplies the platform Cache API globally. Passing it explicitly also
  // keeps the shared handler usable by a Worker-style entry point and locally.
  return handleOverviewRequest(context.request, context.env, {
    cache: globalThis.caches?.default,
  });
}
