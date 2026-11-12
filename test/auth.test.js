const test = require("node:test");
const assert = require("node:assert");
const { makeTmpDir } = require("./helpers/tmp.js");
const { ensureAdmin, setupAdmin, login, verifyToken, logout, getAdminUser } = require("../src/auth.js");

test("ensureAdmin false until setup", () => {
  const dir = makeTmpDir();
  assert.equal(ensureAdmin(dir), false);
  setupAdmin(dir, { username: "admin", password: "pw123" });
  assert.equal(ensureAdmin(dir), true);
});

test("login returns token that verifies", () => {
  const dir = makeTmpDir();
  setupAdmin(dir, { username: "admin", password: "pw123" });
  const token = login(dir, "admin", "pw123");
  assert.ok(typeof token === "string" && token.length > 0);
  assert.equal(verifyToken(dir, token), true);
  assert.equal(getAdminUser(dir), "admin");
});

test("login wrong password throws", () => {
  const dir = makeTmpDir();
  setupAdmin(dir, { username: "admin", password: "pw123" });
  assert.throws(() => login(dir, "admin", "bad"));
});

test("expired token rejected", () => {
  const dir = makeTmpDir();
  setupAdmin(dir, { username: "admin", password: "pw123" });
  const token = login(dir, "admin", "pw123");
  assert.equal(verifyToken(dir, token, Date.now() + 1000 * 60 * 60 * 24 * 30), false);
});

test("logout invalidates token", () => {
  const dir = makeTmpDir();
  setupAdmin(dir, { username: "admin", password: "pw123" });
  const token = login(dir, "admin", "pw123");
  logout(dir, token);
  assert.equal(verifyToken(dir, token), false);
});
