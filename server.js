const path = require("node:path");
const { resolveConfig } = require("./src/config.js");
const { ensureData } = require("./src/settings.js");
const { createApp } = require("./src/app.js");
const { getRealtime, attachWs } = require("./src/ws.js");
const { ServerManager } = require("./src/manager.js");
const { createDownloader } = require("./src/downloader.js");
const { listServers } = require("./src/servers.js");
const log = require("./src/log.js");

const isPkg = !!process.pkg;
const exeDir = isPkg ? path.dirname(process.execPath) : __dirname;
const staticRoot = __dirname;
const dataDir = process.env.MC_PANEL_DATA || path.join(isPkg ? exeDir : __dirname, "data");

function boot() {
  const info = (m) => log.info(m);
  process.on("uncaughtException", (err) => {
    log.error("FATAL: " + ((err && err.stack) || err));
  });
  try {
    info("starting ...");
    info("mode: " + (isPkg ? "packaged single-file" : "source"));
    info("executable dir: " + exeDir);
    info("data dir: " + dataDir);
    info("log level: " + (process.env.TTC_LOG_LEVEL || "debug"));

    const init = ensureData(dataDir);
    info("data folder ready (settings.json + servers.json present)");

    const { port, host } = resolveConfig({ env: process.env, dataDir });
    info("config: host=" + host + " port=" + port);

    const realtime = getRealtime(dataDir);
    const manager = new ServerManager({ dataDir, realtime });
    const downloader = createDownloader({ realtime });
    info("runtime ready (server manager + downloader)");

    info("static root: " + staticRoot + " (served from inside the executable)");

    const servers = listServers(dataDir);
    info("servers registered: " + servers.length);
    for (const s of servers) {
      info("  - " + s.name + " [" + s.type + " " + s.version + "] path=" + s.path);
    }

    const server = createApp({ dataDir, manager, downloader, staticRoot });
    attachWs({ server, dataDir, realtime, manager });
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        log.error(`port ${port} in use. Change port via PORT env or data/settings.json.`);
      } else {
        log.error("server error: " + err.message);
      }
      process.exit(1);
    });
    server.listen(port, host, () => {
      info("HTTP listening on http://" + host + ":" + port);
      info("ready — open http://" + host + ":" + port + " in your browser");
    });
  } catch (e) {
    log.error("startup failed: " + ((e && e.stack) || e));
    process.exitCode = 1;
  }
}

if (require.main === module) boot();

module.exports = { boot, isPkg, exeDir, dataDir };
