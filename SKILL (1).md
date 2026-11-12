---
name: motion-lab
description: Motion.Lab 动效库 — 160 个精选前端动效（基础/文字/交互/高级），每个动效提供可直接复制的 HTML/CSS/JS 源码与可调参数。当用户需要为网页、组件、落地页添加动画效果，或询问"有什么动效推荐"时使用。
---

# Motion.Lab 动效库

Motion.Lab 是一个包含 **160 个精选前端动效**的中文参考库，覆盖基础、文字、交互、高级四大类。每个动效均提供可直接复制的 HTML/CSS/JS 源码，并支持参数调节。

- 线上站点：https://motionlab.uanx.online
- 实验室：https://motionlab.uanx.online/lab
- 源码仓库：https://github.com/yangxu128/Motion.Lab

## 何时使用

当用户出现以下意图时调用本 Skill：

- "帮我给 XX 加个动画/动效"
- "有没有 XX 效果的代码"
- "落地页/按钮/卡片想要 XX 交互"
- "文字想要 XX 特效"
- "背景做个粒子/星空/流体效果"

## 使用流程

1. **检索**：根据用户需求在下方清单中找到对应 `id`（可按关键词、分类、难度筛选）
2. **取码**：直接从下方对应 `id` 的代码块复制 HTML/CSS/JS；或访问 `https://motionlab.uanx.online/lab/<id>` 查看实时预览
3. **调参**：每个动效列出可调参数（range/select），按需修改 CSS 自定义属性或 JS 变量
4. **落地**：将 HTML 放入页面结构、CSS 放入样式表、JS 放入 `<script>` 或模块；参数通过 `style="--key: value"` 或 JS 变量传入

## 分类说明

- **basic（基础）**：进入/退出/循环动画，以纯 CSS 为主，最易集成
- **text（文字）**：文字特效，打字机、渐变、描边、3D 等
- **interaction（交互）**：悬停、点击、拖拽、滚动类交互动效
- **advanced（高级）**：Canvas、Three.js、GLSL 着色器、物理仿真等

## 动效清单与源码

## 基础（basic）— 42 个

| ID | 名称 | 英文名 | 难度 | 说明 |
|----|------|--------|------|------|
| `fade-in` | 淡入 | Fade In | ★☆☆ | 元素从透明渐入到不透明,最基础的进入动画。
| `fade-in-up` | 上滑淡入 | Fade In Up | ★☆☆ | 元素从下方淡入,常用于列表项。
| `slide-in-left` | 左侧滑入 | Slide In Left | ★☆☆ | 元素从左侧滑入视口。
| `slide-in-right` | 右侧滑入 | Slide In Right | ★☆☆ | 元素从右侧滑入视口。
| `zoom-bounce` | 缩放弹跳 | Zoom Bounce | ★☆☆ | 元素放大入场,带弹跳回弹。
| `flip-x` | 水平翻转 | Flip X | ★★☆ | 元素绕 X 轴翻转入场。
| `rotate-in` | 旋转入场 | Rotate In | ★☆☆ | 元素从旋转状态回归原位。
| `pulse` | 脉冲 | Pulse | ★☆☆ | 元素持续放大缩小,吸引注意。
| `shake` | 摇晃 | Shake | ★☆☆ | 元素左右快速摇晃,常用于表单错误提示。
| `heartbeat` | 心跳 | Heartbeat | ★☆☆ | 双拍心跳节奏,模拟真实心跳。
| `marquee` | 跑马灯 | Marquee | ★★☆ | 内容从右向左无限滚动。
| `spinner` | 加载旋转 | Spinner | ★☆☆ | 经典加载指示器。
| `slide-up` | 上滑入场 | Slide Up | ★☆☆ | 元素从下往上滑入并淡入,通用入场动画。
| `slide-down` | 下滑入场 | Slide Down | ★☆☆ | 元素从上往下滑入,适合顶部 banner。
| `bounce-in` | 弹跳入场 | Bounce In | ★★☆ | 元素入场时多次反弹,有节奏感。
| `elastic-in` | 弹性入场 | Elastic In | ★★☆ | 入场时带有明显弹性回弹,生动有趣。
| `fade-out` | 淡出消失 | Fade Out | ★☆☆ | 元素持续淡出后回弹,适合循环演示。
| `scale-pulse` | 缩放呼吸 | Scale Pulse | ★☆☆ | 元素持续缩放形成呼吸效果,比 pulse 更夸张。
| `rotate-360` | 持续旋转 | Rotate 360 | ★☆☆ | 元素持续 360 度旋转,无限循环。
| `swing` | 钟摆 | Swing | ★★☆ | 顶部固定,左右摆动,像钟摆一样。
| `jello` | 果冻 | Jello | ★★☆ | 元素呈现果冻般的扭曲抖动,俏皮可爱。
| `flash` | 闪烁 | Flash | ★☆☆ | 元素透明度快速闪烁,适合新消息/警告提示。
| `fade-in-down` | 上方淡入 | Fade In Down | ★☆☆ | 元素从上方淡入下滑,通用入场动画。
| `fade-in-left` | 左侧淡入 | Fade In Left | ★☆☆ | 元素从左侧淡入滑入,适合横向布局。
| `fade-in-right` | 右侧淡入 | Fade In Right | ★☆☆ | 元素从右侧淡入滑入,横向入场。
| `scale-in` | 缩放入场 | Scale In | ★☆☆ | 元素从较小尺寸缩放到原始大小入场。
| `scale-out` | 缩小归位 | Scale Out | ★☆☆ | 元素从较大尺寸缩小归位,有收束感。
| `flip-y` | 垂直翻转 | Flip Y | ★★☆ | 元素绕 Y 轴翻转入场,类似翻牌。
| `flip-in-3d` | 3D 翻转 | Flip In 3D | ★★☆ | 元素以 3D 透视翻转加缩放入场,立体感强。
| `wobble` | 摇摆 | Wobble | ★★☆ | 元素左右摇摆晃动,俏皮可爱。
| `tada` | 庆祝抖动 | Tada | ★★☆ | 元素放大并轻微旋转抖动,庆祝感强。
| `bounce-down` | 向下弹跳 | Bounce Down | ★★☆ | 元素从上方弹跳落下,带多次反弹。
| `slide-fade-corner` | 角落滑入 | Corner Slide | ★★☆ | 元素从左上角斜向滑入,带淡入。
| `skew-in` | 倾斜入场 | Skew In | ★★☆ | 元素以倾斜状态滑入归位,动感十足。
| `blur-in` | 模糊入场 | Blur In | ★★☆ | 元素从模糊状态渐变到清晰,柔和入场。
| `blur-out` | 模糊呼吸 | Blur Pulse | ★★☆ | 元素在清晰与模糊间循环呼吸,梦幻感。
| `grayscale-in` | 灰度入场 | Grayscale In | ★★☆ | 元素从灰度渐变到彩色,复古转彩色。
| `color-cycle` | 色彩循环 | Color Cycle | ★☆☆ | 元素背景色按 HSL 循环变化,霓虹感。
| `border-draw` | 边框画出 | Border Draw | ★★☆ | 边框按顺时针逐步画出,勾勒轮廓。
| `shadow-grow` | 阴影生长 | Shadow Grow | ★☆☆ | 元素阴影循环生长,产生悬浮呼吸感。
| `gradient-shift` | 渐变流动 | Gradient Shift | ★☆☆ | 渐变背景持续流动,色彩柔和过渡。
| `typewriter-cursor` | 光标打字 | Typing Cursor | ★★☆ | 带闪烁光标的打字效果,逐字输入循环。

### 基础源码

#### `fade-in` — 淡入（Fade In）

元素从透明渐入到不透明,最基础的进入动画。

**参数：**
- `duration` (时长): 范围 0.2–3（步长 0.1）s，默认 0.8
- `delay` (延迟): 范围 0–2（步长 0.1）s，默认 0

**HTML：**
```html
<div class="fade-in">Hello</div>
```

**CSS：**
```css
.fade-in { animation: fadeIn var(--duration, 0.8s) ease-out var(--delay, 0s) both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/fade-in)

---

#### `fade-in-up` — 上滑淡入（Fade In Up）

元素从下方淡入,常用于列表项。

**参数：**
- `duration` (时长): 范围 0.2–3（步长 0.1）s，默认 0.8
- `distance` (距离): 范围 10–80（步长 5）px，默认 20

**HTML：**
```html
<div class="fade-in-up">Hello</div>
```

**CSS：**
```css
.fade-in-up { animation: fadeInUp var(--duration, 0.8s) ease-out both; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(var(--distance, 20px)); } to { opacity: 1; transform: translateY(0); } }
```

**JS：**
```javascript
// Pure CSS
```

[在线预览](https://motionlab.uanx.online/lab/fade-in-up)

---

#### `slide-in-left` — 左侧滑入（Slide In Left）

元素从左侧滑入视口。

**参数：**
- `duration` (时长): 范围 0.2–2（步长 0.1）s，默认 0.6

**HTML：**
```html
<div class="slide-left">→</div>
```

**CSS：**
```css
.slide-left { animation: slideLeft var(--duration, 0.6s) ease-out both; }
@keyframes slideLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/slide-in-left)

---

#### `slide-in-right` — 右侧滑入（Slide In Right）

元素从右侧滑入视口。

**参数：**
- `duration` (时长): 范围 0.2–2（步长 0.1）s，默认 0.6

**HTML：**
```html
<div class="slide-right">←</div>
```

