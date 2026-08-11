import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  PenNib,
} from "@phosphor-icons/react/dist/ssr";
import { sitePath } from "../lib/site-path";

const photographs = [
  {
    src: sitePath("/assets/portfolio/daily/mountain.png"),
    width: 276,
    height: 342,
    title: "雪线之上",
    meta: "MOUNTAIN / 2024",
    alt: "云雾中的雪山",
  },
  {
    src: sitePath("/assets/portfolio/daily/still-life.png"),
    width: 276,
    height: 286,
    title: "静物与时间",
    meta: "STILL LIFE / 2024",
    alt: "花枝、花瓶与圆形石膏静物",
  },
  {
    src: sitePath("/assets/portfolio/daily/street-light.png"),
    width: 257,
    height: 342,
    title: "一束光经过",
    meta: "STREET / 2023",
    alt: "窄巷中穿过建筑的一束阳光",
  },
  {
    src: sitePath("/assets/portfolio/daily/city-sketch.png"),
    width: 250,
    height: 300,
    title: "城市线稿",
    meta: "ARCHITECTURE / 2023",
    alt: "欧式街道与建筑的浅色线稿",
  },
  {
    src: sitePath("/assets/portfolio/daily/branch-shadow.png"),
    width: 304,
    height: 342,
    title: "午后的影子",
    meta: "NATURE / 2024",
    alt: "白墙上的枝叶与柔和影子",
  },
] as const;

export default function DailyPage() {
  return (
    <main className="daily-page journal-page" id="top">
      <aside className="journal-sidebar">
        <Link className="journal-identity" href="/" aria-label="返回 XIA 首页">
          <strong>XIA</strong>
          <span>UI / UX DESIGNER</span>
        </Link>

        <div className="journal-sidebar-copy">
          <p className="kicker">DAILY ARCHIVE / 生活切片</p>
          <h1>日常</h1>
          <p>屏幕之外的观察、记录与视觉实验。</p>
        </div>

        <nav className="journal-section-nav" aria-label="日常内容目录">
          <a href="#photography"><span>01</span>摄影</a>
          <a href="#visual-practice"><span>02</span>视觉练习</a>
        </nav>

        <Link className="journal-back" href="/">
          <ArrowLeft size={15} weight="bold" aria-hidden="true" />
          返回首页
        </Link>
      </aside>

      <div className="journal-content">
        <section className="journal-section journal-photography" id="photography" aria-labelledby="photography-title">
          <header className="journal-section-heading">
            <div>
              <span>01</span>
              <Camera size={20} weight="light" aria-hidden="true" />
            </div>
            <div>
              <p className="kicker">PHOTOGRAPHY</p>
              <h2 id="photography-title">摄影</h2>
            </div>
            <p>记录旅途中、街道上与自然里的光线、秩序和偶然瞬间。</p>
          </header>

          <div className="photo-masonry" aria-label="摄影作品">
            {photographs.map((photo, index) => (
              <figure className="photo-card" key={photo.src}>
                <div className="photo-card-image">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 45vw, 28vw"
                    priority={index < 2}
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <figcaption>
                  <strong>{photo.title}</strong>
                  <span>{photo.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="journal-section journal-practice" id="visual-practice" aria-labelledby="practice-title">
          <header className="journal-section-heading">
            <div>
              <span>02</span>
              <PenNib size={20} weight="light" aria-hidden="true" />
            </div>
            <div>
              <p className="kicker">VISUAL PRACTICE</p>
              <h2 id="practice-title">视觉练习</h2>
            </div>
            <p>通过字体、色彩和形式实验，保持对视觉语言的敏感度。</p>
          </header>

          <div className="journal-practice-grid" aria-label="视觉练习预览">
            <article>
              <span>TYPE STUDY</span>
              <strong>Aa</strong>
              <p>字体与层级</p>
              <ArrowUpRight size={17} aria-hidden="true" />
            </article>
            <article>
              <span>COLOR NOTE</span>
              <i aria-hidden="true" />
              <p>色彩与情绪</p>
              <ArrowUpRight size={17} aria-hidden="true" />
            </article>
            <article>
              <span>FORM TEST</span>
              <b aria-hidden="true" />
              <p>构图与形式</p>
              <ArrowUpRight size={17} aria-hidden="true" />
            </article>
          </div>
          <p className="journal-updating">更多视觉练习正在整理中 / MORE SOON</p>
        </section>

        <footer className="journal-footer">
          <span>© 2026 XIA</span>
          <a href="#top">返回顶部 <ArrowUpRight size={14} aria-hidden="true" /></a>
        </footer>
      </div>
    </main>
  );
}
