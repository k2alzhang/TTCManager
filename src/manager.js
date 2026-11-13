const { ServerRuntime } = require("./runtime.js");
const { getServer, updateServer } = require("./servers.js");
const { MetricsSampler } = require("./metrics.js");
const log = require("./log.js");

class ServerManager {
  constructor({ dataDir, realtime, runtimeCtor }) {
    this.dataDir = dataDir;
    this.realtime = realtime;
    this.runtimeCtor = runtimeCtor || ServerRuntime;
    this._runtimes = new Map();
    this._samplers = new Map();
  }

  _runtime(id) {
    if (this._runtimes.has(id)) return this._runtimes.get(id);
    const server = getServer(this.dataDir, id);
    if (!server) throw new Error("服务器不存在");
    const rt = new this.runtimeCtor({
      id,
      javaPath: server.jdk,
      memory: server.memory,
      jar: server.path ? `${server.path}/server.jar` : "server.jar",
      cwd: server.path || this.dataDir,
    });
    rt.on("log", (line) => {
      if (!this._samplers.has(id)) this._samplers.set(id, new MetricsSampler());
      this._samplers.get(id).recordLog(line);
      this.realtime.broadcastTo(id, "log", line);
    });
    rt.on("exit", (code) => {
      updateServer(this.dataDir, id, { status: "stopped" });
      this.realtime.broadcastTo(id, "status", { status: "stopped", code });
      log.info(`server ${id} exited (code ${code})`);
    });
    log.debug(`runtime created for server ${id} (cwd=${server.path || this.dataDir})`);
    this._runtimes.set(id, rt);
    return rt;
  }

  async start(id) {
    const rt = this._runtime(id);
    updateServer(this.dataDir, id, { status: "starting" });
    this.realtime.broadcastTo(id, "status", { status: "starting" });
    try {
      rt.start();
      updateServer(this.dataDir, id, { status: "running" });
      this.realtime.broadcastTo(id, "status", { status: "running" });
    } catch (e) {
      updateServer(this.dataDir, id, { status: "stopped" });
      this.realtime.broadcastTo(id, "status", { status: "stopped" });
      throw e;
    }
  }

  send(id, line) {
    const rt = this._runtimes.get(id);
    if (!rt) throw new Error("服务器未运行");
    rt.send(line);
  }

  stop(id) {
    const rt = this._runtimes.get(id);
    if (rt) rt.stop();
  }

  restart(id) {
    this.stop(id);
    return this.start(id);
  }

  kill(id) {
    const rt = this._runtimes.get(id);
    if (rt) rt.kill();
  }

  status(id) {
    const rt = this._runtimes.get(id);
    if (!rt) return "stopped";
    return rt.status();
  }

  snapshot(id) {
    const s = this._samplers.get(id);
    return s ? s.snapshot() : { tps: null, startupSeconds: null, players: 0 };
  }
}

module.exports = { ServerManager };
