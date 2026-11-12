(function () {
  const CORES = {
    vanilla: {
      name: "原版服务器核心",
      src: "https://www.minecraft.net/zh-hans/download/server",
      versions: ["1.21.1", "1.21", "1.20.6", "1.20.4", "1.19.4"],
    },
    fabric: {
      name: "Fabric",
      src: "https://fabricmc.net/use/server/",
      versions: ["1.21.1", "1.21", "1.20.6", "1.20.1"],
    },
    paper: {
      name: "Paper (Spigot)",
      src: "https://fill-ui.papermc.io/projects/paper",
      families: {
        "1.21.x": ["1.21.9", "1.21.8", "1.21.5", "1.21.1"],
        "1.20.x": ["1.20.6", "1.20.4", "1.20.1"],
        "1.19.x": ["1.19.4", "1.19.2"],
      },
    },
  };

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
      id: "upload-" + Date.now(),
      name: uploadName.value.trim(),
      version: selectedFile.name.replace(/\.jar$/i, ""),
      core: "本地核心",
    });
  });

  // ---- download ----
  const coreGrid = document.getElementById("core-grid");
  const versionStep = document.getElementById("version-step");
  const versionNote = document.getElementById("version-note");
  const familyBar = document.getElementById("family-bar");
  const versionGrid = document.getElementById("version-grid");
  const downloadAdd = document.getElementById("download-add");
  let selectedCore = null;
  let selectedFamily = null;
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
    selectedFamily = null;
    coreGrid.querySelectorAll(".core-card").forEach((el) => el.classList.toggle("active", el.dataset.core === key));
    versionStep.hidden = false;
    renderVersionStep();
    refreshDownload();
  }

  function renderVersionStep() {
    const c = CORES[selectedCore];
    versionNote.textContent = "请选择需要下载的" + c.name + "版本";
    if (c.families) {
      familyBar.hidden = false;
      familyBar.innerHTML = "";
      Object.keys(c.families).forEach((fam, i) => {
        const chip = document.createElement("button");
        chip.className = "family-chip" + (selectedFamily === fam || (!selectedFamily && i === 0) ? " active" : "");
        chip.textContent = fam;
        chip.addEventListener("click", () => {
          selectedFamily = fam;
          selectedVersion = null;
          renderVersionStep();
          refreshDownload();
        });
        familyBar.appendChild(chip);
      });
      if (!selectedFamily) selectedFamily = Object.keys(c.families)[0];
      renderVersionGrid(c.families[selectedFamily]);
    } else {
      familyBar.hidden = true;
      renderVersionGrid(c.versions);
    }
  }

  function renderVersionGrid(versions) {
    versionGrid.innerHTML = "";
    versions.forEach((v, i) => {
      const chip = document.createElement("button");
      chip.className = "version-chip" + ((selectedVersion === v) || (!selectedVersion && i === 0) ? " active" : "");
      chip.dataset.version = v;
      chip.innerHTML = v + (i === 0 ? '<span class="latest">最新</span>' : "");
      chip.addEventListener("click", () => {
        selectedVersion = v;
        versionGrid.querySelectorAll(".version-chip").forEach((el) => el.classList.toggle("active", el.dataset.version === v));
        refreshDownload();
      });
      versionGrid.appendChild(chip);
    });
    if (!selectedVersion) selectedVersion = versions[0];
  }

  function refreshDownload() {
    downloadAdd.disabled = !(selectedCore && selectedVersion);
  }

  downloadAdd.addEventListener("click", () => {
    if (!selectedCore || !selectedVersion) return;
    const c = CORES[selectedCore];
    const name = c.name + " " + selectedVersion;
    addServer({
      id: "dl-" + Date.now(),
      name: name,
      version: selectedVersion,
      core: c.name,
    });
  });

  function addServer(server) {
    server.status = "offline";
    server.players = "0 / 20";
    const list = JSON.parse(localStorage.getItem("mc-panel-servers") || "[]");
    list.push(server);
    localStorage.setItem("mc-panel-servers", JSON.stringify(list));
    window.location.href = "index.html";
  }

  renderCoreCards();
})();
