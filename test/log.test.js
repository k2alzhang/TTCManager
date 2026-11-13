const test = require("node:test");
const assert = require("node:assert");
const log = require("../src/log.js");

test("debug level emits by default (verbose)", () => {
  const out = [];
  const old = console.log;
  console.log = (m) => out.push(m);
  log.debug("hello debug");
  log.info("hello info");
  console.log = old;
  assert.equal(out.length, 2);
  assert.ok(out[0].includes("[DEBUG] hello debug"));
  assert.ok(out[0].includes("[TTCManager]"));
});

test("info level suppresses debug", () => {
  const prev = process.env.TTC_LOG_LEVEL;
  process.env.TTC_LOG_LEVEL = "info";
  const out = [];
  const old = console.log;
  console.log = (m) => out.push(m);
  log.debug("hidden");
  log.info("shown");
  console.log = old;
  if (prev === undefined) delete process.env.TTC_LOG_LEVEL; else process.env.TTC_LOG_LEVEL = prev;
  assert.equal(out.length, 1);
  assert.ok(out[0].includes("[INFO] shown"));
});

test("error always emits", () => {
  const prev = process.env.TTC_LOG_LEVEL;
  process.env.TTC_LOG_LEVEL = "error";
  const out = [];
  const old = console.log;
  console.log = (m) => out.push(m);
  log.debug("x");
  log.error("boom");
  console.log = old;
  if (prev === undefined) delete process.env.TTC_LOG_LEVEL; else process.env.TTC_LOG_LEVEL = prev;
  assert.equal(out.length, 1);
  assert.ok(out[0].includes("[ERROR] boom"));
});
