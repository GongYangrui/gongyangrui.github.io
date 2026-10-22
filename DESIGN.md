# Design System

## Direction

A bilingual, resume-led homepage: intro, education, experience, publications and honors. Projects and blogs live on their own pages, not on the homepage. Cool paper, ink type, a condensed display face for the name, and hairline rows with a shared mono date column.

## Palette

- Paper (background): `#FAF8F6`
- Surface (logo tiles, screenshot frames, code blocks): `#FFFFFF`
- Ink: `#221B17`
- Muted text: `#6B6059`
- Rules: `#E7DFD8`
- Inline code and table headers: `#F3ECE6`; selection: `#F6D8C3`
- Award badge: `#FBE6D8` background with `#9C4214` text
- Accent (links, focus, "Currently" panel, author highlight): `#B9501A`, a burnt orange that keeps 4.7:1 contrast on paper

Light only. No gradients or shadows.

## Typography

- Display: Bricolage Grotesque (variable, self-hosted via Fontsource), weight 650–700, `font-stretch` 84–90%. Used for the name, page titles and section headings only.
- Body: system sans-serif with PingFang SC / Microsoft YaHei for Chinese, 16px / 1.7.
- Utility: IBM Plex Mono 400/500 for dates, periods, venues, tech stacks and tags.
- Fonts are bundled locally; never load Google Fonts (unreliable from mainland China).

## Layout

- Shell: maximum 1040px, 24px gutters, 16px on phones. Article measure 720px; table of contents becomes inline below 760px.
- Intro: large condensed name with Chinese name beside it, headline, description, contact links. A "Currently" panel on the right is derived from education entries whose period ends in `Present`.
- Education, experience, honors and blog rows share one grid: a 150px mono date column, then content. Below 640px the date sits above the content. `Present` displays as 至今 in Chinese.
- Publications, projects and blog rows are hairline-separated. Every project uses the same row with no featured treatment: text on the left, an optional screenshot on the right (380px, 16:10, cropped from the top, white frame with a 1px rule and 6px corners). Below 760px the screenshot moves above the text. Projects without a screenshot let the text span the full width.
- Project tech stacks use the same mono tag style as blog tags.
- Blogs are not translated. Both `/writing/` and `/zh/writing/` list every post; each post renders inside both site languages, with the canonical URL following its `lang`.
- Visitor map (MapMyVisitors) is the last homepage section, centered at a maximum width of 640px inside a white frame with a 1px rule and 6px corners. Its colors are set through the embed parameters in `VisitorMap.astro` (ocean `ffffff`, land `e7dfd8`, text `6b6059`, visitors `b9501a`, recent `9c4214`) and its text uses the mono face. If the third-party script is blocked or fails, the whole section stays hidden.
- Sections are 80px apart (64px on phones). Keep homepage selections and order in structured data.

## Education and experience logos

Logos keep original color and aspect ratio with `object-fit: contain` inside a 48px white tile with a 1px rule and 8px corners (42px on phones); the tile evens out logos that ship with white backgrounds. Never crop into circles or generate initials. Upload real files to CMS Media (`public/media`) and select them in the entry's logo field; empty logo objects normalize to no logo. Missing translated alt text falls back to the institution name. Local paths are checked by `npm run verify`.

## Accessibility and motion

No entrance animation or decorative motion; only link, hover and focus feedback. Respect reduced-motion preferences. Keep visible focus, semantic headings and the skip link. Long code, tables and math scroll inside their own containers. Test 375px, 768px, 1440px and 200% zoom.
