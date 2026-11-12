const path = require("node:path");
const crypto = require("node:crypto");
const { JsonStore } = require("./store.js");
const { hashPassword, verifyPassword } = require("./crypto.js");

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

function usersFile(dataDir) {
  return path.join(dataDir, "users.json");
}
function sessionsFile(dataDir) {
  return path.join(dataDir, "sessions.json");
}

function loadUsers(dataDir) {
  const u = new JsonStore(usersFile(dataDir)).load();
  return { username: u.username, hash: u.hash };
}

function ensureAdmin(dataDir) {
  const u = loadUsers(dataDir);
  return Boolean(u.username && u.hash);
}

function setupAdmin(dataDir, { username, password }) {
  const name = String(username || "").trim();
  if (!name) throw new Error("用户名不能为空");
  if (!password || String(password).length < 4) throw new Error("密码至少 4 位");
  new JsonStore(usersFile(dataDir)).save({ username: name, hash: hashPassword(String(password)) });
}

function getAdminUser(dataDir) {
  return loadUsers(dataDir).username || null;
}

function login(dataDir, username, password) {
  const u = loadUsers(dataDir);
  if (!u.username || u.username !== username || !verifyPassword(String(password), u.hash)) {
    throw new Error("用户名或密码错误");
  }
  const token = crypto.randomBytes(24).toString("hex");
  const sessions = new JsonStore(sessionsFile(dataDir)).load();
  const list = Array.isArray(sessions.sessions) ? sessions.sessions : [];
  list.push({ token, username, expires: Date.now() + SESSION_TTL_MS });
  new JsonStore(sessionsFile(dataDir)).save({ sessions: list });
  return token;
}

function verifyToken(dataDir, token, now) {
  const nowMs = now === undefined ? Date.now() : now;
  const s = new JsonStore(sessionsFile(dataDir)).load();
  const list = Array.isArray(s.sessions) ? s.sessions : [];
  return list.some((x) => x.token === token && x.expires > nowMs);
}

function logout(dataDir, token) {
  const s = new JsonStore(sessionsFile(dataDir)).load();
  const list = Array.isArray(s.sessions) ? s.sessions : [];
  new JsonStore(sessionsFile(dataDir)).save({ sessions: list.filter((x) => x.token !== token) });
}

module.exports = { ensureAdmin, setupAdmin, login, verifyToken, logout, getAdminUser };
