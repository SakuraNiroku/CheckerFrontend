import { cp, lstat, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.resolve(root, "dist");
if (path.dirname(output) !== root || path.basename(output) !== "dist") {
  throw new Error("构建输出目录不正确");
}
const existing = await lstat(output).catch((error) => {
  if (error.code !== "ENOENT") throw error;
  return null;
});
if (existing?.isSymbolicLink()) throw new Error("dist 不能是符号链接");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const entries = [
  "index.html",
  "styles.css",
  "app.js",
  "assets",
  "_headers",
  "_routes.json",
];
await Promise.all(
  entries.map((entry) =>
    cp(path.join(root, "public", entry), path.join(output, entry), {
      recursive: true,
    }),
  ),
);
console.log(
  "静态页面已构建至 dist/。Cloudflare Pages 会单独构建 functions/ 代理。",
);
