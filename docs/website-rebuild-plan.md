# 个人网站重建规划（已归档）

> 这是重建前的规划稿，仅用于保留当时的思路。部分设想（简历页、Resume PDF、PDF 自动生成）已被最终方案淘汰。当前的信息架构、视觉规范与内容工作流以 `PRODUCT.md`、`DESIGN.md` 和 `README.md` 为准。

## 1. 网站定位

这不是一份放到网页上的简历，也不再是学术主页。

新网站是 Yangrui Gong 面向招聘者的职业入口，核心任务是让访客在很短时间内理解：

- 当前方向是后端工程与 AI 应用。
- 对技术问题有持续兴趣，并且愿意记录思考与实践。
- 具备研究经历，但个人身份不再由论文和实验室经历主导。
- 可以通过 GitHub、简历或邮件继续了解和联系。

首页不使用“精通若干技术”“技能百分比”之类缺乏证据的表达。写作、项目过程和技术决策才是能力证明。

## 2. 推荐技术方案

### 网站生成

- Astro，输出完全静态的 HTML。
- TypeScript，用于内容模型、构建逻辑和少量交互。
- Astro Content Collections，用 schema 校验博客、项目和履历数据。
- Markdown 或 MDX 编写文章，MDX 只在确实需要交互示例时使用。
- CSS variables 和组件级样式构建设计系统，不引入庞大的客户端 UI 框架。

选择 Astro 的原因：网站以内容为中心，默认几乎不向浏览器发送 JavaScript，适合博客、双语路由、SEO 和 GitHub Pages，也能为今后少量交互保留空间。

### 内容管理

使用 Pages CMS 作为浏览器编辑后台，并在仓库根目录维护 `.pages.yml`：

- CMS 直接修改 GitHub 仓库中的 Markdown、YAML、JSON 和图片。
- 不需要数据库，也不需要给 GitHub Pages 增加运行时后端。
- 履历字段会显示为表单，文章正文使用富文本编辑器。
- 每次保存都是 Git commit，可追踪、可回滚。
- 内容保存后触发 GitHub Actions，自动校验并发布。

CMS 菜单建议分为：

1. Profile
2. Experience
3. Projects
4. Writing (English)
5. Writing (中文)
6. Site settings
7. Media

### 部署

使用 GitHub Actions 构建并部署到 `GongYangrui.github.io`：

1. 内容提交到 `main`。
2. Action 安装依赖并运行类型、内容 schema、链接和构建检查。
3. 从同一份履历数据生成在线简历和可下载 PDF。
4. 上传 Astro 的静态产物并发布到 GitHub Pages。
5. 构建失败时保留上一版线上网站，不发布损坏版本。

## 3. 信息架构

```text
/
├── Work
├── Writing
│   └── Article
├── About
│   ├── Experience
│   ├── Education
│   └── Earlier research
├── Resume PDF
└── 中文 /zh/
    ├── 项目
    ├── 文章
    └── 关于
```

英文站使用根路径，中文站使用 `/zh/`。导航保持四个主要动作：Work、Writing、About、语言切换。Resume 作为明显但不喧宾夺主的操作入口。

### 首页

```text
┌──────────────────────────────────────────────────────────┐
│ Yangrui Gong       Work  Writing  About       EN / 中文 │
├──────────────────────────────────────────────────────────┤
│ I build backend systems and practical AI applications.  │
│ 简短说明当前关注的问题                [Read writing]     │
│                                         [View resume]    │
├──────────────────────────────────────────────────────────┤
│ Selected work        问题 / 约束 / 做法 / 学到什么       │
├──────────────────────────────────────────────────────────┤
│ Recent writing       日期 / 标题 / 摘要 / 标签            │
├──────────────────────────────────────────────────────────┤
│ Background           当前方向 + 研究经历的简短承接        │
├──────────────────────────────────────────────────────────┤
│ Contact              Email / GitHub / LinkedIn            │
└──────────────────────────────────────────────────────────┘
```

首页不放完整时间线，不罗列所有工具，不展示没有上下文的技术 Logo。即使目前缺少大型项目，也可以把真实的小型实践写成 case study，重点说明问题、权衡、实现和反思。

### Work

项目页不要求“项目必须很大”。可以包含：

- 一个后端服务或自动化工具。
- 一个真实解决问题的 AI 应用实验。
- 一次有完整技术决策记录的重构或基础设施实践。
- 维护中的开源贡献或个人工具。

每个项目统一回答五个问题：背景、约束、方案、关键决策、结果与反思。未完成项目可以标记为 Explorations，不包装成正式成果。

### Writing

文章列表按日期倒序，支持少量稳定分类，例如 Backend、AI Applications、Infrastructure、Notes。不要在文章不足时设计复杂筛选器。

文章页包含：标题、摘要、发布日期、更新时间、阅读时长、标签、正文目录、上一篇/下一篇和返回文章列表。代码块支持复制，但不增加无关动画。

### About

About 是可阅读的职业叙事，Resume 是结构化事实。About 页面解释从研究经历转向后端和 AI 应用的过程；教育、论文和早期研究放到页面后半部分，保留可信度但不抢占主线。

## 4. 内容模型

