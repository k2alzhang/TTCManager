const path = require("node:path");
const { JsonStore } = require("./store.js");
const { encryptSecret, decryptSecret } = require("./crypto.js");

function connFile(dataDir) {
  return path.join(dataDir, "connections.json");
}

function getConnection(dataDir, serverId, masterKey) {
  const c = new JsonStore(connFile(dataDir)).load();
  const entry = c[serverId];
  if (!entry) return { type: "local" };
  const out = { ...entry };
  if (out.password && out.password.includes(":")) {
    try { out.password = decryptSecret(out.password, masterKey); } catch (e) {}
  }
  return out;
}

function setConnection(dataDir, serverId, cfg, masterKey) {
  const c = new JsonStore(connFile(dataDir)).load();
  const type = String(cfg.type || "local");
  if (!["local", "ftp", "sftp"].includes(type)) throw new Error("未知连接类型");
  const entry = { type };
  if (type !== "local") {
    entry.host = String(cfg.host || "").trim();
    entry.port = Number.isInteger(cfg.port) ? cfg.port : (type === "ftp" ? 21 : 22);
    entry.user = String(cfg.user || "");
    if (cfg.password) entry.password = encryptSecret(cfg.password, masterKey);
  }
  c[serverId] = entry;
  new JsonStore(connFile(dataDir)).save(c);
  return getConnection(dataDir, serverId, masterKey);
}

module.exports = { getConnection, setConnection };
