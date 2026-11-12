# MC 管理面板 · 运行核心系统 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让面板真正运行 Minecraft 服务器（Node 后端 + WebSocket），支持 JDK 选择、登录鉴权、FTP/SFTP 文件、自动下载核心/插件、跨平台打包。

**Architecture:** Node 内置 `http` + `ws` 单进程托管静态前端 + HTTP API + WebSocket；`ServerRuntime` 用 `spawn(java -jar server.jar nogui)` 运行服务器；数据落盘 `data/*.json`；鉴权用 scrypt 加盐哈希 + 会话 Cookie；机密用 AES-256-GCM。

**Tech Stack:** Node ≥18（内置 `http`/`fs`/`crypto`/`child_process`/`node:test`）、`ws`、`basic-ftp`、`ssh2-sftp-client`、构建期 `pkg`。

**Spec:** `docs/superpowers/specs/2026-11-13-mc-panel-runtime-design.md`

## Global Constraints

- 运行依赖：`ws`、`basic-ftp`、`ssh2-sftp-client`；测试用内置 `node --test`；加密/哈希全部 Node 内置 `crypto`。
- 密码：scrypt 加盐哈希（每用户随机 16B 盐，`salt:hash`），校验用 `timingSafeEqual`；机密（FTP/SFTP）AES-256-GCM `iv:tag:data`。
- 默认 `--host 0.0.0.0`、`--port 8080`；端口/主机可在面板设置（`data/settings.json`）改，`--port`/`--host` CLI 优先。
- 除登录与登录页静态资源外，所有页面与 `/api/*` 需有效会话。
- 日志不打印敏感信息；`data/.secret` chmod 600。
- 跨平台：Win 用 `taskkill /F /PID`，POSIX `SIGTERM`→`SIGKILL`；路径用 `path` 拼接。

## Review Focus

- 服务器进程意外退出/崩溃：状态更新为 stopped 并推 WS 事件，前端显示错误（Task 7）。
- 未登录访问受保护页面/API：返回 401 并跳转登录，不泄露数据（Task 9）。
- 无效/过期会话：中间件拒绝，前端 401 处理（Task 9/17）。
- FTP/SFTP 连接失败/超时：API 返回可读错误，UI toast 提示，不崩溃（Task 13/14）。
- 端口被占用/非法端口：启动给出明确错误并退出码非 0（Task 10）。
- 核心下载非 2xx/超时：报错并清理半成品文件（Task 16）。

---

## Phase 1 — 后端核心

### Task 1: 项目脚手架

**Files:**
- Create: `package.json`、`.gitignore`、`LICENSE`、`README.md`、`bin/mc-panel`、`test/helpers/tmp.js`

**Interfaces:**
- Produces: `package.json`（`"bin": {"mc-panel": "server.js"}`, `"scripts": {"start":"node server.js","test":"node --test test/"}`, deps `ws`,`basic-ftp`,`ssh2-sftp-client`, devDep `pkg`）；`test/helpers/tmp.js` 导出 `makeTmpDir()`（返回临时目录路径）。

- [ ] **Step 1: 写 package.json 与 .gitignore/LICENSE/README 骨架**
- [ ] **Step 2: 写 test/helpers/tmp.js**（`fs.mkdtempSync(path.join(os.tmpdir(),'mc-'))`）
- [ ] **Step 3: 写冒烟测试** `test/scaffold.test.js`：断言 `require('../package.json').bin['mc-panel']==='server.js'`
- [ ] **Step 4: 运行 `node --test test/scaffold.test.js` 通过**
- [ ] **Step 5: Commit** `chore: scaffold node project (bin, test runner, license)`

### Task 2: 加密与哈希工具

**Files:**
- Create: `src/crypto.js`、`test/crypto.test.js`

