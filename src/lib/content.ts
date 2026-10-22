import { getCollection, getEntry } from "astro:content";
import type { Locale } from "../i18n";

export async function getSiteData() {
  const [profile, home] = await Promise.all([
    getEntry("profile", "profile"),
    getEntry("home", "home"),
  ]);

  if (!profile || !home) {
    throw new Error("Profile or homepage configuration is missing.");
  }

  return { profile, home };
}

export async function getPublishedWriting(lang?: Locale) {
  const posts = await getCollection(
    "writing",
    ({ data }) => !data.draft && (!lang || data.lang === lang),
  );

  return posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

export function writingPath(lang: Locale, slug: string) {
  return lang === "zh" ? `/zh/writing/${slug}/` : `/writing/${slug}/`;
}

export function formatDate(date: Date, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: lang === "zh" ? "2-digit" : "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export function readingMinutes(body: string) {
  const latinWords = body.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  const cjkCharacters = body.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  return Math.max(1, Math.ceil(latinWords / 220 + cjkCharacters / 420));
}

export function tagSlug(tag: string) {
  const slug = tag
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "other";
}

type TaggedPost = {
  data: {
    title: string;
    description: string;
    tags: string[];
    publishedAt: Date;
  };
};

export function groupByPrimaryTag<T extends TaggedPost>(posts: T[], otherLabel: string) {
  const groups = new Map<string, { label: string; slug: string; posts: T[] }>();

  for (const post of posts) {
    const label = post.data.tags[0] || otherLabel;
    const slug = tagSlug(label);
    const group = groups.get(slug) ?? { label, slug, posts: [] };
    group.posts.push(post);
    groups.set(slug, group);
  }

  return [...groups.values()];
}
