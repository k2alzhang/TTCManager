const { spawn } = require("node:child_process");
const { EventEmitter } = require("node:events");

class ServerRuntime extends EventEmitter {
  constructor({ id, javaPath, memory, jar, cwd, spawnFn }) {
    super();
    this.id = id;
    this.javaPath = javaPath;
    this.memory = memory;
    this.jar = jar;
    this.cwd = cwd;
    this.spawnFn = spawnFn || spawn;
    this.child = null;
    this.buf = "";
    this._status = "stopped";
  }

  status() {
    return this._status;
  }

  start() {
    if (this.child) throw new Error("已在运行");
    const args = [`-Xmx${this.memory}M`, "-jar", this.jar];
    this._status = "running";
    const child = this.spawnFn(this.javaPath, args, { cwd: this.cwd });
    this.child = child;
    child.stdout.on("data", (chunk) => this._feed(chunk));
    child.stderr.on("data", (chunk) => this._feed(chunk));
    child.on("exit", (code) => {
      this.child = null;
      this._status = "stopped";
      this.emit("exit", code);
    });
    this.emit("start");
    return child;
  }

  _feed(chunk) {
    this.buf += String(chunk);
    let i;
    while ((i = this.buf.indexOf("\n")) >= 0) {
      const line = this.buf.slice(0, i).replace(/\r$/, "").trimEnd();
      this.buf = this.buf.slice(i + 1);
      if (line) this.emit("log", line);
    }
  }

  send(line) {
    if (this.child) this.child.stdin.write(String(line) + "\n");
  }

  stop() {
    if (!this.child) return;
    this.child.stdin.write("stop\n");
    const child = this.child;
    setTimeout(() => {
      if (this.child === child) {
        child.kill("SIGTERM");
      }
    }, 5000).unref();
  }

  kill() {
    if (this.child) this.child.kill("SIGKILL");
  }
}

module.exports = { ServerRuntime };