**Interfaces:**
- Produces: `hashPassword(pw) -> "salt:hash"`、`verifyPassword(pw, stored) -> bool`、`encryptSecret(plain, masterKey) -> "iv:tag:data"`、`decryptSecret(blob, masterKey) -> string`、`loadMasterKey(dataDir) -> Buffer`（不存在则生成 32B 写 `data/.secret`，chmod 600）。

- [ ] **Step 1: 写失败测试**：`hashPassword/verifyPassword` 往返；`encryptSecret/decryptSecret` 往返；错误密钥解密抛错；`loadMasterKey` 生成并复用。
- [ ] **Step 2: 运行确认失败**（`ReferenceError`）
- [ ] **Step 3: 实现 `src/crypto.js`**（scryptSync 64B；AES-256-GCM key=scrypt(master,固定盐,32B)，随机 12B IV，authTag 16B）
- [ ] **Step 4: 运行测试通过**
- [ ] **Step 5: Commit** `feat: crypto utils (scrypt salted hash, AES-256-GCM)`

### Task 3: JSON 存储

**Files:**
- Create: `src/store.js`、`test/store.test.js`

**Interfaces:**
- Produces: `JsonStore(file)` → `{ load() -> obj, save(obj) -> void }`；原子写（写临时文件后 rename）。

- [ ] **Step 1: 失败测试**：save 后 load 返回同值；load 不存在返回 `{}`；保存为合法 JSON。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/store.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: atomic json store`

### Task 4: 设置存储

**Files:**
- Create: `src/settings.js`、`test/settings.test.js`

**Interfaces:**
- Consumes: `JsonStore`（Task 3）
- Produces: `getSettings(dataDir) -> {port,host}`（默认 `{port:8080,host:'0.0.0.0'}`）、`setSettings(dataDir, patch) -> settings`（校验 port 1-65535 整数、host 合法）。

- [ ] **Step 1: 失败测试**：默认值；set 后持久化；非法 port 抛错。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/settings.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: settings store with port/host`

### Task 5: JDK 检测

**Files:**
- Create: `src/jdk.js`、`test/jdk.test.js`

**Interfaces:**
- Produces: `parseJavaVersion(output) -> "21"`（解析 `openjdk version "21.0.13"`、`1.8.0_392`→`8`）；`listJdks(env) -> [{path, version, source}]`（候选源：`JAVA_HOME/bin/java`、`PATH` 的 `java`、`/usr/lib/jvm/*/bin/java`、`C:\Program Files\Java\*\bin\java.exe`、`/Library/Java/JavaVirtualMachines/*/Contents/Home/bin/java`；去重按版本降序）；`detectJava(env) -> path`（回退 PATH java）。

- [ ] **Step 1: 失败测试**：`parseJavaVersion` 各格式；`detectJava` 回退 PATH。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/jdk.js`**（用 `fs.existsSync` + `spawnSync(java,'-version')` 解析）
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: jdk detection (multi-version, cross-platform)`

### Task 6: 服务器存储

**Files:**
- Create: `src/servers.js`、`test/servers.test.js`

**Interfaces:**
- Consumes: `JsonStore`
- Produces: `ServerStore(dataDir)` → `{ list(), get(id), create(s), update(id,patch), remove(id) }`；服务器对象 `{id,name,dir,jar,javaPath,jvmArgs,maxMem,autoStart,status:'stopped',pid,lastError}`；create 生成 `id`（`crypto.randomUUID()`）与默认 `dir`（`data/servers/<id>`）。

