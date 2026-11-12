const test = require("node:test");
const assert = require("node:assert");
const { makeTmpDir } = require("./helpers/tmp.js");
const { addPlayer, listPlayers, getPlayer, setAdmin, setBanned, setPlayerPassword, removePlayer } = require("../src/players.js");
const { verifyPassword } = require("../src/crypto.js");

test("add and list players", () => {
  const dir = makeTmpDir();
  addPlayer(dir, { name: "Steve" });
  addPlayer(dir, { name: "Alex" });
  assert.deepEqual(listPlayers(dir).map((p) => p.name).sort(), ["Alex", "Steve"]);
  assert.equal(getPlayer(dir, "Steve").name, "Steve");
});

test("admin flag", () => {
  const dir = makeTmpDir();
  addPlayer(dir, { name: "Steve" });
  setAdmin(dir, "Steve", true);
  assert.equal(getPlayer(dir, "Steve").admin, true);
  setAdmin(dir, "Steve", false);
  assert.equal(getPlayer(dir, "Steve").admin, false);
});

test("ban with reason and unban", () => {
  const dir = makeTmpDir();
  addPlayer(dir, { name: "Steve" });
  setBanned(dir, "Steve", true, "作弊");
  assert.equal(getPlayer(dir, "Steve").banned, true);
  assert.equal(getPlayer(dir, "Steve").bannedReason, "作弊");
  setBanned(dir, "Steve", false);
  assert.equal(getPlayer(dir, "Steve").banned, false);
});

test("set password hashes", () => {
  const dir = makeTmpDir();
  addPlayer(dir, { name: "Steve" });
  setPlayerPassword(dir, "Steve", "p@ss");
  const stored = getPlayer(dir, "Steve").password;
  assert.ok(verifyPassword("p@ss", stored));
  assert.ok(!verifyPassword("bad", stored));
});

test("remove player", () => {
  const dir = makeTmpDir();
  addPlayer(dir, { name: "Steve" });
  removePlayer(dir, "Steve");
  assert.equal(listPlayers(dir).length, 0);
});
