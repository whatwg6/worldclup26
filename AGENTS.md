# AGENTS.md

## 1. 工作边界

AI 负责实现代码可稳定表达、可重复验证的部分：

- 页面布局、组件结构、响应式布局
- 间距、尺寸、对齐方式
- 普通文本、字体大小、字重、行高
- 颜色、背景色、渐变色、透明度
- 圆角、边框、阴影
- hover / active / disabled 状态
- loading / empty / error 状态
- 基础交互行为
- 数据驱动渲染逻辑

## 2. 不允许用代码临时模拟的内容

以下内容必须使用外部真实资源，不允许用 CSS、文本、emoji、canvas 或手写 SVG 临时模拟：

- 品牌 Logo、品牌字标
- 特殊字体标题
- 图标
- 国旗
- 人物照片、商品图、封面图、背景图
- 插画、复杂纹理、复杂装饰元素
- 截图里的截图
- 设计稿或参考页中已标记为 image / vector / exportable 的资源

如果参考页里存在真实资源，必须优先提取并引用真实资源；不允许用“看起来差不多”的自绘版本替代。

## 3. 资源使用规则

- 所有图片、Logo、图标、背景图必须放在 `src/assets` 或项目约定的 assets 目录。
- 所有资源必须在 `assets-manifest.json` 中声明。
- `mustUse: true` 的真实 UI 资源必须在页面中直接引用。
- 参考截图、expected 快照、设计稿截图只能用于比对和分析，不能作为页面运行时 DOM、背景图、覆盖层或内容图直接渲染。
- 不允许重新绘制已有资源。
- 不允许用 emoji 替代图标或国旗。
- 不允许用文字替代 Logo 或品牌字标。
- 不允许用近似图片替代真实设计资源。

## 4. 从线上参考页提取资源

当用户指定参考页，例如 `https://www.xiaohongshu.com/worldcup26`：

- 先尝试获取页面 HTML、CSS、JS 和运行后 DOM 中的资源地址。
- 如果普通请求拿不到完整内容，要使用浏览器 User-Agent 或 Playwright 渲染页面后提取实际 DOM。
- 对 `img.currentSrc`、CSS `background-image`、SVG sprite symbol、`use href="#..."` 等都要检查。
- 提取到的资源保存到 assets 目录后再引用。
- 资源文件名要表达用途，例如 `xhs-worldcup-nav-icon-dark.webp`、`xhs-nav-home.svg`。
- 记录来源到 `assets-manifest.json` 的 `source` 字段。

不要因为页面上显示的是图标，就在组件里手写 SVG path。若线上 DOM 使用 sprite symbol，可以把 symbol 转为本地 SVG 资源后引用。

## 5. 视觉还原与测试

- 视觉测试失败时，先看 expected / actual / diff 图片，判断差异来自资源、布局、字体、遮罩还是旧构建。
- expected / reference 图片是目标，不是实现材料；禁止为了通过像素比对，把整张基准图、参考截图或截图切片渲染到页面中。
- 页面必须由真实资源、组件结构和 CSS 布局还原；视觉测试通过必须来自实际实现接近目标，而不是用覆盖图遮住页面。
- 不要先调测试阈值。
- 如果 `pnpm run e2e` 使用 `vite preview`，必须确认它测试的是当前构建产物；必要时让 Playwright webServer 先执行 `pnpm build` 再 `pnpm preview`。
- 替换真实资源或更新设计基准后，才可以更新 Playwright 快照。
- 更新快照后必须再运行用户指定命令，例如 `pnpm run e2e`，确认完整通过。

## 6. 实现偏好

- 优先复用已有组件结构和样式体系。
- 修改范围只覆盖当前任务相关文件。
- 对资源型问题，先补资源，再调布局。
- 对视觉差异，先对齐真实资源，再对齐尺寸、位置、字体和颜色。
- 保持无关改动不动，尤其不要回滚用户已有修改。
