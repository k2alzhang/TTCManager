const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const fs = require("node:fs");
const { makeTmpDir } = require("./helpers/tmp.js");
const { JsonStore } = require("../src/store.js");

test("save then load roundtrip", () => {
  const file = path.join(makeTmpDir(), "x.json");
  const s = new JsonStore(file);
  s.save({ a: 1, b: ["x", 2] });
  assert.deepEqual(new JsonStore(file).load(), { a: 1, b: ["x", 2] });
});

test("load missing file returns {}", () => {
  const file = path.join(makeTmpDir(), "nope.json");
  assert.deepEqual(new JsonStore(file).load(), {});
});

test("writes valid JSON atomically", () => {
  const file = path.join(makeTmpDir(), "y.json");
  new JsonStore(file).save({ k: "v" });
  assert.deepEqual(JSON.parse(fs.readFileSync(file, "utf8")), { k: "v" });
});
