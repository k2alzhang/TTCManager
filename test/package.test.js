const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

test("package.json has pkg packaging config", () => {
  const pkg = require("../package.json");
  assert.ok(pkg.pkg, "pkg field present");
  assert.ok(Array.isArray(pkg.pkg.targets) && pkg.pkg.targets.length >= 3);
  assert.ok(pkg.pkg.assets.includes("index.html"));
});

test("build.js orchestrates pkg", () => {
  const js = fs.readFileSync(path.join(root, "build.js"), "utf8");
  assert.ok(js.includes("pkg"));
  assert.ok(js.includes("dist"));
  assert.ok(js.includes("lib-es5/bin.js"), "uses local pkg bin (no-bin-links safe)");
});
