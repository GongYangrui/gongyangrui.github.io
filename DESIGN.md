# Design System

## Direction

The site is a quiet, content-led engineering portfolio. It borrows the directness of a small personal homepage, the confidence of one large typographic gesture, and the discipline of technical documentation. It must never look like an academic template, a SaaS landing page, or a cyberpunk developer portfolio.

## Theme

Light mode is primary because recruiters are most likely to scan the site in a daylight work setting. Dark mode follows the operating-system preference and uses purpose-built surfaces rather than inverted colors.

## Color

The strategy is restrained: tinted neutral surfaces and one signal-red accent used on the hero greeting, links, focus states, and small status marks.

- Light canvas: `oklch(98% 0.006 55)`
- Light raised surface: `oklch(95.5% 0.008 55)`
- Light ink: `oklch(20% 0.018 35)`
- Light muted ink: `oklch(48% 0.012 35)`
- Signal red: `oklch(60% 0.22 28)`
- Dark canvas: `oklch(16% 0.012 35)`
- Dark raised surface: `oklch(21% 0.014 35)`
- Dark ink: `oklch(92% 0.008 55)`

## Typography

- Display and body: Mona Sans when available, with system sans-serif and Noto Sans SC fallbacks.
- Utility metadata and code: Commit Mono when available, with ui-monospace fallbacks.
- Body measure: 65 to 72 characters.
- Hero uses strong weight contrast and fluid sizing; body text stays at a stable readable size.

## Layout

- Main reading shell: approximately 58rem.
- Spacing uses a 4px base with meaningful rhythm rather than equal padding.
- Sections are grouped with whitespace and one-pixel rules, not cards.
- Homepage order is fixed: hero, experience, optional projects, writing, footer.
- At narrow widths, date/content rows stack and navigation remains visible without a drawer.

## Components

- Header: compact horizontal navigation using text links.
- Hero: large greeting and role statement, two direct calls to action.
- Timeline row: date column plus content column separated by whitespace, not a decorative stripe.
- Writing row: date, title, summary, and language label.
- Project row: title, concise problem statement, technology list, and direct links.
- Footer: contact and social links with no repeated biography.

## Motion

Only 100–200ms color, underline, and focus transitions. No entrance choreography or scroll-triggered movement. All transitions collapse under `prefers-reduced-motion`.

## Accessibility

Meet WCAG 2.2 AA, preserve browser zoom, provide a skip link, use semantic landmarks and headings, keep focus visible, maintain 44px touch targets, and never rely on color alone.
