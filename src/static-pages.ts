import pageRegistry from '../page-registry.json';
import { DEFAULT_SITE_URL } from './site-config';

export type PageId = string;
export type ToolMode = 'to-file' | 'to-base64' | 'text';

interface Faq {
  q: string;
  a: string;
}

interface Section {
  h2: string;
  html: string;
}

interface PageContent {
  title: string;
  desc: string;
  h1: string;
  answer: string;
  mode: ToolMode;
  sections: Section[];
  faqs: Faq[];
}

export const pagePaths: Record<PageId, string> = Object.fromEntries(
  pageRegistry.map((p) => [p.id, p.path])
);

const pageData: Record<PageId, PageContent> = {
  home: {
    title: 'Base64 转文件 · 文件转 Base64 · 在线编解码工具 - b64file',
    desc: '免费 Base64 在线转换工具：Base64 转文件、文件转 Base64、文本编解码。自动修复 Data URL 前缀与填充符，浏览器本地处理，文件不上传。',
    h1: 'Base64 转文件 · 文件转 Base64',
    answer:
      '粘贴 Base64 字符串还原成文件，或把任意文件编码为 Base64。支持图片、PDF、压缩包等格式，自动诊断并修复常见格式问题。全程本地处理，文件不上传服务器。',
    mode: 'to-file',
    sections: [
      {
        h2: '三步完成转换',
        html: `<ol class="steps">
          <li><strong>输入内容</strong> — 粘贴 Base64 字符串，或拖放要编码的文件</li>
          <li><strong>自动诊断</strong> — 自动检测文件类型，修复前缀、换行、填充符等常见问题</li>
          <li><strong>下载或复制</strong> — 一键下载还原的文件，或复制编码结果</li>
        </ol>`
      },
      {
        h2: '为什么全部本地处理',
        html: `<div class="grid-3">
          <div class="mini-card"><strong>🔒 隐私</strong><p>编码解码在浏览器完成，没有上传接口，服务器只提供页面。</p></div>
          <div class="mini-card"><strong>⚡ 速度</strong><p>不经网络往返，粘贴即可见结果，大文件也不排队。</p></div>
          <div class="mini-card"><strong>📦 识别</strong><p>通过文件头魔数识别 PNG、PDF、ZIP 等 20+ 格式，不依赖文件名。</p></div>
        </div>`
      }
    ],
    faqs: [
      { q: 'Base64 转文件支持哪些格式？', a: '通过文件头魔数自动识别 PNG、JPEG、GIF、WebP、SVG、PDF、ZIP、GZIP、RAR、7Z、MP3、WAV、MP4 等常见格式；无法识别时提供原始二进制下载。' },
      { q: '文件会上传到服务器吗？', a: '不会。编码与解码全部在你的浏览器中完成，服务器只提供页面本身，没有上传接口。' },
      { q: '支持多大的文件？', a: '建议不超过 100 MB。超过 20 MB 时会提示确认，因为大文件会占用较多浏览器内存。' },
      { q: 'Base64 是加密吗？', a: '不是。Base64 是编码方式，任何人都能还原，请勿用于保护密码等敏感数据。' },
      { q: '解码失败怎么办？', a: '常见原因包括非法字符、填充符缺失、数据被截断。请查看 Base64 解码失败排查指南。' }
    ]
  },
  'base64-to-file': {
    title: 'Base64 转文件在线工具 - 免费本地处理 - b64file',
    desc: '粘贴 Base64 字符串，自动识别文件类型并还原为可下载文件。支持 data URL 前缀、Base64URL、缺失填充自动修复。本地处理不上传。',
    h1: 'Base64 转文件在线工具',
    answer:
      '把 Base64 字符串还原为原始文件：粘贴内容后自动识别文件类型（图片、PDF、压缩包等），修复常见格式问题后一键下载。',
    mode: 'to-file',
    sections: [
      {
        h2: '自动修复项',
        html: `<ul>
          <li><strong>Data URL 前缀</strong> — <code>data:image/png;base64,</code> 开头自动去除</li>
          <li><strong>换行与空格</strong> — 邮件、终端复制带出的换行自动清理</li>
          <li><strong>Base64URL</strong> — <code>-</code> 和 <code>_</code> 自动转为标准 <code>+</code> 和 <code>/</code></li>
          <li><strong>填充符</strong> — 缺失的 <code>=</code> 自动补齐，多余的自动修正</li>
        </ul>`
      },
      {
        h2: '支持的文件类型',
        html: `<p>图片：PNG / JPEG / GIF / WebP / BMP / ICO / SVG；文档：PDF；压缩包：ZIP / GZIP / RAR / 7Z；音频：MP3 / WAV / OGG / FLAC；视频：MP4 / MOV / AVI；其他：EXE / ELF / SQLite，以及 UTF-8 纯文本。</p>`
      },
      {
        h2: '不知道原始文件名怎么办',
        html: `<p>工具通过文件头魔数判断类型，不依赖文件名或扩展名。下载时可自定义文件名，默认扩展名来自识别结果。</p>`
      }
    ],
    faqs: [
      { q: '不知道文件类型也能转换吗？', a: '可以。工具读取解码后内容的文件头判断类型，与文件名无关。' },
      { q: '转出来的文件打不开？', a: '通常是 Base64 数据被截断或损坏。查看诊断面板中的错误提示，长度 % 4 余 1 说明内容不完整。' },
      { q: '支持 data URL 前缀吗？', a: '支持。<code>data:image/png;base64,...</code> 格式会自动去除前缀并记录 MIME 类型。' }
    ]
  },
  'file-to-base64': {
    title: '文件转 Base64 在线工具 - 拖放即用 - b64file',
    desc: '拖放任意文件生成 Base64 字符串，可选 URL-safe 格式或 data URL 前缀。适合 API 对接、JSON 嵌入、前端内嵌资源。本地处理。',
    h1: '文件转 Base64 在线工具',
    answer:
      '把图片、PDF、文档等任意文件编码为 Base64 字符串，可附加 data: 前缀直接用于网页，或选择 URL-safe 格式用于接口传输。',
    mode: 'to-base64',
    sections: [
      {
        h2: '什么时候需要文件转 Base64',
        html: `<ul>
          <li><strong>API 对接</strong> — 接口要求在 JSON 字段中传文件内容</li>
          <li><strong>前端内嵌</strong> — 小图片直接写进 HTML / CSS，减少请求数</li>
          <li><strong>邮件与配置</strong> — 在纯文本协议中携带二进制数据</li>
        </ul>`
      },
      {
        h2: '三种输出格式',
        html: `<ul>
          <li><strong>标准 Base64</strong> — 含 <code>+</code> <code>/</code> 和 <code>=</code>，最通用</li>
          <li><strong>URL-safe</strong> — <code>-</code> <code>_</code> 替代，无填充，适合 URL 参数</li>
          <li><strong>data URL</strong> — 带 <code>data:MIME;base64,</code> 前缀，可直接放进 src</li>
        </ul>`
      }
    ],
    faqs: [
      { q: '编码后体积会变多大？', a: 'Base64 编码后体积约为原文件的 4/3（膨胀约 33%）。' },
      { q: '能批量转换吗？', a: '当前版本一次一个文件。批量需求较多时会考虑加入。' },
      { q: '文件会上传吗？', a: '不会，编码在浏览器本地完成，关闭页面后数据即消失。' }
    ]
  },
  'base64-to-image': {
    title: 'Base64 转图片在线工具 - 预览并下载 - b64file',
    desc: '粘贴图片 Base64 字符串，立即在线预览并下载为 PNG、JPG、WebP、GIF 图片文件。支持 data URL 前缀自动去除。本地处理。',
    h1: 'Base64 转图片在线工具',
    answer:
      '粘贴图片的 Base64 编码，直接在浏览器中预览图片效果，并下载为对应格式的图片文件。支持 PNG、JPEG、GIF、WebP、BMP、ICO、SVG。',
    mode: 'to-file',
    sections: [
      {
        h2: '常见图片 Base64 前缀',
        html: `<table class="simple-table">
          <tr><th>格式</th><th>Data URL 前缀</th><th>魔数特征</th></tr>
          <tr><td>PNG</td><td><code>data:image/png;base64,</code></td><td><code>iVBORw0KGgo</code> 开头</td></tr>
          <tr><td>JPEG</td><td><code>data:image/jpeg;base64,</code></td><td><code>/9j/</code> 开头</td></tr>
          <tr><td>GIF</td><td><code>data:image/gif;base64,</code></td><td><code>R0lGOD</code> 开头</td></tr>
          <tr><td>WebP</td><td><code>data:image/webp;base64,</code></td><td>RIFF 容器</td></tr>
        </table>
        <p>不需要记住这些——工具会自动识别并去除前缀。</p>`
      },
      {
        h2: '预览是原图吗',
        html: '<p>是。预览使用浏览器原生渲染解码后的图片数据，所见即下载内容。</p>'
      }
    ],
    faqs: [
      { q: 'Base64 转图片后显示不出来？', a: '检查诊断面板是否提示数据截断或非法字符。图片文件头损坏时无法渲染，但原始字节仍可下载。' },
      { q: '支持 SVG 吗？', a: '支持。SVG 是文本格式，工具会检测 <code>&lt;svg</code> 标签并识别为 SVG 图片。' },
      { q: '能转换 base64 图片为 PNG 格式吗？', a: '工具还原为原始格式。格式转换（如 WebP 转 PNG）不属于 Base64 解码范畴。' }
    ]
  },
  'image-to-base64': {
    title: '图片转 Base64 在线工具 - 生成 data URL - b64file',
    desc: '上传图片生成 Base64 字符串或 data URL，可直接用于 CSS background、HTML img 标签和 JSON 数据。本地处理不上传。',
    h1: '图片转 Base64 在线工具',
    answer:
      '上传 PNG、JPG、WebP 等图片，生成 Base64 字符串或带前缀的 data URL，复制后可直接嵌入代码。',
    mode: 'to-base64',
    sections: [
      {
        h2: '在 HTML 中使用',
        html: '<pre class="code-block">&lt;img src="data:image/png;base64,iVBORw0KGgo..." alt="示例" /&gt;</pre>'
      },
      {
        h2: '在 CSS 中使用',
        html: '<pre class="code-block">.hero {\n  background-image: url(data:image/png;base64,iVBORw0KGgo...);\n}</pre>'
      },
      {
        h2: '注意事项',
        html: '<p>Base64 使体积膨胀约 33%，建议只对小图标、装饰图使用内嵌；大图仍应走独立文件与缓存。此外内嵌图片无法被浏览器单独缓存，每次加载页面都会重新传输。</p>'
      }
    ],
    faqs: [
      { q: '转换后代码太长怎么办？', a: '结果过大时工具不展示全文，直接提供复制和下载 .txt，避免卡顿页面。' },
      { q: '转出来的能直接放 CSS 吗？', a: '勾选「加 data: 前缀」后即可直接放入 url() 或 src 属性。' },
      { q: '有体积限制吗？', a: '上限 100 MB，超过 20 MB 会提示确认。' }
    ]
  },
  'base64-to-pdf': {
    title: 'Base64 转 PDF 在线工具 - 电子发票合同还原 - b64file',
    desc: '粘贴 PDF 的 Base64 编码，还原为 PDF 文件下载。适合电子发票、电子合同、接口返回的 PDF 数据。本地处理。',
    h1: 'Base64 转 PDF 在线工具',
    answer:
      '把接口返回或系统导出的 PDF Base64 字符串还原为可打开的 PDF 文件。本地处理，适合电子发票、电子合同等场景。',
    mode: 'to-file',
    sections: [
      {
        h2: '电子发票与电子合同场景',
        html: '<p>许多开票系统、签署平台通过接口返回 PDF 的 Base64 字符串。粘贴到工具中即可还原为 .pdf 文件，无需写代码或使用命令行。</p>'
      },
      {
        h2: '如何确认内容是 PDF',
        html: '<p>PDF 文件以 <code>%PDF</code> 开头。Base64 编码后通常以 <code>JVBERi</code> 开头。工具会自动检测并在结果卡片中显示「PDF 文档」。</p>'
      }
    ],
    faqs: [
      { q: '还原后 PDF 打不开？', a: '若诊断提示数据被截断，说明复制时丢失了部分内容，需要重新获取完整字符串。' },
      { q: '支持加密 PDF 吗？', a: '还原的是原始文件。如果 PDF 本身有密码，打开时仍需输入密码。' }
    ]
  },
  'pdf-to-base64': {
    title: 'PDF 转 Base64 在线工具 - b64file',
    desc: '上传 PDF 文件生成 Base64 字符串，用于 API 传输、JSON 嵌入或系统对接。本地处理不上传。',
    h1: 'PDF 转 Base64 在线工具',
    answer:
      '把 PDF 文件编码为 Base64 字符串，复制后用于接口传参、JSON 数据或跨系统传输。',
    mode: 'to-base64',
    sections: [
      {
        h2: '常见使用场景',
        html: '<p>上传电子合同到签署接口、把发票文件放进 JSON 报文、在纯文本协议中携带 PDF 附件。勾选 data: 前缀可直接用于网页嵌入下载。</p>'
      },
      {
        h2: '体积提示',
        html: '<p>PDF 编码后体积约为原文件的 1.33 倍。传给接口前请确认对方字段长度限制。</p>'
      }
    ],
    faqs: [
      { q: '扫描版 PDF 支持吗？', a: '支持。Base64 编码不关心内容，图片型 PDF 与文本型 PDF 均可转换。' },
      { q: '文件会上传吗？', a: '不会，本地处理。' }
    ]
  },
  'base64-decode-errors': {
    title: 'Base64 解码失败常见原因与自动修复方法 - b64file',
    desc: 'Base64 解码报错的 5 大原因：非法字符、填充符错误、数据截断、Base64URL 混用、Data URL 前缀。附自动修复方案。',
    h1: 'Base64 解码失败常见原因与修复方法',
    answer:
      'Base64 解码失败通常源于非法字符、填充符问题或数据被截断。以下是五类常见错误及处理方法，本站工具可自动修复其中大部分。',
    mode: 'to-file',
    sections: [
      {
        h2: '1. 非法字符',
        html: '<p>Base64 标准字母表只含 A-Z、a-z、0-9、<code>+</code>、<code>/</code> 和填充符 <code>=</code>。中文、全角空格、中文标点或二进制垃圾混入都会导致失败。<strong>修复：</strong>删除非法字符，或使用本站工具自动定位错误位置。</p>'
      },
      {
        h2: '2. 填充符缺失或多余',
        html: '<p>Base64 长度必须是 4 的倍数，不足时以 <code>=</code> 补齐（最多 2 个）。手工复制常丢失末尾的 <code>=</code>。<strong>修复：</strong>本站工具自动补齐缺失填充、修正多余填充。</p>'
      },
      {
        h2: '3. 数据被截断（长度 % 4 余 1）',
        html: '<p>当去除填充后的长度除以 4 余 1 时，数据一定不完整——这种余数在任何合法 Base64 中都不存在。<strong>修复：</strong>无法自动恢复，需重新获取完整数据。</p>'
      },
      {
        h2: '4. Base64URL 与标准字母表混用',
        html: '<p>URL-safe 变体用 <code>-</code> <code>_</code> 替代 <code>+</code> <code>/</code> 且通常省略填充。JWT 等场景常见。<strong>修复：</strong>本站工具检测到这两种字符时自动转换为标准字母表。</p>'
      },
      {
        h2: '5. Data URL 前缀未去除',
        html: '<p><code>data:image/png;base64,</code> 这类前缀不是 Base64 的一部分，直接解码会报非法字符。<strong>修复：</strong>本站工具自动去除前缀并记录 MIME 类型。</p>'
      }
    ],
    faqs: [
      { q: '长度 % 4 余 1 一定错吗？', a: '是。合法 Base64 去除填充后长度除以 4 只能余 0、2 或 3，余 1 必然意味着数据不完整。' },
      { q: '解码成功但文件打不开？', a: '内容可能不是你预期的格式，或原始文件本身损坏。查看结果卡片中识别出的文件类型。' },
      { q: '有自动修复工具吗？', a: '本站 Base64 转文件工具内置上述全部自动修复逻辑，粘贴即可查看诊断报告。' }
    ]
  },
  'json-to-file': {
    title: 'JSON 转文件在线工具 - 提取接口返回中的 Base64 文件 - b64file',
    desc: '粘贴接口返回的 JSON，自动提取其中所有 Base64 文件并下载。支持复制不完整的 JSON 数据恢复，PDF、图片格式自动识别。本地处理不上传。',
    h1: 'JSON 转文件在线工具',
    answer:
      '把接口返回 JSON 中的 Base64 内容还原为文件：粘贴完整 JSON 或复制不完整的片段，自动提取全部文件并按文件名逐个下载，全程本地处理。',
    mode: 'to-file',
    sections: [
      {
        h2: '适用场景',
        html: `<ul>
          <li><strong>电子发票 / 电子合同接口</strong> — 返回 JSON 里嵌着 Base64 的 PDF，需要还原成文件</li>
          <li><strong>多附件一次提取</strong> — 数组里多个文件字段，逐个下载</li>
          <li><strong>复制丢头也能恢复</strong> — 从中间开始复制的残缺 JSON，照样提取出文件</li>
        </ul>`
      },
      {
        h2: '支持的数据结构',
        html: '<pre class="code-block">[\n  {\n    "fileCode": "TD0101",\n    "fileName": "评价标准.pdf",\n    "fileContent": "JVBERi0xLjQ..."\n  }\n]</pre><p>工具会识别 fileContent、content、base64、data 等常见字段名，也支持任意嵌套层级；文件名优先取 fileName / name / title / fileCode。</p>'
      },
      {
        h2: '与普通 Base64 转换的区别',
        html: '<p>普通工具只接受纯 Base64 字符串，贴入 JSON 会报一堆非法字符错误。本工具先识别 JSON 结构再逐字段提取，JSON 解析失败时还会按标点切分做残缺恢复——复制不完整也不丢文件。</p>'
      }
    ],
    faqs: [
      { q: 'JSON 解析失败还能提取吗？', a: '能。复制丢头等导致的解析失败会自动切换到残缺恢复模式，按 JSON 标点切分提取所有完整 Base64 片段。' },
      { q: '文件名从哪里来？', a: '优先使用 JSON 里的 fileName / name / title 字段；残缺恢复模式下若文件名已随复制丢失，则按识别出的扩展名命名。' },
      { q: '能提取多少个文件？', a: '没有硬性数量限制，取决于数据本身大小（建议总量不超过 100 MB）。' },
      { q: 'JSON 数据会被上传吗？', a: '不会，解析和提取全部在浏览器本地完成。' }
    ]
  },
  privacy: {
    title: '隐私政策 - b64file',
    desc: 'b64file 隐私政策：所有文件转换在浏览器本地完成，文件内容不上传、不存储、不记录。',
    h1: '隐私政策',
    answer:
      'b64file 的核心承诺：你粘贴或拖入的所有内容（Base64 字符串、JSON 数据、文件）仅在浏览器内存中处理，不会上传到任何服务器，关闭页面即消失。',
    mode: 'to-file',
    sections: [
      {
        h2: '本地处理原则',
        html: '<p>本站没有文件上传接口。编码、解码、JSON 提取、文件类型识别全部由你的浏览器完成，服务器只提供页面本身（HTML / CSS / JS 静态资源）。</p>'
      },
      {
        h2: '我们不收集什么',
        html: `<ul>
          <li>不收集文件内容、文件名、Base64 字符串</li>
          <li>不收集你在工具中输入的任何文本</li>
          <li>不使用 Cookie，不使用 localStorage / sessionStorage 存储你的数据</li>
          <li>不注册、不登录，无任何账号体系</li>
        </ul>`
      },
      {
        h2: '访问统计',
        html: '<p>为改进服务，本站可能启用匿名访问统计（百度统计），仅记录页面访问量、访问来源、浏览器环境等常规指标。统计数据与你在工具中处理的内容完全无关，且不包含任何可识别文件内容的信息。你可通过浏览器拦截扩展屏蔽统计脚本，不影响工具任何功能。</p>'
      },
      {
        h2: '第三方服务',
        html: '<p>本站静态资源由服务器托管商提供（含基础访问日志，仅记录 IP、时间、URL 等连接层信息）。除此之外不向任何第三方发送数据。</p>'
      },
      {
        h2: '安全提醒',
        html: '<p>Base64 是编码方式而非加密，任何人都能还原。请不要用它保护密码、密钥等敏感数据。</p>'
      }
    ],
    faqs: [
      { q: '关闭页面后数据会保留吗？', a: '不会。所有处理都在内存中完成，关闭或刷新页面后即消失。' },
      { q: '怎么证明没有上传？', a: '打开浏览器开发者工具的 Network 面板再使用工具，可以看到除页面静态资源外没有任何数据请求。' }
    ]
  }
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );
}

