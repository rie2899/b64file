/**
 * Baidu Tongji event helper. Safe no-op until the script loads
 * (i.e. until baiduTongjiId is configured in site.config.json).
 * Only behavioral metadata is ever sent — never file names, content or input.
 */
declare global {
  interface Window {
    _hmt?: unknown[][];
  }
}

export function trackEvent(category: string, action: string, label?: string): void {
  try {
    window._hmt?.push(['_track_event', category, action, label]);
  } catch {
    // analytics must never interrupt the tool
  }
}
