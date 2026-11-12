(function () {
  const ICONS = {
    logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>',
    restart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>',
    core: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M19 5l-2 2M5 19l2-2M19 19l-2-2"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  };

  const servers = [
    { id: "survival", name: "生存服务器", status: "online", version: "1.21.1", core: "Paper", players: "12 / 20" },
    { id: "creative", name: "创造服务器", status: "offline", version: "1.20.6", core: "Spigot", players: "0 / 40" },
    { id: "skyblock", name: "空岛服务器", status: "starting", version: "1.21.1", core: "Purpur", players: "3 / 30" },
  ];

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

  function render() {
    grid.innerHTML = "";
    servers.forEach((s) => {
      const st = statusMap[s.status];
      const card = document.createElement("div");
      card.className = "card server-card";
      card.dataset.id = s.id;
      const actions = Object.entries(actionButton)
        .map(
          ([key, a]) => `<button class="btn ${a.cls}" data-action="${key}">${ICONS[a.icon]}<span>${a.label}</span></button>`
        )
        .join("");
      card.innerHTML = `
        <div class="head">
          <div class="name">${s.name}</div>
          <span class="badge ${st.cls}"><span class="dot"></span>${st.label}</span>
        </div>
        <div class="meta">
          <span class="m-item">${ICONS.core}${s.core} ${s.version}</span>
          <span class="m-item">${ICONS.users}${s.players}</span>
        </div>
        <div class="actions">${actions}</div>
      `;
      card.addEventListener("click", (e) => {
        if (e.target.closest("[data-action]")) return;
        window.location.href = "admin.html?server=" + encodeURIComponent(s.id);
      });
      card.querySelectorAll("[data-action]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          if ((action === "start" || action === "restart") && s.status !== "online") {
            s.status = "starting";
            render();
            setTimeout(() => {
              s.status = "online";
              render();
            }, 1500);
          } else if (action === "stop" && s.status !== "offline") {
            s.status = "offline";
            render();
          }
        });
      });
      grid.appendChild(card);
    });
  }

  document.getElementById("add-server").addEventListener("click", () => {
    const name = prompt("输入服务器名称");
    if (name) {
      servers.push({ id: "server-" + Date.now(), name, status: "offline", version: "1.21.1", core: "Paper", players: "0 / 20" });
      render();
    }
  });

  document.getElementById("logo-icon").innerHTML = ICONS.logo;
  render();
})();
