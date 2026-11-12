const test = require("node:test");
const assert = require("node:assert");
const { once } = require("node:events");
const { makeTmpDir } = require("./helpers/tmp.js");
const { createApp } = require("../src/app.js");
const { setupAdmin, login } = require("../src/auth.js");
const { addServer } = require("../src/servers.js");

async function startServer(dataDir, manager) {
  const server = createApp({ dataDir, manager });
  server.listen(0);
  await once(server, "listening");
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

test("start/stop routes call manager and require auth", async () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A", path: "/srv/a" });
  const calls = [];
  const manager = {
    start: async (id) => { calls.push(["start", id]); },
    stop: (id) => { calls.push(["stop", id]); },
    restart: (id) => { calls.push(["restart", id]); },
    status: (id) => "running",
  };
  const { server, base } = await startServer(dir, manager);
  try {
    let res = await fetch(`${base}/api/servers/${s.id}/start`, { method: "POST" });
    assert.equal(res.status, 401);
    await fetch(base + "/api/auth/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "pw12345" }) });
    const lr = await fetch(base + "/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "pw12345" }) });
    const { token } = await lr.json();
    const headers = { Authorization: "Bearer " + token, "Content-Type": "application/json" };
    res = await fetch(`${base}/api/servers/${s.id}/start`, { method: "POST", headers });
    assert.equal(res.status, 200);
    res = await fetch(`${base}/api/servers/${s.id}/stop`, { method: "POST", headers });
    assert.equal(res.status, 200);
    assert.deepEqual(calls, [["start", s.id], ["stop", s.id]]);
  } finally {
    server.close();
  }
});
