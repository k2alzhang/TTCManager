# TTCManager

Minecraft 服务器管理面板 — Node.js 实现，跨 Windows / macOS / Linux。

自带 Web 界面：服务器列表、管理后台（控制台日志、启停、实时指标）、文件管理（本地 / FTP / SFTP）、插件管理、玩家账号（管理员 / 拉黑 / 密码）、核心与插件自动下载。

## 要求

- **JDK / JRE 8+**（服务器运行需要，**手动安装**，可多版本并存自动检测）
- Node.js 18+（源码运行方式）；或直接使用打包好的单文件可执行（内置 Node）

## 安装与运行（源码方式）

```bash
npm install
node server.js
# 或 npm start
```

默认监听 `0.0.0.0:8080`（可在「设置」修改端口 / 主机）。数据存放于 `./data`（可用环境变量 `MC_PANEL_DATA` 覆盖）。

## 打包单文件可执行（三平台）

```bash
npm install
npm run build     # 生成 dist/ 下的 linux-ttc-manager / mac-ttc-manager / win-ttc-manager.exe
```

> ⚠️ 需在桌面系统（Windows / macOS / Linux）上执行。pkg 只能为当前宿主平台打包，
> 无法在 Android / Termux 上交叉生成桌面产物（会报 "only for android"）。

也可用 GitHub Actions 自动构建并发布：`.github/workflows/build.yml` 在推送 `v*` 标签（或手动触发）时，
于 ubuntu / macos / windows runner 上分别产出三平台单文件，并**自动上传到 GitHub Release**
（标签 `v*` 用该标签，手动触发用 `package.json` 的 version 作为标签），也可在 Actions 页下载 artifact。

端用户只需安装 JDK，双击可执行文件即可运行面板，无需 Node。

## 首次使用

1. 浏览器打开 `http://<主机>:8080`
2. 首次访问自动进入「初始化管理员」：设置用户名 + 密码（≥4 位）
3. 登录后点击「添加服务器」：
   - **下载核心**：选择原版 / Fabric / Paper + 版本 → 自动下载到服务器目录
   - **上传核心**：本地上传 jar（需先在管理后台设置服务器路径）
4. 在管理后台设置服务器路径 / 内存 / JDK（自动检测已安装 JDK），即可启动

## 连接与文件

每个服务器可在后台「连接」配置文件存储方式：

| 类型 | 说明 |
|------|------|
| 本地 | 直接使用服务器目录（`path` 字段） |
| FTP | `basic-ftp`，支持 TLS |
| SFTP | `ssh2-sftp-client` |

FTP / SFTP 密码使用 **AES-256-GCM** 加密存储（主密钥在 `data/.secret`，权限 0600，可用 `MC_PANEL_SECRET` 环境变量覆盖）。登录密码使用 **scrypt 加盐哈希**。

## 安全

- 面板需要账号密码登录（首启初始化管理员），API 除登录外全部校验会话令牌（7 天有效）。
- 主密钥存于 `data/.secret`（chmod 600）。
- 文件访问做路径穿越防护。

## 开发

```bash
npm test            # node --test，零测试依赖
```

## 目录结构

```
server.js            入口（http + ws + 运行时管理器）
bin/ttc-manager     CLI shim
src/                 后端逻辑（加密/存储/鉴权/运行时/文件后端/下载…）
js/                  前端脚本（api.js 为鉴权封装，其余为各页逻辑）
css/style.css        设计系统（浅色 slate + 靛蓝 accent）
test/                node:test 测试
data/                运行时数据（git 忽略）
```
