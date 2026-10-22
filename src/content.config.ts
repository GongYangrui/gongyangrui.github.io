import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const localizedText = z.object({
  en: z.string(),
  zh: z.string(),
});

const link = z.object({
  label: localizedText,
  url: z.string().url(),
});

const visual = z.object({
  src: z.string().min(1),
  alt: localizedText,
});

const profile = defineCollection({
  loader: file("src/data/profile.json"),
  schema: z.object({
    name: z.string(),
    nameZh: z.string().optional(),
    headline: localizedText,
    intro: localizedText,
    email: z.string().email(),
    github: z.string().url(),
    linkedin: z.string().url().optional(),
  }),
});

const home = defineCollection({
  loader: file("src/data/home.json"),
  schema: z.object({
    experience: z.object({ enabled: z.boolean(), itemIds: z.array(z.string()) }),
    education: z.object({ enabled: z.boolean(), itemIds: z.array(z.string()) }),
    projects: z.object({ enabled: z.boolean(), itemIds: z.array(z.string()) }),
    writing: z.object({ enabled: z.boolean(), itemIds: z.array(z.string()) }),
    publications: z.object({ enabled: z.boolean(), itemIds: z.array(z.string()) }),
    honors: z.object({ enabled: z.boolean(), itemIds: z.array(z.string()) }),
  }),
});

const experience = defineCollection({
  loader: file("src/data/experience.json"),
  schema: z.object({
    order: z.number().int().nonnegative(),
    period: z.string(),
    role: localizedText,
    organization: localizedText,
    description: localizedText,
    category: z.enum(["engineering", "research"]),
    url: z.string().url().optional(),
    logo: visual.optional(),
  }),
});

const education = defineCollection({
  loader: file("src/data/education.json"),
  schema: z.object({
    order: z.number().int().nonnegative(),
    period: z.string(),
    institution: localizedText,
    program: localizedText,
    url: z.string().url().optional(),
    logo: visual.optional(),
  }),
});

const projects = defineCollection({
  loader: file("src/data/projects.json"),
  schema: z.object({
    order: z.number().int().nonnegative(),
    name: z.string(),
    summary: localizedText,
    technologies: z.array(z.string()),
    links: z.array(link),
    image: visual.optional(),
  }),
});

const publications = defineCollection({
  loader: file("src/data/publications.json"),
  schema: z.object({
    order: z.number().int().nonnegative(),
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    links: z.array(link),
  }),
});

const honors = defineCollection({
  loader: file("src/data/honors.json"),
  schema: z.object({
    order: z.number().int().nonnegative(),
    date: z.string(),
    title: localizedText,
  }),
});

const writing = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/writing",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
  schema: z.object({
    lang: z.enum(["en", "zh"]),
    slug: z.string(),
    translationKey: z.string(),
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  profile,
  home,
  experience,
  education,
  projects,
  publications,
  honors,
  writing,
};
