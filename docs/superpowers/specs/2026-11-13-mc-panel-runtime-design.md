# MC 管理面板 · 运行核心系统 设计文档

日期：2026-11-13
状态：待批准

## 意图与缘由

当前面板是纯静态前端（HTML/CSS/JS + localStorage 模拟数据、模拟日志、假玩家/文件/插件）。要成为真正可用的 Minecraft 服务器管理器，需要一个 **Node.js 后端**来实际运行 Java 服务器进程：流式日志、发送命令、采集真实指标、管理文件与插件、下载服务器核心。

项目定位为**公开开源**，要求 **Windows / macOS / Linux 三平台可用**。

## 目标

1. Node.js 后端单进程托管：静态前端 + HTTP API + WebSocket 实时通道。
2. 真正启动/停止服务器：`spawn(java, ['-jar','server.jar','nogui'])`，cwd=服务器目录；stdout/stderr 逐行流到前端终端；命令写回 stdin。
3. JDK 可选：检测已安装的任意 OpenJDK 版本，每个服务器可指定；**JDK 是唯一需要用户手动安装的**（面板不自动下载/安装 JDK）。
4. 跨平台一致：进程控制、路径、JDK 检测在 Win/mac/Linux 均可。
5. 全自动：创建服务器时**自动下载服务器核心**（原版/Fabric/Paper 真实 API → server.jar）、**自动安装插件/模组**（Modrinth 下载 + 解压到 plugins/ 或 mods/）、自动初始化 `eula.txt`/`server.properties`。
6. 文件管理支持多种源：**本地文件系统、FTP、SFTP**（可配置连接并切换）。
7. 玩家支持**账号/密码**：可设置/重置账号与密码（密码哈希存储，不落明文），关联角色/拉黑/在线状态。
8. 监听：默认 `0.0.0.0`，支持公网/局域网访问（`--host`/`--port` 可配）。
9. 面板鉴权：**账号密码登录**（首启创建管理员，密码 `crypto.scrypt` 加盐哈希，会话 Token/Cookie 保护所有页面与 API）。
10. 发行：打包为 **Win/mac/Linux 单文件可执行**（`pkg` 内置 Node），端用户只需手动安装 JDK；同时提供源码运行方式。
11. 开源工程化：`package.json`（`bin`）、README、MIT LICENSE、`.gitignore`、构建脚本。

## 非目标

- 不自动安装/下载 **JDK**（唯一手动项；其余全部自动）。
- 不做 Electron 桌面壳（网络面板即可）。
- 不做云托管/远程服务器管理（MVP 先本地运行）。
- 不实现 HTTPS/证书（MVP 明文 HTTP，公网部署建议置于反向代理后；注明即可）。

## 约束

- 依赖：WebSocket 用 `ws`；文件源用 `basic-ftp`（FTP）与 `ssh2-sftp-client`（SFTP）；打包用 `pkg`（构建期）；加密/哈希全部用 Node 内置 `crypto`（AES-256-GCM、scrypt）；其余全部 Node 内置（`http`/`fs`/`child_process`/`path`/`os`）。
- 数据落盘为 JSON：`data/servers.json`、`data/players.json`、`data/connections.json`（FTP/SFTP 连接配置，密码 AES-256-GCM 加密存储）。
- 服务器核心由面板**自动下载**（原版 / Fabric / Paper 真实 API），无需用户手动放置。
- 安全：登录/玩家密码用 **scrypt 加盐哈希**（每用户随机盐，不可逆）；FTP/SFTP 密码等可逆机密用 **AES-256-GCM**（每次随机 IV + 认证标签）；密钥来自 `data/.secret`（首启生成）或环境变量；日志不打印敏感信息。

### 加密与哈希方案（AES-256 + 加盐哈希）
- 可逆加密：`crypto.createCipheriv('aes-256-gcm', key, iv)`；key=scrypt(主密钥, 固定盐, 32B)（AES-256），每条记录随机 12B IV，密文+16B authTag 存储为 `iv:tag:data`；解密用 `createDecipheriv`。
- 加盐哈希：`crypto.scryptSync(password, salt, 64)`，每用户随机 16B salt，存 `salt:hash`；校验用 `timingSafeEqual`。
- 主密钥：首启生成 32B 随机密钥写入 `data/.secret`（chmod 600），或环境变量 `MC_PANEL_SECRET`。

