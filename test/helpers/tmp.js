const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "ttcmanager-"));
}

module.exports = { makeTmpDir };
