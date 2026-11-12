const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { loadMasterKey } = require("../src/crypto.js");
const { addServer } = require("../src/servers.js");
const { setConnection } = require("../src/connections.js");
const { getBackend } = require("../src/files.js");

test("local backend rooted at server path", async () => {
  const dir = makeTmpDir();
  const root = makeTmpDir();
  fs.writeFileSync(path.join(root, "a.txt"), "hi");
  const key = loadMasterKey(dir);
  const s = addServer(dir, { name: "A", path: root });
  const b = getBackend(dir, s.id, key);
  const list = await b.list("");
  assert.deepEqual(list.map((e) => e.name), ["a.txt"]);
});

test("sftp backend from connection", () => {
  const dir = makeTmpDir();
  const key = loadMasterKey(dir);
  const s = addServer(dir, { name: "A", path: "/x" });
  setConnection(dir, s.id, { type: "sftp", host: "h", user: "u", password: "p" }, key);
  const b = getBackend(dir, s.id, key);
  assert.equal(b._client.constructor.name, "SftpClient");
});
