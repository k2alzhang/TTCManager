const { loadMasterKey } = require("./crypto.js");
const { getConnection } = require("./connections.js");
const { getServer } = require("./servers.js");
const { localBackend } = require("./backends/local.js");
const { ftpBackend } = require("./backends/ftp.js");
const { sftpBackend } = require("./backends/sftp.js");

function getBackend(dataDir, serverId, masterKey) {
  const key = masterKey || loadMasterKey(dataDir);
  const conn = getConnection(dataDir, serverId, key);
  if (conn.type === "local") {
    const server = getServer(dataDir, serverId);
    return localBackend(server ? server.path : dataDir);
  }
  if (conn.type === "ftp") return ftpBackend(conn);
  if (conn.type === "sftp") return sftpBackend(conn);
  throw new Error("未知连接类型");
}

module.exports = { getBackend };
