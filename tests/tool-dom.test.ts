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
});
