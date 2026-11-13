const fs = require("node:fs");
const path = require("node:path");

function ensureStartScripts(dir, { memory = 2048, javaPath = "" } = {}) {
  fs.mkdirSync(dir, { recursive: true });
  const java = javaPath ? `"${javaPath}"` : "java";
  const sh = `#!/bin/sh\n# 默认最大内存 2048MB，可手动修改（如 -Xms512M -Xmx2048M）\n${java} -Xmx${memory}M -jar server.jar "$@"\n`;
  const bat = `@echo off\nREM 默认最大内存 2048MB，可手动修改（如 -Xms512M -Xmx2048M）\n${java} -Xmx${memory}M -jar server.jar %*\n`;
  const shFile = path.join(dir, "start.sh");
  const batFile = path.join(dir, "start.bat");
  fs.writeFileSync(shFile, sh, { mode: 0o755 });
  fs.writeFileSync(batFile, bat);
  return { sh: shFile, bat: batFile };
}

module.exports = { ensureStartScripts };
