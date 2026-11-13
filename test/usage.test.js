const test = require("node:test");
const assert = require("node:assert");
const { Usage } = require("../src/usage.js");

test("usage sample returns bounded cpu/mem/network/uptime", async () => {
  const u = new Usage();
  await new Promise((r) => setTimeout(r, 60));
  const s = u.sample();
  assert.equal(typeof s.cpu, "number");
  assert.ok(s.cpu >= 0 && s.cpu <= 100);
  assert.ok(s.mem >= 0);
  assert.ok(s.up >= 0);
  assert.ok(s.down >= 0);
  assert.ok(s.uptime >= 0);
  assert.ok(Number.isFinite(s.load));
});
