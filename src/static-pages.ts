import pageRegistry from '../page-registry.json';
import { DEFAULT_SITE_URL, FEEDBACK_EMAIL, ICP_NUMBER } from './site-config';

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
    desc: '免费在线 Base64 工具：文件转 Base64、Base64 转文件、文本编解码一站搞定。自动修复前缀和填充符问题，全程浏览器本地跑，文件不上传。',
    h1: 'Base64 转文件 · 文件转 Base64',
    answer:
      '贴进来。纯 Base64、带前缀的 Data URL、甚至整段接口返回的 JSON——先自动体检，能修的都修了，修不了的告诉你坏在哪，最后把文件还给你。图片、PDF、压缩包都认识。文件不出浏览器：没有上传接口，想传也没地方传。',
    mode: 'to-file',
    sections: [
      {
        h2: '怎么用：三步',
        html: `<ol class="steps">
          <li><strong>贴进来</strong> — 粘贴、拖文件、Ctrl+V 截图，格式不挑</li>
          <li><strong>看体检报告</strong> — 前缀、换行、缺失的填充符，能修的都替你修了；数据断了会明确告诉你</li>
          <li><strong>拿走文件</strong> — 下载还原后的文件，或者直接复制编码结果</li>
        </ol>`
      },
      {
        h2: '为什么死磕本地处理',
        html: `<div class="grid-3">
          <div class="mini-card"><div class="mc-bar">no_upload</div><strong>没有上传接口</strong><p>不是"我们承诺不看你数据"，是技术上做不到——服务器只有静态页面，连接收文件的接口都不存在。</p></div>
          <div class="mini-card"><div class="mc-bar">instant</div><strong>粘贴的瞬间出结果</strong><p>没有网络往返，处理直接在你设备上跑完。不信可以打开开发者工具的 Network 面板，自己盯着看。</p></div>
          <div class="mini-card"><div class="mc-bar">magic_bytes</div><strong>认文件靠文件头</strong><p>不靠扩展名：%PDF 开头就是 PDF，改成 .exe 也骗不过它。20 多种格式开箱即认。</p></div>
        </div>`
      }
    ],
    faqs: [
      { q: '支持哪些格式？', a: '图片、PDF、压缩包、音视频……二十多种主流格式，靠文件头认，不认扩展名。实在认不出来，也会把原始二进制文件甩给你下载。' },
      { q: '文件会被传到哪吗？', a: '哪也去不了。没有上传接口，服务器只发页面本身。不信的话，开着 Network 面板用一遍。' },
      { q: '最大能处理多大？', a: '100 MB 封顶，超过 20 MB 会先跟你确认——大文件吃内存，别把你标签页搞崩了。' },
      { q: 'Base64 是加密吗？', a: '不是，差得远。Base64 谁都能还原，别拿它保护密码。' },
      { q: '解码失败怎么办？', a: '八成是非法字符、缺填充符或数据被截断。看解码失败排查指南，或者直接贴进来让工具告诉你坏在哪。' }
    ]
  },
  'base64-to-file': {
    title: 'Base64 转文件在线工具 - 免费本地处理 - b64file',
    desc: '粘贴 Base64 字符串，自动认出文件类型并还原成可下载文件。前缀、Base64URL、缺填充这些老毛病，都能自动修。全程本地跑，不上传。',
    h1: 'Base64 转文件在线工具',
    answer:
      '粘贴 Base64，自动认出它是什么文件——看文件头，不看文件名。前缀、换行、缺填充符这些常见毛病能修的都替你修了，修不了的会告诉你数据断在哪。修好之后，一键下载。',
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
        html: `<p>不用你操心——工具靠文件头魔数认类型，跟文件名、扩展名都没关系。下载时想改名随你，默认扩展名会按识别结果自动配好。</p>`
      }
    ],
    faqs: [
      { q: '不知道文件类型也能转换吗？', a: '能。工具看的是文件头，不是文件名，你不知道反而更省事。' },
      { q: '转出来的文件打不开？', a: '大概率是数据在复制的时候被截断或者弄脏了。看看诊断面板怎么说——如果提示长度 % 4 余 1，那就是内容确实不完整，得重新完整获取一份。' },
      { q: '支持 data URL 前缀吗？', a: '支持，<code>data:image/png;base64,...</code> 这种格式会自动去掉前缀，还会顺手记下 MIME 类型。' }
    ]
  },
  'file-to-base64': {
    title: '文件转 Base64 在线工具 - 拖放即用 - b64file',
    desc: '拖个文件进来就能生成 Base64，标准、URL-safe、带 data URL 前缀，随你挑。接口对接、JSON 里塞文件、前端内嵌资源都用得上。全程本地处理。',
    h1: '文件转 Base64 在线工具',
    answer:
      '拖个文件进来，变成 Base64 拿走。三种格式可选：标准、URL-safe、带 data: 前缀的直接塞进网页就能用。截图党福利：Ctrl+V 粘贴截图立即出结果。',
    mode: 'to-base64',
    sections: [
      {
        h2: '什么时候需要文件转 Base64',
        html: `<ul>
          <li><strong>接口对接</strong> — 有些接口就吃 JSON 里内嵌的文件内容</li>
          <li><strong>前端内嵌</strong> — 小图片直接写进 HTML / CSS，减少请求数</li>
          <li><strong>邮件与配置</strong> — 纯文本协议传不了二进制？编码一下就行</li>
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
      { q: '编码后体积会变多大？', a: '大概涨 33%，也就是变成原来的 4/3 左右。' },
      { q: '能批量转换吗？', a: '现在还不行，一次只能转一个。喊的人多了，会考虑安排上。' },
      { q: '文件会上传吗？', a: '不会，编码全在你浏览器里跑，页面一关，数据就没了。' }
    ]
  },
  'base64-to-image': {
    title: 'Base64 转图片在线工具 - 预览并下载 - b64file',
    desc: '粘贴图片的 Base64，马上预览，下载成 PNG、JPG、WebP、GIF 都行。data URL 前缀自动帮你去掉，全程本地处理。',
    h1: 'Base64 转图片在线工具',
    answer:
      '贴入图片的 Base64，先看到预览，再下载成 PNG / JPG / WebP / GIF。认格式靠文件头不看文件名——iVBOR 开头是 PNG，/9j/ 开头是 JPEG，这些你不用记。',
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
        html: '<p>是。预览用的就是解码后的原始图片数据，浏览器直接渲染——你看到什么，下载的就是什么。</p>'
      }
    ],
    faqs: [
      { q: 'Base64 转图片后显示不出来？', a: '先看看诊断面板有没有提示数据截断或者非法字符。如果是文件头本身就坏了，图片确实渲染不出来，但原始字节还在，照样能下载下来自己想办法。' },
      { q: '支持 SVG 吗？', a: '支持。SVG 本质是文本，工具看到 <code>&lt;svg</code> 标签就认出来了。' },
      { q: '能把 base64 图片转成 PNG 格式吗？', a: '工具只负责把编码还原成它原本的样子，格式转换（比如 WebP 转 PNG）不是解码能干的事，这个咱们真帮不了。' }
    ]
  },
  'image-to-base64': {
    title: '图片转 Base64 在线工具 - 生成 data URL - b64file',
    desc: '上传图片，生成 Base64 或 data URL，直接拿去写 CSS background、HTML img，或者塞进 JSON 都行。本地处理，不上传。',
    h1: '图片转 Base64 在线工具',
    answer:
      '图片拖进来（或 Ctrl+V 粘贴截图），Base64 拿走。勾上「带上 data: 前缀」，可以直接塞进 CSS 和 &lt;img&gt;。提醒一句：体积会膨胀约 33%，大图直接内嵌是下策。',
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
        html: '<p>Base64 会让体积膨胀约 33%，小图标、装饰图内嵌问题不大，大图还是老老实实走独立文件、吃浏览器缓存比较划算。顺带一提，内嵌进页面的图片没法单独缓存，每次加载都得重新传一遍。</p>'
      }
    ],
    faqs: [
      { q: '转出来的代码太长怎么办？', a: '结果太大就不硬塞进页面了，直接给你复制按钮和 .txt 下载，省得页面卡成 PPT。' },
      { q: '转出来的能直接放 CSS 吗？', a: '能，勾上「带上 data: 前缀」，直接丢进 url() 或者 src 属性就行。' },
      { q: '有体积限制吗？', a: '上限 100 MB，超过 20 MB 会先跟你打个招呼确认一下。' }
    ]
  },
  'base64-to-pdf': {
    title: 'Base64 转 PDF 在线工具 - 电子发票合同还原 - b64file',
    desc: '粘贴 PDF 的 Base64 编码，一键还原成 PDF 文件下载。电子发票、电子合同、接口吐出来的 PDF 数据都能处理。本地跑，不上传。',
    h1: 'Base64 转 PDF 在线工具',
    answer:
      '开票系统、签署平台吐出来的 Base64 串？贴进来还原成 PDF 直接下载。开头 JVBERi 就认得那是 PDF——这个你也不用记，工具替你看着。',
    mode: 'to-file',
    sections: [
      {
        h2: '电子发票与电子合同场景',
        html: '<p>不少开票系统、签署平台的接口，返回的就是 PDF 的 Base64 字符串。直接贴进来，就能还原成 .pdf 文件——不用写代码，也不用敲命令行。</p>'
      },
      {
        h2: '如何确认内容是 PDF',
        html: '<p>PDF 文件的开头永远是 <code>%PDF</code>，编码成 Base64 后基本都是 <code>JVBERi</code> 打头。工具会自动认出来，结果卡片上直接标「PDF 文档」，不用你猜。</p>'
      }
    ],
    faqs: [
      { q: '还原后 PDF 打不开？', a: '看看诊断面板是不是提示数据被截断——大概率是复制的时候丢了一截，回去重新完整复制一遍就好。' },
      { q: '支持加密 PDF 吗？', a: '工具只负责把文件原样还原，PDF 本身要是加了密码，打开时该输入还得输入，这个跳不过去。' }
    ]
  },
  'pdf-to-base64': {
    title: 'PDF 转 Base64 在线工具 - b64file',
    desc: '上传 PDF，生成 Base64 字符串，接口传输、JSON 嵌入、系统对接都能直接用。本地处理，不上传。',
    h1: 'PDF 转 Base64 在线工具',
    answer:
      'PDF 拖进来，Base64 复制走，接口传参、JSON 报文、跨系统对接都用得上。提醒一句：编码后体积会涨约 33%，先确认对方接口的字段扛不扛得住。',
    mode: 'to-base64',
    sections: [
      {
        h2: '常见使用场景',
        html: '<p>把电子合同传去签署接口、把发票塞进 JSON 报文、或者在纯文本协议里带上 PDF 附件——这些场景都用得上。勾上「带上 data: 前缀」，还能直接用来网页嵌入下载。</p>'
      },
      {
        h2: '体积提示',
        html: '<p>PDF 编码后体积会涨约 33%。传给接口之前，最好先确认一下对方字段的长度限制，免得传到一半被拒。</p>'
      }
    ],
    faqs: [
      { q: '扫描版 PDF 支持吗？', a: '支持。Base64 才不管你里面是图片还是文字，照单全收。' },
      { q: '文件会上传吗？', a: '不会，编码全在你浏览器里跑完。' }
    ]
  },
  'base64-decode-errors': {
    title: 'Base64 解码失败常见原因与自动修复方法 - b64file',
    desc: 'Base64 解码报错的 5 大原因：非法字符、填充符错误、数据截断、Base64URL 混用、Data URL 前缀。附自动修复方案。',
    h1: 'Base64 解码失败常见原因与修复方法',
    answer:
      '解码失败不是玄学，八成是这五种之一。其中四类贴进工具就自动修好；第五种（数据截断）修不了——但工具会明确告诉你断在哪，省得瞎猜。',
    mode: 'to-file',
    sections: [
      {
        h2: '1. 非法字符',
        html: '<p>Base64 的字母表就这么些字符：A-Z、a-z、0-9、<code>+</code>、<code>/</code>，再加填充符 <code>=</code>。混进中文、全角空格、中文标点，或者哪来的二进制垃圾，都会直接报错。<strong>解决办法：</strong>删掉这些非法字符，或者干脆贴进本站工具，它会告诉你具体错在第几位。</p>'
      },
      {
        h2: '2. 填充符缺失或多余',
        html: '<p>Base64 的长度必须是 4 的倍数，不够就拿 <code>=</code> 补齐（最多补 2 个）。手动复制时，末尾的 <code>=</code> 最容易被漏掉。<strong>解决办法：</strong>用<a href="/base64-to-file/">Base64 转文件工具</a>，缺的自动补上，多的自动修正，不用你数。</p>'
      },
      {
        h2: '3. 数据被截断（长度 % 4 余 1）',
        html: '<p>去掉填充符之后，如果长度除以 4 余 1，那数据肯定是不完整的——这种余数在合法 Base64 里根本不存在。<strong>解决办法：</strong>这个真修不了，只能麻烦你回去重新拿一份完整数据。</p>'
      },
      {
        h2: '4. Base64URL 与标准字母表混用',
        html: '<p>URL-safe 版本会用 <code>-</code> <code>_</code> 替代 <code>+</code> <code>/</code>，而且通常不带填充符，JWT 之类的场景很常见。<strong>解决办法：</strong>本站工具一看到这两个字符，会自动帮你转成标准字母表。</p>'
      },
      {
        h2: '5. Data URL 前缀未去除',
        html: '<p><code>data:image/png;base64,</code> 这种前缀根本不算 Base64 的一部分，直接拿去解码只会报非法字符。<strong>解决办法：</strong><a href="/base64-to-file/">转换工具</a>会自动把前缀摘掉，还会顺手记下 MIME 类型。</p>'
      }
    ],
    faqs: [
      { q: '长度 % 4 余 1 一定错吗？', a: '没错，一定是错的。合法 Base64 去掉填充后除以 4 只能余 0、2 或 3，余 1 说明数据缺了一块，跑不掉。' },
      { q: '解码成功但文件打不开？', a: '可能内容压根不是你以为的格式，也可能原始文件本身就坏了。先看看结果卡片识别出来的文件类型对不对。' },
      { q: '有自动修复工具吗？', a: '有，Base64 转文件工具把上面这些修复逻辑都装好了，贴进去就能看诊断报告。' }
    ]
  },
  'json-to-file': {
    title: 'JSON 转文件在线工具 - 提取接口返回中的 Base64 文件 - b64file',
    desc: '粘贴接口返回的 JSON，自动把里面所有 Base64 文件挖出来下载。哪怕复制的时候丢了一截也能抢救，PDF、图片格式自动认出来。本地处理，不上传。',
    h1: 'JSON 转文件在线工具',
    answer:
      '接口返回的 JSON 里埋着 Base64 文件？整段贴进来，全部提取，按原文件名逐个下载。复制时丢了开头也没关系——按标点切，照样把文件捞出来。',
    mode: 'to-file',
    sections: [
      {
        h2: '适用场景',
        html: `<ul>
          <li><strong>电子发票 / 电子合同接口</strong> — JSON 里嵌着 Base64 编码的 PDF，得把它还原成文件</li>
          <li><strong>多附件一次提取</strong> — 数组里多个文件字段，逐个下载</li>
          <li><strong>复制丢头也能恢复</strong> — 从中间开始复制的残缺 JSON，照样提取出文件</li>
        </ul>`
      },
      {
        h2: '支持的数据结构',
        html: '<pre class="code-block">[\n  {\n    "fileCode": "TD0101",\n    "fileName": "评价标准.pdf",\n    "fileContent": "JVBERi0xLjQ..."\n  }\n]</pre><p>工具认得 fileContent、content、base64、data 这些常见字段名，嵌套多少层都不怕。文件名优先用 fileName / name / title / fileCode 里能找到的那个。</p>'
      },
      {
        h2: '与普通 Base64 转换的区别',
        html: '<p>普通转换工具只吃纯 Base64 字符串，你要是把 JSON 贴进去，只会收获一堆非法字符报错。这个工具不一样：先认出 JSON 结构，再逐字段把文件挖出来；就算 JSON 解析失败，也会按标点切开做残缺恢复——复制少了一截，文件也不会丢。</p>'
      }
    ],
    faqs: [
      { q: 'JSON 解析失败还能提取吗？', a: '能。复制丢了开头这种情况，工具会自动切到残缺恢复模式，按标点把能用的 Base64 片段全部挖出来。' },
      { q: '文件名从哪里来？', a: '优先用 JSON 里的 fileName / name / title 字段。要是连这些也复制丢了，就按识别出来的扩展名给它取个名。' },
      { q: '能提取多少个文件？', a: '数量不设上限，主要看数据总大小——建议别超过 100 MB。' },
      { q: 'JSON 数据会被上传吗？', a: '不会，解析和提取全部在你浏览器里跑完。' }
    ]
  },
  privacy: {
    title: '隐私政策 - b64file',
    desc: 'b64file 隐私政策：所有文件转换均在浏览器本地完成，文件内容不上传、不存储、不记录。',
    h1: '隐私政策',
    answer:
      '一句话概括：你在页面中输入或粘贴的所有内容，仅在浏览器内存中处理，关闭页面后即被清除。服务器不提供任何文件上传接口。',
    mode: 'to-file',
    sections: [
      {
        h2: '本地处理原则',
        html: '<p>本站不提供文件上传接口。编码、解码、JSON 提取、文件类型识别等全部功能均由你的浏览器本地完成，服务器仅提供页面本身（HTML / CSS / JS 等静态资源）。</p>'
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
        html: '<p>本站静态资源由服务器托管方提供，托管方会保留基础访问日志（仅包含 IP、时间、URL 等连接层信息）。除此之外，本站不会向任何第三方发送数据。</p>'
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
  },
  about: {
    title: '关于 b64file - 由爱而生的本地文件工具',
    desc: 'b64file 是一个独立开发的免费 Base64 工具：本地处理、无广告、无账号。了解它为什么存在，以及背后的原则。',
    h1: '关于 b64file',
    answer:
      'b64file 由爱而生——起因是一次真实的抓狂：接口返回的 JSON 里嵌着两份 PDF 的 Base64，试遍所有在线工具，得到的全是"非法字符"报错，没人告诉我贴的是 JSON，更没人帮我把文件捞出来。',
    mode: 'to-file',
    sections: [
      {
        h2: '为什么做这个工具',
        html: '<p>那天，一段接口返回的 JSON 里嵌着两份 PDF 的 Base64。粘贴到所有能找到的在线工具里，得到的都是"非法字符"报错——没人告诉我贴的是 JSON，更没人帮我把文件提取出来。手动写脚本？三分钟；找到顺手的工具？三十分钟没有结果。</p><p>于是有了 b64file：贴入任何东西——纯 Base64、Data URL、甚至复制不完整的 JSON——它先诊断，再修复，最后把文件还给你。</p>'
      },
      {
        h2: '我们的原则',
        html: `<ul>
          <li><strong>数据不出浏览器</strong> — 没有上传接口，处理全程在你设备上完成</li>
          <li><strong>没有广告</strong> — 不靠流量变现，页面干净是工具的一部分</li>
          <li><strong>无需注册</strong> — 打开就用，用完即走</li>
          <li><strong>免费</strong> — 核心功能永久免费</li>
        </ul>`
      },
      {
        h2: '技术实现',
        html: '<p>纯静态页面 + 浏览器本地计算：文件类型靠魔数识别，不看扩展名；Base64 容错遵循 RFC 4648 标准；全部逻辑跑着 67 项自动化测试。不放心的话，打开开发者工具的 Network 面板看看——没有一个数据请求。</p>'
      },
      {
        h2: '反馈与建议',
        html: `<p>发现 bug、缺格式、有好想法？邮件至 <a href="mailto:${FEEDBACK_EMAIL}">${FEEDBACK_EMAIL}</a>，每封都会读。</p>`
      }
    ],
    faqs: [
      { q: '这个工具会一直免费吗？', a: '核心转换功能会永久免费。如果未来加入批量、桌面版等进阶能力，页面会明确标注，不影响现有功能。' },
      { q: '是谁在维护？', a: '一名独立开发者。没有团队、没有融资，一个人写代码、修 bug、回邮件。' },
      { q: '接受功能建议吗？', a: '非常欢迎，邮件描述你的使用场景即可。' }
    ]
  },
  terms: {
    title: '服务条款 - b64file',
    desc: 'b64file 服务条款：服务性质、本地处理边界、免责声明与使用规范。',
    h1: '服务条款',
    answer:
      '继续使用 b64file，即视为你同意以下条款。本工具按"现状"免费提供，所有转换均在你的浏览器中完成——我们无法接触你的数据，因此也不对数据相关问题承担责任。',
    mode: 'to-file',
    sections: [
      {
        h2: '服务性质',
        html: '<p>b64file 提供免费的在线 Base64 编解码与文件转换服务。页面本身为静态资源，转换逻辑在你的浏览器中执行，我们不接收、不存储、也不经手你的任何数据。</p>'
      },
      {
        h2: '免责声明',
        html: '<p>转换结果由算法自动生成，仅供辅助使用，不构成任何专业建议。对因使用本工具产生的直接或间接损失，本站不承担责任。重要文件操作前请自行备份。</p>'
      },
      {
        h2: '使用规范',
        html: '<p>禁止利用本工具处理违法内容、制作或传播恶意文件、侵犯他人知识产权。你对自己处理的内容负全部责任。</p>'
      },
      {
        h2: '知识产权',
        html: '<p>本站页面设计与代码版权归 b64file 所有。你在工具中处理的内容完全属于你，本站不主张任何权利。</p>'
      },
      {
        h2: '条款变更',
        html: `<p>条款可能随服务调整而更新，以页面最新版本为准。疑问请联系 <a href="mailto:${FEEDBACK_EMAIL}">${FEEDBACK_EMAIL}</a>。</p>`
      }
    ],
    faqs: [
      { q: '工具收费吗？', a: '核心功能免费，页面无广告，无付费墙。' },
      { q: '你们能看到我的数据吗？', a: '不能。没有上传接口，服务器日志只有常规访问记录（IP、时间、URL）。' }
    ]
  },
  '404': {
    title: '页面不存在 - b64file',
    desc: '你访问的页面不存在或已移动。',
    h1: '页面不见了',
    answer: '这个地址不存在，或者搬走了。别慌，工具都在顶部导航里。',
    mode: 'to-file',
    sections: [],
    faqs: []
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

const CONTENT_ONLY_PAGES = new Set(['privacy', 'about', 'terms', '404']);

export function renderShell(currentPage: PageId): string {
  const showTool = !CONTENT_ONLY_PAGES.has(currentPage);
  const d = pageData[currentPage] ?? pageData.home;
  return `
    ${header()}
    <main>
      ${hero(currentPage)}
      ${showTool ? toolCard(currentPage) : ''}
      ${contentSections(currentPage)}
      ${d.faqs.length ? faqSection(currentPage) : ''}
      ${currentPage !== '404' ? relatedLinks(currentPage) : ''}
    </main>
    ${footer()}
  `;
}

function header(): string {
  return `
    <header class="site-header">
      <nav class="nav" aria-label="主导航">
        <a class="brand" href="/">
          <svg class="brand-icon" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="bg-lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d97757"/><stop offset="1" stop-color="#c15f3c"/></linearGradient></defs><rect width="64" height="64" rx="6" fill="url(#bg-lg)"/><text x="32" y="41" text-anchor="middle" font-family="Consolas,monospace" font-size="21" font-weight="700" fill="#fff">b64</text></svg>
          <span class="brand-word"><span class="brand-mark">b64</span>file</span>
        </a>
        <div class="nav-links">
          <a href="/base64-to-file/">Base64 转文件</a>
          <a href="/json-to-file/">JSON 转文件</a>
          <a href="/file-to-base64/">文件转 Base64</a>
          <a href="/base64-to-image/">Base64 转图片</a>
          <a href="/base64-decode-errors/">解码失败排查</a>
        </div>
        <div class="nav-side">
          <span class="local-chip" title="不管你贴什么，转换都在你浏览器里跑完，一个字节都不上传">🔒 本地处理</span>
          <button id="theme-toggle" class="theme-toggle" type="button" aria-label="换个主题看看">🌙</button>
        </div>
      </nav>
    </header>
  `;
}

function hero(page: PageId): string {
  const d = pageData[page] ?? pageData.home;
  return `
    <section class="hero hero-tight">
      <p class="hero-prompt" aria-hidden="true"><span class="prompt-sign">❯</span> paste --anything<span class="hero-cursor"></span><span class="prompt-comment"># 没有上传接口</span></p>
      <h1>${d.h1}</h1>
      <p class="answer">${d.answer}</p>
    </section>
  `;
}

function toolCard(page: PageId): string {
  const d = pageData[page] ?? pageData.home;
  return `
    <section class="tool-card" id="tool" data-default-mode="${d.mode}">
      <div class="term-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="term-title">b64file — converter · local</span></div>
      <div class="mode-tabs" role="tablist" aria-label="转换模式">
        <button class="mode-tab" data-mode="to-file" role="tab" type="button">Base64 转文件</button>
        <button class="mode-tab" data-mode="to-base64" role="tab" type="button">文件转 Base64</button>
        <button class="mode-tab" data-mode="text" role="tab" type="button">文本编解码</button>
      </div>

      <div class="mode-panel" data-panel="to-file">
        <textarea id="b64-input" class="mono-input" rows="6" spellcheck="false"
          placeholder="贴什么都行——纯 Base64、data:image/png;base64,... 开头的，或者整段接口吐出来的 JSON"></textarea>
        <div class="input-actions">
          <button id="b64-load-file" class="ghost-btn" type="button">导入 .txt / .b64</button>
          <input type="file" id="b64-file-input" accept=".txt,.b64,.text,text/plain" hidden />
          <button id="b64-clear" class="ghost-btn" type="button">清空</button>
        </div>
        <div id="b64-diagnosis" class="diagnosis" hidden></div>
        <div id="b64-result" class="result-area" hidden></div>
      </div>

      <div class="mode-panel" data-panel="to-base64" hidden>
        <div id="drop-zone" class="drop-zone">
          <div class="drop-icon">📄</div>
          <p><strong>拖文件进来</strong>，或 <button id="pick-file" class="link-btn" type="button">点一下选择</button>——截图直接 Ctrl+V 也行</p>
          <p class="muted">任意类型 · 100 MB 封顶 · 全程不出浏览器</p>
          <input type="file" id="file-input" hidden />
        </div>
        <div id="file-info" hidden></div>
        <div id="encode-options" class="encode-options" hidden>
          <label><input type="checkbox" id="opt-urlsafe" /> URL-safe（- _ 替代 + /，无填充）</label>
          <label><input type="checkbox" id="opt-dataurl" /> 带上 data: 前缀</label>
        </div>
        <div id="encode-result" hidden></div>
      </div>

      <div class="mode-panel" data-panel="text" hidden>
        <div class="text-direction">
          <label><input type="radio" name="text-dir" value="encode" checked /> 文本 → Base64</label>
          <label><input type="radio" name="text-dir" value="decode" /> Base64 → 文本</label>
        </div>
        <textarea id="text-input" class="mono-input" rows="4" spellcheck="false"
          placeholder="输入文本或 Base64，方向在上面切换"></textarea>
        <div id="text-output" class="text-output" hidden></div>
      </div>

      <p class="local-note">文件不出浏览器——没有上传接口，想传也没地方传</p>
    </section>
  `;
}

function contentSections(page: PageId): string {
  const d = pageData[page] ?? pageData.home;
  if (!d.sections.length) return '';
  return d.sections
    .map((s, i) => `<section class="section"><span class="section-no">[${String(i + 1).padStart(2, '0')}]</span><h2>${s.h2}</h2>${s.html}</section>`)
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
  const items = (pageRegistry as Array<{ id: string; path: string; hide?: boolean }>)
    .filter((p) => !p.hide && p.id !== currentPage)
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
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="footer-brand">
        <svg class="brand-icon" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="bg-fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d97757"/><stop offset="1" stop-color="#c15f3c"/></linearGradient></defs><rect width="64" height="64" rx="6" fill="url(#bg-fg)"/><text x="32" y="41" text-anchor="middle" font-family="Consolas,monospace" font-size="21" font-weight="700" fill="#fff">b64</text></svg>
        <strong>b64file</strong>
      </div>
      <p class="footer-tagline">由爱而生 · 数据不出浏览器 · 免费无广告</p>
      <div class="statusbar"><span class="sb-left">b64file</span><span class="sb-right">local · rfc4648 · 67 tests · 0 trackers</span></div>
      <div class="footer-links">
        <a href="/">首页</a>
        <a href="/base64-to-file/">Base64 转文件</a>
        <a href="/json-to-file/">JSON 转文件</a>
        <a href="/file-to-base64/">文件转 Base64</a>
        <a href="/base64-to-image/">Base64 转图片</a>
        <a href="/base64-decode-errors/">解码失败排查</a>
      </div>
      <div class="footer-links">
        <a href="/about/">关于</a>
        <a href="/privacy/">隐私政策</a>
        <a href="/terms/">服务条款</a>
        <a href="mailto:${FEEDBACK_EMAIL}">反馈 ${FEEDBACK_EMAIL}</a>
      </div>
      <p class="muted">© ${year} b64file.cn · Base64 只是编码，不是加密，别拿它保护敏感数据</p>
      ${ICP_NUMBER ? `<p><a class="muted" href="https://beian.miit.gov.cn/" rel="noopener nofollow" target="_blank">${ICP_NUMBER}</a></p>` : ''}
    </footer>
  `;
}

export function metaTags(page: PageId): string {
  const d = pageData[page] ?? pageData.home;
  const canonical = absoluteUrl(pagePaths[page] ?? '/');
  const ogImage = absoluteUrl('/og-image.png');
  return `<title>${d.title}</title>
    <meta name="description" content="${d.desc}" />
    <meta name="applicable-device" content="pc,mobile" />
    <meta property="og:title" content="${d.title}" />
    <meta property="og:description" content="${d.desc}" />
    <meta property="og:type" content="website" />
    ${canonical ? `<meta property="og:url" content="${canonical}" />` : ''}
    ${ogImage ? `<meta property="og:image" content="${ogImage}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />`;
}

export function canonicalTag(page: PageId): string {
  if (page === '404') return '';
  const url = absoluteUrl(pagePaths[page] ?? '/');
  return url ? `<link rel="canonical" href="${url}" />` : '';
}

export function jsonLdScript(page: PageId): string {
  if (page === '404') return '';
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

  if (page !== 'home') {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: absoluteUrl('/') || '/' },
        { '@type': 'ListItem', position: 2, name: d.h1, item: url }
      ]
    });
  }

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
