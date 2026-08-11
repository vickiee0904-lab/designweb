"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowsOut, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { researchDataPlatform } from "../../data/projects";
import { sitePath } from "../../lib/site-path";

const chapters = [
  { id: "overview", label: "项目概览", pages: [1] },
  { id: "background", label: "背景与调研", pages: [2, 3] },
  { id: "strategy", label: "设计策略", pages: [4, 5, 6] },
  { id: "workflow", label: "流程优化", pages: [7, 8, 9] },
  { id: "views", label: "核心界面", pages: [10, 11, 12] },
];

const imagePath = (page: number) =>
  sitePath(`/assets/portfolio/research-data-platform/page-${String(page).padStart(2, "0")}.webp`);

export default function ResearchDataPlatformPage() {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [activePage, setActivePage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [previewPage, setPreviewPage] = useState<number | null>(null);
  const [anchorCollapsed, setAnchorCollapsed] = useState(false);

  useEffect(() => {
    const updateReadingState = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
      const anchorLine = window.innerWidth <= 900 ? 74 : 88;

      const reachedChapter = chapters.reduce((current, chapter) => {
        const element = document.getElementById(chapter.id);
        return element && element.getBoundingClientRect().top <= anchorLine + 1
          ? chapter
          : current;
      }, chapters[0]);
      setActiveChapter(reachedChapter.id);

      const reachedPage = [...document.querySelectorAll<HTMLElement>("[data-page]")]
        .reduce((current, element) => (
          element.getBoundingClientRect().top <= anchorLine + 1
            ? Number(element.dataset.page)
            : current
        ), 1);
      setActivePage(reachedPage);
    };

    updateReadingState();
    window.addEventListener("scroll", updateReadingState, { passive: true });
    window.addEventListener("resize", updateReadingState);

    return () => {
      window.removeEventListener("scroll", updateReadingState);
      window.removeEventListener("resize", updateReadingState);
    };
  }, []);

  useEffect(() => {
    if (previewPage === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewPage(null);
      if (event.key === "ArrowRight") setPreviewPage((page) => Math.min(12, (page ?? 1) + 1));
      if (event.key === "ArrowLeft") setPreviewPage((page) => Math.max(1, (page ?? 1) - 1));
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewPage]);

  return (
    <main className="case-page-shell">
      <nav className="case-page-nav" aria-label="案例页导航">
        <Link className="identity" href="/" aria-label="XIA 首页">
          <strong>XIA</strong>
          <span>UI / UX DESIGNER</span>
        </Link>

        <Link className="case-page-back" href="/#work">
          <ArrowLeft size={16} weight="bold" aria-hidden="true" />
          返回作品
        </Link>
      </nav>

      <div className="case-reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>

      <div className={`case-layout ${anchorCollapsed ? "is-anchor-collapsed" : ""}`}>
        <aside className={`case-anchor-panel ${anchorCollapsed ? "is-collapsed" : ""}`} aria-label="项目章节导航">
          <div className="case-anchor-head">
            <p>PROJECT INDEX</p>
            <button
              type="button"
              aria-controls="case-anchor-content"
              aria-expanded={!anchorCollapsed}
              aria-label={anchorCollapsed ? "展开项目目录" : "收起项目目录"}
              onClick={() => setAnchorCollapsed((value) => !value)}
            >
              {anchorCollapsed ? (
                <CaretRight size={17} weight="bold" aria-hidden="true" />
              ) : (
                <CaretLeft size={17} weight="bold" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="case-anchor-content" id="case-anchor-content" aria-hidden={anchorCollapsed}>
            <h2 className="case-anchor-title">{researchDataPlatform.title}</h2>
            <nav>
              {chapters.map((chapter, index) => (
                <a
                  className={activeChapter === chapter.id ? "is-active" : ""}
                  href={`#${chapter.id}`}
                  key={chapter.id}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {chapter.label}
                </a>
              ))}
            </nav>
            <div className="case-anchor-status">
              <span>当前页面</span>
              <strong>{String(activePage).padStart(2, "0")} / 12</strong>
              <div aria-hidden="true">
                <i style={{ transform: `scaleX(${progress / 100})` }} />
              </div>
            </div>
          </div>
        </aside>

        <div className="case-project-content">
          <header className="case-hero" id="top">
            <div className="case-hero-index">{researchDataPlatform.index} / {researchDataPlatform.type}</div>
            <h1>{researchDataPlatform.title}</h1>
            <p className="case-hero-en">{researchDataPlatform.titleEn}</p>
            <p className="case-hero-summary">
              {researchDataPlatform.summary}
            </p>

            <dl className="case-hero-meta">
              <div>
                <dt>制作时间</dt>
                <dd>{researchDataPlatform.period}</dd>
              </div>
              <div>
                <dt>项目角色</dt>
                <dd>{researchDataPlatform.role}</dd>
              </div>
              <div>
                <dt>项目类型</dt>
                <dd>{researchDataPlatform.projectType}</dd>
              </div>
            </dl>
          </header>

          <article className="case-gallery">
            {chapters.map((chapter) => (
              <section className="case-gallery-chapter" id={chapter.id} key={chapter.id}>
                <header>
                  <span>{chapter.label}</span>
                  <b>{String(chapter.pages[0]).padStart(2, "0")}—{String(chapter.pages.at(-1)).padStart(2, "0")}</b>
                </header>

                {chapter.pages.map((page) => (
                  <figure className="case-gallery-page" data-page={page} key={page}>
                    <button
                      type="button"
                      onClick={() => setPreviewPage(page)}
                      aria-label={`放大查看作品集第 ${page} 页`}
                    >
                      <Image
                        src={imagePath(page)}
                        alt={`科研数据管理平台作品集第 ${page} 页`}
                        width={3840}
                        height={2160}
                        priority={page === 1}
                        sizes="(max-width: 900px) 100vw, 84vw"
                      />
                      <span className="case-page-zoom">
                        <ArrowsOut size={17} weight="bold" aria-hidden="true" />
                        放大查看
                      </span>
                    </button>
                    <figcaption>
                      <span>{String(page).padStart(2, "0")}</span>
                      <span>PORTFOLIO PAGE</span>
                    </figcaption>
                  </figure>
                ))}
              </section>
            ))}
          </article>

          <footer className="case-page-footer">
            <p>END OF PROJECT / 12 PAGES</p>
            <Link href="/#work">
              <ArrowLeft size={16} weight="bold" aria-hidden="true" />
              返回精选作品
            </Link>
          </footer>
        </div>
      </div>

      {previewPage !== null && (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label="作品集大图预览">
          <button className="case-lightbox-close" type="button" onClick={() => setPreviewPage(null)} aria-label="关闭大图">
            <X size={20} weight="bold" aria-hidden="true" />
          </button>
          <button
            className="case-lightbox-image"
            type="button"
            onClick={() => setPreviewPage(null)}
            aria-label="关闭大图"
          >
            <Image
              src={imagePath(previewPage)}
              alt={`科研数据管理平台作品集第 ${previewPage} 页大图`}
              width={3840}
              height={2160}
              sizes="100vw"
              priority
            />
          </button>
          <div className="case-lightbox-controls">
            <button type="button" disabled={previewPage === 1} onClick={() => setPreviewPage((page) => Math.max(1, (page ?? 1) - 1))}>
              上一页
            </button>
            <span>{String(previewPage).padStart(2, "0")} / 12</span>
            <button type="button" disabled={previewPage === 12} onClick={() => setPreviewPage((page) => Math.min(12, (page ?? 1) + 1))}>
              下一页
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