- [ ] **Step 1: 失败测试**：CRUD；create 生成 id/dir；update 合并；remove 删除。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/servers.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: server store (CRUD)`

### Task 7: ServerRuntime

**Files:**
- Create: `src/runtime.js`、`test/runtime.test.js`

**Interfaces:**
- Consumes: `ServerStore`、`jdk.detectJava`
- Produces: `ServerRuntime({server, javaPath, dataDir, onLog, onEvent})` → `{ start(), stop(timeoutMs), kill(), status(), send(cmd) }`；
  - `start()`：`spawn(javaPath, [...jvmArgs,'-jar',jar,'nogui'], {cwd:dir})`；stdout/stderr 按行回调 `onLog(line, source)`；进程退出回调 `onEvent({type:'exit', code})`；置状态 running/starting。
  - `stop()`：`send('stop')` → 等退出（默认 30s）→ SIGTERM → `kill()`；POSIX `kill(pid,'SIGTERM'|'SIGKILL')`，Win `taskkill /PID n`。
  - `parseServerLine(line) -> {type:'join'|'leave'|'info'|'warn'|'error'|'cmd', name?}`（匹配 `joined the game`、`left the game`）。

- [ ] **Step 1: 失败测试**：用假 java 脚本（`test/fixtures/fake-java.js`，`setInterval` 打印、读 stdin 遇 `stop` 退出）；`start` 触发 onLog；`send('stop')` 触发退出；`parseServerLine` 各类型；`kill` 结束进程。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/runtime.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: server runtime (spawn/stop/kill/log streaming)`

### Task 8: 指标采样

**Files:**
- Create: `src/metrics.js`、`test/metrics.test.js`

**Interfaces:**
- Consumes: `runtime`
- Produces: `sampleRss(pid, platform) -> MB|null`（POSIX `ps -o rss= -p pid`，Win `tasklist /FI "PID eq n"`）；`MetricsTracker({onSample})` → `{ feed(line), start(pid, intervalMs), stop() }`；`feed` 解析内存行（`used memory`/GC）与 TPS（`/tps` 输出）；`start` 每 interval 采样 RSS 并 `onSample({rssMb, players, tps})`。

- [ ] **Step 1: 失败测试**：`sampleRss` 对假 pid 返回 null 不抛；`feed` 解析玩家/内存/TPS 并回调。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/metrics.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: metrics sampler (rss, players, tps)`

### Task 9: 鉴权

**Files:**
- Create: `src/auth.js`、`test/auth.test.js`

**Interfaces:**
- Consumes: `crypto`（Task 2）、`JsonStore`
- Produces: `Auth({dataDir})` → `{ setup(username, password), isSetup(), login(user, pw) -> token|null, logout(token), verify(token) -> bool, middleware(req) -> boolean }`；token 为 `randomBytes(32).toString('hex')`，会话存内存 + 过期（默认 24h）。

- [ ] **Step 1: 失败测试**：setup 后 isSetup true；login 正确/错误密码；verify 有效/失效/过期；middleware 对无 Cookie 返回 false。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/auth.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: panel auth (setup/login/session/middleware)`

### Task 10: HTTP 服务器与路由

**Files:**
- Create: `src/server.js`、`src/handlers.js`、`test/http.test.js`

**Interfaces:**
- Consumes: 全部以上
- Produces: `createServer({dataDir, auth, runtimeMap, jdks}) -> http.Server`；静态托管（`index.html`/`admin.html`/`add-server.html`/`mod-download.html`/`css/`/`js/`）；`/api/settings` GET/PUT、`/api/jdks`、`/api/servers` CRUD + `start/stop/kill/command`、`/api/login|logout|session`；未认证 API→401 JSON `{error}`；监听失败（端口占用）抛错。

- [ ] **Step 1: 失败测试**：未认证 GET `/api/servers` → 401；登录后 CRUD 200；静态 `/index.html` 200；非法端口监听抛错。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/server.js`+`src/handlers.js`**（`node:http`，JSON body 解析，Cookie 解析）
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: http server + api routes + static + auth`

### Task 11: WebSocket 实时通道

**Files:**
- Create: `src/ws.js`、`test/ws.test.js`

**Interfaces:**
- Consumes: `ws`、`runtime`、`auth`
- Produces: `attachWs(httpServer, {auth, runtimeMap})`；`broadcast(serverId, type, data)`；客户端需有效会话（握手带 Cookie）；事件类型 `log`/`metrics`/`player`/`status`。

