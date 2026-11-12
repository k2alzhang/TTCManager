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

test("build.js renames each platform artifact with a system-name prefix", () => {
  const { platformFilenames } = require("../build.js");
  const out = platformFilenames("ttc-manager", ["node18-win-x64", "node18-mac-x64", "node18-linux-x64"]);
  assert.deepEqual(out.map((f) => f.dest).sort(), ["linux-ttc-manager", "mac-ttc-manager", "win-ttc-manager.exe"]);
  assert.equal(out.find((f) => f.platform === "linux").dest, "linux-ttc-manager");
  assert.equal(out.find((f) => f.platform === "win").dest, "win-ttc-manager.exe");
  assert.ok(!out.find((f) => f.platform === "mac").dest.endsWith(".exe"), "mac has no .exe");
});

test("workflow auto-publishes binaries to GitHub Release", () => {
  const wf = fs.readFileSync(path.join(root, ".github", "workflows", "build.yml"), "utf8");
  assert.ok(wf.includes("softprops/action-gh-release"), "uses release action");
  assert.ok(wf.includes("release"), "has release job");
  assert.ok(wf.includes("contents: write"), "release job has write permission");
  assert.ok(wf.includes("files: dist"), "uploads dist binaries as release assets");
  assert.ok(wf.includes("download-artifact"), "collects matrix artifacts");
});
