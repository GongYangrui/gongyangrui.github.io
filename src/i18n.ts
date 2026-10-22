export type Locale = "en" | "zh";

export const ui = {
  en: {
    home: "Home",
    projects: "Projects",
    writing: "Blogs",
    education: "Education",
    experience: "Experience",
    publications: "Publications",
    honors: "Honors",
    visitors: "Visitors",
    backToWriting: "Back to blogs",
    published: "Published",
    updated: "Updated",
    minuteRead: "min read",
    onThisPage: "On this page",
    contact: "Contact",
    github: "GitHub",
    email: "Email",
    linkedin: "LinkedIn",
    currently: "Currently",
    since: "since",
    skip: "Skip to content",
    notFound: "Page not found",
    notFoundBody: "The page may have moved or never existed.",
    goHome: "Go home",
  },
  zh: {
    home: "首页",
    projects: "项目",
    writing: "博客",
    education: "教育经历",
    experience: "工作与研究经历",
    publications: "论文",
    honors: "荣誉",
    visitors: "访客",
    backToWriting: "返回博客列表",
    published: "发布于",
    updated: "更新于",
    minuteRead: "分钟阅读",
    onThisPage: "本页目录",
    contact: "联系",
    github: "GitHub",
    email: "邮箱",
    linkedin: "LinkedIn",
    currently: "目前",
    since: "始于",
    skip: "跳到正文",
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
