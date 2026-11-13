const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { resolveDownload, downloadFile, listVersions } = require("../src/download.js");

function fakeFetch(map) {
  return async (url) => {
    const hit = map[url];
    if (!hit) return { ok: false, status: 404, json: async () => ({}) };
    return hit;
  };
}

test("paper resolves latest build download url (fill API v3)", async () => {
  const fetchFn = fakeFetch({
    "https://fill.papermc.io/v3/projects/paper/versions/1.21.4/builds": {
      ok: true, json: async () => [
        { id: 232, downloads: { "server:default": { name: "paper-1.21.4-232.jar", url: "https://fill-data.papermc.io/v1/objects/abc/paper-1.21.4-232.jar" } } },
      ],
    },
  });
  const r = await resolveDownload({ vendor: "paper", version: "1.21.4" }, fetchFn);
  assert.equal(r.url, "https://fill-data.papermc.io/v1/objects/abc/paper-1.21.4-232.jar");
  assert.equal(r.filename, "paper-1.21.4-232.jar");
});

test("purpur resolves via latest metadata and carries md5", async () => {
  const fetchFn = fakeFetch({
    "https://api.purpurmc.org/v2/purpur/1.21/latest": {
      ok: true, json: async () => ({ build: "1288", md5: "abc123" }),
    },
  });
  const r = await resolveDownload({ vendor: "purpur", version: "1.21" }, fetchFn);
  assert.equal(r.url, "https://api.purpurmc.org/v2/purpur/1.21/latest/download");
  assert.equal(r.md5, "abc123");
});

test("downloadFile fallback zip check rejects truncated jar (no EOCD)", async () => {
  const dest = path.join(makeTmpDir(), "trunc.jar");
  const head = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
  const body = Buffer.concat([head, Buffer.from("partial-data")]);
  const fetchFn = async () => ({ ok: true, body: { async *[Symbol.asyncIterator]() { yield body; } } });
  await assert.rejects(
    () => downloadFile("https://x/y.jar", dest, fetchFn),
    /不完整|校验/i
  );
  assert.ok(!fs.existsSync(dest));
});

test("downloadFile fallback zip check passes for minimal valid jar", async () => {
  const dest = path.join(makeTmpDir(), "ok.jar");
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  const body = Buffer.concat([Buffer.from([0x50, 0x4b, 0x03, 0x04]), Buffer.from("x"), eocd]);
  const fetchFn = async () => ({ ok: true, body: { async *[Symbol.asyncIterator]() { yield body; } } });
  await downloadFile("https://x/y.jar", dest, fetchFn);
  assert.equal(fs.readFileSync(dest, "utf8"), body.toString("binary"));
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

test("fabric resolves server jar via meta API", async () => {
  const fetchFn = fakeFetch({
    "https://meta.fabricmc.net/v2/versions/loader/1.21.4": {
      ok: true, json: async () => [
        { loader: { version: "0.20.1" }, intermediary: { version: "1.21.4" } },
      ],
    },
  });
  const r = await resolveDownload({ vendor: "fabric", version: "1.21.4" }, fetchFn);
  assert.equal(r.url, "https://meta.fabricmc.net/v2/versions/loader/1.21.4/0.20.1/1.21.4/server/jar");
  assert.equal(r.filename, "fabric-server-1.21.4-0.20.1.jar");
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

test("listVersions paper dedupes + drops previews, sorted desc", async () => {
  const fetchFn = fakeFetch({
    "https://fill.papermc.io/v3/projects/paper": {
      ok: true, json: async () => ({ versions: { "1.21": ["1.21.4", "1.21.4-rc1", "1.21.1"], "1.20": ["1.20.4"] } }),
    },
  });
  const v = await listVersions("paper", fetchFn);
  assert.deepEqual(v, ["1.21.4", "1.21.1", "1.20.4"]);
});

test("listVersions purpur from /v2/purpur", async () => {
  const fetchFn = fakeFetch({
    "https://api.purpurmc.org/v2/purpur": { ok: true, json: async () => ({ versions: ["1.20.4", "1.21.4", "1.20.1"] }) },
  });
  const v = await listVersions("purpur", fetchFn);
  assert.deepEqual(v, ["1.21.4", "1.20.4", "1.20.1"]);
});

test("listVersions fabric stable only", async () => {
  const fetchFn = fakeFetch({
    "https://meta.fabricmc.net/v2/versions/game": {
      ok: true, json: async () => [{ version: "1.21.4", stable: true }, { version: "26.4-snapshot-8", stable: false }],
    },
  });
  const v = await listVersions("fabric", fetchFn);
  assert.deepEqual(v, ["1.21.4"]);
});

test("listVersions vanilla release >=1.2.5 (server jar era)", async () => {
  const fetchFn = fakeFetch({
    "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json": {
      ok: true, json: async () => ({ versions: [
        { id: "1.21.4", type: "release" },
        { id: "1.2.4", type: "release" },
        { id: "1.0", type: "release" },
        { id: "26.4-snapshot-8", type: "snapshot" },
      ] }),
    },
  });
  const v = await listVersions("vanilla", fetchFn);
  assert.deepEqual(v, ["1.21.4"]);
});

test("downloadFile writes bytes with progress", async () => {
  const dest = path.join(makeTmpDir(), "out.txt");
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
  await downloadFile("https://x/y.txt", dest, fetchFn, (n) => { bytes = n; });
  assert.equal(fs.readFileSync(dest, "utf8"), "jar-bytes");
  assert.equal(bytes, 9);
});

test("downloadFile verifies sha256 and rejects on mismatch, removing file", async () => {
  const dest = path.join(makeTmpDir(), "bad.jar");
  const body = new TextEncoder().encode("jar-bytes");
  const fetchFn = async () => ({ ok: true, body: { async *[Symbol.asyncIterator]() { yield body; } } });
  await assert.rejects(
    () => downloadFile("https://x/y.jar", dest, fetchFn, null, { alg: "sha256", value: "deadbeef" }),
    /校验/i
  );
  assert.ok(!fs.existsSync(dest), "corrupt file removed");
});

test("downloadFile passes on matching hash", async () => {
  const dest = path.join(makeTmpDir(), "good.jar");
  const body = new TextEncoder().encode("jar-bytes");
  const sha = require("node:crypto").createHash("sha256").update(body).digest("hex");
  const fetchFn = async () => ({ ok: true, body: { async *[Symbol.asyncIterator]() { yield body; } } });
  await downloadFile("https://x/y.jar", dest, fetchFn, null, { alg: "sha256", value: sha });
  assert.equal(fs.readFileSync(dest, "utf8"), "jar-bytes");
});

test("paper resolve carries sha256 checksum", async () => {
  const fetchFn = fakeFetch({
    "https://fill.papermc.io/v3/projects/paper/versions/1.21.4/builds": {
      ok: true, json: async () => [
        { id: 232, downloads: { "server:default": { name: "p.jar", url: "https://fill-data/u/p.jar", checksums: { sha256: "abc123" } } } },
      ],
    },
  });
  const r = await resolveDownload({ vendor: "paper", version: "1.21.4" }, fetchFn);
  assert.equal(r.sha256, "abc123");
});
