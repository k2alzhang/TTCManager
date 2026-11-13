const path = require("node:path");
const fs = require("node:fs");
const crypto = require("node:crypto");
const { JsonStore } = require("./store.js");

function serversFile(dataDir) {
  return path.join(dataDir, "servers.json");
}

function listServers(dataDir) {
  const s = new JsonStore(serversFile(dataDir)).load();
  return Array.isArray(s.servers) ? s.servers : [];
}

function saveServers(dataDir, servers) {
  new JsonStore(serversFile(dataDir)).save({ servers });
}

function getServer(dataDir, id) {
  return listServers(dataDir).find((s) => s.id === id) || null;
}

function addServer(dataDir, input) {
  const name = String(input.name || "").trim();
  if (!name) throw new Error("服务器名称不能为空");
  const servers = listServers(dataDir);
  const id = crypto.randomUUID();
  const server = {
    id,
    name,
    type: String(input.type || "paper"),
    version: String(input.version || "latest"),
    path: "",
    jdk: String(input.jdk || ""),
    memory: Number.isInteger(input.memory) ? input.memory : 2048,
    status: "stopped",
    createdAt: new Date().toISOString(),
  };
  const explicit = String(input.path || "").trim();
  if (explicit) {
    server.path = explicit;
  } else {
    server.path = path.join(dataDir, "servers", id);
    fs.mkdirSync(server.path, { recursive: true });
  }
  servers.push(server);
  saveServers(dataDir, servers);
  return server;
}

function updateServer(dataDir, id, patch) {
  const servers = listServers(dataDir);
  const idx = servers.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("服务器不存在");
  if (patch.name !== undefined) {
    const name = String(patch.name).trim();
    if (!name) throw new Error("服务器名称不能为空");
    servers[idx].name = name;
  }
  ["type", "version", "path", "jdk", "status"].forEach((k) => {
    if (patch[k] !== undefined) servers[idx][k] = String(patch[k]);
  });
  if (patch.memory !== undefined) {
    if (!Number.isInteger(patch.memory)) throw new Error("内存必须是整数");
    servers[idx].memory = patch.memory;
  }
  saveServers(dataDir, servers);
  return servers[idx];
}

function removeServer(dataDir, id) {
  const servers = listServers(dataDir).filter((s) => s.id !== id);
  saveServers(dataDir, servers);
}

module.exports = { listServers, addServer, updateServer, removeServer, getServer };
