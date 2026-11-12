const { Readable } = require("node:stream");

function joinPath(dir, name) {
  const parts = [dir || "", name || ""].filter(Boolean);
  return "/" + parts.join("/");
}

function ftpBackend(config, { clientFactory } = {}) {
  const ftp = require("basic-ftp");
  const factory = clientFactory || (() => new ftp.Client(10000));
  const client = factory();
  let opened = false;

  async function open() {
    if (opened) return;
    await client.access({
      host: config.host,
      port: config.port || 21,
      user: config.user,
      password: config.password,
      secure: Boolean(config.secure),
    });
    opened = true;
  }

  return {
    _client: client,
    async list(dir) {
      await open();
      const entries = await client.list(dir || "/");
      return entries.map((e) => ({
        name: e.name,
        type: e.isDirectory ? "dir" : "file",
        size: e.size || 0,
        mtime: e.modifiedAt ? e.modifiedAt.getTime() : 0,
      }));
    },
    async readFile(dir, name) {
      await open();
      let out = "";
      const writable = new (require("node:stream").Writable)({
        write(chunk, enc, cb) { out += chunk.toString(); cb(); },
      });
      await client.downloadTo(writable, joinPath(dir, name));
      return out;
    },
    async writeFile(dir, name, content) {
      await open();
      const readable = Readable.from([Buffer.from(String(content), "utf8")]);
      await client.uploadFrom(readable, joinPath(dir, name));
    },
    async mkdir(dir, name) {
      await open();
      await client.ensureDir(joinPath(dir, name));
    },
    async delete(dir, name) {
      await open();
      const p = joinPath(dir, name);
      const list = await client.list(dir || "/");
      const entry = list.find((e) => e.name === name);
      if (entry && entry.isDirectory) await client.removeDir(p);
      else await client.remove(p);
    },
    async close() {
      if (opened) await client.close();
      opened = false;
    },
  };
}

module.exports = { ftpBackend };
