import { readFileSync, writeFileSync } from 'node:fs';

const config = JSON.parse(readFileSync('site.config.json', 'utf8'));
const pages = JSON.parse(readFileSync('page-registry.json', 'utf8'));
const siteUrl = config.siteUrl.replace(/\/$/, '');

writeFileSync(
  'public/robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
);

writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(
      ({ path, priority }) =>
        `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>\n`
);
