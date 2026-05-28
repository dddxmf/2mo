import { useEffect } from 'react';
import gsap from 'gsap';

const RESUME_EXPERIENCES = [
  {
    company: '广东快可立信息科技有限公司',
    role: 'AI 训练师',
    period: '2025.02 - 2026.05',
    highlights: [
      '独立承担公司大模型项目训练数据全链路，覆盖 RAG 知识库与 SFT 智能语音回访两条业务线',
      '制定 SFT 多轮对话标注规范与 RAG 知识入库标准，定义边界场景处理规则与质量评测指标',
      '管理 4 人内部团队 + 外部供应商，累计交付 1.5 万条 SFT 样本 + 4000+ 文档治理，质检通过率 95%+',
      '搭建任务完成率 / 合规率等评测指标体系，建立 Bad Case 四类归因机制，驱动 3 轮 SFT 数据迭代与 RAG 检索链路优化',
      '协调 5 个业务部门完成数据治理对齐，与产品 / 算法 / 工程高频协作，推动项目 0→1 落地并获评公司 AI 标杆案例',
    ],
  },
];
const RESUME_SKILLS = [
  'RAG',
  'SFT',
  'Embedding',
  'Hybrid Search',
  'Rerank',
  'Prompt Engineering',
  '数据标注规范',
  '评测体系搭建',
  'Bad Case 归因',
  'Python',
  'Flask',
  'Pandas',
  'HTML/CSS/JS',
  '跨部门协同',
];
const RESUME_EDUCATION = {
  school: '武汉传媒学院',
  degree: '软件工程',
  level: '本科',
  period: '2017.09 - 2021.06',
};

export default function ResumePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.resume-content',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#030706] text-white font-body">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(255,223,162,0.09),transparent_28%),radial-gradient(circle_at_18%_18%,rgba(175,203,255,0.09),transparent_26%),linear-gradient(180deg,rgba(0,0,0,0.92)_0%,rgba(3,14,10,0.98)_48%,rgba(0,0,0,0.96)_100%)]" />
      </div>

      <div className="fixed left-0 right-0 top-0 z-50 mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-center py-5">
          <a
            href="/"
            className="liquid-glass flex items-center gap-2 rounded px-4 py-2.5 text-sm font-body font-light text-white/55 hover:text-white/85 transition-colors duration-300"
          >
            &larr; 返回首页
          </a>
        </div>
      </div>

      <div className="resume-content relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr] lg:items-end lg:gap-32 xl:gap-44">
          <div>
            <p className="mb-5 text-sm font-body font-medium uppercase tracking-[0.24em] text-white/45">
              Resume
            </p>
            <h1 className="font-project text-[clamp(58px,7vw,106px)] font-extrabold leading-[0.95] text-white lg:whitespace-nowrap">
              个人简历
            </h1>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-sm font-body font-medium uppercase tracking-[0.22em] text-[#ffdfa2]/75">
              AI 训练师 / 大模型数据工程师
            </p>
            <p className="mt-5 text-2xl font-body font-light leading-9 text-white/70 md:text-4xl md:leading-[1.2]">
              1 年大模型项目实战，主攻 RAG 知识库与 SFT 训练数据全链路。
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-8 md:mt-20 md:space-y-10">
          <div className="relative overflow-hidden rounded-[8px] border border-white/10 bg-black/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#ffdfa2]/30 hover:bg-white/[0.055] hover:shadow-[0_0_34px_rgba(255,223,162,0.06)] md:p-10">
            <p className="mb-2 text-xs font-body font-medium uppercase tracking-[0.2em] text-white/45">
              工作经历
            </p>
            {RESUME_EXPERIENCES.map((exp) => (
              <div key={exp.company}>
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-body font-bold text-white md:text-3xl">
                    {exp.company}
                  </h2>
                  <span className="text-sm font-body font-light text-white/40">
                    {exp.period}
                  </span>
                </div>
                <p className="mb-5 text-lg font-body font-medium text-[#ffdfa2]/80">
                  {exp.role}
                </p>
                <ul className="space-y-4">
                  {exp.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 text-base font-body font-light leading-7 text-white/76 md:text-lg md:leading-8"
                    >
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b6e7c9]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-[8px] border border-white/10 bg-black/40 p-8 backdrop-blur-md md:p-10">
            <p className="mb-5 text-xs font-body font-medium uppercase tracking-[0.2em] text-white/45">
              项目经历
            </p>
            <div className="space-y-5">
              <a
                href="/#projects"
                className="group flex items-center justify-between rounded-[8px] border border-white/8 bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-[#ffdfa2]/25 hover:bg-white/[0.05]"
              >
                <div>
                  <p className="text-lg font-body font-semibold text-white group-hover:text-[#ffdfa2] transition-colors duration-300">
                    家电售后 RAG 知识库项目
                  </p>
                  <p className="mt-1 text-sm font-body font-light text-white/50">
                    4000+ 文档治理 · 召回率 72%→87%
                  </p>
                </div>
                <span className="text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ffdfa2]/60">
                  &darr;
                </span>
              </a>
              <a
                href="/#projects"
                className="group flex items-center justify-between rounded-[8px] border border-white/8 bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-[#ffdfa2]/25 hover:bg-white/[0.05]"
              >
                <div>
                  <p className="text-lg font-body font-semibold text-white group-hover:text-[#ffdfa2] transition-colors duration-300">
                    智能语音回访 SFT 项目
                  </p>
                  <p className="mt-1 text-sm font-body font-light text-white/50">
                    1.5 万条样本 · 回访覆盖率 30%→85%
                  </p>
                </div>
                <span className="text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ffdfa2]/60">
                  &darr;
                </span>
              </a>
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-black/40 p-8 backdrop-blur-md md:p-10">
            <p className="mb-5 text-xs font-body font-medium uppercase tracking-[0.2em] text-white/45">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {RESUME_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-[#b6e7c9]/14 bg-[#b6e7c9]/[0.055] px-3 py-2 text-xs font-body font-medium uppercase tracking-[0.12em] text-white/58 transition-all duration-300 hover:border-[#b6e7c9]/30 hover:bg-[#b6e7c9]/[0.1] hover:text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-black/40 p-8 backdrop-blur-md md:p-10">
            <p className="mb-4 text-xs font-body font-medium uppercase tracking-[0.2em] text-white/45">
              Education
            </p>
            <p className="text-xl font-body font-bold text-white">
              {RESUME_EDUCATION.school}
            </p>
            <p className="mt-2 text-base font-body font-light text-white/65">
              {RESUME_EDUCATION.degree} · {RESUME_EDUCATION.level} · {RESUME_EDUCATION.period}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="/resume.pdf"
              className="group relative whitespace-nowrap bg-white text-black text-sm font-body font-medium rounded px-5 py-3 overflow-hidden active:scale-[0.97] transition-all duration-200 shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.25)] hover:scale-[1.03] sm:px-6"
            >
              <span className="relative z-10">下载简历 PDF</span>
              <span className="absolute inset-0 bg-gradient-to-b from-white to-white/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
            <a
              href="https://github.com/yourname"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass group whitespace-nowrap text-white text-sm font-body font-medium rounded px-5 py-3 active:scale-[0.97] transition-all duration-200 hover:scale-[1.03] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_2px_rgba(255,255,255,0.07)] sm:px-6"
            >
              GitHub
            </a>
          </div>
        </div>

        <footer className="mt-20 border-t border-dashed border-white/8 pt-6">
          <p className="text-center text-sm font-body font-light text-white/34">
            &copy; 小蜜蜂 &middot; AI Systems Trainer
          </p>
        </footer>
      </div>
    </div>
  );
}
