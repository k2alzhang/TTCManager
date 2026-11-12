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

test("api token key uses ttcmanager namespace", () => {
  const api = fs.readFileSync(path.join(root, "js", "api.js"), "utf8");
  assert.ok(api.includes("ttcmanager-token"));
});
