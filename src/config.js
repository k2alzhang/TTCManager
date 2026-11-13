const { getSettings } = require("./settings.js");

function resolveConfig({ env, dataDir }) {
  const settings = getSettings(dataDir);
  const port = Number(env.PORT) || settings.port;
  const host = env.HOST || settings.host;
  return { dataDir, port, host };
}

module.exports = { resolveConfig };
