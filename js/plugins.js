(function () {
  "use strict";

  const defaults = [
    { id: "essentials", name: "EssentialsX", version: "2.20.1", source: "Modrinth", enabled: true, color: "#22C55E" },
    { id: "luckperms", name: "LuckPerms", version: "5.4.1", source: "Modrinth", enabled: true, color: "#38BDF8" },
    { id: "viaversion", name: "ViaVersion", version: "5.2.1", source: "Modrinth", enabled: true, color: "#A78BFA" },
    { id: "worldedit", name: "WorldEdit", version: "7.3.0", source: "CurseForge", enabled: true, color: "#FBBF24" },
    { id: "coreprotect", name: "CoreProtect", version: "22.3", source: "Modrinth", enabled: false, color: "#F472B6" },
  ];
  const stored = JSON.parse(localStorage.getItem("mc-panel-plugins") || "[]");
  const storedIds = new Set(stored.map((p) => p.id));
  const plugins = stored.concat(defaults.filter((d) => !storedIds.has(d.id)));

  const body = document.getElementById("plugin-body");
  const empty = document.getElementById("plugin-empty");
  const count = document.getElementById("plugin-count");
  const search = document.getElementById("plugin-search");

  const ICONS = {
    plugin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    toggle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"/></svg>',
    del: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  };

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = plugins.filter((p) => !q || p.name.toLowerCase().includes(q) || p.source.toLowerCase().includes(q));
    count.textContent = plugins.length;
    body.innerHTML = "";
    empty.hidden = list.length > 0;
    list.forEach((p) => {
      const tr = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.innerHTML =
        '<span class="fm-name"><svg class="plugin-icon" viewBox="0 0 24 24" fill="none" stroke="' + p.color + '" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>' + p.name + '</span></span>';

      const verCell = document.createElement("td");
      verCell.className = "fm-cell";
      verCell.textContent = p.version;

      const srcCell = document.createElement("td");
      srcCell.className = "fm-cell";
      srcCell.textContent = p.source;

      const stCell = document.createElement("td");
      stCell.innerHTML = p.enabled
        ? '<span class="badge badge-online"><span class="dot"></span>已启用</span>'
        : '<span class="badge badge-offline"><span class="dot"></span>已禁用</span>';

      const opsCell = document.createElement("td");
      opsCell.className = "fm-ops";
      const toggle = document.createElement("button");
      toggle.className = "btn btn-ghost";
      toggle.setAttribute("aria-label", p.enabled ? "禁用" : "启用");
      toggle.title = p.enabled ? "禁用" : "启用";
      toggle.innerHTML = ICONS.toggle;
      toggle.addEventListener("click", () => {
        p.enabled = !p.enabled;
        save();
        render();
      });
      const del = document.createElement("button");
      del.className = "btn btn-ghost";
      del.setAttribute("aria-label", "删除");
      del.title = "删除";
      del.innerHTML = ICONS.del;
      del.addEventListener("click", () => {
        if (!confirm("确定卸载 " + p.name + " 吗？")) return;
        const i = plugins.indexOf(p);
        if (i >= 0) plugins.splice(i, 1);
        save();
        render();
      });
      opsCell.append(toggle, del);

      tr.append(nameCell, verCell, srcCell, stCell, opsCell);
      body.appendChild(tr);
    });
  }

  function save() {
    localStorage.setItem("mc-panel-plugins", JSON.stringify(plugins));
  }

  search.addEventListener("input", render);
  document.getElementById("dl-plugin").addEventListener("click", () => {
    window.location.href = "mod-download.html";
  });

  render();
})();
