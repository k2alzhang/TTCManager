(function () {
  "use strict";

  const CORES = {
    vanilla: { name: "原版服务器核心", src: "https://www.minecraft.net/zh-hans/download/server" },
    fabric: { name: "Fabric", src: "https://fabricmc.net/use/server/" },
    paper: { name: "Paper (Spigot)", src: "https://fill-ui.papermc.io/projects/paper" },
  };

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
    versionNote.textContent = "请选择需要下载的" + c.name + "版本（仅正式版）";
    versionGrid.innerHTML = '<div class="version-loading">正在获取版本列表…</div>';
    try {
      const res = await window.api("/api/download/versions?vendor=" + selectedCore);
      const list = await res.json();
      if (!res.ok || !Array.isArray(list) || !list.length) throw new Error(list && list.error || "版本列表为空");
      versionCache[selectedCore] = list;
      renderVersionGrid(list);
    } catch (e) {
      versionGrid.innerHTML = "";
      const err = document.createElement("div");
      err.className = "version-loading";
      err.textContent = "获取版本失败: " + (e.message || "未知错误");
      const retry = document.createElement("button");
      retry.className = "btn btn-warn";
      retry.textContent = "重试";
      retry.addEventListener("click", renderVersionStep);
      err.appendChild(document.createElement("br"));
      err.appendChild(retry);
      versionGrid.appendChild(err);
    }
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
    setProgress(4, "正在解析下载地址…");
    let ws = null;
    const progressId = "install-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    try {
      const proto = location.protocol === "https:" ? "wss" : "ws";
      try {
        ws = new WebSocket(proto + "://" + location.host + "/ws?token=" + encodeURIComponent(window.getToken ? window.getToken() : ""));
        ws.onopen = () => ws.send(JSON.stringify({ type: "subscribe", serverId: progressId }));
        ws.onmessage = (ev) => {
          try {
            const m = JSON.parse(ev.data);
            if (m.type === "download-progress" && m.serverId === progressId) {
              setProgress(10 + Math.min(80, (m.data.bytes / 1048576) * 2), "下载中 " + fmtBytes(m.data.bytes) + "（校验后才会创建服务器）");
            }
          } catch (e) {}
        };
      } catch (e) {}

      const res = await window.api("/api/download/install", {
        method: "POST",
        body: JSON.stringify({
          name: downloadName.value.trim(),
          vendor: selectedCore,
          version: selectedVersion,
          memory: 2048,
          progressId: progressId,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "下载失败");
      setProgress(100, "下载校验通过，服务器已创建");
      window.toast && window.toast("服务器「" + downloadName.value.trim() + "」已创建（核心已校验完整）", "success");
      setTimeout(() => { window.location.href = "index.html"; }, 900);
    } catch (e) {
      setProgress(0, "失败：" + (e.message || "未知错误") + "（未创建服务器）");
      window.toast && window.toast("下载失败，未创建服务器: " + (e.message || ""), "error");
    } finally {
      if (ws) { try { ws.close(); } catch (e) {} }
      downloadAdd.disabled = false;
    }
  });

  renderCoreCards();
})();
