const test = require("node:test");
const assert = require("node:assert");
const { once } = require("node:events");
const { makeTmpDir } = require("./helpers/tmp.js");
const { createApp } = require("../src/app.js");

async function startServer(dataDir) {
  const server = createApp({ dataDir });
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

test("player routes: create, list, patch, delete", async () => {
  const dir = makeTmpDir();
  const { server, base } = await startServer(dir);
  try {
    const h = await authed(base);
    let res = await fetch(base + "/api/players", { method: "POST", headers: h, body: JSON.stringify({ name: "Steve" }) });
    assert.equal(res.status, 200);
    res = await fetch(base + "/api/players", { headers: h });
    let list = await res.json();
    assert.equal(list.length, 1);
    res = await fetch(base + "/api/players/Steve", { method: "PATCH", headers: h, body: JSON.stringify({ admin: true }) });
    assert.equal((await res.json()).admin, true);
    res = await fetch(base + "/api/players/Steve", { method: "DELETE", headers: h });
    assert.equal(res.status, 200);
    res = await fetch(base + "/api/players", { headers: h });
    assert.equal((await res.json()).length, 0);
  } finally {
    server.close();
  }
});
