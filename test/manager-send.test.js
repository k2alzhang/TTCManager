const test = require("node:test");
const assert = require("node:assert");
const { EventEmitter } = require("node:events");
const { makeTmpDir } = require("./helpers/tmp.js");
const { addServer } = require("../src/servers.js");
const { ServerManager } = require("../src/manager.js");

function fakeRuntime() {
  const rt = new EventEmitter();
  rt.started = false;
  rt.sent = [];
  rt.status = () => "running";
  rt.start = () => { rt.started = true; };
  rt.stop = () => {};
  rt.kill = () => {};
  rt.send = (l) => rt.sent.push(l);
  return rt;
}

test("manager.send forwards command to runtime", async () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A", path: "/srv/a", jdk: "/j/java" });
  const mgr = new ServerManager({ dataDir: dir, realtime: { broadcastTo: () => {} }, runtimeCtor: fakeRuntime });
  await mgr.start(s.id);
  mgr.send(s.id, "say hi");
  assert.deepEqual(mgr._runtimes.get(s.id).sent, ["say hi"]);
});

test("manager.send throws when not running", () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A", path: "/srv/a" });
  const mgr = new ServerManager({ dataDir: dir, realtime: { broadcastTo: () => {} }, runtimeCtor: fakeRuntime });
  assert.throws(() => mgr.send(s.id, "x"));
});
