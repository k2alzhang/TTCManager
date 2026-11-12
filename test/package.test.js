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
  assert.ok(js.includes("BUILD_TARGETS"), "targets overridable via env (for CI per-platform build)");
  assert.ok(js.includes("execFileSync"), "invokes local pkg bin via node (no-bin-links safe)");
  assert.ok(js.includes("lib-es5") && js.includes("bin.js"), "references local pkg bin path");
  assert.ok(!js.includes("npx pkg"), "does not rely on npx resolving a wrong pkg");
});
