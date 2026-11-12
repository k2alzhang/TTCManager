const fs = require("node:fs");
const path = require("node:path");

const PAPER = "https://api.papermc.io/v2/projects/paper/versions";
const PURPUR = "https://api.purpurmc.org/v2/purpur";
const MANIFEST = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";

async function resolveDownload(meta, fetchFn) {
  const f = fetchFn || fetch;
  if (meta.vendor === "paper") {
    const v = meta.version;
    const res = await f(`${PAPER}/${v}/builds`);
    const data = await res.json();
    const build = data.builds[data.builds.length - 1].build;
    return {
      url: `${PAPER}/${v}/builds/${build}/downloads/paper-${v}-${build}.jar`,
      filename: `paper-${v}-${build}.jar`,
    };
  }
  if (meta.vendor === "purpur") {
    const v = meta.version;
    return {
      url: `${PURPUR}/${v}/latest/download`,
      filename: `purpur-${v}.jar`,
    };
  }
  if (meta.vendor === "vanilla") {
    const v = meta.version;
    const manifest = await (await f(MANIFEST)).json();
    const release = manifest.latest.release;
    const want = v === "latest" || !v ? release : v;
    const ver = manifest.versions.find((x) => x.id === want);
    const vres = await (await f(ver.url)).json();
    return {
      url: vres.downloads.server.url,
      filename: "server.jar",
    };
  }
  if (meta.vendor === "plugin") {
    return { url: meta.url, filename: meta.filename || path.basename(meta.url) };
  }
  throw new Error("未知下载源");
}

async function downloadFile(url, dest, fetchFn, onProgress) {
  const f = fetchFn || fetch;
  const res = await f(url);
  if (!res.ok) throw new Error("下载失败: HTTP " + res.status);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const tmp = dest + ".part";
  let total = 0;
  const out = fs.createWriteStream(tmp);
  for await (const chunk of res.body) {
    out.write(chunk);
    total += chunk.length;
    if (onProgress) onProgress(total);
  }
  await new Promise((resolve, reject) => {
    out.end(() => resolve());
    out.on("error", reject);
  });
  fs.renameSync(tmp, dest);
  return total;
}

module.exports = { resolveDownload, downloadFile };
