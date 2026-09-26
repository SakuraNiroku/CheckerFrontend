# Heypixel 在线看板

独立的中文在线人数看板，可将整个 `Frontend` 文件夹复制到新仓库，部署到 **Cloudflare Pages**。页面为静态 HTML/CSS/JavaScript；`functions/api/overview.js` 是 Pages Function，从环境变量读取后端地址并代理请求，不需要常驻 Node.js 服务。

本项目使用 Pages 的部署模型，不是独立的 Cloudflare Worker：`dist/` 只包含静态资源，`functions/` 由 Pages 自动部署并处理 `/api/*`。不要把 `dist/` 单独绑定为 Worker，也不要把 `wrangler.jsonc` 的 `pages_build_output_dir` 改成 Worker 的 `main` 入口。若必须迁移到 Worker，需要另写 Worker 入口并保留同一个 `handleOverviewRequest`，不能直接把 Pages Function 文件当作 Worker 脚本。

## 本地运行

需要 Node.js **20.12 或更高版本**，推荐 Node.js 22。没有 npm 运行依赖。

1. 复制 `.env.example` 为 `.env`。
2. 设置后端基地址，例如：

   ```dotenv
   API_URL=http://127.0.0.1:4558
   PORT=5173
   ```

3. 在本文件所在目录运行 `npm run dev`，或双击本目录的 `start.cmd`。
4. 打开终端中显示的地址，默认是 `http://127.0.0.1:5173`。

在启动窗口按 **Ctrl+C** 停止。修改 `.env` 后重启开发服务。进程环境变量优先于 `.env`，开发服务始终读取本目录的 `.env`，与启动命令所在目录无关。

仓库根目录原有的 `start-frontend.cmd` 仍可使用，但独立部署不需要它。

## 部署到 Cloudflare Pages

### 使用 Git 仓库

1. 将本文件夹的内容推送到独立仓库，并在 Cloudflare Pages 创建项目。如果继续使用上层完整项目仓库，把 Pages 的根目录设为 `Frontend`；独立仓库则留空。
2. 框架选择 **None**，构建命令为 **`npm run build`**，输出目录为 **`dist`**。可设置 `NODE_VERSION=22`。
3. 在 Pages 项目中设置环境变量 **`API_URL`**，例如 `https://api.example.com`。需要预览部署时，也为 Preview 环境设置此变量。
4. 部署。Cloudflare 会同时构建项目根目录下的 `functions/`，并将 `/api/overview` 请求交给它处理。

`API_URL` 是 **运行时服务端变量**，不会写进静态 JavaScript，也不使用 `VITE_` 前缀。Cloudflare 不会上传或读取你本机的 `.env`，必须在 Pages 项目中单独配置；修改后重新部署使新配置生效。

`/api/overview` 的成功响应会在 Cloudflare 边缘缓存 120 秒（浏览器仍会向边缘发起请求），因此多个访问者不会在每次刷新时同时请求后端。配置错误和上游失败响应不会写入缓存。

云端的 `API_URL` 必须是 **Cloudflare 能访问到的后端地址**，通常使用 HTTPS 域名。`127.0.0.1`、`localhost` 和仅本机可访问的地址只适合本地开发，不能在 Cloudflare 中指向你的电脑。采集程序需要另外运行，Pages 不运行 Minecraft 客户端或 .NET 控制器。

### 使用命令行上传

在本目录执行：

```sh
npm run build
npx wrangler@4 pages deploy dist
```

首次运行按 Wrangler 提示登录并选择/创建 Pages 项目，然后在该项目中配置 `API_URL`。命令须在包含 `functions/` 和 `wrangler.jsonc` 的目录运行。

**不要仅把 `dist` 拖入 Pages 网页的静态文件上传界面**：此项目还需要 Pages Function，该上传方式不会把 `functions/` 一并部署。使用 Git 集成或上面的 Wrangler 命令。

## 配置项

| 变量 | 用途 | 默认值 |
| --- | --- | --- |
| `API_URL` | 后端基地址，必填；自动追加 `/online` 与 `/status` | 无 |
| `SERVER_NAME` | 可选的页面服务器名称 | 后端状态中的名称，或「布吉岛」 |
| `POLL_INTERVAL_MINUTES` | 页面展示的预计采集间隔，不控制后端 | `5` |
| `PORT` | 仅本地开发/预览服务端口 | `5173` |

地址支持路径前缀，例如 `https://example.com/checker` 会请求 `/checker/online` 与 `/checker/status`。请不要把 `/online` 加在 `API_URL` 末尾；地址也不支持内嵌用户名、密码、查询参数或片段。

## 数据接口

```text
浏览器 → 当前站点 /api/overview → API_URL/online
                              → API_URL/status（可选）
```

所需 `/online` 格式：

```json
{
  "code": 0,
  "data": [{ "name": "起床战争", "online": 123 }],
  "checkedAt": "2026-09-26T10:00:00Z"
}
```

`/status` 可以返回现有控制器的结构；若不可用，仍正常显示在线人数，采集程序状态标为「未提供」。代理仅返回展示所需字段，账号、令牌、原始日志与错误文本不会转发给浏览器。浏览器始终使用同源接口，因此后端不需要为页面额外配置 CORS。

接口连接失败时保留当前页面内上一次成功获取的数据并显示提示。重新打开页面后必须再次连接接口；不再读取磁盘 `online.json`。人数未知显示「—」，空列表提示等待下一轮采集。玩法图标和介绍来自本项目的静态资料，不依赖采集目录。

## 文件结构与检查

```text
public/                 页面、样式、交互和插画
api/                    共享的数据规范化、静态玩法资料和安全响应
functions/api/          Cloudflare Pages Function 入口
scripts/build.mjs       构建静态页面到 dist
server.mjs              本地开发/预览服务
.env.example            环境变量模板
wrangler.jsonc          Cloudflare Pages 配置
```

```sh
npm test
npm run build
npm run preview
```

`preview` 使用 `dist` 中的页面以及同一套代理逻辑，也读取本目录 `.env`。构建只复制允许的静态文件，不会把 `.env`、测试、代理源代码或上层目录的数据复制到 `dist`。`.env`、`dist` 和 Wrangler 缓存已加入 `.gitignore`。
