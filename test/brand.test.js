const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

test("panel branded TTCManager in titles and readme", () => {
  const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const login = fs.readFileSync(path.join(root, "login.html"), "utf8");
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  assert.ok(index.includes("<title>TTCManager</title>"), "index title");
  assert.ok(login.includes("<title>TTCManager"), "login title");
  assert.ok(readme.startsWith("# TTCManager"), "readme heading");
});

test("license is MIT and branded TTCManager", () => {
  const license = fs.readFileSync(path.join(root, "LICENSE"), "utf8");
  const pkg = require("../package.json");
  assert.ok(license.startsWith("MIT License"), "MIT license");
  assert.ok(license.includes("TTCManager contributors"));
  assert.equal(pkg.license, "MIT");
});

test("readme documents per-platform binary usage", () => {
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  assert.ok(readme.includes("./linux-ttc-manager"), "linux run command");
  assert.ok(readme.includes("./mac-ttc-manager"), "mac run command");
  assert.ok(readme.includes("win-ttc-manager.exe"), "windows binary");
  assert.ok(readme.includes("chmod +x"), "executable bit");
  assert.ok(readme.includes("quarantine"), "macOS gatekeeper note");
});

test("readme documents how to change the port", () => {
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  assert.ok(readme.includes("PORT"), "env PORT documented");
  assert.ok(readme.includes("settings.json"), "settings.json fallback documented");
});

test("api token key uses ttcmanager namespace", () => {
  const api = fs.readFileSync(path.join(root, "js", "api.js"), "utf8");
  assert.ok(api.includes("ttcmanager-token"));
});
