import './styles.css';
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

// Baidu Tongji — only loads when an ID is configured in site.config.json
if (BAIDU_TONGJI_ID && import.meta.env.MODE !== 'test' && typeof document !== 'undefined') {
  window._hmt = window._hmt || [];
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://hm.baidu.com/hm.js?${BAIDU_TONGJI_ID}`;
  document.head.appendChild(script);
}
