const fs = require("node:fs");
const path = require("node:path");

function resolveSafe(root, rel) {
  const full = path.resolve(root, rel || "");
  if (full !== path.resolve(root) && !full.startsWith(path.resolve(root) + path.sep)) {
    throw new Error("非法路径");
  }
  return full;
}

function localBackend(root) {
  return {
    list(dir) {
      const full = resolveSafe(root, dir);
      if (!fs.existsSync(full)) return [];
      return fs.readdirSync(full, { withFileTypes: true }).map((e) => ({
        name: e.name,
        type: e.isDirectory() ? "dir" : "file",
        size: e.isFile() ? fs.statSync(path.join(full, e.name)).size : 0,
        mtime: e.isFile() ? fs.statSync(path.join(full, e.name)).mtimeMs : 0,
      }));
    },
    readFile(dir, name) {
      const full = resolveSafe(root, path.join(dir || "", name));
      return fs.readFileSync(full, "utf8");
    },
    writeFile(dir, name, content) {
      const full = resolveSafe(root, path.join(dir || "", name));
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, content);
    },
    mkdir(dir, name) {
      const full = resolveSafe(root, path.join(dir || "", name));
      fs.mkdirSync(full, { recursive: true });
    },
    delete(dir, name) {
      const full = resolveSafe(root, path.join(dir || "", name));
      fs.rmSync(full, { recursive: true, force: true });
    },
    pathFor(dir, name) {
      return resolveSafe(root, path.join(dir || "", name));
    },
  };
}

module.exports = { localBackend };
