const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const SALT_LEN = 16;
const HASH_LEN = 64;
const KEY_SALT = "mc-panel-key-salt-v1";

function hashPassword(password) {
  const salt = crypto.randomBytes(SALT_LEN);
  const hash = crypto.scryptSync(password, salt, HASH_LEN);
  return salt.toString("hex") + ":" + hash.toString("hex");
}

function verifyPassword(password, stored) {
  if (typeof stored !== "string" || !stored.includes(":")) return false;
  const [saltHex, hashHex] = stored.split(":");
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const actual = crypto.scryptSync(password, salt, expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

function aesKey(masterKey) {
  return crypto.scryptSync(masterKey, KEY_SALT, 32);
}

function encryptSecret(plain, masterKey) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", aesKey(masterKey), iv);
  const enc = Buffer.concat([cipher.update(String(plain), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return iv.toString("hex") + ":" + tag.toString("hex") + ":" + enc.toString("hex");
}

function decryptSecret(blob, masterKey) {
  const parts = String(blob).split(":");
  if (parts.length !== 3) throw new Error("invalid encrypted blob");
  const iv = Buffer.from(parts[0], "hex");
  const tag = Buffer.from(parts[1], "hex");
  const data = Buffer.from(parts[2], "hex");
  const decipher = crypto.createDecipheriv("aes-256-gcm", aesKey(masterKey), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}

function loadMasterKey(dataDir) {
  const file = path.join(dataDir, ".secret");
  if (fs.existsSync(file)) {
    const key = fs.readFileSync(file);
    if (key.length === 32) return key;
  }
  const key = crypto.randomBytes(32);
  fs.writeFileSync(file, key, { mode: 0o600 });
  return key;
}

module.exports = { hashPassword, verifyPassword, encryptSecret, decryptSecret, loadMasterKey };
