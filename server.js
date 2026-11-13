const path = require("node:path");
const { resolveConfig } = require("./src/config.js");
const { createApp } = require("./src/app.js");
const { getRealtime, attachWs } = require("./src/ws.js");
const { ServerManager } = require("./src/manager.js");
const { createDownloader } = require("./src/downloader.js");
const { releaseAssets } = require("./src/release-assets.js");
const { listServers } = require("./src/servers.js");

const isPkg = !!process.pkg;
const exeDir = isPkg ? path.dirname(process.execPath) : __dirname;
const staticRoot = isPkg ? exeDir : __dirname;
const dataDir = process.env.MC_PANEL_DATA || path.join(isPkg ? exeDir : __dirname, "data");

function boot() {
  const log = (m) => console.log("[TTCManager] " + m);
  log("starting ...");
  log("mode: " + (isPkg ? "packaged single-file" : "source"));
  log("executable dir: " + exeDir);
  log("data dir: " + dataDir);

  const { port, host } = resolveConfig({ env: process.env, dataDir });
  log("config: host=" + host + " port=" + port);

  const realtime = getRealtime(dataDir);
  const manager = new ServerManager({ dataDir, realtime });
  const downloader = createDownloader({ realtime });
  log("runtime ready (server manager + downloader)");

  const released = releaseAssets(path.join(__dirname, ".."), staticRoot, log);
  log("static root: " + staticRoot + (released ? ` (released ${released} asset(s))` : " (assets present)"));

  const servers = listServers(dataDir);
  log("servers registered: " + servers.length);
  for (const s of servers) {
    log("  - " + s.name + " [" + s.type + " " + s.version + "] path=" + s.path);
  }

  const server = createApp({ dataDir, manager, downloader, staticRoot });
  attachWs({ server, dataDir, realtime });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`[TTCManager] port ${port} in use. Change port via PORT env or data/settings.json.`);
    } else {
      console.error("[TTCManager] server error: " + err.message);
    }
    process.exit(1);
  });
  server.listen(port, host, () => {
    log("HTTP listening on http://" + host + ":" + port);
    log("ready — open http://" + host + ":" + port + " in your browser");
  });
}

if (require.main === module) boot();

module.exports = { boot, isPkg, exeDir, dataDir };
