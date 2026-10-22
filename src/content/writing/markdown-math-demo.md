---
lang: zh
slug: markdown-math-demo
title: Markdown 与数学公式
description: 展示本站如何渲染 Markdown、代码块、表格与 LaTeX 风格数学公式的参考文章。
publishedAt: 2026-10-21
tags:
  - 笔记
  - 数学
draft: false
---

这是一篇渲染参考文章，用来检查站点支持的 Markdown 元素和数学公式语法。

## 行内公式

质能关系写作 $E = mc^2$，高斯积分可以写成 $\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}$。

## 块级公式

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

## 多行对齐

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t}
\end{aligned}
$$

## 矩阵

$$
A = \begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{pmatrix}, \qquad
\det(A) = 0
$$

## 代码

行内代码里的 `$HOME` 会保持原样。围栏代码块同样不受公式语法影响：

```bash
export PATH="$HOME/bin:$PATH"
echo "$USER"
```

## 表格与列表

| 元素 | 是否支持 |
| --- | --- |
| 表格 | 是 |
| 任务列表 | 是 |
| 脚注 | 是 |

- [x] 行内公式
- [x] 块级公式
- [ ] 继续补充笔记

> 引用块与正文使用同一套排版节奏。

脚注引用也可以正常使用。[^1]

[^1]: 这里是脚注内容。
