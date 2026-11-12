const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const pkg = require("./package.json");

function platformFilenames(name, targets) {
  return targets.map((t) => {
    const platform = (t.split("-")[1] || "").toLowerCase();
    const isWin = platform === "win";
    return {
      platform,
      src: name + (isWin ? ".exe" : ""),
      dest: `${platform}-${name}` + (isWin ? ".exe" : ""),
    };
  });
}

function run() {
  const targets = (process.env.BUILD_TARGETS || ((pkg.pkg && pkg.pkg.targets) || ["node18-win-x64", "node18-mac-x64", "node18-linux-x64"])).split(",").map((t) => t.trim()).filter(Boolean);
  const out = (pkg.pkg && pkg.pkg.outputPath) || "dist";
  const pkgBin = path.join(__dirname, "node_modules", "pkg", "lib-es5", "bin.js");

  console.log("打包 TTCManager 为单文件可执行:", targets.join(", "));
  execFileSync(process.execPath, [pkgBin, ".", "--targets", targets.join(","), "--out-path", out], { stdio: "inherit" });

  for (const f of platformFilenames(pkg.name, targets)) {
    const src = path.join(out, f.src);
    const dest = path.join(out, f.dest);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
      console.log("产物:", dest);
    }
  }
  console.log("完成，产物位于", out + "/");
}

if (require.main === module) run();

module.exports = { platformFilenames };
