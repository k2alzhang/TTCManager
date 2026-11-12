const test = require("node:test");
const assert = require("node:assert");
const { once } = require("node:events");
const fs = require("node:fs");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { createApp } = require("../src/app.js");
const { setupAdmin, login } = require("../src/auth.js");
const { addServer } = require("../src/servers.js");

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

test("file api list/write/read over local backend", async () => {
  const dir = makeTmpDir();
  const root = makeTmpDir();
  fs.writeFileSync(path.join(root, "server.properties"), "motd=hi\n");
  const s = addServer(dir, { name: "A", path: root });
  const { server, base } = await startServer(dir);
  try {
    const headers = await authed(base);
    let res = await fetch(`${base}/api/servers/${s.id}/files?path=`, { headers });
    assert.equal(res.status, 200);
    let body = await res.json();
    assert.deepEqual(body.map((e) => e.name), ["server.properties"]);

    res = await fetch(`${base}/api/servers/${s.id}/files/write`, { method: "POST", headers, body: JSON.stringify({ path: "motd.txt", content: "hello" }) });
    assert.equal(res.status, 200);
    res = await fetch(`${base}/api/servers/${s.id}/files/read`, { method: "POST", headers, body: JSON.stringify({ path: "motd.txt" }) });
    body = await res.json();
    assert.equal(body.content, "hello");

    res = await fetch(`${base}/api/servers/${s.id}/files`, { headers });
    body = await res.json();
    assert.deepEqual(body.map((e) => e.name).sort(), ["motd.txt", "server.properties"]);
  } finally {
    server.close();
  }
});

test("file api requires auth", async () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A", path: makeTmpDir() });
  const { server, base } = await startServer(dir);
  try {
    const res = await fetch(`${base}/api/servers/${s.id}/files?path=`);
    assert.equal(res.status, 401);
  } finally {
    server.close();
  }
});
