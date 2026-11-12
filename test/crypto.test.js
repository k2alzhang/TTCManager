const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const fs = require("node:fs");
const { makeTmpDir } = require("./helpers/tmp.js");
const { hashPassword, verifyPassword, encryptSecret, decryptSecret, loadMasterKey } = require("../src/crypto.js");

test("password hash/verify roundtrip", () => {
  const stored = hashPassword("s3cret");
  assert.ok(stored.includes(":"));
  assert.ok(verifyPassword("s3cret", stored));
  assert.ok(!verifyPassword("wrong", stored));
});

test("two hashes of same pw differ (random salt)", () => {
  assert.notEqual(hashPassword("pw"), hashPassword("pw"));
});

test("secret encrypt/decrypt roundtrip", () => {
  const key = loadMasterKey(makeTmpDir());
  const blob = encryptSecret("ftp-pass", key);
  assert.ok(blob.includes(":"));
  assert.equal(decryptSecret(blob, key), "ftp-pass");
});

test("decrypt with wrong key throws", () => {
  const dir = makeTmpDir();
  const key = loadMasterKey(dir);
  const blob = encryptSecret("x", key);
  const other = Buffer.alloc(32, 7);
  assert.throws(() => decryptSecret(blob, other));
});

test("loadMasterKey generates once and reuses", () => {
  const dir = makeTmpDir();
  const a = loadMasterKey(dir);
  const b = loadMasterKey(dir);
  assert.ok(Buffer.isBuffer(a) && a.length === 32);
  assert.deepEqual(a, b);
  assert.ok(fs.existsSync(path.join(dir, ".secret")));
  if (process.platform !== "win32") {
    assert.equal(fs.statSync(path.join(dir, ".secret")).mode & 0o777, 0o600);
  }
});
