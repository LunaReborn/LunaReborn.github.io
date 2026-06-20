# NEON LOG

Woxlin 的 Jekyll 个人博客。GitHub Pages 会自动完成构建，无需本地安装依赖。

## 个性化

## 新增文章

复制 `_posts` 中任意一篇 Markdown，文件名使用 `年-月-日-英文标题.md`，然后修改顶部信息与正文。提交到 GitHub 后，首页会自动按日期显示文章。

文章头部示例：

```yaml
---
layout: post
title: "文章标题"
description: "首页显示的摘要"
category: 技术
category_key: tech
read_time: 5 MIN
art: art-code
art_element: code-lines
---
```

## 部署到 GitHub Pages

1. 在 GitHub 新建名为 `你的用户名.github.io` 的公开仓库。
2. 将本项目文件提交并推送到仓库的 `main` 分支。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/ (root)`。
5. 等待片刻后访问 `https://你的用户名.github.io`。

GitHub Pages 会使用项目中的 `_config.yml` 自动运行 Jekyll 并发布网站。
