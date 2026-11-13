const path = require("node:path");
const fs = require("node:fs");
const { resolveDownload, downloadFile } = require("./download.js");
const { getServer } = require("./servers.js");
const log = require("./log.js");

function createDownloader({ realtime, resolveFn, dlFn }) {
  const resolve = resolveFn || resolveDownload;
  const dl = dlFn || downloadFile;
  return {
    async download(dataDir, serverId, meta, onProgress) {
      const server = getServer(dataDir, serverId);
      if (!server) throw new Error("服务器不存在");
      if (!server.path) throw new Error("服务器路径未设置");
      log.debug(`resolving download for server ${serverId} vendor=${meta.vendor || "plugin"} target=${meta.target || "server"}`);
      const r = await resolve(meta);
      const isPlugin = meta.target === "plugins";
      const dir = isPlugin ? path.join(server.path, "plugins") : server.path;
      fs.mkdirSync(dir, { recursive: true });
      const filename = isPlugin ? r.filename : (meta.filename || "server.jar");
      const dest = path.join(dir, filename);
      log.debug(`downloading ${r.url} -> ${dest}`);
      const total = await dl(r.url, dest, undefined, onProgress);
      if (realtime) realtime.broadcastTo(serverId, "download", { dest, filename, status: "done" });
      log.info(`download complete: ${filename} (${total} bytes) -> server ${serverId}`);
      return dest;
    },
  };
}

module.exports = { createDownloader };
