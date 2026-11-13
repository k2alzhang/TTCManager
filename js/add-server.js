(function () {
  "use strict";

  const VANILLA = [
    "1.21.9", "1.21.8", "1.21.7", "1.21.6", "1.21.5", "1.21.4", "1.21.3", "1.21.2", "1.21.1", "1.21", "1.20.6", "1.20.5", "1.20.4", "1.20.3", "1.20.2", "1.20.1", "1.20",
    "1.19.4", "1.19.3", "1.19.2", "1.19.1", "1.19", "1.18.2", "1.18.1", "1.18", "1.17.1", "1.17", "1.16.5", "1.16.4", "1.16.3", "1.16.2", "1.16.1", "1.16",
    "1.15.2", "1.15.1", "1.15", "1.14.4", "1.14.3", "1.14.2", "1.14.1", "1.14", "1.13.2", "1.13.1", "1.13", "1.12.2", "1.12.1", "1.12",
    "1.11.2", "1.11.1", "1.11", "1.10.2", "1.10.1", "1.10", "1.9.4", "1.9.2", "1.9", "1.8.9", "1.8.8", "1.8.7", "1.8.6", "1.8.5", "1.8.4", "1.8.3", "1.8.2", "1.8.1", "1.8",
  ];
  const FABRIC = VANILLA.filter((v) => {
    const a = v.split(".").map(Number);
    return (a[0] > 1 || (a[0] === 1 && a[1] > 14) || (a[0] === 1 && a[1] === 14 && (a[2] || 0) >= 4));
  });
  const PAPER = VANILLA.filter((v) => {
    const a = v.split(".").map(Number);
    return a[0] > 1 || (a[0] === 1 && a[1] > 8);
  });

  const CORES = {
    vanilla: { name: "原版服务器核心", src: "https://www.minecraft.net/zh-hans/download/server", versions: VANILLA },
    fabric: { name: "Fabric", src: "https://fabricmc.net/use/server/", versions: FABRIC },
    paper: { name: "Paper (Spigot)", src: "https://fill-ui.papermc.io/projects/paper", versions: PAPER },
  };

  const versionCache = {};
  function ge(v, b) {
    const a = v.split(".").map(Number);
    const c = b.split(".").map(Number);
    for (let i = 0; i < 3; i++) {
      if ((a[i] || 0) !== (c[i] || 0)) return (a[i] || 0) > (c[i] || 0);
    }
    return true;
  }
  function sortDesc(arr) {
    return arr.slice().sort((x, y) => {
      const a = x.split(".").map(Number);
      const b = y.split(".").map(Number);
      for (let i = 0; i < 3; i++) {
        const d = (b[i] || 0) - (a[i] || 0);
        if (d) return d;
      }
      return 0;
    });
  }
  async function getVersions(coreKey) {
    if (versionCache[coreKey]) return versionCache[coreKey];
    try {
      const list = await window.api("/api/download/versions?vendor=" + coreKey);
      if (Array.isArray(list) && list.length) {
        versionCache[coreKey] = sortDesc(list.filter((v) => ge(v, "1.8")));
        return versionCache[coreKey];
      }
      throw new Error("empty");
    } catch (e) {
      versionCache[coreKey] = CORES[coreKey].versions;
      return versionCache[coreKey];
    }
  }

  function fmtBytes(n) {
    if (n < 1024) return n + " B";
    if (n < 1048576) return (n / 1024).toFixed(1) + " KB";
    return (n / 1048576).toFixed(1) + " MB";
  }

  // ---- tabs ----
  const tabs = document.querySelectorAll(".tab");
  const panes = document.querySelectorAll(".pane");
  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      tabs.forEach((x) => {
        x.classList.toggle("active", x === t);
        x.setAttribute("aria-selected", x === t ? "true" : "false");
      });
      panes.forEach((p) => {
        const show = p.dataset.pane === t.dataset.mode;
        p.hidden = !show;
      });
    });
  });

  // ---- custom upload (only upload + name; start scripts auto-generated) ----
  const dropzone = document.getElementById("dropzone");
  const jarInput = document.getElementById("jar-input");
  const dzTitle = document.getElementById("dz-title");
  const uploadName = document.getElementById("upload-name");
  const uploadAdd = document.getElementById("upload-add");
  let selectedFile = null;

  function setFile(file) {
    selectedFile = file;
    dropzone.classList.add("selected");
    dzTitle.textContent = file.name;
    refreshUpload();
  }
  function refreshUpload() {
    uploadAdd.disabled = !(selectedFile && uploadName.value.trim());
  }
  dropzone.addEventListener("click", () => jarInput.click());
  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      jarInput.click();
    }
  });
  jarInput.addEventListener("change", () => {
    if (jarInput.files[0]) setFile(jarInput.files[0]);
  });
  ["dragenter", "dragover"].forEach((ev) =>
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.add("drag");
    })
  );
  ["dragleave", "drop"].forEach((ev) =>
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.remove("drag");
    })
  );
  dropzone.addEventListener("drop", (e) => {
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  });
  uploadName.addEventListener("input", refreshUpload);

  uploadAdd.addEventListener("click", async () => {
    if (!selectedFile || !uploadName.value.trim()) return;
    uploadAdd.disabled = true;
    try {
      const res = await window.api("/api/servers", {
        method: "POST",
        body: JSON.stringify({ name: uploadName.value.trim(), type: "custom", version: selectedFile.name.replace(/\.jar$/i, "") }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        window.toast && window.toast(data.error || "创建失败", "error");
        return;
      }
      window.toast && window.toast("上传中：" + selectedFile.name, "info");
      const up = await window.api("/api/servers/" + encodeURIComponent(data.id) + "/upload", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: selectedFile,
      });
      const upj = await up.json();
      if (upj.error) {
        window.toast && window.toast("上传失败: " + upj.error, "error");
        return;
      }
      window.toast && window.toast("已创建并上传，启动脚本已生成 start.sh / start.bat", "success");
      setTimeout(() => { window.location.href = "index.html"; }, 600);
    } catch (e) {
      window.toast && window.toast(e.message || "创建失败", "error");
    } finally {
      uploadAdd.disabled = false;
    }
  });

  // ---- online download (version + name + progress; create only after done) ----
  const coreGrid = document.getElementById("core-grid");
  const versionStep = document.getElementById("version-step");
  const versionNote = document.getElementById("version-note");
  const versionGrid = document.getElementById("version-grid");
  const downloadName = document.getElementById("download-name");
  const downloadAdd = document.getElementById("download-add");
  const progressBox = document.getElementById("download-progress");
  const downloadBar = document.getElementById("download-bar");
  const downloadText = document.getElementById("download-text");
  let selectedCore = null;
  let selectedVersion = null;

  function renderCoreCards() {
    coreGrid.innerHTML = "";
    Object.entries(CORES).forEach(([key, c]) => {
      const card = document.createElement("div");
      card.className = "core-card";
      card.dataset.core = key;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.innerHTML = '<span class="c-name">' + c.name + '</span><span class="c-src">来源: ' + c.src + "</span>";
      card.addEventListener("click", () => selectCore(key));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectCore(key);
        }
      });
      coreGrid.appendChild(card);
    });
  }

  function selectCore(key) {
    selectedCore = key;
    selectedVersion = null;
    coreGrid.querySelectorAll(".core-card").forEach((el) => el.classList.toggle("active", el.dataset.core === key));
    versionStep.hidden = false;
    renderVersionStep();
    refreshDownload();
  }

  async function renderVersionStep() {
    const c = CORES[selectedCore];
    versionNote.textContent = "请选择需要下载的" + c.name + "版本（仅正式版，1.8 起）";
    versionGrid.innerHTML = '<div class="version-loading">正在获取版本列表…</div>';
    const versions = await getVersions(selectedCore);
    renderVersionGrid(versions);
  }

  function renderVersionGrid(versions) {
    versionGrid.innerHTML = "";
    versions.forEach((v, i) => {
      const row = document.createElement("div");
      row.className = "version-row" + ((selectedVersion === v) || (!selectedVersion && i === 0) ? " active" : "");
      row.dataset.version = v;
      row.setAttribute("role", "option");
      row.setAttribute("aria-selected", "false");
      row.innerHTML = "<span>" + v + "</span>" + (i === 0 ? '<span class="latest">最新</span>' : "");
      row.addEventListener("click", () => {
        selectedVersion = v;
        versionGrid.querySelectorAll(".version-row").forEach((el) => {
          const on = el.dataset.version === v;
          el.classList.toggle("active", on);
          el.setAttribute("aria-selected", on ? "true" : "false");
        });
        refreshDownload();
      });
      versionGrid.appendChild(row);
    });
    if (!selectedVersion) selectedVersion = versions[0];
    if (versions.length) {
      const first = versionGrid.querySelector(".version-row");
      if (first) first.setAttribute("aria-selected", "true");
    }
  }

  function refreshDownload() {
    downloadAdd.disabled = !(selectedCore && selectedVersion && downloadName.value.trim());
  }
  downloadName.addEventListener("input", refreshDownload);

  function setProgress(pct, text) {
    progressBox.hidden = false;
    downloadBar.style.width = Math.max(0, Math.min(100, pct)) + "%";
    downloadText.textContent = text;
  }

  downloadAdd.addEventListener("click", async () => {
    if (!selectedCore || !selectedVersion || !downloadName.value.trim()) return;
    downloadAdd.disabled = true;
    setProgress(4, "正在创建服务器目录…");
    let serverId = null;
    let ws = null;
    try {
      const res = await window.api("/api/servers", {
        method: "POST",
        body: JSON.stringify({ name: downloadName.value.trim(), type: selectedCore, version: selectedVersion }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "创建失败");
      serverId = data.id;

      const proto = location.protocol === "https:" ? "wss" : "ws";
      try {
        ws = new WebSocket(proto + "://" + location.host + "/ws?token=" + encodeURIComponent(window.getToken ? window.getToken() : ""));
        ws.onopen = () => ws.send(JSON.stringify({ type: "subscribe", serverId }));
        ws.onmessage = (ev) => {
          try {
            const m = JSON.parse(ev.data);
            if (m.type === "download-progress" && m.serverId === serverId) {
              setProgress(8 + Math.min(84, (m.data.bytes / 1048576) * 2), "下载中 " + fmtBytes(m.data.bytes));
            }
            if (m.type === "download" && m.serverId === serverId && m.data.status === "done") {
              setProgress(100, "下载完成，启动脚本已生成 start.sh / start.bat");
            }
          } catch (e) {}
        };
      } catch (e) {}

      setProgress(6, "开始下载 " + selectedVersion + " …");
      const d = await window.api("/api/servers/" + encodeURIComponent(serverId) + "/download", {
        method: "POST",
        body: JSON.stringify({ vendor: selectedCore, version: selectedVersion, target: "server" }),
      });
      const dj = await d.json();
      if (!d.ok || dj.error) throw new Error(dj.error || "下载失败");
      setProgress(100, "下载完成，已创建服务器");
      window.toast && window.toast("服务器「" + downloadName.value.trim() + "」已创建", "success");
      setTimeout(() => { window.location.href = "index.html"; }, 800);
    } catch (e) {
      setProgress(0, "失败：" + (e.message || "未知错误"));
      window.toast && window.toast("下载/创建失败: " + (e.message || ""), "error");
      if (serverId) {
        try { await window.api("/api/servers/" + encodeURIComponent(serverId), { method: "DELETE" }); } catch (e2) {}
      }
    } finally {
      if (ws) { try { ws.close(); } catch (e) {} }
      downloadAdd.disabled = false;
    }
  });

  renderCoreCards();
})();
