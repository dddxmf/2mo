# 2mo — 小蜜蜂个人网站

Vite + React + TypeScript + Tailwind CSS 3.4 + GSAP 构建的个人品牌网站。

## 入口文件

| 入口 HTML | 入口 TSX | 页面组件 | 说明 |
|---|---|---|---|
| `index.html` | `src/main.tsx` | `src/App.tsx` | 首页（Hero、技能服务、项目、联系方式） |
| `resume.html` | `src/resume-main.tsx` | `src/pages/ResumePage.tsx` | 个人简历页 |
| `garden.html` | `src/garden-main.tsx` | `src/pages/GardenPage.tsx` | 数字花园（AI 工具/模型/产品/信息源） |

## 样式系统

- **Tailwind 3.4** + `src/index.css` 自定义 CSS
- 字体：`Instrument Serif`（hero 标题）、`Barlow`（正文）、`Dirtyline`（装饰）
- 主题色：`#ffdfa2`（暖金）、`#b6e7c9`（薄荷绿）、`#afcbff`（蓝紫）、`#ffabd2`（粉）
- 自定义工具类：`liquid-glass`、`garden-card`、`garden-icon-wrap`、`garden-link-pill` 等
- 滚动条自定义样式在 `index.css`

## 关键布局约定

- **页面最大宽度**：`max-w-6xl`（1152px）
- **Garden 页 grid**：hero 和所有 section 标题行统一使用 `md:grid-cols-[1.3fr_0.85fr_0.85fr]`，描述文字 `col-span-2`，保证左边缘对齐
- **Garden 背景**：`/videos/garden_bg.mp4` 全屏固定背景视频 + 渐变遮罩层，`z-0` 不挡内容
- **Section 标题结构**：eyebrow 文字独立全宽行 → 标题+描述在 `items-center` grid 行 → 卡片在内容流
- **移动端**：grid 退化为单列 `grid-cols-1`

## 已知问题与修复

- **移动端滑动失效**（Redmi、iOS 夸克浏览器）：根因是 `html` 上的 `scroll-snap-type: y proximity`，已移除。`body` 加 `touch-action: pan-y`
- **Capabilities 背景消失**：`App.tsx` 最外层容器不要改 `overflow-x-clip`，会影响 sticky 视频背景
- **Garden hero 标题换行**：`font-project` 字体极大（clamp 58-108px），`whitespace-nowrap` 不适用，需确保左侧列宽够用

## 部署

- GitHub Pages，自定义域名通过 `public/CNAME` 配置
- `npm run build` → `dist/` 目录
