import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type LinkInfo = {
  label: string;
  href: string;
};

type ReleaseItem = {
  name: string;
  release: string;
  summary: string;
  benchmark: string;
  watch: string;
  icon: string;
  iconAlt: string;
  links: LinkInfo[];
};

type ToolItem = {
  name: string;
  release: string;
  summary: string;
  benchmark: string;
  watch: string;
  links: LinkInfo[];
};

type ProductInsight = {
  name: string;
  release: string;
  summary: string;
  trend: string;
  watch: string;
  links: LinkInfo[];
};

type SourceItem = {
  name: string;
  type: string;
  summary: string;
  fit: string;
  links: LinkInfo[];
};

const HERO_TAGS = [
  { label: '精选工具', href: '#section-tools' },
  { label: '模型动态', href: '#section-models' },
  { label: '行业观察', href: '#section-insights' },
  { label: '内容源', href: '#section-sources' },
];

const MODEL_RELEASE_GROUPS: Array<{
  title: string;
  english: string;
  items: ReleaseItem[];
}> = [
  {
    title: '国内模型',
    english: 'Domestic Models',
    items: [
      {
        name: 'Qwen3.7-Max（通义千问 3.7）',
        release: '阿里巴巴达摩院・2026.05.20（发布）/ 2026.05.22（全端上线）',
        summary:
          '万亿参数 MoE 架构旗舰模型，推理与编程能力处于国产第一梯队，支持超长上下文与长周期任务执行。',
        benchmark: '对标 GPT-4o、Claude Sonnet 4.6',
        watch:
          '综合实测表现稳居国产模型前列，智能体适配能力突出，已全面接入千问全平台。',
        icon: '/garden-icons/tongyi.svg',
        iconAlt: 'Qwen / 通义千问',
        links: [
          { label: '产品主页', href: 'https://tongyi.aliyun.com/' },
          { label: '阿里云百炼', href: 'https://bailian.console.aliyun.com/' },
        ],
      },
      {
        name: 'DeepSeek V4-Pro',
        release: 'DeepSeek Inc.・2026.04.24（发布）',
        summary:
          '国产主流开源大模型，长上下文支持能力强，数学、代码推理为核心优势，主打高性价比。',
        benchmark: '对标 Llama 3 70B、主流高效通用模型',
        watch:
          '官方下调调用定价，大幅降低企业私有化部署、本地部署成本，落地场景广泛。',
        icon: '/garden-icons/deepseek.ico',
        iconAlt: 'DeepSeek',
        links: [
          { label: '官方主页', href: 'https://www.deepseek.com/' },
          { label: '开放平台', href: 'https://platform.deepseek.com/' },
        ],
      },
      {
        name: '文心 5.1（ERNIE 5.1）',
        release: '百度・2026.05.09',
        summary:
          '优化模型架构与推理效率，在控制参数规模的同时保留综合能力，多模态理解能力持续升级。',
        benchmark: '对标国际主流高效通用大模型',
        watch:
          '侧重工程化落地与成本优化，适合企业规模化商用、多场景集成。',
        icon: '/garden-icons/wenxin.ico',
        iconAlt: '文心一言',
        links: [
          { label: '文心一言', href: 'https://yiyan.baidu.com/' },
          { label: '千帆平台', href: 'https://qianfan.cloud.baidu.com/' },
        ],
      },
      {
        name: 'Kimi 2.0',
        release: 'Moonshot AI・近期正式上线',
        summary:
          '主打超长文档处理，百万级上下文窗口，长文本推理、图文理解能力表现优异。',
        benchmark: '对标 Claude 3 Opus、GPT-4o 长文本版本',
        watch:
          '深耕专业内容分析场景，适配论文、合同、书籍等大容量文本处理，生态持续拓展。',
        icon: '/garden-icons/kimi.ico',
        iconAlt: 'Kimi',
        links: [
          { label: '产品主页', href: 'https://kimi.moonshot.cn/' },
          { label: '开放平台', href: 'https://platform.moonshot.cn/' },
        ],
      },
    ],
  },
  {
    title: '国外模型',
    english: 'Global Models',
    items: [
      {
        name: 'Claude Opus 4.7',
        release: 'Anthropic・2026.04（稳定版迭代）',
        summary:
          '全球顶级通用模型，复杂逻辑推理、代码编写、长文本处理能力行业领先，视觉理解能力持续增强。',
        benchmark: '全球顶尖通用工作模型',
        watch:
          '可靠性高、幻觉率低，适配软件工程、学术研究、专业协作等高要求场景。',
        icon: '/garden-icons/claude.ico',
        iconAlt: 'Claude',
        links: [
          { label: 'Claude', href: 'https://claude.ai/' },
          { label: 'Anthropic API', href: 'https://www.anthropic.com/api' },
        ],
      },
      {
        name: 'GPT-5.5 Instant',
        release: 'OpenAI・2026.05.05',
        summary:
          'GPT-5.5 系列轻量化版本，兼顾响应速度与综合能力，降低使用门槛，面向大众用户开放。',
        benchmark: '对标 Gemini 3.5 Flash，主打高效低延迟',
        watch:
          '成为 ChatGPT 默认模型，深度联动办公生态，实时联网、多模态体验全面优化。',
        icon: '/garden-icons/chatgpt.ico',
        iconAlt: 'ChatGPT',
        links: [
          { label: 'ChatGPT', href: 'https://chatgpt.com/' },
          { label: 'OpenAI Platform', href: 'https://platform.openai.com/' },
        ],
      },
      {
        name: 'Gemini 3.5 Flash',
        release: 'Google・2026.05.20（谷歌 I/O 大会）',
        summary:
          '轻量化高效模型，基于 MoE 架构，响应速度快、调用成本低，综合能力均衡。',
        benchmark: '对标主流高速通用模型',
        watch:
          '谷歌生态默认主力模型，深度整合搜索、办公、移动端应用，规模化落地能力强。',
        icon: '/garden-icons/gemini.ico',
        iconAlt: 'Gemini',
        links: [
          { label: 'Gemini', href: 'https://gemini.google.com/' },
          { label: 'Google AI Studio', href: 'https://aistudio.google.com/' },
        ],
      },
      {
        name: 'Grok 5',
        release: 'xAI',
        summary:
          '大参数规模模型，侧重代码能力与真实场景理解，融合大量编程训练数据。',
        benchmark: '对标 GPT-5.5、Gemini 3.5 旗舰系列',
        watch:
          '目前仍处于训练研发阶段，暂未正式发布；项目主打开放生态，未来计划开源部分版本，与社交生态深度结合，实时信息处理为特色。',
        icon: '/garden-icons/grok.ico',
        iconAlt: 'Grok',
        links: [
          { label: 'xAI', href: 'https://x.ai/' },
          { label: 'Grok', href: 'https://grok.com/' },
        ],
      },
    ],
  },
];

