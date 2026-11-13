const test = require("node:test");
const assert = require("node:assert");
const { parseTps, parseDone, parseVmRss, MetricsSampler } = require("../src/metrics.js");

test("parseTps extracts from paper log", () => {
  assert.equal(parseTps("[12:34:56] [Server thread/INFO]: TPS from last 1m: 19.98, 19.97, 19.99"), 19.98);
});

test("parseTps null when absent", () => {
  assert.equal(parseTps("[12:34:56] [Server thread/INFO]: Can't keep up!"), null);
});

test("parseDone extracts seconds", () => {
  assert.equal(parseDone("[12:34:56] [Server thread/INFO]: Done (2.345s)!"), 2.345);
});

test("parseVmRss converts kB to bytes", () => {
  assert.equal(parseVmRss("Name:\tjava\nVmRSS:\t  123456 kB\n"), 123456 * 1024);
});

test("sampler records tps and done", () => {
  const s = new MetricsSampler();
  s.recordLog("[12:00:00] [Server thread/INFO]: TPS from last 1m: 20.0, 20.0, 20.0");
  s.recordLog("[12:00:05] [Server thread/INFO]: Done (2.345s)!");
  assert.equal(s.snapshot().tps, 20.0);
  assert.equal(s.snapshot().startupSeconds, 2.345);
});

test("sampler tracks online players from join/leave", () => {
  const s = new MetricsSampler();
  s.recordLog("[12:00:01] [Server thread/INFO]: Steve joined the game");
  s.recordLog("[12:00:02] [Server thread/INFO]: Alex joined the game");
  s.recordLog("[12:00:03] [Server thread/INFO]: Steve left the game");
  assert.equal(s.snapshot().players, 1);
});
