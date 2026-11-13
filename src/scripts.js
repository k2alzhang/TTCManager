const fs = require("node:fs");
const path = require("node:path");

function ensureStartScripts(dir, { memory = 1024, javaPath = "" } = {}) {
  fs.mkdirSync(dir, { recursive: true });
  const java = javaPath ? `"${javaPath}"` : "java";
  const sh = `#!/bin/sh\n${java} -Xms512M -Xmx${memory}M -jar server.jar "$@"\n`;
  const bat = `@echo off\n${java} -Xms512M -Xmx${memory}M -jar server.jar %*\n`;
  const shFile = path.join(dir, "start.sh");
  const batFile = path.join(dir, "start.bat");
  fs.writeFileSync(shFile, sh, { mode: 0o755 });
  fs.writeFileSync(batFile, bat);
  return { sh: shFile, bat: batFile };
}

module.exports = { ensureStartScripts };