const TOOL_GROUPS: Array<{
  title: string;
  english: string;
  items: ToolItem[];
}> = [
  {
    title: '对话协作类',
    english: 'Conversational Collaboration',
    items: [
      {
        name: 'Claude',
        release: 'Anthropic・2026.03.17（Dispatch 功能上线）',
        summary:
          '基于 Claude 旗舰模型的桌面协作工具，内置自动化任务能力，可自主完成文件处理、简单运维、日程管理等操作。',
        benchmark: '对标 GPT-4o Agent、主流 AI 桌面助手',
        watch:
          '无需编程即可定义多步骤任务，支持本地文件与跨应用操作，面向个人与团队付费用户开放。',
        links: [
          { label: 'Claude', href: 'https://claude.ai/' },
          { label: 'Anthropic', href: 'https://www.anthropic.com/' },
        ],
      },
      {
        name: 'Kimi 2.0',
        release: 'Moonshot AI・近期正式上线',
        summary:
          '中文环境下长文本对话利器，支持超大文件批量上传，图文解析、多轮对话记忆体验成熟。',
        benchmark: '对标海外长文本对话类旗舰工具',
        watch:
          '个人版免费功能充足，企业可选择私有化部署，适配国内办公与专业内容场景。',
        links: [
          { label: 'Kimi', href: 'https://kimi.moonshot.cn/' },
          { label: 'Moonshot', href: 'https://www.moonshot.cn/' },
        ],
      },
      {
        name: 'ChatGPT',
        release: 'OpenAI',
        summary:
          '全球普及度最高的 AI 对话工具，模型迭代稳定，联网、插件、自定义助手生态完善。',
        benchmark: '通用对话工具标杆',
        watch:
          '日常办公、内容创作、知识问答全能适配，跨终端体验统一，生态资源丰富。',
        links: [
          { label: 'ChatGPT', href: 'https://chatgpt.com/' },
          { label: 'OpenAI', href: 'https://openai.com/' },
        ],
      },
      {
        name: '豆包',
        release: '字节跳动',
        summary:
          '本土化综合 AI 对话产品，中文理解、日常交互、生活服务适配度高，多模态能力全面。',
        benchmark: '国内主流综合对话助手',
        watch:
          '全平台免费基础功能，贴合国内使用习惯，联动字节全系产品，上手门槛极低。',
        links: [{ label: '豆包', href: 'https://www.doubao.com/' }],
      },
      {
        name: '通义千问',
        release: '阿里巴巴达摩院',
        summary:
          '国产旗舰对话工具，综合能力均衡，兼顾创作、推理、问答，支持批量文档处理。',
        benchmark: '国内一线通用大模型应用',
        watch:
          '企业服务与个人使用双线布局，接口服务成熟，适合国内政企与个人日常使用。',
        links: [
          { label: '通义千问', href: 'https://tongyi.aliyun.com/' },
          { label: '阿里云百炼', href: 'https://bailian.console.aliyun.com/' },
        ],
      },
    ],
  },
  {
    title: '编程开发类',
    english: 'Development & Coding',
    items: [
      {
        name: 'Cursor 3.0',
        release: 'Cursor Team・2026.04.02（正式版）',
        summary:
          'AI 原生代码编辑器，集成多类主流大模型，支持代码补全、调试、重构、智能代理开发模式。',
        benchmark: '对标 GitHub Copilot X、专业 AI 编程 IDE',
        watch:
          '社区版免费可用，专业版性价比高，持续迭代云端代理与安全管控能力，开发者群体使用率高。',
        links: [{ label: 'Cursor', href: 'https://cursor.com/' }],
      },
      {
        name: 'DeepSeek 编程能力套件',
        release: 'DeepSeek Inc.',
        summary:
          '依托 DeepSeek V4-Pro 模型的编程服务，代码推理、算法实现能力突出，支持主流编程语言。',
        benchmark: '对标通用 AI 编程辅助工具',
        watch:
          '可通过 API、IDE 插件接入，搭配本地部署方案，适合追求低成本、高自主度的开发团队。',
        links: [
          { label: 'DeepSeek', href: 'https://www.deepseek.com/' },
          { label: '开放平台', href: 'https://platform.deepseek.com/' },
        ],
      },
      {
        name: 'GitHub Copilot',
        release: 'GitHub + OpenAI',
        summary:
          '全球主流代码辅助工具，深度嵌入主流编辑器，实时代码联想、补全、注释生成。',
        benchmark: '主流代码补全工具标杆',
        watch:
          '适配全主流开发环境，个人开发者、团队均可使用，生态与开源项目结合紧密。',
        links: [
          { label: 'Copilot', href: 'https://github.com/features/copilot' },
          { label: 'GitHub', href: 'https://github.com/' },
        ],
      },
      {
        name: 'Replit AI',
        release: 'Replit',
        summary:
          '在线云端编程平台，内置 AI 辅助能力，支持在线编写、运行、调试代码，无需本地环境。',
        benchmark: '在线 AI 编程工作台',
        watch:
          '轻量化在线开发，适合快速写 demo、学习编程、临时代码调试，跨设备使用便捷。',
        links: [{ label: 'Replit', href: 'https://replit.com/' }],
      },
      {
        name: 'CodeLlama 配套工具',
        release: 'Meta',
        summary:
          '开源代码大模型衍生工具链，支持本地部署、私有化 IDE 集成，主打开源自由。',
        benchmark: '开源系 AI 编程工具',
        watch:
          '完全开源可二次开发，适合技术团队深度定制、离线编程场景，无平台使用限制。',
        links: [
          { label: 'Meta AI', href: 'https://ai.meta.com/' },
          { label: 'Code Llama', href: 'https://ai.meta.com/llama/' },
        ],
      },
    ],
  },
  {
    title: '创意设计类',
    english: 'Creative Design',
    items: [
      {
        name: 'Claude Design（预览版）',
        release: 'Anthropic Labs・2026.04.17（研究预览版）',
        summary:
          '对话式创意设计工具，依托 Claude 模型，可快速生成设计方案、页面原型、演示文稿等内容。',
        benchmark: '对标 Figma AI、Adobe Firefly 智能设计能力',
        watch:
          '降低非专业人士的设计门槛，偏向创意初稿、方案构思，已开放给 Claude 付费用户体验。',
        links: [
          { label: 'Claude', href: 'https://claude.ai/' },
          { label: 'Anthropic', href: 'https://www.anthropic.com/' },
        ],
      },
      {
        name: 'Google AI Studio',
        release: 'Google・2026.05.20（谷歌 I/O 大会）',
        summary:
          '谷歌官方创意与开发工作台，支持多模态输入，可快速制作 UI 原型、简易应用与视觉内容。',
        benchmark: '对标综合类 AI 创意工作台',
        watch:
          '深度打通谷歌办公与应用生态，适合快速原型迭代、轻量创意产出。',
        links: [
          { label: 'AI Studio', href: 'https://aistudio.google.com/' },
          { label: 'Google AI', href: 'https://ai.google/' },
        ],
      },
      {
        name: 'Figma AI',
        release: 'Figma',
        summary:
          '主流在线协同设计工具内置 AI 能力，支持智能排版、元素生成、样式统一、文案辅助。',
        benchmark: '协同设计 + AI 融合标杆',
        watch:
          'UI/UX 设计师主力工具，多人协作成熟，AI 功能贴合设计工作流，行业普及度极高。',
        links: [{ label: 'Figma', href: 'https://www.figma.com/ai/' }],
      },
      {
        name: 'Adobe Firefly',
        release: 'Adobe',
        summary:
          '专业创意 AI 工具，适配 PS、AI 等 Adobe 全家桶，支持文生图、素材生成、图片编辑。',
        benchmark: '专业设计软件配套 AI 工具',
        watch:
          '商用版权清晰，适合商业设计、品牌视觉创作，和传统设计软件无缝衔接。',
        links: [{ label: 'Firefly', href: 'https://firefly.adobe.com/' }],
      },
      {
        name: 'Midjourney',
        release: 'Midjourney Inc.',
        summary:
          '全球知名 AI 绘画工具，画面质感、艺术表现力突出，支持风格化图像创作。',
        benchmark: 'AI 艺术绘画标杆',
        watch:
          '主打创意插画、概念图、风格化视觉，创作者群体庞大，风格玩法丰富。',
        links: [{ label: 'Midjourney', href: 'https://www.midjourney.com/' }],
      },
    ],
  },
  {
    title: '视频创作类',
    english: 'Video Creation',
    items: [
      {
        name: '可灵 Kling AI',
        release: '快手',
        summary:
          '国内头部 AI 视频生成工具，文生视频、图生视频表现稳定，画面连贯性、人物动作自然度表现优异。',
        benchmark: '国内一线 AIGC 视频工具',
        watch:
          '面向创作者与普通用户，支持短视频、创意短片制作，国内访问流畅，适配短视频生态。',
        links: [{ label: 'Kling AI', href: 'https://klingai.kuaishou.com/' }],
      },
      {
        name: '即梦',
        release: '字节跳动',
        summary:
          '字节旗下 AI 视频创作产品，依托自研大模型，支持一键生成视频、画面风格迁移、镜头创作。',
        benchmark: '轻量化全民 AI 视频工具',
        watch:
          '内嵌于抖音、剪映等产品，上手简单，适合普通用户快速制作创意短视频。',
        links: [{ label: '即梦', href: 'https://jimeng.jianying.com/' }],
      },
      {
        name: 'Runway',
        release: 'Runway ML',
        summary:
          '海外老牌专业 AI 视频工具，功能全面，支持视频生成、画面修复、抠图、动态特效等。',
        benchmark: '专业级 AI 视频创作平台',
        watch:
          '偏向影视、创意短片制作，功能深度强，适合专业视频创作者与工作室。',
        links: [{ label: 'Runway', href: 'https://runwayml.com/' }],
      },
      {
        name: 'Pika Labs',
        release: 'Pika Labs',
        summary:
          '海外热门文生视频工具，画面风格多样，动态流畅度高，风格化视频创作能力突出。',
        benchmark: '海外主流创意视频生成工具',
        watch:
          '社区活跃，风格模板丰富，主打创意向、艺术向短视频内容。',
        links: [{ label: 'Pika', href: 'https://pika.art/' }],
      },
      {
        name: '剪映 AI',
        release: '字节跳动',
        summary:
          '国民级剪辑软件内置 AI 套件，包含 AI 生视频、字幕生成、画面美化、配音、剪辑辅助等功能。',
        benchmark: '全民剪辑 + AI 综合工具',
        watch:
          '完全免费，功能贴合国内短视频创作场景，零基础也可完成 AI 视频制作。',
        links: [{ label: '剪映', href: 'https://www.capcut.cn/' }],
      },
    ],
  },
];

