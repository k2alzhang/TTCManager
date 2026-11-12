const { Readable } = require("node:stream");

function joinPath(dir, name) {
  const parts = [dir || "", name || ""].filter(Boolean);
  return "/" + parts.join("/");
}

function sftpBackend(config, { clientFactory } = {}) {
  const SftpClient = require("ssh2-sftp-client");
  const factory = clientFactory || (() => new SftpClient());
  const client = factory();
  let opened = false;

  async function open() {
    if (opened) return;
    await client.connect({
      host: config.host,
      port: config.port || 22,
      username: config.user,
      password: config.password,
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
        type: e.type === "d" || e.type === "-" ? (e.type === "d" ? "dir" : "file") : "file",
        size: e.size || 0,
        mtime: (e.modifyTime || 0) * 1000,
      }));
    },
    async readFile(dir, name) {
      await open();
      const stream = await client.get(joinPath(dir, name));
      let out = "";
      for await (const chunk of stream) out += chunk.toString();
      return out;
    },
    async writeFile(dir, name, content) {
      await open();
      await client.put(Buffer.from(String(content), "utf8"), joinPath(dir, name));
    },
    async mkdir(dir, name) {
      await open();
      await client.mkdir(joinPath(dir, name), true);
    },
    async delete(dir, name) {
      await open();
      const p = joinPath(dir, name);
      const entries = await client.list(dir || "/");
      const entry = entries.find((e) => e.name === name);
      if (entry && entry.type === "d") await client.rmdir(p, true);
      else await client.delete(p);
    },
    async close() {
      if (opened) await client.end();
      opened = false;
    },
  };
}

module.exports = { sftpBackend };
