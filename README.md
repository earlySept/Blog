# 我的博客

基于 **Hexo + Fluid 主题 + GitHub Pages** 的个人博客。日常只需要写 Markdown 文件，网页由 GitHub 自动构建发布。

## 项目链接

- 线上博客：[https://earlysept.github.io/Blog/](https://earlysept.github.io/Blog/)
- GitHub 仓库：[https://github.com/earlySept/Blog](https://github.com/earlySept/Blog)

## 日常写作

```bash
# 1. 新建文章（在 source/_posts/ 下生成 .md 文件）
npm run new "文章标题"

# 2. 本地预览（可选）：浏览器打开 http://localhost:4000/Blog/
npm run server

# 3. 发布上线：推送到 GitHub，约 1 分钟后线上更新
npm run pub
```

文章都在 **`source/_posts/`** 文件夹里。这里放的是给访客看的正式内容：技术分享、随笔、读书笔记、阶段总结都可以。

每篇文章开头都有一段 `---` 包起来的信息：

```markdown
---
title: 我的文章标题
date: 2026-09-04 20:00:00
excerpt: 首页显示的一句话摘要
tags: [随笔, 生活]
categories: [随笔]
---
```

如果只是写一篇普通随笔，不需要关联任何想法，保持上面这样就可以。

## Thoughts：记录还没写成文章的想法

未完成的问题、想法、念头放在 **`source/_questions/`**。它们会生成到网站的 `Thoughts` 页面，首页底部只露出最近几条。

新增一个想法时，复制一份 `.md` 文件，改成类似这样：

```markdown
---
id: q-20260904-001
title: "为什么我还想保留一个自己的博客？"
date: 2026-09-04
status: thinking
tags:
  - Blog
  - Writing
article:
---

这里写下当时的想法。可以很短，也可以只是一个问题。
```

`status` 只用三个值：

- `thinking`：刚冒出来，还没深入想
- `researching`：正在查资料、实验或整理
- `answered`：已经写成较完整的文章

## 想法和文章如何互相跳转

当某个想法后来写成文章时，做两件事：

1. 在 `source/_questions/xxx.md` 里把状态改成 `answered`

```yaml
status: answered
```

2. 在对应文章的 front matter 里加上这个想法的 `id`

```yaml
questions:
  - q-20260904-001
```

这样网站会自动生成双向链接：

- 想法页会显示「这个问题最终形成了一篇文章」
- 文章页会显示「这篇文章源于我之前记录的一个问题」

一篇文章可以回答多个想法：

```yaml
questions:
  - q-20260904-001
  - q-20260905-001
```

如果一篇文章只是普通随笔、普通技术分享、生活记录，不需要回答任何想法，就不要写 `questions` 字段。

## 首页显示数量

首页文章显示数量在 `_config.yml` 里改：

```yaml
index_generator:
  per_page: 5
```

首页底部「最近想法」显示数量也在 `_config.yml` 里改：

```yaml
thoughts:
  home_limit: 3
```

## 项目结构（只需关注加粗的部分）

```
blog/
├── source/
│   ├── _posts/        ★ 所有博客文章（.md）
│   ├── _questions/    ★ 想法、问题、暂时还没写成文章的内容（.md）
│   ├── about/index.md ★ 「关于」页
│   ├── css/custom.css ★ 自定义样式（如导航栏 GitHub 只显示图标）
│   └── img/           ★ 图片资源（文章图片、首页背景等）
├── layout/            首页、Thoughts、想法详情页的小模板
├── scripts/           自定义 Hexo 脚本
├── _config.yml        站点配置（标题、作者等）
├── _config.fluid.yml  主题配置（外观、导航、关于页）
├── scaffolds/post.md  新文章的模板
└── .github/workflows/deploy.yml  自动部署脚本（勿动）
```

## 常用配置修改

| 想改什么 | 在哪里改 |
| --- | --- |
| 博客名称、副标题、作者 | `_config.yml` 顶部【站点信息】 |
| 头像、关于页、导航菜单 | `_config.fluid.yml`（中文注释齐全） |
| 首页副标题文字 | `_config.fluid.yml` 的 `index: slogan`（`text:` 一行） |
| 首页文章显示几篇 | `_config.yml` 的 `index_generator: per_page` |
| 首页最近想法显示几条 | `_config.yml` 的 `thoughts: home_limit` |
| 明暗模式切换时段 | `scripts/beijing-darkmode.js` 顶部注释（默认 18 点到次日 6 点暗色） |
| 页面样式微调（如导航栏 GitHub 仅图标） | `source/css/custom.css` |
| 新文章默认开头格式 | `scaffolds/post.md` |

改完配置后执行 `npm run pub` 发布即可生效。

## 常见问题

- **线上没更新？** 打开仓库的 Actions 页看构建是否完成，完成后等 1 分钟再刷新（浏览器缓存可按 Ctrl+F5 强制刷新）。
- **改了 `source/css/custom.css`，页面样式没变？** 浏览器会把 CSS 缓存最多 10 分钟。改完样式后到 `_config.fluid.yml` 的 `custom_css:` 把 `?v=` 后面的数字加一（如 `?v=2` 改 `?v=3`），访客浏览器会当成新文件立刻重新下载；本地预览则按 Ctrl+F5 强刷即可。
- **别用 VSCode 内置的 Simple Browser 预览本站！** 它的缓存非常顽固，刷新经常不重新拉取资源，会出现「代码改了但页面怎么都不变」的假象。本地预览请用 Edge/Chrome 等真正的浏览器打开 http://localhost:4000/Blog/ 。
- **改了配置或 `scripts/` 下的文件，本地预览没变化？** 这两类文件只在服务器启动时加载，`Ctrl+C` 停止后重新 `npm run server`（文章和样式文件则会自动热更新）。
- **本地预览异常？** `Ctrl+C` 停止后重新 `npm run server`。
- **`npm run pub` 报错？** 多半是网络问题，重试一次；首次使用需要先 `gh auth login` 登录 GitHub。
- **想换主题？** 搜索「Hexo 主题」，按主题文档安装后把 `_config.yml` 里的 `theme:` 改成新主题名。

## 以后可以加的功能

评论（Giscus，基于 GitHub Discussions）、自定义域名、访问统计（不蒜子/Google Analytics）、RSS。
