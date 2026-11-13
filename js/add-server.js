(function () {
  // 全量正式版（release），从 1.8 起，最新在前
  const VANILLA = [
    "1.21.9", "1.21.8", "1.21.7", "1.21.6", "1.21.5", "1.21.4", "1.21.3", "1.21.2", "1.21.1", "1.21",
    "1.20.6", "1.20.5", "1.20.4", "1.20.3", "1.20.2", "1.20.1", "1.20",
    "1.19.4", "1.19.3", "1.19.2", "1.19.1", "1.19",
    "1.18.2", "1.18.1", "1.18",
    "1.17.1", "1.17",
    "1.16.5", "1.16.4", "1.16.3", "1.16.2", "1.16.1", "1.16",
    "1.15.2", "1.15.1", "1.15",
    "1.14.4", "1.14.3", "1.14.2", "1.14.1", "1.14",
    "1.13.2", "1.13.1", "1.13",
    "1.12.2", "1.12.1", "1.12",
    "1.11.2", "1.11.1", "1.11",
    "1.10.2", "1.10.1", "1.10",
    "1.9.4", "1.9.3", "1.9.2", "1.9.1", "1.9",
    "1.8.9", "1.8.8", "1.8.7", "1.8.6", "1.8.5", "1.8.4", "1.8.3", "1.8.2", "1.8.1", "1.8",
  ];

  function vAtLeast(v, base) {
    const [a, b] = [v, base].map((s) => s.split(".").map(Number));
    for (let i = 0; i < 3; i++) {
      if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0);
    }
    return true;
  }

  // Fabric loader 支持 1.14.4 起的正式版
  const FABRIC = VANILLA.filter((v) => vAtLeast(v, "1.14.4"));
  // Paper 仅支持特定分支版本（每个分支 Paper 构建的版本）
  const PAPER = [
    "1.21.9", "1.21.8", "1.21.5", "1.21.4", "1.21.1",
    "1.20.6", "1.20.4",
    "1.19.4",
    "1.18.2",
    "1.17.1",
    "1.16.5",
    "1.15.2",
    "1.14.4",
    "1.13.2",
    "1.12.2",
    "1.11.2",
    "1.10.2",
    "1.9.4",
    "1.8.8",
  ];

  const CORES = {
    vanilla: {
      name: "原版服务器核心",
      src: "https://www.minecraft.net/zh-hans/download/server",
      versions: VANILLA,
      load: loadVanilla,
    },
    fabric: {
      name: "Fabric",
      src: "https://fabricmc.net/use/server/",
      versions: FABRIC,
      load: loadFabric,
    },
    paper: {
      name: "Paper (Spigot)",
      src: "https://fill-ui.papermc.io/projects/paper",
      versions: PAPER,
      load: loadPaper,
    },
  };

  // ---- real version fetching (with static fallback) ----
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
  async function loadVanilla() {
    const res = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return sortDesc(data.versions.filter((v) => v.type === "release" && ge(v.id, "1.8")).map((v) => v.id));
  }
  async function loadFabric() {
    const res = await fetch("https://meta.fabricmc.net/v2/versions/game");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return sortDesc(data.filter((g) => g.stable && ge(g.version, "1.8")).map((g) => g.version));
  }
  async function loadPaper() {
    const res = await fetch("https://fill.papermc.io/v3/projects/paper");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const flat = Object.values(data.versions || {}).flat().filter((v) => ge(v, "1.8") && !/(rc|pre|snapshot|alpha|beta)/i.test(v));
    return sortDesc([...new Set(flat)]);
  }
  async function getVersions(coreKey) {
    if (versionCache[coreKey]) return versionCache[coreKey];
    try {
      versionCache[coreKey] = await CORES[coreKey].load();
    } catch (e) {
      versionCache[coreKey] = CORES[coreKey].versions;
    }
    return versionCache[coreKey];
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

  // ---- upload ----
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
  uploadAdd.addEventListener("click", () => {
    if (!selectedFile || !uploadName.value.trim()) return;
    addServer({
      name: uploadName.value.trim(),
      version: selectedFile.name.replace(/\.jar$/i, ""),
      type: "vanilla",
    });
  });

  // ---- download ----
  const coreGrid = document.getElementById("core-grid");
  const versionStep = document.getElementById("version-step");
  const versionNote = document.getElementById("version-note");
  const versionGrid = document.getElementById("version-grid");
  const downloadAdd = document.getElementById("download-add");
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
    downloadAdd.disabled = !(selectedCore && selectedVersion);
  }

  downloadAdd.addEventListener("click", () => {
    if (!selectedCore || !selectedVersion) return;
    const c = CORES[selectedCore];
    addServer(
      { name: c.name + " " + selectedVersion, version: selectedVersion, type: selectedCore },
      { vendor: selectedCore, version: selectedVersion, target: "server" }
    );
  });

  async function addServer(server, downloadMeta) {
    try {
      const res = await window.api("/api/servers", {
        method: "POST",
        body: JSON.stringify({ name: server.name, type: server.type, version: server.version }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        window.toast && window.toast(data.error || "创建失败", "error");
        return;
      }
      if (downloadMeta) {
        const d = await window.api("/api/servers/" + data.id + "/download", {
          method: "POST",
          body: JSON.stringify(downloadMeta),
        });
        const dj = await d.json();
        if (dj.error) window.toast && window.toast("已创建，但核心下载失败: " + dj.error, "warn");
      }
      window.location.href = "index.html";
    } catch (e) {
      window.toast && window.toast(e.message || "创建失败", "error");
    }
  }

  renderCoreCards();
})();
