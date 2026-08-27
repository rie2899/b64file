# b64file

Base64 转文件 · 文件转 Base64 · JSON 提取 —— 全部在浏览器本地完成的转换工具。

- 站点：https://b64file.cn
- 技术栈：Vite + TypeScript，纯静态，无后端、无数据库、无追踪
- 测试：62+（引擎 / DOM 交互 / 真实数据）

## 开发

```bash
pnpm install
pnpm dev        # 开发服务器
pnpm test       # vitest
pnpm build      # 生成 public/sitemap、robots 后构建到 dist/
pnpm preview    # 本地预览 dist
```

## 配置

所有环境相关配置集中在 `site.config.json`：

| 字段 | 说明 |
|---|---|
| `siteUrl` | 生产域名，驱动 canonical / sitemap / og:url |
| `baiduTongjiId` | 百度统计 ID，留空则完全不加载统计脚本 |
| `feedbackEmail` | 页脚反馈邮箱 |
| `icpNumber` | ICP 备案号，留空不显示，填入后页脚自动出现备案链接 |

## 结构

```
src/lib/base64.ts        归一化 / 校验 / 编解码（RFC 4648）
src/lib/filetype.ts      魔数识别（PNG/PDF/ZIP/AVIF/HEIC 等 20+）
src/lib/json-extract.ts  JSON 接口数据提取 + 残缺恢复
src/lib/analytics.ts     百度统计事件（无 ID 时安全空转）
src/tool.ts              三模式工具交互
src/theme.ts             深浅主题
src/static-pages.ts      全部页面内容与渲染壳（含 JSON-LD）
page-registry.json       页面唯一注册源（路由/sitemap/构建入口）
scripts/generate-seo-files.mjs  构建前生成 robots / sitemap / baidu-urls.txt
```

新增页面：在 `page-registry.json` 加一行，在 `static-pages.ts` 的 `pageData` 补内容，建目录放 `index.html` 壳即可。

## 部署

见 [DEPLOY.md](./DEPLOY.md)。