- [ ] **Step 1: 失败测试**：未认证握手拒绝；认证后收到 `log` 与 `status` 事件。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/ws.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: websocket hub (log/metrics/status)`

---

## Phase 2 — 文件/插件/核心

### Task 12: 本地文件后端

**Files:**
- Create: `src/files/local.js`、`test/files-local.test.js`

**Interfaces:**
- Produces: `LocalFS(root)` → `{ list(path), read(path), write(path,data), upload(stream,path), download(path), rename(a,b), delete(path), mkdir(path), chmod(path,mode), stat(path) }`；路径需在 `root` 内（`path.resolve` 前缀校验，越界抛错）。

- [ ] **Step 1: 失败测试**：list/read/write/rename/delete/mkdir/chmod/stat 往返；`../` 越界抛错。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/files/local.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: local fs backend`

### Task 13: FTP 后端

**Files:**
- Create: `src/files/ftp.js`、`test/files-ftp.test.js`

**Interfaces:**
- Consumes: `basic-ftp`
- Produces: `FTPBackend({host,port,user,password,secure})` → 同上接口（`connect()` 惰性；每次操作前确保连接）；错误透传为可读 `Error`。

- [ ] **Step 1: 失败测试**：用本地 mock FTP（`basic-ftp` 指向 `127.0.0.1:0` 失败）断言 `connect` 失败抛可读错误。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/files/ftp.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: ftp backend`

### Task 14: SFTP 后端

**Files:**
- Create: `src/files/sftp.js`、`test/files-sftp.test.js`

**Interfaces:**
- Consumes: `ssh2-sftp-client`
- Produces: `SFTPBackend({host,port,user,password|privateKey})` → 同上接口。

- [ ] **Step 1: 失败测试**：连接失败抛可读错误。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/files/sftp.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: sftp backend`

### Task 15: 连接配置 + 文件 API

**Files:**
- Create: `src/connections.js`、`src/handlers-files.js`、`test/files-api.test.js`

**Interfaces:**
- Consumes: `crypto`、`JsonStore`、`LocalFS/FTP/SFTP`
- Produces: `Connections(dataDir, masterKey)` → `{ list(), create(c), update(id,patch), remove(id), getBackend(id) }`；密码 AES-256-GCM 加密存储；`/api/connections` CRUD + `POST /api/connections/:id/test`、`GET /api/connections/:id/files` 及文件操作；`/api/servers/:id/files`（本地后端，root=服务器目录）。

- [ ] **Step 1: 失败测试**：create 加密存储（读取文件不含明文）；test 失败返回可读错误；本地文件 API 200。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/connections.js`+`src/handlers-files.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: ftp/sftp connections + file api`

### Task 16: 核心与插件自动下载

**Files:**
- Create: `src/download.js`、`test/download.test.js`

**Interfaces:**
- Produces: `downloadCore({type:'vanilla'|'fabric'|'paper', version, dir}) -> jarPath`（vanilla：`piston-meta.mojang.com` version_manifest→version json→`server.jar`；fabric：`meta.fabricmc.net` installer 下载；paper：`api.papermc.io/v2/projects/paper/versions/<v>/builds`→latest build→下载）；`downloadModrinth({query, version, dir}) -> files[]`（`api.modrinth.com/v2/project/<id>/version`，下载首文件，解压 zip 到 dir）；均用内置 `fetch`，失败清理半成品。

- [ ] **Step 1: 失败测试**：用本地 mock http server 提供 fixture JSON，断言下载到 dir 并校验；非 2xx 抛错且无残留。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/download.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: core + modrinth auto download`

---

## Phase 3 — 前端接线

### Task 17: 玩家账号

**Files:**
- Create: `src/players.js`、`src/handlers-players.js`、`test/players.test.js`

