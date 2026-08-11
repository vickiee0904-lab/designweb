# XIA Portfolio

XIA 的个人设计网站，展示 UI/UX 项目、设计方法、AI 辅助设计实践、个人创作与联系方式。

网站采用深海军蓝视觉体系，包含磁吸极光、人物动态展示、透视项目卡片、粒子波浪与响应式交互。

## 在线访问

[https://vickiee0904-lab.github.io/designweb/](https://vickiee0904-lab.github.io/designweb/)

`main` 分支更新后，GitHub Actions 会自动构建并发布 GitHub Pages。

## Prerequisites

- Node.js `>=22.13.0`

## 本地运行

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
npm run build
```

## 主要页面

- `/`：新版个人网站首页
- `/v1`：首页历史版本
- `/daily`：摄影、绘画与视觉练习
- `/work/research-data-platform`：科研数据管理平台案例
- `/work/ai-sleep-companion`：移动端本地电商案例
- `/work/data-operations-dashboard`：数据运营监控平台案例

## 技术栈

- React 19
- Next.js / Vinext
- Vite
- TypeScript
- Phosphor Icons
- Canvas / WebGL 动效

## 常用命令

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm run lint`: run code quality checks
