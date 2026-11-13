const os = require("node:os");
const fs = require("node:fs");

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function netTotals() {
  try {
    const data = fs.readFileSync("/proc/net/dev", "utf8");
    let up = 0;
    let down = 0;
    for (const line of data.split("\n").slice(2)) {
      const m = line.match(/:\s*(.+)/);
      if (!m) continue;
      const parts = m[1].trim().split(/\s+/);
      down += Number(parts[0]) || 0; // rx bytes
      up += Number(parts[8]) || 0;   // tx bytes
    }
    return { up, down };
  } catch (e) {
    return null;
  }
}

class Usage {
  constructor() {
    this._lastCpu = process.cpuUsage();
    this._lastTime = Date.now();
    this._net = netTotals();
    this._lastNetTime = Date.now();
  }
  sample() {
    const now = Date.now();
    const dt = (now - this._lastTime) / 1000;
    const cu = process.cpuUsage();
    const cpu = dt > 0 ? ((cu.user + cu.system - this._lastCpu.user - this._lastCpu.system) / 10000) / dt : 0;
    this._lastCpu = cu;
    this._lastTime = now;

    const mem = process.memoryUsage().rss / 1048576;

    let up = 0;
    let down = 0;
    const net = netTotals();
    const ndt = (now - this._lastNetTime) / 1000;
    if (net && this._net && ndt > 0) {
      down = Math.max(0, (net.down - this._net.down) / ndt / 1024);
      up = Math.max(0, (net.up - this._net.up) / ndt / 1024);
    }
    if (net) { this._net = net; this._lastNetTime = now; }

    return {
      cpu: Math.round(clamp(cpu, 0, 100) * 10) / 10,
      mem: Math.round(mem),
      up: Math.round(up),
      down: Math.round(down),
      load: os.loadavg ? Math.round(os.loadavg()[0] * 10) / 10 : 0,
      uptime: Math.round(process.uptime()),
    };
  }
}

module.exports = { Usage };
