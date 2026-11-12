const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { getSettings, setSettings } = require("../src/settings.js");

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
