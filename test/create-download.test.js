const test = require("node:test");
const assert = require("node:assert");
const { once } = require("node:events");
const { makeTmpDir } = require("./helpers/tmp.js");
const { createApp } = require("../src/app.js");

async function startServer(dataDir, extra) {
  const server = createApp({ dataDir, ...extra });
  server.listen(0);
  await once(server, "listening");
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

async function authed(base) {
  await fetch(base + "/api/auth/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "pw12345" }) });
  const r = await fetch(base + "/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "pw12345" }) });
  const { token } = await r.json();
  return { Authorization: "Bearer " + token, "Content-Type": "application/json" };
}

test("POST /api/servers creates a server", async () => {
  const dir = makeTmpDir();
  const { server, base } = await startServer(dir);
  try {
    const headers = await authed(base);
    let res = await fetch(base + "/api/servers", { method: "POST", headers, body: JSON.stringify({ name: "新服", type: "paper", version: "1.21", path: "/srv/new", memory: 2048 }) });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(body.id);
    assert.equal(body.name, "新服");
    res = await fetch(base + "/api/servers", { headers });
    assert.equal((await res.json()).length, 1);
  } finally {
    server.close();
  }
});

test("download route calls downloader", async () => {
  const dir = makeTmpDir();
  const calls = [];
  const downloader = { download: async (d, id, meta, cb) => { calls.push([id, meta]); return "/tmp/x.jar"; } };
  const { server, base } = await startServer(dir, { downloader });
  try {
    const headers = await authed(base);
    let res = await fetch(base + "/api/servers", { method: "POST", headers, body: JSON.stringify({ name: "A", path: "/srv/a" }) });
    const s = await res.json();
    res = await fetch(`${base}/api/servers/${s.id}/download`, { method: "POST", headers, body: JSON.stringify({ vendor: "paper", version: "1.21" }) });
    assert.equal(res.status, 200);
    assert.deepEqual(calls[0], [s.id, { vendor: "paper", version: "1.21" }]);
  } finally {
    server.close();
  }
});
