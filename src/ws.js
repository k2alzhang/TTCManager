const { WebSocketServer } = require("ws");
const { verifyToken } = require("./auth.js");
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

function attachWs({ server, dataDir, realtime }) {
  const wss = new WebSocketServer({ noServer: true });
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
          ws.send(JSON.stringify({ type: "subscribed", serverId: m.serverId }));
          log.debug(`ws client subscribed to server ${m.serverId}`);
        }
      } catch (e) {}
    });
    ws.on("close", () => {
      if (subscribed && realtimeByServer.has(subscribed)) {
        realtimeByServer.get(subscribed).clients.delete(ws);
      }
    });
  });
}

module.exports = { attachWs, getRealtime };
