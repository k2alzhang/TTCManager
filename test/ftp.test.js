const test = require("node:test");
const assert = require("node:assert");
const { ftpBackend } = require("../src/backends/ftp.js");

function fakeClient() {
  const calls = [];
  const client = {
    calls,
    async access(conf) { calls.push(["access", conf]); },
    async list(p) {
      calls.push(["list", p]);
      return [
        { name: "a.jar", isDirectory: false, isFile: true, size: 10, modifiedAt: new Date(1000) },
        { name: "world", isDirectory: true, isFile: false, size: 0, modifiedAt: new Date(1000) },
      ];
    },
    async downloadTo(w, p) { calls.push(["downloadTo", p]); w.end("file-content"); },
    async uploadFrom(r, p) { calls.push(["uploadFrom", p]); },
    async ensureDir(p) { calls.push(["ensureDir", p]); },
    async remove(p) { calls.push(["remove", p]); },
    async removeDir(p) { calls.push(["removeDir", p]); },
    async close() { calls.push(["close"]); },
  };
  return client;
}

test("list maps ftp entries", async () => {
  const b = ftpBackend({ host: "h", user: "u", password: "p" }, { clientFactory: fakeClient });
  const list = await b.list("");
  assert.deepEqual(list.map((e) => e.name).sort(), ["a.jar", "world"]);
  assert.equal(list.find((e) => e.name === "a.jar").type, "file");
  assert.equal(list.find((e) => e.name === "world").type, "dir");
});

test("readFile downloads and collects", async () => {
  const b = ftpBackend({ host: "h", user: "u", password: "p" }, { clientFactory: fakeClient });
  assert.equal(await b.readFile("plugins", "a.jar"), "file-content");
});

test("writeFile uploads", async () => {
  const b = ftpBackend({ host: "h", user: "u", password: "p" }, { clientFactory: fakeClient });
  await b.writeFile("", "server.properties", "motd=hi");
  const up = b._client.calls.find((c) => c[0] === "uploadFrom");
  assert.ok(up);
  assert.equal(up[1], "/server.properties");
});

test("mkdir and delete", async () => {
  const b = ftpBackend({ host: "h", user: "u", password: "p" }, { clientFactory: fakeClient });
  await b.mkdir("", "world");
  assert.ok(b._client.calls.find((c) => c[0] === "ensureDir"));
  await b.delete("", "world");
  assert.ok(b._client.calls.find((c) => c[0] === "removeDir"));
});
