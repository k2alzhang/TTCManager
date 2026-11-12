const test = require("node:test");
const assert = require("node:assert");
const { EventEmitter } = require("node:events");
const { makeTmpDir } = require("./helpers/tmp.js");
const { addServer } = require("../src/servers.js");
const { ServerManager } = require("../src/manager.js");

function fakeRuntime(opts) {
  const rt = new EventEmitter();
  rt.opts = opts;
  rt.started = false;
  rt.stopped = false;
  rt.status = () => (rt.stopped ? "stopped" : "running");
  rt.start = () => { rt.started = true; rt.emit("log", "server started"); };
  rt.stop = () => { rt.stopped = true; };
  rt.kill = () => {};
  return rt;
}

test("start spawns runtime and broadcasts status", async () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A", path: "/srv/a", jdk: "/j/java", memory: 2048 });
  const events = [];
  const realtime = { broadcastTo: (id, type, data) => events.push([id, type, data]) };
  const mgr = new ServerManager({ dataDir: dir, realtime, runtimeCtor: fakeRuntime });
  await mgr.start(s.id);
  assert.ok(mgr._runtimes.get(s.id).started);
  assert.ok(events.some((e) => e[0] === s.id && e[1] === "status"));
});

test("log from runtime broadcasts to realtime", async () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A", path: "/srv/a", jdk: "/j/java" });
  const events = [];
  const realtime = { broadcastTo: (id, type, data) => events.push([id, type, data]) };
  const mgr = new ServerManager({ dataDir: dir, realtime, runtimeCtor: fakeRuntime });
  await mgr.start(s.id);
  const rt = mgr._runtimes.get(s.id);
  rt.emit("log", "Done (2.0s)!");
  assert.ok(events.some((e) => e[1] === "log" && e[2] === "Done (2.0s)!"));
});

test("stop marks stopped", async () => {
  const dir = makeTmpDir();
  const s = addServer(dir, { name: "A", path: "/srv/a", jdk: "/j/java" });
  const mgr = new ServerManager({ dataDir: dir, realtime: { broadcastTo: () => {} }, runtimeCtor: fakeRuntime });
  await mgr.start(s.id);
  mgr.stop(s.id);
  assert.ok(mgr._runtimes.get(s.id).stopped);
});
