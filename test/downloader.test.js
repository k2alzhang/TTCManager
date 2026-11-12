const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { addServer } = require("../src/servers.js");
const { createDownloader } = require("../src/downloader.js");

test("download core to server dir", async () => {
  const dir = makeTmpDir();
  const root = makeTmpDir();
  const s = addServer(dir, { name: "A", path: root });
  const events = [];
  const downloader = createDownloader({
    realtime: { broadcastTo: (id, type, data) => events.push([id, type, data]) },
    resolveFn: async () => ({ url: "https://x/server.jar", filename: "server.jar" }),
    dlFn: async (url, dest) => fs.writeFileSync(dest, "jar"),
  });
  const dest = await downloader.download(dir, s.id, { vendor: "paper", version: "1.21" });
  assert.equal(dest, path.join(root, "server.jar"));
  assert.equal(fs.readFileSync(dest, "utf8"), "jar");
  assert.ok(events.some((e) => e[0] === s.id && e[1] === "download"));
});

test("download plugin into plugins dir", async () => {
  const dir = makeTmpDir();
  const root = makeTmpDir();
  const s = addServer(dir, { name: "A", path: root });
  const downloader = createDownloader({
    resolveFn: async () => ({ url: "https://x/a.jar", filename: "a.jar" }),
    dlFn: async (url, dest) => fs.writeFileSync(dest, "plugin"),
  });
  const dest = await downloader.download(dir, s.id, { vendor: "plugin", target: "plugins", url: "https://x/a.jar" });
  assert.equal(dest, path.join(root, "plugins", "a.jar"));
  assert.equal(fs.readFileSync(dest, "utf8"), "plugin");
});
