const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const fs = require("node:fs");

test("package.json exposes mc-panel bin", () => {
  const pkg = require("../package.json");
  assert.equal(pkg.bin["mc-panel"], "server.js");
});

test("bin/mc-panel shim exists", () => {
  assert.ok(fs.existsSync(path.join(__dirname, "..", "bin", "mc-panel")));
});

test("tmp helper returns a writable temp dir", () => {
  const { makeTmpDir } = require("./helpers/tmp.js");
  const dir = makeTmpDir();
  assert.ok(fs.existsSync(dir));
  fs.writeFileSync(path.join(dir, "a.txt"), "x");
  assert.equal(fs.readFileSync(path.join(dir, "a.txt"), "utf8"), "x");
  fs.rmSync(dir, { recursive: true, force: true });
});
