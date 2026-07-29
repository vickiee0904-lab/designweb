"use client";

import { useEffect, useMemo, useState } from "react";

const projects = [
  {
    no: "01",
    title: "MORI 森野",
    type: "品牌体验",
    year: "2025",
    color: "#ff6b45",
    desc: "为城市轻食品牌建立从空间到数字触点的统一语言。",
    tags: ["策略", "品牌", "空间"],
  },
  {
    no: "02",
    title: "NEBULA OS",
    type: "产品设计",
    year: "2024",
    color: "#6c7cff",
    desc: "把复杂的 AI 工作流，变成安静、清晰且值得信任的日常工具。",
    tags: ["UX", "交互", "系统"],
  },
  {
    no: "03",
    title: "流动档案",
    type: "数字艺术",
    year: "2024",
    color: "#a8ff78",
    desc: "一场由声音和城市记忆共同驱动的生成式线上展览。",
    tags: ["创意编程", "声音", "Web"],
  },
];

const experience = [
  ["2023 — NOW", "独立设计师 / 上海", "品牌、数字产品与互动体验"],
  ["2020 — 2023", "Studio Parallel / 设计负责人", "带领 6 人团队完成 20+ 项目"],
  ["2018 — 2020", "Nova Lab / 交互设计师", "探索新媒介与未来界面"],
];

