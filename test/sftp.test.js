const test = require("node:test");
const assert = require("node:assert");
const { Readable } = require("node:stream");
const { sftpBackend } = require("../src/backends/sftp.js");

function fakeSftp() {
  const calls = [];
  return {
    calls,
    async connect(conf) { calls.push(["connect", conf]); },
    async list(p) {
      calls.push(["list", p]);
      return [
        { name: "a.jar", type: "-", size: 10, modifyTime: 1000 },
        { name: "world", type: "d", size: 0, modifyTime: 1000 },
      ];
    },
    async get(p) {
      calls.push(["get", p]);
      return Readable.from(["sftp-data"]);
    },
    async put(src, p) { calls.push(["put", p, src]); },
    async mkdir(p, r) { calls.push(["mkdir", p, r]); },
    async rmdir(p, r) { calls.push(["rmdir", p, r]); },
    async delete(p) { calls.push(["delete", p]); },
    async end() { calls.push(["end"]); },
  };
}

test("sftp list maps entries", async () => {
  const b = sftpBackend({ host: "h", user: "u", password: "p" }, { clientFactory: fakeSftp });
  const list = await b.list("");
  assert.deepEqual(list.map((e) => e.name).sort(), ["a.jar", "world"]);
  assert.equal(list.find((e) => e.name === "a.jar").type, "file");
  assert.equal(list.find((e) => e.name === "world").type, "dir");
});

test("sftp readFile collects stream", async () => {
  const b = sftpBackend({ host: "h", user: "u", password: "p" }, { clientFactory: fakeSftp });
  assert.equal(await b.readFile("plugins", "a.jar"), "sftp-data");
});

test("sftp writeFile puts buffer", async () => {
  const b = sftpBackend({ host: "h", user: "u", password: "p" }, { clientFactory: fakeSftp });
  await b.writeFile("", "server.properties", "motd=hi");
  const put = b._client.calls.find((c) => c[0] === "put");
  assert.equal(put[1], "/server.properties");
});

test("sftp mkdir/delete", async () => {
  const b = sftpBackend({ host: "h", user: "u", password: "p" }, { clientFactory: fakeSftp });
  await b.mkdir("", "world");
  assert.ok(b._client.calls.find((c) => c[0] === "mkdir"));
  await b.delete("", "a.jar");
  assert.ok(b._client.calls.find((c) => c[0] === "delete"));
});
