"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Camera,
  EnvelopeSimple,
  FigmaLogo,
  LinkedinLogo,
  MouseSimple,
  PenNib,
  Shapes,
  Strategy,
  UserFocus,
  X,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import CharacterHero from "./components/CharacterHero";
import { researchDataPlatform } from "./data/projects";

const capabilities = [
  { label: "产品策略", icon: Strategy },
  { label: "用户体验", icon: UserFocus },
  { label: "视觉系统", icon: Shapes },
  { label: "原型设计", icon: FigmaLogo },
  { label: "AI 协作", icon: Brain },
];

const projectCards = [
  {
    src: "/assets/portfolio/research-data-platform-card-reference.png",
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
    src: "/assets/portfolio/project-card-sleep-editorial-v2.png",
    width: 900,
    height: 1125,
    cardClass: "",
    index: "02",
    type: "MOBILE APP",
    title: "AI 睡眠伴侣",
    summary: "将睡眠数据、建议和情绪反馈转译成平静可信的日常体验。",
    href: "/work/ai-sleep-companion",
    meta: [
      { label: "ROLE", value: "体验设计 · 视觉系统" },
      { label: "YEAR", value: "2025" },
      { label: "OUTCOME", value: "让复杂的睡眠数据成为每天都能理解和执行的温和建议。" },
    ],
  },
  {
    src: "/assets/portfolio/project-card-data-editorial-v2.png",
    width: 900,
    height: 1125,
    cardClass: "",
    index: "03",
    type: "DATA PRODUCT",
    title: "数据运营驾驶舱",
    summary: "帮助运营团队快速发现异常、理解趋势并采取行动。",
    href: null,
    meta: [
      { label: "ROLE", value: "数据体验 · 原型设计" },
      { label: "YEAR", value: "2024" },
      { label: "OUTCOME", value: "把分散的指标与告警组织成面向决策的实时工作台。" },
    ],
  },
];

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCaseOpen(false);
    };

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
    window.addEventListener("keydown", onKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <main ref={rootRef}>
      <nav className="site-nav" aria-label="主导航">
        <a className="identity" href="#top" aria-label="LINN 首页">
          <strong>LINN</strong>
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
          <a href="#playground" onClick={() => setMenuOpen(false)}>日常</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>联系</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy" id="about">
          <p className="kicker hero-kicker">产品思维 · 视觉表达 · AI 协作</p>
          <h1>
            设计清晰、好用且
            <span>富有表现力的数字体验。</span>
          </h1>
          <p className="hero-description">
            我是 LINN，一名专注产品体验与视觉系统的 UI 设计师。
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
                    offset === 0 ? "is-selected" : offset === 1 ? "is-back-far" : "is-back-near";

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
              <h3 className={projectCards[activeCard].index === researchDataPlatform.index ? "is-long" : undefined}>
                {projectCards[activeCard].title}
              </h3>
              <p className="project-info-summary">{projectCards[activeCard].summary}</p>

              <dl>
                {projectCards[activeCard].meta.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>

              {projectCards[activeCard].href ? (
                <Link className="project-case-link" href={projectCards[activeCard].href}>
                  查看完整案例
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </Link>
              ) : (
                <button className="project-case-link" type="button" onClick={() => setCaseOpen(true)}>
                  查看完整案例
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </button>
              )}

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

        {caseOpen && (
          <div
            className="case-dialog-backdrop"
            role="presentation"
            onClick={() => setCaseOpen(false)}
          >
            <section
              className="case-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-dialog-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div>
                <p className="kicker">FEATURED CASE STUDIES</p>
                <h3 id="case-dialog-title">三个项目，三种复杂问题</h3>
              </div>
              <button
                type="button"
                className="dialog-close"
                aria-label="关闭项目介绍"
                onClick={() => setCaseOpen(false)}
              >
                <X size={20} />
              </button>
              <div className="case-list">
                {projectCards.map((project) => (
                  <article key={project.index}>
                    <span>{project.index} / {project.type}</span>
                    <strong>{project.title}</strong>
                    <p>{project.summary}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}
      </section>

      <section className="capability-strip" aria-label="设计能力">
        <p>能力与经验</p>
        <div>
          {capabilities.map(({ label, icon: Icon }) => (
            <span key={label}>
              <Icon size={22} weight="light" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </section>

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
            src="/assets/portfolio/life-gallery.png"
            alt="山峰、静物、街头摄影、建筑绘画与植物摄影作品合集"
            width={731}
            height={208}
            sizes="(max-width: 760px) 100vw, 72vw"
          />
        </div>
      </section>

      <footer id="contact">
        <div className="footer-ribbon" aria-hidden="true">
          <Image
            src="/assets/portfolio/luminous-ribbon-clean.png"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <div className="footer-content" data-reveal>
          <p className="kicker">HAVE A PROJECT IN MIND?</p>
          <h2>一起创造有意义的体验</h2>
          <MagneticLink href="mailto:hello@linn.design" className="contact-link">
            联系我
          </MagneticLink>
          <div className="social-links">
            <a href="mailto:hello@linn.design" aria-label="发送邮件">
              <EnvelopeSimple size={21} weight="light" />
            </a>
            <a href="#top" aria-label="LinkedIn">
              <LinkedinLogo size={21} weight="light" />
            </a>
            <a href="#playground" aria-label="摄影与绘画">
              <Camera size={21} weight="light" />
            </a>
            <a href="#playground" aria-label="视觉笔记">
              <PenNib size={21} weight="light" />
            </a>
          </div>
        </div>
        <div className="footer-meta">
          <span>© 2026 LINN</span>
          <a href="#top">返回顶部</a>
        </div>
      </footer>
    </main>
  );
}
