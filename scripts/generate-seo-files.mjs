import { readFileSync, writeFileSync } from 'node:fs';

const config = JSON.parse(readFileSync('site.config.json', 'utf8'));
const allPages = JSON.parse(readFileSync('page-registry.json', 'utf8'));
const pages = allPages.filter((p) => !p.hide); // 404 等页面不进 sitemap
const siteUrl = config.siteUrl.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

writeFileSync(
  'public/robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
);

writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(
      ({ path, priority }) =>
        `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>\n`
);

// Baidu 主动推送用：curl -H 'Content-Type:text/plain' --data-binary @public/baidu-urls.txt "http://data.zz.baidu.com/urls?site=b64file.cn&token=YOUR_TOKEN"
writeFileSync('public/baidu-urls.txt', `${pages.map(({ path }) => `${siteUrl}${path}`).join('\n')}\n`);
