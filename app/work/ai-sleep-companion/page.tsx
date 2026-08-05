import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function AiSleepCompanionPage() {
  return (
    <main className="case-page-shell">
      <nav className="case-page-nav" aria-label="AI 睡眠伴侣项目页导航">
        <Link className="identity" href="/" aria-label="LINN 首页">
          <strong>LINN</strong>
          <span>UI / UX DESIGNER</span>
        </Link>

        <Link className="case-page-back" href="/#work">
          <ArrowLeft size={16} weight="bold" aria-hidden="true" />
          返回作品
        </Link>
      </nav>

      <div className="case-page-empty" aria-label="AI 睡眠伴侣项目内容待添加" />
    </main>
  );
}
