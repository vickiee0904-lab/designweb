"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowSquareOut,
  Brain,
  Camera,
  EnvelopeSimple,
  FigmaLogo,
  FilePdf,
  LinkedinLogo,
  MouseSimple,
  PenNib,
  Shapes,
  Strategy,
  UserFocus,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import CharacterHero from "./CharacterHero";
import FooterParticles from "./FooterParticles";
import HeroAmbient from "./HeroAmbient";
import { dataOperationsDashboard, mobileCommerce, researchDataPlatform } from "../data/projects";
import { sitePath } from "../lib/site-path";

const capabilities = [
  { label: "产品策略", icon: Strategy },
  { label: "用户体验", icon: UserFocus },
  { label: "视觉系统", icon: Shapes },
  { label: "原型设计", icon: FigmaLogo },
  { label: "AI 协作", icon: Brain },
];

const projectCards = [
  {
    src: sitePath("/assets/portfolio/research-data-platform/page-01.webp"),
    width: 3840,
    height: 2160,
    cardClass: "project-card-reference",
    index: researchDataPlatform.index,
    type: researchDataPlatform.type,
    title: researchDataPlatform.title,
    summary: researchDataPlatform.summary,
    href: researchDataPlatform.href,
    meta: [
      { label: "ROLE", value: researchDataPlatform.role },
      { label: "PERIOD", value: researchDataPlatform.period },
      { label: "TYPE", value: researchDataPlatform.projectType },
    ],
  },
  {
    src: sitePath("/assets/portfolio/mobile-commerce/page-01.webp"),
    width: 3840,
    height: 2160,
    cardClass: "project-card-reference",
    index: mobileCommerce.index,
    type: mobileCommerce.type,
    title: mobileCommerce.title,
    summary: mobileCommerce.summary,
    href: mobileCommerce.href,
    meta: [
      { label: "ROLE", value: mobileCommerce.role },
      { label: "YEAR", value: mobileCommerce.period },
      { label: "TYPE", value: mobileCommerce.projectType },
    ],
  },
  {
    src: sitePath("/assets/portfolio/data-operations-dashboard/page-01.webp"),
    width: 3840,
    height: 2160,
    cardClass: "project-card-reference",
    index: dataOperationsDashboard.index,
    type: dataOperationsDashboard.type,
    title: dataOperationsDashboard.title,
    summary: dataOperationsDashboard.summary,
    href: dataOperationsDashboard.href,
    meta: [
      { label: "ROLE", value: dataOperationsDashboard.role },
      { label: "YEAR", value: dataOperationsDashboard.period },
      { label: "TYPE", value: dataOperationsDashboard.projectType },
    ],
  },
];

const projectProof = [
  {
    problem: "多角色、多对象和长链路任务缺少统一的信息入口。",
    role: researchDataPlatform.role,
    outcome: "建立项目、实验、样本与库存之间可追踪的连续任务路径。",
  },
  {
    problem: "本地商品、邻里拼团和履约信息分散在不同操作路径。",
    role: mobileCommerce.role,
    outcome: "统一商品发现、拼团决策与订单履约的移动体验。",
  },
  {
    problem: "设备、安全、危化品与巡检信号难以在同一视图中判断。",
    role: dataOperationsDashboard.role,
    outcome: "将分散的资产与安全信息组织为可快速识别异常的监控视图。",
  },
] as const;

const impactItems = [
  {
    index: "01",
    title: "复杂流程重构",
    description: "从真实任务链路出发，梳理角色、对象与状态，让高密度系统保持清晰可追踪。",
  },
  {
    index: "02",
    title: "跨端体验统一",
    description: "在移动端、桌面端与数据大屏之间建立一致的认知、反馈和视觉语言。",
  },
  {
    index: "03",
    title: "设计系统落地",
    description: "把设计原则沉淀为可复用组件、规范与协作方式，支持产品持续演进。",
  },
] as const;

const processItems = [
  { index: "01", title: "发现问题", description: "理解业务背景、用户任务与真实限制。" },
  { index: "02", title: "定义方向", description: "对齐目标、优先级、信息结构与体验原则。" },
  { index: "03", title: "设计验证", description: "用原型、可用性反馈和视觉测试降低不确定性。" },
  { index: "04", title: "协作交付", description: "联动产品与研发，让方案稳定进入真实场景。" },
] as const;

const aiWorkflowItems = [
  {
    index: "01",
    title: "识别设计语言",
    description: "从现有界面与品牌特征中提取颜色、字号、间距和重复模式。",
  },
  {
    index: "02",
    title: "生成规范初稿",
    description: "辅助建立语义 Token、视觉层级、状态规则与命名结构。",
  },
  {
    index: "03",
    title: "沉淀组件体系",
    description: "补充组件尺寸、变体及交互状态，形成可复用的设计资产。",
  },
  {
    index: "04",
    title: "人工校准发布",
    description: "由设计师确认视觉质量、使用边界和真实业务适配后发布。",
  },
] as const;

