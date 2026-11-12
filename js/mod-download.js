(function () {
  "use strict";

  const searchInput = document.getElementById("mod-search");
  const searchBtn = document.getElementById("mod-search-btn");
  const results = document.getElementById("results");
  const resultEmpty = document.getElementById("result-empty");
  const srcNote = document.getElementById("src-note");

  function fmt(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return String(n);
  }

  function toast(msg) {
    if (window.toast) window.toast(msg, "success");
  }

  function showLoading() {
    results.innerHTML = '<div class="loading">正在从 Modrinth 搜索…</div>';
  }

  async function search() {
    const q = searchInput.value.trim();
    if (!q) return;
    showLoading();
    try {
      const url =
        "https://api.modrinth.com/v2/search?query=" +
        encodeURIComponent(q) +
        "&limit=20&facets=%5B%5B%22project_type%3Amod%22%5D%5D";
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      renderResults(data.hits || []);
    } catch (err) {
      results.innerHTML =
        '<div class="result-empty muted">搜索失败：' + (err.message || err) + "。请检查网络或稍后再试。</div>";
    }
  }

  function renderResults(hits) {
    if (!hits.length) {
      results.innerHTML = '<div class="result-empty muted">没有找到匹配的模组。</div>';
      return;
    }
    results.innerHTML = "";
    hits.forEach((h) => {
      const card = document.createElement("div");
      card.className = "card result-card";
      const icon = h.icon_url
        ? '<img src="' + esc(h.icon_url) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">'
        : '<div class="ph"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></div>';
      card.innerHTML =
        '<div class="r-icon">' + icon + "</div>" +
        '<div class="r-main">' +
        '<div class="r-name"><span>' + esc(h.title) + "</span></div>" +
        '<div class="r-author">' + esc(h.author) + '</div>' +
        '<div class="r-meta">⬇ ' + fmt(h.downloads) + " · 版本 " + esc(h.latest_version || "?") + "</div>" +
        '<div class="r-desc">' + esc(h.description || "") + "</div>" +
        "</div>";
      const btn = document.createElement("button");
      btn.className = "btn btn-success";
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg><span>安装</span>';
      btn.addEventListener("click", () => install(h, btn));
      card.appendChild(btn);
      results.appendChild(card);
    });
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  async function install(hit, btn) {
    const sid = new URLSearchParams(window.location.search).get("server");
    if (!sid) { toast("请从服务器后台的插件管理进入"); return; }
    btn.disabled = true;
    try {
      let url = hit.files && hit.files[0] && hit.files[0].url;
      let filename = hit.files && hit.files[0] && hit.files[0].filename;
      if (!url && (hit.project_id || hit.slug)) {
        const vr = await fetch("https://api.modrinth.com/v2/project/" + (hit.project_id || hit.slug) + "/version");
        const versions = await vr.json();
        const v = Array.isArray(versions) && versions[0];
        if (v && v.files && v.files[0]) { url = v.files[0].url; filename = v.files[0].filename; }
      }
      if (!url) { toast("未找到下载地址：" + hit.title); btn.disabled = false; return; }
      const res = await window.api("/api/servers/" + encodeURIComponent(sid) + "/download", {
        method: "POST",
        body: JSON.stringify({ vendor: "plugin", target: "plugins", url, filename }),
      });
      const d = await res.json();
      if (d.error) { toast(d.error); btn.disabled = false; return; }
      btn.innerHTML = "<span>已安装 ✓</span>";
      toast("已安装：" + hit.title);
    } catch (e) {
      toast(e.message || "安装失败");
      btn.disabled = false;
    }
  }

  searchBtn.addEventListener("click", search);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") search();
  });
})();