**CSS：**
```css
.slide-right { animation: slideRight var(--duration, 0.6s) ease-out both; }
@keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/slide-in-right)

---

#### `zoom-bounce` — 缩放弹跳（Zoom Bounce）

元素放大入场,带弹跳回弹。

**参数：**
- `duration` (时长): 范围 0.3–2（步长 0.1）s，默认 0.8

**HTML：**
```html
<div class="zoom-bounce">●</div>
```

**CSS：**
```css
.zoom-bounce { animation: zoomBounce var(--duration, 0.8s) cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes zoomBounce { from { transform: scale(0); } to { transform: scale(1); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/zoom-bounce)

---

#### `flip-x` — 水平翻转（Flip X）

元素绕 X 轴翻转入场。

**参数：**
- `duration` (时长): 范围 0.3–2（步长 0.1）s，默认 0.8

**HTML：**
```html
<div class="flip-x">↻</div>
```

**CSS：**
```css
.flip-x { animation: flipX var(--duration, 0.8s) ease-out both; transform-origin: center; }
@keyframes flipX { from { transform: perspective(600px) rotateX(-90deg); opacity: 0; } to { transform: perspective(600px) rotateX(0); opacity: 1; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/flip-x)

---

#### `rotate-in` — 旋转入场（Rotate In）

元素从旋转状态回归原位。

**参数：**
- `duration` (时长): 范围 0.3–2（步长 0.1）s，默认 0.7

**HTML：**
```html
<div class="rotate-in">★</div>
```

**CSS：**
```css
.rotate-in { animation: rotateIn var(--duration, 0.7s) ease-out both; }
@keyframes rotateIn { from { transform: rotate(-180deg) scale(0.3); opacity: 0; } to { transform: rotate(0) scale(1); opacity: 1; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/rotate-in)

---

#### `pulse` — 脉冲（Pulse）

元素持续放大缩小,吸引注意。

**参数：**
- `duration` (周期): 范围 0.5–3（步长 0.1）s，默认 1.5
- `intensity` (强度): 范围 0.05–0.4（步长 0.05），默认 0.15

**HTML：**
```html
<div class="pulse">●</div>
```

**CSS：**
```css
.pulse { animation: pulse var(--duration, 1.5s) ease-in-out infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(calc(1 + var(--intensity, 0.15))); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/pulse)

---

#### `shake` — 摇晃（Shake）

元素左右快速摇晃,常用于表单错误提示。

**参数：**
- `duration` (时长): 范围 0.2–1.5（步长 0.1）s，默认 0.5

**HTML：**
```html
<div class="shake">!</div>
```

**CSS：**
```css
.shake { animation: shake var(--duration, 0.5s); }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/shake)

---

#### `heartbeat` — 心跳（Heartbeat）

双拍心跳节奏,模拟真实心跳。

**参数：**
- `duration` (周期): 范围 0.5–3（步长 0.1）s，默认 1.2

**HTML：**
```html
<div class="heartbeat">♥</div>
```

**CSS：**
```css
.heartbeat { animation: heartbeat var(--duration, 1.2s) ease-in-out infinite; }
@keyframes heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/heartbeat)

---

#### `marquee` — 跑马灯（Marquee）

内容从右向左无限滚动。

**参数：**
- `duration` (周期): 范围 5–30（步长 1）s，默认 12
- `direction` (方向): 选项 ["left","right"]，默认 `left`

**HTML：**
```html
<div class="marquee"><span>Motion.Lab · 动效实验室 · </span><span>Motion.Lab · 动效实验室 · </span></div>
```

**CSS：**
```css
.marquee { display: flex; gap: 32px; animation: marquee var(--duration, 12s) linear infinite; white-space: nowrap; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/marquee)

---

#### `spinner` — 加载旋转（Spinner）

经典加载指示器。

**参数：**
- `duration` (周期): 范围 0.3–2（步长 0.1）s，默认 0.8

**HTML：**
```html
<div class="spinner"></div>
```

**CSS：**
```css
.spinner { width: 32px; height: 32px; border: 3px solid rgba(0,0,0,0.1); border-top-color: var(--accent); border-radius: 50%; animation: spin var(--duration, 0.8s) linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/spinner)

---

#### `slide-up` — 上滑入场（Slide Up）

元素从下往上滑入并淡入,通用入场动画。

**参数：**
- `duration` (时长): 范围 0.2–2（步长 0.1）s，默认 0.6
- `distance` (距离): 范围 20–120（步长 5）px，默认 40

**HTML：**
```html
<div class="slide-up">Slide Up</div>
```

**CSS：**
```css
.slide-up { animation: slideUp var(--duration, 0.6s) ease-out both; }
@keyframes slideUp { from { opacity: 0; transform: translateY(var(--distance, 40px)); } to { opacity: 1; transform: translateY(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/slide-up)

---

#### `slide-down` — 下滑入场（Slide Down）

元素从上往下滑入,适合顶部 banner。

**参数：**
- `duration` (时长): 范围 0.2–2（步长 0.1）s，默认 0.6
- `distance` (距离): 范围 20–120（步长 5）px，默认 40

**HTML：**
```html
<div class="slide-down">Slide Down</div>
```

**CSS：**
```css
.slide-down { animation: slideDown var(--duration, 0.6s) ease-out both; }
@keyframes slideDown { from { opacity: 0; transform: translateY(calc(var(--distance, 40px) * -1)); } to { opacity: 1; transform: translateY(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/slide-down)

---

#### `bounce-in` — 弹跳入场（Bounce In）

元素入场时多次反弹,有节奏感。

**参数：**
- `duration` (时长): 范围 0.5–2（步长 0.1）s，默认 1

**HTML：**
```html
<div class="bounce-in">Bounce</div>
```

**CSS：**
```css
.bounce-in { animation: bounceIn var(--duration, 1s) both; }
@keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.1); opacity: 1; } 70% { transform: scale(0.9); } 85% { transform: scale(1.05); } 100% { transform: scale(1); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/bounce-in)

---

#### `elastic-in` — 弹性入场（Elastic In）

入场时带有明显弹性回弹,生动有趣。

**参数：**
- `duration` (时长): 范围 0.5–2.5（步长 0.1）s，默认 1.2

**HTML：**
```html
<div class="elastic-in">Elastic</div>
```

**CSS：**
```css
.elastic-in { animation: elasticIn var(--duration, 1.2s) cubic-bezier(0.68, -0.55, 0.265, 1.55) both; }
@keyframes elasticIn { 0% { transform: scale(0) rotate(-180deg); opacity: 0; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/elastic-in)

---

#### `fade-out` — 淡出消失（Fade Out）

元素持续淡出后回弹,适合循环演示。

**参数：**
- `duration` (周期): 范围 1–5（步长 0.1）s，默认 2

**HTML：**
```html
<div class="fade-out">Fade Out</div>
```

**CSS：**
```css
.fade-out { animation: fadeOut var(--duration, 2s) ease-in-out infinite alternate; }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/fade-out)

---

#### `scale-pulse` — 缩放呼吸（Scale Pulse）

元素持续缩放形成呼吸效果,比 pulse 更夸张。

**参数：**
- `duration` (周期): 范围 0.6–3（步长 0.1）s，默认 1.4
- `min` (最小): 范围 0.4–0.95（步长 0.05），默认 0.7
- `max` (最大): 范围 1.05–1.6（步长 0.05），默认 1.15

**HTML：**
```html
<div class="scale-pulse">●</div>
```

**CSS：**
```css
.scale-pulse { animation: sp var(--duration, 1.4s) ease-in-out infinite; }
@keyframes sp { 0%, 100% { transform: scale(var(--min, 0.7)); } 50% { transform: scale(var(--max, 1.15)); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/scale-pulse)

---

#### `rotate-360` — 持续旋转（Rotate 360）

元素持续 360 度旋转,无限循环。

**参数：**
- `duration` (周期): 范围 0.5–6（步长 0.1）s，默认 2

**HTML：**
```html
<div class="rotate-360">⟳</div>
```

**CSS：**
```css
.rotate-360 { display: inline-block; animation: rot360 var(--duration, 2s) linear infinite; }
@keyframes rot360 { to { transform: rotate(360deg); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/rotate-360)

---

#### `swing` — 钟摆（Swing）

顶部固定,左右摆动,像钟摆一样。

**参数：**
- `duration` (周期): 范围 0.8–3（步长 0.1）s，默认 1.6

**HTML：**
```html
<div class="swing">⏰</div>
```

**CSS：**
```css
.swing { display: inline-block; transform-origin: top center; animation: swing var(--duration, 1.6s) ease-in-out infinite; }
@keyframes swing { 0%, 100% { transform: rotate(15deg); } 50% { transform: rotate(-15deg); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/swing)

---

#### `jello` — 果冻（Jello）

元素呈现果冻般的扭曲抖动,俏皮可爱。

**参数：**
- `duration` (时长): 范围 0.6–1.5（步长 0.1）s，默认 0.9

**HTML：**
```html
<div class="jello">JELLO</div>
```

**CSS：**
```css
.jello { display: inline-block; animation: jello var(--duration, 0.9s) ease-in-out infinite; transform-origin: center; }
@keyframes jello { 0%, 100% { transform: scale3d(1, 1, 1); } 30% { transform: scale3d(1.25, 0.75, 1); } 40% { transform: scale3d(0.75, 1.25, 1); } 50% { transform: scale3d(1.15, 0.85, 1); } 65% { transform: scale3d(0.95, 1.05, 1); } 75% { transform: scale3d(1.05, 0.95, 1); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/jello)

---

#### `flash` — 闪烁（Flash）

元素透明度快速闪烁,适合新消息/警告提示。

**参数：**
- `duration` (周期): 范围 0.4–2（步长 0.1）s，默认 0.8
- `color` (颜色): 选项 ["red","yellow","blue","green"]，默认 `red`

**HTML：**
```html
<div class="flash">NOTICE</div>
```

**CSS：**
```css
.flash { animation: flash var(--duration, 0.8s) ease-in-out infinite; padding: 12px 20px; background: hsl(0 90% 55%); color: white; border-radius: 8px; font-weight: 700; }
@keyframes flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/flash)

---

#### `fade-in-down` — 上方淡入（Fade In Down）

元素从上方淡入下滑,通用入场动画。

**参数：**
- `duration` (时长): 范围 0.2–3（步长 0.1）s，默认 0.8
- `distance` (距离): 范围 10–80（步长 5）px，默认 20

**HTML：**
```html
<div class="fade-in-down">Hello</div>
```

**CSS：**
```css
.fade-in-down { animation: fadeInDown var(--duration, 0.8s) ease-out both; }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(calc(var(--distance, 20px) * -1)); } to { opacity: 1; transform: translateY(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/fade-in-down)

---

#### `fade-in-left` — 左侧淡入（Fade In Left）

元素从左侧淡入滑入,适合横向布局。

**参数：**
- `duration` (时长): 范围 0.2–3（步长 0.1）s，默认 0.8
- `distance` (距离): 范围 10–80（步长 5）px，默认 24

**HTML：**
```html
<div class="fade-in-left">Hello</div>
```

**CSS：**
```css
.fade-in-left { animation: fadeInLeft var(--duration, 0.8s) ease-out both; }
@keyframes fadeInLeft { from { opacity: 0; transform: translateX(calc(var(--distance, 24px) * -1)); } to { opacity: 1; transform: translateX(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/fade-in-left)

---

#### `fade-in-right` — 右侧淡入（Fade In Right）

元素从右侧淡入滑入,横向入场。

**参数：**
- `duration` (时长): 范围 0.2–3（步长 0.1）s，默认 0.8
- `distance` (距离): 范围 10–80（步长 5）px，默认 24

**HTML：**
```html
<div class="fade-in-right">Hello</div>
```

**CSS：**
```css
.fade-in-right { animation: fadeInRight var(--duration, 0.8s) ease-out both; }
@keyframes fadeInRight { from { opacity: 0; transform: translateX(var(--distance, 24px)); } to { opacity: 1; transform: translateX(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/fade-in-right)

---

#### `scale-in` — 缩放入场（Scale In）

元素从较小尺寸缩放到原始大小入场。

**参数：**
- `duration` (时长): 范围 0.2–2（步长 0.1）s，默认 0.6
- `from` (起始缩放): 范围 0.1–0.9（步长 0.05），默认 0.5

**HTML：**
```html
<div class="scale-in">Scale</div>
```

**CSS：**
```css
.scale-in { animation: scaleIn var(--duration, 0.6s) cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes scaleIn { from { opacity: 0; transform: scale(var(--from, 0.5)); } to { opacity: 1; transform: scale(1); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/scale-in)

---

#### `scale-out` — 缩小归位（Scale Out）

元素从较大尺寸缩小归位,有收束感。

**参数：**
- `duration` (时长): 范围 0.2–2（步长 0.1）s，默认 0.6
- `from` (起始缩放): 范围 1.05–2（步长 0.05），默认 1.2

**HTML：**
```html
<div class="scale-out">Scale</div>
```

**CSS：**
```css
.scale-out { animation: scaleOut var(--duration, 0.6s) cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes scaleOut { from { opacity: 0; transform: scale(var(--from, 1.2)); } to { opacity: 1; transform: scale(1); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/scale-out)

---

#### `flip-y` — 垂直翻转（Flip Y）

元素绕 Y 轴翻转入场,类似翻牌。

**参数：**
- `duration` (时长): 范围 0.3–2（步长 0.1）s，默认 0.8

**HTML：**
```html
<div class="flip-y">↻</div>
```

**CSS：**
```css
.flip-y { animation: flipY var(--duration, 0.8s) ease-out both; transform-origin: center; }
@keyframes flipY { from { transform: perspective(600px) rotateY(-90deg); opacity: 0; } to { transform: perspective(600px) rotateY(0); opacity: 1; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/flip-y)

---

#### `flip-in-3d` — 3D 翻转（Flip In 3D）

元素以 3D 透视翻转加缩放入场,立体感强。

**参数：**
- `duration` (时长): 范围 0.4–2（步长 0.1）s，默认 0.9

**HTML：**
```html
<div class="flip-in-3d">3D</div>
```

**CSS：**
```css
.flip-in-3d { animation: flipIn3d var(--duration, 0.9s) ease-out both; transform-origin: center; }
@keyframes flipIn3d { from { transform: perspective(800px) rotateX(-90deg) rotateY(-30deg) scale(0.6); opacity: 0; } to { transform: perspective(800px) rotateX(0) rotateY(0) scale(1); opacity: 1; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/flip-in-3d)

---

#### `wobble` — 摇摆（Wobble）

元素左右摇摆晃动,俏皮可爱。

**参数：**
- `duration` (时长): 范围 0.6–2（步长 0.1）s，默认 1

**HTML：**
```html
<div class="wobble">Wobble</div>
```

**CSS：**
```css
.wobble { display: inline-block; animation: wobble var(--duration, 1s) ease-in-out infinite; transform-origin: center; }
@keyframes wobble { 0%, 100% { transform: translateX(0) rotate(0); } 15% { transform: translateX(-12%) rotate(-5deg); } 30% { transform: translateX(10%) rotate(3deg); } 45% { transform: translateX(-8%) rotate(-3deg); } 60% { transform: translateX(6%) rotate(2deg); } 75% { transform: translateX(-3%) rotate(-1deg); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/wobble)

---

#### `tada` — 庆祝抖动（Tada）

元素放大并轻微旋转抖动,庆祝感强。

**参数：**
- `duration` (时长): 范围 0.6–2（步长 0.1）s，默认 1

**HTML：**
```html
<div class="tada">Tada!</div>
```

**CSS：**
```css
.tada { display: inline-block; animation: tada var(--duration, 1s) ease-in-out infinite; transform-origin: center; }
@keyframes tada { 0%, 100% { transform: scale(1) rotate(0); } 10%, 20% { transform: scale(0.9) rotate(-3deg); } 30%, 50%, 70%, 90% { transform: scale(1.15) rotate(3deg); } 40%, 60%, 80% { transform: scale(1.15) rotate(-3deg); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/tada)

---

#### `bounce-down` — 向下弹跳（Bounce Down）

元素从上方弹跳落下,带多次反弹。

**参数：**
- `duration` (时长): 范围 0.6–2（步长 0.1）s，默认 1
- `distance` (距离): 范围 20–120（步长 5）px，默认 60

**HTML：**
```html
<div class="bounce-down">Bounce</div>
```

**CSS：**
```css
.bounce-down { animation: bounceDown var(--duration, 1s) cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes bounceDown { 0% { transform: translateY(calc(var(--distance, 60px) * -1)); opacity: 0; } 60% { transform: translateY(8px); opacity: 1; } 80% { transform: translateY(-4px); } 100% { transform: translateY(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/bounce-down)

---

#### `slide-fade-corner` — 角落滑入（Corner Slide）

元素从左上角斜向滑入,带淡入。

**参数：**
- `duration` (时长): 范围 0.3–2（步长 0.1）s，默认 0.8

**HTML：**
```html
<div class="corner-slide">Corner</div>
```

**CSS：**
```css
.corner-slide { animation: cornerSlide var(--duration, 0.8s) cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes cornerSlide { from { opacity: 0; transform: translate(-40px, -40px) scale(0.8); } to { opacity: 1; transform: translate(0, 0) scale(1); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/slide-fade-corner)

---

#### `skew-in` — 倾斜入场（Skew In）

元素以倾斜状态滑入归位,动感十足。

**参数：**
- `duration` (时长): 范围 0.3–2（步长 0.1）s，默认 0.7
- `angle` (角度): 范围 5–30（步长 1）°，默认 15

**HTML：**
```html
<div class="skew-in">Skew</div>
```

**CSS：**
```css
.skew-in { animation: skewIn var(--duration, 0.7s) ease-out both; }
@keyframes skewIn { from { opacity: 0; transform: skewX(calc(var(--angle, 15deg) * -1)) translateX(-30px); } to { opacity: 1; transform: skewX(0) translateX(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/skew-in)

---

#### `blur-in` — 模糊入场（Blur In）

元素从模糊状态渐变到清晰,柔和入场。

**参数：**
- `duration` (时长): 范围 0.3–2（步长 0.1）s，默认 0.8
- `blur` (模糊): 范围 4–30（步长 1）px，默认 14

**HTML：**
```html
<div class="blur-in">Blur</div>
```

**CSS：**
```css
.blur-in { animation: blurIn var(--duration, 0.8s) ease-out both; }
@keyframes blurIn { from { opacity: 0; filter: blur(var(--blur, 14px)); transform: scale(1.05); } to { opacity: 1; filter: blur(0); transform: scale(1); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/blur-in)

---

#### `blur-out` — 模糊呼吸（Blur Pulse）

元素在清晰与模糊间循环呼吸,梦幻感。

**参数：**
- `duration` (周期): 范围 1–5（步长 0.1）s，默认 2.4
- `blur` (模糊): 范围 2–16（步长 1）px，默认 8

**HTML：**
```html
<div class="blur-out">Pulse</div>
```

**CSS：**
```css
.blur-out { animation: blurOut var(--duration, 2.4s) ease-in-out infinite; }
@keyframes blurOut { 0%, 100% { filter: blur(0); opacity: 1; } 50% { filter: blur(var(--blur, 8px)); opacity: 0.6; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/blur-out)

---

#### `grayscale-in` — 灰度入场（Grayscale In）

元素从灰度渐变到彩色,复古转彩色。

**参数：**
- `duration` (时长): 范围 0.5–3（步长 0.1）s，默认 1.2

**HTML：**
```html
<div class="grayscale-in">Color</div>
```

**CSS：**
```css
.grayscale-in { animation: grayscaleIn var(--duration, 1.2s) ease-out both; }
@keyframes grayscaleIn { from { filter: grayscale(1) brightness(1.2); opacity: 0.4; } to { filter: grayscale(0) brightness(1); opacity: 1; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/grayscale-in)

---

#### `color-cycle` — 色彩循环（Color Cycle）

元素背景色按 HSL 循环变化,霓虹感。

**参数：**
- `duration` (周期): 范围 1–8（步长 0.2）s，默认 3

**HTML：**
```html
<div class="color-cycle">Cycle</div>
```

**CSS：**
```css
.color-cycle { animation: colorCycle var(--duration, 3s) linear infinite; }
@keyframes colorCycle { 0% { background: hsl(0 90% 60%); } 25% { background: hsl(90 90% 55%); } 50% { background: hsl(180 90% 55%); } 75% { background: hsl(270 90% 60%); } 100% { background: hsl(360 90% 60%); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/color-cycle)

---

#### `border-draw` — 边框画出（Border Draw）

边框按顺时针逐步画出,勾勒轮廓。

**参数：**
- `duration` (时长): 范围 0.6–3（步长 0.1）s，默认 1.4

**HTML：**
```html
<div class="border-draw">Draw</div>
```

**CSS：**
```css
.border-draw { position: relative; padding: 24px 32px; }
.border-draw::before { content: ""; position: absolute; inset: 0; padding: 2px; border-radius: 12px; background: linear-gradient(90deg, hsl(280 90% 60%), hsl(200 90% 60%)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; background-size: 300% 300%; animation: borderDraw var(--duration, 1.4s) ease-in-out infinite alternate; }
@keyframes borderDraw { to { background-position: 100% 100%; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/border-draw)

---

#### `shadow-grow` — 阴影生长（Shadow Grow）

元素阴影循环生长,产生悬浮呼吸感。

**参数：**
- `duration` (周期): 范围 1–4（步长 0.1）s，默认 2

**HTML：**
```html
<div class="shadow-grow">Float</div>
```

**CSS：**
```css
.shadow-grow { animation: shadowGrow var(--duration, 2s) ease-in-out infinite; }
@keyframes shadowGrow { 0%, 100% { box-shadow: 0 4px 10px rgba(0,0,0,0.1); transform: translateY(0); } 50% { box-shadow: 0 24px 40px rgba(0,0,0,0.25); transform: translateY(-6px); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/shadow-grow)

---

#### `gradient-shift` — 渐变流动（Gradient Shift）

渐变背景持续流动,色彩柔和过渡。

**参数：**
- `duration` (周期): 范围 2–10（步长 0.5）s，默认 5

**HTML：**
```html
<div class="gradient-shift">Flow</div>
```

**CSS：**
```css
.gradient-shift { background: linear-gradient(120deg, hsl(280 90% 60%), hsl(200 90% 60%), hsl(320 90% 60%), hsl(280 90% 60%)); background-size: 300% 300%; animation: gradientShift var(--duration, 5s) ease infinite; }
@keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/gradient-shift)

---

#### `typewriter-cursor` — 光标打字（Typing Cursor）

带闪烁光标的打字效果,逐字输入循环。

**参数：**
- `speed` (速度): 范围 30–250（步长 10）ms，默认 90

**HTML：**
```html
<span id="tw-cursor"></span>
```

**CSS：**
```css
#tw-cursor { font-family: monospace; font-weight: 800; }
#tw-cursor::after { content: "▌"; margin-left: 2px; animation: blink 0.8s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }
```

**JS：**
```javascript
const el = document.getElementById('tw-cursor');
const text = 'Typing...';
let i = 0;
setInterval(() => { el.textContent = text.slice(0, i++ % (text.length + 1)); }, 90);
```

[在线预览](https://motionlab.uanx.online/lab/typewriter-cursor)

---

## 文字（text）— 40 个

| ID | 名称 | 英文名 | 难度 | 说明 |
|----|------|--------|------|------|
| `typewriter` | 打字机 | Typewriter | ★☆☆ | 字符逐个出现,模拟键盘输入。
| `wave-text` | 波浪文字 | Wave Text | ★★☆ | 每个字符上下波动形成波浪。
| `mask-reveal` | 遮罩揭示 | Mask Reveal | ★★☆ | 文字从遮罩下方揭示,常用于 hero 标题。
| `split-char` | 字符分裂 | Split Character | ★★☆ | 每个字符从上下分开再合拢。
| `gradient-text` | 渐变文字 | Gradient Text | ★☆☆ | 文字使用 HSL 渐变背景 + 循环动画。
| `glitch-text` | 故障文字 | Glitch Text | ★★★ | RGB 分离故障效果,赛博朋克风。
| `scramble` | 乱码解码 | Scramble | ★★★ | 文字先以乱码出现,逐渐解码为目标文字。
| `count-up` | 数字滚动 | Count Up | ★★☆ | 数字从 0 滚动到目标值。
| `stagger-fade` | 错落淡入 | Stagger Fade | ★★☆ | 多个文字依次淡入,带 stagger 延迟。
| `vertical-marquee` | 垂直跑马灯 | Vertical Marquee | ★★☆ | 文字从下往上垂直滚动。
| `text-shadow-shift` | 阴影偏移 | Shadow Shift | ★★☆ | 文字阴影循环偏移,产生霓虹闪烁感。
| `text-3d` | 3D 文字 | 3D Text | ★★☆ | 多层文字堆叠形成 3D 立体透视效果。
| `text-rotate-in` | 字符旋转 | Char Rotate | ★★☆ | 每个字符依次旋转入场,强调感强。
| `letter-spacing-wave` | 字距呼吸 | Letter Spacing | ★☆☆ | 字间距循环变化,产生呼吸节奏。
| `underline-draw` | 下划线 | Underline Draw | ★☆☆ | 下划线从左到右逐段画出,适合链接。
| `highlight-sweep` | 高亮扫过 | Highlight Sweep | ★★☆ | 高亮条从左到右扫过文字,常用于强调。
| `text-blink-cursor` | 闪烁光标 | Blink Cursor | ★☆☆ | 模拟终端的闪烁光标,极简风格。
| `rainbow-text` | 彩虹文字 | Rainbow Text | ★☆☆ | 文字颜色按彩虹色循环变化。
| `text-flip-3d` | 3D 翻面 | Flip 3D | ★★☆ | 文字整体绕 Y 轴 360 度翻转,类似卡片。
| `number-marquee` | 数字翻牌 | Number Marquee | ★★★ | 类似时钟翻页的数字滚动效果。
| `text-fade-up` | 文字上滑 | Text Fade Up | ★☆☆ | 文字从下方淡入上滑,优雅入场。
| `text-slide-left` | 文字左滑 | Text Slide Left | ★☆☆ | 文字从右侧滑入归位,横向入场。
| `text-zoom-in` | 文字缩放 | Text Zoom In | ★☆☆ | 文字从远处缩放放大入场,有冲击力。
| `text-blur-reveal` | 模糊揭示 | Blur Reveal | ★★☆ | 文字从模糊状态揭示为清晰,柔和神秘。
| `text-glitch-rgb` | RGB 故障 | RGB Glitch | ★★★ | 文字 RGB 三通道分离故障,赛博朋克风。
| `text-neon` | 霓虹发光 | Neon Text | ★★☆ | 文字带霓虹灯发光效果,夜店招牌感。
| `text-fire` | 火焰文字 | Fire Text | ★★★ | 文字带火焰渐变与跳动,炽热燃烧感。
| `text-ice` | 冰霜文字 | Ice Text | ★★★ | 文字带冰霜蓝白渐变与结晶光泽,寒冷感。
| `text-metallic` | 金属质感 | Metallic Text | ★★★ | 文字带金属光泽渐变,质感高级。
| `text-outline` | 描边文字 | Outline Text | ★★☆ | 文字仅描边显示并循环呼吸,极简风格。
| `text-typewriter-multi` | 多行打字 | Multi Typewriter | ★★☆ | 多行文字依次打字输入,循环切换。
| `text-delete-retype` | 删除重打 | Delete Retype | ★★☆ | 文字打完后删除再重新输入,循环演示。
| `text-wave-3d` | 3D 波浪 | Wave 3D | ★★☆ | 字符以 3D 透视上下波浪起伏,立体波浪。
| `text-bounce` | 弹跳文字 | Bounce Text | ★★☆ | 字符依次弹跳,活泼有趣。
| `text-rainbow-shift` | 彩虹偏移 | Rainbow Shift | ★☆☆ | 文字彩虹色循环并轻微偏移,梦幻。
| `text-shadow-long` | 长投影 | Long Shadow | ★★☆ | 文字带超长投影,层叠立体感强。
| `text-stroke-animate` | 描边动画 | Stroke Animate | ★★★ | SVG 描边文字按路径逐步绘制,书写感。
| `text-split-reveal` | 分裂揭示 | Split Reveal | ★★★ | 文字从中间分裂上下展开揭示,戏剧性。
| `text-char-fall` | 字符下落 | Char Fall | ★★☆ | 字符从上方依次下落入位,瀑布感。
| `text-word-fly` | 词语飞入 | Word Fly | ★★☆ | 词语依次从远处飞入,带 stagger 延迟。

### 文字源码

#### `typewriter` — 打字机（Typewriter）

字符逐个出现,模拟键盘输入。

**参数：**
- `speed` (速度): 范围 20–200（步长 10）ms，默认 80

**HTML：**
```html
<div id="typewriter"></div>
```

**CSS：**
```css
#typewriter { font-family: monospace; border-right: 2px solid currentColor; padding-right: 4px; animation: caret 0.8s step-end infinite; }
@keyframes caret { 50% { border-color: transparent; } }
```

**JS：**
```javascript
const el = document.getElementById('typewriter');
const text = 'Hello, Motion.Lab!';
let i = 0;
setInterval(() => { el.textContent = text.slice(0, i++ % (text.length + 1)); }, 80);
```

[在线预览](https://motionlab.uanx.online/lab/typewriter)

---

#### `wave-text` — 波浪文字（Wave Text）

每个字符上下波动形成波浪。

**参数：**
- `duration` (周期): 范围 0.8–3（步长 0.1）s，默认 1.6

**HTML：**
```html
<span class="wave-text">WAVE</span>
```

**CSS：**
```css
.wave-text span { display: inline-block; animation: wave var(--duration, 1.6s) ease-in-out infinite; }
.wave-text span:nth-child(n) { animation-delay: calc(0.1s * n); }
@keyframes wave { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
```

**JS：**
```javascript
document.querySelectorAll('.wave-text').forEach(el => el.innerHTML = [...el.textContent].map(c => `<span>${c}</span>`).join(''));
```

[在线预览](https://motionlab.uanx.online/lab/wave-text)

---

#### `mask-reveal` — 遮罩揭示（Mask Reveal）

文字从遮罩下方揭示,常用于 hero 标题。

**参数：**
- `duration` (时长): 范围 0.4–2.5（步长 0.1）s，默认 1.2

**HTML：**
```html
<h1 class="mask-reveal">MOTION</h1>
```

**CSS：**
```css
.mask-reveal { clip-path: inset(0 0 100% 0); animation: reveal var(--duration, 1.2s) cubic-bezier(0.65, 0, 0.35, 1) forwards; }
@keyframes reveal { to { clip-path: inset(0 0 0 0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/mask-reveal)

---

#### `split-char` — 字符分裂（Split Character）

每个字符从上下分开再合拢。

**参数：**
- `duration` (时长): 范围 0.4–2（步长 0.1）s，默认 0.8

**HTML：**
```html
<h1 class="split-char">SPLIT</h1>
```

**CSS：**
```css
.split-char span { display: inline-block; animation: split var(--duration, 0.8s) ease-out both; }
.split-char span:nth-child(odd) { animation-name: splitTop; }
.split-char span:nth-child(even) { animation-name: splitBot; }
@keyframes splitTop { from { transform: translateY(-100%); } to { transform: translateY(0); } }
@keyframes splitBot { from { transform: translateY(100%); } to { transform: translateY(0); } }
```

**JS：**
```javascript
[...document.querySelector('.split-char').textContent].forEach(c => { const s = document.createElement('span'); s.textContent = c; c.replaceWith(s); });
```

[在线预览](https://motionlab.uanx.online/lab/split-char)

---

#### `gradient-text` — 渐变文字（Gradient Text）

文字使用 HSL 渐变背景 + 循环动画。

**参数：**
- `duration` (周期): 范围 2–10（步长 0.5）s，默认 4

**HTML：**
```html
<h1 class="gradient-text">COLOR</h1>
```

**CSS：**
```css
.gradient-text { background: linear-gradient(90deg, hsl(0 90% 60%), hsl(120 90% 60%), hsl(240 90% 60%)); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: hue var(--duration, 4s) linear infinite; }
@keyframes hue { to { background-position: 200% 0; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/gradient-text)

---

#### `glitch-text` — 故障文字（Glitch Text）

RGB 分离故障效果,赛博朋克风。

**参数：**
- `duration` (周期): 范围 1–5（步长 0.1）s，默认 2.5

**HTML：**
```html
<h1 class="glitch" data-text="GLITCH">GLITCH</h1>
```

**CSS：**
```css
.glitch { position: relative; }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; inset: 0; }
.glitch::before { color: cyan; animation: glitchA var(--duration, 2.5s) infinite; }
.glitch::after { color: magenta; animation: glitchB var(--duration, 2.5s) infinite; }
@keyframes glitchA { 0%, 100% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(2px, -1px); } }
@keyframes glitchB { 0%, 100% { transform: translate(0); } 20% { transform: translate(2px, -1px); } 40% { transform: translate(-1px, 2px); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/glitch-text)

---

#### `scramble` — 乱码解码（Scramble）

文字先以乱码出现,逐渐解码为目标文字。

**参数：**
- `duration` (时长): 范围 0.5–3（步长 0.1）s，默认 1.5

**HTML：**
```html
<span id="scramble"></span>
```

**CSS：**
```css
#scramble { font-family: monospace; }
```

**JS：**
```javascript
const el = document.getElementById('scramble');
const target = 'SCRAMBLE';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%';
let frame = 0;
const interval = setInterval(() => {
  el.textContent = target.split('').map((c, i) => i < frame / 3 ? c : chars[Math.floor(Math.random() * chars.length)]).join('');
  if (frame++ > target.length * 3) clearInterval(interval);
}, 50);
```

[在线预览](https://motionlab.uanx.online/lab/scramble)

---

#### `count-up` — 数字滚动（Count Up）

数字从 0 滚动到目标值。

**参数：**
- `target` (目标值): 范围 10–9999（步长 1），默认 1234

**HTML：**
```html
<span id="count-up">0</span>
```

**CSS：**
```css
#count-up { font-variant-numeric: tabular-nums; font-weight: 900; font-size: 48px; }
```

**JS：**
```javascript
const el = document.getElementById('count-up');
const target = 1234;
const duration = 1500;
const start = performance.now();
const tick = (now) => {
  const t = Math.min(1, (now - start) / duration);
  el.textContent = Math.floor(target * (1 - Math.pow(1 - t, 3)));
  if (t < 1) requestAnimationFrame(tick);
};
requestAnimationFrame(tick);
```

[在线预览](https://motionlab.uanx.online/lab/count-up)

---

#### `stagger-fade` — 错落淡入（Stagger Fade）

多个文字依次淡入,带 stagger 延迟。

**参数：**
- `duration` (单项时长): 范围 0.2–1.5（步长 0.1）s，默认 0.5
- `stagger` (间隔): 范围 0.05–0.5（步长 0.05）s，默认 0.1

**HTML：**
```html
<ul class="stagger"><li>一</li><li>二</li><li>三</li><li>四</li></ul>
```

**CSS：**
```css
.stagger li { opacity: 0; animation: fadeIn var(--duration, 0.5s) ease-out forwards; }
.stagger li:nth-child(1) { animation-delay: 0s; }
.stagger li:nth-child(2) { animation-delay: var(--stagger, 0.1s); }
.stagger li:nth-child(3) { animation-delay: calc(var(--stagger, 0.1s) * 2); }
.stagger li:nth-child(4) { animation-delay: calc(var(--stagger, 0.1s) * 3); }
@keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/stagger-fade)

---

#### `vertical-marquee` — 垂直跑马灯（Vertical Marquee）

文字从下往上垂直滚动。

**参数：**
- `duration` (周期): 范围 5–30（步长 1）s，默认 15

**HTML：**
```html
<div class="vmarquee"><div>设计 · 设计 · 设计 · 设计</div><div>设计 · 设计 · 设计 · 设计</div></div>
```

**CSS：**
```css
.vmarquee { height: 60px; overflow: hidden; }
.vmarquee > div { animation: vm var(--duration, 15s) linear infinite; }
@keyframes vm { from { transform: translateY(0); } to { transform: translateY(-100%); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/vertical-marquee)

---

#### `text-shadow-shift` — 阴影偏移（Shadow Shift）

文字阴影循环偏移,产生霓虹闪烁感。

**参数：**
- `duration` (周期): 范围 1–4（步长 0.1）s，默认 2
- `intensity` (强度): 范围 2–12（步长 1）px，默认 6

**HTML：**
```html
<h1 class="tss">SHADOW</h1>
```

**CSS：**
```css
.tss { font-size: 36px; font-weight: 900; color: white; text-shadow: var(--intensity, 6px) 0 hsl(320 90% 60%); animation: tss var(--duration, 2s) ease-in-out infinite alternate; }
@keyframes tss { from { text-shadow: var(--intensity, 6px) 0 hsl(320 90% 60%); } to { text-shadow: calc(var(--intensity, 6px) * -1) 0 hsl(180 90% 60%); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-shadow-shift)

---

#### `text-3d` — 3D 文字（3D Text）

多层文字堆叠形成 3D 立体透视效果。

**参数：**
- `layers` (层数): 范围 3–12（步长 1），默认 6
- `depth` (深度): 范围 1–4（步长 1）px，默认 2

**HTML：**
```html
<h1 class="t3d" data-text="3D">3D</h1>
```

**CSS：**
```css
.t3d { position: relative; font-size: 56px; font-weight: 900; color: white; }
.t3d::before, .t3d::after { content: attr(data-text); position: absolute; inset: 0; }
.t3d::before { color: hsl(320 90% 60%); transform: translate(var(--depth, 2px), var(--depth, 2px)); }
.t3d::after { color: hsl(200 90% 60%); transform: translate(calc(var(--depth, 2px) * -1), calc(var(--depth, 2px) * -1)); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-3d)

---

#### `text-rotate-in` — 字符旋转（Char Rotate）

每个字符依次旋转入场,强调感强。

**参数：**
- `duration` (单项时长): 范围 0.3–1.2（步长 0.1）s，默认 0.6
- `stagger` (间隔): 范围 0.05–0.4（步长 0.05）s，默认 0.1

**HTML：**
```html
<h1 class="tri">ROTATE</h1>
```

**CSS：**
```css
.tri span { display: inline-block; opacity: 0; animation: tri var(--duration, 0.6s) ease-out forwards; }
.tri span:nth-child(1) { animation-delay: 0s; }
.tri span:nth-child(2) { animation-delay: var(--stagger, 0.1s); }
.tri span:nth-child(3) { animation-delay: calc(var(--stagger, 0.1s) * 2); }
@keyframes tri { from { opacity: 0; transform: rotateY(180deg); } to { opacity: 1; transform: rotateY(0); } }
```

**JS：**
```javascript
[...document.querySelector('.tri').textContent].forEach(c => { const s = document.createElement('span'); s.textContent = c; c.replaceWith(s); });
```

[在线预览](https://motionlab.uanx.online/lab/text-rotate-in)

---

#### `letter-spacing-wave` — 字距呼吸（Letter Spacing）

字间距循环变化,产生呼吸节奏。

**参数：**
- `duration` (周期): 范围 1–5（步长 0.1）s，默认 2.5
- `max` (最大间距): 范围 4–24（步长 1）px，默认 12

**HTML：**
```html
<h1 class="lsw">BREATHE</h1>
```

**CSS：**
```css
.lsw { font-size: 32px; font-weight: 900; letter-spacing: 0; animation: lsw var(--duration, 2.5s) ease-in-out infinite; }
@keyframes lsw { 0%, 100% { letter-spacing: 0; } 50% { letter-spacing: var(--max, 12px); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/letter-spacing-wave)

---

#### `underline-draw` — 下划线（Underline Draw）

下划线从左到右逐段画出,适合链接。

**参数：**
- `duration` (时长): 范围 0.4–2（步长 0.1）s，默认 0.8

**HTML：**
```html
<a class="ul-draw">HOVER LINK</a>
```

**CSS：**
```css
.ul-draw { position: relative; font-size: 28px; font-weight: 700; color: inherit; text-decoration: none; }
.ul-draw::after { content: ""; position: absolute; left: 0; bottom: -4px; height: 3px; width: 0; background: currentColor; animation: ulDraw var(--duration, 0.8s) ease-out forwards; }
@keyframes ulDraw { to { width: 100%; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/underline-draw)

---

#### `highlight-sweep` — 高亮扫过（Highlight Sweep）

高亮条从左到右扫过文字,常用于强调。

**参数：**
- `duration` (周期): 范围 1.5–4（步长 0.1）s，默认 2.5

**HTML：**
```html
<h1 class="hl-sweep">SWEEP</h1>
```

**CSS：**
```css
.hl-sweep { position: relative; display: inline-block; font-size: 36px; font-weight: 900; }
.hl-sweep::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, hsl(50 100% 60%), transparent); transform: translateX(-100%); animation: sweep var(--duration, 2.5s) ease-in-out infinite; mix-blend-mode: multiply; }
@keyframes sweep { 50% { transform: translateX(100%); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/highlight-sweep)

---

#### `text-blink-cursor` — 闪烁光标（Blink Cursor）

模拟终端的闪烁光标,极简风格。

**参数：**
- `speed` (速度): 范围 0.3–1.5（步长 0.1）s，默认 0.8

**HTML：**
```html
<span class="cursor-t">输入中</span>
```

**CSS：**
```css
.cursor-t { font-family: monospace; font-size: 24px; font-weight: 700; }
.cursor-t::after { content: "_"; margin-left: 2px; animation: blink var(--speed, 0.8s) step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-blink-cursor)

---

#### `rainbow-text` — 彩虹文字（Rainbow Text）

文字颜色按彩虹色循环变化。

**参数：**
- `duration` (周期): 范围 1–6（步长 0.1）s，默认 3

**HTML：**
```html
<h1 class="rainbow">RAINBOW</h1>
```

**CSS：**
```css
.rainbow { font-size: 40px; font-weight: 900; background: linear-gradient(90deg, hsl(0 90% 60%), hsl(60 90% 60%), hsl(120 90% 60%), hsl(180 90% 60%), hsl(240 90% 60%), hsl(300 90% 60%), hsl(360 90% 60%)); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: rb var(--duration, 3s) linear infinite; }
@keyframes rb { to { background-position: 200% 0; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/rainbow-text)

---

#### `text-flip-3d` — 3D 翻面（Flip 3D）

文字整体绕 Y 轴 360 度翻转,类似卡片。

**参数：**
- `duration` (周期): 范围 1–4（步长 0.1）s，默认 2

**HTML：**
```html
<div class="flip3d-wrap"><h1 class="flip3d">FLIP</h1></div>
```

**CSS：**
```css
.flip3d-wrap { perspective: 600px; }
.flip3d { font-size: 40px; font-weight: 900; display: inline-block; animation: flip3d var(--duration, 2s) ease-in-out infinite; transform-style: preserve-3d; }
@keyframes flip3d { 0% { transform: rotateY(0); } 50% { transform: rotateY(360deg); } 100% { transform: rotateY(360deg); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-flip-3d)

---

#### `number-marquee` — 数字翻牌（Number Marquee）

类似时钟翻页的数字滚动效果。

**参数：**
- `speed` (速度): 范围 200–1500（步长 100）ms，默认 600

**HTML：**
```html
<div class="nmarquee"><span class="num" data-num="0"></span></div>
```

**CSS：**
```css
.nmarquee { display: flex; gap: 8px; font-family: monospace; font-size: 48px; font-weight: 900; height: 60px; overflow: hidden; }
.nmarquee .num { position: relative; height: 60px; min-width: 40px; text-align: center; }
.nmarquee .num-track { position: absolute; left: 0; right: 0; transition: transform 0.5s ease; }
```

**JS：**
```javascript
const numEl = document.querySelector('.num');
let cur = 0;
function render() {
  let track = '';
  for (let i = 0; i < 10; i++) track += `<div>${i}</div>`;
  numEl.innerHTML = `<div class="num-track" style="transform:translateY(-${cur * 60}px)">${track}</div>`;
  cur = (cur + 1) % 10;
}
render();
setInterval(render, params.speed);
```

[在线预览](https://motionlab.uanx.online/lab/number-marquee)

---

#### `text-fade-up` — 文字上滑（Text Fade Up）

文字从下方淡入上滑,优雅入场。

**参数：**
- `duration` (时长): 范围 0.4–2（步长 0.1）s，默认 0.9
- `distance` (距离): 范围 10–60（步长 5）px，默认 24

**HTML：**
```html
<h1 class="text-fade-up">MOTION</h1>
```

**CSS：**
```css
.text-fade-up { animation: textFadeUp var(--duration, 0.9s) cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes textFadeUp { from { opacity: 0; transform: translateY(var(--distance, 24px)); } to { opacity: 1; transform: translateY(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-fade-up)

---

#### `text-slide-left` — 文字左滑（Text Slide Left）

文字从右侧滑入归位,横向入场。

**参数：**
- `duration` (时长): 范围 0.4–2（步长 0.1）s，默认 0.8
- `distance` (距离): 范围 20–100（步长 5）px，默认 40

**HTML：**
```html
<h1 class="text-slide-left">SLIDE</h1>
```

**CSS：**
```css
.text-slide-left { animation: textSlideLeft var(--duration, 0.8s) cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes textSlideLeft { from { opacity: 0; transform: translateX(var(--distance, 40px)); } to { opacity: 1; transform: translateX(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-slide-left)

---

#### `text-zoom-in` — 文字缩放（Text Zoom In）

文字从远处缩放放大入场,有冲击力。

**参数：**
- `duration` (时长): 范围 0.4–2（步长 0.1）s，默认 0.8

**HTML：**
```html
<h1 class="text-zoom-in">ZOOM</h1>
```

**CSS：**
```css
.text-zoom-in { animation: textZoomIn var(--duration, 0.8s) cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes textZoomIn { from { opacity: 0; transform: scale(0.3); letter-spacing: 0.3em; } to { opacity: 1; transform: scale(1); letter-spacing: -0.02em; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-zoom-in)

---

#### `text-blur-reveal` — 模糊揭示（Blur Reveal）

文字从模糊状态揭示为清晰,柔和神秘。

**参数：**
- `duration` (时长): 范围 0.5–2.5（步长 0.1）s，默认 1.2

**HTML：**
```html
<h1 class="text-blur-reveal">REVEAL</h1>
```

**CSS：**
```css
.text-blur-reveal { animation: textBlurReveal var(--duration, 1.2s) ease-out both; }
@keyframes textBlurReveal { from { opacity: 0; filter: blur(20px); letter-spacing: 0.4em; } to { opacity: 1; filter: blur(0); letter-spacing: -0.02em; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-blur-reveal)

---

#### `text-glitch-rgb` — RGB 故障（RGB Glitch）

文字 RGB 三通道分离故障,赛博朋克风。

**参数：**
- `duration` (周期): 范围 1–5（步长 0.1）s，默认 2

**HTML：**
```html
<h1 class="rgb-glitch" data-text="RGB">RGB</h1>
```

**CSS：**
```css
.rgb-glitch { position: relative; }
.rgb-glitch::before, .rgb-glitch::after { content: attr(data-text); position: absolute; inset: 0; mix-blend-mode: screen; }
.rgb-glitch::before { color: hsl(0 100% 55%); animation: rgbR var(--duration, 2s) infinite; }
.rgb-glitch::after { color: hsl(180 100% 55%); animation: rgbB var(--duration, 2s) infinite; }
@keyframes rgbR { 0%, 100% { transform: translate(0); } 20% { transform: translate(-3px, 1px); } 40% { transform: translate(2px, -2px); } 60% { transform: translate(-1px, 2px); } }
@keyframes rgbB { 0%, 100% { transform: translate(0); } 20% { transform: translate(3px, -1px); } 40% { transform: translate(-2px, 2px); } 60% { transform: translate(1px, -2px); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-glitch-rgb)

---

#### `text-neon` — 霓虹发光（Neon Text）

文字带霓虹灯发光效果,夜店招牌感。

**参数：**
- `duration` (周期): 范围 1–4（步长 0.1）s，默认 2

**HTML：**
```html
<h1 class="text-neon">NEON</h1>
```

**CSS：**
```css
.text-neon { color: hsl(320 100% 70%); text-shadow: 0 0 6px hsl(320 100% 60%), 0 0 14px hsl(320 100% 55%), 0 0 28px hsl(320 100% 50%), 0 0 50px hsl(320 100% 45%); animation: neonFlicker var(--duration, 2s) ease-in-out infinite; }
@keyframes neonFlicker { 0%, 100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.4; } 94% { opacity: 1; } 96% { opacity: 0.6; } 97% { opacity: 1; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-neon)

---

#### `text-fire` — 火焰文字（Fire Text）

文字带火焰渐变与跳动,炽热燃烧感。

**参数：**
- `duration` (周期): 范围 1–4（步长 0.1）s，默认 2

**HTML：**
```html
<h1 class="text-fire">FIRE</h1>
```

**CSS：**
```css
.text-fire { background: linear-gradient(0deg, hsl(0 90% 50%), hsl(20 100% 55%), hsl(45 100% 60%), hsl(0 90% 50%)); background-size: 100% 200%; -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 -2px 6px hsl(20 100% 50%)); animation: fireFlicker var(--duration, 2s) ease-in-out infinite; }
@keyframes fireFlicker { 0%, 100% { background-position: 0% 0%; } 50% { background-position: 0% 100%; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-fire)

---

#### `text-ice` — 冰霜文字（Ice Text）

文字带冰霜蓝白渐变与结晶光泽,寒冷感。

**参数：**
- `duration` (周期): 范围 1–4（步长 0.1）s，默认 2.5

**HTML：**
```html
<h1 class="text-ice">ICE</h1>
```

**CSS：**
```css
.text-ice { background: linear-gradient(135deg, hsl(190 90% 80%), hsl(210 80% 95%), hsl(200 90% 70%), hsl(220 60% 85%)); background-size: 200% 200%; -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 0 12px hsl(200 100% 80%); animation: iceShimmer var(--duration, 2.5s) ease-in-out infinite; }
@keyframes iceShimmer { 0%, 100% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-ice)

---

#### `text-metallic` — 金属质感（Metallic Text）

文字带金属光泽渐变,质感高级。

**参数：**
- `duration` (周期): 范围 1–5（步长 0.1）s，默认 2.5

**HTML：**
```html
<h1 class="text-metallic">METAL</h1>
```

**CSS：**
```css
.text-metallic { background: linear-gradient(180deg, hsl(0 0% 85%) 0%, hsl(0 0% 35%) 45%, hsl(0 0% 75%) 50%, hsl(0 0% 30%) 55%, hsl(0 0% 80%) 100%); background-size: 100% 200%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: metalShine var(--duration, 2.5s) ease-in-out infinite; }
@keyframes metalShine { 0%, 100% { background-position: 0% 0%; } 50% { background-position: 0% 100%; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-metallic)

---

#### `text-outline` — 描边文字（Outline Text）

文字仅描边显示并循环呼吸,极简风格。

**参数：**
- `duration` (周期): 范围 1–4（步长 0.1）s，默认 2

**HTML：**
```html
<h1 class="text-outline">OUTLINE</h1>
```

**CSS：**
```css
.text-outline { color: transparent; -webkit-text-stroke: 2px hsl(280 90% 60%); animation: outlinePulse var(--duration, 2s) ease-in-out infinite; }
@keyframes outlinePulse { 0%, 100% { -webkit-text-stroke-color: hsl(280 90% 60%); } 50% { -webkit-text-stroke-color: hsl(200 90% 60%); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-outline)

---

#### `text-typewriter-multi` — 多行打字（Multi Typewriter）

多行文字依次打字输入,循环切换。

**参数：**
- `speed` (速度): 范围 30–200（步长 10）ms，默认 80

**HTML：**
```html
<span id="multi-tw"></span>
```

**CSS：**
```css
#multi-tw { font-family: monospace; font-weight: 800; }
#multi-tw::after { content: "▌"; animation: blink 0.8s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }
```

**JS：**
```javascript
const el = document.getElementById('multi-tw');
const lines = ['Hello.', 'I am Motion.', 'Built for effects.'];
let li = 0, ci = 0, del = false;
setInterval(() => {
  const t = lines[li];
  ci += del ? -1 : 1;
  el.textContent = t.slice(0, ci);
  if (!del && ci >= t.length) { del = true; setTimeout(() => {}, 800); }
  else if (del && ci <= 0) { del = false; li = (li + 1) % lines.length; }
}, 90);
```

[在线预览](https://motionlab.uanx.online/lab/text-typewriter-multi)

---

#### `text-delete-retype` — 删除重打（Delete Retype）

文字打完后删除再重新输入,循环演示。

**参数：**
- `speed` (速度): 范围 30–200（步长 10）ms，默认 70

**HTML：**
```html
<span id="del-retype"></span>
```

**CSS：**
```css
#del-retype { font-family: monospace; font-weight: 800; }
#del-retype::after { content: "▌"; animation: blink 0.8s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }
```

**JS：**
```javascript
const el = document.getElementById('del-retype');
const text = 'DELETE & RETYPE';
let i = 0, del = false;
setInterval(() => { i += del ? -1 : 1; el.textContent = text.slice(0, i); if (i >= text.length) del = true; else if (i <= 0) del = false; }, 70);
```

[在线预览](https://motionlab.uanx.online/lab/text-delete-retype)

---

#### `text-wave-3d` — 3D 波浪（Wave 3D）

字符以 3D 透视上下波浪起伏,立体波浪。

**参数：**
- `duration` (周期): 范围 1–4（步长 0.1）s，默认 2

**HTML：**
```html
<h1 class="wave-3d">WAVE</h1>
```

**CSS：**
```css
.wave-3d { perspective: 400px; }
.wave-3d span { display: inline-block; animation: wave3d var(--duration, 2s) ease-in-out infinite; }
.wave-3d span:nth-child(n) { animation-delay: calc(0.08s * n); }
@keyframes wave3d { 0%, 100% { transform: translateY(0) rotateX(0); } 50% { transform: translateY(-14px) rotateX(60deg); } }
```

**JS：**
```javascript
[...document.querySelector('.wave-3d').textContent].forEach(c => { const s = document.createElement('span'); s.textContent = c; c.replaceWith(s); });
```

[在线预览](https://motionlab.uanx.online/lab/text-wave-3d)

---

#### `text-bounce` — 弹跳文字（Bounce Text）

字符依次弹跳,活泼有趣。

**参数：**
- `duration` (周期): 范围 1–3（步长 0.1）s，默认 1.6

**HTML：**
```html
<h1 class="text-bounce">BOUNCE</h1>
```

**CSS：**
```css
.text-bounce span { display: inline-block; animation: textBounce var(--duration, 1.6s) ease-in-out infinite; }
.text-bounce span:nth-child(n) { animation-delay: calc(0.1s * n); }
@keyframes textBounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-18px); } }
```

**JS：**
```javascript
[...document.querySelector('.text-bounce').textContent].forEach(c => { const s = document.createElement('span'); s.textContent = c; c.replaceWith(s); });
```

[在线预览](https://motionlab.uanx.online/lab/text-bounce)

---

#### `text-rainbow-shift` — 彩虹偏移（Rainbow Shift）

文字彩虹色循环并轻微偏移,梦幻。

**参数：**
- `duration` (周期): 范围 1–6（步长 0.1）s，默认 3

**HTML：**
```html
<h1 class="rainbow-shift">RAINBOW</h1>
```

**CSS：**
```css
.rainbow-shift { background: linear-gradient(90deg, hsl(0 90% 60%), hsl(60 90% 60%), hsl(120 90% 60%), hsl(180 90% 60%), hsl(240 90% 60%), hsl(300 90% 60%), hsl(360 90% 60%)); background-size: 300% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: rbShift var(--duration, 3s) linear infinite; }
@keyframes rbShift { to { background-position: 300% 0; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-rainbow-shift)

---

#### `text-shadow-long` — 长投影（Long Shadow）

文字带超长投影,层叠立体感强。

**参数：**
- `depth` (深度): 范围 4–20（步长 1），默认 10

**HTML：**
```html
<h1 class="long-shadow">SHADOW</h1>
```

**CSS：**
```css
.long-shadow { color: hsl(0 0% 100%); text-shadow: 1px 1px 0 hsl(280 60% 40%), 2px 2px 0 hsl(280 60% 38%), 3px 3px 0 hsl(280 60% 36%), 4px 4px 0 hsl(280 60% 34%), 5px 5px 0 hsl(280 60% 32%), 6px 6px 0 hsl(280 60% 30%), 7px 7px 0 hsl(280 60% 28%), 8px 8px 0 hsl(280 60% 26%), 9px 9px 0 hsl(280 60% 24%), 10px 10px 12px hsl(280 80% 10%); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-shadow-long)

---

#### `text-stroke-animate` — 描边动画（Stroke Animate）

SVG 描边文字按路径逐步绘制,书写感。

**参数：**
- `duration` (时长): 范围 1–5（步长 0.2）s，默认 2.5

**HTML：**
```html
<svg viewBox="0 0 300 80"><text class="stroke-text" x="150" y="60" text-anchor="middle">STROKE</text></svg>
```

**CSS：**
```css
.stroke-text { font-size: 56px; font-weight: 900; fill: transparent; stroke: hsl(280 90% 60%); stroke-width: 2; stroke-dasharray: 600; stroke-dashoffset: 600; animation: strokeDraw var(--duration, 2.5s) ease-out infinite alternate; }
@keyframes strokeDraw { to { stroke-dashoffset: 0; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-stroke-animate)

---

#### `text-split-reveal` — 分裂揭示（Split Reveal）

文字从中间分裂上下展开揭示,戏剧性。

**参数：**
- `duration` (时长): 范围 0.6–2.5（步长 0.1）s，默认 1.2

**HTML：**
```html
<h1 class="split-reveal" data-text="SPLIT">SPLIT</h1>
```

**CSS：**
```css
.split-reveal { position: relative; overflow: hidden; }
.split-reveal::before { content: attr(data-text); position: absolute; inset: 0; clip-path: inset(0 0 50% 0); transform: translateY(-100%); animation: splitTop var(--duration, 1.2s) cubic-bezier(0.65, 0, 0.35, 1) forwards; }
@keyframes splitTop { to { transform: translateY(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-split-reveal)

---

#### `text-char-fall` — 字符下落（Char Fall）

字符从上方依次下落入位,瀑布感。

**参数：**
- `duration` (时长): 范围 0.6–2.5（步长 0.1）s，默认 1.2

**HTML：**
```html
<h1 class="char-fall">FALL</h1>
```

**CSS：**
```css
.char-fall span { display: inline-block; opacity: 0; animation: charFall var(--duration, 1.2s) cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.char-fall span:nth-child(n) { animation-delay: calc(0.1s * n); }
@keyframes charFall { from { opacity: 0; transform: translateY(-60px) rotate(-20deg); } to { opacity: 1; transform: translateY(0) rotate(0); } }
```

**JS：**
```javascript
[...document.querySelector('.char-fall').textContent].forEach(c => { const s = document.createElement('span'); s.textContent = c; c.replaceWith(s); });
```

[在线预览](https://motionlab.uanx.online/lab/text-char-fall)

---

#### `text-word-fly` — 词语飞入（Word Fly）

词语依次从远处飞入,带 stagger 延迟。

**参数：**
- `duration` (单项时长): 范围 0.4–1.5（步长 0.1）s，默认 0.7
- `stagger` (间隔): 范围 0.05–0.4（步长 0.05）s，默认 0.12

**HTML：**
```html
<h1 class="word-fly"><span>Motion</span> <span>Lab</span> <span>Effects</span></h1>
```

**CSS：**
```css
.word-fly span { display: inline-block; opacity: 0; animation: wordFly var(--duration, 0.7s) cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.word-fly span:nth-child(1) { animation-delay: 0s; }
.word-fly span:nth-child(2) { animation-delay: var(--stagger, 0.12s); }
.word-fly span:nth-child(3) { animation-delay: calc(var(--stagger, 0.12s) * 2); }
@keyframes wordFly { from { opacity: 0; transform: translateZ(-200px) rotateY(40deg); } to { opacity: 1; transform: translateZ(0) rotateY(0); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/text-word-fly)

---

## 交互（interaction）— 40 个

| ID | 名称 | 英文名 | 难度 | 说明 |
|----|------|--------|------|------|
| `magnetic-cursor` | 磁吸光标 | Magnetic Cursor | ★★☆ | 光标靠近元素时元素被吸引。
| `three-d-tilt` | 3D 倾斜 | 3D Tilt | ★★☆ | 卡片随鼠标 3D 倾斜。
| `ripple-click` | 点击波纹 | Ripple Click | ★☆☆ | Material Design 风格的点击波纹。
| `parallax-mouse` | 鼠标视差 | Parallax Mouse | ★★☆ | 多层元素按不同深度响应鼠标。
| `blob-cursor` | 粘性光标 | Blob Cursor | ★★☆ | 光标变成一个跟随的彩色 blob。
| `hover-image-distort` | 悬停图像畸变 | Hover Distort | ★★★ | 悬停时图像被 SVG 滤镜畸变。
| `magnetic-button` | 磁吸按钮 | Magnetic Button | ★★☆ | 按钮周围区域吸引按钮位移。
| `sticky-stack` | 堆叠翻页 | Sticky Stack | ★★★ | 滚动时卡片堆叠翻页效果。
| `drag-scroll` | 拖动滚动 | Drag Scroll | ★★☆ | 横向拖动滚动容器。
| `color-picker-hover` | 随悬停变色 | Color Hover | ★☆☆ | 悬停位置产生彩色光晕。
| `button-press` | 按钮按下 | Button Press | ★☆☆ | 鼠标按下时按钮缩放反馈,有手感。
| `hover-lift` | 悬停上浮 | Hover Lift | ★☆☆ | hover 时元素上浮并加深阴影。
| `tilt-card-strong` | 强倾斜 | Strong Tilt | ★★☆ | 比 3D Tilt 更夸张的倾斜效果,带光斑。
| `spotlight-follow` | 跟随聚光 | Spotlight | ★★☆ | 鼠标位置形成 spotlight 高亮,其余区域变暗。
| `mouse-trail` | 鼠标拖尾 | Mouse Trail | ★★☆ | 鼠标移动时留下一串彩色粒子拖尾。
| `click-burst` | 点击爆开 | Click Burst | ★★☆ | 点击位置爆开一圈彩色粒子。
| `hover-icon-spin` | 悬停旋转 | Icon Spin | ★☆☆ | hover 时图标旋转一周。
| `toggle-flip` | 滑动开关 | Toggle Flip | ★★☆ | 可点击切换的左右滑动 toggle。
| `accordion-smooth` | 手风琴 | Accordion | ★★☆ | 点击展开/收起内容,平滑过渡。
| `range-drag` | 滑块拖动 | Range Drag | ★★☆ | 可拖动的圆形滑块,显示当前值。
| `hover-scale` | 悬停缩放 | Hover Scale | ★☆☆ | 鼠标悬停时元素放大,平滑过渡。
| `hover-rotate` | 悬停旋转 | Hover Rotate | ★☆☆ | 鼠标悬停时元素旋转,带过渡。
| `hover-skew` | 悬停倾斜 | Hover Skew | ★☆☆ | 鼠标悬停时元素倾斜变形,动感。
| `hover-blur` | 悬停模糊 | Hover Blur | ★★☆ | 悬停时背景模糊,聚焦前景元素。
| `hover-color-change` | 悬停变色 | Hover Color | ★☆☆ | 悬停时元素背景色平滑过渡。
| `hover-border-expand` | 边框扩展 | Border Expand | ★★☆ | 悬停时边框从中心向四周扩展。
| `hover-text-reveal` | 文字揭示 | Text Reveal | ★★☆ | 悬停时隐藏文字从下方滑入揭示。
| `hover-image-zoom` | 图片放大 | Image Zoom | ★☆☆ | 悬停时图片平滑放大,带遮罩。
| `hover-flip-card` | 翻转卡片 | Flip Card | ★★☆ | 悬停时卡片 3D 翻转,正反切换。
| `hover-glow` | 悬停发光 | Hover Glow | ★☆☆ | 悬停时元素周围发光晕,聚焦感。
| `click-ripple-material` | Material 波纹 | Material Ripple | ★★☆ | Material Design 风格点击波纹扩散。
| `click-shockwave` | 点击冲击波 | Shockwave | ★★☆ | 点击产生扩散冲击波环,强烈反馈。
| `click-emoji-burst` | Emoji 爆开 | Emoji Burst | ★★☆ | 点击位置爆开一圈 emoji,趣味反馈。
| `drag-to-reveal` | 拖动揭示 | Drag Reveal | ★★☆ | 拖动遮罩揭示下方内容,刮刮卡感。
| `drag-rotate` | 拖动旋转 | Drag Rotate | ★★☆ | 拖动元素使其 3D 旋转,可交互探索。
| `scroll-progress` | 滚动进度 | Scroll Progress | ★☆☆ | 页面滚动进度条,顶部高亮显示。
| `scroll-reveal` | 滚动揭示 | Scroll Reveal | ★★☆ | 元素进入视口时上滑淡入,常见落地页效果。
| `scroll-parallax` | 滚动视差 | Scroll Parallax | ★★☆ | 多层元素按不同速度响应滚动,纵深感。
| `hover-magnetic-text` | 磁吸文字 | Magnetic Text | ★★☆ | 文字字符被光标磁吸,逐字位移。
| `hover-follow-cursor` | 跟随光标 | Follow Cursor | ★★☆ | 元素平滑跟随光标移动,带惯性。

### 交互源码

#### `magnetic-cursor` — 磁吸光标（Magnetic Cursor）

光标靠近元素时元素被吸引。

**参数：**
- `strength` (强度): 范围 0.1–0.8（步长 0.05），默认 0.4

**HTML：**
```html
<button class="magnetic">Hover me</button>
```

**CSS：**
```css
.magnetic { transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
```

**JS：**
```javascript
const btn = document.querySelector('.magnetic');
btn.addEventListener('mousemove', (e) => {
  const r = btn.getBoundingClientRect();
  const x = (e.clientX - r.left - r.width / 2) * 0.4;
  const y = (e.clientY - r.top - r.height / 2) * 0.4;
  btn.style.transform = `translate(${x}px, ${y}px)`;
});
btn.addEventListener('mouseleave', () => btn.style.transform = '');
```

[在线预览](https://motionlab.uanx.online/lab/magnetic-cursor)

---

#### `three-d-tilt` — 3D 倾斜（3D Tilt）

卡片随鼠标 3D 倾斜。

**参数：**
- `max` (最大角度): 范围 5–30（步长 1）°，默认 15

**HTML：**
```html
<div class="tilt">TILT</div>
```

**CSS：**
```css
.tilt { transform-style: preserve-3d; transition: transform 0.2s; }
```

**JS：**
```javascript
const el = document.querySelector('.tilt');
el.addEventListener('mousemove', (e) => {
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(600px) rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`;
});
```

[在线预览](https://motionlab.uanx.online/lab/three-d-tilt)

---

#### `ripple-click` — 点击波纹（Ripple Click）

Material Design 风格的点击波纹。

**参数：**
- `duration` (时长): 范围 0.4–1.5（步长 0.1）s，默认 0.6

**HTML：**
```html
<button class="ripple-btn">Click</button>
```

**CSS：**
```css
.ripple-btn { position: relative; overflow: hidden; }
.ripple-btn .ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.5); animation: ripple var(--duration, 0.6s); }
@keyframes ripple { to { transform: scale(4); opacity: 0; } }
```

**JS：**
```javascript
document.querySelector('.ripple-btn').addEventListener('click', (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = (e.clientX - r.left) + 'px';
  ripple.style.top = (e.clientY - r.top) + 'px';
  ripple.style.width = ripple.style.height = '20px';
  e.currentTarget.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});
```

[在线预览](https://motionlab.uanx.online/lab/ripple-click)

---

#### `parallax-mouse` — 鼠标视差（Parallax Mouse）

多层元素按不同深度响应鼠标。

**参数：**
- `intensity` (强度): 范围 5–40（步长 1）px，默认 20

**HTML：**
```html
<div class="parallax"><div class="layer bg" data-depth="1"></div><div class="layer fg" data-depth="3"></div></div>
```

**CSS：**
```css
.parallax { position: relative; }
.layer { position: absolute; inset: 0; transition: transform 0.2s; }
```

**JS：**
```javascript
document.querySelector('.parallax').addEventListener('mousemove', (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  e.currentTarget.querySelectorAll('.layer').forEach(l => {
    const d = +l.dataset.depth;
    l.style.transform = `translate(${x * d * 20}px, ${y * d * 20}px)`;
  });
});
```

[在线预览](https://motionlab.uanx.online/lab/parallax-mouse)

---

#### `blob-cursor` — 粘性光标（Blob Cursor）

光标变成一个跟随的彩色 blob。

**参数：**
- `size` (尺寸): 范围 20–80（步长 4）px，默认 40

**HTML：**
```html
<div class="blob"></div>
```

**CSS：**
```css
.blob { position: fixed; width: 40px; height: 40px; border-radius: 50%; background: hsl(280 90% 60%); mix-blend-mode: difference; pointer-events: none; transition: transform 0.15s; }
```

**JS：**
```javascript
const blob = document.querySelector('.blob');
document.addEventListener('mousemove', (e) => {
  blob.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});
```

[在线预览](https://motionlab.uanx.online/lab/blob-cursor)

---

#### `hover-image-distort` — 悬停图像畸变（Hover Distort）

悬停时图像被 SVG 滤镜畸变。

**参数：**
- `amount` (畸变强度): 范围 0–0.05（步长 0.005），默认 0.02

**HTML：**
```html
<svg width="0" height="0"><filter id="d"><feTurbulence baseFrequency="0.02" numOctaves="2" /><feDisplacementMap in="SourceGraphic" scale="20" /></filter></svg>
<div class="distort">HOVER</div>
```

**CSS：**
```css
.distort { filter: url(#d); transition: filter 0.3s; }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-image-distort)

---

#### `magnetic-button` — 磁吸按钮（Magnetic Button）

按钮周围区域吸引按钮位移。

**参数：**
- `radius` (吸引半径): 范围 30–200（步长 10）px，默认 80

**HTML：**
```html
<button class="mag-btn">PRESS</button>
```

**CSS：**
```css
.mag-btn { transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
```

**JS：**
```javascript
const btn = document.querySelector('.mag-btn');
document.addEventListener('mousemove', (e) => {
  const r = btn.getBoundingClientRect();
  const dx = e.clientX - (r.left + r.width / 2);
  const dy = e.clientY - (r.top + r.height / 2);
  const dist = Math.hypot(dx, dy);
  if (dist < 80) btn.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
  else btn.style.transform = '';
});
```

[在线预览](https://motionlab.uanx.online/lab/magnetic-button)

---

#### `sticky-stack` — 堆叠翻页（Sticky Stack）

滚动时卡片堆叠翻页效果。

**参数：**
- `count` (卡片数): 范围 3–8（步长 1），默认 4

**HTML：**
```html
<div class="stack"><div class="card">1</div><div class="card">2</div><div class="card">3</div></div>
```

**CSS：**
```css
.stack .card { position: sticky; top: 80px; padding: 40px; background: white; border-radius: 16px; margin-bottom: 20px; }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/sticky-stack)

---

#### `drag-scroll` — 拖动滚动（Drag Scroll）

横向拖动滚动容器。

**参数：**
- `duration` (惯性时长): 范围 0.2–1.5（步长 0.1）s，默认 0.6

**HTML：**
```html
<div class="drag"><div class="drag-inner"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div></div>
```

**CSS：**
```css
.drag { overflow: hidden; cursor: grab; user-select: none; }
.drag:active { cursor: grabbing; }
.drag-inner { display: flex; gap: 20px; padding: 20px; }
```

**JS：**
```javascript
const wrap = document.querySelector('.drag');
let isDown = false, startX = 0, scrollLeft = 0;
wrap.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX; scrollLeft = wrap.scrollLeft; });
window.addEventListener('mouseup', () => isDown = false);
wrap.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); wrap.scrollLeft = scrollLeft - (e.pageX - startX); });
```

[在线预览](https://motionlab.uanx.online/lab/drag-scroll)

---

#### `color-picker-hover` — 随悬停变色（Color Hover）

悬停位置产生彩色光晕。

**参数：**
- `size` (光晕大小): 范围 100–600（步长 20）px，默认 300

**HTML：**
```html
<div class="color-hover"></div>
```

**CSS：**
```css
.color-hover { background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), hsl(var(--h, 0) 90% 60%), transparent 50%); }
```

**JS：**
```javascript
const el = document.querySelector('.color-hover');
el.addEventListener('mousemove', (e) => {
  const r = el.getBoundingClientRect();
  el.style.setProperty('--x', (e.clientX - r.left) + 'px');
  el.style.setProperty('--y', (e.clientY - r.top) + 'px');
  el.style.setProperty('--h', Math.random() * 360);
});
```

[在线预览](https://motionlab.uanx.online/lab/color-picker-hover)

---

#### `button-press` — 按钮按下（Button Press）

鼠标按下时按钮缩放反馈,有手感。

**参数：**
- `scale` (缩放): 范围 0.85–0.98（步长 0.01），默认 0.92

**HTML：**
```html
<button class="press">CLICK</button>
```

**CSS：**
```css
.press { padding: 14px 28px; border: none; background: hsl(280 90% 60%); color: white; font-weight: 700; font-size: 18px; border-radius: 10px; cursor: pointer; transition: transform 0.1s, box-shadow 0.1s; box-shadow: 0 6px 0 hsl(280 90% 35%); }
.press:active { transform: scale(var(--scale, 0.92)) translateY(4px); box-shadow: 0 2px 0 hsl(280 90% 35%); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/button-press)

---

#### `hover-lift` — 悬停上浮（Hover Lift）

hover 时元素上浮并加深阴影。

**参数：**
- `lift` (上浮): 范围 2–20（步长 1）px，默认 8

**HTML：**
```html
<div class="lift">HOVER ME</div>
```

**CSS：**
```css
.lift { padding: 24px 32px; background: white; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease; font-weight: 700; }
.lift:hover { transform: translateY(calc(var(--lift, 8px) * -1)); box-shadow: 0 16px 32px rgba(0,0,0,0.18); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-lift)

---

#### `tilt-card-strong` — 强倾斜（Strong Tilt）

比 3D Tilt 更夸张的倾斜效果,带光斑。

**参数：**
- `max` (最大角度): 范围 10–45（步长 1）°，默认 25

**HTML：**
```html
<div class="tilt-s">STRONG TILT</div>
```

**CSS：**
```css
.tilt-s { width: 240px; height: 160px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, hsl(280 90% 65%), hsl(200 90% 60%)); color: white; font-weight: 900; font-size: 24px; border-radius: 16px; cursor: pointer; transform-style: preserve-3d; transition: transform 0.15s; }
```

**JS：**
```javascript
const el = document.querySelector('.tilt-s');
el.addEventListener('mousemove', (e) => {
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(800px) rotateY(${x * params.max * 2}deg) rotateX(${-y * params.max * 2}deg)`;
});
el.addEventListener('mouseleave', () => el.style.transform = '');
```

[在线预览](https://motionlab.uanx.online/lab/tilt-card-strong)

---

#### `spotlight-follow` — 跟随聚光（Spotlight）

鼠标位置形成 spotlight 高亮,其余区域变暗。

**参数：**
- `size` (光圈): 范围 100–400（步长 20）px，默认 220

**HTML：**
```html
<div class="spot"><div class="spot-inner">SPOTLIGHT</div></div>
```

**CSS：**
```css
.spot { position: relative; width: 100%; height: 100%; background: #111; border-radius: 12px; cursor: crosshair; }
.spot-inner { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: 900; letter-spacing: 0.1em; }
```

**JS：**
```javascript
const spot = document.querySelector('.spot');
spot.addEventListener('mousemove', (e) => {
  const r = spot.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  spot.style.background = `radial-gradient(circle ${params.size}px at ${x}px ${y}px, rgba(255,255,255,0.25), #111 70%)`;
});
spot.addEventListener('mouseleave', () => spot.style.background = '#111');
```

[在线预览](https://motionlab.uanx.online/lab/spotlight-follow)

---

#### `mouse-trail` — 鼠标拖尾（Mouse Trail）

鼠标移动时留下一串彩色粒子拖尾。

**参数：**
- `count` (粒子数): 范围 6–30（步长 1），默认 12
- `size` (尺寸): 范围 4–16（步长 1）px，默认 8

**HTML：**
```html
<div class="trail-zone"></div>
```

**CSS：**
```css
.trail-zone { position: relative; width: 100%; height: 100%; cursor: crosshair; }
.trail-dot { position: absolute; border-radius: 50%; pointer-events: none; }
```

**JS：**
```javascript
const zone = document.querySelector('.trail-zone');
let dots = [];
for (let i = 0; i < params.count; i++) { const d = document.createElement('div'); d.className = 'trail-dot'; d.style.width = d.style.height = params.size + 'px'; d.style.background = `hsl(${i * 30} 90% 60%)`; zone.appendChild(d); dots.push(d); }
let history = [];
zone.addEventListener('mousemove', (e) => { const r = zone.getBoundingClientRect(); history.unshift({ x: e.clientX - r.left, y: e.clientY - r.top }); if (history.length > params.count) history.pop(); dots.forEach((d, i) => { const p = history[i] || history[history.length - 1]; if (!p) return; d.style.left = (p.x - params.size/2) + 'px'; d.style.top = (p.y - params.size/2) + 'px'; d.style.opacity = String(1 - i / params.count); }); });
```

[在线预览](https://motionlab.uanx.online/lab/mouse-trail)

---

#### `click-burst` — 点击爆开（Click Burst）

点击位置爆开一圈彩色粒子。

**参数：**
- `count` (粒子数): 范围 8–40（步长 2），默认 20

**HTML：**
```html
<div class="burst">CLICK ANYWHERE</div>
```

**CSS：**
```css
.burst { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #222; color: white; font-weight: 700; border-radius: 12px; cursor: pointer; }
```

**JS：**
```javascript
const burst = document.querySelector('.burst');
burst.addEventListener('click', (e) => {
  const r = burst.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  for (let i = 0; i < params.count; i++) {
    const p = document.createElement('span');
    const ang = (i / params.count) * Math.PI * 2;
    const dist = 40 + Math.random() * 30;
    p.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:8px;height:8px;border-radius:50%;background:hsl(${Math.random()*360} 90% 60%);transition:all 0.6s cubic-bezier(0.2,0.8,0.2,1);`;
    burst.appendChild(p);
    requestAnimationFrame(() => { p.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px) scale(0)`; p.style.opacity = '0'; });
    setTimeout(() => p.remove(), 700);
  }
});
```

[在线预览](https://motionlab.uanx.online/lab/click-burst)

---

#### `hover-icon-spin` — 悬停旋转（Icon Spin）

hover 时图标旋转一周。

**参数：**
- `duration` (时长): 范围 0.3–1.5（步长 0.1）s，默认 0.6

**HTML：**
```html
<button class="spin-icon"><span>⚙</span></button>
```

**CSS：**
```css
.spin-icon { padding: 12px 16px; border: 2px solid currentColor; background: transparent; border-radius: 10px; cursor: pointer; font-size: 18px; color: inherit; }
.spin-icon span { display: inline-block; transition: transform var(--duration, 0.6s) ease; }
.spin-icon:hover span { transform: rotate(360deg); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-icon-spin)

---

#### `toggle-flip` — 滑动开关（Toggle Flip）

可点击切换的左右滑动 toggle。

**参数：**
- `duration` (滑动时长): 范围 0.2–0.8（步长 0.05）s，默认 0.35

**HTML：**
```html
<div class="toggle" data-on="false"><div class="knob"></div></div>
```

**CSS：**
```css
.toggle { position: relative; width: 64px; height: 32px; background: #ccc; border-radius: 999px; cursor: pointer; transition: background var(--duration, 0.35s); }
.toggle .knob { position: absolute; top: 4px; left: 4px; width: 24px; height: 24px; background: white; border-radius: 50%; transition: transform var(--duration, 0.35s) cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 6px rgba(0,0,0,0.2); }
.toggle.on { background: hsl(140 80% 50%); }
.toggle.on .knob { transform: translateX(32px); }
```

**JS：**
```javascript
const tg = document.querySelector('.toggle');
tg.addEventListener('click', () => { const on = tg.classList.toggle('on'); tg.dataset.on = String(on); });
```

[在线预览](https://motionlab.uanx.online/lab/toggle-flip)

---

#### `accordion-smooth` — 手风琴（Accordion）

点击展开/收起内容,平滑过渡。

**参数：**
- `duration` (时长): 范围 0.2–1（步长 0.05）s，默认 0.4

**HTML：**
```html
<div class="acc"><button class="acc-h">Q: 什么是动效？</button><div class="acc-b"><p>动效是界面元素的运动,引导注意力,增强反馈。</p></div></div>
```

**CSS：**
```css
.acc { width: 280px; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.acc-h { width: 100%; padding: 14px 18px; background: hsl(280 90% 60%); color: white; border: none; text-align: left; font-weight: 700; cursor: pointer; font-size: 15px; }
.acc-b { max-height: 0; overflow: hidden; transition: max-height var(--duration, 0.4s) ease; }
.acc-b p { padding: 14px 18px; margin: 0; font-size: 14px; line-height: 1.6; color: #444; }
```

**JS：**
```javascript
const h = document.querySelector('.acc-h'); const b = document.querySelector('.acc-b');
h.addEventListener('click', () => { if (b.style.maxHeight) { b.style.maxHeight = null; } else { b.style.maxHeight = b.scrollHeight + 'px'; } });
```

[在线预览](https://motionlab.uanx.online/lab/accordion-smooth)

---

#### `range-drag` — 滑块拖动（Range Drag）

可拖动的圆形滑块,显示当前值。

**参数：**
- `max` (最大值): 范围 50–500（步长 10），默认 200

**HTML：**
```html
<div class="range"><div class="track"><div class="fill"></div><div class="knob"></div></div><div class="val">0</div></div>
```

**CSS：**
```css
.range { padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; width: 240px; }
.range .track { position: relative; width: 200px; height: 6px; background: rgba(0,0,0,0.1); border-radius: 999px; cursor: pointer; }
.range .fill { position: absolute; left: 0; top: 0; height: 100%; background: hsl(280 90% 60%); border-radius: 999px; width: 50%; }
.range .knob { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; background: white; border: 3px solid hsl(280 90% 60%); border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.2); cursor: grab; }
.range .val { font-size: 24px; font-weight: 900; font-variant-numeric: tabular-nums; }
```

**JS：**
```javascript
const track = document.querySelector('.track'); const fill = document.querySelector('.fill'); const knob = document.querySelector('.knob'); const val = document.querySelector('.val');
let dragging = false;
const update = (clientX) => { const r = track.getBoundingClientRect(); let pct = (clientX - r.left) / r.width; pct = Math.max(0, Math.min(1, pct)); fill.style.width = (pct * 100) + '%'; knob.style.left = (pct * 100) + '%'; val.textContent = Math.round(pct * params.max); };
track.addEventListener('mousedown', (e) => { dragging = true; update(e.clientX); });
window.addEventListener('mousemove', (e) => { if (dragging) update(e.clientX); });
window.addEventListener('mouseup', () => dragging = false);
```

[在线预览](https://motionlab.uanx.online/lab/range-drag)

---

#### `hover-scale` — 悬停缩放（Hover Scale）

鼠标悬停时元素放大,平滑过渡。

**参数：**
- `scale` (缩放): 范围 1.05–1.6（步长 0.05），默认 1.15

**HTML：**
```html
<div class="hover-scale">HOVER</div>
```

**CSS：**
```css
.hover-scale { transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); cursor: pointer; }
.hover-scale:hover { transform: scale(var(--scale, 1.15)); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-scale)

---

#### `hover-rotate` — 悬停旋转（Hover Rotate）

鼠标悬停时元素旋转,带过渡。

**参数：**
- `angle` (角度): 范围 5–180（步长 5）°，默认 30

**HTML：**
```html
<div class="hover-rotate">ROTATE</div>
```

**CSS：**
```css
.hover-rotate { transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); cursor: pointer; }
.hover-rotate:hover { transform: rotate(var(--angle, 30deg)); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-rotate)

---

#### `hover-skew` — 悬停倾斜（Hover Skew）

鼠标悬停时元素倾斜变形,动感。

**参数：**
- `angle` (角度): 范围 5–30（步长 1）°，默认 15

**HTML：**
```html
<div class="hover-skew">SKEW</div>
```

**CSS：**
```css
.hover-skew { transition: transform 0.3s ease; cursor: pointer; }
.hover-skew:hover { transform: skewX(calc(var(--angle, 15deg) * -1)); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-skew)

---

#### `hover-blur` — 悬停模糊（Hover Blur）

悬停时背景模糊,聚焦前景元素。

**参数：**
- `blur` (模糊): 范围 2–16（步长 1）px，默认 6

**HTML：**
```html
<div class="hover-blur"><div class="bg"></div><div class="fg">FOCUS</div></div>
```

**CSS：**
```css
.hover-blur { position: relative; cursor: pointer; }
.hover-blur .bg { transition: filter 0.3s; }
.hover-blur:hover .bg { filter: blur(var(--blur, 6px)); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-blur)

---

#### `hover-color-change` — 悬停变色（Hover Color）

悬停时元素背景色平滑过渡。

**参数：**
- `duration` (时长): 范围 0.1–1（步长 0.05）s，默认 0.3

**HTML：**
```html
<div class="hover-color">CHANGE</div>
```

**CSS：**
```css
.hover-color { background: hsl(280 90% 60%); transition: background var(--duration, 0.3s) ease, transform var(--duration, 0.3s) ease; cursor: pointer; }
.hover-color:hover { background: hsl(200 90% 55%); transform: translateY(-2px); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-color-change)

---

#### `hover-border-expand` — 边框扩展（Border Expand）

悬停时边框从中心向四周扩展。

**参数：**
- `duration` (时长): 范围 0.2–1（步长 0.05）s，默认 0.4

**HTML：**
```html
<div class="border-expand">EXPAND</div>
```

**CSS：**
```css
.border-expand { position: relative; cursor: pointer; }
.border-expand::before { content: ""; position: absolute; inset: 50% 50%; border: 2px solid hsl(280 90% 60%); border-radius: 12px; transition: inset var(--duration, 0.4s) cubic-bezier(0.2, 0.8, 0.2, 1); }
.border-expand:hover::before { inset: 0; }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-border-expand)

---

#### `hover-text-reveal` — 文字揭示（Text Reveal）

悬停时隐藏文字从下方滑入揭示。

**参数：**
- `duration` (时长): 范围 0.2–1（步长 0.05）s，默认 0.4

**HTML：**
```html
<div class="text-reveal"><span class="label">HOVER</span><span class="hidden">REVEALED</span></div>
```

**CSS：**
```css
.text-reveal { position: relative; overflow: hidden; cursor: pointer; }
.text-reveal .hidden { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transform: translateY(100%); transition: transform var(--duration, 0.4s) cubic-bezier(0.2, 0.8, 0.2, 1); }
.text-reveal:hover .hidden { transform: translateY(0); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-text-reveal)

---

#### `hover-image-zoom` — 图片放大（Image Zoom）

悬停时图片平滑放大,带遮罩。

**参数：**
- `scale` (缩放): 范围 1.1–2（步长 0.05），默认 1.3

**HTML：**
```html
<div class="img-zoom"><div class="img"></div></div>
```

**CSS：**
```css
.img-zoom { overflow: hidden; cursor: pointer; }
.img-zoom .img { width: 100%; height: 100%; background: linear-gradient(135deg, hsl(280 90% 60%), hsl(200 90% 60%)); transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.img-zoom:hover .img { transform: scale(var(--scale, 1.3)); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-image-zoom)

---

#### `hover-flip-card` — 翻转卡片（Flip Card）

悬停时卡片 3D 翻转,正反切换。

**参数：**
- `duration` (时长): 范围 0.3–1.2（步长 0.05）s，默认 0.6

**HTML：**
```html
<div class="flip-card"><div class="flip-inner"><div class="front">FRONT</div><div class="back">BACK</div></div></div>
```

**CSS：**
```css
.flip-card { perspective: 800px; cursor: pointer; }
.flip-inner { position: relative; transform-style: preserve-3d; transition: transform var(--duration, 0.6s); }
.flip-card:hover .flip-inner { transform: rotateY(180deg); }
.flip-card .front, .flip-card .back { position: absolute; inset: 0; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; }
.flip-card .back { transform: rotateY(180deg); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-flip-card)

---

#### `hover-glow` — 悬停发光（Hover Glow）

悬停时元素周围发光晕,聚焦感。

**参数：**
- `intensity` (强度): 范围 10–60（步长 2）px，默认 28

**HTML：**
```html
<div class="hover-glow">GLOW</div>
```

**CSS：**
```css
.hover-glow { transition: box-shadow 0.3s ease, transform 0.3s ease; cursor: pointer; }
.hover-glow:hover { box-shadow: 0 0 var(--intensity, 28px) hsl(280 90% 60%); transform: translateY(-2px); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/hover-glow)

---

#### `click-ripple-material` — Material 波纹（Material Ripple）

Material Design 风格点击波纹扩散。

**参数：**
- `duration` (时长): 范围 0.4–1.2（步长 0.05）s，默认 0.6

**HTML：**
```html
<button class="mat-ripple">CLICK</button>
```

**CSS：**
```css
.mat-ripple { position: relative; overflow: hidden; cursor: pointer; }
.mat-ripple .r { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.5); transform: translate(-50%, -50%) scale(0); animation: matRipple var(--duration, 0.6s) ease-out forwards; pointer-events: none; }
@keyframes matRipple { to { transform: translate(-50%, -50%) scale(10); opacity: 0; } }
```

**JS：**
```javascript
const btn = document.querySelector('.mat-ripple');
btn.addEventListener('click', (e) => { const r = btn.getBoundingClientRect(); const rip = document.createElement('span'); rip.className = 'r'; rip.style.left = (e.clientX - r.left) + 'px'; rip.style.top = (e.clientY - r.top) + 'px'; rip.style.width = rip.style.height = '20px'; btn.appendChild(rip); setTimeout(() => rip.remove(), 600); });
```

[在线预览](https://motionlab.uanx.online/lab/click-ripple-material)

---

#### `click-shockwave` — 点击冲击波（Shockwave）

点击产生扩散冲击波环,强烈反馈。

**参数：**
- `duration` (时长): 范围 0.4–1.5（步长 0.05）s，默认 0.8

**HTML：**
```html
<div class="shockwave">CLICK</div>
```

**CSS：**
```css
.shockwave { position: relative; cursor: pointer; }
.shockwave .wave { position: absolute; border: 3px solid hsl(280 90% 60%); border-radius: 50%; transform: translate(-50%, -50%) scale(0); animation: shock var(--duration, 0.8s) ease-out forwards; pointer-events: none; }
@keyframes shock { to { transform: translate(-50%, -50%) scale(8); opacity: 0; border-width: 1px; } }
```

**JS：**
```javascript
const el = document.querySelector('.shockwave');
el.addEventListener('click', (e) => { const r = el.getBoundingClientRect(); const w = document.createElement('span'); w.className = 'wave'; w.style.left = (e.clientX - r.left) + 'px'; w.style.top = (e.clientY - r.top) + 'px'; w.style.width = w.style.height = '20px'; el.appendChild(w); setTimeout(() => w.remove(), 800); });
```

[在线预览](https://motionlab.uanx.online/lab/click-shockwave)

---

#### `click-emoji-burst` — Emoji 爆开（Emoji Burst）

点击位置爆开一圈 emoji,趣味反馈。

**参数：**
- `count` (数量): 范围 6–24（步长 1），默认 12

**HTML：**
```html
<div class="emoji-burst">CLICK</div>
```

**CSS：**
```css
.emoji-burst { position: relative; cursor: pointer; }
.emoji-burst .e { position: absolute; font-size: 24px; pointer-events: none; transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.7s; }
```

**JS：**
```javascript
const el = document.querySelector('.emoji-burst');
const emojis = ['🎉','✨','⭐','💫','🌟','🎊'];
el.addEventListener('click', (e) => { const r = el.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top; for (let i = 0; i < 12; i++) { const s = document.createElement('span'); s.className = 'e'; s.textContent = emojis[i % emojis.length]; s.style.left = x + 'px'; s.style.top = y + 'px'; el.appendChild(s); const ang = (i / 12) * Math.PI * 2; const dist = 50 + Math.random() * 30; requestAnimationFrame(() => { s.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px) scale(0)`; s.style.opacity = '0'; }); setTimeout(() => s.remove(), 750); } });
```

[在线预览](https://motionlab.uanx.online/lab/click-emoji-burst)

---

#### `drag-to-reveal` — 拖动揭示（Drag Reveal）

拖动遮罩揭示下方内容,刮刮卡感。

**参数：**
- `duration` (过渡): 范围 0.1–0.6（步长 0.05）s，默认 0.2

**HTML：**
```html
<div class="drag-reveal"><div class="cover">DRAG ME</div><div class="under">REVEALED</div></div>
```

**CSS：**
```css
.drag-reveal { position: relative; cursor: ew-resize; user-select: none; }
.drag-reveal .under { display: flex; align-items: center; justify-content: center; }
.drag-reveal .cover { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: clip-path var(--duration, 0.2s); clip-path: inset(0 0 0 0); }
```

**JS：**
```javascript
const el = document.querySelector('.drag-reveal'); const cover = el.querySelector('.cover');
let dragging = false, startX = 0, startPct = 0;
const pct = () => { const m = cover.style.clipPath.match(/inset\(0 (\d+)%/); return m ? +m[1] : 0; };
el.addEventListener('mousedown', (e) => { dragging = true; startX = e.clientX; startPct = pct(); });
window.addEventListener('mousemove', (e) => { if (!dragging) return; const w = el.offsetWidth; let p = startPct + ((e.clientX - startX) / w) * 100; p = Math.max(0, Math.min(100, p)); cover.style.clipPath = `inset(0 ${p}% 0 0)`; });
window.addEventListener('mouseup', () => dragging = false);
```

[在线预览](https://motionlab.uanx.online/lab/drag-to-reveal)

---

#### `drag-rotate` — 拖动旋转（Drag Rotate）

拖动元素使其 3D 旋转,可交互探索。

**参数：**
- `sensitivity` (灵敏度): 范围 0.2–2（步长 0.1），默认 0.6

**HTML：**
```html
<div class="drag-rotate">DRAG</div>
```

**CSS：**
```css
.drag-rotate { transform-style: preserve-3d; cursor: grab; user-select: none; }
.drag-rotate:active { cursor: grabbing; }
```

**JS：**
```javascript
const el = document.querySelector('.drag-rotate');
let rx = -20, ry = 20, dragging = false, lx = 0, ly = 0;
el.addEventListener('mousedown', (e) => { dragging = true; lx = e.clientX; ly = e.clientY; });
window.addEventListener('mousemove', (e) => { if (!dragging) return; ry += (e.clientX - lx) * 0.6; rx -= (e.clientY - ly) * 0.6; lx = e.clientX; ly = e.clientY; el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`; });
window.addEventListener('mouseup', () => dragging = false);
```

[在线预览](https://motionlab.uanx.online/lab/drag-rotate)

---

#### `scroll-progress` — 滚动进度（Scroll Progress）

页面滚动进度条,顶部高亮显示。

**参数：**
- `height` (高度): 范围 2–10（步长 1）px，默认 4

**HTML：**
```html
<div class="scroll-progress"><div class="bar"></div></div>
```

**CSS：**
```css
.scroll-progress { position: fixed; top: 0; left: 0; right: 0; height: 4px; background: rgba(0,0,0,0.1); z-index: 100; }
.scroll-progress .bar { height: 100%; width: 0; background: linear-gradient(90deg, hsl(280 90% 60%), hsl(200 90% 60%)); transition: width 0.1s; }
```

**JS：**
```javascript
const bar = document.querySelector('.scroll-progress .bar');
window.addEventListener('scroll', () => { const h = document.documentElement; const p = h.scrollTop / (h.scrollHeight - h.clientHeight); bar.style.width = (p * 100) + '%'; });
```

[在线预览](https://motionlab.uanx.online/lab/scroll-progress)

---

#### `scroll-reveal` — 滚动揭示（Scroll Reveal）

元素进入视口时上滑淡入,常见落地页效果。

**参数：**
- `distance` (位移): 范围 10–100（步长 5）px，默认 40

**HTML：**
```html
<div class="scroll-reveal">REVEAL ON SCROLL</div>
```

**CSS：**
```css
.scroll-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.6s, transform 0.6s; }
.scroll-reveal.in { opacity: 1; transform: translateY(0); }
```

**JS：**
```javascript
const el = document.querySelector('.scroll-reveal');
const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) el.classList.add('in'); }), { threshold: 0.2 });
io.observe(el);
```

[在线预览](https://motionlab.uanx.online/lab/scroll-reveal)

---

#### `scroll-parallax` — 滚动视差（Scroll Parallax）

多层元素按不同速度响应滚动,纵深感。

**参数：**
- `speed` (速度): 范围 0.1–0.8（步长 0.05），默认 0.3

**HTML：**
```html
<div class="scroll-parallax"><div class="layer" data-d="0.3">BACK</div><div class="layer" data-d="0.6">MID</div><div class="layer" data-d="1">FRONT</div></div>
```

**CSS：**
```css
.scroll-parallax { position: relative; }
.scroll-parallax .layer { transition: transform 0.1s; }
```

**JS：**
```javascript
const wrap = document.querySelector('.scroll-parallax');
window.addEventListener('scroll', () => { const r = wrap.getBoundingClientRect(); const y = r.top; wrap.querySelectorAll('.layer').forEach(l => { const d = +l.dataset.d; l.style.transform = `translateY(${y * d * 0.3}px)`; }); });
```

[在线预览](https://motionlab.uanx.online/lab/scroll-parallax)

---

#### `hover-magnetic-text` — 磁吸文字（Magnetic Text）

文字字符被光标磁吸,逐字位移。

**参数：**
- `strength` (强度): 范围 0.1–0.8（步长 0.05），默认 0.35

**HTML：**
```html
<h1 class="mag-text">MAGNETIC</h1>
```

**CSS：**
```css
.mag-text span { display: inline-block; transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1); }
```

**JS：**
```javascript
const el = document.querySelector('.mag-text');
[...el.textContent].forEach(c => { const s = document.createElement('span'); s.textContent = c; c.replaceWith(s); });
el.addEventListener('mousemove', (e) => { el.querySelectorAll('span').forEach(s => { const r = s.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2); const dy = e.clientY - (r.top + r.height / 2); const d = Math.hypot(dx, dy); if (d < 100) s.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`; else s.style.transform = ''; }); });
```

[在线预览](https://motionlab.uanx.online/lab/hover-magnetic-text)

---

#### `hover-follow-cursor` — 跟随光标（Follow Cursor）

元素平滑跟随光标移动,带惯性。

**参数：**
- `speed` (速度): 范围 0.02–0.3（步长 0.02），默认 0.1

**HTML：**
```html
<div class="follow-zone"><div class="dot"></div></div>
```

**CSS：**
```css
.follow-zone { position: relative; cursor: none; }
.follow-zone .dot { position: absolute; width: 24px; height: 24px; border-radius: 50%; background: hsl(280 90% 60%); pointer-events: none; transform: translate(-50%, -50%); }
```

**JS：**
```javascript
const zone = document.querySelector('.follow-zone'); const dot = zone.querySelector('.dot');
let tx = 0, ty = 0, x = 0, y = 0;
zone.addEventListener('mousemove', (e) => { const r = zone.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; });
function tick() { x += (tx - x) * 0.1; y += (ty - y) * 0.1; dot.style.left = x + 'px'; dot.style.top = y + 'px'; requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/hover-follow-cursor)

---

## 高级（advanced）— 38 个

| ID | 名称 | 英文名 | 难度 | 说明 |
|----|------|--------|------|------|
| `gsap-scrollTrigger` | 滚动驱动 | GSAP ScrollTrigger | ★★★ | 使用 GSAP ScrollTrigger 绑定滚动进度。
| `three-particles` | 粒子系统 | Three.js Particles | ★★★ | Three.js 渲染的几何粒子系统。
| `webgl-shader` | 着色器 | WebGL Shader | ★★★ | 自定义 GLSL 片元着色器生成动画。
| `canvas-confetti` | 五彩纸屑 | Canvas Confetti | ★★☆ | 撒花庆祝效果。
| `lottie-loader` | Lottie 加载 | Lottie Loader | ★★☆ | 使用 Lottie 动画作为加载器。
| `morph-svg` | SVG 形变 | Morph SVG | ★★★ | SVG path 之间平滑形变。
| `grid-magnetic` | 网格磁吸 | Grid Magnetic | ★★★ | 网格中每个点对鼠标有磁吸反应。
| `sine-wave` | 正弦波 | Sine Wave | ★★☆ | Canvas 渲染的正弦波。
| `audio-wave` | 音频条 | Audio Wave | ★★☆ | 模拟音频可视化的跳动条形。
| `fractal-tree` | 分形树 | Fractal Tree | ★★★ | 递归绘制的分形树动画。
| `noise-flow` | 噪声流动 | Noise Flow | ★★★ | 基于 value-noise 的 2D 流动场。
| `metaball` | 粘性球 | Metaball | ★★★ | 模糊叠加形成粘性 metaball 效果。
| `physics-spring` | 弹簧物理 | Spring Physics | ★★★ | 弹簧物理仿真,拖动后回弹。
| `trajectory-path` | 路径运动 | Trajectory | ★★☆ | 元素沿 SVG 路径平滑运动。
| `3d-cube-rotate` | 立方体 | 3D Cube | ★★☆ | 纯 CSS 3D 立方体持续旋转。
| `matrix-rain` | 数字雨 | Matrix Rain | ★★★ | Matrix 风格绿色字符雨。
| `ripple-water` | 水波涟漪 | Water Ripple | ★★☆ | 点击产生水波涟漪,实时衰减。
| `fluid-distort` | 流体畸变 | Fluid Distort | ★★★ | 使用 feTurbulence + feDisplacementMap 实现流体畸变。
| `particle-fountain` | 粒子喷泉 | Particle Fountain | ★★☆ | Canvas 粒子从底部喷涌向上,受重力下落。
| `particle-galaxy` | 粒子星系 | Particle Galaxy | ★★★ | Three.js 螺旋星系粒子,缓慢自转。
| `shader-plasma` | 等离子着色器 | Plasma Shader | ★★★ | GLSL 片元着色器生成等离子流动色彩。
| `shader-fireball` | 火球着色器 | Fireball Shader | ★★★ | GLSL 着色器生成燃烧火球纹理。
| `canvas-snow` | 雪花飘落 | Canvas Snow | ★★☆ | Canvas 模拟雪花飘落,带风偏移。
| `canvas-fireworks` | 烟花 | Canvas Fireworks | ★★★ | Canvas 烟花自动升空爆炸,多彩粒子。
| `canvas-starfield` | 星空 | Canvas Starfield | ★★☆ | Canvas 3D 星空穿越,星点向四周飞散。
| `canvas-ocean` | 海浪 | Canvas Ocean | ★★★ | Canvas 多层正弦叠加模拟海浪起伏。
| `svg-draw-path` | 路径绘制 | SVG Path Draw | ★★☆ | SVG 路径按 stroke-dashoffset 逐步绘制。
| `svg-dash-animate` | 虚线动画 | SVG Dash Animate | ★★☆ | SVG 虚线沿路径流动,蚂蚁线效果。
| `3d-sphere` | 3D 球体 | 3D Sphere | ★★★ | Three.js 线框球体自转,带粒子环绕。
| `3d-torus` | 3D 圆环 | 3D Torus | ★★☆ | Three.js 圆环持续旋转,带光泽材质。
| `gsap-timeline` | GSAP 时间线 | GSAP Timeline | ★★★ | GSAP 时间线编排多步动画序列。
| `gsap-stagger` | GSAP 错落 | GSAP Stagger | ★★☆ | GSAP stagger 让多个元素错落入场。
| `lottie-checkmark` | Lottie 打勾 | Lottie Checkmark | ★★☆ | SVG 模拟 Lottie 打勾动画,完成反馈。
| `physics-gravity` | 重力物理 | Gravity Physics | ★★★ | Canvas 多球受重力碰撞弹跳,物理仿真。
| `physics-cloth` | 布料模拟 | Cloth Sim | ★★★ | Canvas 网格布料模拟,受重力下垂摆动。
| `fractal-mandelbrot` | 曼德博集合 | Mandelbrot | ★★★ | Canvas 渲染曼德博分形集合,自相似图案。
| `flow-field` | 流场粒子 | Flow Field | ★★★ | 基于噪声场的粒子流动,有机运动轨迹。
| `voronoi-art` | Voronoi 艺术 | Voronoi Art | ★★★ | Canvas 生成 Voronoi 单元艺术图案,彩色拼贴。

### 高级源码

#### `gsap-scrollTrigger` — 滚动驱动（GSAP ScrollTrigger）

使用 GSAP ScrollTrigger 绑定滚动进度。

**参数：**
- `distance` (位移): 范围 50–400（步长 10）px，默认 200

**HTML：**
```html
<div class="gsap-target">SCROLL</div>
```

**CSS：**
```css
.gsap-target { font-size: 64px; font-weight: 900; }
```

**JS：**
```javascript
gsap.registerPlugin(ScrollTrigger);
gsap.to('.gsap-target', { x: 200, scrollTrigger: { trigger: '.gsap-target', start: 'top center', end: 'bottom center', scrub: true } });
```

[在线预览](https://motionlab.uanx.online/lab/gsap-scrollTrigger)

---

#### `three-particles` — 粒子系统（Three.js Particles）

Three.js 渲染的几何粒子系统。

**参数：**
- `count` (粒子数): 范围 100–5000（步长 100），默认 1500

**HTML：**
```html
<canvas class="three"></canvas>
```

**CSS：**
```css
.three { width: 100%; height: 100%; }
```

**JS：**
```javascript
import * as THREE from 'three';
const scene = new THREE.Scene();
const geom = new THREE.BufferGeometry();
const positions = new Float32Array(1500 * 3);
for (let i = 0; i < 1500 * 3; i++) positions[i] = (Math.random() - 0.5) * 10;
geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const mat = new THREE.PointsMaterial({ color: 0xff00ff, size: 0.05 });
scene.add(new THREE.Points(geom, mat));
```

[在线预览](https://motionlab.uanx.online/lab/three-particles)

---

#### `webgl-shader` — 着色器（WebGL Shader）

自定义 GLSL 片元着色器生成动画。

**参数：**
- `speed` (速度): 范围 0.1–3（步长 0.1），默认 1

**HTML：**
```html
<canvas class="shader"></canvas>
```

**CSS：**
```css
.shader { width: 100%; height: 100%; }
```

**JS：**
```javascript
const frag = `precision mediump float; uniform float u_time; uniform vec2 u_resolution; void main() { vec2 uv = gl_FragCoord.xy / u_resolution.xy; gl_FragColor = vec4(uv, 0.5 + 0.5 * sin(u_time), 1.0); }`;
```

[在线预览](https://motionlab.uanx.online/lab/webgl-shader)

---

#### `canvas-confetti` — 五彩纸屑（Canvas Confetti）

撒花庆祝效果。

**参数：**
- `count` (粒子数): 范围 30–300（步长 10），默认 120

**HTML：**
```html
<canvas class="cv"></canvas>
```

**CSS：**
```css
.cv { position: absolute; inset: 0; pointer-events: none; }
```

**JS：**
```javascript
const cv = document.querySelector('.cv'); const ctx = cv.getContext('2d');
const particles = [];
for (let i = 0; i < 120; i++) particles.push({ x: 200, y: 200, vx: (Math.random()-0.5)*8, vy: Math.random()*-12, g: 0.3, c: `hsl(${Math.random()*360} 90% 60%)` });
function tick() { ctx.clearRect(0,0,cv.width,cv.height); particles.forEach(p => { p.vy += p.g; p.x += p.vx; p.y += p.vy; ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, 6, 6); }); requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/canvas-confetti)

---

#### `lottie-loader` — Lottie 加载（Lottie Loader）

使用 Lottie 动画作为加载器。

**参数：**
- `style` (风格): 选项 ["pulse","orbit","wave"]，默认 `pulse`

**HTML：**
```html
<div class="lottie"></div>
```

**CSS：**
```css
.lottie { width: 200px; height: 200px; }
```

**JS：**
```javascript
import lottie from 'lottie-web';
lottie.loadAnimation({ container: document.querySelector('.lottie'), renderer: 'svg', loop: true, autoplay: true, path: '/animation.json' });
```

[在线预览](https://motionlab.uanx.online/lab/lottie-loader)

---

#### `morph-svg` — SVG 形变（Morph SVG）

SVG path 之间平滑形变。

**参数：**
- `duration` (时长): 范围 0.4–3（步长 0.1）s，默认 1.5

**HTML：**
```html
<svg viewBox="0 0 100 100"><path class="p" d="M10 50 Q50 10 90 50 Q50 90 10 50" fill="none" stroke="currentColor" stroke-width="4"/></svg>
```

**CSS：**
```css
svg { width: 200px; height: 200px; }
```

**JS：**
```javascript
const p = document.querySelector('.p');
const paths = ['M10 50 Q50 10 90 50 Q50 90 10 50', 'M10 10 L90 10 L90 90 L10 90 Z'];
let i = 0; setInterval(() => { p.setAttribute('d', paths[i++ % 2]); }, 1500);
```

[在线预览](https://motionlab.uanx.online/lab/morph-svg)

---

#### `grid-magnetic` — 网格磁吸（Grid Magnetic）

网格中每个点对鼠标有磁吸反应。

**参数：**
- `radius` (吸引半径): 范围 40–200（步长 10）px，默认 100

**HTML：**
```html
<div class="grid-mag"></div>
```

**CSS：**
```css
.grid-mag { position: relative; width: 100%; height: 100%; }
.grid-mag .dot { position: absolute; width: 4px; height: 4px; background: currentColor; border-radius: 50%; transition: transform 0.2s; }
```

**JS：**
```javascript
const el = document.querySelector('.grid-mag');
const dots = [];
for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) { const d = document.createElement('div'); d.className = 'dot'; d.style.left = c * 24 + 'px'; d.style.top = r * 24 + 'px'; el.appendChild(d); dots.push(d); }
el.addEventListener('mousemove', (e) => { dots.forEach(d => { const r = d.getBoundingClientRect(); const dx = e.clientX - (r.left + 2); const dy = e.clientY - (r.top + 2); const dist = Math.hypot(dx, dy); if (dist < 100) d.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`; else d.style.transform = ''; }); });
```

[在线预览](https://motionlab.uanx.online/lab/grid-magnetic)

---

#### `sine-wave` — 正弦波（Sine Wave）

Canvas 渲染的正弦波。

**参数：**
- `frequency` (频率): 范围 0.005–0.05（步长 0.005），默认 0.02
- `amplitude` (振幅): 范围 10–80（步长 5）px，默认 30

**HTML：**
```html
<canvas class="wave"></canvas>
```

**CSS：**
```css
.wave { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.wave'); const ctx = c.getContext('2d');
let t = 0;
function draw() { ctx.clearRect(0, 0, c.width, c.height); ctx.beginPath();
for (let x = 0; x < c.width; x++) ctx.lineTo(x, c.height/2 + Math.sin(x * 0.02 + t) * 30);
ctx.stroke(); t += 0.05; requestAnimationFrame(draw); } draw();
```

[在线预览](https://motionlab.uanx.online/lab/sine-wave)

---

#### `audio-wave` — 音频条（Audio Wave）

模拟音频可视化的跳动条形。

**参数：**
- `bars` (条数): 范围 16–64（步长 4），默认 32
- `speed` (速度): 范围 0.05–0.3（步长 0.01），默认 0.12

**HTML：**
```html
<div class="audio"></div>
```

**CSS：**
```css
.audio { display: flex; align-items: center; justify-content: center; gap: 3px; width: 100%; height: 100%; }
.audio .bar { width: 6px; background: linear-gradient(180deg, hsl(280 90% 60%), hsl(200 90% 60%)); border-radius: 3px; }
```

**JS：**
```javascript
const wrap = document.querySelector('.audio');
const bars = [];
for (let i = 0; i < params.bars; i++) { const b = document.createElement('div'); b.className = 'bar'; wrap.appendChild(b); bars.push(b); }
let t = 0;
function tick() { t += params.speed; bars.forEach((b, i) => { const h = 30 + Math.abs(Math.sin(t + i * 0.4)) * 70; b.style.height = h + '%'; }); requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/audio-wave)

---

#### `fractal-tree` — 分形树（Fractal Tree）

递归绘制的分形树动画。

**参数：**
- `depth` (深度): 范围 5–11（步长 1），默认 8
- `angle` (分支角度): 范围 15–35（步长 1）°，默认 22

**HTML：**
```html
<canvas class="ftree"></canvas>
```

**CSS：**
```css
.ftree { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.ftree'); const ctx = c.getContext('2d');
const resize = () => { c.width = c.offsetWidth * 2; c.height = c.offsetHeight * 2; };
resize();
window.addEventListener('resize', resize);
let t = 0;
function branch(x, y, len, ang, d) { if (d <= 0 || len < 2) return; const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.strokeStyle = `hsl(${(10 - d) * 20} 70% 50%)`; ctx.lineWidth = d; ctx.stroke(); branch(x2, y2, len * 0.75, ang - params.angle * Math.PI / 180, d - 1); branch(x2, y2, len * 0.75, ang + params.angle * Math.PI / 180, d - 1); }
let raf = 0;
function draw() { ctx.clearRect(0, 0, c.width, c.height); t += 0.01; ctx.save(); ctx.translate(c.width / 2, c.height); branch(0, 0, 200, -Math.PI / 2 + Math.sin(t) * 0.05, params.depth); ctx.restore(); raf = requestAnimationFrame(draw); }
draw();
return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
```

[在线预览](https://motionlab.uanx.online/lab/fractal-tree)

---

#### `noise-flow` — 噪声流动（Noise Flow）

基于 value-noise 的 2D 流动场。

**参数：**
- `speed` (速度): 范围 0.001–0.02（步长 0.001），默认 0.005
- `scale` (尺度): 范围 0.005–0.05（步长 0.005），默认 0.02

**HTML：**
```html
<canvas class="nf"></canvas>
```

**CSS：**
```css
.nf { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.nf'); const ctx = c.getContext('2d');
const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
resize();
window.addEventListener('resize', resize);
const grad = ctx.createLinearGradient(0, 0, 0, c.height);
grad.addColorStop(0, '#ff00aa'); grad.addColorStop(1, '#00ddff');
function noise(x, y) { const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return s - Math.floor(s); }
function smoothNoise(x, y) { const ix = Math.floor(x), iy = Math.floor(y); const fx = x - ix, fy = y - iy; const a = noise(ix, iy), b = noise(ix + 1, iy), c2 = noise(ix, iy + 1), d = noise(ix + 1, iy + 1); const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy); return a + (b - a) * u + (c2 - a) * v + (a - b - c2 + d) * u * v; }
let t = 0; let raf = 0;
function draw() { const img = ctx.createImageData(c.width, c.height); const d = img.data; for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) { const n = smoothNoise(x * params.scale + t, y * params.scale - t); const idx = (y * c.width + x) * 4; const v = Math.floor(n * 255); d[idx] = v < 128 ? 255 - v * 2 : 0; d[idx + 1] = v; d[idx + 2] = 255 - v; d[idx + 3] = 255; } ctx.putImageData(img, 0, 0); t += params.speed * 10; raf = requestAnimationFrame(draw); }
draw();
return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
```

[在线预览](https://motionlab.uanx.online/lab/noise-flow)

---

#### `metaball` — 粘性球（Metaball）

模糊叠加形成粘性 metaball 效果。

**参数：**
- `count` (球数): 范围 3–10（步长 1），默认 6
- `blur` (模糊): 范围 10–60（步长 2）px，默认 28

**HTML：**
```html
<div class="mb"></div>
```

**CSS：**
```css
.mb { position: relative; width: 100%; height: 100%; background: #0a0a1a; }
.mb .ball { position: absolute; border-radius: 50%; filter: blur(var(--blur, 28px)); will-change: transform; }
```

**JS：**
```javascript
const mb = document.querySelector('.mb');
const balls = [];
for (let i = 0; i < params.count; i++) { const b = document.createElement('div'); b.className = 'ball'; b.style.width = b.style.height = (60 + Math.random() * 40) + 'px'; b.style.background = i % 2 ? 'hsl(280 90% 60%)' : 'hsl(180 90% 55%)'; mb.appendChild(b); balls.push({ el: b, x: 0, y: 0, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 }); }
let raf = 0;
const w = () => mb.offsetWidth, h = () => mb.offsetHeight;
function tick() { balls.forEach(b => { b.x += b.vx; b.y += b.vy; if (b.x < 0 || b.x > w() - 80) b.vx *= -1; if (b.y < 0 || b.y > h() - 80) b.vy *= -1; b.el.style.transform = `translate(${b.x}px, ${b.y}px)`; }); raf = requestAnimationFrame(tick); }
tick();
return () => cancelAnimationFrame(raf);
```

[在线预览](https://motionlab.uanx.online/lab/metaball)

---

#### `physics-spring` — 弹簧物理（Spring Physics）

弹簧物理仿真,拖动后回弹。

**参数：**
- `stiffness` (刚度): 范围 0.02–0.3（步长 0.01），默认 0.12
- `damping` (阻尼): 范围 0.7–0.98（步长 0.01），默认 0.88

**HTML：**
```html
<div class="spring-zone"><div class="ball-s"></div></div>
```

**CSS：**
```css
.spring-zone { position: relative; width: 100%; height: 100%; background: #f0f0f0; border-radius: 12px; cursor: grab; overflow: hidden; }
.spring-zone .ball-s { position: absolute; width: 48px; height: 48px; border-radius: 50%; background: radial-gradient(circle, hsl(20 90% 60%), hsl(0 80% 40%)); box-shadow: 0 8px 16px rgba(0,0,0,0.2); top: 50%; left: 50%; transform: translate(-50%, -50%); }
```

**JS：**
```javascript
const zone = document.querySelector('.spring-zone'); const ball = document.querySelector('.ball-s');
let px = zone.offsetWidth / 2, py = zone.offsetHeight / 2, vx = 0, vy = 0, dragging = false;
let offX = 0, offY = 0;
zone.addEventListener('mousedown', (e) => { dragging = true; const r = ball.getBoundingClientRect(); offX = e.clientX - (r.left + 24); offY = e.clientY - (r.top + 24); });
window.addEventListener('mousemove', (e) => { if (!dragging) return; const r = zone.getBoundingClientRect(); px = e.clientX - r.left - offX; py = e.clientY - r.top - offY; });
window.addEventListener('mouseup', () => dragging = false);
let raf = 0;
const cx = () => zone.offsetWidth / 2, cy = () => zone.offsetHeight / 2;
function tick() { if (!dragging) { const dx = cx() - px, dy = cy() - py; vx += dx * params.stiffness; vy += dy * params.stiffness; vx *= params.damping; vy *= params.damping; px += vx; py += vy; } ball.style.left = (px - 24) + 'px'; ball.style.top = (py - 24) + 'px'; raf = requestAnimationFrame(tick); } tick();
return () => { cancelAnimationFrame(raf); };
```

[在线预览](https://motionlab.uanx.online/lab/physics-spring)

---

#### `trajectory-path` — 路径运动（Trajectory）

元素沿 SVG 路径平滑运动。

**参数：**
- `duration` (周期): 范围 2–8（步长 0.2）s，默认 4

**HTML：**
```html
<svg class="traj" viewBox="0 0 200 100"><path class="p" d="M10,80 C40,10 70,90 100,40 S160,90 190,30" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2" stroke-dasharray="4 4"/><circle class="dot" r="5" fill="hsl(280 90% 60%)"/></svg>
```

**CSS：**
```css
.traj { width: 100%; height: 100%; }
```

**JS：**
```javascript
const path = document.querySelector('.p'); const dot = document.querySelector('.dot');
const len = path.getTotalLength();
let t = 0; let raf = 0;
function tick() { t += 16 / (params.duration * 1000); if (t > 1) t = 0; const p = path.getPointAtLength(t * len); dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); raf = requestAnimationFrame(tick); } tick();
return () => cancelAnimationFrame(raf);
```

[在线预览](https://motionlab.uanx.online/lab/trajectory-path)

---

#### `3d-cube-rotate` — 立方体（3D Cube）

纯 CSS 3D 立方体持续旋转。

**参数：**
- `duration` (周期): 范围 2–10（步长 0.5）s，默认 5

**HTML：**
```html
<div class="cube-wrap"><div class="cube"><div class="face f1">1</div><div class="face f2">2</div><div class="face f3">3</div><div class="face f4">4</div><div class="face f5">5</div><div class="face f6">6</div></div></div>
```

**CSS：**
```css
.cube-wrap { perspective: 600px; width: 100px; height: 100px; }
.cube { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; animation: cubeRot var(--duration, 5s) linear infinite; }
.cube .face { position: absolute; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 900; color: white; background: hsl(280 90% 60%); border: 2px solid white; box-sizing: border-box; opacity: 0.85; }
.cube .f2 { transform: rotateY(180deg); background: hsl(0 90% 60%); }
.cube .f3 { transform: rotateY(90deg) translateZ(50px); background: hsl(60 90% 60%); }
.cube .f4 { transform: rotateY(-90deg) translateZ(50px); background: hsl(120 80% 55%); }
.cube .f5 { transform: rotateX(90deg) translateZ(50px); background: hsl(200 90% 60%); }
.cube .f6 { transform: rotateX(-90deg) translateZ(50px); background: hsl(320 80% 60%); }
.cube .f1 { transform: translateZ(50px); }
@keyframes cubeRot { to { transform: rotateY(360deg) rotateX(360deg); } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/3d-cube-rotate)

---

#### `matrix-rain` — 数字雨（Matrix Rain）

Matrix 风格绿色字符雨。

**参数：**
- `speed` (速度): 范围 1–6（步长 1），默认 3
- `density` (密度): 范围 0.3–1（步长 0.1），默认 0.7

**HTML：**
```html
<canvas class="mr"></canvas>
```

**CSS：**
```css
.mr { width: 100%; height: 100%; background: #000; }
```

**JS：**
```javascript
const c = document.querySelector('.mr'); const ctx = c.getContext('2d');
const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
resize();
window.addEventListener('resize', resize);
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789';
const fontSize = 14;
let cols = Math.floor(c.width / fontSize * params.density);
let drops = new Array(cols).fill(0);
let raf = 0;
function draw() { ctx.fillStyle = 'rgba(0,0,0,0.05)'; ctx.fillRect(0, 0, c.width, c.height); ctx.fillStyle = '#0f0'; ctx.font = fontSize + 'px monospace'; for (let i = 0; i < drops.length; i++) { const ch = chars[Math.floor(Math.random() * chars.length)]; ctx.fillText(ch, i * fontSize, drops[i] * fontSize); if (drops[i] * fontSize > c.height && Math.random() > 0.975) drops[i] = 0; drops[i] += params.speed / 3; } raf = requestAnimationFrame(draw); }
draw();
return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
```

[在线预览](https://motionlab.uanx.online/lab/matrix-rain)

---

#### `ripple-water` — 水波涟漪（Water Ripple）

点击产生水波涟漪,实时衰减。

**参数：**
- `duration` (衰减时长): 范围 1–4（步长 0.2）s，默认 2
- `count` (波纹数): 范围 2–6（步长 1），默认 3

**HTML：**
```html
<div class="water"><span class="hint">CLICK</span></div>
```

**CSS：**
```css
.water { position: relative; width: 100%; height: 100%; background: hsl(200 80% 50%); border-radius: 12px; cursor: pointer; overflow: hidden; }
.water .hint { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 24px; letter-spacing: 0.2em; pointer-events: none; }
.water .ring { position: absolute; border-radius: 50%; border: 3px solid white; transform: translate(-50%, -50%); pointer-events: none; }
```

**JS：**
```javascript
const water = document.querySelector('.water');
water.addEventListener('click', (e) => { const r = water.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top; for (let i = 0; i < params.count; i++) { const ring = document.createElement('div'); ring.className = 'ring'; ring.style.left = x + 'px'; ring.style.top = y + 'px'; ring.style.width = ring.style.height = '20px'; ring.style.transition = `all ${params.duration}s ease-out ${i * 0.2}s`; water.appendChild(ring); requestAnimationFrame(() => { ring.style.width = ring.style.height = (200 + i * 80) + 'px'; ring.style.opacity = '0'; }); setTimeout(() => ring.remove(), (params.duration + i * 0.2) * 1000 + 200); } });
```

[在线预览](https://motionlab.uanx.online/lab/ripple-water)

---

#### `fluid-distort` — 流体畸变（Fluid Distort）

使用 feTurbulence + feDisplacementMap 实现流体畸变。

**参数：**
- `amount` (畸变强度): 范围 0–60（步长 2），默认 24
- `speed` (速度): 范围 0–1（步长 0.05），默认 0.3

**HTML：**
```html
<svg width="0" height="0"><filter id="fd"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3"><animate attributeName="baseFrequency" dur="6s" values="0.02;0.04;0.02" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="24" /></filter></svg><div class="fluid">FLUID</div>
```

**CSS：**
```css
.fluid { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: 900; color: white; background: linear-gradient(135deg, hsl(280 90% 60%), hsl(200 90% 60%)); border-radius: 12px; filter: url(#fd); }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/fluid-distort)

---

#### `particle-fountain` — 粒子喷泉（Particle Fountain）

Canvas 粒子从底部喷涌向上,受重力下落。

**参数：**
- `count` (粒子数): 范围 30–300（步长 10），默认 120

**HTML：**
```html
<canvas class="fountain"></canvas>
```

**CSS：**
```css
.fountain { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.fountain'); const ctx = c.getContext('2d');
const ps = [];
function spawn() { return { x: c.width/2, y: c.height, vx: (Math.random()-0.5)*4, vy: -Math.random()*10-4, c: `hsl(${Math.random()*360} 90% 60%)`, s: 3+Math.random()*3 }; }
for (let i = 0; i < 120; i++) ps.push(spawn());
function tick() { ctx.fillStyle='rgba(10,10,30,0.2)'; ctx.fillRect(0,0,c.width,c.height); ps.forEach((p,i) => { p.vy += 0.2; p.x += p.vx; p.y += p.vy; if (p.y > c.height) ps[i] = spawn(); ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.s, p.s); }); requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/particle-fountain)

---

#### `particle-galaxy` — 粒子星系（Particle Galaxy）

Three.js 螺旋星系粒子,缓慢自转。

**参数：**
- `count` (粒子数): 范围 500–8000（步长 500），默认 3000

**HTML：**
```html
<canvas class="galaxy"></canvas>
```

**CSS：**
```css
.galaxy { width: 100%; height: 100%; }
```

**JS：**
```javascript
import * as THREE from 'three';
const scene = new THREE.Scene();
const geom = new THREE.BufferGeometry();
const pos = new Float32Array(3000 * 3); const col = new Float32Array(3000 * 3);
for (let i = 0; i < 3000; i++) { const r = Math.random() * 5; const a = i * 0.3; pos[i*3] = Math.cos(a) * r; pos[i*3+1] = (Math.random()-0.5)*0.5; pos[i*3+2] = Math.sin(a) * r; }
geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const mat = new THREE.PointsMaterial({ color: 0xff66ff, size: 0.04 });
scene.add(new THREE.Points(geom, mat));
```

[在线预览](https://motionlab.uanx.online/lab/particle-galaxy)

---

#### `shader-plasma` — 等离子着色器（Plasma Shader）

GLSL 片元着色器生成等离子流动色彩。

**参数：**
- `speed` (速度): 范围 0.1–3（步长 0.1），默认 1

**HTML：**
```html
<canvas class="plasma"></canvas>
```

**CSS：**
```css
.plasma { width: 100%; height: 100%; }
```

**JS：**
```javascript
const frag = `precision mediump float; uniform float u_time; uniform vec2 u_resolution; void main() { vec2 uv = gl_FragCoord.xy / u_resolution; float v = sin(uv.x*10.0 + u_time) + sin(uv.y*10.0 + u_time*1.3) + sin((uv.x+uv.y)*8.0); v = v / 3.0; gl_FragColor = vec4(0.5+0.5*sin(v*3.14), 0.5+0.5*sin(v*3.14+2.0), 0.5+0.5*sin(v*3.14+4.0), 1.0); }`;
```

[在线预览](https://motionlab.uanx.online/lab/shader-plasma)

---

#### `shader-fireball` — 火球着色器（Fireball Shader）

GLSL 着色器生成燃烧火球纹理。

**参数：**
- `speed` (速度): 范围 0.1–3（步长 0.1），默认 1

**HTML：**
```html
<canvas class="fireball"></canvas>
```

**CSS：**
```css
.fireball { width: 100%; height: 100%; }
```

**JS：**
```javascript
const frag = `precision mediump float; uniform float u_time; uniform vec2 u_resolution; float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5); } void main() { vec2 uv = gl_FragCoord.xy/u_resolution; float n = hash(uv*10.0 + u_time); vec3 col = mix(vec3(1.0,0.8,0.1), vec3(0.8,0.1,0.0), uv.y); gl_FragColor = vec4(col*n*1.5, 1.0); }`;
```

[在线预览](https://motionlab.uanx.online/lab/shader-fireball)

---

#### `canvas-snow` — 雪花飘落（Canvas Snow）

Canvas 模拟雪花飘落,带风偏移。

**参数：**
- `count` (雪花数): 范围 30–300（步长 10），默认 100

**HTML：**
```html
<canvas class="snow"></canvas>
```

**CSS：**
```css
.snow { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.snow'); const ctx = c.getContext('2d');
const flakes = [];
for (let i = 0; i < 100; i++) flakes.push({ x: Math.random()*c.width, y: Math.random()*c.height, r: 1+Math.random()*3, s: 0.5+Math.random()*1.5, w: Math.random()*2-1 });
function tick() { ctx.clearRect(0,0,c.width,c.height); ctx.fillStyle = 'white'; flakes.forEach(f => { f.y += f.s; f.x += f.w; if (f.y > c.height) f.y = 0; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 7); ctx.fill(); }); requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/canvas-snow)

---

#### `canvas-fireworks` — 烟花（Canvas Fireworks）

Canvas 烟花自动升空爆炸,多彩粒子。

**参数：**
- `count` (粒子数): 范围 30–200（步长 10），默认 80

**HTML：**
```html
<canvas class="fw"></canvas>
```

**CSS：**
```css
.fw { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.fw'); const ctx = c.getContext('2d');
let ps = [];
function launch() { const x = Math.random()*c.width; const y = c.height; const hue = Math.random()*360; for (let i = 0; i < 80; i++) { const a = (i/80)*6.28; ps.push({ x, y: c.height*0.4, vx: Math.cos(a)*3, vy: Math.sin(a)*3, c: `hsl(${hue} 90% 60%)`, life: 1 }); } }
setInterval(launch, 1200);
function tick() { ctx.fillStyle='rgba(0,0,20,0.2)'; ctx.fillRect(0,0,c.width,c.height); ps = ps.filter(p => p.life > 0); ps.forEach(p => { p.vy += 0.05; p.x += p.vx; p.y += p.vy; p.life -= 0.015; ctx.fillStyle = p.c; ctx.globalAlpha = p.life; ctx.fillRect(p.x, p.y, 3, 3); }); ctx.globalAlpha = 1; requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/canvas-fireworks)

---

#### `canvas-starfield` — 星空（Canvas Starfield）

Canvas 3D 星空穿越,星点向四周飞散。

**参数：**
- `count` (星数): 范围 100–800（步长 50），默认 300

**HTML：**
```html
<canvas class="stars"></canvas>
```

**CSS：**
```css
.stars { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.stars'); const ctx = c.getContext('2d');
const stars = [];
for (let i = 0; i < 300; i++) stars.push({ x: (Math.random()-0.5)*c.width, y: (Math.random()-0.5)*c.height, z: Math.random()*c.width });
function tick() { ctx.fillStyle='black'; ctx.fillRect(0,0,c.width,c.height); ctx.fillStyle='white'; stars.forEach(s => { s.z -= 4; if (s.z <= 0) s.z = c.width; const k = 128 / s.z; const x = s.x*k + c.width/2; const y = s.y*k + c.height/2; const r = (1 - s.z/c.width) * 2; ctx.fillRect(x, y, r, r); }); requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/canvas-starfield)

---

#### `canvas-ocean` — 海浪（Canvas Ocean）

Canvas 多层正弦叠加模拟海浪起伏。

**参数：**
- `speed` (速度): 范围 0.01–0.2（步长 0.01），默认 0.05

**HTML：**
```html
<canvas class="ocean"></canvas>
```

**CSS：**
```css
.ocean { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.ocean'); const ctx = c.getContext('2d');
let t = 0;
function wave(y, amp, freq, color) { ctx.beginPath(); ctx.moveTo(0, y); for (let x = 0; x <= c.width; x += 4) ctx.lineTo(x, y + Math.sin(x*freq + t)*amp); ctx.lineTo(c.width, c.height); ctx.lineTo(0, c.height); ctx.fillStyle = color; ctx.fill(); }
function tick() { ctx.fillStyle = '#0a1a3a'; ctx.fillRect(0,0,c.width,c.height); wave(c.height*0.5, 16, 0.02, 'hsl(200 80% 40%)'); wave(c.height*0.62, 12, 0.03, 'hsl(210 80% 50%)'); wave(c.height*0.74, 8, 0.04, 'hsl(200 90% 60%)'); t += 0.05; requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/canvas-ocean)

---

#### `svg-draw-path` — 路径绘制（SVG Path Draw）

SVG 路径按 stroke-dashoffset 逐步绘制。

**参数：**
- `duration` (时长): 范围 1–6（步长 0.2）s，默认 3

**HTML：**
```html
<svg class="svg-draw" viewBox="0 0 200 100"><path class="p" d="M10,80 C40,10 70,90 100,40 S160,90 190,30" fill="none" stroke="hsl(280 90% 60%)" stroke-width="3"/></svg>
```

**CSS：**
```css
.svg-draw { width: 100%; height: 100%; }
.svg-draw .p { stroke-dasharray: 400; stroke-dashoffset: 400; animation: draw var(--duration, 3s) ease-in-out infinite alternate; }
@keyframes draw { to { stroke-dashoffset: 0; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/svg-draw-path)

---

#### `svg-dash-animate` — 虚线动画（SVG Dash Animate）

SVG 虚线沿路径流动,蚂蚁线效果。

**参数：**
- `duration` (周期): 范围 0.5–4（步长 0.1）s，默认 1.5

**HTML：**
```html
<svg class="svg-dash" viewBox="0 0 200 100"><path class="p" d="M10,50 L60,20 L110,80 L160,30 L190,60" fill="none" stroke="hsl(200 90% 55%)" stroke-width="3" stroke-dasharray="8 6"/></svg>
```

**CSS：**
```css
.svg-dash { width: 100%; height: 100%; }
.svg-dash .p { animation: dash var(--duration, 1.5s) linear infinite; }
@keyframes dash { to { stroke-dashoffset: -28; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/svg-dash-animate)

---

#### `3d-sphere` — 3D 球体（3D Sphere）

Three.js 线框球体自转,带粒子环绕。

**参数：**
- `detail` (细分): 范围 8–48（步长 2），默认 24

**HTML：**
```html
<canvas class="sphere"></canvas>
```

**CSS：**
```css
.sphere { width: 100%; height: 100%; }
```

**JS：**
```javascript
import * as THREE from 'three';
const scene = new THREE.Scene();
const geom = new THREE.IcosahedronGeometry(1.5, 2);
const mat = new THREE.MeshBasicMaterial({ color: 0xaa66ff, wireframe: true });
scene.add(new THREE.Mesh(geom, mat));
```

[在线预览](https://motionlab.uanx.online/lab/3d-sphere)

---

#### `3d-torus` — 3D 圆环（3D Torus）

Three.js 圆环持续旋转,带光泽材质。

**参数：**
- `duration` (周期): 范围 2–12（步长 0.5）s，默认 6

**HTML：**
```html
<canvas class="torus"></canvas>
```

**CSS：**
```css
.torus { width: 100%; height: 100%; }
```

**JS：**
```javascript
import * as THREE from 'three';
const scene = new THREE.Scene();
const geom = new THREE.TorusGeometry(1.2, 0.4, 16, 60);
const mat = new THREE.MeshNormalMaterial();
scene.add(new THREE.Mesh(geom, mat));
```

[在线预览](https://motionlab.uanx.online/lab/3d-torus)

---

#### `gsap-timeline` — GSAP 时间线（GSAP Timeline）

GSAP 时间线编排多步动画序列。

**参数：**
- `duration` (时长): 范围 1–6（步长 0.2）s，默认 3

**HTML：**
```html
<div class="gsap-tl"><div class="b b1">1</div><div class="b b2">2</div><div class="b b3">3</div></div>
```

**CSS：**
```css
.gsap-tl .b { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; }
.gsap-tl .b1 { background: hsl(280 90% 60%); }
.gsap-tl .b2 { background: hsl(200 90% 60%); }
.gsap-tl .b3 { background: hsl(320 90% 60%); }
```

**JS：**
```javascript
const tl = gsap.timeline({ repeat: -1 });
tl.to('.b1', { x: 60, duration: 1 }).to('.b2', { x: 60, duration: 1 }, '<0.2').to('.b3', { x: 60, duration: 1 }, '<0.2').to('.b', { x: 0, duration: 1 }, '+=0.3');
```

[在线预览](https://motionlab.uanx.online/lab/gsap-timeline)

---

#### `gsap-stagger` — GSAP 错落（GSAP Stagger）

GSAP stagger 让多个元素错落入场。

**参数：**
- `stagger` (间隔): 范围 0.05–0.5（步长 0.05）s，默认 0.15

**HTML：**
```html
<div class="gsap-st"><div class="item">A</div><div class="item">B</div><div class="item">C</div><div class="item">D</div><div class="item">E</div></div>
```

**CSS：**
```css
.gsap-st { display: flex; gap: 8px; }
.gsap-st .item { width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, hsl(280 90% 60%), hsl(200 90% 60%)); color: white; display: flex; align-items: center; justify-content: center; font-weight: 900; }
```

**JS：**
```javascript
gsap.from('.gsap-st .item', { y: 40, opacity: 0, duration: 0.6, stagger: 0.15, repeat: -1, repeatDelay: 1 });
```

[在线预览](https://motionlab.uanx.online/lab/gsap-stagger)

---

#### `lottie-checkmark` — Lottie 打勾（Lottie Checkmark）

SVG 模拟 Lottie 打勾动画,完成反馈。

**参数：**
- `duration` (时长): 范围 0.4–2（步长 0.1）s，默认 0.8

**HTML：**
```html
<svg class="check" viewBox="0 0 100 100"><circle class="c" cx="50" cy="50" r="44" fill="none" stroke="hsl(140 80% 50%)" stroke-width="4"/><path class="mark" d="M30 52 L45 66 L72 36" fill="none" stroke="hsl(140 80% 50%)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>
```

**CSS：**
```css
.check { width: 120px; height: 120px; }
.check .c { stroke-dasharray: 276; stroke-dashoffset: 276; animation: drawC var(--duration, 0.8s) ease-out forwards; }
.check .mark { stroke-dasharray: 60; stroke-dashoffset: 60; animation: drawM var(--duration, 0.8s) ease-out var(--duration, 0.8s) forwards; }
@keyframes drawC { to { stroke-dashoffset: 0; } }
@keyframes drawM { to { stroke-dashoffset: 0; } }
```

**JS：**
```javascript
// Pure CSS — no JS needed
```

[在线预览](https://motionlab.uanx.online/lab/lottie-checkmark)

---

#### `physics-gravity` — 重力物理（Gravity Physics）

Canvas 多球受重力碰撞弹跳,物理仿真。

**参数：**
- `gravity` (重力): 范围 0.1–1（步长 0.05），默认 0.4

**HTML：**
```html
<canvas class="grav"></canvas>
```

**CSS：**
```css
.grav { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.grav'); const ctx = c.getContext('2d');
const balls = [];
for (let i = 0; i < 8; i++) balls.push({ x: Math.random()*c.width, y: 50, vx: (Math.random()-0.5)*4, vy: 0, r: 12+Math.random()*8, c: `hsl(${Math.random()*360} 90% 60%)` });
function tick() { ctx.clearRect(0,0,c.width,c.height); balls.forEach(b => { b.vy += 0.4; b.x += b.vx; b.y += b.vy; if (b.y + b.r > c.height) { b.y = c.height - b.r; b.vy *= -0.8; } if (b.x < b.r || b.x > c.width - b.r) b.vx *= -1; ctx.fillStyle = b.c; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 7); ctx.fill(); }); requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/physics-gravity)

---

#### `physics-cloth` — 布料模拟（Cloth Sim）

Canvas 网格布料模拟,受重力下垂摆动。

**参数：**
- `resolution` (分辨率): 范围 6–16（步长 1），默认 10

**HTML：**
```html
<canvas class="cloth"></canvas>
```

**CSS：**
```css
.cloth { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.cloth'); const ctx = c.getContext('2d');
const cols = 10, rows = 10, gap = 16;
const pts = [];
for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) pts.push({ x: col*gap, y: r*gap, px: col*gap, py: r*gap, pin: r === 0 });
function tick() { ctx.clearRect(0,0,c.width,c.height); pts.forEach(p => { if (p.pin) return; const vx = (p.x - p.px)*0.99, vy = (p.y - p.py)*0.99; p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + 0.3; }); ctx.strokeStyle = 'hsl(280 90% 60%)'; for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) { const p = pts[r*cols+col]; if (col < cols-1) { const q = pts[r*cols+col+1]; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } if (r < rows-1) { const q = pts[(r+1)*cols+col]; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } } requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/physics-cloth)

---

#### `fractal-mandelbrot` — 曼德博集合（Mandelbrot）

Canvas 渲染曼德博分形集合,自相似图案。

**参数：**
- `iterations` (迭代): 范围 30–200（步长 10），默认 80

**HTML：**
```html
<canvas class="mandel"></canvas>
```

**CSS：**
```css
.mandel { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.mandel'); const ctx = c.getContext('2d');
const img = ctx.createImageData(c.width, c.height); const d = img.data;
for (let py = 0; py < c.height; py++) for (let px = 0; px < c.width; px++) { let x = 0, y = 0, i = 0; const cx = (px - c.width/2)/120 - 0.5, cy = (py - c.height/2)/120; while (x*x + y*y < 4 && i < 80) { const xt = x*x - y*y + cx; y = 2*x*y + cy; x = xt; i++; } const idx = (py*c.width + px)*4; const v = i === 80 ? 0 : (i*8 % 256); d[idx] = v; d[idx+1] = v*0.5; d[idx+2] = 255 - v; d[idx+3] = 255; }
ctx.putImageData(img, 0, 0);
```

[在线预览](https://motionlab.uanx.online/lab/fractal-mandelbrot)

---

#### `flow-field` — 流场粒子（Flow Field）

基于噪声场的粒子流动,有机运动轨迹。

**参数：**
- `count` (粒子数): 范围 100–2000（步长 100），默认 600

**HTML：**
```html
<canvas class="flow"></canvas>
```

**CSS：**
```css
.flow { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.flow'); const ctx = c.getContext('2d');
const ps = [];
for (let i = 0; i < 600; i++) ps.push({ x: Math.random()*c.width, y: Math.random()*c.height });
let t = 0;
function noise(x, y) { return Math.sin(x*0.01 + t)*Math.cos(y*0.01 + t*0.7); }
function tick() { ctx.fillStyle='rgba(10,10,30,0.05)'; ctx.fillRect(0,0,c.width,c.height); ctx.fillStyle = 'hsl(280 90% 70%)'; ps.forEach(p => { const a = noise(p.x, p.y) * 6.28; p.x += Math.cos(a)*1.5; p.y += Math.sin(a)*1.5; if (p.x < 0 || p.x > c.width || p.y < 0 || p.y > c.height) { p.x = Math.random()*c.width; p.y = Math.random()*c.height; } ctx.fillRect(p.x, p.y, 1.5, 1.5); }); t += 0.01; requestAnimationFrame(tick); } tick();
```

[在线预览](https://motionlab.uanx.online/lab/flow-field)

---

#### `voronoi-art` — Voronoi 艺术（Voronoi Art）

Canvas 生成 Voronoi 单元艺术图案,彩色拼贴。

**参数：**
- `count` (种子数): 范围 10–80（步长 5），默认 30

**HTML：**
```html
<canvas class="voronoi"></canvas>
```

**CSS：**
```css
.voronoi { width: 100%; height: 100%; }
```

**JS：**
```javascript
const c = document.querySelector('.voronoi'); const ctx = c.getContext('2d');
const seeds = [];
for (let i = 0; i < 30; i++) seeds.push({ x: Math.random()*c.width, y: Math.random()*c.height, c: `hsl(${Math.random()*360} 70% 60%)` });
const img = ctx.createImageData(c.width, c.height); const d = img.data;
for (let py = 0; py < c.height; py++) for (let px = 0; px < c.width; px++) { let best = 0, bd = Infinity; for (let i = 0; i < seeds.length; i++) { const dx = px - seeds[i].x, dy = py - seeds[i].y; const dist = dx*dx + dy*dy; if (dist < bd) { bd = dist; best = i; } } const idx = (py*c.width + px)*4; const m = seeds[best].c.match(/hsl\((\d+)/); const h = +m[1]; d[idx] = h; d[idx+1] = 150; d[idx+2] = 150; d[idx+3] = 255; }
ctx.putImageData(img, 0, 0);
```

[在线预览](https://motionlab.uanx.online/lab/voronoi-art)

---

## 示例对话

**用户**："帮我给按钮加个点击波纹效果"
→ 推荐 `click-ripple-material`，提供其 HTML/CSS/JS 三段代码，告知可调参数 `duration`

**用户**："首页大标题想要打字机效果"
→ 推荐 `text-typewriter`（单行）或 `text-typewriter-multi`（多行循环），提供代码

**用户**："做个粒子背景"
→ 按风格推荐：`particle-fountain`（喷泉）、`canvas-starfield`（星空穿越）、`flow-field`（流场）、`particle-galaxy`（Three.js 星系）

**用户**："卡片悬停时翻转显示背面"
→ 推荐 `hover-flip-card`，提供 3D 翻转卡片代码

**用户**："页面滚动时元素淡入"
→ 推荐 `scroll-reveal`，基于 IntersectionObserver，提供带阈值参数的代码

## 集成注意事项

1. **CSS 自定义属性**：多数动效通过 `var(--key, fallback)` 接收参数，可在元素 `style` 上覆盖
2. **JS 依赖**：标注 `import * as THREE` 的需要安装 `three`；标注 `gsap` 的需要安装 `gsap`
3. **无障碍**：对纯装饰动效，建议包裹 `@media (prefers-reduced-motion: reduce)` 降级
4. **响应式**：Canvas 类动效的宽高需随容器自适应，监听 `resize` 重设 `canvas.width/height`
