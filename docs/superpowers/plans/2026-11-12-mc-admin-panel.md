# MC 管理面板静态界面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按 `界面设计要求.md` 用纯静态 HTML/CSS/JS 画出 MC 服务器管理面板的两个页面（服务器列表 + 管理后台）。

**Architecture:** 两个独立 HTML 页面，共享一个 CSS 和少量原生 JS。曲线图用 Canvas 自绘（无外部依赖），数据用模拟数据驱动界面。后台首页含导航切换、监控卡片、日志终端、命令框；文件管理/模组插件/玩家列表为占位页。

**Tech Stack:** HTML5 + CSS3 + 原生 JavaScript（Canvas）。零构建、零依赖。

**Spec:** `界面设计要求.md`（用户持续补充）与 `docs/superpowers/specs/2026-11-12-mc-admin-panel-design.md`

## Global Constraints

- 纯静态，无构建步骤，无外部 CDN 依赖，手机上直接打开 `index.html` 可预览
- 文件放在 `/storage/emulated/0/阅图锁屏/mc-server-panel/`
- 后台日志终端约 500px 宽、垂直拉满屏幕；命令输入框约 20px 高、同宽
- 左侧导航顺序固定：首页 → 文件管理 → 模组/插件管理 → 玩家列表管理
- 首页监控卡片：内存/CPU/网络上传下载/JDK/玩家数/TPS，卡片内显示占用 + 曲线图（图不超出卡片、有显示动画）；含服务器属性（核心版本、游戏版本）
- 整体深色主题（MC 面板惯例），配色由实施者定但需保持一致

## Review Focus

- 页面在手机竖屏/窄窗口下的布局（导航和日志终端如何降级）——合理预期：不横向溢出、可滚动
- 命令输入框回车后行为——合理预期：日志追加一条模拟回显
- 顶部服务器名自定义编辑——合理预期：点击可改名并即时反映
- 服务器列表卡片按钮点击——合理预期：有视觉反馈且不触发卡片跳转
- 图表在卡片尺寸变化时重绘——合理预期：曲线始终在卡片内，不溢出

---

### Task 1: 项目骨架与共享样式

**Files:**
- Create: `css/style.css`
- Create: `index.html`（占位骨架）

**Interfaces:**
- Produces: `style.css` 提供全局深色主题类（`.btn`, `.btn-danger`, `.card`, `.nav-item`, `.topbar` 等）供后续任务复用

- [ ] **Step 1: 创建 `css/style.css`**，定义深色主题变量（背景/卡片/边框/主色）、基础 reset、通用按钮/卡片/导航/顶栏样式

- [ ] **Step 2: 创建 `index.html`**，含完整 HTML 骨架（meta viewport、标题、引用 style.css、空内容容器），保证手机预览正常

- [ ] **Step 3: 验证**：用本地静态服务器（`python3 -m http.server` 或 `npx serve`）打开 `index.html`，确认深色主题渲染、无报错

- [ ] **Step 4: Commit**

```bash
git add css/style.css index.html
git commit -m "feat: scaffold static shell and shared dark theme"
```

---

### Task 2: 服务器列表页

**Files:**
- Modify: `index.html`
- Create: `js/servers.js`

**Interfaces:**
- Consumes: `css/style.css` 的 `.card`, `.btn`, `.btn-success/.btn-danger/.btn-warn`
- Produces: `js/servers.js` 渲染卡片列表；卡片数据在 JS 内定义（服务器名、状态、版本等模拟数据）；点击卡片跳转 `admin.html`

- [ ] **Step 1: 在 `index.html` 加入列表区**（标题 + 卡片网格容器）

- [ ] **Step 2: 创建 `js/servers.js`**：定义 2-3 条模拟服务器数据，渲染为卡片；每卡片含服务器名、状态标签、启动/关闭/重启三个按钮、点击卡片跳转 `admin.html`（按钮 `stopPropagation` 不触发跳转）；启动/关闭/重启按钮有模拟视觉反馈（切换状态标签）

