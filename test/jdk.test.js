const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const { parseJavaVersion, listJdks, detectJava } = require("../src/jdk.js");

function javaBin() {
  return process.platform === "win32" ? "java.exe" : "java";
}
function jp(...p) {
  return path.join(...p);
}

test("parseJavaVersion: openjdk 21", () => {
  assert.equal(parseJavaVersion('openjdk version "21.0.13" 2026-10-20'), "21");
});

test("parseJavaVersion: java 1.8 -> 8", () => {
  assert.equal(parseJavaVersion('java version "1.8.0_392"'), "8");
});

test("parseJavaVersion: unknown -> null", () => {
  assert.equal(parseJavaVersion("not java"), null);
});

test("listJdks sorts by version desc and dedupes by path", () => {
  const dirA = jp("/usr", "bin");
  const dirB = jp("/bin");
  const env = { JAVA_HOME: "/jh", PATH: [dirA, dirB].join(path.delimiter) };
  const probe = (p) => {
    if (p === jp("/jh", "bin", javaBin())) return "21";
    if (p === jp(dirA, javaBin())) return "17";
    if (p === jp(dirB, javaBin())) return "21";
    return null;
  };
  const list = listJdks(env, probe);
  assert.ok(list.length >= 2);
  const versions = list.map((j) => Number(j.version));
  assert.deepEqual(versions, [...versions].sort((a, b) => b - a));
});

test("detectJava falls back to PATH java", () => {
  const dirA = jp("/usr", "bin");
  const env = { PATH: [dirA].join(path.delimiter) };
  const probe = (p) => (p === jp(dirA, javaBin()) ? "17" : null);
  assert.equal(detectJava(env, probe), jp(dirA, javaBin()));
});
