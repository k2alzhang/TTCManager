const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { resolveDownload, downloadFile } = require("../src/download.js");

function fakeFetch(map) {
  return async (url) => {
    const hit = map[url];
    if (!hit) return { ok: false, status: 404, json: async () => ({}) };
    return hit;
  };
}

test("paper resolves latest build download url", async () => {
  const fetchFn = fakeFetch({
    "https://api.papermc.io/v2/projects/paper/versions/1.21/builds": {
      ok: true, json: async () => ({ builds: [{ build: 123 }] }),
    },
  });
  const r = await resolveDownload({ vendor: "paper", version: "1.21" }, fetchFn);
  assert.equal(r.url, "https://api.papermc.io/v2/projects/paper/versions/1.21/builds/123/downloads/paper-1.21-123.jar");
  assert.equal(r.filename, "paper-1.21-123.jar");
});

test("purpur resolves direct url", async () => {
  const r = await resolveDownload({ vendor: "purpur", version: "1.21" }, fakeFetch({}));
  assert.equal(r.url, "https://api.purpurmc.org/v2/purpur/1.21/latest/download");
  assert.equal(r.filename, "purpur-1.21.jar");
});

test("vanilla resolves via manifest", async () => {
  const fetchFn = fakeFetch({
    "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json": {
      ok: true, json: async () => ({ latest: { release: "1.21.4" }, versions: [{ id: "1.21.4", url: "https://piston-meta.mojang.com/ver/1.21.4.json" }] }),
    },
    "https://piston-meta.mojang.com/ver/1.21.4.json": {
      ok: true, json: async () => ({ downloads: { server: { url: "https://piston-data.mojang.com/server.jar" } } }),
    },
  });
  const r = await resolveDownload({ vendor: "vanilla", version: "1.21.4" }, fetchFn);
  assert.equal(r.url, "https://piston-data.mojang.com/server.jar");
  assert.equal(r.filename, "server.jar");
});

test("plugin downloads from direct url", async () => {
  const r = await resolveDownload({ vendor: "plugin", url: "https://example.com/a.jar", filename: "a.jar" }, fakeFetch({}));
  assert.equal(r.url, "https://example.com/a.jar");
  assert.equal(r.filename, "a.jar");
});

test("plugin derives filename from url last segment (cross-platform)", async () => {
  const r = await resolveDownload({ vendor: "plugin", url: "https://example.com/plugins/LuckPerms.jar?x=1" }, fakeFetch({}));
  assert.equal(r.filename, "LuckPerms.jar");
});

test("downloadFile writes bytes with progress", async () => {
  const dest = path.join(makeTmpDir(), "out.jar");
  const body = new TextEncoder().encode("jar-bytes");
  const fetchFn = async () => ({
    ok: true,
    body: {
      async *[Symbol.asyncIterator]() {
        yield body.slice(0, 4);
        yield body.slice(4);
      },
    },
  });
  let bytes = 0;
  await downloadFile("https://x/y.jar", dest, fetchFn, (n) => { bytes = n; });
  assert.equal(fs.readFileSync(dest, "utf8"), "jar-bytes");
  assert.equal(bytes, 9);
});