const figmaDesignSystemUrl =
  "https://www.figma.com/design/DR1rwYNkLSwi49sB8niXnv/%E8%AE%BE%E8%AE%A1%E7%B3%BB%E7%BB%9F%E6%90%AD%E5%BB%BA?node-id=995-2";

function MagneticLink({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <a
      className={`magnetic-link ${className}`}
      href={href}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOffset({
          x: (event.clientX - rect.left - rect.width / 2) * 0.12,
          y: (event.clientY - rect.top - rect.height / 2) * 0.16,
        });
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <span>{children}</span>
      <ArrowRight size={17} weight="bold" aria-hidden="true" />
    </a>
  );
}

export default function PortfolioHome({ version = "v1" }: { version?: "v1" | "v2" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const isV2 = version === "v2";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    rootRef.current
      ?.querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className={isV2 ? "portfolio-home portfolio-home-v2" : undefined}
      style={{
        "--selected-work-ambient-image": `url("${sitePath("/assets/portfolio/selected-work-ambient.png")}")`,
      } as CSSProperties}
    >
      {isV2 ? <a className="skip-link" href="#work">跳至主要内容</a> : null}
      <nav className="site-nav" aria-label="主导航">
        <a className="identity" href="#top" aria-label="XIA 首页">
          <strong>XIA</strong>
          <span>UI / UX DESIGNER</span>
        </a>

        <button
          className="menu-toggle"
          aria-label="打开或关闭导航"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? "关闭" : "菜单"}
        </button>

        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>作品</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>关于</a>
          {isV2 ? (
            <Link href="/daily" onClick={() => setMenuOpen(false)}>日常</Link>
          ) : (
            <a href="#playground" onClick={() => setMenuOpen(false)}>日常</a>
          )}
          <a href="#contact" onClick={() => setMenuOpen(false)}>联系</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <HeroAmbient />
        <div className="hero-copy" id={isV2 ? undefined : "about"}>
          <p className="kicker hero-kicker">产品思维 · 视觉表达 · AI 协作</p>
          <h1>
            设计清晰、好用且
            <span>富有表现力的数字体验。</span>
          </h1>
          <p className="hero-description">
            我是 XIA，一名专注产品体验与视觉系统的 UI 设计师。
            在复杂需求与真实用户之间，建立清晰、可信且令人愉悦的连接。
          </p>
          <MagneticLink href="#work">探索精选作品</MagneticLink>
          <a className="scroll-hint" href="#work">
            <MouseSimple size={19} weight="light" aria-hidden="true" />
            <span>向下滚动</span>
          </a>
        </div>

        <CharacterHero />
      </section>

      <section className="selected-work" id="work">
        <header className="section-heading" data-reveal>
          <div>
            <p className="kicker">SELECTED WORK / 2023—2026</p>
            <h2>精选作品</h2>
          </div>
          <span>点击作品，查看完整案例</span>
        </header>

        <div className="project-showcase" data-reveal>
          <div className="project-feature" data-selected-card={activeCard + 1}>
            <div
              className="project-deck"
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                event.currentTarget.style.setProperty("--deck-x", `${x * 5}deg`);
                event.currentTarget.style.setProperty("--deck-y", `${y * -4}deg`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--deck-x", "0deg");
                event.currentTarget.style.setProperty("--deck-y", "0deg");
              }}
            >
              <div className="project-deck-perspective" role="group" aria-label="选择精选作品">
                {projectCards.map((project, index) => {
                  const offset = (index - activeCard + projectCards.length) % projectCards.length;
                  const positionClass =
                    offset === 0 ? "is-selected" : offset === 1 ? "is-back-near" : "is-back-far";

                  return (
                    <button
                      type="button"
                      className={`project-card project-card-${index + 1} ${project.cardClass} ${positionClass}`}
                      key={project.title}
                      aria-label={`选择${project.title}`}
                      aria-pressed={activeCard === index}
                      onClick={() => setActiveCard(index)}
                    >
                      <Image
                        src={project.src}
                        alt={`${project.title}项目界面`}
                        width={project.width}
                        height={project.height}
                        sizes="(max-width: 700px) 72vw, 46vw"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="project-info" aria-live="polite" key={activeCard}>
              <div className="project-info-index">
                {projectCards[activeCard].index}
                <span>/ 03</span>
              </div>
              <p className="project-info-type">{projectCards[activeCard].type}</p>
              <h3 className={projectCards[activeCard].title.length >= 8 ? "is-long" : undefined}>
                {projectCards[activeCard].title}
              </h3>
              <p className="project-info-summary">{projectCards[activeCard].summary}</p>

              {isV2 ? (
                <div className="project-proof" aria-label="项目问题、角色与结果">
                  <div>
                    <span>问题</span>
                    <p>{projectProof[activeCard].problem}</p>
                  </div>
                  <div>
                    <span>角色</span>
                    <p>{projectProof[activeCard].role}</p>
                  </div>
                  <div>
                    <span>结果</span>
                    <p>{projectProof[activeCard].outcome}</p>
                  </div>
                </div>
              ) : null}

              <dl>
                {projectCards[activeCard].meta.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>

              <Link className="project-case-link" href={projectCards[activeCard].href}>
                查看完整案例
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>

              <div className="project-stepper" aria-label="切换项目">
                <button
                  type="button"
                  aria-label="上一个项目"
                  onClick={() => setActiveCard((activeCard + projectCards.length - 1) % projectCards.length)}
                >
                  <ArrowRight size={15} weight="bold" aria-hidden="true" />
                </button>
                <div>
                  {projectCards.map((project, index) => (
                    <button
                      type="button"
                      className={activeCard === index ? "is-active" : ""}
                      key={project.index}
                      aria-label={`查看项目 ${project.index}`}
                      aria-pressed={activeCard === index}
                      onClick={() => setActiveCard(index)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="下一个项目"
                  onClick={() => setActiveCard((activeCard + 1) % projectCards.length)}
                >
                  <ArrowRight size={15} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </aside>
          </div>
        </div>

      </section>

      {isV2 ? (
        <>
          <section className="project-impact" aria-labelledby="impact-title">
            <header className="v2-section-heading" data-reveal>
              <p className="kicker">PROJECT IMPACT</p>
              <h2 id="impact-title">从界面走向结果</h2>
              <p>不虚构数字，用可追踪的设计动作说明项目价值。</p>
            </header>
            <div className="impact-grid" data-reveal>
              {impactItems.map((item) => (
                <article key={item.index}>
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-experience" id="about" aria-labelledby="about-title">
            <div className="about-profile" data-reveal>
              <p className="kicker">ABOUT / RESUME</p>
              <h2 id="about-title">关于我</h2>
              <p className="about-lead">
                我关注复杂产品如何被理解、被使用，也关注视觉语言如何帮助团队建立一致的判断。
                从需求梳理到交付落地，我希望设计既有清晰结构，也保留恰到好处的表现力。
              </p>
              <dl className="about-facts">
                <div><dt>专注方向</dt><dd>B 端产品 · 数据体验 · 视觉系统</dd></div>
                <div><dt>设计原则</dt><dd>清晰优先 · 证据驱动 · 克制表达</dd></div>
                <div><dt>协作方式</dt><dd>调研分析 · 原型验证 · 设计交付</dd></div>
              </dl>
            </div>

            <div className="resume-panel" data-reveal>
              <a
                className="resume-card"
                href={sitePath("/assets/resume/xia-ui-ux-designer-resume.pdf")}
                target="_blank"
                rel="noreferrer"
                aria-label="在新标签页查看 XIA 的 PDF 简历"
              >
                <span className="resume-card-index">RESUME / PDF</span>
                <span className="resume-document" aria-hidden="true">
                  <FilePdf size={38} weight="light" />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="resume-card-copy">
                  <small>完整履历与能力概览</small>
                  <strong>查看我的简历</strong>
                  <span>工作经历、专业技能与代表项目集中整理于一份 PDF 文件中。</span>
                </span>
                <span className="resume-card-action">
                  在线查看
                  <ArrowSquareOut size={18} weight="light" aria-hidden="true" />
                </span>
                <span className="resume-card-meta">PDF · 1 PAGE · 中文</span>
              </a>
            </div>
          </section>

          <section className="work-process" aria-labelledby="process-title">
            <header className="v2-section-heading" data-reveal>
              <p className="kicker">HOW I WORK</p>
              <h2 id="process-title">我的工作方式</h2>
              <p>从问题出发，用验证和协作把体验推进到真实产品。</p>
            </header>
            <ol className="process-line" data-reveal>
              {processItems.map((item) => (
                <li key={item.index}>
                  <span>{item.index}</span>
                  <i aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="ai-collaboration" id="ai-collaboration" aria-labelledby="ai-title">
            <header className="v2-section-heading" data-reveal>
              <p className="kicker">AI × DESIGN SYSTEM</p>
              <h2 id="ai-title">让 AI 成为设计协作者</h2>
              <p>把整理、生成与检查交给 AI，把目标定义、体验取舍和审美判断留给设计师。</p>
            </header>

            <div className="ai-system-feature" data-reveal>
              <a
                className="ai-figma-preview"
                href={figmaDesignSystemUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="在 Figma 中查看 AI 辅助生成的设计系统"
              >
                <span className="ai-preview-label">
                  <FigmaLogo size={18} weight="fill" aria-hidden="true" />
                  FIGMA RESOURCE
                </span>
                <span className="ai-preview-action">
                  查看文件
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </span>
                <span className="ai-board-canvas" aria-hidden="true">
                  {[
                    "颜色基础",
                    "语义 Token",
                    "品牌色板",
                    "渐变样式",
                    "深色模式",
                    "可访问性",
                  ].map((title, index) => (
                    <span className={`ai-board-thumb ai-board-thumb-${index + 1}`} key={title}>
                      <Image
                        src={sitePath("/assets/portfolio/ai-design-system/figma-design-system-overview.png")}
                        alt=""
                        width={433}
                        height={1600}
                        sizes="(max-width: 900px) 44vw, 24vw"
                      />
                      <span>{title}</span>
                    </span>
                  ))}
                </span>
              </a>

              <div className="ai-system-copy">
                <div className="ai-system-number">01 <span>/ AI CASE</span></div>
                <p className="ai-system-type">AI ASSISTED · DESIGN SYSTEM</p>
                <h3>设计规范与组件库</h3>
                <p className="ai-system-summary">
                  从零散页面中识别视觉规则，辅助生成颜色体系、语义 Token、组件状态与规范说明，
                  再经过人工校准，沉淀为可复用的 Figma 设计资源。
                </p>

                <ul className="ai-system-tags" aria-label="设计系统包含内容">
                  <li>Color System</li>
                  <li>Design Token</li>
                  <li>Component States</li>
                  <li>Usage Guidelines</li>
                </ul>

                <dl className="ai-system-roles">
                  <div>
                    <dt>AI 参与</dt>
                    <dd>模式识别 · 规范初稿 · 状态补全 · 一致性检查</dd>
                  </div>
                  <div>
                    <dt>设计师负责</dt>
                    <dd>规则命名 · 视觉校准 · 使用边界 · 最终发布</dd>
                  </div>
                </dl>

                <a className="ai-figma-link" href={figmaDesignSystemUrl} target="_blank" rel="noreferrer">
                  在 Figma 中查看
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </div>

            <ol className="ai-workflow-grid" data-reveal aria-label="AI 辅助设计系统流程">
              {aiWorkflowItems.map((item) => (
                <li key={item.index}>
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </>
      ) : null}

      <section className="capability-strip" aria-label="设计能力">
        <p>{isV2 ? "能力与方法" : "能力与经验"}</p>
        <div>
          {capabilities.map(({ label, icon: Icon }) => (
            <span key={label}>
              <Icon size={22} weight="light" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {!isV2 ? (
        <section className="beyond" id="playground">
          <div className="beyond-copy" data-reveal>
            <p className="kicker">BEYOND THE SCREEN</p>
            <h2>屏幕之外</h2>
            <p>摄影 · 绘画 · 视觉笔记</p>
            <a href="#gallery">
              浏览更多
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <div className="life-gallery" id="gallery" data-reveal>
            <Image
              src={sitePath("/assets/portfolio/life-gallery.png")}
              alt="山峰、静物、街头摄影、建筑绘画与植物摄影作品合集"
              width={731}
              height={208}
              sizes="(max-width: 760px) 100vw, 72vw"
            />
          </div>
        </section>
      ) : null}

      <footer id="contact">
        <FooterParticles pauseWhenHidden={isV2} />
        <div className="footer-content" data-reveal>
          <p className="kicker">HAVE A PROJECT IN MIND?</p>
          <h2>一起创造有意义的体验</h2>
          {isV2 ? <p className="footer-availability">开放新的合作与设计机会</p> : null}
          <MagneticLink href="mailto:lingxiao0904@qq.com" className="contact-link">
            联系我
          </MagneticLink>
          {isV2 ? (
            <div className="footer-direct-contact">
              <a href="mailto:lingxiao0904@qq.com">lingxiao0904@qq.com</a>
              <a
                href={sitePath("/assets/resume/xia-ui-ux-designer-resume.pdf")}
                target="_blank"
                rel="noreferrer"
              >
                查看 PDF 简历
              </a>
            </div>
          ) : null}
          <div className="social-links">
            <a href="mailto:lingxiao0904@qq.com" aria-label="发送邮件">
              <EnvelopeSimple size={21} weight="light" />
            </a>
            <a href="#top" aria-label="LinkedIn">
              <LinkedinLogo size={21} weight="light" />
            </a>
            <a href={isV2 ? sitePath("/daily#photography") : "#playground"} aria-label="摄影">
              <Camera size={21} weight="light" />
            </a>
            <a href={isV2 ? sitePath("/daily#visual-practice") : "#playground"} aria-label="视觉练习">
              <PenNib size={21} weight="light" />
            </a>
          </div>
        </div>
        <div className="footer-meta">
          <span>© 2026 XIA</span>
          <a href="#top">返回顶部</a>
        </div>
      </footer>
    </main>
  );
}
