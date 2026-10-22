# Yangrui Gong — Personal website

A bilingual, content-first personal website built with Astro and TypeScript. English is the default language; Chinese lives under `/zh/`. The site is fully static and is deployed to GitHub Pages.

## Pages

- `/` and `/zh/` — profile, education, experience, selected projects, writing, publications, and honors
- `/projects/` and `/zh/projects/` — full project list and publications
- `/writing/` and `/zh/writing/` — posts grouped by their first tag
- `/writing/[slug]/` and `/zh/writing/[slug]/` — article pages with an optional table of contents

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
- English and Chinese writing
- Uploaded media

Saving in Pages CMS creates a Git commit. A successful push to `main` triggers `.github/workflows/deploy.yml`; failed builds do not replace the current GitHub Pages deployment.

Content can also be edited directly:

- Structured data: `src/data/*.json`
- English posts: `src/content/writing/en/*.md`
- Chinese posts: `src/content/writing/zh/*.md`
- Homepage selection and order: `src/data/home.json`
- Organization logos and project images: upload in the CMS Media view, then select the image on the relevant entry

`itemIds` controls homepage order. Set a module's `enabled` field to `false` to remove it completely. Logos and project images are optional; entries without an image use a compact initial mark instead.

The blog groups posts by the **first tag**. Put the primary category first, then any additional tags. Posts without tags are grouped under “Other”.

## Publishing a post

Create a Markdown file in the matching language folder. `translationKey` connects translations. Drafts are excluded from pages, RSS, and the sitemap.

```yaml
---
lang: en
slug: example-post
translationKey: example-post
title: Example post
description: A concise summary.
publishedAt: 2026-10-21
tags: [Backend, AI]
draft: false
featured: false
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

Code spans and fenced code blocks are left untouched, so write a literal dollar sign in code as `` `$HOME` ``. The `Markdown and Math` post is a rendering reference for tables, code, footnotes, task lists, and formulas.

## GitHub Pages setup

In the repository settings, choose **GitHub Actions** as the Pages source. The workflow builds the site, checks links, and publishes `dist/` using the official GitHub Pages actions.
