const path = require("node:path");
const { getSettings } = require("./src/settings.js");
const { createApp } = require("./src/app.js");

const dataDir = process.env.MC_PANEL_DATA || path.join(__dirname, "data");
const settings = getSettings(dataDir);
const server = createApp({ dataDir });

if (require.main === module) {
  server.listen(settings.port, settings.host, () => {
    console.log(`mc-panel listening on http://${settings.host}:${settings.port} (data: ${dataDir})`);
  });
}

module.exports = server;