## 方案（considered）

- **A（选）**：Node 内置 `http` + `ws` 单进程。依赖最少、开源友好、三平台行为一致。
- B：Express + Socket.io。功能相同但依赖更重、体积更大，无必要。
- C：Electron 桌面壳。过重，否决。
- 理由：A 以最少依赖实现全部需求，最适合公开开源与三平台分发。

## 用户已定部分

- 平台：Node.js；三平台（Win/mac/Linux）。
- 发行：打包三平台单文件可执行（`pkg` 内置 Node），端用户只需手动安装 JDK；另提供源码运行。
- JDK：任意 OpenJDK 可选；面板检测已装实例，每服务器指定，回退 `PATH` 的 `java`；**JDK 由用户手动安装，其余全自动**。
- 自动化：服务器核心自动下载、插件/模组自动安装、`eula.txt`/`server.properties` 自动初始化、日志/指标/玩家全自动。
- 开源：MIT 许可证 + README + `bin` 入口 + 构建脚本。

## 架构要点（builder 可细化）

### 进程与路由
- `server.js`：CLI 入口；`--port`（默认 8080）、`--host`（默认 0.0.0.0）。
- 端口可配置：`data/settings.json` 的 `{ port, host }` 持久化，面板内"设置"可改端口（保存后重启生效；`--port` CLI 优先）。
- 静态托管：`index.html`、`admin.html`、`add-server.html`、`mod-download.html`、`css/`、`js/`。
- 鉴权中间件：除 `/login`、静态资源（登录页）外，所有页面与 API 需有效会话。
- HTTP API：
  - `GET/PUT /api/settings`（端口、主机、其他偏好）
  - `POST /api/login`（账号密码 → 会话 Token/Cookie）、`POST /api/logout`、`GET /api/session`
  - `GET /api/servers`、`POST /api/servers`、`PUT /api/servers/:id`、`DELETE /api/servers/:id`
  - `POST /api/servers/:id/start`、`/stop`、`/kill`
  - `POST /api/servers/:id/command`（写 stdin）
  - `GET /api/servers/:id/files`、上传/下载/删除/重命名/压缩/解压/权限/编辑
  - `GET /api/connections`、`POST /api/connections`（FTP/SFTP 连接配置）、`POST /api/connections/:id/test`
  - `GET /api/connections/:id/files` 及同源文件操作（FTP/SFTP 后端）
  - `POST /api/players/:name/account`（设置账号）、`POST /api/players/:name/password`（重置密码）
  - `GET /api/plugins`、`POST /api/plugins/install`（Modrinth 下载 + 解压到 plugins/）
  - `POST /api/core/download`（原版/Fabric/Paper → server.jar）
  - `GET /api/jdks`（检测结果）
- WebSocket `/ws`：服务器日志行、指标（内存/CPU/TPS/玩家）、玩家进出、状态变更。

### 数据模型（data/servers.json）
```
{ id, name, dir, jar, javaPath, jvmArgs, maxMem, autoStart,
  status: stopped|starting|running|stopping, pid, lastError }
```

### 文件后端抽象（local / FTP / SFTP）
- 统一接口：`list(path)`、`read(path)`、`write(path,data)`、`upload(stream,path)`、`download(path)`、`rename(a,b)`、`delete(path)`、`mkdir(path)`、`chmod(path,mode)`、`stat(path)`。
- 实现：`LocalFS`（Node `fs`）、`FTP`（`basic-ftp`）、`SFTP`（`ssh2-sftp-client`，支持密码或 SSH 私钥）。
- 连接配置存 `data/connections.json`：`{id, name, type: ftp|sftp, host, port, user, auth: password|key, ...}`；密码用 AES-256-GCM 加密（见加密与哈希方案）存储。
- 前端文件管理器：顶部"来源"切换（本地 / FTP / SFTP），连接配置弹窗 + 测试连接；操作路由到当前后端。

