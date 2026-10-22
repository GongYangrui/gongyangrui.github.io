---
lang: zh
slug: mini-program-structure
title: 小程序的项目结构
description: 介绍微信小程序项目中的主要目录、入口文件和配置文件。
publishedAt: 2025-02-23
tags:
  - 小程序
  - 前端
draft: false
---

小程序项目通常由页面、工具模块、入口文件和配置文件组成：

- `pages` 用来存放页面；
- `utils` 用来存放工具模块；
- `app.js` 是项目入口文件；
- `app.json` 是全局配置文件；
- `app.wxss` 是全局样式文件；
- `project.config.json` 是项目配置文件。

## Pages

官方建议把页面放在 `pages` 目录中，并为每个页面建立单独文件夹。每个页面由四个基本文件组成：

- `.js`：页面脚本和事件处理函数；
- `.json`：当前页面的配置；
- `.wxml`：页面结构；
- `.wxss`：页面样式。

下面是一个简化的全局配置示例：

```json
{
  "pages": ["pages/index/index", "pages/logs/logs"],
  "window": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "Weixin",
    "navigationBarBackgroundColor": "#ffffff"
  },
  "style": "v2",
  "componentFramework": "glass-easel",
  "sitemapLocation": "sitemap.json",
  "lazyCodeLoading": "requiredComponents"
}
```

`project.private.config.json` 保存只属于当前开发环境的配置，并会覆盖 `project.config.json` 中的同名字段。相关行为可以参考[微信开发者工具文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)。
