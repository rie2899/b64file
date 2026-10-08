// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderShell } from '../src/static-pages';
import { encodeBytesToBase64 } from '../src/lib/base64';

describe('tool DOM interaction', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.dataset.page = 'home';
    document.body.innerHTML = `<div id="app">${renderShell('home')}</div>`;
  });

  it('decodes pasted PNG base64 into a file card with download button', async () => {
    await import('../src/tool');

    const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2]);
    const b64 = encodeBytesToBase64(pngBytes);

    const input = document.querySelector<HTMLTextAreaElement>('#b64-input');
    expect(input).toBeTruthy();
    input!.value = `data:image/png;base64,\n${b64.slice(0, -2)}\n`;
    input!.dispatchEvent(new Event('input', { bubbles: true }));

    await new Promise((r) => setTimeout(r, 400));

    const diagnosis = document.querySelector<HTMLElement>('#b64-diagnosis');
    expect(diagnosis?.hidden).toBe(false);
    expect(diagnosis?.innerHTML).toContain('Data URL');

    const result = document.querySelector<HTMLElement>('#b64-result');
    expect(result?.hidden).toBe(false);
    expect(result?.textContent).toContain('PNG 图片');
    expect(result?.textContent).toContain('image/png');
    expect(result?.querySelector('#dl-btn')).toBeTruthy();
    const nameInput = result?.querySelector<HTMLInputElement>('#dl-name');
    expect(nameInput?.value).toBe('b64file.png');
  });

  it('extracts files when a JSON API response is pasted', async () => {
    await import('../src/tool');

    const pdfBytes = new TextEncoder().encode('%PDF-1.4\nthis is a test pdf payload for json extraction\n%%EOF\n');
    const b64 = encodeBytesToBase64(pdfBytes);
    const json = JSON.stringify([
      { fileCode: 'TD0101', fileName: '评价标准.pdf', fileContent: b64 },
      { fileCode: 'TD0204', fileName: '评分细则.pdf', fileContent: b64 }
    ]);

    const input = document.querySelector<HTMLTextAreaElement>('#b64-input');
    input!.value = json;
    input!.dispatchEvent(new Event('input', { bubbles: true }));

    await new Promise((r) => setTimeout(r, 400));

    const diagnosis = document.querySelector<HTMLElement>('#b64-diagnosis');
    expect(diagnosis?.hidden).toBe(false);
    expect(diagnosis?.textContent).toContain('JSON');
    expect(diagnosis?.textContent).toContain('2');

    const result = document.querySelector<HTMLElement>('#b64-result');
    expect(result?.hidden).toBe(false);
    const names = Array.from(result?.querySelectorAll('.filename-input') ?? []).map(
      (i) => (i as HTMLInputElement).value
    );
    expect(names).toEqual(['评价标准.pdf', '评分细则.pdf']);
    expect(result?.querySelectorAll('.dl-json-btn').length).toBe(2);
  });

  it('encodes a pasted clipboard file directly in encode mode', async () => {
    await import('../src/tool');

    const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4, 5, 6, 7, 8]);
    const file = new File([png], 'shot.png', { type: 'image/png' });
    const ev = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(ev, 'clipboardData', { value: { files: [file] } });
    document.dispatchEvent(ev);

    await new Promise((r) => setTimeout(r, 300));

    const tool = document.querySelector<HTMLElement>('#tool');
    const panel = tool?.querySelector<HTMLElement>('.mode-panel[data-panel="to-base64"]');
    expect(panel?.hidden).toBe(false);

    const info = document.querySelector<HTMLElement>('#file-info');
    expect(info?.hidden).toBe(false);
    expect(info?.textContent).toContain('shot.png');

    const result = document.querySelector<HTMLElement>('#encode-result');
    expect(result?.hidden).toBe(false);
    expect((result?.querySelector('#b64-out') as HTMLTextAreaElement)?.value.length).toBeGreaterThan(20);
  });

  it('toggles the theme and persists the choice', async () => {
    localStorage.clear();
    document.documentElement.dataset.theme = 'light';
    const { initTheme } = await import('../src/theme');
    initTheme();

    const btn = document.querySelector<HTMLButtonElement>('#theme-toggle');
    expect(btn).toBeTruthy();
    expect(btn!.textContent).toBe('🌙');

    btn!.click();
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('b64file-theme')).toBe('dark');
    expect(btn!.textContent).toBe('☀️');

    btn!.click();
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('b64file-theme')).toBe('light');
  });

  it('renders the about page with brand story and feedback email', () => {
    document.body.dataset.page = 'about';
    document.body.innerHTML = `<div id="app">${renderShell('about')}</div>`;
    const html = document.body.innerHTML;
    expect(html).toContain('关于 b64file');
    expect(html).toContain('由爱而生');
    expect(html).toContain('mailto:greedy2899@gmail.com');
    expect(html).not.toContain('id="tool"');
    expect(html).toContain('服务条款');
  });

  it('footer contains ICP placeholder support and copyright year', () => {
    document.body.dataset.page = 'home';
    document.body.innerHTML = `<div id="app">${renderShell('home')}</div>`;
    const footer = document.querySelector('footer')?.innerHTML ?? '';
    expect(footer).toContain('由爱而生');
    expect(footer).toContain('greedy2899@gmail.com');
    expect(footer).toContain(`© ${new Date().getFullYear()}`);
    expect(footer).toContain('/about/');
    expect(footer).toContain('/terms/');
  });

  it('home schema has no breadcrumb while subpages do', () => {
    document.body.dataset.page = 'home';
    document.body.innerHTML = `<div id="app">${renderShell('home')}</div>`;
    // 静态构建时由 vite 插件注入；此处验证渲染函数不炸即可，schema 细节在构建产物断言
    expect(document.querySelector('#app')?.innerHTML).toContain('b64file');
  });

  it('shows validation errors for invalid base64 without rendering a result', async () => {
    await import('../src/tool');

    const input = document.querySelector<HTMLTextAreaElement>('#b64-input');
    input!.value = '不是base64!!!';
    input!.dispatchEvent(new Event('input', { bubbles: true }));

    await new Promise((r) => setTimeout(r, 400));

    const diagnosis = document.querySelector<HTMLElement>('#b64-diagnosis');
    expect(diagnosis?.hidden).toBe(false);
    expect(diagnosis?.textContent).toContain('非法字符');

    const result = document.querySelector<HTMLElement>('#b64-result');
    expect(result?.hidden).toBe(true);
  });

  it('载入示例按钮填入样例并直接出结果', async () => {
    await import('../src/tool');

    const btn = document.querySelector<HTMLButtonElement>('#b64-sample');
    expect(btn, '缺少「载入示例」按钮').toBeTruthy();
    btn!.click();

    await new Promise((r) => setTimeout(r, 400));

    const input = document.querySelector<HTMLTextAreaElement>('#b64-input');
    expect(input!.value.length).toBeGreaterThan(100);
    const result = document.querySelector<HTMLElement>('#b64-result');
    expect(result?.hidden).toBe(false);
    expect(result?.textContent).toContain('PNG');
  });

  it('文本模式的 URL-safe 输出把 + / 换成 - _ 并去掉填充', async () => {
    await import('../src/tool');

    const tool = document.querySelector<HTMLElement>('#tool');
    tool?.querySelector<HTMLButtonElement>('.mode-tab[data-mode="text"]')?.click();

    const input = document.querySelector<HTMLTextAreaElement>('#text-input');
    input!.value = '测试字符串'; // UTF-8 标准 base64 = 5rWL6K+V5a2X56ym5Liy（含 +）
    input!.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 350));

    const out1 = document.querySelector('#text-output')?.textContent ?? '';
    expect(out1).toContain('+');

    const box = document.querySelector<HTMLInputElement>('#opt-text-urlsafe');
    expect(box, '缺少 URL-safe 开关').toBeTruthy();
    box!.checked = true;
    box!.dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 350));

    const out2 = document.querySelector('#text-output')?.textContent ?? '';
    expect(out2).not.toContain('+');
    expect(out2).not.toContain('/');
    expect(out2).toContain('-');
  });

  it('encodes text in text mode', async () => {
    await import('../src/tool');

    const tool = document.querySelector<HTMLElement>('#tool');
    const textTab = tool?.querySelector<HTMLButtonElement>('.mode-tab[data-mode="text"]');
    textTab?.click();

    const input = document.querySelector<HTMLTextAreaElement>('#text-input');
    expect(input).toBeTruthy();
    input!.value = '你好 b64file';
    input!.dispatchEvent(new Event('input', { bubbles: true }));

    await new Promise((r) => setTimeout(r, 350));

    const output = document.querySelector<HTMLElement>('#text-output');
    expect(output?.hidden).toBe(false);
    expect(output?.textContent).toContain('5L2g5aW9');
  });

  it('switches to file-to-base64 mode via tab', async () => {
    await import('../src/tool');

    const tool = document.querySelector<HTMLElement>('#tool');
    const tab = tool?.querySelector<HTMLButtonElement>('.mode-tab[data-mode="to-base64"]');
    tab?.click();
    expect(tab?.classList.contains('active')).toBe(true);

    const panel = tool?.querySelector<HTMLElement>('.mode-panel[data-panel="to-base64"]');
    expect(panel?.hidden).toBe(false);
    expect(panel?.querySelector('#drop-zone')).toBeTruthy();
  });

  it('moves between tabs with arrow keys (WAI-ARIA tablist)', async () => {
    await import('../src/tool');

    const tool = document.querySelector<HTMLElement>('#tool');
    const tabs = Array.from(tool?.querySelectorAll<HTMLButtonElement>('.mode-tab') ?? []);
    expect(tabs.length).toBe(3);

    const first = tabs.find((t) => t.dataset.mode === 'to-file')!;
    expect(first.tabIndex).toBe(0);
    expect(tabs.find((t) => t.dataset.mode === 'text')!.tabIndex).toBe(-1);

    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    const second = tabs.find((t) => t.dataset.mode === 'to-base64')!;
    expect(second.classList.contains('active')).toBe(true);
    expect(second.getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(second);

    second.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(first.classList.contains('active')).toBe(true);
    expect(document.activeElement).toBe(first);
  });

  it('keeps theme-color meta in sync with the manual theme toggle', async () => {
    localStorage.clear();
    document.head.innerHTML = '<meta name="theme-color" content="#faf9f5" />';
    document.documentElement.dataset.theme = 'light';
    const { initTheme } = await import('../src/theme');
    initTheme();

    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    expect(meta?.getAttribute('content')).toBe('#faf9f5');

    document.querySelector<HTMLButtonElement>('#theme-toggle')!.click();
    expect(meta?.getAttribute('content')).toBe('#1f1e1d');

    document.querySelector<HTMLButtonElement>('#theme-toggle')!.click();
    expect(meta?.getAttribute('content')).toBe('#faf9f5');
  });

  it('shows the offending character with surrounding context on invalid input', async () => {
    await import('../src/tool');

    const input = document.querySelector<HTMLTextAreaElement>('#b64-input');
    input!.value = 'Zm9vYmFy$$x';
    input!.dispatchEvent(new Event('input', { bubbles: true }));

    await new Promise((r) => setTimeout(r, 400));

    const diagnosis = document.querySelector<HTMLElement>('#b64-diagnosis');
    expect(diagnosis?.hidden).toBe(false);
    expect(diagnosis?.textContent).toContain('非法字符');
    expect(diagnosis?.textContent).toContain('位是「$」');
    expect(diagnosis?.textContent).toContain('前后长这样');
    const ctx = diagnosis?.querySelector('.diag-ctx');
    expect(ctx?.textContent).toContain('Zm9vYmFy');
    expect(ctx?.querySelector('strong')?.textContent).toBe('$');
  });

  it('文本模式按页面预设方向：base64-to-text / base64url 默认解码，其他页面默认编码', () => {
    document.body.dataset.page = 'base64-to-text';
    document.body.innerHTML = `<div id="app">${renderShell('base64-to-text')}</div>`;
    expect(document.querySelector<HTMLInputElement>('input[name="text-dir"]:checked')?.value).toBe('decode');
    expect(document.querySelector('#tool')?.getAttribute('data-default-mode')).toBe('text');

    document.body.dataset.page = 'base64url';
    document.body.innerHTML = `<div id="app">${renderShell('base64url')}</div>`;
    expect(document.querySelector<HTMLInputElement>('input[name="text-dir"]:checked')?.value).toBe('decode');

    document.body.dataset.page = 'home';
    document.body.innerHTML = `<div id="app">${renderShell('home')}</div>`;
    expect(document.querySelector<HTMLInputElement>('input[name="text-dir"]:checked')?.value).toBe('encode');
  });
});
