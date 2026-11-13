const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { ensureStartScripts } = require("../src/scripts.js");

test("ensureStartScripts writes start.sh + start.bat with memory", () => {
  const dir = makeTmpDir();
  const out = ensureStartScripts(dir, { memory: 2048 });
  assert.ok(fs.existsSync(out.sh));
  assert.ok(fs.existsSync(out.bat));
  const sh = fs.readFileSync(out.sh, "utf8");
  const bat = fs.readFileSync(out.bat, "utf8");
  assert.ok(sh.startsWith("#!/bin/sh"));
  assert.ok(sh.includes("-Xmx2048M"));
  assert.ok(sh.includes("server.jar"));
  assert.ok(bat.includes("-Xmx2048M"));
  assert.ok(bat.includes("server.jar"));
});

test("start.sh is executable and honors custom java path", () => {
  const dir = makeTmpDir();
  const out = ensureStartScripts(dir, { memory: 1024, javaPath: "/opt/jdk17/bin/java" });
  const sh = fs.readFileSync(out.sh, "utf8");
  assert.ok(sh.includes('"/opt/jdk17/bin/java"'));
  if (process.platform !== "win32") {
    const mode = fs.statSync(out.sh).mode & 0o777;
    assert.ok(mode & 0o100, "executable bit set");
  }
});

test("ensureStartScripts is idempotent", () => {
  const dir = makeTmpDir();
  ensureStartScripts(dir, { memory: 1024 });
  const out = ensureStartScripts(dir, { memory: 2048 });
  assert.ok(fs.readFileSync(out.sh, "utf8").includes("-Xmx2048M"));
});

test("default scripts cap at 2G with no forced Xms (manual editing allowed)", () => {
  const dir = makeTmpDir();
  const out = ensureStartScripts(dir);
  const shCmd = fs.readFileSync(out.sh, "utf8").split("\n").find((l) => l.includes("server.jar"));
  assert.ok(shCmd.includes("-Xmx2048M"), "default max 2048M");
  assert.ok(!shCmd.includes("-Xms"), "no forced initial heap (min 0)");
  const batCmd = fs.readFileSync(out.bat, "utf8").split("\n").find((l) => l.includes("server.jar"));
  assert.ok(batCmd.includes("-Xmx2048M"));
  assert.ok(!batCmd.includes("-Xms"));
});