```text
src/
├── content/
│   └── writing/
│       ├── en/
│       └── zh/
├── data/
│   ├── profile.yml
│   ├── experience.yml
│   ├── education.yml
│   ├── projects.yml
│   └── site.yml
└── pages/
    ├── ...英文路由
    └── zh/...中文路由
```

履历数据采用一条记录内并列 `en` 和 `zh` 文本的方式。日期、链接、排序和技术标签只维护一次，避免两种语言的数据逐渐不一致。

博客正文分别存放，使用 `translationKey` 关联翻译。不是每篇文章都必须翻译：没有中文版本时，语言切换会明确提示，并返回对应语言的文章列表，不显示机器翻译内容。

推荐的文章字段：

- `title`
- `description`
- `publishedAt`
- `updatedAt`
- `tags`
- `draft`
- `featured`
- `translationKey`
- `cover`，可选
- `body`

## 5. 日常更新体验

### 发布博客

1. 打开 Pages CMS 并使用 GitHub 登录。
2. 进入 Writing (English) 或 Writing (中文)。
3. 点击 New，填写标题、摘要、标签并撰写正文。
4. 图片直接上传，路径自动写入文章。
5. 草稿阶段保持 `draft: true`；发布时关闭 Draft 并保存。
6. GitHub Actions 自动构建并部署。

### 更新履历

1. 在 CMS 打开 Experience、Education 或 Profile。
2. 用表单新增或修改记录，同时填写中英文描述。
3. 保存后首页、About、在线 Resume 和 PDF 自动同步。

这解决了当前 `_pages/about.md` 同时承担内容、HTML 结构和样式的问题。以后普通更新不需要修改页面代码。

## 6. 视觉方向

场景假设：招聘者在白天使用笔记本电脑快速查看候选人，同时技术同行可能在移动端阅读一篇长文章。因此采用浅色优先、内容优先的界面，深色模式可以作为系统偏好的补充，而不是默认的“开发者黑色网站”。

视觉关键词：清晰、精确、克制、有技术判断。

- 以略带冷色的浅背景和深蓝灰文字建立阅读舒适度。
- 只使用一种明确的高纯度蓝色作为链接、焦点和当前状态，不使用大面积渐变。
- 正文控制在 65 至 75 个字符宽，文章页优先保证长时间阅读。
- 英文与中文选择字形气质相近的 sans-serif 字体，代码使用独立等宽字体。
- 科技感来自排版、状态、代码和内容结构，而不是终端窗口、霓虹发光或粒子动画。
- 动效只用于导航状态、链接反馈和内容进入视口时的轻微过渡，并尊重 reduced motion。

网站的识别点不是装饰，而是“decision notes”：项目和文章列表都用一句话指出问题或关键决策，让访客快速看到思考方式。

## 7. 双语与 SEO

- `/` 为英文默认首页，`/zh/` 为中文首页。
- 每页输出正确的 `lang`、canonical 和 `hreflang`。
- 语言切换尽量跳转到同一内容的翻译；缺少翻译时给出清晰提示。
- 自动生成 sitemap、RSS 和 Open Graph 元数据。
- 中文与英文使用独立标题和摘要，避免直接拼接两种语言影响搜索结果。

## 8. 重建与迁移步骤

### Phase 0：保护现有内容

- 为当前 Jekyll 版本创建归档 tag 或分支。
- 保留原 Git 历史，不强制重写仓库历史。
- 整理现有三篇文章、图片、简历 PDF 和研究资料的迁移清单。

### Phase 1：内容骨架

- 创建 Astro 项目和 TypeScript 配置。
- 定义履历、项目和文章 schema。
- 迁移现有博客，修复图片路径和 frontmatter。
- 写好 Pages CMS 配置。

### Phase 2：页面与设计系统

- 完成英文首页、Writing、文章页、Work、About 和 Resume。
- 建立中文路由和语言切换。
- 实现响应式、键盘操作、focus 状态和 reduced motion。

### Phase 3：发布系统

- 配置 GitHub Pages workflow。
- 添加 schema、构建和链接检查。
- 从在线 Resume 生成 PDF。
- 验证 404、sitemap、RSS、canonical 和 `hreflang`。

### Phase 4：内容整理

- 重写首页英文介绍。
- 将研究经历压缩到 About 后半部分。
- 从现有经历中整理首批 2 至 3 个 case study。
- 选择有价值的旧博客迁移，测试文章可保留为 draft 或不公开。

## 9. 第一版范围

第一版应该包含：双语首页、Writing、文章详情、Work、About、在线 Resume、自动 PDF、Pages CMS 和 GitHub Pages 自动部署。

第一版不包含：评论系统、复杂站内搜索、访问者账户、花哨首页动画、技能评分、自动机器翻译和数据库。这些功能现在不会帮助招聘者更了解你，只会提高维护成本。

## 10. 完成标准

- 招聘者在首页首屏能理解职业方向并找到 Writing、Work 和 Resume。
- 履历事实只维护一次，英文、中文、网页和 PDF 同步更新。
- 新文章可以完全通过浏览器创建、保存和发布。
- 网站在禁用 JavaScript 时仍能阅读主要内容。
- 移动端、键盘操作、减少动画和基础无障碍检查通过。
- GitHub Actions 构建失败不会覆盖线上正常版本。
- 旧网站和原始内容可从 Git 历史或归档分支恢复。
