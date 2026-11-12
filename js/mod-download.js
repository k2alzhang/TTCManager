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
    let t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.remove("hidden");
    setTimeout(() => t.classList.add("hidden"), 2400);
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

  function install(hit, btn) {
    const id = hit.project_id || hit.slug || "mod-" + Date.now();
    const list = JSON.parse(localStorage.getItem("mc-panel-plugins") || "[]");
    if (list.some((p) => p.id === id)) {
      toast("已安装：" + hit.title);
      return;
    }
    list.push({
      id: id,
      name: hit.title,
      version: hit.latest_version || "?",
      source: "Modrinth",
      enabled: true,
      color: "#4F46E5",
    });
    localStorage.setItem("mc-panel-plugins", JSON.stringify(list));
    btn.disabled = true;
    btn.innerHTML = "<span>已安装 ✓</span>";
    toast("已安装：" + hit.title);
  }

  searchBtn.addEventListener("click", search);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") search();
  });
})();
