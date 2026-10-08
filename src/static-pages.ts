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
  /** 文本模式下默认的转换方向（默认 encode） */
  textDir?: 'encode' | 'decode';
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
    title: 'Base64URL / URL-safe Base64 在线转换（含 JWT） - b64file',
    desc: 'URL-safe Base64（Base64URL）编解码：+ / 换成 - _、去掉填充 =，能安全放进 URL 参数、文件名和 JWT。贴进来自动识别并还原。',
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
          <li><strong>JWT</strong> — header 和 payload 都是 base64url，三段用点连起来</li>
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
      { q: 'JWT 里那段能直接解吗？', a: '能。把中间的 payload 段复制出来贴到「Base64 → 文本」，就能看到原始 JSON。提醒一句：JWT 的 payload 只是编码不是加密，谁拿到都能看，别往里放敏感信息。' },
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
    sections: [
      {
        h2: 'Data URL 长什么样',
        html: '<p>结构是 <code>data:[&lt;mediatype&gt;][;base64],&lt;data&gt;</code>。拿 <code>data:image/png;base64,iVBORw0KGgo...</code> 举例：<code>data:</code> 是声明，中间那段是 MIME 类型和 base64 标记，逗号之后才是数据本体。所以解码的第一步，永远是先把逗号前面那截摘掉。</p>'
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
    sections: [
      {
        h2: '三段分别是什么',
        html: '<ul><li><strong>header</strong>：算法和类型，比如 <code>{"alg":"HS256","typ":"JWT"}</code></li><li><strong>payload</strong>：真正的内容 —— 用户 ID、权限、签发时间 <code>iat</code>、过期时间 <code>exp</code></li><li><strong>signature</strong>：用密钥对前两段算出来的签名，<strong>不是数据，解不出东西</strong></li></ul>'
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
        html: '<p>纯静态页面 + 浏览器本地计算：文件类型靠魔数识别，不看扩展名；Base64 容错遵循 RFC 4648 标准；全部逻辑跑着 85 项自动化测试。</p>'
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
      ${contentSections(currentPage)}
      ${d.faqs.length ? faqSection(currentPage) : ''}
      ${currentPage !== '404' ? relatedLinks(currentPage) : ''}
    </main>
    ${footer()}
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
          <svg class="brand-icon" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="bg-lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d97757"/><stop offset="1" stop-color="#c15f3c"/></linearGradient></defs><rect width="64" height="64" rx="6" fill="url(#bg-lg)"/><text x="32" y="41" text-anchor="middle" font-family="Consolas,monospace" font-size="21" font-weight="700" fill="#fff">b64</text></svg>
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
          <button id="b64-sample" class="ghost-btn" type="button">载入示例</button>
          <button id="b64-load-file" class="ghost-btn" type="button">导入 .txt / .b64</button>
          <input type="file" id="b64-file-input" accept=".txt,.b64,.text,text/plain" hidden />
          <button id="b64-clear" class="ghost-btn" type="button">清空</button>
        </div>
        <p class="input-hint">粘贴即自动处理，不用点按钮</p>
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
        <textarea id="text-input" class="mono-input" rows="4" spellcheck="false"
          placeholder="输入文本或 Base64，方向在上面切换"></textarea>
        <div id="text-output" class="text-output" hidden></div>
      </div>

      <p class="local-note">粘贴、拖拽、Ctrl+V 截图都行</p>
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
  info: '常用工具'
};

function relatedLinks(currentPage: PageId): string {
  const all = (pageRegistry as Array<{ id: string; path: string; hide?: boolean }>).filter(
    (p) => !p.hide && p.id !== currentPage
  );
  const g = PAGE_GROUP[currentPage] ?? 'info';
  const take = (group: PageGroup, n: number) => all.filter((p) => PAGE_GROUP[p.id] === group).slice(0, n);
  const byId = (id: string) => all.filter((p) => p.id === id);

  const rows: Array<[string, typeof all]> = [];
  if (g === 'decode' || g === 'encode' || g === 'text') {
    rows.push([GROUP_LABEL[g], take(g, 3)]);
    rows.push(['反过来用', take(g === 'encode' ? 'decode' : 'encode', 1)]);
    rows.push([GROUP_LABEL.guide, take('guide', 1)]);
  } else {
    rows.push([GROUP_LABEL.info, [...byId('base64-to-file'), ...byId('file-to-base64'), ...byId('base64-to-text'), ...byId('base64-decode-errors')]]);
  }

  const body = rows
    .filter(([, items]) => items.length > 0)
    .map(
      ([label, items]) =>
        `<div class="related-row"><span class="rg-label">${label}</span><div class="related-links">${items
          .map((p) => `<a href="${p.path}">${SHORT_LABEL[p.id] ?? p.id}</a>`)
          .join('')}</div></div>`
    )
    .join('\n      ');

  return `
    <section class="section">
      <h2>相关工具与指南</h2>
      ${body}
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
      <p class="footer-tagline">由爱而生 · 免费 · 无账号 · 无广告</p>
      <div class="statusbar"><span class="sb-left">b64file</span><span class="sb-right">rfc4648 · 85 tests</span></div>
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