const PRODUCT_INSIGHTS: ProductInsight[] = [
  {
    name: 'Gemini 全生态套件',
    release: 'Google・2026.05.20（谷歌 I/O 大会）',
    summary:
      '整合模型、应用、办公、移动端的全栈 AI 服务体系，打通跨设备、跨应用智能能力。',
    trend: 'AI 从单一工具走向系统级生态，深度融入硬件与日常软件。',
    watch:
      '统一订阅体系覆盖个人与企业，安卓、谷歌办公全家桶全面赋能，是海外生态化 AI 的典型代表。',
    links: [
      { label: 'Gemini', href: 'https://gemini.google.com/' },
      { label: 'Google AI', href: 'https://ai.google/' },
    ],
  },
  {
    name: '移动模型服务平台（MoMA）',
    release: '中国移动・2026.05.08（移动云大会）',
    summary:
      '国内大型大模型聚合服务平台（MaaS），整合多款主流国产大模型，提供统一调用与调度服务。',
    trend: '单一模型逐步转向"模型集市"，降低企业选型、接入与运维成本。',
    watch:
      '内置智能调度策略，可按需求匹配对应模型，主打稳定服务与行业落地，面向政企客户为主。',
    links: [
      { label: '中国移动', href: 'https://www.10086.cn/' },
      { label: '移动云', href: 'https://ecloud.10086.cn/' },
    ],
  },
  {
    name: 'Claude Team',
    release: 'Anthropic・近期推出',
    summary:
      '面向企业的 AI 团队协作平台，支持成员管理、对话共享、权限隔离，整合全系 Claude 工具能力。',
    trend: 'AI 工具从个人使用，转向标准化团队协作，重视数据合规与权限管理。',
    watch:
      '对接主流办公协作软件，按使用量灵活计费，提供企业级可用性保障与隐私保护方案。',
    links: [
      { label: 'Claude', href: 'https://claude.ai/' },
      { label: 'Anthropic', href: 'https://www.anthropic.com/' },
    ],
  },
  {
    name: '千问云',
    release: '阿里巴巴达摩院・2026.05.22（随 Qwen3.7-Max 上线）',
    summary:
      '基于通义千问旗舰模型的智能体开发平台，主打低代码模式，降低智能体搭建门槛。',
    trend: '智能体开发平民化，从专业开发转向业务人员可自主搭建。',
    watch:
      '依托阿里云生态，支持一键部署与弹性扩容，内置通用智能体模板，适配多样业务场景。',
    links: [
      { label: '通义千问', href: 'https://tongyi.aliyun.com/' },
      { label: '阿里云', href: 'https://www.aliyun.com/' },
    ],
  },
  {
    name: 'Kimi 企业版智能服务',
    release: 'Moonshot AI・随 Kimi 2.0 近期上线',
    summary:
      '面向企业的定制化 AI 服务，结合超长文本能力与企业知识库，打造专属智能助手。',
    trend: '企业 AI 从通用工具，走向结合内部数据的私有化、定制化服务。',
    watch:
      '支持对接企业现有业务系统，提供混合云、私有化部署两种方案，侧重内容分析与知识管理场景。',
    links: [
      { label: 'Kimi', href: 'https://kimi.moonshot.cn/' },
      { label: 'Moonshot', href: 'https://www.moonshot.cn/' },
    ],
  },
];

