import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: '关于我', href: '#about' },
  { label: '技能/服务', href: '#capabilities' },
  { label: '项目介绍', href: '#projects' },
  { label: '联系我', href: '#contact' },
  { label: '个人简历', href: '/resume.html' },
  { label: '数字花园', href: '/garden.html' },
];
const ABOUT_SKILLS = [
  {
    title: 'AI Trainer',
    text: '帮助团队理解 AI、使用 AI，并形成可持续的使用习惯。',
  },
  {
    title: 'Workflow Builder',
    text: '把重复性任务拆解、重组，设计成可以执行的 AI 工作流。',
  },
  {
    title: 'Knowledge Designer',
    text: '整理团队知识、经验和资料，让 AI 能更准确地理解上下文。',
  },
];
const CAPABILITIES = [
  {
    eyebrow: 'AI Tool Enablement',
    title: 'AI 工具赋能',
    text: '很多人只停留在 “会用工具”，但我认为落地才是核心。把复杂门槛抹平，让团队用得顺手、形成常态，才是真正的赋能。',
  },
  {
    eyebrow: 'Knowledge Base Design',
    title: '知识库搭建',
    text: '团队最值钱的东西，往往藏在老员工脑子里。我不想让这些经验随人员流动就消失，而是把它们挖出来，变成随时能查、持续生长的资产。',
  },
  {
    eyebrow: 'AI-Powered Service',
    title: '智能服务流程',
    text: '标准化的重复工作，是人力的无谓内耗。我的思路很简单：让 AI 接手规律事务，把人的精力留给需要共情、判断与决策的场景。',
  },
  {
    eyebrow: 'Automation Enablement',
    title: '工作流自动化',
    text: '流程里藏着大量看不见的时间成本。我习惯把冗余步骤挖出来，用工具把全链路串起来 — 让事情自己跑，人去做更值得做的事。',
  },
];
const PROJECTS = [
  {
    number: '01',
    title: 'LLM 语音回访智能体',
    subtitle: 'LLM-powered Voice Recall Agent',
    tech: ['Voice AI', 'Dialogue Reasoning', 'Compliance Verification'],
    summary: '替换低效传统 IVR，基于大模型重构语音回访能力。',
    actions: [
      '构建 15K+ 多轮对话数据集，覆盖常规流程、反问、投诉场景',
      '搭建合规评测指标体系，监控对话质量与稳定性',
      '迭代 Bad Case，持续优化模型复杂对话能力',
    ],
    capabilities: [
      'Voice Stream',
      'Waveform',
      'Dialogue Flow',
      'Live Transcript',
      'Conversational Runtime',
    ],
    impact: ['完成率 30% → 85%', '合规率 92%', '人力成本 -60%'],
    visual: 'voice',
  },
  {
    number: '02',
    title: '企业售后知识中枢',
    subtitle: 'Unified Knowledge Infrastructure',
    tech: ['RAG Pipeline', 'Retrieval Architecture', 'Knowledge Centralization'],
    summary:
      '整合 5 部门 4000+ 份碎片化文档，搭建统一知识库，服务多套下游 AI 系统。',
    actions: [
      '全流程知识治理：数据清洗、切片、入库、标注标准化',
      '搭建检索评测框架与问题复盘机制',
      '设计统一知识架构，支撑问答、培训、语音模型微调三大场景',
    ],
    capabilities: [
      'Document Parsing',
      'Dense Embedding',
      'Hybrid Retrieval',
      'Rerank',
      'Generation',
    ],
    impact: ['4000+ 文档统一管理', '赋能 3 套业务系统', '根除版本混乱问题'],
    visual: 'knowledge',
  },
  {
    number: '03',
    title: '多模态图片合规审核系统',
    subtitle: 'Multimodal Compliance Detection',
    tech: ['Visual AI', 'Risk Validation', 'Auto Inspection'],
    summary: 'AI 全量替代人工抽检，前置拦截业务合规风险。',
    actions: [
      '制定图像标注标准，规范清晰度、点位、部件、真实性审核规则',
      '搭建评测集，设计异常分级与人机复核流程',
      '沉淀人工经验，通过案例迭代持续优化审核规则',
    ],
    capabilities: [
      'Visual Understanding',
      'Compliance Classification',
      'Risk Flagging',
      'Human-in-the-loop Review',
    ],
    impact: ['审核覆盖率突破至全量', '人工复核工作量显著降低', '风险拦截前置'],
    visual: 'vision',
  },
];
const CONTACT_MODULES = [
  'AI Workflow Design',
  'RAG Infrastructure',
  'Evaluation Pipeline',
  'Training Data Engineering',
];
const CONNECTION_ENDPOINTS = [
  {
    id: 'email',
    method: 'MAIL',
    label: '邮箱',
    english: 'Email',
    value: 'dddxmfl@163.com',
    href: 'mailto:dddxmfl@163.com',
    type: 'link',
  },
  {
    id: 'github',
    method: 'GET',
    label: 'GitHub',
    english: 'GitHub',
    value: 'github.com/yourname',
    href: 'https://github.com/yourname',
    type: 'external',
  },
  {
    id: 'resume',
    method: 'EXEC',
    label: '简历',
    english: 'Resume',
    value: '[ VIEW RESUME ]',
    type: 'anchor',
    href: '/resume.html',
  },
  {
    id: 'wechat',
    method: 'WSS',
    label: '微信',
    english: 'WeChat',
    value: 'lzting_1122',
    type: 'overlay',
  },
] as const;
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_080827_a9e5ad52-b6ee-4e79-b393-d936f179cfd7.mp4';
const CAPABILITIES_VIDEO_SRC = '/videos/gezhan_loop.mp4';

