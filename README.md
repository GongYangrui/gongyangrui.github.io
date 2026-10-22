# Yangrui Gong — Personal website

A bilingual, content-first personal website built with Astro and TypeScript. English is the default language; Chinese lives under `/zh/`. The site is fully static and is deployed to GitHub Pages.

## Pages

- `/` and `/zh/` — profile, education, experience, publications, and honors
- `/projects/` and `/zh/projects/` — full project list and publications
- `/writing/` and `/zh/writing/` — every post, grouped by its first tag (the two indexes list the same posts)
- `/writing/[slug]/` and `/zh/writing/[slug]/` — the same article inside the English or Chinese site; the canonical URL follows the post's `lang`

## Local development

```bash
npm install
npm run dev
```

Before publishing, run the same checks as CI:

```bash
npm run verify
```

This validates Astro and the content schemas, builds the static site, and checks internal links.

## Updating content

The easiest editing workflow is [Pages CMS](https://pagescms.org/). Open the hosted editor, sign in with GitHub, and select this repository. `.pages.yml` provides editors for:

- Profile and homepage module visibility/order
- Experience, education, projects, publications, and honors
- Blog posts
- Uploaded media

Saving in Pages CMS creates a Git commit. A successful push to `main` triggers `.github/workflows/deploy.yml`; failed builds do not replace the current GitHub Pages deployment.

Content can also be edited directly:

- Structured data: `src/data/*.json`
- Blog posts: `src/content/writing/*.md`
- Homepage selection and order: `src/data/home.json`
- Organization logos and project images: upload in the CMS Media view, then select the image on the relevant entry

The homepage visitor map uses MapMyVisitors: `visitors.mapId` in `src/data/home.json` is the `d=` value from its embed code, and `visitors.enabled` turns it off. Map colors live in `src/components/VisitorMap.astro`.

`itemIds` controls homepage order. Set a module's `enabled` field to `false` to remove it completely. Logos and project images are optional. Entries without a logo display text only, without a placeholder or empty image column. Project screenshots work best at 16:10 (for example 1600×1000); they are cropped from the top, and alt text falls back to the project name when left empty.

### School and organization logos

Upload your real logo through CMS Media (stored in `public/media`), then choose it in Education → Institution logo or Experience → Organization logo. Each entry is independent. Remove the selected image to return to text-only display; empty logo objects and blank paths are accepted. You can also omit `logo` from the JSON entirely.

```json
"logo": {
  "src": "/media/my-institution.png",
  "alt": { "en": "Institution logo", "zh": "机构标识" }
}
```

Alternative text is optional for logos; the institution or organization name is used when it is missing. Images retain their original proportions and colors inside a 48px white tile (42px on mobile). Transparent PNG, WebP and SVG are suitable; wide logos are contained rather than cropped. Run `npm run verify` to catch incorrect local image paths.

The blog groups posts by the **first tag**. Put the primary category first, then any additional tags. Posts without tags are grouped under “Other” (“其他” on the Chinese site).

## Publishing a post

Create a Markdown file in `src/content/writing/`. Posts are not translated: each post has one version, and `lang` (default `zh`) only records the language it is written in. Drafts are excluded from pages, RSS, and the sitemap.

```yaml
---
lang: zh
slug: example-post
title: Example post
description: A concise summary.
publishedAt: 2026-10-21
tags: [Backend, AI]
draft: false
---
```

### Math

Markdown posts support inline and display math through KaTeX:

```md
Inline math: $E = mc^2$

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$
```

Code spans and fenced code blocks are left untouched, so write a literal dollar sign in code as `` `$HOME` ``. The `Markdown 与数学公式` post (`markdown-math-demo.md`) is a rendering reference for tables, code, footnotes, task lists, and formulas.

## GitHub Pages setup

In the repository settings, choose **GitHub Actions** as the Pages source. The workflow builds the site, checks links, and publishes `dist/` using the official GitHub Pages actions.
