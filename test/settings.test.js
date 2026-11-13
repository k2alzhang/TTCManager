const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { getSettings, setSettings, ensureData } = require("../src/settings.js");

test("defaults", () => {
  const s = getSettings(makeTmpDir());
  assert.deepEqual(s, { port: 8080, host: "0.0.0.0" });
});

test("set persists", () => {
  const dir = makeTmpDir();
  setSettings(dir, { port: 9000, host: "127.0.0.1" });
  assert.deepEqual(getSettings(dir), { port: 9000, host: "127.0.0.1" });
});

test("invalid port throws", () => {
  assert.throws(() => setSettings(makeTmpDir(), { port: 0 }));
  assert.throws(() => setSettings(makeTmpDir(), { port: 70000 }));
  assert.throws(() => setSettings(makeTmpDir(), { port: "abc" }));
});

test("ensureData creates dir + default settings + servers on first run", () => {
  const root = makeTmpDir();
  const dataDir = path.join(root, "data");
  assert.ok(!fs.existsSync(dataDir));
  const out = ensureData(dataDir);
  assert.ok(fs.existsSync(dataDir), "data dir created");
  assert.ok(fs.existsSync(out.settings), "settings.json created");
  assert.ok(fs.existsSync(out.servers), "servers.json created");
  assert.deepEqual(getSettings(dataDir), { port: 8080, host: "0.0.0.0" });
  assert.deepEqual(JSON.parse(fs.readFileSync(out.servers, "utf8")), { servers: [] });
});

test("ensureData is idempotent (does not clobber existing)", () => {
  const root = makeTmpDir();
  const dataDir = path.join(root, "data");
  ensureData(dataDir);
  setSettings(dataDir, { port: 9001 });
  ensureData(dataDir);
  assert.equal(getSettings(dataDir).port, 9001);
});
