import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { canonicalTag, hreflangTags, jsonLdScript, metaTags, pageData, renderShell, type PageId } from './src/static-pages';

const pageRegistry = JSON.parse(readFileSync('page-registry.json', 'utf8')) as Array<{
  id: string;
  path: string;
  html: string;
  input: string;
  priority: string;
  updated?: string;
  hide?: boolean;
}>;
const pageByHtml = new Map<string, PageId>(pageRegistry.map((p) => [`/${p.html}`, p.id]));
const input = Object.fromEntries(pageRegistry.map((p) => [p.input, resolve(__dirname, p.html)]));

export default defineConfig({
  plugins: [
    {
      name: 'static-html-content',
      transformIndexHtml(html: string, ctx: { path: string }) {
        const page = pageByHtml.get(ctx.path) ?? 'home';
        return html
          .replace('<div id="app"></div>', `<div id="app">${renderShell(page)}</div>`)
          .replace(/<title>.*?<\/title>\s*<meta name="description" content=".*?" \/>/s, metaTags(page))
          .replace('</head>', `${canonicalTag(page)}${hreflangTags(page)}${jsonLdScript(page)}</head>`);
      },
      // llms.txt：给 AI 搜索 / 生成式引擎的站点摘要（GEO）。页面内容一变，这里自动跟着变
      closeBundle() {
        const siteUrl = (JSON.parse(readFileSync('site.config.json', 'utf8')) as { siteUrl: string }).siteUrl.replace(/\/$/, '');
        const info = ['about', 'privacy', 'terms'];
        const tools = pageRegistry.filter((p) => !p.hide && !info.includes(p.id));
        const lines = [
          '# b64file',
          '',
          '> b64file 是一个 Base64 在线转换工具站：Base64 ⇄ 文件、文本编解码、从 JSON 里提取 Base64 文件。纯静态页面，转换在浏览器里完成。',
          '',
          '## 工具',
          ''
        ];
        for (const p of tools) {
          const d = pageData[p.id as PageId];
          if (d) lines.push(`- [${d.h1}](${siteUrl}${p.path}): ${d.desc}`);
        }
        lines.push('', '## 其他', '');
        for (const id of info) {
          const p = pageRegistry.find((x) => x.id === id);
          const d = pageData[id as PageId];
          if (p && d) lines.push(`- [${d.h1}](${siteUrl}${p.path}): ${d.desc}`);
        }
        lines.push('');
        writeFileSync(resolve(__dirname, 'dist/llms.txt'), lines.join('\n'));
      }
    }
  ],
  build: {
    rollupOptions: { input }
  },
  test: {
    environment: 'node'
  }
});
