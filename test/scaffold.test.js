const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const fs = require("node:fs");

test("package.json names the panel TTCManager", () => {
  const pkg = require("../package.json");
  assert.equal(pkg.name, "ttc-manager");
  assert.equal(pkg.bin["ttc-manager"], "server.js");
});

test("bin/ttc-manager shim exists", () => {
  assert.ok(fs.existsSync(path.join(__dirname, "..", "bin", "ttc-manager")));
});

test("tmp helper returns a writable temp dir", () => {
  const { makeTmpDir } = require("./helpers/tmp.js");
  const dir = makeTmpDir();
  assert.ok(fs.existsSync(dir));
  fs.writeFileSync(path.join(dir, "a.txt"), "x");
  assert.equal(fs.readFileSync(path.join(dir, "a.txt"), "utf8"), "x");
  fs.rmSync(dir, { recursive: true, force: true });
});
