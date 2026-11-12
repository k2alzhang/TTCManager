(function () {
  "use strict";

  const sid = new URLSearchParams(window.location.search).get("server");
  let plugins = [];
  const COLORS = ["#4F46E5", "#38BDF8", "#A78BFA", "#FBBF24", "#F472B6", "#34D399"];

  async function loadPlugins() {
    if (!sid) return;
    try {
      const res = await window.api("/api/servers/" + encodeURIComponent(sid) + "/files?path=" + encodeURIComponent("plugins"));
      const entries = await res.json();
      plugins = (Array.isArray(entries) ? entries : [])
        .filter((e) => e.type === "file" && /\.jar$/i.test(e.name))
        .map((e, i) => ({
          id: e.name,
          name: e.name.replace(/\.jar$/i, ""),
          version: "—",
          source: "plugins/",
          enabled: true,
          color: COLORS[i % COLORS.length],
        }));
      render();
    } catch (e) {
      window.toast && window.toast(e.message || "加载失败", "error");
    }
  }

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
        window.toast && window.toast("插件启停需在服务器控制台执行 /plugin", "info");
      });
      const del = document.createElement("button");
      del.className = "btn btn-ghost";
      del.setAttribute("aria-label", "删除");
      del.title = "删除";
      del.innerHTML = ICONS.del;
      del.addEventListener("click", () => {
        if (!confirm("确定卸载 " + p.name + " 吗？")) return;
        window.api("/api/servers/" + encodeURIComponent(sid) + "/files/delete", { method: "POST", body: JSON.stringify({ path: "plugins/" + p.id }) })
          .then((r) => r.json())
          .then((d) => { if (d.error) { window.toast && window.toast(d.error, "error"); return; } loadPlugins(); })
          .catch((e) => window.toast && window.toast(e.message || "卸载失败", "error"));
      });
      opsCell.append(toggle, del);

      tr.append(nameCell, verCell, srcCell, stCell, opsCell);
      body.appendChild(tr);
    });
  }

  search.addEventListener("input", render);
  document.getElementById("dl-plugin").addEventListener("click", () => {
    window.location.href = "mod-download.html?server=" + encodeURIComponent(sid || "");
  });

  render();
  loadPlugins();
})();