function siteUrl(): string {
  const nodeUrl = typeof process !== 'undefined' ? process.env.SITE_URL : '';
  const viteUrl = import.meta.env?.VITE_SITE_URL ?? '';
  return nodeUrl || viteUrl || DEFAULT_SITE_URL;
}

function absoluteUrl(path: string): string {
  const base = siteUrl().replace(/\/$/, '');
  return base ? `${base}${path}` : '';
}

export function renderShell(currentPage: PageId): string {
  const showTool = currentPage !== 'privacy';
  return `
    ${header()}
    <main>
      ${hero(currentPage)}
      ${showTool ? toolCard(currentPage) : ''}
      ${contentSections(currentPage)}
      ${faqSection(currentPage)}
      ${relatedLinks(currentPage)}
    </main>
    ${footer()}
  `;
}

function header(): string {
  return `
    <header class="site-header">
      <nav class="nav" aria-label="主导航">
        <a class="brand" href="/"><span class="brand-mark">b64</span>file</a>
        <div class="nav-links">
          <a href="/base64-to-file/">Base64 转文件</a>
          <a href="/json-to-file/">JSON 转文件</a>
          <a href="/file-to-base64/">文件转 Base64</a>
          <a href="/base64-to-image/">Base64 转图片</a>
          <a href="/base64-decode-errors/">解码失败排查</a>
        </div>
        <div class="nav-side">
          <span class="local-chip" title="所有转换在浏览器本地完成">🔒 本地处理</span>
          <button id="theme-toggle" class="theme-toggle" type="button" aria-label="切换深浅主题">🌙</button>
        </div>
      </nav>
    </header>
  `;
}