function MagneticButton({
  children,
  href,
  tone = "light",
}: {
  children: React.ReactNode;
  href: string;
  tone?: "light" | "dark";
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return (
    <a
      href={href}
      className={`magnetic-button ${tone}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({
          x: (event.clientX - rect.left - rect.width / 2) * 0.15,
          y: (event.clientY - rect.top - rect.height / 2) * 0.15,
        });
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      });
      setCursor((prev) => ({ ...prev, x: event.clientX, y: event.clientY }));
    };
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? window.scrollY / height : 0);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const cursorHandlers = {
    onMouseEnter: () => setCursor((prev) => ({ ...prev, active: true })),
    onMouseLeave: () => setCursor((prev) => ({ ...prev, active: false })),
  };

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div
        className={`cursor ${cursor.active ? "active" : ""}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <nav className="nav">
        <a className="logo" href="#top" aria-label="Linn 主页">
          LINN<span>®</span>
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>项目</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>关于</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>联系</a>
        </div>
        <button
          className="menu-button"
          aria-label="切换导航"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? "关闭" : "菜单"}
        </button>
        <span className="availability"><i /> 可接受新项目</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow reveal">LINN / 多学科设计师 / SHANGHAI</p>
          <h1 className="hero-title">
            <span className="line"><span>让想法</span></span>
            <span className="line italic"><span>被感知，</span></span>
            <span className="line accent"><span>让体验发生。</span></span>
          </h1>
          <div className="hero-bottom reveal">
            <p>
              我是林，一名游走在品牌、产品与新媒介之间的设计师。
              我把复杂问题，翻译成简单但不无聊的体验。
            </p>
            <MagneticButton href="#work">查看精选项目</MagneticButton>
          </div>
        </div>

        <div
          className="avatar-stage"
          style={{
            "--mx": `${mouse.x * 22}px`,
            "--my": `${mouse.y * 18}px`,
          } as React.CSSProperties}
          {...cursorHandlers}
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="avatar-card">
            <div className="avatar-glow" />
            <div className="avatar" aria-label="虚拟设计师 Linn 的动态数字分身">
              <div className="hair hair-back" />
              <div className="neck" />
              <div className="body">
                <div className="jacket-line" />
                <span className="badge">L/01</span>
              </div>
              <div className="face">
                <div className="ear left" />
                <div className="ear right"><i /></div>
                <div className="hair hair-front" />
                <div className="brow left" />
                <div className="brow right" />
                <div className="eye left"><i /></div>
                <div className="eye right"><i /></div>
                <div className="nose" />
                <div className="mouth" />
              </div>
            </div>
            <div className="scan-line" />
            <div className="avatar-meta top">
              <span>VIRTUAL IDENTITY</span><b>ONLINE</b>
            </div>
            <div className="avatar-meta bottom">
              <span>LINN.01</span><b>31.2304° N</b>
            </div>
          </div>
          <p className="drag-note">移动光标，与 LINN 相遇</p>
        </div>
        <div className="hero-index">01 — 05</div>
      </section>

      <section className="marquee" aria-label="设计服务">
        <div>
          品牌策略 <i>✦</i> 数字产品 <i>✦</i> 互动体验 <i>✦</i> 创意技术 <i>✦</i>
          品牌策略 <i>✦</i> 数字产品 <i>✦</i> 互动体验 <i>✦</i> 创意技术 <i>✦</i>
        </div>
      </section>

      <section className="projects" id="work">
        <header className="section-head">
          <div>
            <span className="section-no">02</span>
            <p className="eyebrow">SELECTED WORK / 2023—2025</p>
          </div>
          <h2>精选项目 <sup>03</sup></h2>
          <p>每个项目，都是一次<br />从“为什么”到“哇”的旅程。</p>
        </header>

        <div className="project-layout">
          <div className="project-list">
            {projects.map((project, index) => (
              <button
                key={project.title}
                className={`project-row ${activeProject === index ? "active" : ""}`}
                onMouseEnter={() => setActiveProject(index)}
                onFocus={() => setActiveProject(index)}
                onClick={() => setActiveProject(index)}
              >
                <span>{project.no}</span>
                <strong>{project.title}</strong>
                <em>{project.type}</em>
                <small>{project.year}</small>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <div
            className="project-preview"
            style={{ "--project-color": projects[activeProject].color } as React.CSSProperties}
            {...cursorHandlers}
          >
            <div className="preview-grid" />
            <div className="preview-disc">
              <span>{projects[activeProject].no}</span>
            </div>
            <div className="preview-window">
              <span>CASE STUDY</span>
              <strong>{projects[activeProject].title}</strong>
              <div className="mini-lines"><i /><i /><i /></div>
            </div>
            <div className="project-info">
              <p>{projects[activeProject].desc}</p>
              <div>{projects[activeProject].tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-intro">
          <span className="section-no">03</span>
          <p className="eyebrow">ABOUT / METHOD</p>
        </div>
        <div className="about-statement">
          <h2>
            好设计不是装饰，<br />
            它是<span>清晰</span>、<span>共情</span>，<br />
            还有一点点<span>意外</span>。
          </h2>
          <div className="about-aside">
            <div className="mini-avatar"><i /><b /></div>
            <p>8 年设计经验<br />合作项目遍布 6 个城市</p>
          </div>
        </div>
        <div className="principles">
          <article>
            <span>01</span><h3>问对问题</h3>
            <p>在画第一个框之前，先找到真正值得解决的问题。</p>
          </article>
          <article>
            <span>02</span><h3>系统地想</h3>
            <p>让每个细节都有理由，也让它们共同组成更大的秩序。</p>
          </article>
          <article>
            <span>03</span><h3>大胆地试</h3>
            <p>原型不是终点，而是让想法尽快与真实世界碰面的方式。</p>
          </article>
        </div>
      </section>

      <section className="experience">
        <header className="section-head compact">
          <div><span className="section-no">04</span><p className="eyebrow">EXPERIENCE</p></div>
          <h2>经历</h2>
        </header>
        <div className="timeline">
          {experience.map(([date, role, detail], index) => (
            <div className="timeline-row" key={date}>
              <span>{date}</span>
              <strong>{role}</strong>
              <p>{detail}</p>
              <i>{String(index + 1).padStart(2, "0")}</i>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact">
        <div className="footer-status"><i /> HAVE A PROJECT IN MIND?</div>
        <h2>一起做点<br /><span>有意思的。</span></h2>
        <div className="footer-row">
          <MagneticButton href="mailto:hello@linn.design" tone="dark">hello@linn.design</MagneticButton>
          <div className="socials">
            <a href="#top">小红书 ↗</a>
            <a href="#top">Behance ↗</a>
            <a href="#top">LinkedIn ↗</a>
          </div>
        </div>
        <div className="copyright">
          <span>© {year} LINN STUDIO</span>
          <span>DESIGNED WITH CURIOSITY &amp; COFFEE</span>
          <a href="#top">回到顶部 ↑</a>
        </div>
      </footer>
    </main>
  );
}
