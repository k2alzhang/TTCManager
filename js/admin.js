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
  nameEl.textContent = "加载中…";
  window.api("/api/servers/" + encodeURIComponent(sid))
    .then((r) => r.json())
    .then((s) => { if (s && s.name) nameEl.textContent = s.name; })
    .catch(() => { nameEl.textContent = "我的服务器"; });
  nameEl.addEventListener("blur", () => {
    const name = nameEl.textContent.trim() || "我的服务器";
    nameEl.textContent = name;
    window.api("/api/servers/" + encodeURIComponent(sid), { method: "PUT", body: JSON.stringify({ name }) }).catch(() => {});
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
  navItems.forEach((n) => {
    n.addEventListener("click", () => switchView(n.dataset.view));
    n.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchView(n.dataset.view);
      }
    });
  });

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
  window.panelLog = appendLine;

  function setStatus(text) {
    termStatus.textContent = text;
  }

  setStatus("已停止");
  appendLine("等待服务器日志 …", "info");

  function connectLive() {
    const token = window.getToken && window.getToken();
    if (!token || !sid) return;
    const proto = location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(proto + "://" + location.host + "/ws?token=" + token);
    ws.onopen = () => ws.send(JSON.stringify({ type: "subscribe", serverId: sid }));
    ws.onmessage = (e) => {
      let m;
      try { m = JSON.parse(e.data); } catch (x) { return; }
      if (m.type === "log") appendLine(m.data, "info");
      else if (m.type === "status") {
        const st = m.data.status;
        setStatus(st === "running" ? "运行中" : st === "starting" ? "启动中" : st === "stopped" ? "已停止" : "未知");
      }
    };
  }
  connectLive();

  function sendCommand(cmd) {
    if (!cmd) return;
    appendLine("> " + cmd, "cmd");
    window.api("/api/servers/" + encodeURIComponent(sid) + "/command", { method: "POST", body: JSON.stringify({ command: cmd }) })
      .then((r) => r.json())
      .then((d) => { if (d.error) appendLine(d.error, "error"); })
      .catch((e) => appendLine(e.message || "发送失败", "error"));
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
      const action = ctl === "kill" ? "kill" : ctl;
      const labels = { start: "正在启动服务器 …", stop: "服务器正在关闭 …", kill: "正在强制终止进程 …" };
      appendLine(labels[action] || "", action === "start" ? "info" : "warn");
      setStatus(action === "start" ? "启动中" : "停止中");
      btn.disabled = true;
      window.api("/api/servers/" + encodeURIComponent(sid) + "/" + action, { method: "POST" })
        .then((r) => r.json())
        .then((d) => { if (d.error) { appendLine(d.error, "error"); setStatus("已停止"); } })
        .catch((e) => { appendLine(e.message || "操作失败", "error"); setStatus("已停止"); })
        .finally(() => { btn.disabled = false; });
    });
  });

  // ---- monitor cards + charts ----
  const metrics = document.getElementById("metrics");
  const metricDefs = [
    { key: "memory", label: "内存占用", unit: "MB", min: 0, max: 2048, color: "#4F46E5", base: 860, range: 160 },
    { key: "cpu", label: "CPU 占用", unit: "%", min: 0, max: 100, color: "#38BDF8", base: 34, range: 22 },
    { key: "up", label: "网络上传", unit: "KB/s", min: 0, max: 1000, color: "#A78BFA", base: 260, range: 140 },
    { key: "down", label: "网络下载", unit: "KB/s", min: 0, max: 2000, color: "#F472B6", base: 640, range: 320 },
    { key: "jdk", label: "JDK 占用", unit: "MB", min: 0, max: 1024, color: "#FBBF24", base: 512, range: 90 },
    { key: "players", label: "在线玩家", unit: "人", min: 0, max: 20, color: "#34D399", base: 12, range: 4 },
    { key: "tps", label: "TPS", unit: "", min: 0, max: 20, color: "#FB7185", base: 19.4, range: 0.8 },
  ];

  const charts = {};
  const metricCards = [];
  metricDefs.forEach((m) => {
    const card = document.createElement("div");
    card.className = "card metric-card glow-card";
    card.innerHTML = `
      <div class="m-head">
        <span class="m-label">${m.label}</span>
        <span class="m-value" id="val-${m.key}">0<small> ${m.unit}</small></span>
      </div>
      <canvas id="chart-${m.key}"></canvas>
    `;
    metrics.appendChild(card);
    metricCards.push(card);
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

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const disp = {};
  metricDefs.forEach((m) => {
    disp[m.key] = { shown: 0, target: 0 };
  });
  function animateVal(m, target) {
    const d = disp[m.key];
    d.target = target;
    if (reduceMotion) {
      d.shown = target;
      charts[m.key].valEl.innerHTML = formatVal(m, target) + "<small> " + m.unit + "</small>";
      return;
    }
    const start = d.shown;
    const t0 = performance.now();
    const dur = 650;
    function step(now) {
      const t = Math.min(1, (now - t0) / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      const v = start + (d.target - start) * ease;
      d.shown = v;
      charts[m.key].valEl.innerHTML = formatVal(m, v) + "<small> " + m.unit + "</small>";
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function tick() {
    metricDefs.forEach((m) => {
      const c = charts[m.key];
      const drift = (Math.random() - 0.5) * m.range * 0.5;
      const next = clamp(c.value + drift, m.min, m.max);
      c.value = next;
      c.chart.push(next);
      animateVal(m, next);
    });
  }
  metricDefs.forEach((m) => animateVal(m, m.base));
  setInterval(tick, 1000);

  // ---- server properties ----
  const props = document.getElementById("props");
  const propItems = [
    { k: "核心端版本", v: "Paper 1.21.1" },
    { k: "游戏版本", v: "1.21.1 (Java 21)" },
    { k: "在线玩家", v: "12 / 20" },
    { k: "运行时长", v: "3 小时 24 分" },
  ];
  const propCards = [];
  propItems.forEach((p) => {
    const item = document.createElement("div");
    item.className = "card prop-item glow-card";
    item.innerHTML = '<span class="k">' + p.k + '</span><span class="v">' + p.v + "</span>";
    props.appendChild(item);
    propCards.push(item);
  });

  window.addEventListener("resize", () => {
    Object.values(charts).forEach((c) => c.chart.draw());
  });

  if (window.MotionFX) {
    MotionFX.initGlowCards(".glow-card");
    MotionFX.initSplitChar(".nav-item");
    MotionFX.addEntrance(metrics, metricCards);
    MotionFX.addEntrance(props, propCards);
  }

  // ================= Player management =================
  const PLAYER_KEY = "mc-panel-players";
  const playerBody = document.getElementById("player-body");
  const playerEmpty = document.getElementById("player-empty");
  const playerFilter = document.getElementById("player-filter");
  const playerModal = document.getElementById("player-modal");
  const playerModalBody = document.getElementById("player-modal-body");
  const playerModalTitle = document.getElementById("player-modal-title");
  const reasonModal = document.getElementById("reason-modal");
  const reasonTitle = document.getElementById("reason-title");
  const reasonInput = document.getElementById("reason-input");
  const reasonOk = document.getElementById("reason-ok");

  let players = loadPlayers();
  let playerState = "all";
  let pendingReason = null;

  function loadPlayers() {
    try {
      const v = JSON.parse(localStorage.getItem(PLAYER_KEY));
      if (Array.isArray(v) && v.length) return v;
    } catch (e) {}
    const seed = [
      { name: "Steve", uuid: "069a79f4-44e9-4726-a5be-fca90e38aaf5", online: true, role: "admin", black: false, reason: "", ip: "192.168.1.10", first: "2026-11-01 09:12", last: "2026-11-12 01:20", playMin: 3420 },
      { name: "Alex", uuid: "853c80e3-6a4e-4a1b-9d0f-1c2e3a4b5c6d", online: true, role: "player", black: false, reason: "", ip: "192.168.1.22", first: "2026-11-03 14:05", last: "2026-11-12 01:18", playMin: 1680 },
      { name: "Herobrine", uuid: "7d2e8f90-1a3b-4c5d-8e6f-0a1b2c3d4e5f", online: true, role: "player", black: false, reason: "", ip: "10.0.0.45", first: "2026-11-05 20:44", last: "2026-11-12 01:19", playMin: 905 },
      { name: "Ender", uuid: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d", online: false, role: "player", black: true, reason: "使用作弊模组", ip: "172.16.0.7", first: "2026-10-28 11:30", last: "2026-11-08 23:41", playMin: 2310 },
      { name: "CreeperKing", uuid: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e", online: false, role: "player", black: false, reason: "", ip: "192.168.1.31", first: "2026-11-06 10:02", last: "2026-11-11 18:26", playMin: 640 },
      { name: "Notch", uuid: "c3d4e5f6-a7b8-4c9d-8e0f-2a3b4c5d6e7f", online: false, role: "admin", black: false, reason: "", ip: "192.168.1.2", first: "2026-10-20 08:00", last: "2026-11-10 07:15", playMin: 5100 },
    ];
    localStorage.setItem(PLAYER_KEY, JSON.stringify(seed));
    return seed;
  }
  function savePlayers() {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(players));
  }

  const ICONS = {
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/></svg>',
    ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>',
    kick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M17 8l5 5M22 8l-5 5"/></svg>',
  };

  function statusBadge(p) {
    let cls, label;
    if (p.black) { cls = "badge-black"; label = "拉黑"; }
    else if (p.online) { cls = "badge-online"; label = "在线"; }
    else { cls = "badge-offline"; label = "离线"; }
    return '<span class="badge ' + cls + '"><span class="dot"></span>' + label + "</span>";
  }

  function opBtn(icon, label, cls, action) {
    const b = document.createElement("button");
    b.className = "btn " + (cls || "");
    b.setAttribute("aria-label", label);
    b.setAttribute("title", label);
    b.innerHTML = ICONS[icon];
    b.addEventListener("click", action);
    return b;
  }

  function renderPlayers() {
    const counts = { all: players.length, online: 0, offline: 0, black: 0 };
    players.forEach((p) => {
      if (p.online) counts.online++;
      else counts.offline++;
      if (p.black) counts.black++;
    });
    document.getElementById("player-count").textContent = counts.all;
    document.getElementById("player-online-count").textContent = counts.online;
    document.getElementById("player-black-count").textContent = counts.black;

    const list = players.filter((p) => {
      if (playerState === "online") return p.online;
      if (playerState === "offline") return !p.online;
      if (playerState === "black") return p.black;
      return true;
    });

    playerBody.innerHTML = "";
    list.forEach((p) => {
      const tr = document.createElement("tr");

      const nameTd = document.createElement("td");
      const cell = document.createElement("div");
      cell.className = "player-cell";
      const av = document.createElement("span");
      av.className = "player-avatar";
      av.textContent = p.name[0].toUpperCase();
      const nm = document.createElement("span");
      nm.className = "player-name";
      nm.textContent = p.name;
      if (p.black) {
        const tag = document.createElement("span");
        tag.className = "tag badge badge-black";
        tag.textContent = "已拉黑";
        nm.appendChild(tag);
      }
      cell.appendChild(av);
      cell.appendChild(nm);
      nameTd.appendChild(cell);
      tr.appendChild(nameTd);

      const stTd = document.createElement("td");
      stTd.innerHTML = statusBadge(p);
      tr.appendChild(stTd);

      const uuidTd = document.createElement("td");
      uuidTd.className = "fm-cell";
      uuidTd.textContent = p.uuid.slice(0, 13) + "…";
      uuidTd.title = p.uuid;
      tr.appendChild(uuidTd);

      const roleTd = document.createElement("td");
      roleTd.innerHTML = p.role === "admin"
        ? '<span class="badge badge-admin"><span class="dot"></span>管理员</span>'
        : '<span class="badge badge-offline"><span class="dot"></span>玩家</span>';
      tr.appendChild(roleTd);

      const ops = document.createElement("td");
      ops.className = "fm-ops";
      ops.appendChild(opBtn("info", "查看属性", "", () => showPlayerProps(p)));
      ops.appendChild(opBtn("shield", p.role === "admin" ? "取消管理员" : "设为管理员", "", () => toggleAdmin(p)));
      ops.appendChild(opBtn("ban", p.black ? "解除拉黑" : "拉黑玩家", p.black ? "" : "btn-warn", () => toggleBlack(p)));
      if (p.online && !p.black) ops.appendChild(opBtn("kick", "踢出游戏", "btn-danger", () => kickPlayer(p)));
      tr.appendChild(ops);

      playerBody.appendChild(tr);
    });

    playerEmpty.hidden = list.length > 0;
  }

  function showPlayerProps(p) {
    playerModalTitle.textContent = "玩家属性 · " + p.name;
    const rows = [
      ["名称", p.name],
      ["UUID", p.uuid],
      ["状态", p.black ? "拉黑" : p.online ? "在线" : "离线"],
      ["角色", p.role === "admin" ? "管理员" : "玩家"],
      ["IP 地址", p.ip],
      ["首次进入", p.first],
      ["最近进入", p.last],
      ["在线时长", Math.floor(p.playMin / 60) + " 小时 " + (p.playMin % 60) + " 分钟"],
      ["拉黑理由", p.reason || "—"],
    ];
    playerModalBody.innerHTML = rows.map((r) =>
      '<div class="prop-row"><span class="k">' + r[0] + '</span><span class="v mono">' + r[1] + "</span></div>"
    ).join("");
    openModal(playerModal);
  }

  function toggleAdmin(p) {
    p.role = p.role === "admin" ? "player" : "admin";
    savePlayers();
    window.toast(p.name + " 已被" + (p.role === "admin" ? "设为管理员" : "取消管理员"), "success");
    renderPlayers();
  }

  function toggleBlack(p) {
    if (p.black) {
      p.black = false;
      p.reason = "";
      savePlayers();
      window.toast(p.name + " 已解除拉黑", "success");
      renderPlayers();
    } else {
      askReason("拉黑玩家：" + p.name, (r) => {
        p.black = true;
        p.reason = r;
        savePlayers();
        window.toast(p.name + " 已被拉黑" + (r ? "（理由：" + r + "）" : ""), "error");
        renderPlayers();
      });
    }
  }

  function kickPlayer(p) {
    askReason("踢出玩家：" + p.name, (r) => {
      p.online = false;
      savePlayers();
      window.toast(p.name + " 已被踢出游戏" + (r ? "（理由：" + r + "）" : ""), "error");
      renderPlayers();
    });
  }

  function askReason(title, cb) {
    reasonTitle.textContent = title;
    reasonInput.value = "";
    pendingReason = cb;
    openModal(reasonModal);
    setTimeout(() => reasonInput.focus(), 30);
  }

  function openModal(el) {
    el.hidden = false;
  }

  reasonOk.addEventListener("click", () => {
    const v = reasonInput.value.trim();
    if (pendingReason) {
      const cb = pendingReason;
      pendingReason = null;
      cb(v);
    }
    reasonModal.hidden = true;
  });
  reasonInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      reasonOk.click();
    }
  });

  playerFilter.addEventListener("click", (e) => {
    const btn = e.target.closest(".pfilter-btn");
    if (!btn) return;
    playerState = btn.dataset.filter;
    playerFilter.querySelectorAll(".pfilter-btn").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on);
    });
    renderPlayers();
  });

  document.getElementById("player-reload").addEventListener("click", () => {
    renderPlayers();
    window.toast("玩家列表已刷新", "info");
  });

  renderPlayers();
})();