function hero(page: PageId): string {
  const d = pageData[page] ?? pageData.home;
  return `
    <section class="hero">
      <h1>${d.h1}</h1>
      <p class="answer">${d.answer}</p>
    </section>
  `;
}

function toolCard(page: PageId): string {
  const d = pageData[page] ?? pageData.home;
  return `
    <section class="tool-card" id="tool" data-default-mode="${d.mode}">
      <div class="mode-tabs" role="tablist" aria-label="转换模式">
        <button class="mode-tab" data-mode="to-file" role="tab" type="button">Base64 转文件</button>
        <button class="mode-tab" data-mode="to-base64" role="tab" type="button">文件转 Base64</button>
        <button class="mode-tab" data-mode="text" role="tab" type="button">文本编解码</button>
      </div>

      <div class="mode-panel" data-panel="to-file">
        <textarea id="b64-input" class="mono-input" rows="6" spellcheck="false"
          placeholder="粘贴 Base64 字符串，支持 data:image/png;base64,... 等格式"></textarea>
        <div class="input-actions">
          <button id="b64-load-file" class="ghost-btn" type="button">读取 .txt / .b64 文件</button>
          <input type="file" id="b64-file-input" accept=".txt,.b64,.text,text/plain" hidden />
          <button id="b64-clear" class="ghost-btn" type="button">清空</button>
        </div>
        <div id="b64-diagnosis" class="diagnosis" hidden></div>
        <div id="b64-result" class="result-area" hidden></div>
      </div>

      <div class="mode-panel" data-panel="to-base64" hidden>
        <div id="drop-zone" class="drop-zone">
          <div class="drop-icon">📄</div>
          <p><strong>拖放文件到此处</strong> 或 <button id="pick-file" class="link-btn" type="button">点击选择</button></p>
          <p class="muted">任意文件类型 · 上限 100 MB · 不上传服务器</p>
          <input type="file" id="file-input" hidden />
        </div>
        <div id="file-info" hidden></div>
        <div id="encode-options" class="encode-options" hidden>
          <label><input type="checkbox" id="opt-urlsafe" /> URL-safe（- _ 替代 + /，无填充）</label>
          <label><input type="checkbox" id="opt-dataurl" /> 附加 data: MIME 前缀</label>
        </div>
        <div id="encode-result" hidden></div>
      </div>

      <div class="mode-panel" data-panel="text" hidden>
        <div class="text-direction">
          <label><input type="radio" name="text-dir" value="encode" checked /> 文本 → Base64</label>
          <label><input type="radio" name="text-dir" value="decode" /> Base64 → 文本</label>
        </div>
        <textarea id="text-input" class="mono-input" rows="4" spellcheck="false"
          placeholder="输入文本或 Base64 字符串..."></textarea>
        <div id="text-output" class="text-output" hidden></div>
      </div>

      <p class="local-note">🔒 文件与内容仅在你的浏览器中处理，不经过服务器</p>
    </section>
  `;
}

