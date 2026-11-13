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
  return { Authorization: "Bearer " + token };
}

test("GET /api/download/versions?vendor= returns version list", async () => {
  const dir = makeTmpDir();
  const calls = [];
  const listVersions = async (vendor) => { calls.push(vendor); return ["1.21.4", "1.20.4"]; };
  const { server, base } = await startServer(dir, { listVersions });
  try {
    const h = await authed(base);
    let res = await fetch(base + "/api/download/versions?vendor=paper", { headers: h });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), ["1.21.4", "1.20.4"]);
    assert.deepEqual(calls, ["paper"]);
    res = await fetch(base + "/api/download/versions?vendor=paper");
    assert.equal(res.status, 401);
  } finally {
    server.close();
  }
});