**Interfaces:**
- Consumes: `crypto`（Task 2）、`JsonStore`
- Produces: `Players(dataDir)` → `{ list(), get(name), setAccount(name, account), setPassword(name, password) }`；玩家对象 `{name, uuid, account, salt, hash, online, role, black, reason, ip, first, last, playMin}`；`POST /api/players/:name/account`、`POST /api/players/:name/password`（scrypt 加盐哈希）、`GET /api/players`。

- [ ] **Step 1: 失败测试**：setPassword 后存储不含明文（`data/players.json` 无明文）；`verify` 通过；account 更新。
- [ ] **Step 2: 确认失败**
- [ ] **Step 3: 实现 `src/players.js`+`src/handlers-players.js`**
- [ ] **Step 4: 通过**
- [ ] **Step 5: Commit** `feat: player accounts (salted hash, no plaintext)`

### Task 18: 登录页 + 鉴权接线

**Files:**
- Create: `login.html`、`js/login.js`
- Modify: `js/api.js`（新建，封装 fetch + 401 跳转）

**Interfaces:**
- Consumes: `auth` API
- Produces: `js/api.js` 导出 `request(path, opts)`（自动带 Cookie，401 → `location='/login.html'`）；`login.html` 表单（首启显示"初始化管理员"）。

- [ ] **Step 1: 写 `js/api.js`**
- [ ] **Step 2: 写 `login.html`+`js/login.js`**（登录/初始化，成功后跳 `/`）
- [ ] **Step 3: 手动验证**：未登录访问 `/` 跳登录；登录后进入。
- [ ] **Step 4: Commit** `feat: login page + api client`

### Task 19: 管理后台实时接线

**Files:**
- Modify: `js/admin.js`、`admin.html`、`js/effects.js`

**Interfaces:**
- Consumes: `api.js`、`/ws`
- Produces: `wsConnect(serverId)` → 处理 `log`/`metrics`/`status`/`player` 事件；替换随机模拟为真实数据。

- [ ] **Step 1: 实现 `wsConnect` 与日志/指标/状态渲染**
- [ ] **Step 2: 顶栏 JDK 下拉 + 内存/JVM 参数设置（`/api/jdks`、`PUT /api/servers/:id`）**
- [ ] **Step 3: 手动验证**：启动/停止/命令/曲线/玩家列表实时。
- [ ] **Step 4: Commit** `feat: admin realtime wiring`

### Task 20: 列表/文件/插件接线

**Files:**
- Modify: `js/servers.js`、`js/files.js`、`js/plugins.js`、`js/mod-download.js`

**Interfaces:**
- Consumes: `api.js`
- Produces: 列表读 `/api/servers`；文件走 `/api/servers/:id/files` 或 `/api/connections/:id/files`；插件走 `/api/plugins`；下载走 `/api/core/download`、`/api/plugins/install`。

- [ ] **Step 1: servers.js 接 `/api/servers`**
- [ ] **Step 2: files.js 接文件 API + 来源切换（本地/FTP/SFTP）**
- [ ] **Step 3: plugins.js/mod-download.js 接后端安装**
- [ ] **Step 4: 手动验证**
- [ ] **Step 5: Commit** `feat: list/file/plugin api wiring`

---

## Phase 4 — 打包与文档

### Task 21: 打包脚本 + README + 收尾

**Files:**
- Create: `build.js`、`scripts/pkg-assets.js`
- Modify: `package.json`（`"build": "node build.js"`）、`README.md`

**Interfaces:**
- Produces: `build.js` 用 `pkg` 内联静态资源与 `data/` 模板，输出 `dist/mc-panel-<platform>`（win/mac/linux）；README 三平台安装（手动装 JDK、运行/解压、登录初始化）。

- [ ] **Step 1: 写 `build.js` + `scripts/pkg-assets.js`**
- [ ] **Step 2: 写 README（安装/运行/登录/端口/JDK）**
- [ ] **Step 3: 运行 `npm run build` 成功**
- [ ] **Step 4: Commit** `chore: cross-platform packaging + readme`