function contentSections(page: PageId): string {
  const d = pageData[page] ?? pageData.home;
  if (!d.sections.length) return '';
  return d.sections
    .map((s) => `<section class="section"><h2>${s.h2}</h2>${s.html}</section>`)
    .join('\n');
}

function faqSection(page: PageId): string {
  const d = pageData[page] ?? pageData.home;
  return `
    <section class="section">
      <h2>常见问题</h2>
      ${d.faqs.map((f) => `<details><summary>${f.q}</summary><p class="muted">${f.a}</p></details>`).join('')}
    </section>
  `;
}

function relatedLinks(currentPage: PageId): string {
  const items = pageRegistry
    .filter((p) => p.id !== currentPage)
    .map((p) => `<a href="${p.path}">${pageData[p.id]?.h1 ?? p.id}</a>`)
    .join('');
  return `
    <section class="section">
      <h2>相关工具与指南</h2>
      <div class="related-links">${items}</div>
    </section>
  `;
}

function footer(): string {
  return `
    <footer class="footer">
      <p><strong>b64file</strong> — Base64 与文件互转工具。所有转换在浏览器本地完成，文件不上传服务器。</p>
      <div class="footer-links">
        <a href="/">首页</a>
        <a href="/base64-to-file/">Base64 转文件</a>
        <a href="/json-to-file/">JSON 转文件</a>
        <a href="/file-to-base64/">文件转 Base64</a>
        <a href="/base64-to-image/">Base64 转图片</a>
        <a href="/image-to-base64/">图片转 Base64</a>
        <a href="/base64-to-pdf/">Base64 转 PDF</a>
        <a href="/pdf-to-base64/">PDF 转 Base64</a>
        <a href="/base64-decode-errors/">解码失败排查</a>
        <a href="/privacy/">隐私政策</a>
      </div>
      <p class="muted">© b64file.cn · Base64 是编码而非加密，请勿用于保护敏感数据</p>
    </footer>
  `;
}

