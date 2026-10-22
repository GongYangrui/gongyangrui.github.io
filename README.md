# Yangrui Gong — Personal website

A bilingual, content-first personal website built with Astro and TypeScript. English is the default language; Chinese lives under `/zh/`. The site is fully static and is deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Before publishing, run the same checks as CI:

```bash
npm run verify
```

This validates Astro and the content schemas, builds the site, generates `resume.pdf` from the online resume, and checks internal links.

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

`itemIds` controls homepage order. Set a module's `enabled` field to `false` to remove it completely. Projects are intentionally disabled by default.

## Publishing a post

Create a Markdown file in the matching language folder. `translationKey` connects translations; the two posts may use different slugs. Drafts are excluded from pages, RSS, and the sitemap.

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

## GitHub Pages setup

In the repository settings, choose **GitHub Actions** as the Pages source. The workflow builds the site, installs Chromium, generates the PDF resume, checks links, and publishes `dist/` using the official GitHub Pages actions.
