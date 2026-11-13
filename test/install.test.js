const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { createInstaller } = require("../src/install.js");
const { listServers } = require("../src/servers.js");

function fakeResolve(url) {
  return async () => ({ url, filename: "core.jar", sha256: null });
}
function fakeDl(content) {
  return async (url, dest, _f, onProgress) => {
    if (onProgress) onProgress(content.length);
    fs.writeFileSync(dest, content);
    return content.length;
  };
}
function fakeDlFail(err) {
  return async () => { throw new Error(err); };
}

test("install: server created only after verified download completes", async () => {
  const dataDir = makeTmpDir();
  const realtime = { broadcastTo: (id, t, d) => { realtime.last = { id, t, d }; } };
  const install = createInstaller({ realtime, resolveFn: fakeResolve("https://x/core.jar"), dlFn: fakeDl("JAR-CORE") });
  const r = await install(dataDir, { name: "A", vendor: "paper", version: "1.21.4", progressId: "p1" });
  assert.equal(listServers(dataDir).length, 1);
  assert.equal(fs.readFileSync(path.join(r.server.path, "server.jar"), "utf8"), "JAR-CORE");
  assert.ok(fs.existsSync(path.join(r.server.path, "start.sh")));
  assert.ok(fs.existsSync(path.join(r.server.path, "start.bat")));
  assert.equal(fs.readFileSync(path.join(r.server.path, "start.sh"), "utf8").includes("-Xmx2048M"), true);
  assert.deepEqual(realtime.last && realtime.last.t, "download-progress");
  assert.equal(fs.readdirSync(path.join(dataDir, "tmp")).length, 0, "tmp cleaned");
});

test("install: failed download creates NO server and cleans tmp", async () => {
  const dataDir = makeTmpDir();
  const install = createInstaller({ resolveFn: fakeResolve("https://x/core.jar"), dlFn: fakeDlFail("HTTP 410") });
  await assert.rejects(() => install(dataDir, { name: "B", vendor: "paper", version: "1.21" }), /410/);
  assert.equal(listServers(dataDir).length, 0, "no server left behind");
  assert.equal(fs.readdirSync(path.join(dataDir, "tmp")).length, 0);
});

test("install: rejects missing name/vendor/version", async () => {
  const dataDir = makeTmpDir();
  const install = createInstaller({ resolveFn: fakeResolve("https://x/core.jar"), dlFn: fakeDl("x") });
  await assert.rejects(() => install(dataDir, { vendor: "paper", version: "1.21" }), /名称/);
  await assert.rejects(() => install(dataDir, { name: "C" }), /核心/);
});