const RECOMMENDED_SOURCES: SourceItem[] = [
  {
    name: 'Andrej Karpathy',
    type: '工程实践型',
    summary:
      'AI 领域资深技术专家，内容聚焦大模型原理、工程落地与实战开发，讲解通俗易懂。',
    fit: '大模型底层技术、代码实践、行业深度思考、前沿研究解读。',
    links: [{ label: 'X', href: 'https://x.com/karpathy' }],
  },
  {
    name: '量子位',
    type: '行业趋势型',
    summary:
      '国内头部 AI 科技媒体，快速同步国内外模型发布、产品动态、产业资讯。',
    fit: '行业热点、新品速递、产业分析、国内 AI 生态动态。',
    links: [{ label: '量子位', href: 'https://www.qbitai.com/' }],
  },
  {
    name: 'Dwarkesh Podcast',
    type: '深度访谈型',
    summary:
      '海外知名 AI 访谈播客，对话行业顶尖从业者、创业者与研究者。',
    fit: '行业顶层视角、技术路线探讨、创业与行业思考。',
    links: [{ label: 'Podcast', href: 'https://www.dwarkesh.com/' }],
  },
  {
    name: '吴恩达',
    type: '系统学习型',
    summary:
      '人工智能领域知名教育者，主打系统化 AI 入门、实战课程与行业科普。',
    fit: 'AI 基础知识、机器学习实战、应用落地方法论。',
    links: [
      { label: 'Coursera', href: 'https://www.coursera.org/instructor/andrewng' },
      { label: 'DeepLearning.AI', href: 'https://www.deeplearning.ai/' },
    ],
  },
  {
    name: '赛文乔伊',
    type: '工具测评型',
    summary:
      '专注 AI 工具实测、玩法分享的内容创作者，内容偏向一线使用体验。',
    fit: '新款工具上手测评、实用技巧、效率玩法、资源整理。',
    links: [{ label: 'Bilibili', href: 'https://search.bilibili.com/all?keyword=%E8%B5%9B%E6%96%87%E4%B9%94%E4%BC%8A' }],
  },
];

