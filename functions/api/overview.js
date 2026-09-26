import { handleOverviewRequest } from "../../api/handler.mjs";

export function onRequest(context) {
  return handleOverviewRequest(context.request, context.env);
}
