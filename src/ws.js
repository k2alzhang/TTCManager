const { WebSocketServer } = require("ws");
const { verifyToken } = require("./auth.js");
const { Usage } = require("./usage.js");
const log = require("./log.js");

function getRealtime(dataDir) {
  return {
    broadcastTo(serverId, type, data) {
      const srv = realtimeByServer.get(serverId);
      if (!srv) return;
      const msg = JSON.stringify({ type, serverId, data });
      for (const ws of srv.clients) {
        if (ws.readyState === 1) ws.send(msg);
      }
    },
  };
}

const realtimeByServer = new Map();

function attachWs({ server, dataDir, realtime, manager, usage }) {
  const wss = new WebSocketServer({ noServer: true });
  const metrics = usage || new Usage();
  const subCount = new Map();
  const timer = setInterval(() => {
    const sys = metrics.sample();
    for (const [serverId, count] of subCount) {
      if (count < 1) continue;
      const data = { ...sys };
      if (manager && typeof manager.snapshot === "function") {
        Object.assign(data, manager.snapshot(serverId));
      }
      realtime.broadcastTo(serverId, "metrics", data);
    }
  }, 1000);
  if (timer.unref) timer.unref();
  server.on("upgrade", (req, socket, head) => {
    const url = new URL(req.url, "http://x");
    if (url.pathname !== "/ws") return;
    const token = url.searchParams.get("token") || (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!verifyToken(dataDir, token)) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });
  wss.on("connection", (ws, req) => {
    let subscribed = null;
    ws.on("message", (raw) => {
      try {
        const m = JSON.parse(raw.toString());
        if (m.type === "subscribe" && m.serverId) {
          subscribed = m.serverId;
          let srv = realtimeByServer.get(m.serverId);
          if (!srv) { srv = { clients: new Set() }; realtimeByServer.set(m.serverId, srv); }
          srv.clients.add(ws);
          subCount.set(m.serverId, (subCount.get(m.serverId) || 0) + 1);
          ws.send(JSON.stringify({ type: "subscribed", serverId: m.serverId }));
          log.debug(`ws client subscribed to server ${m.serverId}`);
        }
      } catch (e) {}
    });
    ws.on("close", () => {
      if (subscribed && realtimeByServer.has(subscribed)) {
        realtimeByServer.get(subscribed).clients.delete(ws);
        subCount.set(subscribed, Math.max(0, (subCount.get(subscribed) || 1) - 1));
      }
    });
  });
}

module.exports = { attachWs, getRealtime };
