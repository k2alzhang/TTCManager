const fs = require("node:fs");
const path = require("node:path");

const ASSETS = ["index.html", "login.html", "admin.html", "add-server.html", "mod-download.html", "css", "js"];

function releaseAssets(sourceRoot, targetDir, log) {
  let released = 0;
  for (const rel of ASSETS) {
    const src = path.join(sourceRoot, rel);
    const dst = path.join(targetDir, rel);
    if (!fs.existsSync(src)) continue;
    const need = !fs.existsSync(dst) || fs.statSync(src).mtimeMs > fs.statSync(dst).mtimeMs;
    if (!need) continue;
    if (fs.statSync(src).isDirectory()) {
      fs.cpSync(src, dst, { recursive: true, force: true });
    } else {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.copyFileSync(src, dst);
    }
    released++;
  }
  if (log && released) log(`released ${released} static asset(s) to ${targetDir}`);
  return released;
}

module.exports = { releaseAssets, ASSETS };
