import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "简历 — XIA UI/UX Designer",
  description: "XIA 的工作经历、设计能力与代表项目。",
};

const experiences = [
  {
    period: "2021.12 — 2025.08",
    company: "南京斑马鱼数字智能科技有限公司",
    role: "UI 设计",
    items: [
      "负责 B 端数据管理平台及 C 端产品的 UI 设计与体验优化",
      "参与设计规范搭建与组件沉淀，提升界面一致性与设计效率",
      "负责企业官网视觉设计及品牌 VI 体系建设",
      "支持营销活动、品牌宣传及日常推广物料设计",
    ],
  },
  {
    period: "2019.04 — 2020.06",
    company: "中通服网盈科技有限公司",
    role: "电商设计",
    items: [
      "负责天猫、京东等电商平台店铺视觉装修与首页布局设计",
      "完成商品主图、详情页、活动专题页等视觉设计",
      "支持店铺日常运营及大促活动，输出宣传海报与营销页面",
    ],
  },
  {
    period: "2018.03 — 2019.02",
    company: "南京灵衍信息科技有限公司",
    role: "UI 设计",
    items: [
      "负责生活服务类小程序及 B 端后台界面设计与迭代优化",
      "参与需求梳理、设计走查、视觉还原校验与功能体验测试",
      "协助搭建移动端 UI 规范，支持品牌运营视觉输出",
    ],
  },
] as const;

const capabilities = [
  {
    index: "01",
    title: "产品与体验",
    content: "产品策略、信息架构、交互原型、复杂流程梳理与体验验证",
  },
  {
    index: "02",
    title: "视觉与系统",
    content: "视觉设计、数据体验、跨端界面、设计系统与组件规范",
  },
  {
    index: "03",
    title: "协作与工具",
    content: "Figma、Photoshop、Illustrator、AI 辅助设计与研发协作",
  },
] as const;

const selectedWork = [
  {
    index: "01",
    title: "科研数据管理平台",
    type: "B2B SYSTEM",
    description: "面向科研实验室场景，重构项目、实验、样本与库存的连续任务体验。",
    href: "/work/research-data-platform",
  },
  {
    index: "02",
    title: "多云电商",
    type: "MOBILE COMMERCE",
    description: "统一商品发现、邻里拼团与订单履约的移动端购物体验。",
    href: "/work/ai-sleep-companion",
  },
  {
    index: "03",
    title: "实验室资产与安全监控中心",
    type: "DATA VISUALIZATION",
    description: "将设备、安全与巡检信号组织为可快速识别异常的数据视图。",
    href: "/work/data-operations-dashboard",
  },
] as const;

export default function ResumePage() {
  return (
    <main className="resume-page" id="top">
      <nav className="resume-nav" aria-label="简历页导航">
        <Link className="identity" href="/" aria-label="XIA 首页">
          <strong>XIA</strong>
          <span>UI / UX DESIGNER</span>
        </Link>
        <Link className="resume-back" href="/#about">
          <ArrowLeft size={16} weight="bold" aria-hidden="true" />
          返回首页
        </Link>
      </nav>

      <header className="resume-hero">
        <div className="resume-hero-index" aria-hidden="true">R / 01</div>
        <div className="resume-hero-copy">
          <p className="kicker">PROFILE / RESUME / 2026</p>
          <h1>清晰地组织<br />复杂体验。</h1>
          <p>
            专注产品体验与视觉系统的 UI 设计师，擅长把复杂业务、数据与任务流程，
            转化为清晰、可信且可持续迭代的数字产品。
          </p>
        </div>
        <div className="resume-hero-contact">
          <span>CONTACT</span>
          <a href="mailto:lingxiao0904@qq.com">
            <EnvelopeSimple size={18} weight="light" aria-hidden="true" />
            lingxiao0904@qq.com
          </a>
          <div>
            <span>FOCUS</span>
            <p>B 端产品 · 数据体验 · 视觉系统 · 跨端体验</p>
          </div>
        </div>
      </header>

      <section className="resume-experience" aria-labelledby="experience-title">
        <header className="resume-section-heading">
          <p className="kicker">01 / EXPERIENCE</p>
          <h2 id="experience-title">工作经历</h2>
          <p>从商业视觉到复杂产品设计，逐步建立完整的体验设计与系统化交付能力。</p>
        </header>

        <div className="resume-timeline">
          {experiences.map((experience, index) => (
            <article className="resume-job" key={experience.company}>
              <div className="resume-job-period">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time>{experience.period}</time>
              </div>
              <div className="resume-job-content">
                <div className="resume-job-title">
                  <h3>{experience.company}</h3>
                  <span>{experience.role}</span>
                </div>
                <ul>
                  {experience.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-capabilities" aria-labelledby="capabilities-title">
        <header className="resume-section-heading resume-section-heading-light">
          <p className="kicker">02 / CAPABILITIES</p>
          <h2 id="capabilities-title">能力与工具</h2>
          <p>兼顾结构、视觉和落地，让设计在真实业务与团队协作中持续生效。</p>
        </header>
        <div className="resume-capability-grid">
          {capabilities.map((item) => (
            <article key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-work" aria-labelledby="resume-work-title">
        <header className="resume-section-heading">
          <p className="kicker">03 / SELECTED WORK</p>
          <h2 id="resume-work-title">代表项目</h2>
          <p>围绕复杂系统、移动商业与数据可视化形成的代表性设计实践。</p>
        </header>
        <div className="resume-work-list">
          {selectedWork.map((project) => (
            <Link href={project.href} key={project.index}>
              <span className="resume-work-index">{project.index}</span>
              <div>
                <small>{project.type}</small>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <footer className="resume-footer">
        <div>
          <p className="kicker">LET&apos;S WORK TOGETHER</p>
          <h2>期待与你一起<br />创造有意义的体验。</h2>
        </div>
        <a href="mailto:lingxiao0904@qq.com">
          联系我
          <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </a>
        <span>© 2026 XIA</span>
      </footer>
    </main>
  );
}
