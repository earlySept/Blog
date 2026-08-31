// 一键发布脚本（npm run pub）：
// 提交所有改动并推送到 GitHub，推送后 GitHub 会自动构建并更新线上博客。
import { execSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

const status = execSync("git status --porcelain", { encoding: "utf8" }).trim();
if (!status) {
  console.log("没有检测到任何改动，无需发布。");
} else {
  const time = new Date().toLocaleString("zh-CN", { hour12: false });
  run("git add -A");
  run(`git commit -m "更新博客 ${time}"`);
  run("git push");
  console.log("\n✅ 已推送到 GitHub，约 1 分钟后线上博客自动更新。");
}
