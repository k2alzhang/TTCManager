const { execSync } = require("node:child_process");
const pkg = require("./package.json");

const targets = (pkg.pkg && pkg.pkg.targets) || ["node18-win-x64", "node18-mac-x64", "node18-linux-x64"];
const out = (pkg.pkg && pkg.pkg.outputPath) || "dist";

console.log("打包 mc-panel 为单文件可执行:", targets.join(", "));
execSync(`npx pkg . --targets ${targets.join(",")} --out-path ${out}`, { stdio: "inherit" });
console.log("完成，产物位于", out + "/");
