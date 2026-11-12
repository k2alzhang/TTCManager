const fs = require("node:fs");
const path = require("node:path");

class JsonStore {
  constructor(file) {
    this.file = file;
  }
  load() {
    try {
      return JSON.parse(fs.readFileSync(this.file, "utf8"));
    } catch (e) {
      return {};
    }
  }
  save(obj) {
    const dir = path.dirname(this.file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const tmp = this.file + "." + process.pid + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(obj, null, 2));
    fs.renameSync(tmp, this.file);
  }
}

module.exports = { JsonStore };
