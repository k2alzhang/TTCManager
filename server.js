const path = require("node:path");
const { resolveConfig } = require("./src/config.js");
const { createApp } = require("./src/app.js");
const { getRealtime, attachWs } = require("./src/ws.js");
const { ServerManager } = require("./src/manager.js");
const { createDownloader } = require("./src/downloader.js");

const dataDir = process.env.MC_PANEL_DATA || path.join(__dirname, "data");
const { port, host } = resolveConfig({ env: process.env, dataDir });
const realtime = getRealtime(dataDir);
const manager = new ServerManager({ dataDir, realtime });
const downloader = createDownloader({ realtime });
const server = createApp({ dataDir, manager, downloader });

if (require.main === module) {
  attachWs({ server, dataDir, realtime });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`端口 ${port} 已被占用，请修改端口或释放该端口（PORT 环境变量或 settings.json）。`);
    } else {
      console.error("服务器错误:", err.message);
    }
    process.exit(1);
  });
  server.listen(port, host, () => {
    console.log(`TTCManager listening on http://${host}:${port} (data: ${dataDir})`);
  });
}

module.exports = server;
