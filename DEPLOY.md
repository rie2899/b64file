# b64file 部署指南（腾讯云）

## 前置条件

- [x] 域名 b64file.cn 已购买并实名
- [ ] ICP 备案通过
- [ ] 服务器（腾讯云 CVM / 轻量，2C2G 足够）

## 步骤

### 1. DNS 解析

腾讯云 DNSPod 添加 A 记录：`@ → 服务器IP`，可选 `www → 服务器IP`。

### 2. 构建并上传

```bash
pnpm build
scp -r dist/* root@服务器IP:/data/b64file/html/
```

### 3. Nginx（Docker）

首次在服务器建目录并传配置：

```bash
ssh root@服务器IP "mkdir -p /data/b64file/html /data/b64file/certs"
scp deploy/docker-compose.yml deploy/nginx.conf root@服务器IP:/data/b64file/
```

证书下来后（见第 4 步）下载 nginx 格式放 `/data/b64file/certs/b64file.cn.pem` 和 `.key`，然后：

```bash
cd /data/b64file && docker compose up -d
```

配置要点已写进 `deploy/nginx.conf`：http 和 www 301 到 https 主域、`error_page 404 /404.html`、HTML 不缓存、`/assets/` 长缓存。宿主机直装 nginx 的旧方案保留在 `nginx.conf.example` 备查。

### 4. 证书

腾讯云控制台 → SSL 证书 → 申请免费 DV 证书 → 部署到 Nginx。

### 5. 备案号

备案下来后填 `site.config.json` 的 `icpNumber`，重新构建部署（页脚自动出现备案链接）。

### 6. 百度统计

1. tongji.baidu.com 添加站点，拿 ID
2. 填 `baiduTongjiId`，重新构建部署

### 7. 收录提交

- 百度搜索资源平台：验证站点 → 提交 `https://b64file.cn/sitemap.xml`
- 主动推送（可选）：
  ```bash
  curl -H 'Content-Type:text/plain' --data-binary @public/baidu-urls.txt \
    "http://data.zz.baidu.com/urls?site=b64file.cn&token=YOUR_TOKEN"
  ```
- Bing Webmaster：ICP 备案后域名可正常访问时提交
- 公安备案：上线 30 日内到 beian.mps.gov.cn 完成

## CI

GitHub Actions 已配置（`.github/workflows/ci.yml`）：每次 push 自动跑测试和构建。