export function metaTags(page: PageId): string {
  const d = pageData[page] ?? pageData.home;
  return `<title>${d.title}</title>\n    <meta name="description" content="${d.desc}" />`;
}

export function canonicalTag(page: PageId): string {
  const url = absoluteUrl(pagePaths[page] ?? '/');
  return url ? `<link rel="canonical" href="${url}" />` : '';
}

export function jsonLdScript(page: PageId): string {
  return `<script type="application/ld+json">${JSON.stringify(jsonLd(page))}</script>`;
}

function jsonLd(page: PageId): unknown[] {
  const d = pageData[page] ?? pageData.home;
  const path = pagePaths[page] ?? '/';
  const url = absoluteUrl(path) || path;
  const graph: unknown[] = [];

  if (page === 'home') {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'b64file',
      url: absoluteUrl('/') || '/',
      description: 'Base64 转文件、文件转 Base64、文本编解码的本地在线工具。'
    });
  }

  graph.push({
    '@context': 'https://schema.org',
    '@type': page === 'base64-decode-errors' ? 'Article' : 'WebApplication',
    name: d.h1,
    description: d.desc,
    url,
    ...(page === 'base64-decode-errors'
      ? { headline: d.h1 }
      : {
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web browser',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' }
        })
  });

  graph.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: absoluteUrl('/') || '/' },
      { '@type': 'ListItem', position: 2, name: d.h1, item: url }
    ]
  });

  graph.push({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') }
    }))
  });

  return graph;
}
