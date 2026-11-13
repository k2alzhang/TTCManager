const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { resolveDownload, downloadFile } = require("./download.js");
const { addServer, removeServer } = require("./servers.js");
const { ensureStartScripts } = require("./scripts.js");
const log = require("./log.js");

function createInstaller({ realtime, resolveFn, dlFn } = {}) {
  const resolve = resolveFn || resolveDownload;
  const dl = dlFn || downloadFile;
  return async function install(dataDir, body) {
    const name = String(body.name || "").trim();
    if (!name) throw new Error("服务器名称不能为空");
    const vendor = String(body.vendor || "").trim();
    const version = String(body.version || "").trim();
    if (!vendor || !version) throw new Error("缺少核心类型或版本");
    const progressId = String(body.progressId || "install");

    const tmpDir = path.join(dataDir, "tmp", crypto.randomUUID());
    fs.mkdirSync(tmpDir, { recursive: true });
    try {
      log.debug(`install: resolving ${vendor} ${version}`);
      const r = await resolve({ vendor, version, target: "server" });
      const dest = path.join(tmpDir, r.filename || "server.jar");
      log.debug(`install: downloading ${r.url}`);
      const expect = r.sha256 ? { alg: "sha256", value: r.sha256 } : r.md5 ? { alg: "md5", value: r.md5 } : r.sha1 ? { alg: "sha1", value: r.sha1 } : null;
      const total = await dl(r.url, dest, undefined, (n) => {
        if (realtime) realtime.broadcastTo(progressId, "download-progress", { bytes: n });
      }, expect);
      log.info(`install: verified ${total} bytes (${vendor} ${version})`);

      const server = addServer(dataDir, {
        name,
        type: vendor === "vanilla" ? "vanilla" : vendor,
        version,
        memory: Number.isInteger(body.memory) ? body.memory : 2048,
      });
      try {
        fs.renameSync(dest, path.join(server.path, "server.jar"));
      } catch (e) {
        removeServer(dataDir, server.id);
        throw e;
      }
      const scripts = ensureStartScripts(server.path, { memory: server.memory });
      log.info(`install: server "${name}" created with verified core (${server.id})`);
      return { server, dest: path.join(server.path, "server.jar"), scripts };
    } finally {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
    }
  };
}

module.exports = { createInstaller };
