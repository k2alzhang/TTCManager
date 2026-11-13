const test = require("node:test");
const assert = require("node:assert");
const { makeTmpDir } = require("./helpers/tmp.js");
const { setSettings } = require("../src/settings.js");
const { resolveConfig } = require("../src/config.js");

test("resolveConfig uses env PORT/HOST over settings", () => {
  const dir = makeTmpDir();
  setSettings(dir, { port: 8080, host: "0.0.0.0" });
  const c = resolveConfig({ env: { PORT: "9123", HOST: "127.0.0.1" }, dataDir: dir });
  assert.equal(c.port, 9123);
  assert.equal(c.host, "127.0.0.1");
  assert.equal(c.dataDir, dir);
});

test("resolveConfig falls back to settings when env absent", () => {
  const dir = makeTmpDir();
  setSettings(dir, { port: 9090, host: "0.0.0.0" });
  const c = resolveConfig({ env: {}, dataDir: dir });
  assert.equal(c.port, 9090);
  assert.equal(c.host, "0.0.0.0");
});
