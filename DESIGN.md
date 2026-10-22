# Design System

## Direction

A quiet academic/engineering personal site inspired by the layout of Ruoke Zhang's homepage. The page is a single 900px column on a soft blue-lavender gradient: a short profile card, then resume-style lists and understated cards. It must never look like a SaaS landing page, a dashboard, or a template portfolio.

## Theme

Light only. No dark-mode variant is maintained. The palette is intentionally narrow and the page relies on whitespace and one-pixel rules rather than layered decoration.

## Color

- Ink: `#101827`
- Muted ink: `#53657a`
- Rule: `#d8e5f0`
- Accent: `#1769aa`
- Page background: `#f5f8fd` with soft radial gradients
- Card surface: translucent white with a very light border and shadow

Accent color is used for eyebrows, links, dates, and small status marks. It is never the only way to communicate state.

## Typography

- One system sans-serif stack, including `Noto Sans SC` and `PingFang SC` for Chinese.
- No external webfonts.
- Body: 16px with a 1.7 line height.
- Page titles: `clamp(36px, 6vw, 52px)`.
- Section headings: 22px with a bottom rule.
- Prose measure: 720px inside the 900px shell.

## Layout

- Shell: `min(100% - 48px, 900px)`, and `min(100% - 32px, 900px)` below 640px.
- Header: site name, Home / Projects / Writing, language switch; wraps to two rows on small screens.
- Home: profile card, then About, Education, Experience, Selected Projects, Writing, Publications, Honors.
- Resume rows: 70px mark, flexible copy, right-aligned date. They become two columns below 640px with the date under the copy.
- Projects: optional 260px preview plus details; image-less projects use a single full-width text card.
- Blog index: 160px sticky category nav plus post rows; the nav becomes an inline row below 760px.
- Article: 190px sticky table of contents plus a 760px reading card; the table of contents moves above the article below 760px.
- Footer: copyright and one tagline.

## Components

- Profile card with eyebrow, English and Chinese name, headline, and contact pills.
- Section heading with optional “all items” link.
- Entity mark: optional logo inside a small bordered tile, otherwise up to two initials.
- Post row: date, title, summary, and tags.
- Project card / publication card with small link pills.
- Article prose card with headings, code, tables, quotes, images, footnotes, and KaTeX formulas.

## Motion

Only 160–200ms color, shadow, transform, and focus transitions. No entrance animations. All motion collapses under `prefers-reduced-motion`.

## Accessibility

Meet WCAG 2.2 AA, preserve browser zoom, provide a skip link, use semantic landmarks and headings, keep focus visible, maintain 44px touch targets, and never rely on color alone. Long code, tables, and formulas scroll inside their own containers so the page never scrolls horizontally.
