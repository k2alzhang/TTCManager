class MetricsSampler {
  constructor() {
    this.tps = null;
    this.startupSeconds = null;
    this.players = 0;
  }
  recordLog(line) {
    const tps = parseTps(line);
    if (tps !== null) this.tps = tps;
    const done = parseDone(line);
    if (done !== null) this.startupSeconds = done;
    if (/joined the game/i.test(line)) this.players += 1;
    if (/left the game/i.test(line)) this.players = Math.max(0, this.players - 1);
  }
  snapshot() {
    return { tps: this.tps, startupSeconds: this.startupSeconds, players: this.players };
  }
}

function parseTps(line) {
  const m = String(line).match(/TPS from last (?:1m|5m|15m):\s*([\d.]+)/);
  return m ? Number(m[1]) : null;
}

function parseDone(line) {
  const m = String(line).match(/Done \(([\d.]+)s\)!/);
  return m ? Number(m[1]) : null;
}

function parseVmRss(status) {
  const m = String(status).match(/VmRSS:\s+(\d+)\s+kB/);
  return m ? Number(m[1]) * 1024 : null;
}

module.exports = { parseTps, parseDone, parseVmRss, MetricsSampler };
