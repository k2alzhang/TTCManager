(function () {
  const LOGO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>';

  const serverNames = {
    survival: "生存服务器",
    creative: "创造服务器",
    skyblock: "空岛服务器",
  };

  // ---- server name (editable) ----
  const nameEl = document.getElementById("server-name");
  const params = new URLSearchParams(window.location.search);
  const sid = params.get("server");
  const storedName = localStorage.getItem("mc-panel-name");
  nameEl.textContent = storedName || serverNames[sid] || "我的服务器";
  nameEl.addEventListener("blur", () => {
    localStorage.setItem("mc-panel-name", nameEl.textContent.trim() || "我的服务器");
    nameEl.textContent = localStorage.getItem("mc-panel-name");
  });
  nameEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nameEl.blur();
    }
  });

  document.getElementById("logo-icon").innerHTML = LOGO;

  // ---- nav switching ----
  const navItems = document.querySelectorAll(".nav-item");
  const panes = document.querySelectorAll(".view");
  function switchView(id) {
    navItems.forEach((n) => n.classList.toggle("active", n.dataset.view === id));
    panes.forEach((p) => {
      const show = p.dataset.pane === id;
      p.hidden = !show;
      if (show) window.dispatchEvent(new Event("resize"));
    });
  }
  navItems.forEach((n) => n.addEventListener("click", () => switchView(n.dataset.view)));

  // ---- terminal ----
  const terminal = document.getElementById("terminal");
  const cmdInput = document.getElementById("cmd-input");
  const termStatus = document.getElementById("term-status");

  function appendLine(text, type) {
    const line = document.createElement("div");
    line.className = "line " + (type || "info");
    const t = new Date().toLocaleTimeString("zh-CN", { hour12: false });
    line.innerHTML = '<span class="t">[' + t + "]</span> " + text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
    return line;
  }

  function setStatus(text) {
    termStatus.textContent = text;
  }

  const seedLogs = [
    { t: "info", m: "正在加载核心 …" },
    { t: "info", m: "Paper 1.21.1 启动完成" },
    { t: "info", m: "世界 \"world\" 已加载 (3 个维度)" },
    { t: "warn", m: "服务器版本落后，建议更新核心端" },
    { t: "info", m: "RCON 已监听 0.0.0.0:25575" },
    { t: "info", m: "完成！启动耗时 4.8 秒。使用 \"help\" 查看更多指令。" },
  ];
  seedLogs.forEach((l) => appendLine(l.m, l.t));
  setStatus("运行中");

  function sendCommand(cmd) {
    if (!cmd) return;
    appendLine("> " + cmd, "cmd");
    setTimeout(() => {
      appendLine("指令已发送: " + cmd, "info");
    }, 120);
  }
  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendCommand(cmdInput.value);
      cmdInput.value = "";
    }
  });

  // ---- control buttons ----
  document.querySelectorAll("[data-ctl]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ctl = btn.dataset.ctl;
      if (ctl === "start") {
        appendLine("正在启动服务器 …", "info");
        setStatus("启动中");
        btn.disabled = true;
        setTimeout(() => {
          appendLine("Paper 1.21.1 启动完成", "info");
          setStatus("运行中");
          btn.disabled = false;
        }, 1800);
      } else if (ctl === "stop") {
        appendLine("服务器正在关闭 …", "warn");
        setStatus("停止中");
        setTimeout(() => {
          appendLine("服务器已停止", "warn");
          setStatus("已停止");
        }, 1500);
      } else if (ctl === "kill") {
        appendLine("正在强制终止进程 (PID 4210) …", "error");
        setStatus("已终止");
      }
    });
  });

  // ---- monitor cards + charts ----
  const metrics = document.getElementById("metrics");
  const metricDefs = [
    { key: "memory", label: "内存占用", unit: "MB", min: 0, max: 2048, color: "#22C55E", base: 860, range: 160 },
    { key: "cpu", label: "CPU 占用", unit: "%", min: 0, max: 100, color: "#38BDF8", base: 34, range: 22 },
    { key: "up", label: "网络上传", unit: "KB/s", min: 0, max: 1000, color: "#A78BFA", base: 260, range: 140 },
    { key: "down", label: "网络下载", unit: "KB/s", min: 0, max: 2000, color: "#F472B6", base: 640, range: 320 },
    { key: "jdk", label: "JDK 占用", unit: "MB", min: 0, max: 1024, color: "#FBBF24", base: 512, range: 90 },
    { key: "players", label: "在线玩家", unit: "人", min: 0, max: 20, color: "#34D399", base: 12, range: 4 },
    { key: "tps", label: "TPS", unit: "", min: 0, max: 20, color: "#FB7185", base: 19.4, range: 0.8 },
  ];

  const charts = {};
  metricDefs.forEach((m) => {
    const card = document.createElement("div");
    card.className = "card metric-card";
    card.innerHTML = `
      <div class="m-head">
        <span class="m-label">${m.label}</span>
        <span class="m-value" id="val-${m.key}">--<small> ${m.unit}</small></span>
      </div>
      <canvas id="chart-${m.key}"></canvas>
    `;
    metrics.appendChild(card);
  });

  function formatVal(m, v) {
    if (m.key === "tps") return v.toFixed(1);
    return Math.round(v).toString();
  }

  metricDefs.forEach((m) => {
    const canvas = document.getElementById("chart-" + m.key);
    const valEl = document.getElementById("val-" + m.key);
    const chart = window.createStreamChart(canvas, {
      color: m.color,
      min: m.min,
      max: m.max,
      maxPoints: 80,
    });
    // seed
    const seed = [];
    for (let i = 0; i < 40; i++) {
      const v = clamp(m.base + (Math.random() - 0.5) * m.range * 2, m.min, m.max);
      seed.push(v);
    }
    chart.seed(seed);
    charts[m.key] = { chart, valEl, value: m.base };
  });

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function tick() {
    metricDefs.forEach((m) => {
      const c = charts[m.key];
      const drift = (Math.random() - 0.5) * m.range * 0.5;
      const next = clamp(c.value + drift, m.min, m.max);
      c.value = next;
      c.chart.push(next);
      c.valEl.innerHTML = formatVal(m, next) + "<small> " + m.unit + "</small>";
    });
  }
  setInterval(tick, 1000);

  // ---- server properties ----
  const props = document.getElementById("props");
  const propItems = [
    { k: "核心端版本", v: "Paper 1.21.1" },
    { k: "游戏版本", v: "1.21.1 (Java 21)" },
    { k: "在线玩家", v: "12 / 20" },
    { k: "运行时长", v: "3 小时 24 分" },
  ];
  propItems.forEach((p) => {
    const item = document.createElement("div");
    item.className = "card prop-item";
    item.innerHTML = '<span class="k">' + p.k + '</span><span class="v">' + p.v + "</span>";
    props.appendChild(item);
  });

  window.addEventListener("resize", () => {
    Object.values(charts).forEach((c) => c.chart.draw());
  });
})();
