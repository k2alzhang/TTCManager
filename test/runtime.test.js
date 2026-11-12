const test = require("node:test");
const assert = require("node:assert");
const { EventEmitter } = require("node:events");
const { ServerRuntime } = require("../src/runtime.js");

function fakeProcess() {
  const p = new EventEmitter();
  p.stdout = new EventEmitter();
  p.stderr = new EventEmitter();
  p.stdin = { _writes: [], write(x) { this._writes.push(x); } };
  p._killed = false;
  p.kill = () => { p._killed = true; p.emit("exit", null, "SIGTERM"); };
  return p;
}

test("start spawns with expected java args", () => {
  let spawned;
  const rt = new ServerRuntime({ javaPath: "/j/java", memory: 2048, jar: "/srv/server.jar", cwd: "/srv", spawnFn: (...a) => { spawned = a; return fakeProcess(); } });
  rt.start();
  assert.equal(spawned[0], "/j/java");
  assert.equal(spawned[1][0], "-Xmx2048M");
  assert.equal(spawned[1][spawned[1].length - 1], "/srv/server.jar");
  assert.equal(spawned[2].cwd, "/srv");
  assert.equal(rt.status(), "running");
});

test("emits log on stdout lines", () => {
  const p = fakeProcess();
  const rt = new ServerRuntime({ javaPath: "java", memory: 1024, jar: "s.jar", cwd: ".", spawnFn: () => p });
  rt.start();
  const logs = [];
  rt.on("log", (l) => logs.push(l));
  p.stdout.emit("data", "Done (2.3s)!\n");
  p.stdout.emit("data", "hello\nworld");
  p.stdout.emit("data", "\n");
  assert.deepEqual(logs, ["Done (2.3s)!", "hello", "world"]);
});

test("stop sends stop line, process exit marks stopped", () => {
  const p = fakeProcess();
  const rt = new ServerRuntime({ javaPath: "java", memory: 1024, jar: "s.jar", cwd: ".", spawnFn: () => p });
  rt.start();
  rt.stop();
  assert.deepEqual(p.stdin._writes, ["stop\n"]);
  p.emit("exit", 0, null);
  assert.equal(rt.status(), "stopped");
});

test("exit event marks stopped", () => {
  const p = fakeProcess();
  const rt = new ServerRuntime({ javaPath: "java", memory: 1024, jar: "s.jar", cwd: ".", spawnFn: () => p });
  rt.start();
  let exitCode = null;
  rt.on("exit", (c) => { exitCode = c; });
  p.emit("exit", 1, null);
  assert.equal(rt.status(), "stopped");
  assert.equal(exitCode, 1);
});
