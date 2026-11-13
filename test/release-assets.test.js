const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { makeTmpDir } = require("./helpers/tmp.js");
const { releaseAssets } = require("../src/release-assets.js");

function seedRoot() {
  const root = makeTmpDir();
  fs.writeFileSync(path.join(root, "index.html"), "<html>idx</html>");
  fs.writeFileSync(path.join(root, "login.html"), "<html>login</html>");
  fs.mkdirSync(path.join(root, "css"), { recursive: true });
  fs.writeFileSync(path.join(root, "css", "app.css"), "body{}");
  fs.mkdirSync(path.join(root, "js"), { recursive: true });
  fs.writeFileSync(path.join(root, "js", "api.js"), "window.api=1");
  return root;
}

test("releases assets into target dir on first run", () => {
  const root = seedRoot();
  const target = makeTmpDir();
  const n = releaseAssets(root, target);
  assert.ok(n >= 3);
  assert.ok(fs.existsSync(path.join(target, "index.html")));
  assert.ok(fs.existsSync(path.join(target, "login.html")));
  assert.ok(fs.existsSync(path.join(target, "css", "app.css")));
  assert.ok(fs.existsSync(path.join(target, "js", "api.js")));
});

test("does not overwrite newer target files", () => {
  const root = seedRoot();
  const target = makeTmpDir();
  fs.mkdirSync(path.join(target, "css"), { recursive: true });
  fs.writeFileSync(path.join(target, "css", "app.css"), "body{custom}");
  const future = Date.now() / 1000 + 3600;
  fs.utimesSync(path.join(target, "css", "app.css"), future, future);
  releaseAssets(root, target);
  assert.equal(fs.readFileSync(path.join(target, "css", "app.css"), "utf8"), "body{custom}");
});

test("re-copies when source is newer (upgrade)", () => {
  const root = seedRoot();
  const target = makeTmpDir();
  fs.writeFileSync(path.join(target, "index.html"), "old");
  const past = Date.now() / 1000 - 3600;
  fs.utimesSync(path.join(target, "index.html"), past, past);
  releaseAssets(root, target);
  assert.equal(fs.readFileSync(path.join(target, "index.html"), "utf8"), "<html>idx</html>");
});
