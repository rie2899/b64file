import pageRegistry from '../page-registry.json';
import { DEFAULT_SITE_URL, EN_SITE_URL, FEEDBACK_EMAIL, ICP_NUMBER, POLICE_RECORD_NUMBER, POLICE_RECORD_URL } from './site-config';

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
  /** 文本模式下默认的转换方向（默认 encode） */
  textDir?: 'encode' | 'decode';
  /** 首屏速查：让问题型页面第一屏就给结论，也方便 AI 搜索直接摘 */
  quick?: string[];
  sections: Section[];
  faqs: Faq[];
}

export const pagePaths: Record<PageId, string> = Object.fromEntries(
  pageRegistry.map((p) => [p.id, p.path])
);

export const pageData: Record<PageId, PageContent> = {
  home: {
    title: 'Base64 转文件 · 文件转 Base64 · 在线编解码工具 - b64file',
    desc: '免费在线 Base64 工具：文件转 Base64、Base64 转文件、文本编解码一站搞定。自动修复前缀和填充符问题，粘贴即处理。',
    h1: 'Base64 转文件 · 文件转 Base64',
    answer:
      '贴进来。纯 Base64、带前缀的 Data URL、甚至整段接口返回的 JSON——先自动体检，能修的都修了，修不了的告诉你坏在哪，最后把文件还给你。图片、PDF、压缩包都认识。贴进来就出结果，不用点按钮。',
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
        h2: '它是怎么工作的',
        html: `<div class="grid-3">
          <div class="mini-card"><div class="mc-bar">static_site</div><strong>服务器只发页面</strong><p>服务器上只有一组静态文件，没有后端接口。打开页面就是全部，处理逻辑全在浏览器里跑。</p></div>
          <div class="mini-card"><div class="mc-bar">instant</div><strong>粘贴的瞬间出结果</strong><p>没有网络往返，粘贴的瞬间出结果，不用等转圈。</p></div>
          <div class="mini-card"><div class="mc-bar">magic_bytes</div><strong>认文件靠文件头</strong><p>不靠扩展名：%PDF 开头就是 PDF，改成 .exe 也骗不过它。20 多种格式开箱即认。</p></div>
        </div>`
      }
    ],
    faqs: [
      { q: '支持哪些格式？', a: '图片、PDF、压缩包、音视频……二十多种主流格式，靠文件头认，不认扩展名。实在认不出来，也会把原始二进制文件甩给你下载。' },
      { q: '最大能处理多大？', a: '100 MB 封顶，超过 20 MB 会先跟你确认——大文件吃内存，别把你标签页搞崩了。' },
      { q: 'Base64 是加密吗？', a: '不是，差得远。Base64 谁都能还原，别拿它保护密码。' },
      { q: '解码失败怎么办？', a: '八成是非法字符、缺填充符或数据被截断。看解码失败排查指南，或者直接贴进来让工具告诉你坏在哪。' }
    ]
  },
  'base64-to-file': {
    title: 'Base64 转文件在线工具 - 免费免注册 - b64file',
    desc: '粘贴 Base64 字符串，自动认出文件类型并还原成可下载文件。前缀、Base64URL、缺填充这些老毛病，都能自动修。',
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
    desc: '拖个文件进来就能生成 Base64，标准、URL-safe、带 data URL 前缀，随你挑。接口对接、JSON 里塞文件、前端内嵌资源都用得上。',
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
    ]
  },
  'base64-to-image': {
    title: 'Base64 转图片在线工具 - 预览并下载 - b64file',
    desc: '粘贴图片的 Base64，马上预览，下载成 PNG、JPG、WebP、GIF 都行。data URL 前缀自动帮你去掉，',
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
    desc: '拖图片进来，生成 Base64 或 data URL，直接拿去写 CSS background、HTML img，或者塞进 JSON 都行。',
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
    desc: '免费在线工具：粘贴 PDF 的 Base64 编码，一键还原成 PDF 文件下载。电子发票、电子合同、接口吐出来的 PDF 数据都能处理。',
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
    desc: '拖 PDF 进来，生成 Base64 字符串，接口传输、JSON 嵌入、系统对接都能直接用。',
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
    ]
  },
  'base64-decode-errors': {
    title: 'Base64 解码失败常见原因与自动修复方法 - b64file',
    desc: 'Base64 解码报错的 5 大原因：非法字符、填充符错误、数据截断、Base64URL 混用、Data URL 前缀。附自动修复方案。',
    h1: 'Base64 解码失败常见原因与修复方法',
    answer:
      '解码失败不是玄学，八成是这五种之一。其中四类贴进工具就自动修好；第五种（数据截断）修不了——但工具会明确告诉你断在哪，省得瞎猜。',
    mode: 'to-file',
    quick: [
      '非法字符：混进了字母表以外的内容（中文、全角空格、二进制垃圾）',
      '填充符错误：长度不是 4 的倍数，缺的补、多的删',
      '数据被截断：去掉填充后长度 % 4 余 1，这种真的修不了',
      'Base64URL 混用：出现 - 或 _，工具会自动换算',
      '前缀没去掉：data:image/png;base64, 那截不算数据'
    ],
    sections: [
      {
        h2: '1. 非法字符',
        html: '<p>Base64 的字母表就这么些字符：A-Z、a-z、0-9、<code>+</code>、<code>/</code>，再加填充符 <code>=</code>（<a href="https://www.rfc-editor.org/rfc/rfc4648#section-4" target="_blank" rel="noopener">RFC 4648 第 4 节</a>）。混进中文、全角空格、中文标点，或者哪来的二进制垃圾，都会直接报错。<strong>解决办法：</strong>删掉这些非法字符，或者干脆贴进本站工具，它会告诉你具体错在第几位。</p>'
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
  'base64-to-word': {
    title: 'Base64 转 Word 在线工具 - docx 文档还原下载 - b64file',
    desc: '粘贴 Base64 自动识别 docx 并还原为 Word 文档下载。接口返回的合同、报告、公文数据一键落地。',
    h1: 'Base64 转 Word 在线工具',
    answer:
      '接口吐出来一坨 Base64，要的是 Word 文档？贴进来。工具看文件头认出 docx（别拿 .zip 骗它，没用），还原下载。',
    mode: 'to-file',
    sections: [
      {
        h2: '适用场景',
        html: `<ul>
          <li><strong>接口返回 Word 附件</strong> — 签署平台、OA 系统把 docx 编成 Base64 塞在 JSON 里返回</li>
          <li><strong>批量导出落地</strong> — 从接口数据里把 Word 报告还原成 .docx 文件</li>
          <li><strong>不挑来源格式</strong> — 纯 Base64、data URL 前缀、整段 JSON 都能直接贴</li>
        </ul>`
      },
      {
        h2: 'docx 是怎么认出来的',
        html: '<p>docx 本质是 ZIP 包，包头有 <code>PK</code> 标记，内部带 <code>word/</code> 目录。工具解出字节流后检查这两处，扩展名改成什么都骗不过它。识别结果卡片会标「Word 文档（docx）」，文件名自动配好 <code>.docx</code> 后缀。</p>'
      },
      {
        h2: '老版本 .doc 怎么办',
        html: '<p>97-2003 的老 .doc 不是 ZIP 结构，识别会落到「认不出的二进制文件」——但解码本身不受影响，直接下载后把扩展名改成 <code>.doc</code> 照样能用。新版 Office 和 WPS 都认。</p>'
      }
    ],
    faqs: [
      { q: '能转换格式吗？比如 docx 转 PDF？', a: '不能。工具只负责把 Base64 还原成原始文件，格式转换是另一回事。' },
      { q: 'WPS 打得开吗？', a: '能。还原的是原始 docx 文件，Office 和 WPS 都认。' }
    ]
  },
  'base64-to-excel': {
    title: 'Base64 转 Excel 在线工具 - xlsx 表格还原下载 - b64file',
    desc: '粘贴 Base64 自动识别 xlsx 并还原为 Excel 表格下载。接口返回的对账单、报表数据一键落地。',
    h1: 'Base64 转 Excel 在线工具',
    answer:
      '接口返回的报表数据是一坨 Base64？贴进来，工具认出 xlsx 就地还原成 Excel 文件下载。不看扩展名看文件头，改成 .txt 也骗不过它。',
    mode: 'to-file',
    sections: [
      {
        h2: '适用场景',
        html: `<ul>
          <li><strong>对账单 / 报表导出</strong> — 财务和运营系统把 xlsx 编成 Base64 走接口传输</li>
          <li><strong>数据分析落地</strong> — 把接口里的表格数据还原成 .xlsx 继续处理</li>
          <li><strong>格式不挑</strong> — 带不带 data: 前缀、有没有换行，贴进来就行</li>
        </ul>`
      },
      {
        h2: 'xlsx 是怎么认出来的',
        html: '<p>xlsx 同样是 ZIP 包：<code>PK</code> 包头 + 内部 <code>xl/</code> 目录。两个特征都在，识别结果就标「Excel 表格（xlsx）」，下载文件名自动带 <code>.xlsx</code> 后缀。</p>'
      },
      {
        h2: '带宏的 .xlsm 呢',
        html: '<p>识别会显示「Excel 表格（xlsx）」，实际内容原样还原，下载后把扩展名改成 <code>.xlsm</code> 即可。宏是否启用由你本机的 Office 安全策略决定，与还原过程无关。</p>'
      }
    ],
    faqs: [
      { q: '能读出表格内容预览吗？', a: '不能。工具只做还原不做解析，下载后用 Excel / WPS 打开查看。' },
            { q: 'CSV 支持吗？', a: 'CSV 是纯文本，Base64 还原后工具会识别为纯文本，下载时把扩展名改成 .csv 即可。' }
    ]
  },
  'json-to-file': {
    title: 'JSON 转文件在线工具 - 提取接口返回中的 Base64 文件 - b64file',
    desc: '粘贴接口返回的 JSON，自动把里面所有 Base64 文件挖出来下载。哪怕复制的时候丢了一截也能抢救，PDF、图片格式自动认出来。',
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
    ]
  },
  'base64-to-text': {
    title: 'Base64 转文本 · 中文解码在线工具 - 乱码怎么解 - b64file',
    desc: '把 Base64 解成中文和文本：贴进来直接出原文，URL-safe、缺失填充符、复制的换行、Data URL 前缀都能自动处理。',
    h1: 'Base64 转文本 · 中文解码',
    answer:
      '一段 Base64，想知道它写的是什么？贴进来，方向选「Base64 → 文本」，原文立刻出来。URL-safe 的 - _、丢掉的 =、复制时带进来的换行，都替你理顺了，解出来对不对一眼就能看见。',
    mode: 'text',
    textDir: 'decode',
    quick: [
      '只按 UTF-8 解，GBK 内容会乱码（回源头转码）',
      'URL-safe（- _）、缺填充符、复制的换行、Data URL 前缀都会自动处理',
      '只要文件、不想在屏幕上读 → 用 Base64 转 TXT'
    ],
    sections: [
      {
        h2: '怎么用：两步',
        html: `<ol class="steps">
          <li><strong>切到「文本编解码」</strong> — 方向选 Base64 → 文本（进这个页面已经默认选好了）</li>
          <li><strong>贴进去</strong> — 原文立刻出来，中文、emoji 都在</li>
        </ol>`
      },
      {
        h2: '解出来是乱码，通常是这三种情况',
        html: `<ul>
          <li><strong>内容被截断了</strong> — 复制的时候少了一段。工具会直接告诉你：长度不是 4 的倍数、或者含非法字符</li>
          <li><strong>被 URL 编码过一遍</strong> — 从网址、日志里复制出来的常带 <code>%3D</code>、<code>%2B</code> 这类转义，工具会先还原再解</li>
          <li><strong>原文不是 UTF-8</strong> — 老系统常用 GBK 编码，本工具按 UTF-8 解码，这种情况会显示乱码，得先把原文转成 UTF-8 再来</li>
        </ul>`
      },
      {
        h2: '一般在哪见到这些 Base64',
        html: `<p>接口返回的字段、后端日志里的报文、二维码扫出来的内容、JWT 中间那一段、邮件源码里的附件——基本都是同一件事：二进制或文本被编成了纯 ASCII 字符，方便塞进只能传文本的地方。</p>`
      }
    ],
    faqs: [
      { q: '中文解出来是问号或方块？', a: '说明原文不是 UTF-8 编码（GBK 最常见）。本工具按 UTF-8 解，这种情况需要先把原文转成 UTF-8；如果只是末尾一小段乱码，多半是复制时被截断了。' },
      { q: '能反过来把中文编成 Base64 吗？', a: '能。同一个面板把方向切成「文本 → Base64」，中文和 emoji 都按 UTF-8 编码。' },
      { q: '解出来看着像文件而不是文字？', a: '那说明这段 Base64 存的是文件——图片、PDF、文档都可能。用「Base64 转文件」更合适，它能认出类型并直接给你下载。' },
      { q: '有长度限制吗？', a: '文本模式适合中等长度的字符串。几 MB 以上的内容走文件模式（Base64 转文件），那边有后台线程处理，不会把页面卡死。' }
    ]
  },
  'base64-to-pptx': {
    title: 'Base64 转 PPTX（PowerPoint）在线工具 - b64file',
    desc: '粘贴 Base64 自动识别 pptx 并还原成 PowerPoint 文件下载。接口返回的演示文稿、课件、方案数据一键落地。',
    h1: 'Base64 转 PPTX（PowerPoint）在线工具',
    answer:
      '接口里返回一坨 Base64，要的是 PPT？贴进来。工具解出字节流后看文件头，认出 pptx 就把 .pptx 还给你——扩展名改成 .zip 也骗不过它。',
    mode: 'to-file',
    sections: [
      {
        h2: '适用场景',
        html: `<ul>
          <li><strong>接口返回 PPT 附件</strong> — OA、培训系统、投标平台把 pptx 编成 Base64 塞在 JSON 里返回</li>
          <li><strong>课件 / 方案落地</strong> — 从接口数据里把演示文稿还原成真正的 .pptx 文件</li>
          <li><strong>不挑来源格式</strong> — 纯 Base64、data URL 前缀、整段接口返回的 JSON 都能直接贴</li>
        </ul>`
      },
      {
        h2: 'pptx 是怎么认出来的',
        html: `<p>pptx 本质是个 ZIP 包：包头有 <code>PK</code> 标记，内部带 <code>ppt/</code> 目录。工具解出字节流后检查这两处，所以扩展名改成什么都骗不过它。识别结果卡片会标「PowerPoint 演示（pptx）」，文件名也按识别结果自动配好 <code>.pptx</code> 后缀。</p>`
      },
      {
        h2: '老版本 .ppt 怎么办',
        html: `<p>97-2003 的老 .ppt 不是 ZIP 结构，识别会落到「认不出的二进制文件」——但解码本身不受影响，直接下载后把扩展名改成 <code>.ppt</code> 照样能打开。新版 Office 和 WPS 都认。</p>`
      }
    ],
    faqs: [
      { q: '能转成 PDF 或图片吗？', a: '不能。工具只负责把 Base64 还原成原始文件，格式转换是另一回事。' },
      { q: 'WPS 打得开吗？', a: '能。还原的是原始 pptx 文件，Office 和 WPS 都认。' }
    ]
  },
  base64url: {
    title: 'Base64URL / URL-safe Base64 在线转换 - b64file',
    desc: 'URL-safe Base64（Base64URL）编解码：+ / 换成 - _、去掉填充 =，能安全放进 URL 参数、文件名；JWT 的三段用的就是它。贴进来自动识别并还原。',
    h1: 'Base64URL · URL-safe Base64 转换',
    answer:
      '标准 Base64 里的 + / 和 = 一进了 URL 就会被转义，进了文件名就是非法字符，于是有了 URL-safe 版本：用 - _ 代替，去掉填充。本工具解码时自动认这两种写法，不用你手动替换；要输出 URL-safe，在文件模式的选项里勾一下。',
    mode: 'text',
    textDir: 'decode',
    sections: [
      {
        h2: '和标准 Base64 只差三个字符',
        html: `<ul>
          <li><strong>+ 换成 -</strong> — 加号在 URL 里会被当成空格</li>
          <li><strong>/ 换成 _</strong> — 斜杠在 URL 和文件名里是分隔符</li>
          <li><strong>= 直接去掉</strong> — 填充符，解码时能算出来，URL-safe 版本不写</li>
        </ul>`
      },
      {
        h2: '什么时候必须用它',
        html: `<ul>
          <li><strong>URL 参数和短链</strong> — 把一段数据塞进查询串，标准 Base64 会被转义得面目全非</li>
          <li><strong>JWT</strong> — header 和 payload 都是 base64url，三段用点连起来（要看某个 token 里写了什么，用 <a href="/jwt-decode/">JWT 解码</a>）</li>
          <li><strong>Cookie 和 HTTP 头</strong> — 只允许安全字符，加号斜杠都是雷</li>
          <li><strong>文件名</strong> — 斜杠不能进文件名，这是硬规矩</li>
        </ul>`
      },
      {
        h2: '解码不用手动改',
        html: `<p>把 URL-safe 的字符串直接贴进「Base64 → 文本」就行：<code>-</code> 和 <code>_</code> 会自动还原成 <code>+</code> 和 <code>/</code>，缺掉的 <code>=</code> 自动补齐。反过来要生成 URL-safe，切到「文件转 Base64」勾上 URL-safe 选项即可。</p>`
      }
    ],
    faqs: [
      { q: 'JWT 里那段能直接解吗？', a: '能，不过有专门的 <a href="/jwt-decode/">JWT 解码</a>：整条 token 粘进去，header 和 payload 一起解出来。提醒一句：JWT 的 payload 只是编码不是加密，谁拿到都能看，别往里放敏感信息。' },
      { q: '编码时怎么输出 URL-safe？', a: '「文件转 Base64」面板里有 URL-safe 勾选项，勾上后输出的就是 - _ 且不带填充的版本。' },
      { q: '为什么有的 Base64 结尾没有等号？', a: '等号是填充符，作用是让长度凑成 4 的倍数。URL-safe 版本默认去掉它，解码时补回来即可——本工具会自动补，不用你管。' },
      { q: '这两种写法能混着用吗？', a: '最好别。同一份数据要么全标准要么全 URL-safe。混用虽然能解，但复制进 URL 照样会出问题。' }
    ]
  },
  'base64-to-svg': {
    title: 'Base64 转 SVG 在线工具 - 矢量图还原下载 - b64file',
    desc: '粘贴 Base64 自动认出 <svg 声明，还原成 SVG 矢量图文件下载。Data URL 前缀、换行、缺失填充符都会自动处理。',
    h1: 'Base64 转 SVG 在线工具',
    answer:
      '图标、logo、矢量插图经常被 Base64 塞进 CSS、JSON 或邮件模板。贴进来，工具认出 <code>&lt;svg</code> 声明就还你一个能重新编辑的 .svg 文件。',
    mode: 'to-file',
    sections: [
      {
        h2: '什么时候会遇到 Base64 里的 SVG',
        html: '<p>最常见的三处：CSS 里的 <code>background-image: url(data:image/svg+xml;base64,...)</code>；接口把图标当字段返回；设计工具或邮件模板导出时把矢量图内嵌。这些场景拿到手的都不是能直接打开的文件，得先还原。</p>'
      },
      {
        h2: '还原成文件之后能干什么',
        html: '<p>SVG 是矢量图，还原成 .svg 就能重新编辑：改颜色、改尺寸、拆图层、丢进 Figma 或 Illustrator。内嵌在 Base64 里的版本只能看，动不了。</p><p>另外，矢量图放大不糊 —— 这就是它跟 PNG、JPG 最大的区别。</p>'
      },
      {
        h2: '识别靠声明，不靠扩展名',
        html: '<p>工具看的是字节里有没有 <code>&lt;svg</code> 声明，所以哪怕原文没带扩展名、或者被塞在 JSON 字段里，一样认得出来。反过来说，如果那段 Base64 里根本不是 SVG（比如是 PNG），工具会照实告诉你是 PNG，不会硬凑一个 .svg 给你。</p>'
      }
    ],
    faqs: [
      { q: '内联写的 SVG 标签（不是 Base64）能处理吗？', a: '不能。内联标签本身就是源码，直接编辑就行；这个工具解的是 Base64。想反过来把 .svg 文件转成 Base64，用「文件转 Base64」。' },
      { q: 'SVG 里的外链和字体会跟着走吗？', a: '会，还原是原样字节。里面的外链、字体声明、样式都在，能不能正常显示取决于打开它的环境。' },
      { q: '为什么我的 SVG 还原后是乱码？', a: 'SVG 本身是文本，通常不会乱。乱码多半是那段 Base64 被截断、或者复制时丢了字符 —— 工具的诊断栏会告诉你错在第几位。' }
    ]
  },
  'base64-to-mp3': {
    title: 'Base64 转 MP3 在线工具 - 音频还原并下载 - b64file',
    desc: '粘贴 Base64 还原成 MP3 音频文件下载。按帧头识别格式，WAV、OGG、FLAC、M4A 也一并认。',
    h1: 'Base64 转 MP3 在线工具',
    answer:
      'TTS 接口、语音转写、离线音频资源，很多都返回 Base64 字符串。贴进来就能拿回一个能直接播放的音频文件。',
    mode: 'to-file',
    sections: [
      {
        h2: '音频为什么常被塞成 Base64',
        html: '<p>接口要在一个 JSON 里同时返回文字和音频时，二进制没地方放，只能编码后塞进字段。语音合成接口、客服录音回传、把音频内联进 HTML，都是这个路子。</p>'
      },
      {
        h2: '识别靠帧头，不靠文件名',
        html: '<p>工具读字节开头判断真实格式：MP3 看 <code>ID3</code> 或同步字，WAV 看 <code>RIFF</code>，OGG、FLAC、M4A 各有各的开头。扩展名是按内容给的，不会出现「明明是 WAV 却存成 .mp3」这种事。</p>'
      },
      {
        h2: '一个体积上的提醒',
        html: '<p>Base64 比原始字节大约 <strong>33%</strong>。几分钟的录音转成 Base64 就是几兆的字符串，塞进 JSON 或日志会让它们变得很难看。要长期存，存二进制文件，别存 Base64 字符串。</p>'
      }
    ],
    faqs: [
      { q: '能直接在页面上播放吗？', a: '页面不做内联播放器 —— 下载下来用系统播放器打开更省事。' },
      { q: '解码出来不是 MP3 怎么办？', a: '工具按内容识别格式，可能是 WAV、M4A 或 OGG。结果卡片上会写清它认成了什么。' },
      { q: '超大音频能处理吗？', a: '单次粘贴上限很大（约 2 亿字符），日常语音片段完全够；再大就该用命令行工具了，别在浏览器里硬扛。' }
    ]
  },
  'base64-to-txt': {
    title: 'Base64 转 TXT 在线工具 - 还原纯文本文件 - b64file',
    desc: '粘贴 Base64 还原成 .txt 纯文本文件下载：日志、配置、脚本、导出数据都能还原，按 UTF-8 解码。',
    h1: 'Base64 转 TXT 在线工具',
    answer:
      '日志、配置、SQL、脚本被 Base64 之后，贴进来就能还原成 .txt 下载。只是想看几眼内容的话，用 「Base64 转文本」 更快，不用落盘。',
    mode: 'to-file',
    sections: [
      {
        h2: '转 .txt 和「Base64 转文本」的区别',
        html: '<p>两者解的是同一段数据，区别只在结果怎么给你：这里给你一个文件下载；<a href="/base64-to-text/">Base64 转文本</a> 把内容直接铺在页面上，能选中、能复制、不落盘。要归档用前者，要扫一眼用后者。</p>'
      },
      {
        h2: '不是所有 Base64 都能变成文本',
        html: '<p>Base64 只是编码方式，背后可能是 PDF、图片、压缩包。那种数据解出来是二进制，当文本打开只会是乱码 —— 工具会先诊断，告诉它到底是什么类型。</p>'
      },
      {
        h2: '中文变乱码的两种原因',
        html: '<p>一是原始数据不是 UTF-8（老系统里 GBK 很常见），工具按 UTF-8 解就会出问题；二是那段 Base64 在复制过程中被截断。前者得回源头换编码，后者重新复制一份完整数据就行。</p>'
      }
    ],
    faqs: [
      { q: '能指定 GBK 之类的编码吗？', a: '目前只按 UTF-8 解码。GBK 内容请回源头转成 UTF-8，或者用本地脚本处理。' },
      { q: '结果里的换行会不会丢？', a: '不会，换行是数据的一部分，原样还原。' },
      { q: '支持多大？', a: '单次粘贴上限约 2 亿字符，日常的日志和配置远远够用。' }
    ]
  },
  'data-url': {
    title: 'Data URL 在线工具 - 生成与解析内联 base64 - b64file',
    desc: '粘贴 data:image/png;base64,... 自动识别 MIME 并还原文件；拖个文件进来也能生成可直接嵌进 CSS、HTML 的 Data URL。',
    h1: 'Data URL 生成与解析',
    answer:
      '把 <code>data:image/png;base64,...</code> 贴进来：前缀自动摘掉、MIME 记下来、文件还给你。反过来，拖个文件进来就能生成可以直接嵌进 CSS 或 HTML 的 Data URL。',
    mode: 'to-file',
    quick: [
      '结构：<code>data:[&lt;mediatype&gt;][;base64],&lt;data&gt;</code>',
      '适合：几 KB 的小图标、单文件 HTML、邮件模板',
      '别用：大图、要复用、要缓存的资源 —— 它撑大体积还不能单独缓存'
    ],
    sections: [
      {
        h2: 'Data URL 长什么样',
        html: '<p>结构是 <code>data:[&lt;mediatype&gt;][;base64],&lt;data&gt;</code>。拿 <code>data:image/png;base64,iVBORw0KGgo...</code> 举例：<code>data:</code> 是声明，中间那段是 MIME 类型和 base64 标记，逗号之后才是数据本体。所以解码的第一步，永远是先把逗号前面那截摘掉。</p><p>格式细节可以看 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URLs" target="_blank" rel="noopener">MDN 的 Data URL 说明</a>。</p>'
      },
      {
        h2: '什么时候该用，什么时候别用',
        html: '<ul><li><strong>适合</strong>：几 KB 的小图标、单文件 HTML、邮件模板、想减少请求数的关键小图</li><li><strong>别用</strong>：大图、要复用的资源、需要浏览器缓存的场景 —— Data URL 撑大 HTML 和 CSS、不能单独缓存，还比原文件大 33%</li></ul>'
      },
      {
        h2: '三个常见坑',
        html: '<ul><li>MIME 写错：<code>image/jpg</code> 不是标准写法，浏览器可能直接不渲染，应该写 <code>image/jpeg</code></li><li>CSS 里忘了引号：数据里含逗号和加号时最容易出问题，建议用引号把整个 url 包住</li><li>把大段 Base64 直接塞进 CSS 又不压缩，文件体积肉眼可见地涨</li></ul>'
      }
    ],
    faqs: [
      { q: 'Data URL 和 Base64 是一回事吗？', a: '不是。Base64 是编码方式，Data URL 是「MIME 类型 + Base64 数据」的一种写法。两种输入工具都认。' },
      { q: '没标 ;base64 的那种 data: 呢？', a: '工具会先提示一句，再按 Base64 试着解。百分号编码的数据本来就不是 Base64，试解会报非法字符 —— 那种要用专门的 URL 解码工具。' },
      { q: '能预览哪些图片格式？', a: '浏览器能显示的（PNG、JPG、GIF、WebP、SVG 等）都会直接给预览，不能显示的（比如 HEIC）给下载按钮。' }
    ]
  },
  'jwt-decode': {
    title: 'JWT 解码在线工具 - 查看 payload 内容 - b64file',
    desc: '粘贴 JWT 立刻解出 header 与 payload 的 JSON 内容。只做解码、不做签名验证 —— 看得见不等于可信。',
    h1: 'JWT 解码：看清 payload 里有什么',
    answer:
      'JWT 是 Base64URL 加两个点号拼起来的，中间那段 payload 就是明文 JSON。贴进来直接看内容 —— 但记住：<strong>看得见不等于可信</strong>，签名必须在服务端验。',
    mode: 'text',
    textDir: 'decode',
    quick: [
      'header：算法与类型，比如 <code>{"alg":"HS256"}</code>',
      'payload：真正的内容，能解出来看',
      'signature：签名，不是数据 —— 解不出东西，验签得在服务端做'
    ],
    sections: [
      {
        h2: '三段分别是什么',
        html: '<ul><li><strong>header</strong>：算法和类型，比如 <code>{"alg":"HS256","typ":"JWT"}</code></li><li><strong>payload</strong>：真正的内容 —— 用户 ID、权限、签发时间 <code>iat</code>、过期时间 <code>exp</code></li><li><strong>signature</strong>：用密钥对前两段算出来的签名，<strong>不是数据，解不出东西</strong></li></ul><p>另外：JWT 用的编码是 URL-safe 版（<code>-_</code> 取代 <code>+/</code>），细节见 <a href="/base64url/">Base64URL</a>。</p><ul></ul>'
      },
      {
        h2: '看得见 ≠ 可信',
        html: '<p>payload 只是 Base64URL 编码，不是加密。谁拿到 token 都能看见内容，所以别往里放密码、身份证号、密钥这类东西。防篡改靠的是第三段签名，而验签必须在服务端用密钥做。</p><p>换个角度说：任何声称「在线验证 JWT」但不问你要密钥的工具，验的一定不是真签名。</p>'
      },
      {
        h2: '什么时候用得上',
        html: '<p>排查登录态（token 里的 <code>exp</code> 是不是过期了）、确认后端下发的权限字段、看第三方回调里的 token 内容。开发调试时把 payload 看清楚，比在后端打日志快得多。</p>'
      }
    ],
    faqs: [
      { q: '为什么贴进去提示格式不对？', a: '两个常见原因：复制时漏了某一段；或者中间那段末尾的填充符在传递途中被吃掉了。工具会自动补填充符，但数据本身缺斤少两是补不回来的。' },
      { q: 'Signature 能解码出来吗？', a: '不能，也不需要。签名是 HMAC 或 RSA 算出来的字节，不是编码过的数据。' },
      { q: '能验证签名吗？', a: '不能，本站不做验证。验签需要密钥或公钥，属于服务端的事。' }
    ]
  },
  'base64-to-video': {
    title: 'Base64 转视频在线工具 - MP4/MOV 还原下载 - b64file',
    desc: '粘贴 Base64 还原成视频文件下载。按文件头识别 MP4、MOV、AVI、MKV 等格式，接口返回的视频字段也能直接还原。',
    h1: 'Base64 转视频在线工具',
    answer:
      '接口返回的视频、消息平台中转的文件、日志里抓到的一段 Base64——贴进来就能还原成能直接播放的视频。',
    mode: 'to-file',
    sections: [
      {
        h2: '视频为什么常被塞成 Base64',
        html: '<p>一个接口要同时返回文字和视频时，二进制没地方放，只能编码进字段；低代码平台、消息机器人在步骤之间传文件也常这么干。所以你拿到的常常是几百 KB 到几十 MB 的字符串，而不是一个能点开的链接。</p>'
      },
      {
        h2: '识别靠文件头，不靠扩展名',
        html: '<p>MP4 和 MOV 都是 ISO 容器，开头是 <code>ftyp</code> 加品牌标记；MKV 开头是 <code>1A 45 DF A3</code>，AVI 是 <code>RIFF</code> 加 <code>AVI </code>，FLV 是 <code>FLV</code>。工具读开头判断真实格式，扩展名按内容给，不会把 MOV 存成 .mp4。</p>'
      },
      {
        h2: '体积提醒：视频是这里最容易卡的一类',
        html: '<p>Base64 让体积增加约 <strong>33%</strong>，而视频本来就大：一个 20 MB 的片段，字符串接近 27 MB，浏览器里还要同时持有编码前后两份。短片段没问题，整段长视频建议用命令行处理。</p>'
      }
    ],
    faqs: [
      { q: '能直接在页面上播放吗？', a: '页面只负责还原文件。下载下来用系统播放器打开更顺畅，也不会因为浏览器解码能力不同出现「能下不能播」。' },
      { q: '解出来不是 MP4 怎么办？', a: '工具按文件头识别，可能是 MOV、MKV 或 AVI。结果卡片上会写清它认成了什么，扩展名也按识别结果给。' },
      { q: '超大视频能处理吗？', a: '单次粘贴约 2 亿字符上限。超过这个量级，用 <code>base64 -d</code> 之类的命令行工具更合适。' }
    ]
  },

  'base64-to-zip': {
    title: 'Base64 转 ZIP 压缩包在线工具 - 还原并下载 - b64file',
    desc: '粘贴 Base64 还原成压缩包下载。按文件头识别 ZIP、RAR、7Z、GZIP，批量导出接口返回的压缩包字段可直接还原。',
    h1: 'Base64 转 ZIP 压缩包',
    answer:
      '批量导出的接口经常把整个压缩包编码成字符串返回，贴进来就能还原成可解压的文件，目录结构和文件名都在里面。',
    mode: 'to-file',
    sections: [
      {
        h2: '什么时候会遇到',
        html: '<ul><li><strong>批量导出接口</strong>：一次导出多个文件，服务端打包后按 Base64 返回</li><li><strong>邮件附件</strong>：MIME 把附件编码成 Base64</li><li><strong>备份与迁移</strong>：把整个目录压成一个字符串塞进字段里</li></ul>'
      },
      {
        h2: '四个压缩格式的识别依据',
        html: '<p>ZIP 开头是 <code>50 4B 03 04</code>；RAR 是 <code>52 61 72 21</code>；7Z 是 <code>37 7A BC AF 27 1C</code>；GZIP 是 <code>1F 8B</code>。工具按这些字节判断，不看文件名。</p>'
      },
      {
        h2: '一个容易误会的地方：Office 文件也是 ZIP',
        html: '<p>docx、xlsx、pptx 本质都是 ZIP 容器，字节开头同样是 <code>PK</code>。所以工具会先看容器里有没有 <code>word/</code>、<code>xl/</code>、<code>ppt/</code> 目录：能认出具体类型就按那个给，认不出才落到「ZIP 压缩包」。这样不会把 Word 文档存成一个 .zip。</p>'
      }
    ],
    faqs: [
      { q: '能在线解压吗？', a: '不能。工具只还原压缩包本身，解压交给系统压缩软件——浏览器里解压大包既慢又费内存。' },
      { q: '解出来打不开？', a: '多半是 Base64 被截断了：数据不完整时解压软件会报「压缩包损坏」。回到源头重新复制完整字符串。' },
      { q: '支持分卷压缩包吗？', a: '分卷包是多个独立文件，每一卷都要还原出来、按顺序放在同一目录才能解压。工具一次只还原一个文件。' }
    ]
  },

  'base64-size-calculator': {
    title: 'Base64 编码后变大多少 - 体积计算公式与对照表 - b64file',
    desc: 'Base64 让数据增大约 33%，附精确计算公式（含填充符）、常见文件大小对照表，以及为什么实际感受常常不止 33%。',
    h1: 'Base64 编码后变大多少',
    answer:
      'Base64 用 4 个字符表示 3 个字节，所以体积固定增加约 1/3。精确的字符串长度是 4 × ⌈字节数 ÷ 3⌉——每 3 个字节变成 4 个字符，最后一组不足的用填充符补齐。',
    mode: 'text',
    textDir: 'encode',
    quick: [
      '字符数 = 4 × ⌈字节数 ÷ 3⌉',
      '1 MB 的二进制 → 约 1.37 MB 的字符串',
      'Base64 字符都是 ASCII，UTF-8 下 1 字节/字符',
      '放进 URL 还要再算百分号编码的膨胀'
    ],
    sections: [
      {
        h2: '精确公式与三个例子',
        html: '<p>长度 = <code>4 × ⌈n / 3⌉</code>，n 是原始字节数：每 3 字节一组，最后一组不足 3 字节用 <code>=</code> 补齐。</p><table class="simple-table"><thead><tr><th>原始大小</th><th>Base64 字符数</th><th>膨胀</th></tr></thead><tbody><tr><td>1 KB（1024 B）</td><td>1368</td><td>133.6%</td></tr><tr><td>1 MB（1048576 B）</td><td>1398104</td><td>133.3%</td></tr><tr><td>10 MB</td><td>13981016</td><td>133.3%</td></tr></tbody></table>'
      },
      {
        h2: '为什么感觉不止 33%',
        html: '<ul><li><strong>换行</strong>：MIME/PEM 每 76 字符换行，多出约 1.3%</li><li><strong>JSON 转义</strong>：字符串进 JSON 时若带换行或特殊字符，会再涨一点</li><li><strong>内存里的表示</strong>：Base64 字符都是 ASCII，UTF-8 下 1 字节/字符，这一项不额外膨胀；但如果语言内部按 UTF-16 存字符串，内存占用直接翻倍</li><li><strong>URL 编码</strong>：把 <code>+</code> <code>/</code> <code>=</code> 放进 URL，每个都会变成 3 个字符</li></ul>'
      },
      {
        h2: '什么时候该在意这个数字',
        html: '<p>接口 body 有上限（常见 1–10 MB）、日志按行截断、数据库字段长度固定——这三种场景下，那 33% 往往就是压垮请求的最后一根稻草。解法不是「压缩字符串」（Base64 几乎不可压），而是别把二进制塞进 JSON：改用对象存储加链接。</p>'
      }
    ],
    faqs: [
      { q: '为什么有时候是 4/3 倍，有时候更多？', a: '4/3 是理论下限。加上填充符、换行、JSON 转义和 URL 编码，实际传输体积会略高；内存里按 UTF-16 存则是字符数的 2 倍。' },
      { q: '能压缩 Base64 字符串吗？', a: '对已编码的字符串做通用压缩收益很低：Base64 是 6 位一组的均匀分布，几乎不可压。要省体积，应该在编码前压缩原始数据，或者干脆不编码。' },
      { q: 'Base64URL 会更小吗？', a: '不会。它只是换了两个字符并去掉填充，字符数基本一样（少 0–2 个），换来的是能放进 URL，不是更小。' }
    ]
  },

  'base64-encrypt': {
    title: 'Base64 加密解密在线工具 - 先说清它不是加密 - b64file',
    desc: '粘贴内容在线 Base64 编码或解码。同时说清一件常被误解的事：Base64 是编码不是加密，没有密钥，任何人都能还原。',
    h1: 'Base64 加密解密（它不是加密）',
    answer:
      '搜「Base64 加密」的人很多，但它没有密钥——任何人拿到字符串都能解回原文。这页给你编码解码工具，也把这件事讲明白：要保密，别指望它。',
    mode: 'text',
    textDir: 'encode',
    sections: [
      {
        h2: '为什么大家都管它叫加密',
        html: '<p>Base64 出来的字符串没有可读性，接口里传的、配置文件里存的、邮件附件里裹的都是这种东西，看着就像被加密过。久而久之，<strong>「Base64 加密」</strong>这个说法就传开了，连不少文档也这么写。</p><p>但加密有个基本前提：<strong>有密钥</strong>。没有密钥就算不出明文。Base64 没有密钥，规则完全公开，一个方向进、一个方向出。</p>'
      },
      {
        h2: '拿它保护数据会发生什么',
        html: '<p>等于把密码写在信封背面。三个真实场景：</p><ul><li><strong>JWT 的 payload</strong> 就是 Base64URL，复制出来一解就是明文 JSON；它的签名只防篡改，不防偷看。</li><li>配置里那个「加密后的密码」，去掉 Base64 就是原文。</li><li>把接口返回的 Base64 当成「已脱敏」写进日志，等于把原始文件也写进了日志。</li></ul>'
      },
      {
        h2: '那什么时候该用它',
        html: '<p>它的正当用途只有一个：<strong>在只能传文本的地方传二进制</strong>。JSON 字段里塞图片、URL 里带签名、邮件 MIME 附件、CSS 内联小图标（data URL），都属于这类。</p><p>需要保密就走真正的办法：传输用 HTTPS，存储用带密钥的加密（AES 之类），密码用 bcrypt / argon2 做哈希——哈希不可逆，连你自己也解不回来。</p>'
      }
    ],
    faqs: [
      { q: 'Base64 能解密吗？', a: '能，直接解码就行，不需要任何密码。所谓「解密」按钮，实际做的是解码。' },
      { q: '那 JWT 安全吗？', a: 'JWT 保证内容没被改过（靠签名），但不保证别人看不到。payload 里别放手机号、身份证号这类信息。' },
      { q: '我想真的加密一段文字怎么办？', a: '用带密钥的算法（AES-GCM 之类），密钥单独保管。用 Base64 顶着，只会让自己误以为数据是安全的。' }
    ]
  },

  'base64-javascript': {
    title: 'JavaScript Base64 编码解码 - btoa 中文乱码怎么解决 - b64file',
    desc: 'btoa / atob 的正确用法、中文报 InvalidCharacterError 的原因与修法、Node 与浏览器差异、base64url 兼容处理，附可直接复制的代码。',
    h1: 'JavaScript 里的 Base64：btoa 与中文乱码',
    answer:
      'btoa 只接受 Latin-1 字符，中文码点超过 255 就直接抛 InvalidCharacterError。正确做法是先用 TextEncoder 编成 UTF-8 字节，再逐字节转成字符串喂给 btoa；解码反过来做。',
    mode: 'text',
    textDir: 'encode',
    sections: [
      {
        h2: '最基础的两个 API',
        html: `<pre class="code-block">btoa('hello')         // "aGVsbG8="
atob('aGVsbG8=')      // "hello"</pre><p>这两行只在内容是纯 ASCII 时成立。一旦出现中文、emoji、日文，下面这个问题就来了。</p>`
      },
      {
        h2: '中文为什么一定报错',
        html: `<p><code>btoa</code> 要求输入里每个字符都落在 0–255，中文码点远大于这个范围，于是直接抛 <code>InvalidCharacterError</code>。正确写法是先转字节再编码：</p><pre class="code-block">function b64encode(str) {
  const bytes = new TextEncoder().encode(str)  // 先编成 UTF-8 字节
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}</pre><p>解码反过来：<code>atob</code> 拿到字节串，再用 <code>TextDecoder</code> 还原成文本。不要写 <code>String.fromCharCode(...bytes)</code>，大文件一次展开会爆栈，上面用循环就是为了避开它。</p>`
      },
      {
        h2: 'Node 里写法不一样',
        html: `<pre class="code-block">Buffer.from(str).toString('base64')        // 编码
Buffer.from(b64, 'base64').toString('utf8') // 解码
Buffer.from(b64, 'base64url')               // 处理 -_ 与缺失的填充</pre><p>Node 直接吃 Buffer，不需要 TextEncoder 那一套；反过来把这段抄进浏览器，会报 <code>Buffer is not defined</code>。</p>`
      },
      {
        h2: 'base64url：前端最常踩的变体',
        html: '<p>JWT 和 URL 参数里的 Base64 会把 <code>+</code> 换成 <code>-</code>、<code>/</code> 换成 <code>_</code>，并去掉结尾的 <code>=</code>。直接丢给 <code>atob</code> 会解不出来或出来一串乱码。</p><p>处理只需两步：把 <code>-</code> <code>_</code> 换回 <code>+</code> <code>/</code>，再按 4 的倍数补上 <code>=</code>。</p>'
      }
    ],
    faqs: [
      { q: 'btoa 和 Base64 是一回事吗？', a: 'btoa 是浏览器提供的一个函数，做的正是 Base64 编码；它只处理 Latin-1，所以中文要自己先转字节。' },
      { q: '大文件怎么处理？', a: '别一次性读成字符串。用 FileReader.readAsDataURL 或分块读再拼接；几十 MB 以上交给后端或命令行更合适。' },
      { q: '解出来是乱码？', a: '两个常见原因：拿到的是 base64url（要换字符补填充），或者原始内容本来就不是 UTF-8。' }
    ]
  },

  privacy: {
    title: '隐私政策 - b64file',
    desc: 'b64file 隐私政策：本站是纯静态页面，转换在浏览器里完成。这里说明我们处理与不处理哪些信息。',
    h1: '隐私政策',
    answer:
      '一句话概括：你在页面中输入或粘贴的内容，只在浏览器内存里处理，关闭页面即清除。下面把本站碰和不碰哪些信息说清楚。',
    mode: 'to-file',
    sections: [
      {
        h2: '工具怎么运行',
        html: '<p>本站是纯静态前端：编码、解码、JSON 提取、文件类型识别等功能都在浏览器里完成，服务器只提供页面本身（HTML / CSS / JS 等静态资源）。</p>'
      },
      {
        h2: '数据收集说明',
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
    ]
  },
  about: {
    title: '关于 b64file - 由爱而生的本地文件工具',
    desc: 'b64file 是一个独立开发的免费 Base64 工具：无广告、无账号。了解它为什么存在，以及背后的原则。',
    h1: '关于 b64file',
    answer:
      'b64file 由爱而生——起因是一次真实的抓狂：接口返回的 JSON 里嵌着两份 PDF 的 Base64，试遍所有在线工具，得到的全是「非法字符」报错，没人告诉我贴的是 JSON，更没人帮我把文件捞出来。',
    mode: 'to-file',
    sections: [
      {
        h2: '为什么做这个工具',
        html: '<p>那天，一段接口返回的 JSON 里嵌着两份 PDF 的 Base64。粘贴到所有能找到的在线工具里，得到的都是「非法字符」报错——没人告诉我贴的是 JSON，更没人帮我把文件提取出来。手动写脚本？三分钟；找到顺手的工具？三十分钟没有结果。</p><p>于是有了 b64file：贴入任何东西——纯 Base64、Data URL、甚至复制不完整的 JSON——它先诊断，再修复，最后把文件还给你。</p>'
      },
      {
        h2: '我们的原则',
        html: `<ul>
                    <li><strong>没有广告</strong> — 不靠流量变现，页面干净是工具的一部分</li>
          <li><strong>无需注册</strong> — 打开就用，用完即走</li>
          <li><strong>免费</strong> — 核心功能永久免费</li>
        </ul>`
      },
      {
        h2: '技术实现',
        html: '<p>纯静态页面 + 浏览器本地计算：文件类型靠魔数识别，不看扩展名；Base64 容错遵循 <a href="https://www.rfc-editor.org/rfc/rfc4648" target="_blank" rel="noopener">RFC 4648</a> 标准；全部逻辑跑着 91 项自动化测试。</p>'
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
    desc: 'b64file 服务条款：服务性质、使用边界、免责声明与使用规范。',
    h1: '服务条款',
    answer:
      '继续使用 b64file，即视为你同意以下条款。本工具按「现状」免费提供，转换在浏览器中完成；结果由算法生成，重要文件请自行备份。',
    mode: 'to-file',
    sections: [
      {
        h2: '服务性质',
        html: '<p>b64file 提供免费的在线 Base64 编解码与文件转换服务。页面本身为静态资源，转换逻辑在你的浏览器中执行。</p>'
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
  const crumbs =
    currentPage !== 'home' && currentPage !== '404'
      ? `<nav class="crumbs" aria-label="面包屑"><a href="/">❯ 首页</a> / <span>${d.h1}</span></nav>`
      : '';
  return `
    ${header(currentPage)}
    <main>
      ${crumbs}
      ${hero(currentPage)}
      ${showTool ? toolCard(currentPage) : ''}
      ${currentPage === 'home' ? toolsIndex() : ''}
      ${contentSections(currentPage)}
      ${d.faqs.length ? faqSection(currentPage) : ''}
      ${currentPage !== '404' ? relatedLinks(currentPage) : ''}
    </main>
    ${footer(currentPage)}
  `;
}

/** 主导航项（顺序即展示顺序） */
const NAV_ITEMS: Array<{ path: string; label: string }> = [
  { path: '/base64-to-file/', label: 'Base64 转文件' },
  { path: '/json-to-file/', label: 'JSON 转文件' },
  { path: '/file-to-base64/', label: '文件转 Base64' },
  { path: '/base64-to-image/', label: 'Base64 转图片' },
  { path: '/base64-decode-errors/', label: '解码失败排查' }
];

function header(currentPage: PageId): string {
  const currentPath = (pageRegistry as Array<{ id: string; path: string }>).find((p) => p.id === currentPage)?.path;
  const links = NAV_ITEMS.map((item) =>
    item.path === currentPath
      ? `<a href="${item.path}" class="active" aria-current="page">${item.label}</a>`
      : `<a href="${item.path}">${item.label}</a>`
  ).join('\n          ');
  return `
    <header class="site-header">
      <nav class="nav" aria-label="主导航">
        <a class="brand" href="/">
          <svg class="brand-icon" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="bg-lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d97757"/><stop offset="1" stop-color="#c15f3c"/></linearGradient></defs><rect width="64" height="64" rx="9" fill="url(#bg-lg)"/><text x="32" y="41.4" text-anchor="middle" font-family="'JetBrains Mono',ui-monospace,Consolas,monospace" font-size="23" font-weight="700" fill="#ffffff">b64</text></svg>
          <span class="brand-word"><span class="brand-mark">b64</span>file</span>
        </a>
        <div class="nav-links">
          ${links}
        </div>
        <div class="nav-side">
          <span class="local-chip" title="打开就能用，不需要注册或登录">无需登录</span>
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
      <p class="hero-prompt" aria-hidden="true"><span class="prompt-sign">❯</span> paste --anything<span class="hero-cursor"></span><span class="prompt-comment"># 粘贴即处理</span></p>
      <h1>${d.h1}</h1>
      <p class="answer">${d.answer}</p>
      ${d.quick?.length ? `<ul class="quick-list">${d.quick.map((q) => `<li>${q}</li>`).join('')}</ul>` : ''}
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
        <textarea id="b64-input" class="mono-input" rows="6" spellcheck="false" aria-label="粘贴 Base64 或文件数据"
          placeholder="粘贴 Base64、data: 开头的一段、或整段接口 JSON"></textarea>
        <div class="input-actions">
          <button id="b64-sample" class="ghost-btn" type="button">载入示例</button>
          <button id="b64-load-file" class="ghost-btn" type="button">导入 .txt / .b64</button>
          <input type="file" id="b64-file-input" accept=".txt,.b64,.text,text/plain" hidden />
          <button id="b64-clear" class="ghost-btn" type="button">清空</button>
        </div>
        <p class="input-hint">粘贴即自动处理，不用点按钮（Ctrl+Enter 立刻转换 / Esc 清空）</p>
        <div id="b64-diagnosis" class="diagnosis" hidden></div>
        <div id="b64-result" class="result-area" hidden></div>
      </div>

      <div class="mode-panel" data-panel="to-base64" hidden>
        <div id="drop-zone" class="drop-zone">
          <div class="drop-icon">📄</div>
          <p><strong>拖文件进来</strong>，或 <button id="pick-file" class="link-btn" type="button">点一下选择</button>——截图直接 Ctrl+V 也行</p>
          <p class="muted">任意类型 · 100 MB 封顶</p>
          <input type="file" id="file-input" hidden />
        </div>
        <div id="file-info" hidden></div>
        <div id="encode-options" class="encode-options" hidden>
          <label><input type="checkbox" id="opt-urlsafe" /> URL-safe（- _ 替代 + /，无填充）</label>
          <label><input type="checkbox" id="opt-dataurl" /> 带上 data: 前缀</label>
          <label><input type="checkbox" id="opt-wrap76" /> 按 76 字符换行（MIME / PEM 格式）</label>
        </div>
        <div id="encode-result" hidden></div>
      </div>

      <div class="mode-panel" data-panel="text" hidden>
        <div class="text-direction">
          <label><input type="radio" name="text-dir" value="encode"${d.textDir === 'decode' ? '' : ' checked'} /> 文本 → Base64</label>
          <label><input type="radio" name="text-dir" value="decode"${d.textDir === 'decode' ? ' checked' : ''} /> Base64 → 文本</label>
        </div>
        <div class="encode-options" id="text-urlsafe-wrap"${d.textDir === 'decode' ? ' hidden' : ''}>
          <label><input type="checkbox" id="opt-text-urlsafe" /> URL-safe 输出（<code>-</code> <code>_</code> 替代 <code>+</code> <code>/</code>，去掉填充）</label>
        </div>
        <textarea id="text-input" class="mono-input" rows="4" spellcheck="false" aria-label="输入文本或 Base64"
          placeholder="输入文本或 Base64，方向在上面切换"></textarea>
        <div id="text-output" class="text-output" hidden></div>
      </div>

      <p class="local-note">粘贴、拖拽、Ctrl+V 截图都行</p>
    </section>
  `;
}

/** 首页工具索引的分组标题（顺序即展示顺序） */
const INDEX_GROUP_TITLE: Array<{ group: PageGroup; title: string }> = [
  { group: 'decode', title: 'Base64 转文件' },
  { group: 'encode', title: '文件转 Base64' },
  { group: 'text', title: '文本编解码' },
  { group: 'guide', title: '开发与排查' }
];

/**
 * 首页工具索引：把全部工具页铺成静态内链。
 * 目的不是导航体验，而是给爬虫一条从首页通往每个着陆页的完整链路
 * （此前首页只链 6 个页面，百度七天只抓到首页）。
 */
function toolsIndex(): string {
  const ids = Object.keys(PAGE_GROUP).filter((id) => PAGE_GROUP[id] !== 'info' && PAGE_GROUP[id] !== 'home');
  const groups = INDEX_GROUP_TITLE.map(({ group, title }) => {
    const items = ids
      .filter((id) => PAGE_GROUP[id] === group && SHORT_LABEL[id])
      .map((id) => `<li><a href="${pagePaths[id] ?? '/'}">${SHORT_LABEL[id]}</a></li>`)
      .join('\n            ');
    return `<div class="tool-group">\n          <h3>${title}</h3>\n          <ul>\n            ${items}\n          </ul>\n        </div>`;
  }).join('\n        ');
  return `
    <section class="section tool-index">
      <h2>全部 ${ids.length} 个工具</h2>
      <p class="muted">同一个引擎的四种用法。全部免费、无需登录，文件不上传服务器，只在浏览器本地处理。</p>
      <div class="tool-grid">
        ${groups}
      </div>
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

/** 站内短名（导航/相关链接用；h1 太长不适合做链接文字） */
const SHORT_LABEL: Record<string, string> = {
  home: '首页',
  'base64-to-file': 'Base64 转文件',
  'file-to-base64': '文件转 Base64',
  'base64-to-image': 'Base64 转图片',
  'image-to-base64': '图片转 Base64',
  'base64-to-pdf': 'Base64 转 PDF',
  'pdf-to-base64': 'PDF 转 Base64',
  'base64-to-word': 'Base64 转 Word',
  'base64-to-excel': 'Base64 转 Excel',
  'base64-to-pptx': 'Base64 转 PPTX',
  'base64-to-text': 'Base64 转文本',
  base64url: 'Base64URL / JWT',
  'json-to-file': 'JSON 转文件',
  'base64-to-svg': 'Base64 转 SVG',
  'base64-to-mp3': 'Base64 转 MP3',
  'base64-to-txt': 'Base64 转 TXT',
  'data-url': 'Data URL 工具',
  'base64-to-video': 'Base64 转视频',
  'base64-to-zip': 'Base64 转 ZIP',
  'base64-size-calculator': '体积换算',
  'base64-encrypt': '加密解密',
  'base64-javascript': 'JS 用法',
  'jwt-decode': 'JWT 解码',
  'base64-decode-errors': '解码失败排查',
  about: '关于',
  privacy: '隐私政策',
  terms: '服务条款'
};

/**
 * 页面分组。整站其实是同一个工具的三种模式（Base64→文件 / 文件→Base64 / 文本编解码），
 * 各页面只是不同关键词的着陆页 —— 所以相关链接按"关系"取几条，而不是把 16 个页面全铺一遍。
 */
type PageGroup = 'decode' | 'encode' | 'text' | 'guide' | 'info' | 'home';
const PAGE_GROUP: Record<string, PageGroup> = {
  home: 'home',
  'base64-to-file': 'decode',
  'base64-to-image': 'decode',
  'base64-to-pdf': 'decode',
  'base64-to-word': 'decode',
  'base64-to-excel': 'decode',
  'base64-to-pptx': 'decode',
  'json-to-file': 'decode',
  'base64-to-svg': 'decode',
  'base64-to-mp3': 'decode',
  'base64-to-txt': 'decode',
  'data-url': 'decode',
  'base64-to-video': 'decode',
  'base64-to-zip': 'decode',
  'base64-size-calculator': 'guide',
  'base64-encrypt': 'text',
  'base64-javascript': 'guide',
  'base64-to-text': 'text',
  base64url: 'text',
  'jwt-decode': 'text',
  'file-to-base64': 'encode',
  'image-to-base64': 'encode',
  'pdf-to-base64': 'encode',
  'base64-decode-errors': 'guide',
  about: 'info',
  privacy: 'info',
  terms: 'info'
};

const GROUP_LABEL: Record<string, string> = {
  decode: '同样是从 Base64 还原文件',
  encode: '同样是把文件转成 Base64',
  text: '同样是文本编解码',
  guide: '遇到报错看这里',
  info: '常用工具',
  home: '先看首页'
};

/**
 * 相关链接走一条"环"：页面按主题排序成环，每页取环上的后 5 个。
 * 这样出链固定 ≤5（不会变成链接农场），同时每页恰好被环上前 5 个页面链接到 → 入链恒为 5。
 * 旧实现是"取组内前 N 个"，排在组尾的页面永远吃不到入链
 * （jwt-decode / base64url / image-to-base64 / pdf-to-base64 只有 2 条、json-to-file 3 条）。
 * 不变量由 tests/pages.test.ts 里的"内链图"用例守住。
 */
const RELATED_GROUP_ORDER: PageGroup[] = ['decode', 'text', 'encode', 'guide', 'home', 'info'];

const RELATED_RING: string[] = RELATED_GROUP_ORDER.flatMap((gr) =>
  (pageRegistry as Array<{ id: string; hide?: boolean }>)
    .filter((p) => !p.hide && (PAGE_GROUP[p.id] ?? 'info') === gr)
    .map((p) => p.id)
);

function relatedLinks(currentPage: PageId): string {
  const byId = new Map(
    (pageRegistry as Array<{ id: string; path: string; hide?: boolean }>)
      .filter((p) => !p.hide)
      .map((p) => [p.id, p] as const)
  );
  const g = PAGE_GROUP[currentPage] ?? 'info';
  const ring = RELATED_RING;
  const i = ring.indexOf(currentPage);

  const picks: string[] = [];
  for (let k = 1; picks.length < 5 && k <= ring.length; k += 1) {
    const id = ring[(i + k) % ring.length];
    if (id !== currentPage) picks.push(id);
  }

  const labelFor = (tg: PageGroup): string => {
    if (tg === g) return GROUP_LABEL[g] ?? GROUP_LABEL.info;
    if ((g === 'decode' && tg === 'encode') || (g === 'encode' && tg === 'decode')) return '反过来用';
    return GROUP_LABEL[tg] ?? GROUP_LABEL.info;
  };

  const rows = [g, ...RELATED_GROUP_ORDER.filter((x) => x !== g)]
    .map((tg) => [labelFor(tg), picks.filter((id) => (PAGE_GROUP[id] ?? 'info') === tg)] as const)
    .filter(([, items]) => items.length > 0);

  const body = rows
    .map(([label, items]) => {
      const out = items
        .map((id) => byId.get(id))
        .filter((p): p is { id: string; path: string } => Boolean(p))
        .map((p) => `<a href="${p.path}">${SHORT_LABEL[p.id] ?? p.id}</a>`)
        .join('');
      return `<div class="related-row"><span class="rg-label">${label}</span><div class="related-links">${out}</div></div>`;
    })
    .join('\n      ');

  return `
    <section class="section">
      <h2>相关工具与指南</h2>
      ${body}
    </section>
  `;
}


const FOOTER_CLUSTER: Record<PageGroup, string[]> = {
  decode: ['/base64-to-pdf/', '/base64-to-word/'],
  encode: ['/pdf-to-base64/', '/image-to-base64/'],
  text: ['/base64url/', '/jwt-decode/'],
  guide: ['/base64url/', '/data-url/'],
  info: [],
  home: []
};

function footer(currentPage: PageId): string {
  const year = new Date().getFullYear();
  const legal =
    currentPage === 'home'
      ? `<a href="/about/">关于</a>
        <a href="/privacy/">隐私政策</a>
        <a href="/terms/">服务条款</a>`
      : `<span class="footer-legal">关于 · 隐私政策 · 服务条款</span>`;
  const clusterRows: string[] = [];
  for (const target of FOOTER_CLUSTER[PAGE_GROUP[currentPage] ?? 'info'] ?? []) {
    const hit = pageRegistry.find((x) => x.path === target);
    if (hit && hit.id !== currentPage) {
      clusterRows.push(`<a href="${hit.path}">${SHORT_LABEL[hit.id] ?? hit.id}</a>`);
    }
  }
  const clusterLinks = clusterRows.join('\n        ');
  return `
    <footer class="footer">
      <div class="footer-brand">
        <svg class="brand-icon" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="bg-fg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d97757"/><stop offset="1" stop-color="#c15f3c"/></linearGradient></defs><rect width="64" height="64" rx="9" fill="url(#bg-fg)"/><text x="32" y="41.4" text-anchor="middle" font-family="'JetBrains Mono',ui-monospace,Consolas,monospace" font-size="23" font-weight="700" fill="#ffffff">b64</text></svg>
        <strong>b64file</strong>
      </div>
      <p class="footer-tagline">由爱而生 · 免费 · 无账号 · 无广告</p>
      <div class="statusbar"><span class="sb-left">b64file</span><span class="sb-right">rfc4648 · 91 tests</span></div>
      <div class="footer-links">
        <a href="/">首页</a>
        <a href="/base64-to-file/">Base64 转文件</a>
        <a href="/json-to-file/">JSON 转文件</a>
        <a href="/file-to-base64/">文件转 Base64</a>
        <a href="/base64-to-image/">Base64 转图片</a>
        <a href="/base64-decode-errors/">解码失败排查</a>
      </div>
      <div class="footer-links">
        ${legal}
        <a href="mailto:${FEEDBACK_EMAIL}">反馈 ${FEEDBACK_EMAIL}</a>
      </div>
      ${clusterLinks ? `<div class="footer-links">\n        ${clusterLinks}\n      </div>` : ''}
      <p class="muted">© ${year} b64file.cn · Base64 只是编码，不是加密，别拿它保护敏感数据</p>
      ${ICP_NUMBER || POLICE_RECORD_NUMBER ? `<p class="footer-filings">
        ${ICP_NUMBER ? `<a class="muted" href="https://beian.miit.gov.cn/" rel="noopener nofollow" target="_blank">${ICP_NUMBER}</a>` : ''}
        ${ICP_NUMBER && POLICE_RECORD_NUMBER ? '<span class="muted"> · </span>' : ''}
        ${POLICE_RECORD_NUMBER ? `<a class="muted" href="${POLICE_RECORD_URL}" rel="noopener nofollow" target="_blank">${POLICE_RECORD_NUMBER}</a>` : ''}
      </p>` : ''}
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

/**
 * zh/en alternates. hreflang 必须双向声明才有效：英文站已指向 b64file.cn，
 * 这里补上反向，否则 Google 无法确认两站是同一内容的两个语言版本。
 */
export function hreflangTags(page: PageId): string {
  if (page === '404') return '';
  const path = pagePaths[page] ?? '/';
  const zh = absoluteUrl(path);
  const enBase = EN_SITE_URL.replace(/\/$/, '');
  const parts: string[] = [];
  if (zh) parts.push(`<link rel="alternate" hreflang="zh-CN" href="${zh}" />`);
  if (enBase) {
    parts.push(`<link rel="alternate" hreflang="en" href="${enBase}${path}" />`);
    parts.push(`<link rel="alternate" hreflang="x-default" href="${enBase}${path}" />`);
  }
  return parts.join('\n    ');
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
