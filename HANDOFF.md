# XiaoMiFeng AI Trainer Website Handoff

## Project Overview

This is a Vite + React + TypeScript + Tailwind CSS personal website for an AI trainer brand named `XIAOMIFENG`.

The visual direction is:

- Forest
- Sunlight
- Breathable spacing
- Digital Garden
- Digital Nature
- AI forest / consciousness space
- Atmospheric UI

Avoid a generic tech/SaaS/loading-screen look. The desired feeling is entering a calm digital forest where AI work systems grow naturally.

Additional current design direction:

- Editorial typography mixed with infrastructure-style UI
- Dark atmospheric backgrounds with restrained glass surfaces
- Very large Chinese headings paired with smaller English system labels
- Minimal, quiet interaction design
- Fewer cards, fewer borders, more whitespace
- Avoid hacker-terminal theatrics; prefer stable system-interface calm

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger

No other UI libraries should be used.

## Run Commands

```bash
npm install
npm run dev -- --host 127.0.0.1
npm run build
```

Local dev URL:

```text
http://127.0.0.1:5173/
```

## Deployment

**Platform**: GitHub Pages + GitHub Actions

**Repository**: [github.com/dddxmf/2mo](https://github.com/dddxmf/2mo)

**Live URL**: `https://dddxmf.com`

**Domain Management**:
- Domain Registrar: 百度云 (Baidu Cloud)
- DNS Records:
  - CNAME `www` → `dddxmf.github.io`
  - CNAME `@` → `dddxmf.github.io`
- Custom domain configured in GitHub repo Settings → Pages → Custom domain
- CNAME file at `public/CNAME` ensures it survives each deploy

**Deploy Flow**:
- Push to `main` branch triggers `.github/workflows/deploy.yml`
- GitHub Actions builds (`npm ci` + `npm run build`) and deploys to GitHub Pages
- `vite.config.ts` `base` is set to `'/'` for custom domain

**Important**: If the custom domain is ever removed, change `base` back to `'/2mo/'` in `vite.config.ts`.

## Key Files

- `src/App.tsx`
  Main page structure, video/canvas boomerang logic, GSAP interactions, sections.

- `src/index.css`
  Font imports, Tailwind directives, global body styles, scroll snap/navigation offset, 28px scrollbar styling, liquid glass classes, hero title, rainbow border.

- `tailwind.config.js`
  Custom font families and default pill border radius.

- `vite.config.ts`
  Multi-page build config: `index.html` (main) + `resume.html` (resume) + `garden.html` (digital garden).

- `resume.html`
  Standalone resume page HTML entry point.

- `src/resume-main.tsx`
  React entry point for the resume page, mounts `<ResumePage />`.

- `src/pages/ResumePage.tsx`
  Standalone resume page component: work experience, project links back to main page, skills, education, download button. GSAP fade-in on mount (no ScrollTrigger). Includes `window.scrollTo(0, 0)` on mount to prevent browser scroll restoration issues.

- `garden.html`
  Standalone digital garden page HTML entry point.

- `src/garden-main.tsx`
  React entry point for the digital garden page, mounts `<GardenPage />`.

- `src/pages/GardenPage.tsx`
  Standalone digital garden page: Hero + 模型上新 (domestic/global model releases) + 精选工具 (4 categories: 对话协作/编程开发/创意设计/视频创作) + 产品观察 + 信息源推荐. Each model card has a dedicated app icon (not company icon). All cards include external links. GSAP ScrollTrigger reveal animations + mount fade-in with `window.scrollTo(0, 0)`.

- `public/garden-icons/`
  Model and company favicon assets for the digital garden page. Model-specific icons: `claude.ico`, `chatgpt.ico`, `gemini.ico`, `grok.ico`, `kimi.ico`, `tongyi.svg`, `wenxin.ico`, `deepseek.ico`.

- `public/wechat-qr.jpg`
  WeChat QR code image displayed in the contact section.

## Current Page Structure

### 1. Hero

Content:

- Main title: `XIAOMIFENG`
- Subtitle: `AI 训练师`
- Buttons: `查看项目`, `关于我`
- Background: remote video, captured into canvas frames and replayed as a boomerang after the video ends.
- Mouse parallax: GSAP moves the background subtly based on mouse position.

Important behavior:

- The video element remains mounted.
- Once the source video ends, captured canvas frames render in a forward/backward boomerang loop.
- Do not reverse by setting `video.currentTime`.

### 2. About

Content:

- `ABOUT`
- `AI Trainer for Smarter Work`
- Chinese intro copy
- Three ability cards:
  - `AI Trainer`
  - `Workflow Builder`
  - `Knowledge Designer`

Interaction:

- About cards have GSAP hover movement and a soft rainbow border.
- The rainbow border is controlled by `.about-skill-card.is-hovered`.

Important typography note:

- Avoid single Chinese characters wrapping alone at line ends. Example already handled:
  `完成工作。` is wrapped in a `whitespace-nowrap` span.

### 3. Capabilities / 技能与服务

Content:

- `CAPABILITIES`
- `技能与服务`
- `Four ways I help teams make AI usable.`
- Four service cards:
  - `AI 工具赋能`
  - `知识库搭建`
  - `智能服务流程`
  - `工作流自动化`

Current implementation:

- The previous sticky stacking card design was removed because it caused awkward final-card behavior and empty scroll space on 1440px desktop.
- It is now a stable Digital Forest Path layout:
  - Left title area remains sticky on large screens.
  - Right cards are normal-height path cards.
  - A vertical growth line runs down the left side of the section.
  - Cards animate into view with GSAP ScrollTrigger.
- Section background uses a local video asset:
  - `public/videos/gezhan_loop.mp4`
  - Constant in `src/App.tsx`: `CAPABILITIES_VIDEO_SRC = '/videos/gezhan_loop.mp4'`
  - The background layer is `absolute inset-0`.
  - Inside it, a sticky viewport wrapper uses `sticky top-0 h-[100svh] w-full overflow-hidden`.
  - The video is `absolute inset-0 h-full w-full object-cover`.
  - Current video filters: `brightness-[1.0] contrast-[0.95] saturate-[0.9]`.
  - Current overlays:
    - `bg-black/25`
    - gradient overlay values: `0.30 / 0.15 / 0.30`
- The left heading is split visually:
  - `技能`: white, solid, `font-black`
  - `与`: `text-emerald-400`
  - `服务`: white, solid
- Right capability cards now use a simpler glass style:
  - Default: `border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300`
  - Hover: `hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]`
  - The old `.spotlight-card` hover gradient interaction is no longer used on these cards.
- Card typography:
  - English eyebrow is smaller and muted: `text-xs text-white/50 md:text-sm`
  - Chinese card title is `font-bold text-white`
  - Body copy is `text-white/80 leading-relaxed`
  - Large decorative number is a low-opacity watermark: `text-white/5`, currently `text-[7rem] md:text-[9rem]`, `font-bold`.

Current brightness tuning note:

- The user has been tuning the Capabilities video by numeric values only.
- Current values are the latest accepted state:
  - `brightness-[1.0]`
  - `bg-black/25`
  - gradient `0.30 / 0.15 / 0.30`
- If the user asks for another small brightness adjustment, prefer changing only these numeric values unless they ask for structural changes.

Scroll/layout note:

- Hero and About are treated as viewport snap sections.
- Capabilities is a long free-scroll section, not a full snap section.
- `#capabilities` is attached to a small internal snap/anchor marker instead of the long section itself.
- A shared CSS variable `--nav-safe-offset` is used for navigation-safe scroll behavior and section padding.
- Avoid adding `scroll-snap-stop: always`; it can be brittle on mobile Safari.

## Navigation

Current nav items (in order):

```text
关于我 / 技能/服务 / 项目介绍 / 联系我 / 个人简历 / 数字花园
```

Current anchors / links:

- `#about`
- `#capabilities`
- `#projects`
- `#contact`
- `/resume.html` (standalone page, not a hash anchor)
- `/garden.html` (standalone page, not a hash anchor)

Note: `个人简历` and `数字花园` navigate to separate pages. Clicking either triggers a full page navigation, not a smooth-scroll anchor jump.

Current logo note:

- The old three white rounded blocks were removed.
- The current nav logo is a pure SVG “smart hive” mark with:
  - outer hexagon outline
  - small pulsing emerald center node
- It should stay vertically centered with the nav text.

## Design System Notes

### Fonts

Imported in `src/index.css`:

- `Instrument Serif`
- `Barlow`
- `Dirtyline`
- `Montserrat`

Tailwind font aliases:

- `font-heading`
- `font-body`
- `font-dirtyline`
- `font-project`

Typography usage notes:

- `Instrument Serif` is mainly for large atmospheric brand / section headings.
- `Montserrat` is used for stronger, more modern section headings such as `项目介绍` and system-forward UI moments.
- English helper labels should stay smaller, weaker, and secondary to Chinese content.

### Global Style Rules

- The site should feel like a calm AI operating environment inside a digital forest.
- Prefer dark layered backgrounds, subtle gradients, weak grid textures, and small amounts of blur/noise.
- Keep interaction restrained: hover brightening, slight movement, weak glow, gradual reveal.
- Avoid thick shadows, oversized rounded cards, loud neon, or busy dashboard density.
- Use Chinese as the primary information layer; English should behave like metadata or system labels.

### Glass Styling

Reusable classes:

- `.liquid-glass`
- `.liquid-glass-strong`

These use:

- `backdrop-filter`
- transparent fills
- masked gradient borders
- very subtle inset shadows

Capability cards do not use `.liquid-glass` anymore. They use Tailwind glass classes directly so the emerald hover effect stays predictable.

### Color Direction

Avoid strong cyber green.

Preferred highlight family:

- warm sunlight
- honey amber
- pollen pink
- moss green
- soft morning blue

Current rainbow palette appears in `src/index.css`:

```css
rgba(255, 223, 162, ...)
rgba(255, 171, 210, ...)
rgba(182, 231, 201, ...)
rgba(175, 203, 255, ...)
```

## Animation Notes

GSAP is already imported and ScrollTrigger is registered:

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

Current animations:

- Hero background mouse parallax
- Video-frame boomerang canvas render
- About skill card hover tilt
- About skill card rainbow border
- Capabilities card scroll reveal
- Capabilities growth line
- Capabilities card emerald border/background/shadow hover
- Contact endpoint micro brightening / underline / slight shift
- Contact glass card hover lift and rainbow-border emphasis

View transition CSS was added:

```css
::view-transition-group(*),
::view-transition-old(*),
::view-transition-new(*) {
  animation-duration: 0.25s;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
```

## Important Recent Decisions

1. Do not return to the sticky stacked service-card implementation unless redesigning it from scratch.

It caused:

- final card being pushed under the nav
- awkward large blank space after the final card
- cards needing to be stretched too tall
- brittle desktop behavior at 1440px

The current path-card system is intentionally simpler and more reliable.

Also avoid returning the Capabilities cards to the old spotlight mouse-follow system unless explicitly requested. The current direction is cleaner: background video atmosphere plus readable glass cards with subtle emerald hover.

2. Sub-pages (resume, garden) use a consistent back-navigation pattern:
   - A fixed top bar with `left-0 right-0 mx-auto max-w-{size} px-5 md:px-10` that matches the main content width.
   - `window.scrollTo(0, 0)` on mount to prevent browser scroll restoration from misaligning the fixed nav and content.
   - Do not use `fixed left-5 top-5` directly on the back link — always wrap in a width-constrained container.

## Suggested Next Sections

### Project Introduction / 项目介绍

This section is now implemented and placed after `Capabilities / 技能与服务`.

Current structure:

- Left heading: `Projects` + `项目介绍`
- Right intro:
  - `AI Systems Trainer`
  - `Build production AI systems with workflows, data and knowledge engineering.`
- Three large case cards:
  - `LLM 语音回访智能体`
  - `企业售后知识中枢`
  - `多模态图片合规审核系统`

Current visual / layout rules:

- The main Chinese heading `项目介绍` uses a bold modern sans-serif style, not the serif heading style used elsewhere.
- The right English intro copy uses lower contrast than the main heading (`text-white/70` direction).
- Each project card uses a two-column large-card layout with atmospheric system graphics in the background.
- The small English subtitle sits above the Chinese title.
- The Chinese title is the strongest text element inside the card.
- The tech line under the title is plain inline gold text separated by `|`, for example:
  `Voice AI | Dialogue Reasoning | Compliance Verification`
- Do not return to pill-style bordered tech tags for this line unless explicitly requested.
- The large watermark project number sits in the upper-right as a very low-opacity background decoration.

Impact card rules:

- `落地效果` cards use a strict two-line structure:
  - top line: small muted label
  - bottom line: highlighted value
- Highlight color for the value is `#8EF4B5`.
- On desktop, key values such as `30% → 85%` and `3 套业务系统` should stay on one line.

### Resume / 个人简历

This section is a **standalone page** at `/resume.html`, not part of the main SPA.

Current structure:

- **Back navigation**: `← 返回首页` liquid-glass link, fixed top-left.
- **Header**: `Resume` + `个人简历` (font-project large heading) + `AI 训练师 / 大模型数据工程师` subtitle.
- **Work Experience card**: Single timeline card for 广东快可立信息科技有限公司 · AI 训练师 (2025.02-2026.05), 5 bullet-point highlights.
- **Project Experience card**: Two clickable link cards (`家电售后 RAG 知识库项目`, `智能语音回访 SFT 项目`) that navigate back to `/#projects` on the main page.
- **Skills card**: 14 skill tags in the same style as Projects Visual Tags.
- **Education card**: 武汉传媒学院 · 软件工程 · 本科 · 2017.09-2021.06.
- **Action buttons**: White "下载简历 PDF" + glass "GitHub" button.
- **Animation**: Simple GSAP fade-in on mount (no ScrollTrigger).

Entry points from main page:

- Nav bar `个人简历` link → `/resume.html`
- Contact `[VIEW RESUME]` endpoint → `/resume.html`

Vite multi-page config in `vite.config.ts`:

```ts
build: {
  rollupOptions: {
    input: {
      main: path.resolve(__dirname, 'index.html'),
      resume: path.resolve(__dirname, 'resume.html'),
      garden: path.resolve(__dirname, 'garden.html'),
    },
  },
},
```

Both pages share the same `src/index.css` and common chunks (React, gsap) are code-split automatically.

### Resume / 个人简历 (Legacy - removed from main SPA)

Previously the resume section was embedded as `#resume` inside `App.tsx`. It has been extracted to `/resume.html`. Do not add it back to the main page.

### Digital Garden / 数字花园

This section is a **standalone page** at `/garden.html`, not part of the main SPA.

Current structure (5 sections):

1. **Hero**: `数字花园` / `Digital Garden` / intro copy / 4 tag pills.
2. **模型上新 Model Releases**: Two groups (国内模型 / 国外模型), 4 cards each. Each card: model icon (app icon preferred over company icon), release info, summary, benchmark comparison, watch notes, external links.
3. **精选工具 Selected Tools**: 4 categories (对话协作类 / 编程开发类 / 创意设计类 / 视频创作类), 5 tools each. Each card: summary, benchmark, watch notes, external links.
4. **产品观察 Product Insights**: 5 observation cards. Each card: summary, trend analysis, watch notes, external links.
5. **信息源推荐 Recommended Sources**: 5 source cards in 3-column grid. Each card: type, summary, what to watch for, external links.

Current visual / layout rules:

- All cards use `.garden-card` / `.garden-card--dense` / `.garden-card--light` classes.
- Model cards have a 2-column grid with icon + text header.
- Tool/product cards use 2-column grid; source cards use 3-column grid.
- External links rendered as `.garden-link-pill` rounded pills with hover effects.
- GSAP ScrollTrigger reveals: section headers fade up, cards stagger in with opacity + y + scale.
- Hero uses mount-time GSAP fade-in.
- `window.scrollTo(0, 0)` on mount prevents browser scroll restoration issues.
- Back navigation uses a container-constrained fixed bar (`left-0 right-0 mx-auto max-w-7xl`) matching main content width.

CSS classes in `src/index.css`:

- `.garden-panel` — section outer wrapper / hero panel
- `.garden-card` — base card with glass background, gradient border, hover lift/glow
- `.garden-card--dense` — model/tool/product info-dense cards
- `.garden-card--light` — lighter source cards
- `.garden-icon-wrap` — model icon container with glass styling
- `.garden-link-pill` — external link pill button
- `.garden-meta-line` — metadata line (release info, dates)
- `.garden-kicker` — small eyebrow label

### Contact / 联系我

This section is now implemented as a minimal runtime-style interface, not a traditional contact page.

Current structure:

- Left:
  - `Contact`
  - `联系我`
  - `系统连接 Connect to System`
  - Available modules line:
    `AI Workflow Design · RAG Infrastructure · Evaluation Pipeline · Training Data Engineering`
- Right:
  - `系统接口 Connection Endpoints`
  - `邮箱 Email` → `dddxmfl@163.com`
  - `GitHub` → `github.com/yourname`
  - `简历 Resume` → navigates to `/resume.html`
  - `微信 WeChat` → `lzting_1122`, hover/click reveals real QR image (`public/wechat-qr.jpg`)
- Footer:
  - `© 小蜜蜂 · AI Systems Trainer`

Current behavior / style rules:

- No contact form, no large input fields, no social-media stack.
- The section should feel like a stable system interface: quiet, sparse, professional.
- Use deep dark background, weak grid, subtle noise, thin dividers, large whitespace.
- The whole Contact block is now a single large glass card, not multiple outer cards.
- The Contact glass card uses:
  - strong blur
  - dark translucent fill
  - 2px border presence
  - rainbow gradient border emphasis on hover
  - subtle hover lift / glow
- Endpoint rows use only micro interactions: small brightening, slight text shift, weak underline/glow.
- `Email` opens `mailto:dddxmfl@163.com`.
- `GitHub` opens in a new tab.
- `Resume` (`[VIEW RESUME]`) navigates to `/resume.html` (standalone resume page).
- `WeChat` reveals a QR code image (`public/wechat-qr.jpg`) in a floating panel on desktop and an inline panel on mobile.
- Endpoint method labels currently use API-like prefixes:
  - `MAIL`
  - `GET`
  - `EXEC`
  - `WSS`

## Known Checks Already Done

- `npm run build` passes.
- Desktop layout checked around 1440px.
- Hero and About sections render without horizontal overflow.
- Capabilities section no longer has the old final-card empty-scroll issue after switching to path cards.
- Latest build after Project Introduction typography / spacing / impact-card changes passes.
- Latest build after Contact glass-card / nav-logo / endpoint refinements passes.
- Local dev server has been run at `http://127.0.0.1:5173/`.
- Right browser scrollbar was intentionally widened to `28px` in `src/index.css` using `::-webkit-scrollbar`.

## Working Preferences From User

- Chinese copy should avoid single-character orphan lines.
- Keep the page atmospheric and breathable.
- Prefer GSAP + ScrollTrigger for scroll motion.
- Use `backdrop-filter` glass effects.
- Use rainbow / sunlight-style highlights rather than neon green.
- Avoid making cards too tall just to solve animation problems.
- For Capabilities hover, the user accepted a more emerald/green tech feel.
- For Project Introduction, the user prefers cleaner editorial text hierarchy over bordered UI-chip styling.
- For Contact, the user wants a minimal infrastructure / runtime-interface feel rather than a social page.
- When refining visuals, the user often prefers precise numeric or structural tweaks with minimal collateral changes.
- When asked for small visual tuning, the user often prefers exact numeric changes and minimal code movement.