function renderLinks(links: LinkInfo[]) {
  return (
    <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
      {links.map((link) => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="garden-link-pill"
        >
          {link.label} ↗
        </a>
      ))}
    </div>
  );
}

export default function GardenPage() {
  const cardRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.garden-hero-content',
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.08 },
      );

      const cards = cardRefs.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 42, scale: 0.985 });

        cards.forEach((card, index) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.82,
            delay: index % 3 === 0 ? 0 : 0.03,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  let cardIndex = 0;

  const anchorPillClass =
    'font-mono text-xs rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-white/42 hover:text-white/72 hover:border-white/20 transition-colors duration-200';

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020504] font-body text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <video
          src="/videos/garden_bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(255,223,162,0.09),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(175,203,255,0.08),transparent_26%),radial-gradient(circle_at_68%_78%,rgba(182,231,201,0.06),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(3,11,8,0.50)_48%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      <div className="fixed left-0 right-0 top-0 z-50 mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center py-5">
          <a
            href="/"
            className="liquid-glass flex items-center gap-2 rounded px-4 py-2.5 text-sm font-body font-light text-white/55 transition-colors duration-300 hover:text-white/85"
          >
            &larr; 返回首页
          </a>
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-6xl w-full px-4 pb-24 pt-24 md:px-6 md:pb-32 md:pt-32">

        {/* ── HERO ── */}
        <section className="garden-hero-content grid grid-cols-1 md:grid-cols-[1.3fr_0.85fr_0.85fr] gap-12 items-start">
          <div className="col-span-1 min-w-0">
            <p className="mb-5 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/42">
              Digital Garden
            </p>
            <h1 className="font-project text-[clamp(58px,8vw,108px)] font-extrabold leading-[0.95] text-white">
              数字花园
            </h1>
          </div>
          <div className="col-span-2 min-w-0">
            <p className="text-sm font-body font-medium uppercase tracking-[0.22em] text-[#ffdfa2]/75">
              Curated AI Landscape
            </p>
            <p className="mt-5 text-xl font-body font-light leading-9 text-white/72 md:text-3xl md:leading-[1.3]">
              我持续筛选的 AI 工具、前沿模型、产品信号与优质信息源。
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {HERO_TAGS.map((tag) => (
                <a key={tag.label} href={tag.href} className={anchorPillClass}>
                  {tag.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── 精选工具 ── */}
        <section id="section-tools" className="mt-16 md:mt-24">
          <p className="mb-6 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/42">
            Selected Tools
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.85fr_0.85fr] gap-12 items-center">
            <h2 className="font-project text-[clamp(44px,5.4vw,82px)] font-extrabold leading-[0.95] text-white">
              精选工具
            </h2>
            <p className="col-span-2 text-lg font-body font-light leading-8 text-white/68 md:text-2xl md:leading-[1.35]">
              经过实测筛选的高频实用 AI 工具，覆盖对话协作、编程开发、创意设计、视频创作四大场景，全部为市面主流可正常使用产品。
            </p>
          </div>
          {TOOL_GROUPS.map((group) => (
            <div key={group.title} className="col-span-full">
              <h3 className="font-mono text-sm text-emerald-400/80 uppercase tracking-wider mb-1">
                {group.title}
              </h3>
              <p className="text-xs font-body font-medium uppercase tracking-[0.22em] text-white/36 mb-6">
                {group.english}
              </p>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {group.items.map((item) => {
                  const currentIndex = cardIndex++;
                  return (
                    <article
                      key={item.name}
                      ref={(node) => {
                        if (node) {
                          cardRefs.current[currentIndex] = node;
                        }
                      }}
                      className="garden-card garden-card--dense group rounded-[12px] p-6 md:p-7"
                    >
                      <p className="garden-meta-line">{item.release}</p>
                      <h4 className="mt-3 text-2xl font-body font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#fff1c9] md:text-3xl">
                        {item.name}
                      </h4>
                      <p className="mt-5 text-base font-body font-light leading-7 text-white/74 md:text-lg md:leading-8">
                        {item.summary}
                      </p>
                      <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                        <div>
                          <p className="garden-kicker">对标参考</p>
                          <p className="mt-2 text-sm font-body font-light leading-7 text-white/70 md:text-base">
                            {item.benchmark}
                          </p>
                        </div>
                        <div>
                          <p className="garden-kicker">值得关注</p>
                          <p className="mt-2 text-sm font-body font-light leading-7 text-white/70 md:text-base">
                            {item.watch}
                          </p>
                        </div>
                      </div>
                      {renderLinks(item.links)}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* ── 模型上新 ── */}
        <section id="section-models" className="mt-16 md:mt-24">
          <p className="mb-6 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/42">
            Model Releases
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.85fr_0.85fr] gap-12 items-center">
            <h2 className="font-project text-[clamp(44px,5.4vw,82px)] font-extrabold leading-[0.95] text-white">
              模型上新
            </h2>
            <p className="col-span-2 text-lg font-body font-light leading-8 text-white/68 md:text-2xl md:leading-[1.35]">
              最近值得关注的国内外大模型发布与能力解读，聚焦主流旗舰版本与技术趋势。
            </p>
          </div>
          {MODEL_RELEASE_GROUPS.map((group) => (
            <div key={group.title} className="col-span-full">
              <h3 className="font-mono text-sm text-emerald-400/80 uppercase tracking-wider mb-1">
                {group.title}
              </h3>
              <p className="text-xs font-body font-medium uppercase tracking-[0.22em] text-white/36 mb-6">
                {group.english}
              </p>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {group.items.map((item) => {
                  const currentIndex = cardIndex++;
                  return (
                    <article
                      key={item.name}
                      ref={(node) => {
                        if (node) {
                          cardRefs.current[currentIndex] = node;
                        }
                      }}
                      className="garden-card garden-card--dense group rounded-[12px] p-6 md:p-7"
                    >
                      <div className="flex items-start gap-4">
                        <div className="garden-icon-wrap shrink-0">
                          <img src={item.icon} alt={item.iconAlt} className="h-11 w-11 rounded-[12px] object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="garden-meta-line">{item.release}</p>
                          <h4 className="mt-3 text-2xl font-body font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#fff1c9] md:text-3xl">
                            {item.name}
                          </h4>
                        </div>
                      </div>
                      <p className="mt-5 text-base font-body font-light leading-7 text-white/74 md:text-lg md:leading-8">
                        {item.summary}
                      </p>
                      <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                        <div>
                          <p className="garden-kicker">对标参考</p>
                          <p className="mt-2 text-sm font-body font-light leading-7 text-white/70 md:text-base">
                            {item.benchmark}
                          </p>
                        </div>
                        <div>
                          <p className="garden-kicker">值得关注</p>
                          <p className="mt-2 text-sm font-body font-light leading-7 text-white/70 md:text-base">
                            {item.watch}
                          </p>
                        </div>
                      </div>
                      {renderLinks(item.links)}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* ── 产品观察 ── */}
        <section id="section-insights" className="mt-16 md:mt-24">
          <p className="mb-6 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/42">
            Product Insights
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.85fr_0.85fr] gap-12 items-center">
            <h2 className="font-project text-[clamp(44px,5.4vw,82px)] font-extrabold leading-[0.95] text-white">
              产品观察
            </h2>
            <p className="col-span-2 text-lg font-body font-light leading-8 text-white/68 md:text-2xl md:leading-[1.35]">
              行业内具备代表性的 AI 平台、企业级产品与服务形态，观察产品演进方向与行业趋势。
            </p>
          </div>
          <div className="col-span-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {PRODUCT_INSIGHTS.map((item) => {
                const currentIndex = cardIndex++;
                return (
                  <article
                    key={item.name}
                    ref={(node) => {
                      if (node) {
                        cardRefs.current[currentIndex] = node;
                      }
                    }}
                    className="garden-card garden-card--dense group rounded-[12px] p-6 md:p-7"
                  >
                    <p className="garden-meta-line">{item.release}</p>
                    <h4 className="mt-3 text-2xl font-body font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#d6f5e1] md:text-3xl">
                      {item.name}
                    </h4>
                    <p className="mt-5 text-base font-body font-light leading-7 text-white/74 md:text-lg md:leading-8">
                      {item.summary}
                    </p>
                    <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                      <div>
                        <p className="garden-kicker">代表趋势</p>
                        <p className="mt-2 text-sm font-body font-light leading-7 text-white/70 md:text-base">
                          {item.trend}
                        </p>
                      </div>
                      <div>
                        <p className="garden-kicker">值得关注</p>
                        <p className="mt-2 text-sm font-body font-light leading-7 text-white/70 md:text-base">
                          {item.watch}
                        </p>
                      </div>
                    </div>
                    {renderLinks(item.links)}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 信息源推荐 ── */}
        <section id="section-sources" className="mt-16 md:mt-24">
          <p className="mb-6 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/42">
            Recommended Sources
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.85fr_0.85fr] gap-12 items-center">
            <h2 className="font-project text-[clamp(44px,5.4vw,82px)] font-extrabold leading-[0.95] text-white">
              信息源推荐
            </h2>
            <p className="col-span-2 text-lg font-body font-light leading-8 text-white/68 md:text-2xl md:leading-[1.35]">
              优质创作者、媒体与学习渠道，用于追踪行业动态、学习技术、参考工具实测经验。
            </p>
          </div>
          <div className="col-span-full">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {RECOMMENDED_SOURCES.map((item) => {
                const currentIndex = cardIndex++;
                return (
                  <article
                    key={item.name}
                    ref={(node) => {
                      if (node) {
                        cardRefs.current[currentIndex] = node;
                      }
                    }}
                    className="garden-card garden-card--light group rounded-[12px] p-6"
                  >
                    <p className="garden-meta-line">{item.type}</p>
                    <h4 className="mt-3 text-2xl font-body font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#d9e7ff]">
                      {item.name}
                    </h4>
                    <p className="mt-5 text-sm font-body font-light leading-7 text-white/72 md:text-base">
                      {item.summary}
                    </p>
                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="garden-kicker">适合看什么</p>
                      <p className="mt-2 text-sm font-body font-light leading-7 text-white/70 md:text-base">
                        {item.fit}
                      </p>
                    </div>
                    {renderLinks(item.links)}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="mt-20 border-t border-dashed border-white/8 pt-6 md:mt-24">
          <p className="text-center text-sm font-body font-light text-white/34">
            &copy; 小蜜蜂 &middot; Digital Garden &middot; 持续生长中
          </p>
        </footer>
      </main>
    </div>
  );
}