- [ ] **Step 3: 验证**：浏览器打开 `index.html`，看到卡片、按钮可点击且状态切换、点卡片空白处跳转 admin

- [ ] **Step 4: Commit**

```bash
git add index.html js/servers.js
git commit -m "feat: server list page with cards and controls"
```

---

### Task 3: 管理后台页布局骨架

**Files:**
- Create: `admin.html`
- Create: `js/admin.js`

**Interfaces:**
- Consumes: `css/style.css`
- Produces: `admin.html` 提供 `#topbar`（名字+控制按钮）、`#sidebar`（导航）、`#main`（内容区）、`#terminal`（日志）、`#cmd-input`（命令框）；`js/admin.js` 提供导航切换函数 `switchView(id)`

- [ ] **Step 1: 创建 `admin.html`**：顶栏（左侧可编辑服务器名，右侧开启/关闭/强制终止按钮）、左侧导航（首页/文件管理/模组插件/玩家列表）、主内容区、日志终端（500px 宽、垂直撑满）+ 下方命令输入框（20px 高、同宽）。布局用 flex/grid，日志区与命令框在中间列

- [ ] **Step 2: 创建 `js/admin.js`**：实现 `switchView(id)` 切换内容区显示；顶栏名字点击可编辑（contenteditable 或 prompt），改动即时保存到 localStorage 并反映

- [ ] **Step 3: 验证**：打开 `admin.html`，布局符合 md（左导航、中日志、顶栏），导航切换生效，名字可编辑

- [ ] **Step 4: Commit**

```bash
git add admin.html js/admin.js
git commit -m "feat: admin backend layout with nav and editable title"
```

---

### Task 4: 首页监控卡片与 Canvas 曲线

**Files:**
- Modify: `admin.html`
- Create: `js/charts.js`

**Interfaces:**
- Consumes: `#main` 首页视图容器、`css/style.css` 的 `.card`
- Produces: `js/charts.js` 提供 `drawChart(canvas, data, opts)`；`admin.js` 用模拟数据（内存/CPU/网络上传下载/JDK/玩家数/TPS）定时刷新曲线（如 1s 间隔，保留最近 60 点）

- [ ] **Step 1: 在 `admin.html` 首页视图加入监控卡片网格**：内存、CPU、网络上传、网络下载、JDK、玩家数、TPS 各一张卡片，每张含标题、当前占用数值、Canvas 曲线图、服务器属性卡片（核心版本、游戏版本）

- [ ] **Step 2: 创建 `js/charts.js`**：`drawChart(canvas, data, opts)` 用 Canvas 2D 绘制折线曲线，带进入动画（曲线从左到右生长），曲线不超出 Canvas；`admin.js` 模拟数据（随机游走）每秒更新数值与曲线、重绘

- [ ] **Step 3: 验证**：打开 `admin.html`，卡片内曲线实时滚动、有动画、不溢出卡片；数值随时间变化

- [ ] **Step 4: Commit**

```bash
git add admin.html js/charts.js js/admin.js
git commit -m "feat: home monitoring cards with animated canvas curves"
```

---

### Task 5: 占位页面与日志/命令交互

**Files:**
- Modify: `admin.html`
- Modify: `js/admin.js`

**Interfaces:**
- Consumes: `switchView(id)`、`#terminal`、`#cmd-input`
- Produces: 文件管理/模组插件/玩家列表三个视图为占位页（居中提示"后续实现"）

- [ ] **Step 1: 在 `admin.html` 加入三个占位视图**（文件管理/模组插件/玩家列表），各自居中显示说明文字

- [ ] **Step 2: `js/admin.js` 实现日志与命令**：终端预填若干条模拟日志；命令框回车后在终端追加一条用户输入 + 一条模拟回显（如 `[INFO] 指令已发送: <cmd>`），自动滚动到底部

- [ ] **Step 3: 验证**：导航切到三个占位页正常显示；命令框输入回车，日志追加并自动滚动

- [ ] **Step 4: Commit**

```bash
git add admin.html js/admin.js
git commit -m "feat: placeholder pages and terminal command interaction"
```
