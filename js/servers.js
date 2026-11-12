(function () {
  const ICONS = {
    logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>',
    restart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>',
    core: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M19 5l-2 2M5 19l2-2M19 19l-2-2"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  };

  let servers = [];
  const grid = document.getElementById("server-grid");
  const statusMap = {
    online: { label: "运行中", cls: "badge-online" },
    offline: { label: "已停止", cls: "badge-offline" },
    starting: { label: "启动中", cls: "badge-starting" },
  };
  const actionButton = {
    start: { cls: "btn-success", icon: "play", label: "启动" },
    stop: { cls: "btn-danger", icon: "stop", label: "关闭" },
    restart: { cls: "btn-warn", icon: "restart", label: "重启" },
  };
  function st(status) {
    return status === "running" ? "online" : status === "starting" ? "starting" : "offline";
  }

  function render() {
    grid.innerHTML = "";
    if (!servers.length) {
      grid.innerHTML = '<div class="card" style="grid-column:1/-1;text-align:center;padding:40px;color:var(--color-muted-foreground)">还没有服务器，点击右上角「添加服务器」。</div>';
      return;
    }
    servers.forEach((s, idx) => {
      const stt = statusMap[st(s.status)];
      const card = document.createElement("div");
      card.className = "card server-card glow-card";
      card.dataset.id = s.id;
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "进入 " + s.name + " 管理后台");
      const actions = Object.entries(actionButton)
        .map(([key, a]) => `<button class="btn ${a.cls}" data-action="${key}">${ICONS[a.icon]}<span>${a.label}</span></button>`)
        .join("");
      card.innerHTML = `
        <div class="head">
          <div class="name">${s.name}</div>
          <span class="badge ${stt.cls}"><span class="dot"></span>${stt.label}</span>
        </div>
        <div class="meta">
          <span class="m-item">${ICONS.core}${s.type || "paper"} ${s.version || "latest"}</span>
          <span class="m-item">${ICONS.users}${s.memory ? s.memory + " MB" : "—"}</span>
        </div>
        <div class="actions">${actions}</div>
      `;
      card.addEventListener("click", (e) => {
        if (e.target.closest("[data-action]")) return;
        window.location.href = "admin.html?server=" + encodeURIComponent(s.id);
      });
      card.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && !e.target.closest("[data-action]")) {
          e.preventDefault();
          window.location.href = "admin.html?server=" + encodeURIComponent(s.id);
        }
      });
      card.querySelectorAll("[data-action]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          btn.disabled = true;
          window.api("/api/servers/" + encodeURIComponent(s.id) + "/" + action, { method: "POST" })
            .then((r) => r.json())
            .then((d) => {
              if (d.error) { window.toast && window.toast(d.error, "error"); return; }
              s.status = action === "start" ? "starting" : action === "stop" ? "stopped" : "starting";
              render();
            })
            .catch((ex) => { window.toast && window.toast(ex.message, "error"); })
            .finally(() => { btn.disabled = false; });
        });
      });
      grid.appendChild(card);
    });
    if (window.MotionFX) {
      MotionFX.initGlowCards(".server-card");
      if (!render.done) {
        MotionFX.addEntrance(grid, grid.querySelectorAll(".server-card"));
        render.done = true;
      }
    }
  }

  function load() {
    window.api("/api/servers")
      .then((r) => r.json())
      .then((list) => { servers = Array.isArray(list) ? list : []; render(); })
      .catch((e) => { window.toast && window.toast(e.message || "加载失败", "error"); });
  }

  document.getElementById("add-server").addEventListener("click", () => {
    window.location.href = "add-server.html";
  });

  document.getElementById("logo-icon").innerHTML = ICONS.logo;
  load();
})();
