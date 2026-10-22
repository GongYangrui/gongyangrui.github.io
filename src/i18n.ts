export type Locale = "en" | "zh";

export const ui = {
  en: {
    writing: "Writing",
    resume: "Resume",
    experience: "Experience",
    projects: "Projects",
    latestWriting: "Latest writing",
    allWriting: "All writing",
    readWriting: "Read my writing",
    viewResume: "View resume",
    viewProject: "View project",
    github: "GitHub",
    email: "Email",
    education: "Education",
    research: "Earlier research",
    publications: "Publications",
    honors: "Honors",
    present: "Present",
    updated: "Updated",
    published: "Published",
    minuteRead: "min read",
    backToWriting: "Back to writing",
    noTranslation: "This article is not available in Chinese. Browse Chinese writing instead.",
    skip: "Skip to content",
    downloadPdf: "Download PDF",
    contact: "Contact",
    notFound: "Page not found",
    notFoundBody: "The page may have moved or never existed.",
    goHome: "Go home",
  },
  zh: {
    writing: "文章",
    resume: "履历",
    experience: "经历",
    projects: "项目",
    latestWriting: "近期文章",
    allWriting: "全部文章",
    readWriting: "阅读文章",
    viewResume: "查看履历",
    viewProject: "查看项目",
    github: "GitHub",
    email: "邮箱",
    education: "教育经历",
    research: "早期研究经历",
    publications: "论文",
    honors: "荣誉",
    present: "至今",
    updated: "更新于",
    published: "发布于",
    minuteRead: "分钟阅读",
    backToWriting: "返回文章列表",
    noTranslation: "这篇文章暂无英文版本，将返回英文文章列表。",
    skip: "跳到正文",
    downloadPdf: "下载 PDF",
    contact: "联系我",
    notFound: "页面不存在",
    notFoundBody: "这个页面可能已经移动，或者从未存在。",
    goHome: "返回首页",
  },
} as const;

export function localized<T extends { en: string; zh: string }>(value: T, lang: Locale) {
  return value[lang];
}

export function localePath(lang: Locale, path = "/") {
  if (lang === "en") return path;
  return path === "/" ? "/zh/" : `/zh${path}`;
}
