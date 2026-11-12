const path = require("node:path");
const crypto = require("node:crypto");
const { JsonStore } = require("./store.js");
const { hashPassword } = require("./crypto.js");

function playersFile(dataDir) {
  return path.join(dataDir, "players.json");
}

function listPlayers(dataDir) {
  const s = new JsonStore(playersFile(dataDir)).load();
  return Array.isArray(s.players) ? s.players : [];
}

function savePlayers(dataDir, players) {
  new JsonStore(playersFile(dataDir)).save({ players });
}

function getPlayer(dataDir, name) {
  return listPlayers(dataDir).find((p) => p.name === name) || null;
}

function addPlayer(dataDir, { name }) {
  const n = String(name || "").trim();
  if (!n) throw new Error("玩家名不能为空");
  const players = listPlayers(dataDir);
  if (players.some((p) => p.name === n)) throw new Error("玩家已存在");
  const player = {
    name: n,
    password: null,
    admin: false,
    banned: false,
    bannedReason: null,
    created: new Date().toISOString(),
  };
  players.push(player);
  savePlayers(dataDir, players);
  return player;
}

function updatePlayer(dataDir, name, patch) {
  const players = listPlayers(dataDir);
  const idx = players.findIndex((p) => p.name === name);
  if (idx === -1) throw new Error("玩家不存在");
  Object.assign(players[idx], patch);
  savePlayers(dataDir, players);
  return players[idx];
}

function setAdmin(dataDir, name, flag) {
  return updatePlayer(dataDir, name, { admin: Boolean(flag) });
}

function setBanned(dataDir, name, flag, reason) {
  return updatePlayer(dataDir, name, { banned: Boolean(flag), bannedReason: flag ? reason || "无" : null });
}

function setPlayerPassword(dataDir, name, password) {
  return updatePlayer(dataDir, name, { password: hashPassword(String(password)) });
}

function removePlayer(dataDir, name) {
  savePlayers(dataDir, listPlayers(dataDir).filter((p) => p.name !== name));
}

module.exports = { addPlayer, listPlayers, getPlayer, setAdmin, setBanned, setPlayerPassword, removePlayer };
