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
