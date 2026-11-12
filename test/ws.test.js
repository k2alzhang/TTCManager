const test = require("node:test");
const assert = require("node:assert");
const { once } = require("node:events");
const WebSocket = require("ws");
const { makeTmpDir } = require("./helpers/tmp.js");
const { createApp } = require("../src/app.js");
const { setupAdmin, login } = require("../src/auth.js");
const { attachWs, getRealtime } = require("../src/ws.js");

async function startServer(dataDir) {
  const server = createApp({ dataDir });
  const realtime = getRealtime(dataDir);
  attachWs({ server, dataDir, realtime });
  server.listen(0);
  await once(server, "listening");
  return { server, base: `http://127.0.0.1:${server.address().port}`, realtime };
}

function connect(token, base) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://${base.replace("http://", "")}/ws?token=${token}`);
    ws.on("open", () => resolve(ws));
    ws.on("error", reject);
  });
}

test("ws requires valid token", async () => {
  const dir = makeTmpDir();
  const { server, base } = await startServer(dir);
  try {
    await new Promise((resolve) => {
      const ws = new WebSocket(`ws://${base.replace("http://", "")}/ws?token=bad`);
      ws.on("close", resolve);
      ws.on("error", () => {});
    });
  } finally {
    server.close();
  }
});

test("ws subscribes and receives broadcast", async () => {
  const dir = makeTmpDir();
  setupAdmin(dir, { username: "admin", password: "pw12345" });
  const token = login(dir, "admin", "pw12345");
  const { server, base, realtime } = await startServer(dir);
  try {
    const ws = await connect(token, base);
    ws.send(JSON.stringify({ type: "subscribe", serverId: "s1" }));
    await new Promise((resolve) => {
      ws.on("message", (m) => {
        if (JSON.parse(m.toString()).type === "subscribed") resolve();
      });
    });
    const received = new Promise((resolve) => {
      ws.on("message", (m) => resolve(JSON.parse(m.toString())));
    });
    realtime.broadcastTo("s1", "log", "hello world");
    const msg = await received;
    assert.equal(msg.type, "log");
    assert.equal(msg.serverId, "s1");
    assert.equal(msg.data, "hello world");
    ws.close();
  } finally {
    server.close();
  }
});
