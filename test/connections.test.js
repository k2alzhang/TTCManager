const test = require("node:test");
const assert = require("node:assert");
const { makeTmpDir } = require("./helpers/tmp.js");
const { loadMasterKey } = require("../src/crypto.js");
const { getConnection, setConnection } = require("../src/connections.js");

test("set/get roundtrip decrypts password", () => {
  const dir = makeTmpDir();
  const key = loadMasterKey(dir);
  setConnection(dir, "s1", { type: "sftp", host: "h", port: 22, user: "u", password: "p@ss" }, key);
  const c = getConnection(dir, "s1", key);
  assert.equal(c.type, "sftp");
  assert.equal(c.host, "h");
  assert.equal(c.password, "p@ss");
});

test("password not stored in plaintext", () => {
  const dir = makeTmpDir();
  const key = loadMasterKey(dir);
  setConnection(dir, "s1", { type: "ftp", host: "h", user: "u", password: "secret" }, key);
  const raw = require("node:fs").readFileSync(require("node:path").join(dir, "connections.json"), "utf8");
  assert.ok(!raw.includes("secret"));
});

test("default local connection", () => {
  const dir = makeTmpDir();
  const key = loadMasterKey(dir);
  assert.deepEqual(getConnection(dir, "nope", key), { type: "local" });
});
