import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { canonicalTag, jsonLdScript, metaTags, renderShell, type PageId } from './src/static-pages';

const pageRegistry = JSON.parse(readFileSync('page-registry.json', 'utf8')) as Array<{
  id: string;
  path: string;
  html: string;
  input: string;
  priority: string;
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
          .replace('</head>', `${canonicalTag(page)}${jsonLdScript(page)}</head>`);
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
