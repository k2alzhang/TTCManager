const test = require("node:test");
const assert = require("node:assert");
const { once } = require("node:events");
const { makeTmpDir } = require("./helpers/tmp.js");
const { createApp } = require("../src/app.js");

async function startServer(dataDir) {
  const server = createApp({ dataDir });
  server.listen(0);
  await once(server, "listening");
  const port = server.address().port;
  return { server, base: `http://127.0.0.1:${port}` };
}

test("GET / serves index.html", async () => {
  const { server, base } = await startServer(makeTmpDir());
  try {
    const res = await fetch(base + "/");
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.match(body, /<html/i);
  } finally {
    server.close();
  }
});

test("auth flow: setup, check, login, guarded api", async () => {
  const { server, base } = await startServer(makeTmpDir());
  try {
    let res = await fetch(base + "/api/auth/check");
    let body = await res.json();
    assert.equal(body.initialized, false);

    res = await fetch(base + "/api/auth/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "pw12345" }) });
    assert.equal(res.status, 200);

    res = await fetch(base + "/api/auth/check");
    body = await res.json();
    assert.equal(body.initialized, true);

    res = await fetch(base + "/api/servers");
    assert.equal(res.status, 401);

    res = await fetch(base + "/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "pw12345" }) });
    body = await res.json();
    assert.ok(body.token);

    res = await fetch(base + "/api/servers", { headers: { Authorization: "Bearer " + body.token } });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), []);
  } finally {
    server.close();
  }
});

test("login with bad password returns 401", async () => {
  const { server, base } = await startServer(makeTmpDir());
  try {
    await fetch(base + "/api/auth/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "pw12345" }) });
    const res = await fetch(base + "/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: "admin", password: "nope" }) });
    assert.equal(res.status, 401);
  } finally {
    server.close();
  }
});
