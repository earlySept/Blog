// 首页明暗模式默认跟随北京时间（UTC+8）：18:00 ~ 次日 6:00 自动进入暗色模式。
// 原理：注入到 <head> 最顶部、先于主题的 color-schema.js 执行，
// 用内联样式覆盖 --color-mode 变量，让"自动默认值"固定取北京时间，
// 不再优先跟随访客系统的 prefers-color-scheme / 访客本地时间。
// 用户手动点过太阳/月亮后，选择会存在 localStorage('Fluid_Color_Scheme')，
// 此时本脚本直接退出，完全尊重手动选择。
// 想改暗色时段，改下面两个数字（18 和 6）即可。
hexo.extend.injector.register('head_begin', `
<script>
(function () {
  try {
    var manual = localStorage.getItem('Fluid_Color_Scheme');
    if (manual === 'light' || manual === 'dark') { return; }
    var bjHour = (new Date().getUTCHours() + 8) % 24;
    var mode = (bjHour >= 18 || bjHour < 6) ? 'dark' : 'light';
    document.documentElement.style.setProperty('--color-mode', mode);
  } catch (e) { /* ignore */ }
})();
</script>
`);
