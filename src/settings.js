const path = require("node:path");
const { JsonStore } = require("./store.js");

const DEFAULTS = { port: 8080, host: "0.0.0.0" };

function settingsFile(dataDir) {
  return path.join(dataDir, "settings.json");
}

function getSettings(dataDir) {
  const s = new JsonStore(settingsFile(dataDir)).load();
  return {
    port: Number.isInteger(s.port) ? s.port : DEFAULTS.port,
    host: typeof s.host === "string" && s.host ? s.host : DEFAULTS.host,
  };
}

function setSettings(dataDir, patch) {
  const next = { ...getSettings(dataDir), ...patch };
  if (!Number.isInteger(next.port) || next.port < 1 || next.port > 65535) {
    throw new Error("端口必须是 1-65535 的整数");
  }
  if (typeof next.host !== "string" || !next.host.trim()) {
    throw new Error("主机不能为空");
  }
  new JsonStore(settingsFile(dataDir)).save({ port: next.port, host: next.host.trim() });
  return getSettings(dataDir);
}

module.exports = { getSettings, setSettings };
