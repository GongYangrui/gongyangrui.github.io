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


// CMS may save an empty optional image object after an image is removed.
const optionalImage = z.preprocess((value) => {
  if (!value || typeof value !== "object" || !("src" in value) ||
      typeof value.src !== "string" || !value.src.trim()) return undefined;
  return value;
}, z.object({
  src: z.string().trim().min(1),
  alt: z.object({ en: z.string().optional(), zh: z.string().optional() }).nullish(),
}).optional());

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
    publications: z.object({ enabled: z.boolean(), itemIds: z.array(z.string()) }),
    honors: z.object({ enabled: z.boolean(), itemIds: z.array(z.string()) }),
    // MapMyVisitors widget; mapId is the "d" value from the embed code.
    visitors: z.object({ enabled: z.boolean(), mapId: z.string() }).optional(),
  }),
});

const experience = defineCollection({
  loader: file("src/data/experience.json"),
  schema: z.object({
    period: z.string(),
    organization: localizedText,
    description: localizedText.optional(),
    mentor: z.object({
      name: localizedText,
      url: z.string().url(),
    }).optional(),
    url: z.string().url().optional(),
    logo: optionalImage,
  }),
});

const education = defineCollection({
  loader: file("src/data/education.json"),
  schema: z.object({
    period: z.string(),
    institution: localizedText,
    program: localizedText,
    url: z.string().url().optional(),
    logo: optionalImage,
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
    image: optionalImage,
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
    date: z.string(),
    // Optional result such as "Champion"; shown as a badge before the title.
    award: localizedText.optional(),
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
    // Language of the post body; blogs are not translated, so each post has one version.
    lang: z.enum(["en", "zh"]).default("zh"),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
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
