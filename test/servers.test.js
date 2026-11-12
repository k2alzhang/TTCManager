const test = require("node:test");
const assert = require("node:assert");
const { makeTmpDir } = require("./helpers/tmp.js");
const { listServers, addServer, updateServer, removeServer, getServer } = require("../src/servers.js");

test("add then list", () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "生存服", type: "paper", version: "1.21", path: "/srv/mc", jdk: "/jh/java", memory: 2048 });
  assert.ok(s.id);
  assert.equal(s.name, "生存服");
  assert.equal(s.memory, 2048);
  assert.equal(listServers(dir).length, 1);
  assert.deepEqual(getServer(dir, s.id), s);
});

test("update", () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A", type: "paper", version: "1.21", path: "/srv/a" });
  updateServer(dir, s.id, { name: "B", memory: 4096 });
  assert.equal(getServer(dir, s.id).name, "B");
  assert.equal(getServer(dir, s.id).memory, 4096);
});

test("remove", () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A", type: "paper", version: "1.21" });
  removeServer(dir, s.id);
  assert.equal(listServers(dir).length, 0);
  assert.equal(getServer(dir, s.id), null);
});

test("name required", () => {
  assert.throws(() => addServer(makeTmpDir(), { name: "", type: "paper" }));
});
