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

## 单文件运行（三平台）

从 GitHub **Releases**（或 Actions Artifacts）下载对应平台文件，**只需安装 JDK 8+**，无需 Node。

### Linux（`linux-ttc-manager`）

```bash
# 1. 赋予执行权限
chmod +x linux-ttc-manager
# 2. 运行（面板数据写入 ./data，端口默认 8080）
./linux-ttc-manager
# 或指定数据目录
MC_PANEL_DATA=/opt/ttcmanager-data ./linux-ttc-manager
```

### macOS（`mac-ttc-manager`）

```bash
# 1. 赋予执行权限
chmod +x mac-ttc-manager
# 2. （首次）若被 Gatekeeper 拦截，去除隔离标记后运行
xattr -d com.apple.quarantine mac-ttc-manager
./mac-ttc-manager
```

> 也可右键文件 →「打开」以绕过未签名警告。

### Windows（`win-ttc-manager.exe`）

双击运行即可（或在终端执行 `win-ttc-manager.exe`）。若 SmartScreen 拦截，点「更多信息」→「仍要运行」。

### 运行后

浏览器打开 `http://localhost:8080`（局域网内其他设备用 `http://<主机IP>:8080`），首次访问初始化管理员账号。

## 修改端口 / 监听地址

默认监听 `0.0.0.0:8080`。两种方式修改，任选其一：

### 方式一：启动时用环境变量（推荐）

```bash
# Linux / macOS
PORT=9000 HOST=0.0.0.0 ./linux-ttc-manager
# Windows (PowerShell)
$env:PORT="9000"; $env:HOST="0.0.0.0"; .\win-ttc-manager.exe
```

环境变量 `PORT` / `HOST` 优先级高于配置文件。

### 方式二：编辑数据目录下的 `settings.json`

数据目录默认 `./data`（源码运行）或可用 `MC_PANEL_DATA` 指定。修改后**重启面板**：

```json
{ "port": 9000, "host": "0.0.0.0" }
```

> 若用单文件可执行且未设置 `MC_PANEL_DATA`，建议显式指定一个可写数据目录，例如
> `MC_PANEL_DATA=/opt/ttcmanager-data ./linux-ttc-manager`。

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
