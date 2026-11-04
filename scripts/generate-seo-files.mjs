import { readFileSync, writeFileSync } from 'node:fs';

const config = JSON.parse(readFileSync('site.config.json', 'utf8'));
const allPages = JSON.parse(readFileSync('page-registry.json', 'utf8'));
const pages = allPages.filter((p) => !p.hide); // 404 等页面不进 sitemap
const siteUrl = config.siteUrl.replace(/\/$/, '');
// lastmod 用 page-registry.json 里每页真实的 updated（改内容时手改那个字段），
// 别用构建日 —— 每次都刷新 lastmod 会被搜索引擎判定不可信而忽略。
const today = new Date().toISOString().slice(0, 10); // 仅作兜底

writeFileSync(
  'public/robots.txt',
  // baidu-urls.txt 是给百度主动推送 API 读的清单，不是内容页 —— 让引擎别把它当薄内容收进去。
  // （llms.txt 保持可抓，那是给 AI 检索用的入口。）
  // AI 搜索爬虫单独声明：`User-agent: *` 虽然已允许，但显式列出来是明确的抓取授权信号，
  // 也避免以后某条通配规则误伤（GEO：ChatGPT 搜索走 OAI-SearchBot，用户让它开网页走 ChatGPT-User）。
  `User-agent: *
Allow: /
Disallow: /baidu-urls.txt

# --- AI 搜索与生成式引擎爬虫：显式放行 ---
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
);

writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(
      ({ path, priority, updated }) =>
        `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${updated ?? today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>\n`
);

// Baidu 主动推送用：curl -H 'Content-Type:text/plain' --data-binary @public/baidu-urls.txt "http://data.zz.baidu.com/urls?site=b64file.cn&token=YOUR_TOKEN"
writeFileSync('public/baidu-urls.txt', `${pages.map(({ path }) => `${siteUrl}${path}`).join('\n')}\n`);
