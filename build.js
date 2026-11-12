const { execFileSync } = require("node:child_process");
const path = require("node:path");
const pkg = require("./package.json");

const targets = (process.env.BUILD_TARGETS || ((pkg.pkg && pkg.pkg.targets) || ["node18-win-x64", "node18-mac-x64", "node18-linux-x64"])).split(",").map((t) => t.trim()).filter(Boolean);
const out = (pkg.pkg && pkg.pkg.outputPath) || "dist";
const pkgBin = path.join(__dirname, "node_modules", "pkg", "lib-es5", "bin.js");

console.log("打包 TTCManager 为单文件可执行:", targets.join(", "));
execFileSync(process.execPath, [pkgBin, ".", "--targets", targets.join(","), "--out-path", out], { stdio: "inherit" });
console.log("完成，产物位于", out + "/");