### 面板鉴权
- 首次运行：无管理员则进入初始化（创建管理员账号 + 密码），否则跳转登录页。
- `data/auth.json`：`{ username, salt, hash }`（`crypto.scrypt` 加盐哈希）；会话 Token 为随机串，存 `data/sessions.json`（或内存 + Cookie），带过期时间。
- 登录页（`login.html`）与未登录跳转；所有 `/api/*`（除 login）与后台页面受保护。
- 前端：API 401 → 跳转登录；登录后回跳。

### 玩家账号
- `data/players.json`：`{name, uuid, account, salt, hash, online, role, black, reason, ip, first, last, playMin}`。
- 账号/密码设置与重置：`POST /api/players/:name/account|password`；密码用 `crypto.scrypt` 加盐哈希（每用户随机盐），不存明文。
- 前端玩家弹窗增加"账号/密码"字段与重置入口；不显示明文。

### ServerRuntime 类
- `start()`：`spawn(javaPath||detectJava(), ['-Xms/-Xmx'..,'-jar',jar,'nogui'], {cwd:dir})`；行缓冲 stdout/stderr → WS。
- `stop()`：stdin `stop\n` → 等待退出（超时）→ SIGTERM → 兜底 `taskkill`(Win)/`kill`(POSIX)。
- `kill()`：强制结束（Windows `taskkill /F /PID`，POSIX `SIGKILL`）。
- 日志解析：`joined the game`/`left the game` → 玩家进出；内存行 / GC → 内存；`/tps` 输出或日志 → TPS。
- 指标采样：JVM RSS（POSIX `ps -o rss= -p pid`；Windows `tasklist /FI "PID eq X"`）+ 日志解析；每 1s 推 WS。
- 崩溃/退出处理：更新状态 + WS 事件。

### JDK 检测
- 候选源：`JAVA_HOME/bin/java`、`PATH` 上 `java`、Linux `/usr/lib/jvm/*/bin/java`、Windows `C:\Program Files\Java\*\bin\java.exe`（及 `JAVA_HOME` 环境）、macOS `/Library/Java/JavaVirtualMachines/*/Contents/Home/bin/java`。
- 每个候选执行 `java -version`，解析版本（1.x→x、17/21/25…），去重排序。
- 返回 `[{path, version, source}]`；UI 提供下拉 + 自定义路径输入；找不到回退 `PATH` 的 `java` 并提示。

### 前端改动
- `js/admin.js`：日志终端、启动/停止/强制终止、指标曲线、玩家列表改为 WebSocket/API 实时数据（移除随机模拟）。
- `js/servers.js`：服务器列表读 `/api/servers`。
- `js/files.js`、`js/plugins.js`：改为后端 API。
- `js/mod-download.js`：已真实（保留），下载改为走后端落盘。
- `admin.html`：顶栏 JDK 选择下拉 + 内存/JVM 参数设置。

### 安全与运维
- 默认仅监听 `127.0.0.1`。
- `.gitignore`：`node_modules/`、`data/`（用户数据）、服务器运行目录、`package-lock.json` 视情况保留。
- README：三平台安装步骤（手动装 Node + JDK）、`npm install`、`node server.js`。

## 留待实施时细化的点

- 日志行着色规则（info/warn/error/cmd）映射。
- `ws` 与静态服务复用同一 http server 的端口。
- 单服务器与多服务器并发的资源限制（可先支持多服务器独立运行）。
- Modrinth 安装的具体版本选择（MVP 取 latest）。
- `pkg` 打包需内联静态资源与 `data/` 模板；构建脚本输出 `dist/mc-panel-<platform>`。
- 自动下载核心：记录所选版本源（vanilla/fabric/paper）与版本号，`server.jar` 落盘到服务器目录并校验。
- FTP/SFTP：连接配置的密码存储策略（加密 vs 提示仅内存）；SFTP 私钥支持；断线重连与超时。
- 鉴权：会话过期时长、失败锁定；`--host 0.0.0.0` 公网部署建议 HTTPS（反向代理）+ 强密码；日志脱敏。
