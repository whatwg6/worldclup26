# WordClub26

小红书 2026 世界杯页面的 React + TypeScript + Vite 实现。页面重点是还原世界杯专题页的首屏、侧边栏、比赛预约和赛事聚焦模块，并用 Playwright 做视觉回归验证。

![WordClub26 页面预览](./wordclub26.png)

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- Playwright

## 目录说明

- `src/App.tsx`：页面结构和数据驱动渲染。
- `src/App.css`：页面布局、视觉样式和响应式样式。
- `src/assets/`：页面使用的图片、Logo、图标、背景图等真实资源。
- `assets-manifest.json`：资源登记清单，说明资源用途、来源和是否必须使用。
- `e2e/`：Playwright 端到端和视觉回归测试。
- `AGENTS.md`：AI 协作规则，包含资源使用、视觉还原和测试经验。

## 资源规则

本项目要求所有图片、Logo、图标、字标、背景图都来自 `src/assets`，并在 `assets-manifest.json` 中声明。

参考页中已有的资源必须提取真实文件后引用，不能用 CSS、emoji、canvas 或手写 SVG 临时模拟。小红书世界杯相关资源来源记录在 `assets-manifest.json` 的 `source` 字段中。

## 项目背景与经验总结

这个项目用于验证 AI 是否能根据视觉参考完成代码还原。最初的输入只有一张截图，AI 可以搭出大致页面结构，但很难做到 100% 还原，主要问题集中在无法从截图中稳定判断真实资源和设计参数：

- 截图只能提供像素结果，不能可靠反推出具体字体、字重、字号、行高和字间距。
- Logo、标题字、图标、国旗、背景图和人物/商品类图片如果没有原始资源，AI 只能猜测或临时模拟，结果会和真实页面明显不同。
- 图片抠图、透明通道、阴影和遮罩如果只从截图处理，容易出现黑底、毛边、压缩噪点或比例不准。
- 页面中的渐变、模糊、叠层、响应式断点和组件状态，仅靠单张截图很难完整推断。
- 视觉测试可以发现差异，但不能替代设计源文件；没有真实资源时，继续调 CSS 往往只能接近，无法稳定复现。

因此，后续让 AI 做高精度还原时，应尽量提供设计稿、切图资源、字体信息和必要的交互状态。AI 更适合把这些明确资源和规则转成可维护、可测试的前端实现，而不是从单张截图中猜出所有不可见的设计资产。

推荐输入材料：

- Figma、Sketch、PSD 或可检查图层的设计稿。
- 导出的 Logo、图标、标题字、背景图、封面图、人物图等原始资源。
- 字体名称、字号、字重、行高、颜色、间距和断点说明。
- hover / active / disabled / loading / empty / error 等状态截图或设计规格。
- 线上参考页地址，方便提取真实 DOM、图片、CSS 背景图和 SVG sprite。
- 期望对齐的截图尺寸、浏览器、设备像素比和验收方式。

## 常用命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm run e2e
pnpm verify
```

## 视觉测试

`pnpm run e2e` 会运行 Playwright 测试。Playwright 的 web server 配置会先执行 `pnpm build`，再启动 `pnpm preview`，确保截图测试验证的是当前构建产物。

如果视觉资源或设计基准发生合理变化，可以更新快照：

```bash
pnpm exec playwright test --update-snapshots
pnpm run e2e
```

更新快照后必须再运行 `pnpm run e2e`，确认完整通过。

## 开发注意事项

- 先补真实资源，再调布局和样式。
- 视觉差异优先查看 expected / actual / diff 图片。
- 不要通过放宽阈值掩盖资源或布局问题。
- 修改资源时同步更新 `assets-manifest.json`。
- 不要回滚或覆盖与当前任务无关的用户改动。
