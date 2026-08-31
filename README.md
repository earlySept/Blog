# 我的博客

基于 **Hexo + Fluid 主题 + GitHub Pages** 的个人博客。日常只需要写 Markdown 文件，网页由 GitHub 自动构建发布。

## 日常写作（只需三步）

```bash
# 1. 新建文章（在 source/_posts/ 下生成 .md 文件）
npm run new "文章标题"

# 2. 本地预览（可选）：浏览器打开 http://localhost:4000
npm run server

# 3. 发布上线：推送到 GitHub，约 1 分钟后线上更新
npm run pub
```

文章都在 **`source/_posts/`** 文件夹里，具体写法见站内文章《写作指南》。

## 项目结构（只需关注加粗的部分）

```
blog/
├── source/
│   ├── _posts/        ★ 所有博客文章（.md）
│   ├── about/index.md ★ 「关于」页
│   └── img/           ★ 文章图片（自建）
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
| 新文章默认开头格式 | `scaffolds/post.md` |

改完配置后执行 `npm run pub` 发布即可生效。

## 常见问题

- **线上没更新？** 打开仓库的 Actions 页看构建是否完成，完成后等 1 分钟再刷新（浏览器缓存可按 Ctrl+F5 强制刷新）。
- **本地预览异常？** `Ctrl+C` 停止后重新 `npm run server`。
- **`npm run pub` 报错？** 多半是网络问题，重试一次；首次使用需要先 `gh auth login` 登录 GitHub。
- **想换主题？** 搜索「Hexo 主题」，按主题文档安装后把 `_config.yml` 里的 `theme:` 改成新主题名。

## 以后可以加的功能

评论（Giscus，基于 GitHub Discussions）、自定义域名、访问统计（不蒜子/Google Analytics）、RSS。
