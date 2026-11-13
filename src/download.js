const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const PAPER = "https://fill.papermc.io/v3/projects/paper/versions";
const PURPUR = "https://api.purpurmc.org/v2/purpur";
const MANIFEST = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";

async function resolveDownload(meta, fetchFn) {
  const f = fetchFn || fetch;
  if (meta.vendor === "paper") {
    const v = meta.version;
    const res = await f(`${PAPER}/${v}/builds`);
    if (!res.ok) throw new Error(`Paper 获取构建失败: HTTP ${res.status}`);
    const builds = await res.json();
    const build = Array.isArray(builds) ? builds[builds.length - 1] : null;
    const dl = build && build.downloads && build.downloads["server:default"];
    if (!dl || !dl.url) throw new Error("Paper 未找到可用构建下载");
    return {
      url: dl.url,
      filename: dl.name || `paper-${v}.jar`,
      sha256: dl.checksums && dl.checksums.sha256,
    };
  }
  if (meta.vendor === "fabric") {
    const gv = meta.version;
    const res = await f(`https://meta.fabricmc.net/v2/versions/loader/${gv}`);
    if (!res.ok) throw new Error(`Fabric 获取加载器失败: HTTP ${res.status}`);
    const list = await res.json();
    const top = Array.isArray(list) ? list[0] : null;
    const loader = top && top.loader && top.loader.version;
    const inter = top && top.intermediary && top.intermediary.version;
    if (!loader || !inter) throw new Error("Fabric 未找到可用加载器");
    return {
      url: `https://meta.fabricmc.net/v2/versions/loader/${gv}/${loader}/${inter}/server/jar`,
      filename: `fabric-server-${gv}-${loader}.jar`,
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
    if (!vres.downloads || !vres.downloads.server) throw new Error(`原版版本无服务端下载: ${want}`);
    return {
      url: vres.downloads.server.url,
      filename: "server.jar",
      sha1: vres.downloads.server.sha1,
    };
  }
  if (meta.vendor === "plugin") {
    return { url: meta.url, filename: meta.filename || String(meta.url).split("/").pop().split("?")[0] || "plugin.jar" };
  }
  throw new Error("未知下载源");
}

async function downloadFile(url, dest, fetchFn, onProgress, expect) {
  const f = fetchFn || fetch;
  const res = await f(url);
  if (!res.ok) throw new Error("下载失败: HTTP " + res.status);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const tmp = dest + ".part";
  const hash = expect && expect.value ? crypto.createHash(expect.alg || "sha256") : null;
  let total = 0;
  const out = fs.createWriteStream(tmp);
  for await (const chunk of res.body) {
    out.write(chunk);
    if (hash) hash.update(chunk);
    total += chunk.length;
    if (onProgress) onProgress(total);
  }
  await new Promise((resolve, reject) => {
    out.end(() => resolve());
    out.on("error", reject);
  });
  if (hash) {
    const got = hash.digest("hex");
    if (got.toLowerCase() !== String(expect.value).toLowerCase()) {
      fs.rmSync(tmp, { force: true });
      throw new Error(`下载校验失败 (${expect.alg || "sha256"} 不匹配)`);
    }
  }
  fs.renameSync(tmp, dest);
  return total;
}

function vcmp(a, b) {
  const pa = String(a).split(".").map(Number);
  const pb = String(b).split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const d = (pb[i] || 0) - (pa[i] || 0);
    if (d) return d;
  }
  return 0;
}

async function listVersions(vendor, fetchFn) {
  const f = fetchFn || fetch;
  if (vendor === "paper") {
    const res = await f("https://fill.papermc.io/v3/projects/paper");
    if (!res.ok) throw new Error(`Paper 获取版本失败: HTTP ${res.status}`);
    const data = await res.json();
    const flat = Object.values(data.versions || {}).flat();
    return [...new Set(flat.filter((v) => !/(rc|pre|snapshot|alpha|beta)/i.test(v)))].sort(vcmp);
  }
  if (vendor === "purpur") {
    const res = await f("https://api.purpurmc.org/v2/purpur");
    if (!res.ok) throw new Error(`Purpur 获取版本失败: HTTP ${res.status}`);
    const data = await res.json();
    return (data.versions || []).slice().sort(vcmp);
  }
  if (vendor === "fabric") {
    const res = await f("https://meta.fabricmc.net/v2/versions/game");
    if (!res.ok) throw new Error(`Fabric 获取版本失败: HTTP ${res.status}`);
    const list = await res.json();
    return (list || []).filter((g) => g.stable).map((g) => g.version).sort(vcmp);
  }
  if (vendor === "vanilla") {
    const res = await f(MANIFEST);
    if (!res.ok) throw new Error(`原版获取版本失败: HTTP ${res.status}`);
    const data = await res.json();
    return (data.versions || [])
      .filter((v) => v.type === "release" && vcmp(v.id, "1.2.5") <= 0)
      .map((v) => v.id)
      .sort(vcmp);
  }
  throw new Error("未知下载源");
}

module.exports = { resolveDownload, downloadFile, listVersions };
