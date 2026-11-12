const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

test("login.html has login/setup form", () => {
  const html = fs.readFileSync(path.join(root, "login.html"), "utf8");
  assert.ok(html.includes('id="auth-form"'));
  assert.ok(html.includes('id="username"'));
  assert.ok(html.includes('id="password"'));
  assert.ok(html.includes('id="confirm-field"'));
  assert.ok(html.includes("js/api.js"));
});

test("login.js wires window.login", () => {
  const js = fs.readFileSync(path.join(root, "js", "login.js"), "utf8");
  assert.ok(js.includes("window.login"));
  assert.ok(js.includes("/api/auth/setup"));
});

test("pages include api.js auth guard", () => {
  ["index.html", "admin.html", "add-server.html", "mod-download.html"].forEach((f) => {
    const html = fs.readFileSync(path.join(root, f), "utf8");
    assert.ok(html.includes("js/api.js"), f + " includes api.js");
    assert.ok(html.includes("window.requireAuth"), f + " calls requireAuth");
  });
});
