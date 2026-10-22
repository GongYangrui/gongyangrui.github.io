export type Locale = "en" | "zh";

export const ui = {
  en: {
    home: "Home",
    projects: "Projects",
    writing: "Writing",
    personalWebsite: "Personal website",
    about: "About",
    education: "Education",
    experience: "Experience",
    selectedProjects: "Selected projects",
    publications: "Publications",
    honors: "Honors",
    allWriting: "All writing",
    backToWriting: "Back to writing",
    published: "Published",
    updated: "Updated",
    minuteRead: "min read",
    onThisPage: "On this page",
    other: "Other",
    contact: "Contact",
    github: "GitHub",
    email: "Email",
    linkedin: "LinkedIn",
    noTranslation: "This article is not available in Chinese. Browse Chinese writing instead.",
    skip: "Skip to content",
    footerTagline: "Learning, building, and writing.",
    notFound: "Page not found",
    notFoundBody: "The page may have moved or never existed.",
    goHome: "Go home",
  },
  zh: {
    home: "首页",
    projects: "项目",
    writing: "文章",
    personalWebsite: "个人网站",
    about: "关于",
    education: "教育经历",
    experience: "工作与研究经历",
    selectedProjects: "精选项目",
    publications: "论文",
    honors: "荣誉",
    allWriting: "全部文章",
    backToWriting: "返回文章列表",
    published: "发布于",
    updated: "更新于",
    minuteRead: "分钟阅读",
    onThisPage: "本页目录",
    other: "其他",
    contact: "联系",
    github: "GitHub",
    email: "邮箱",
    linkedin: "LinkedIn",
    noTranslation: "这篇文章暂无中文版本，将返回中文文章列表。",
    skip: "跳到正文",
    footerTagline: "学习，构建，记录。",
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
