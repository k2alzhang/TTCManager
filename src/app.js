const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { getSettings } = require("./settings.js");
const { ensureAdmin, setupAdmin, login, verifyToken, logout } = require("./auth.js");
const { listServers, getServer, updateServer, addServer } = require("./servers.js");
const { loadMasterKey } = require("./crypto.js");
const { getBackend } = require("./files.js");
const { getConnection, setConnection } = require("./connections.js");
const { listPlayers, addPlayer, setAdmin, setBanned, setPlayerPassword, removePlayer } = require("./players.js");
const { listVersions } = require("./download.js");

function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try { resolve(JSON.parse(data || "{}")); } catch (e) { resolve({}); }
    });
  });
}

function tokenFrom(req) {
  const h = req.headers.authorization || "";
  if (h.startsWith("Bearer ")) return h.slice(7);
  const url = new URL(req.url, "http://x");
  return url.searchParams.get("token") || "";
}

function mime(p) {
  const ext = path.extname(p).toLowerCase();
  return { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".json": "application/json", ".ico": "image/x-icon" }[ext] || "application/octet-stream";
}

function createApp({ dataDir, manager, downloader, listVersions: listVersionsFn, staticRoot }) {
  const WEB_ROOT = staticRoot || path.join(__dirname, "..");
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://x");
      const p = url.pathname;

      if (p.startsWith("/api/")) {
        if (p === "/api/auth/setup" && req.method === "POST") {
          if (ensureAdmin(dataDir)) return json(res, 400, { error: "已初始化" });
          const body = await readBody(req);
          setupAdmin(dataDir, body);
          return json(res, 200, { ok: true });
        }
        if (p === "/api/auth/login" && req.method === "POST") {
          const body = await readBody(req);
          try {
            const token = login(dataDir, body.username, body.password);
            return json(res, 200, { token });
          } catch (e) {
            return json(res, 401, { error: e.message });
          }
        }
        if (p === "/api/auth/logout" && req.method === "POST") {
          logout(dataDir, tokenFrom(req));
          return json(res, 200, { ok: true });
        }
        if (p === "/api/auth/check") {
          return json(res, 200, { initialized: ensureAdmin(dataDir) });
        }
        if (p === "/api/servers" && req.method === "GET") {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          return json(res, 200, listServers(dataDir));
        }
        if (p === "/api/servers" && req.method === "POST") {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          const body = await readBody(req);
          try {
            return json(res, 200, addServer(dataDir, body));
          } catch (e) {
            return json(res, 400, { error: String(e.message || e) });
          }
        }
        const dlm = p.match(/^\/api\/servers\/([^/]+)\/download$/);
        if (dlm && req.method === "POST") {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          if (!downloader) return json(res, 500, { error: "下载器未就绪" });
          const body = await readBody(req);
          try {
            const dest = await downloader.download(dataDir, dlm[1], body, (n) => {});
            return json(res, 200, { ok: true, dest });
          } catch (e) {
            return json(res, 500, { error: String(e.message || e) });
          }
        }
        const fm = p.match(/^\/api\/servers\/([^/]+)\/files(?:\/([a-z]+))?$/);
        if (fm) {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          const id = fm[1];
          const action = fm[2];
          const key = loadMasterKey(dataDir);
          const backend = getBackend(dataDir, id, key);
          if (!action) {
            if (req.method === "GET") {
              const path0 = url.searchParams.get("path") || "";
              return json(res, 200, await backend.list(path0));
            }
            return json(res, 400, { error: "缺少操作" });
          }
          if (req.method !== "POST") return json(res, 405, { error: "method" });
          const body = await readBody(req);
          const full = String(body.path || "");
          const dir = full.includes("/") ? full.slice(0, full.lastIndexOf("/")) : "";
          const name = full.includes("/") ? full.slice(full.lastIndexOf("/") + 1) : full;
          if (action === "read") return json(res, 200, { content: await backend.readFile(dir, name) });
          if (action === "write") { await backend.writeFile(dir, name, body.content || ""); return json(res, 200, { ok: true }); }
          if (action === "mkdir") { await backend.mkdir(dir, name); return json(res, 200, { ok: true }); }
          if (action === "delete") { await backend.delete(dir, name); return json(res, 200, { ok: true }); }
          return json(res, 400, { error: "未知操作" });
        }
        const cm = p.match(/^\/api\/servers\/([^/]+)\/connection$/);
        if (cm) {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          const id = cm[1];
          const key = loadMasterKey(dataDir);
          if (req.method === "GET") return json(res, 200, getConnection(dataDir, id, key));
          if (req.method === "PUT" || req.method === "POST") {
            const body = await readBody(req);
            return json(res, 200, setConnection(dataDir, id, body, key));
          }
        }
        const cmdM = p.match(/^\/api\/servers\/([^/]+)\/command$/);
        if (cmdM && req.method === "POST") {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          if (!manager) return json(res, 500, { error: "运行管理器未就绪" });
          const body = await readBody(req);
          try {
            manager.send(cmdM[1], body.command || "");
            return json(res, 200, { ok: true });
          } catch (e) {
            return json(res, 400, { error: String(e.message || e) });
          }
        }
        const rm = p.match(/^\/api\/servers\/([^/]+)\/(start|stop|restart|kill)$/);
        if (rm && req.method === "POST") {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          if (!manager) return json(res, 500, { error: "运行管理器未就绪" });
          const id = rm[1];
          try {
            if (rm[2] === "start") await manager.start(id);
            else if (rm[2] === "stop") manager.stop(id);
            else if (rm[2] === "restart") await manager.restart(id);
            else manager.kill(id);
            return json(res, 200, { ok: true });
          } catch (e) {
            return json(res, 500, { error: String(e.message || e) });
          }
        }
        const sm = p.match(/^\/api\/servers\/([^/]+)$/);
        if (sm) {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          if (req.method === "GET") return json(res, 200, getServer(dataDir, sm[1]));
          if (req.method === "PUT") {
            const body = await readBody(req);
            return json(res, 200, updateServer(dataDir, sm[1], body));
          }
        }
        if (p === "/api/download/versions" && req.method === "GET") {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          const vendor = url.searchParams.get("vendor") || "";
          try {
            const fn = listVersionsFn || listVersions;
            return json(res, 200, await fn(vendor));
          } catch (e) {
            return json(res, 500, { error: String(e.message || e) });
          }
        }
        if (p === "/api/players" && req.method === "GET") {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          return json(res, 200, listPlayers(dataDir));
        }
        if (p === "/api/players" && req.method === "POST") {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          const body = await readBody(req);
          try {
            return json(res, 200, addPlayer(dataDir, body));
          } catch (e) {
            return json(res, 400, { error: String(e.message || e) });
          }
        }
        const pm = p.match(/^\/api\/players\/([^/]+)$/);
        if (pm) {
          if (!verifyToken(dataDir, tokenFrom(req))) return json(res, 401, { error: "未登录" });
          const name = decodeURIComponent(pm[1]);
          if (req.method === "PATCH") {
            const body = await readBody(req);
            try {
              if (body.admin !== undefined) return json(res, 200, setAdmin(dataDir, name, body.admin));
              if (body.banned !== undefined) return json(res, 200, setBanned(dataDir, name, body.banned, body.bannedReason));
              if (body.password !== undefined) return json(res, 200, setPlayerPassword(dataDir, name, body.password));
              return json(res, 400, { error: "未知字段" });
            } catch (e) {
              return json(res, 400, { error: String(e.message || e) });
            }
          }
          if (req.method === "DELETE") {
            removePlayer(dataDir, name);
            return json(res, 200, { ok: true });
          }
        }
        return json(res, 404, { error: "not found" });
      }

      // static
      let rel = p === "/" ? "index.html" : p.slice(1);
      if (rel === "login.html") rel = "login.html";
      const file = path.resolve(WEB_ROOT, rel);
      if (!file.startsWith(WEB_ROOT + path.sep) && file !== WEB_ROOT) return json(res, 403, { error: "forbidden" });
      if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) return json(res, 404, { error: "not found" });
      res.writeHead(200, { "Content-Type": mime(file) });
      return fs.createReadStream(file).pipe(res);
    } catch (e) {
      return json(res, 500, { error: String(e.message || e) });
    }
  });
}

module.exports = { createApp };
