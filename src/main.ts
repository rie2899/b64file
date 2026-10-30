import './styles.css';
import './swiss.css';
import { renderShell, type PageId } from './static-pages';
import { initTool } from './tool';
import { initTheme } from './theme';
import { BAIDU_TONGJI_ID } from './site-config';

const page = (document.body.dataset.page ?? 'home') as PageId;
const app = document.querySelector<HTMLElement>('#app');

if (app && !app.innerHTML.trim()) {
  app.innerHTML = renderShell(page);
}

initTheme();
initTool();

// Baidu Tongji — only loads when an ID is configured AND the page runs on the
// production host, so local dev/preview traffic never pollutes the stats.
const isLocalHost = /^(localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(
  window.location.hostname
);
if (
  BAIDU_TONGJI_ID &&
  import.meta.env.MODE !== 'test' &&
  typeof document !== 'undefined' &&
  !isLocalHost
) {
  window._hmt = window._hmt || [];
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://hm.baidu.com/hm.js?${BAIDU_TONGJI_ID}`;
  document.head.appendChild(script);
}
