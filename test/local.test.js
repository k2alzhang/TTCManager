const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const fs = require("node:fs");
const { makeTmpDir } = require("./helpers/tmp.js");
const { localBackend } = require("../src/backends/local.js");

test("list root and nested", () => {
  const root = makeTmpDir();
  fs.mkdirSync(path.join(root, "plugins"));
  fs.writeFileSync(path.join(root, "server.properties"), "x=1\n");
  fs.writeFileSync(path.join(root, "plugins", "a.jar"), "jar");
  const b = localBackend(root);
  const rootList = b.list("");
  assert.deepEqual(rootList.map((e) => e.name).sort(), ["plugins", "server.properties"]);
  assert.equal(b.list("").find((e) => e.name === "server.properties").type, "file");
  assert.deepEqual(b.list("plugins").map((e) => e.name), ["a.jar"]);
});

test("read/write roundtrip", () => {
  const root = makeTmpDir();
  const b = localBackend(root);
  b.writeFile("", "server.properties", "motd=hi\n");
  assert.equal(b.readFile("", "server.properties"), "motd=hi\n");
  assert.equal(b.readFile("", "server.properties").length, 8);
});

test("mkdir and delete recursive", () => {
  const root = makeTmpDir();
  const b = localBackend(root);
  b.mkdir("", "world");
  b.writeFile("world", "level.dat", "bin");
  assert.equal(b.list("world").length, 1);
  b.delete("", "world");
  assert.deepEqual(b.list(""), []);
});

test("path traversal blocked", () => {
  const root = makeTmpDir();
  const b = localBackend(root);
  assert.throws(() => b.readFile("", "../secret.txt"));
  assert.throws(() => b.writeFile("", "../../etc/passwd", "x"));
});
