import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import registry from '../page-registry.json';
import { canonicalTag, metaTags, pageData, renderShell } from '../src/static-pages';

const root = process.cwd();
const pages = registry as Array<{
  id: string;
  path: string;
  html: string;
  input: string;
  priority: string;
  hide?: boolean;
}>;

// 404 这类隐藏页没有内容区块，也没有 canonical —— 一致性检查只针对对外的内容页
const contentPages = pages.filter((page) => !page.hide);

describe('page registry consistency', () => {
  it('每个 registry 页面都有完整 pageData', () => {
    for (const p of pages) {
      const d = pageData[p.id];
      expect(d, `缺少 pageData: ${p.id}`).toBeTruthy();
      for (const k of ['title', 'desc', 'h1', 'answer'] as const) {
        expect(d[k] && d[k].length, `${p.id}.${k} 为空`).toBeGreaterThan(0);
      }
      if (!p.hide) {
        expect(d.sections.length, `${p.id} 没有 sections`).toBeGreaterThan(0);
        expect(d.faqs.length, `${p.id} 没有 faqs`).toBeGreaterThan(0);
      }
    }
  });

  it('每个 registry 页面都有物理 HTML 壳，且 data-page 与 id 一致', () => {
    for (const p of pages) {
      const f = resolve(root, p.html);
      expect(existsSync(f), `缺少壳文件: ${p.html}`).toBe(true);
      expect(readFileSync(f, 'utf8'), `${p.html} 的 data-page 应为 ${p.id}`).toContain(
        `data-page="${p.id}"`
      );
    }
  });

  it('每页都能渲染出标题、描述和 canonical，且没有 undefined 泄漏', () => {
    for (const p of pages) {
      const shell = renderShell(p.id);
      expect(shell, `${p.id} 渲染无 h1`).toContain('<h1>');
      expect(shell, `${p.id} 渲染出 undefined`).not.toContain('undefined');
      expect(metaTags(p.id), `${p.id} 缺 title`).toContain('<title>');
      expect(metaTags(p.id), `${p.id} 缺 description`).toContain('name="description"');
      if (!p.hide) {
        expect(canonicalTag(p.id), `${p.id} 缺 canonical`).toContain('rel="canonical"');
      }
    }
  });

  it('对外内容页数量与 registry 一致（隐藏页除外）', () => {
    expect(contentPages.length).toBe(pages.length - 1);
    expect(contentPages.length).toBeGreaterThanOrEqual(14);
  });

  it('两个主要输入框都带 aria-label（读屏可用）', () => {
    const shell = renderShell('home');
    expect(shell).toContain('aria-label="粘贴 Base64 或文件数据"');
    expect(shell).toContain('aria-label="输入文本或 Base64"');
  });

  it('内链图：每页出链 ≤5，且每个对外页面都有 ≥5 条入链', () => {
    const pathToId = new Map(contentPages.map((p) => [p.path, p.id]));
    const outbound = new Map<string, string[]>();

    for (const p of contentPages) {
      const shell = renderShell(p.id);
      const start = shell.indexOf('相关工具与指南');
      const end = shell.indexOf('</section>', start);
      const seg = shell.slice(start, end > start ? end : undefined);
      const hrefs = [...seg.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
      outbound.set(p.id, hrefs);
    }

    for (const [id, hrefs] of outbound) {
      expect(hrefs.length, `${id} 的相关链接为空`).toBeGreaterThan(0);
      expect(hrefs.length, `${id} 相关链接超过 5 条（像链接农场）`).toBeLessThanOrEqual(5);
      expect(new Set(hrefs).size, `${id} 相关链接有重复`).toBe(hrefs.length);
    }

    const inbound = new Map<string, number>();
    for (const hrefs of outbound.values()) {
      for (const h of hrefs) {
        const id = pathToId.get(h);
        if (id) inbound.set(id, (inbound.get(id) ?? 0) + 1);
      }
    }

    for (const p of contentPages) {
      const n = inbound.get(p.id) ?? 0;
      expect(n, `${p.id} 只有 ${n} 条内链指向它，应 ≥5`).toBeGreaterThanOrEqual(5);
    }
  });

  it('有 quick 的页面渲染出首屏速查清单，没有的不渲染', () => {
    const shell = renderShell('base64-decode-errors');
    expect(shell).toContain('class="quick-list"');
    expect(shell.split('<li>').length - 1).toBeGreaterThanOrEqual(5);
    expect(renderShell('privacy')).not.toContain('class="quick-list"');
  });

  it('导航里当前页有高亮（active + aria-current），其他页没有', () => {
    const shell = renderShell('base64-to-file');
    expect(shell).toContain('href="/base64-to-file/" class="active" aria-current="page"');
    expect(shell.split('aria-current="page"').length - 1, '只该有一个当前页').toBe(1);
    expect(renderShell('home')).not.toContain('aria-current="page"');
  });

  it('每个页面都有真实的 updated 日期（sitemap lastmod 用，防止每次构建都刷新）', () => {
    for (const p of pages) {
      expect((p as { updated?: string }).updated, `缺少 updated: ${p.id}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('pageData 没有孤儿键，mode 取值合法', () => {
    const ids = new Set(pages.map((p) => p.id));
    for (const key of Object.keys(pageData)) {
      expect(ids.has(key), `pageData 里的 ${key} 不在 registry`).toBe(true);
    }
    for (const p of pages) {
      expect(['to-file', 'to-base64', 'text']).toContain(pageData[p.id].mode);
    }
  });
});
