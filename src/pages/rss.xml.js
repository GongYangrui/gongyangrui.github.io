import rss from "@astrojs/rss";
import { getPublishedWriting, writingPath } from "../lib/content";

export async function GET(context) {
  const posts = await getPublishedWriting();

  return rss({
    title: "Yangrui Gong — Blogs",
    description: "Technical notes on backend systems, practical AI applications, infrastructure, and tools.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: writingPath(post.data.lang, post.data.slug),
      categories: post.data.tags,
    })),
  });
}
