const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { once } = require("node:events");
const { makeTmpDir } = require("./helpers/tmp.js");
const { createApp } = require("../src/app.js");
const { addServer, listServers } = require("../src/servers.js");

async function startServer(dataDir) {
  const server = createApp({ dataDir, manager: { start: async () => {}, stop: () => {}, restart: async () => {}, kill: () => {}, status: () => "stopped" } });
  server.listen(0);
  await once(server, "listening");
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

async function authed(base) {
  await fetch(base + "/api/auth/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "pw12345" }) });
  const r = await fetch(base + "/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "pw12345" }) });
  const { token } = await r.json();
  return { Authorization: "Bearer " + token };
}

test("DELETE /api/servers/:id removes server", async () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A" });
  const { server, base } = await startServer(dir);
  try {
    const h = await authed(base);
    let res = await fetch(`${base}/api/servers/${s.id}`, { method: "DELETE" });
    assert.equal(res.status, 401);
    res = await fetch(`${base}/api/servers/${s.id}`, { method: "DELETE", headers: h });
    assert.equal(res.status, 200);
    assert.equal(listServers(dir).length, 0);
  } finally {
    server.close();
  }
});

test("GET files/download streams file with attachment header", async () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A" });
  fs.writeFileSync(path.join(s.path, "notes.txt"), "hello");
  const { server, base } = await startServer(dir);
  try {
    const h = await authed(base);
    const res = await fetch(`${base}/api/servers/${s.id}/files/download?path=notes.txt`, { headers: h });
    assert.equal(res.status, 200);
    assert.ok((res.headers.get("content-disposition") || "").includes("attachment"));
    assert.equal(await res.text(), "hello");
  } finally {
    server.close();
  }
});

test("POST /api/servers/:id/upload writes server.jar + start scripts", async () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A" });
  const { server, base } = await startServer(dir);
  try {
    const h = await authed(base);
    const res = await fetch(`${base}/api/servers/${s.id}/upload`, { method: "POST", headers: h, body: "JARBYTES" });
    assert.equal(res.status, 200);
    const d = await res.json();
    assert.equal(fs.readFileSync(path.join(s.path, "server.jar"), "utf8"), "JARBYTES");
    assert.ok(fs.existsSync(d.scripts.sh));
    assert.ok(fs.existsSync(path.join(s.path, "start.sh")));
    assert.ok(fs.existsSync(path.join(s.path, "start.bat")));
  } finally {
    server.close();
  }
});
