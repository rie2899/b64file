# AGENTS.md — b64file 中文站（b64file.cn）

## 项目是什么

Base64 在线工具站，全静态、纯前端、浏览器内处理（文件不上传服务器）。中文站主域 `b64file.cn`，部署在腾讯云自建 nginx 后面。英文站是独立仓库 `../base64en`，别在本仓库里改英文站。

## 技术栈与构建

- Vite + TypeScript，无框架；样式手写 CSS
- 包管理 `pnpm`
- 32 个页面由 `page-registry.json` 驱动，`src/static-pages.ts` 里 `renderShell()` 产出共享外壳

```bash
pnpm build      # tsc && vite build → dist/
pnpm test       # 91 个测试（Vitest），必须全绿才算完
```

## 目录约定

```
src/swiss.css        瑞士国际主义版式（全站生效，规则按 body[data-page] 限定）
src/styles.css       只剩字体/reset/滚动条，别再往里加组件样式
src/static-pages.ts  32 页的页面数据 + renderShell（改外壳只改这里）
page-registry.json   页面清单：id/path/html/input/priority/updated
public/              静态资源、sitemap.xml、验证文件、IndexNow key
<slug>/index.html    每个页面一个入口目录
```

## 不能动的东西

- `tests/tool-dom.test.ts` 断言：3 个 `.mode-tab`、`to-file` 的 `tabIndex === 0`、默认 tab 是「粘贴 Base64」。改 DOM 前先跑测试
- `public/` 下的验证文件（`shenma-site-verification.txt`、`baidu_verify_*.html`、`BingSiteAuth.xml`、`google*.html`）和 IndexNow key（32 位 hex `.txt`）。删了会掉收录
- 首页的「01」小标号是既有设计，章号从 02 起不是错

## 质量门槛

- 视觉：纯白 `#FFFFFF`、墨黑 `#111111`、信号红 `#E2001A`；正文 `#565656`（7.34:1）、次要 `#666`（5.74:1）
- CTA 填充用 `#B40012`（白字 7.12:1）；红条和下划线才用 `#E2001A`
- 无圆角、无投影、无渐变，分隔一律 1px 发丝线
- 逐页实测 1440/1024/768/390 四个宽度无横向溢出；对比度按实算不给估值

## 部署

```bash
pnpm build
rsync -az --delete -e "ssh -i ~/.ssh/tencent-ubuntu.pem" dist/ ubuntu@82.157.202.200:/tmp/b64-dist/
ssh ... "sudo rsync -a --delete /tmp/b64-dist/ /data/b64file/html/ && sudo chown -R root:root /data/b64file/html"
```

- 生产目录 `/data/b64file/html`，nginx 容器 `b64file-nginx`
- 部署后跑 `python3 ~/.hermes/scripts/indexnow_push.py --site cn`
- **生产部署需用户确认后再做**；本地 build + test 可自动执行

## Git

- 分支 `main`，远端 `github.com/rie2899/b64file`（public）
- `designs/` 是本机设计稿，不入库（`git add -A ':!designs'`）
