const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

function currentLevel() {
  const raw = (process.env.TTC_LOG_LEVEL || "debug").toLowerCase();
  return LEVELS[raw] !== undefined ? raw : "debug";
}

function ts() {
  return new Date().toISOString().slice(11, 19);
}

function emit(lvl, msg) {
  if (LEVELS[lvl] < LEVELS[currentLevel()]) return;
  console.log(`[${ts()}] [TTCManager] [${lvl.toUpperCase()}] ${msg}`);
}

const log = {
  debug: (m) => emit("debug", m),
  info: (m) => emit("info", m),
  warn: (m) => emit("warn", m),
  error: (m) => emit("error", m),
};

module.exports = log;
