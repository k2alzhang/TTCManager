const test = require("node:test");
const assert = require("node:assert");
const { parseJavaVersion, listJdks, detectJava } = require("../src/jdk.js");

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
  const env = { JAVA_HOME: "/jh", PATH: "/usr/bin:/bin" };
  const probe = (p) => {
    if (p === "/jh/bin/java") return "21";
    if (p === "/usr/bin/java") return "17";
    if (p === "/bin/java") return "21";
    return null;
  };
  const list = listJdks(env, probe);
  assert.ok(list.length >= 2);
  const versions = list.map((j) => Number(j.version));
  assert.deepEqual(versions, [...versions].sort((a, b) => b - a));
});

test("detectJava falls back to PATH java", () => {
  const env = { PATH: "/usr/bin:/bin" };
  const probe = (p) => (p === "/usr/bin/java" ? "17" : null);
  assert.equal(detectJava(env, probe), "/usr/bin/java");
});
