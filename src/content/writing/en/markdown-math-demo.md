---
lang: en
slug: markdown-math-demo
translationKey: markdown-math-demo
title: Markdown and Math
description: A short reference post showing how Markdown, code, tables, and LaTeX-style math render on this site.
publishedAt: 2026-10-21
tags:
  - Notes
  - Math
draft: false
featured: false
---

This post is a rendering reference. It exercises the Markdown elements and math syntax that the site supports.

## Inline math

The mass-energy relation is $E = mc^2$, and a Gaussian integral is written as $\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}$.

## Display math

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

## Aligned equations

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t}
\end{aligned}
$$

## Matrices

$$
A = \begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{pmatrix}, \qquad
\det(A) = 0
$$

## Code

Inline code such as `$HOME` stays literal. A fenced block is unchanged:

```bash
export PATH="$HOME/bin:$PATH"
echo "$USER"
```

## Tables and lists

| Element | Supported |
| --- | --- |
| Tables | Yes |
| Task lists | Yes |
| Footnotes | Yes |

- [x] Inline math
- [x] Display math
- [ ] Add more notes

> Blockquotes use the same prose rhythm as the rest of the site.

A footnote reference also works.[^1]

[^1]: This is the footnote text.
