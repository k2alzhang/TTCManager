const path = require("node:path");
const { getSettings } = require("./src/settings.js");
const { createApp } = require("./src/app.js");
const { getRealtime, attachWs } = require("./src/ws.js");
const { ServerManager } = require("./src/manager.js");

const dataDir = process.env.MC_PANEL_DATA || path.join(__dirname, "data");
const settings = getSettings(dataDir);
const realtime = getRealtime(dataDir);
const manager = new ServerManager({ dataDir, realtime });
const server = createApp({ dataDir, manager });

if (require.main === module) {
  attachWs({ server, dataDir, realtime });
  server.listen(settings.port, settings.host, () => {
    console.log(`mc-panel listening on http://${settings.host}:${settings.port} (data: ${dataDir})`);
  });
}

module.exports = server;
