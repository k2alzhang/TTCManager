const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function parseJavaVersion(output) {
  const m = String(output).match(/(?:version|java version)\s+"([^"]+)"/);
  if (!m) return null;
  const v = m[1];
  if (v.startsWith("1.")) return v.split(".")[1];
  return v.split(".")[0];
}

function defaultProbe(javaPath) {
  try {
    const r = spawnSync(javaPath, ["-version"], { encoding: "utf8", timeout: 5000 });
    const out = (r.stdout || "") + (r.stderr || "");
    return parseJavaVersion(out);
  } catch (e) {
    return null;
  }
}

function candidatePaths(env) {
  const set = new Set();
  const push = (p) => { if (p) set.add(p); };
  const isWin = process.platform === "win32";
  const javaBin = isWin ? "java.exe" : "java";

  if (env.JAVA_HOME) push(path.join(env.JAVA_HOME, "bin", javaBin));
  (env.PATH || "").split(path.delimiter).forEach((d) => {
    if (d) push(path.join(d, javaBin));
  });

  if (!isWin) {
    const globs = [
      "/usr/lib/jvm/*/bin/java",
      "/Library/Java/JavaVirtualMachines/*/Contents/Home/bin/java",
    ];
    globs.forEach((g) => {
      const base = g.split("/")[1] === "usr" ? "/usr/lib/jvm" : "/Library/Java/JavaVirtualMachines";
      try {
        fs.readdirSync(base).forEach((name) => {
          const p = g.replace("*", name);
          if (fs.existsSync(p)) push(p);
        });
      } catch (e) {}
    });
  } else {
    const base = "C:\\Program Files\\Java";
    try {
      fs.readdirSync(base).forEach((name) => push(path.join(base, name, "bin", javaBin)));
    } catch (e) {}
  }
  return [...set];
}

function listJdks(env, probe) {
  const probeFn = probe || defaultProbe;
  const seen = new Set();
  const out = [];
  candidatePaths(env).forEach((p) => {
    if (seen.has(p)) return;
    seen.add(p);
    const version = probeFn(p);
    if (!version) return;
    out.push({ path: p, version, source: "detected" });
  });
  out.sort((a, b) => Number(b.version) - Number(a.version));
  return out;
}

function detectJava(env, probe) {
  const list = listJdks(env, probe);
  return list.length ? list[0].path : null;
}

module.exports = { parseJavaVersion, listJdks, detectJava };
