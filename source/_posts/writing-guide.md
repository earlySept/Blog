---
title: 写作指南 —— 只管写 Markdown 就好
date: 2026-08-31 10:01:00
excerpt: 这篇文章整理博客的日常写作流程：新建、预览、发布，以及 Markdown 文件的基本写法。
tags: [指南]
categories: [开始]
---

这篇说明博客的日常用法。记住一句话：**你只需要和 `source/_posts/` 文件夹打交道**。

## 文章放在哪里

所有文章都是 `source/_posts/` 里的 `.md` 文件。新建一篇 = 加一个文件；修改 = 改文件；删除 = 删文件。

## 文件开头的那段信息（front-matter）

每篇文章开头 `---` 之间的内容叫 front-matter，用来记录文章的元信息：

```markdown
---
title: 我的文章标题        # 文章标题（会显示成大标题）
date: 2026-08-31 10:00:00  # 发布日期
tags: [随笔, 生活]         # 标签，可以多个
categories: [随笔]         # 分类，可以多个
excerpt: 这里写一句话摘要   # 可选：首页显示的摘要
---
```

标签也可以写成多行：

```markdown
tags:
  - 随笔
  - 生活
```

`title` 和 `date` 由 `npm run new` 自动生成，一般不用改；`tags`、`categories` 按需填写，没有就留空。

## 日常三步

1. **新建文章**：`npm run new "我的新文章"`（也可以直接复制一篇旧的 .md 改）
2. **本地预览**（可选）：`npm run server`，浏览器打开 http://localhost:4000/Blog/
3. **发布上线**：`npm run pub`，推送后约 1 分钟线上更新

## 在文章里放 GitHub 工程链接

写技术文章经常要附上开源工程，有三种常用写法（都直接写在 Markdown 正文里）：

**1. 普通链接**（最简单）

```markdown
完整工程在 GitHub：[earlySept/Blog](https://github.com/earlySept/Blog)
```

**2. 徽章式链接**（带 GitHub 图标的小徽章，点击跳转仓库）

```markdown
[![GitHub Repo](https://img.shields.io/badge/GitHub-earlySept/Blog-181717?logo=github)](https://github.com/earlySept/Blog)
```

效果：[![GitHub Repo](https://img.shields.io/badge/GitHub-earlySept/Blog-181717?logo=github)](https://github.com/earlySept/Blog)

**3. 仓库卡片**（自动展示仓库简介、star 数，适合放在文章开头）

```markdown
[![Repo Card](https://github-readme-stats.vercel.app/api/pin/?username=earlySept&repo=Blog&theme=default)](https://github.com/earlySept/Blog)
```

效果：[![Repo Card](https://github-readme-stats.vercel.app/api/pin/?username=earlySept&repo=Blog&theme=default)](https://github.com/earlySept/Blog)

> 把链接里的 `earlySept/Blog` 换成你自己的仓库就行。徽章样式还能加 star 数：在 shields.io 链接里接 `https://img.shields.io/github/stars/earlySept/Blog`。

## 几个小提示

- **文件名建议用英文**（如 `my-first-post.md`），因为文件名会出现在网址里；标题随便用中文
- **插入图片**：把图片放到 `source/img/` 文件夹，文章里写 `![图片说明](/img/文件名.jpg)`
- **存草稿不想发布**：把 `.md` 文件移出 `_posts` 文件夹（比如建个 `_drafts` 文件夹放着）
- **改了没生效**：本地预览按 `Ctrl+C` 停掉重新 `npm run server`；线上等 1 分钟再刷新