type VideoFrameCallbackHandle = number;
type VideoFrameCallback = (
  now: DOMHighResTimeStamp,
  metadata: VideoFrameCallbackMetadata,
) => void;

type VideoFrameCallbackMetadata = {
  presentationTime: DOMHighResTimeStamp;
  expectedDisplayTime: DOMHighResTimeStamp;
  width: number;
  height: number;
  mediaTime: number;
  presentedFrames: number;
  processingDuration?: number;
  captureTime?: DOMHighResTimeStamp;
  receiveTime?: DOMHighResTimeStamp;
  rtpTimestamp?: number;
};

type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (
    callback: VideoFrameCallback,
  ) => VideoFrameCallbackHandle;
  cancelVideoFrameCallback?: (handle: VideoFrameCallbackHandle) => void;
};

function renderImpactContent(item: string) {
  const impactParts: Record<
    string,
    { label: string; value: string; nowrapValue?: boolean }
  > = {
    '完成率 30% → 85%': {
      label: '完成率',
      value: '30% → 85%',
      nowrapValue: true,
    },
    '合规率 92%': { label: '合规率', value: '92%' },
    '人力成本 -60%': { label: '人力成本', value: '-60%' },
    '4000+ 文档统一管理': { label: '文档统一管理', value: '4000+' },
    '赋能 3 套业务系统': {
      label: '赋能',
      value: '3 套业务系统',
      nowrapValue: true,
    },
    '根除版本混乱问题': { label: '版本管理', value: '混乱问题' },
    '审核覆盖率突破至全量': { label: '审核覆盖率', value: '全量' },
    '人工复核工作量显著降低': { label: '人工复核工作量', value: '显著降低' },
    '风险拦截前置': { label: '风险拦截', value: '前置' },
  };

  const parts = impactParts[item];

  if (!parts) {
    return <span>{item}</span>;
  }

  return (
    <span className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/62">
        {parts.label}
      </span>
      <span
        className={`font-project text-lg font-bold leading-none text-[#8EF4B5] ${
          parts.nowrapValue ? 'lg:whitespace-nowrap' : ''
        }`}
      >
        {parts.value}
      </span>
    </span>
  );
}

function LogoMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 cursor-pointer fill-none stroke-white/30 stroke-[1.5] transition-colors duration-300 hover:stroke-white/50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="XIAOMIFENG Logo"
    >
      <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" />
      <circle
        cx="12"
        cy="12"
        r="2.5"
        className="animate-pulse fill-emerald-400 stroke-none"
      />
    </svg>
  );
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const skillCardsRef = useRef<HTMLDivElement[]>([]);
  const capabilitiesSectionRef = useRef<HTMLElement>(null);
  const capabilityLineRef = useRef<HTMLDivElement>(null);
  const capabilityCardsRef = useRef<HTMLDivElement[]>([]);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const projectCardsRef = useRef<HTMLElement[]>([]);
  const contactSectionRef = useRef<HTMLElement>(null);
  const contactRowsRef = useRef<HTMLDivElement[]>([]);


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current as VideoWithFrameCallback | null;
    if (!video) {
      return undefined;
    }

    let capturing = true;
    let lastTime = -1;
    let rafId = 0;
    let videoFrameId: VideoFrameCallbackHandle | null = null;
    const MAX_WIDTH = 960;
    const frames: HTMLCanvasElement[] = [];

    const captureFrame = () => {
      if (!capturing || video.readyState < 2 || video.currentTime === lastTime) {
        return;
      }

      lastTime = video.currentTime;
      const scale = Math.min(1, MAX_WIDTH / video.videoWidth);
      const width = Math.max(1, Math.round(video.videoWidth * scale));
      const height = Math.max(1, Math.round(video.videoHeight * scale));
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;
      context?.drawImage(video, 0, 0, width, height);
      frames.push(canvas);
    };

    const scheduleCapture = () => {
      if (!capturing) {
        return;
      }

      if (video.requestVideoFrameCallback) {
        videoFrameId = video.requestVideoFrameCallback(() => {
          captureFrame();
          scheduleCapture();
        });
        return;
      }

      rafId = requestAnimationFrame(() => {
        captureFrame();
        scheduleCapture();
      });
    };

    const onLoaded = () => {
      void video.play().catch(() => {});
      scheduleCapture();
    };

    const onEnded = () => {
      capturing = false;
      if (frames.length > 0) {
        framesRef.current = frames;
        setFramesReady(true);
      }
    };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('ended', onEnded);

    if (video.readyState >= 1) {
      onLoaded();
    }

    return () => {
      capturing = false;
      cancelAnimationFrame(rafId);
      if (videoFrameId !== null && video.cancelVideoFrameCallback) {
        video.cancelVideoFrameCallback(videoFrameId);
      }
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  useEffect(() => {
    if (!framesReady) {
      return undefined;
    }

    const canvas = displayCanvasRef.current;
    const frames = framesRef.current;
    const firstFrame = frames[0];

    if (!canvas || !firstFrame) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    canvas.width = firstFrame.width;
    canvas.height = firstFrame.height;

    let index = 0;
    let direction = 1;
    let last = performance.now();
    const interval = 1000 / 30;
    let rafId = 0;

    const render = (now: DOMHighResTimeStamp) => {
      if (now - last >= interval && context) {
        context.drawImage(frames[index], 0, 0);
        last = now;
        index += direction;

        if (index >= frames.length - 1) {
          index = frames.length - 1;
          direction = -1;
        }

        if (index <= 0) {
          index = 0;
          direction = 1;
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [framesReady]);

  useEffect(() => {
    const strength = 20;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = ((event.clientX - centerX) / centerX) * strength;
      targetY = ((event.clientY - centerY) / centerY) * strength;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (videoBgRef.current) {
        gsap.set(videoBgRef.current, { x: currentX, y: currentY });
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const cards = skillCardsRef.current.filter(Boolean);

    if (cards.length === 0) {
      return undefined;
    }

    const cleanups = cards.map((card) => {
      const handleMouseEnter = () => {
        gsap.killTweensOf(card);
        card.classList.add('is-hovered');
        gsap.to(card, {
          y: -8,
          scale: 1.025,
          duration: 0.18,
          ease: 'power3.out',
          overwrite: true,
        });
      };

      const handleMouseMove = (event: MouseEvent) => {
        card.classList.add('is-hovered');
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          y: -8,
          scale: 1.025,
          rotateX: -y * 8,
          rotateY: x * 8,
          transformPerspective: 800,
          transformOrigin: 'center',
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        gsap.killTweensOf(card);
        card.classList.remove('is-hovered');
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: true,
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  useEffect(() => {
    const section = capabilitiesSectionRef.current;
    const line = capabilityLineRef.current;
    const cards = capabilityCardsRef.current.filter(Boolean);

    if (!section || cards.length === 0) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 56, scale: 0.98 });

      cards.forEach((card) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'bottom 55%',
              scrub: true,
            },
          },
        );
      }

      const cleanups = cards.map((card) => {
        const handleMouseEnter = () => {
          card.classList.add('is-spotlighted');
        };

        const handleMouseMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--spotlight-x', `${x}%`);
          card.style.setProperty('--spotlight-y', `${y}%`);
        };

        const handleMouseLeave = () => {
          card.classList.remove('is-spotlighted');
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    const section = projectsSectionRef.current;
    const cards = projectCardsRef.current.filter(Boolean);

    if (!section || cards.length === 0) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 64, scale: 0.985 });

      cards.forEach((card) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    const section = contactSectionRef.current;
    const rows = contactRowsRef.current.filter(Boolean);

    if (!section || rows.length === 0) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(rows, { opacity: 0, y: 22 });

      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  const introClass = mounted
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-6';

  return (
    <div className="min-h-screen bg-black text-white font-body overflow-x-clip">
      <div
        ref={videoBgRef}
        className="fixed top-0 left-0 w-full h-full z-0 scale-[1.08] origin-center"
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
          style={{ display: framesReady ? 'none' : 'block' }}
        />
        <canvas
          ref={displayCanvasRef}
          className="w-full h-full object-cover"
          style={{ display: framesReady ? 'block' : 'none' }}
        />
      </div>

      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-1.5rem)] whitespace-nowrap md:w-auto">
        <div className="liquid-glass flex items-center gap-5 overflow-x-auto rounded px-4 py-2.5 md:gap-7">
          <LogoMark />
          <div className="flex items-center gap-5 md:gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-body font-light text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="viewport-snap-section relative z-20 min-h-[100svh]">
        <div
          className={`absolute left-0 right-0 w-full px-4 text-center transition-all duration-1000 ${introClass}`}
          style={{ top: '126px' }}
        >
          <h1 className="hero-title select-none">XIAOMIFENG</h1>
          <p className="mt-5 text-3xl font-body font-semibold text-white/90 md:text-5xl">
            AI 训练师
          </p>
        </div>

        <div
          className={`absolute bottom-6 left-0 right-0 flex items-end justify-center px-4 transition-all duration-1000 delay-300 md:bottom-12 ${introClass}`}
        >
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              className="group relative whitespace-nowrap bg-white text-black text-sm font-body font-medium rounded px-5 py-3 overflow-hidden active:scale-[0.97] transition-all duration-200 shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.25)] hover:scale-[1.03] sm:px-6"
            >
            <span className="relative z-10">查看项目</span>
            <span className="absolute inset-0 bg-gradient-to-b from-white to-white/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
            <a
              href="#about"
              className="liquid-glass group whitespace-nowrap text-white text-sm font-body font-medium rounded px-5 py-3 active:scale-[0.97] transition-all duration-200 hover:scale-[1.03] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_2px_rgba(255,255,255,0.07)] sm:px-6"
            >
              关于我
            </a>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="viewport-snap-section relative z-30 min-h-[100svh] overflow-hidden bg-black/70 px-5 pt-[var(--nav-safe-offset)] md:px-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(3,11,7,0.86)_36%,rgba(0,0,0,0.94)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
        <div className="relative mx-auto flex box-border min-h-[calc(100svh-var(--nav-safe-offset))] max-w-6xl flex-col justify-center gap-16 py-10 md:flex-row md:items-center md:justify-between md:gap-24 lg:gap-32">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/45">
              About
            </p>
            <h2 className="font-heading text-5xl italic leading-none text-white md:text-7xl">
              AI Trainer for Smarter Work
            </h2>
            <div className="mt-12 space-y-7 text-lg font-body font-light leading-8 text-white/76 md:text-xl md:leading-9">
              <p>很多团队试过 AI 工具，但用着用着就放弃了。</p>
              <p>
                我帮他们找到真正能跑通的方式：从 AI 培训、提示词设计、知识库整理，到团队工作流改造，一步一步把 AI 放进真实业务里。
              </p>
              <p>
                我关注的不是炫技，而是让人更轻松、更清楚、更稳定地
                <span className="whitespace-nowrap">完成工作。</span>
              </p>
            </div>
          </div>

          <div className="grid w-full max-w-md gap-6 md:gap-7 md:pt-10">
            {ABOUT_SKILLS.map((skill, index) => (
              <div
                key={skill.title}
                ref={(node) => {
                  if (node) {
                    skillCardsRef.current[index] = node;
                  }
                }}
                className="liquid-glass about-skill-card cursor-pointer rounded-[8px] px-7 py-7 transform-gpu will-change-transform"
              >
                <div className="mb-4 flex items-center justify-between gap-6">
                  <h3 className="text-lg font-body font-semibold text-white">
                    {skill.title}
                  </h3>
                  <span className="font-dirtyline text-2xl text-white/35">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-sm font-body font-light leading-6 text-white/68">
                  {skill.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-section="capabilities"
        ref={capabilitiesSectionRef}
        className="free-scroll-section relative z-30 overflow-x-clip bg-black px-5 pb-20 pt-[var(--nav-safe-offset)] md:px-10 md:pb-24"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <video
            src={CAPABILITIES_VIDEO_SRC}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover brightness-[1.0] contrast-[0.95] saturate-[0.9]"
          />
            <div className="absolute inset-0 z-10 bg-black/25" />
            <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.15)_42%,rgba(0,0,0,0.30)_100%)]" />
          </div>
        </div>
        <div id="capabilities" className="free-scroll-snap-entry" aria-hidden="true" />
        <div className="absolute left-5 top-[calc(var(--nav-safe-offset)+2rem)] hidden h-[calc(100%-var(--nav-safe-offset)-4rem)] w-px origin-top overflow-hidden bg-white/10 md:left-10 md:block">
          <div
            ref={capabilityLineRef}
            className="h-full w-full origin-top bg-gradient-to-b from-[#ffdfa2] via-[#b6e7c9] to-[#afcbff]"
          />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-28">
          <div className="lg:sticky lg:top-[calc(var(--nav-safe-offset)+2rem)] lg:self-start">
            <p className="mb-5 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/45">
              CAPABILITIES
            </p>
            <h2 className="whitespace-nowrap font-heading text-[clamp(56px,6vw,88px)] italic font-black leading-none">
              <span className="text-white">技能</span>
              <span className="text-emerald-400">与</span>
              <span className="text-white">服务</span>
            </h2>
            <p className="mt-9 max-w-md text-xl font-body font-light leading-8 text-white/68">
              Four ways I help teams make AI usable.
            </p>
          </div>

          <div className="relative space-y-8 pl-8 pt-2 md:space-y-10 md:pl-12 md:pt-8">
            {CAPABILITIES.map((capability, index) => (
              <div
                key={capability.title}
                ref={(node) => {
                  if (node) {
                    capabilityCardsRef.current[index] = node;
                  }
                }}
                className="capability-card relative min-h-[300px] overflow-hidden rounded-[8px] border border-white/10 bg-black/40 p-8 backdrop-blur-md transform-gpu transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] md:p-10"
              >
                <span className="capability-node absolute -left-[38px] top-10 h-3 w-3 rounded-full bg-white/50 md:-left-[54px]" />
                <span className="pointer-events-none absolute right-5 top-1 z-0 font-dirtyline text-[7rem] font-bold leading-none text-white/5 md:right-7 md:top-2 md:text-[9rem]">
                  0{index + 1}
                </span>
                <div className="relative z-10 flex h-full min-h-[236px] flex-col justify-between gap-12">
                  <div>
                    <div>
                      <p className="mb-5 text-xs font-body font-medium uppercase tracking-[0.2em] text-white/50 md:text-sm">
                        {capability.eyebrow}
                      </p>
                      <h3 className="text-4xl font-body font-bold leading-tight text-white md:text-5xl">
                        {capability.title}
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-xl text-lg font-body font-light leading-relaxed text-white/80 md:text-xl">
                    {capability.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        ref={projectsSectionRef}
        className="free-scroll-section relative z-30 overflow-hidden bg-[#030706] px-5 py-24 md:px-10 md:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,223,162,0.12),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(175,203,255,0.12),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.92)_0%,rgba(3,14,10,0.98)_48%,rgba(0,0,0,0.96)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr] lg:items-end lg:gap-32 xl:gap-44">
            <div>
              <p className="mb-5 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/45">
                Projects
              </p>
              <h2 className="font-project text-[clamp(58px,7vw,106px)] font-extrabold leading-[0.95] text-white lg:whitespace-nowrap">
                项目介绍
              </h2>
            </div>
            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-sm font-body font-medium uppercase tracking-[0.22em] text-[#ffdfa2]/75">
                AI Systems Trainer
              </p>
              <p className="mt-5 text-2xl font-body font-light leading-9 text-white/70 md:text-4xl md:leading-[1.2]">
                Build production AI systems with workflows, data and knowledge
                engineering.
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-8 md:mt-20 md:space-y-10">
            {PROJECTS.map((project, index) => (
              <article
                key={project.title}
                ref={(node) => {
                  if (node) {
                    projectCardsRef.current[index] = node;
                  }
                }}
                className={`project-card project-card--${project.visual} group relative overflow-hidden rounded-[8px] border border-white/10 bg-black/45 backdrop-blur-md transition-all duration-300 hover:border-[#ffdfa2]/35 hover:bg-white/[0.055] hover:shadow-[0_0_34px_rgba(255,223,162,0.08)]`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="project-visual" aria-hidden="true" />
                </div>
                <span className="pointer-events-none absolute right-5 top-2 z-[1] font-project text-[8rem] font-light leading-none text-white/[0.08] md:right-7 md:text-[10rem] lg:right-10 lg:top-4 lg:text-[14rem]">
                  {project.number}
                </span>

                <div className="relative z-10 grid gap-10 p-8 md:p-10 lg:grid-cols-[0.96fr_1.04fr] lg:gap-12 lg:p-14">
                  <div className="flex min-h-[420px] flex-col justify-between gap-14">
                    <div>
                      <div className="flex flex-col items-start space-y-4">
                        <p className="text-xs text-white/40 md:text-sm">
                          {project.subtitle}
                        </p>
                        <h3 className="text-3xl font-bold leading-tight text-white md:text-5xl">
                          {project.title}
                        </h3>
                        <div className="flex flex-row flex-nowrap gap-0 overflow-x-auto whitespace-nowrap pb-1 text-xs text-[#ffdfa2]/88 md:text-sm">
                          {project.tech.map((item, techIndex) => (
                            <span key={item} className="flex items-center">
                              <span className="transition-colors hover:text-[#fff1c9]">
                                {item}
                              </span>
                              {techIndex < project.tech.length - 1 ? (
                                <span className="px-2 text-[#ffdfa2]/52">|</span>
                              ) : null}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-8 max-w-xl text-xl font-body font-light leading-8 text-white/82">
                        {project.summary}
                      </p>
                    </div>

                    <div>
                      <p className="mb-4 text-xs font-body font-medium uppercase tracking-[0.22em] text-white/60">
                        落地效果
                      </p>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {project.impact.map((item) => (
                          <div
                            key={item}
                            className="rounded-[8px] border border-white/10 bg-black/34 px-5 py-4 text-sm font-body font-medium leading-6 text-white/88"
                          >
                            {renderImpactContent(item)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-10 border-t border-white/10 pt-10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    <div>
                      <p className="mb-6 text-xs font-body font-medium uppercase tracking-[0.22em] text-white/56">
                        System Work
                      </p>
                      <ul className="space-y-5">
                        {project.actions.map((action) => (
                          <li
                            key={action}
                            className="flex gap-4 text-base font-body font-light leading-7 text-white/76 md:text-lg md:leading-8"
                          >
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b6e7c9]" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="mb-5 text-xs font-body font-medium uppercase tracking-[0.22em] text-white/56">
                        Visual Tags
                      </p>
                      <div className="flex flex-wrap gap-x-2 gap-y-4 md:gap-y-5">
                        {project.capabilities.map((item) => (
                          <span
                            key={item}
                            className="rounded border border-[#b6e7c9]/14 bg-[#b6e7c9]/[0.055] px-3 py-2 text-xs font-body font-medium uppercase tracking-[0.12em] text-white/58"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={contactSectionRef}
        className="free-scroll-section contact-interface relative z-30 overflow-hidden px-5 pb-18 pt-[var(--nav-safe-offset)] md:px-10 md:pb-24"
      >
        <div className="contact-noise absolute inset-0 opacity-40" />

        <div className="contact-glass-card relative mx-auto max-w-6xl rounded-2xl border-2 border-white/10 bg-neutral-950/55 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-500 md:p-12 lg:p-14">
          <div className="grid gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:gap-24">
            <div className="max-w-xl">
              <p className="mb-5 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/38">
                Contact
              </p>
              <h2 className="font-project text-[clamp(52px,6.5vw,92px)] font-bold leading-[0.96] text-white">
                联系我
              </h2>
              <div className="mt-12 border-t border-dashed border-white/8 pt-8">
                <p className="flex items-center text-xs font-body uppercase tracking-[0.24em] text-white/34">
                  <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  系统连接 Connect to System
                </p>
                <div className="mt-8 space-y-5">
                  <div>
                    <p className="text-xs font-body uppercase tracking-[0.22em] text-white/28">
                      可连接模块 Available Modules
                    </p>
                    <p className="mt-3 max-w-lg text-base font-body font-light leading-7 text-white/70 md:text-lg">
                      {CONTACT_MODULES.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-white/8 pt-8 lg:border-l lg:border-dashed lg:border-white/5 lg:pl-12 lg:pt-0">
              <div>
                <p className="text-xs font-body uppercase tracking-[0.24em] text-white/34">
                  系统接口 Connection Endpoints
                </p>

                <div className="mt-7 space-y-2">
                  {CONNECTION_ENDPOINTS.map((endpoint, index) => {
                    const rowContent = (
                      <>
                        <div className="min-w-0">
                          <p className="text-base font-body font-medium text-white md:text-lg">
                            {endpoint.label}
                            <span className="ml-2 text-xs font-body uppercase tracking-[0.18em] text-white/32">
                              {endpoint.english}
                            </span>
                          </p>
                        </div>
                        <div className="group flex min-w-0 items-center justify-between gap-4">
                          <span
                            className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase mr-2 ${
                              endpoint.id === 'resume'
                                ? 'bg-emerald-500/10 text-emerald-400/80'
                                : 'bg-white/5 text-white/40'
                            }`}
                          >
                            {endpoint.method}
                          </span>
                          <span
                            className={`contact-linkline min-w-0 text-sm transition-all duration-300 md:text-base ${
                              endpoint.id === 'resume'
                                ? 'font-mono text-xs text-amber-400/80'
                                : endpoint.id === 'wechat'
                                  ? 'font-mono text-xs text-white/45'
                                  : 'font-body font-light text-white/68'
                            }`}
                          >
                            {endpoint.value}
                          </span>
                        </div>
                      </>
                    );

                    return (
                      <div
                        key={endpoint.id}
                        ref={(node) => {
                          if (node) {
                            contactRowsRef.current[index] = node;
                          }
                        }}
                        className="relative border-b border-dashed border-white/10 last:border-b-0"
                      >
                        {endpoint.type === 'link' ? (
                          <a
                            href={endpoint.href}
                            className="contact-endpoint group grid gap-4 py-5 transition-colors duration-300 md:grid-cols-[0.78fr_1.22fr] md:items-center"
                          >
                            {rowContent}
                          </a>
                        ) : null}

                        {endpoint.type === 'external' ? (
                          <a
                            href={endpoint.href}
                            target="_blank"
                            rel="noreferrer"
                            className="contact-endpoint group grid gap-4 py-5 transition-colors duration-300 md:grid-cols-[0.78fr_1.22fr] md:items-center"
                          >
                            {rowContent}
                          </a>
                        ) : null}

                        {endpoint.type === 'anchor' ? (
                          <a
                            href={endpoint.href}
                            className="contact-endpoint group grid w-full gap-4 py-5 text-left transition-colors duration-300 md:grid-cols-[0.78fr_1.22fr] md:items-center"
                          >
                            {rowContent}
                          </a>
                        ) : null}

                        {endpoint.type === 'overlay' ? (
                          <button
                            type="button"
                            onClick={() => setWechatOpen((open) => !open)}
                            onMouseEnter={() => setWechatOpen(true)}
                            onMouseLeave={() => setWechatOpen(false)}
                            className="contact-endpoint group grid w-full gap-4 py-5 text-left transition-colors duration-300 md:grid-cols-[0.78fr_1.22fr] md:items-center"
                          >
                            {rowContent}
                          </button>
                        ) : null}
                        {endpoint.id === 'wechat' && wechatOpen ? (
                          <div className="pointer-events-none absolute right-0 top-[calc(100%-0.25rem)] z-20 hidden md:block">
                            <div className="contact-qr-panel rounded-[8px] border border-white/8 px-4 py-4">
                              <img
                                src="/wechat-qr.jpg"
                                alt="微信二维码"
                                className="h-36 w-36 rounded-[6px] object-cover"
                              />
                              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/38">
                                lzting_1122
                              </p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {wechatOpen ? (
                  <div className="contact-inline-panel mt-4 rounded-[8px] border border-white/8 px-4 py-4 md:hidden">
                    <img
                      src="/wechat-qr.jpg"
                      alt="微信二维码"
                      className="h-36 w-36 rounded-[6px] object-cover"
                    />
                    <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/38">
                      lzting_1122
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <footer className="mt-20 border-t border-dashed border-white/8 pt-6">
            <p className="text-sm font-body font-light text-white/34">
              © 小蜜蜂 · AI Systems Trainer
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}
