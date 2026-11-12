(function () {
  "use strict";

  // ---- real file listing ----
  const sid = new URLSearchParams(window.location.search).get("server");
  let tree = [];
  let path = [];

  // ---- dom ----
  const body = document.getElementById("fm-body");
  const empty = document.getElementById("fm-empty");
  const breadcrumb = document.getElementById("fm-breadcrumb");
  const fileInput = document.getElementById("fm-file-input");

  const ICONS = {
    dir: '<svg class="dir-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    file: '<svg class="file-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z"/><path d="M13 3v6h6"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    rename: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l9-9M13 6l5 5-8 8H5v-5z"/><path d="M18 3l3 3"/></svg>',
    open: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    prop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    zip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    unzip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 11v6M9 14h6"/></svg>',
    perm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    del: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  };

  // ---- navigation ----
  function currentDir() {
    return tree;
  }

  function isBinaryName(name) {
    return /\.(jar|mca|dat|zip|gz|tar|7z|png|jpg|ogg|class|nbt|schem)$/i.test(name);
  }

  async function loadDir() {
    if (!sid) return;
    const rel = path.join("/");
    try {
      const res = await window.api("/api/servers/" + encodeURIComponent(sid) + "/files?path=" + encodeURIComponent(rel));
      const entries = await res.json();
      tree = (Array.isArray(entries) ? entries : []).map((e) => ({
        name: e.name,
        type: e.type,
        size: fmtSize(e.size),
        mtime: e.mtime,
        created: e.mtime ? new Date(e.mtime).toLocaleString("zh-CN", { hour12: false }) : "—",
        perms: e.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--",
        lang: isBinaryName(e.name) ? "bin" : "text",
      }));
      render();
    } catch (e) {
      window.toast && window.toast(e.message || "加载失败", "error");
    }
  }

  function makeCrumb(text, isCurrent, goTo) {
    const c = document.createElement("span");
    c.className = "crumb" + (isCurrent ? " current" : "");
    c.textContent = text;
    c.setAttribute("role", "button");
    c.setAttribute("tabindex", "0");
    c.addEventListener("click", goTo);
    c.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goTo();
      }
    });
    return c;
  }

  function render() {
    const dir = currentDir();
    breadcrumb.innerHTML = "";
    breadcrumb.appendChild(makeCrumb("/", path.length === 0, () => { path = []; loadDir(); }));
    path.forEach((seg, i) => {
      const sep = document.createElement("span");
      sep.className = "sep";
      sep.textContent = "/";
      breadcrumb.appendChild(sep);
      breadcrumb.appendChild(makeCrumb(seg, i === path.length - 1, () => { path = path.slice(0, i + 1); loadDir(); }));
    });

    body.innerHTML = "";
    empty.hidden = dir.length > 0;
    dir.forEach((node) => body.appendChild(row(node)));
  }

  function row(node) {
    const tr = document.createElement("tr");
    const isDir = node.type === "dir";
    const nameCell = document.createElement("td");
    nameCell.innerHTML = '<span class="fm-name" role="button" tabindex="0">' + (isDir ? ICONS.dir : ICONS.file) + "<span>" + node.name + "</span></span>";
    const nameWrap = nameCell.querySelector(".fm-name");
    nameWrap.addEventListener("click", () => openNode(node));
    nameWrap.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openNode(node);
      }
    });

    const sizeCell = document.createElement("td");
    sizeCell.className = "fm-cell";
    sizeCell.textContent = isDir ? "-" : (node.size || "0 B");

    const timeCell = document.createElement("td");
    timeCell.className = "fm-cell";
    timeCell.textContent = node.created;

    const permCell = document.createElement("td");
    permCell.className = "fm-cell";
    permCell.textContent = node.perms;

    const opsCell = document.createElement("td");
    opsCell.className = "fm-ops";
    buildOps(node).forEach((op) => {
      const b = document.createElement("button");
      b.className = "btn btn-ghost" + (op.extra ? " ops-extra" : "");
      b.setAttribute("aria-label", op.label);
      b.title = op.label;
      b.innerHTML = op.icon;
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        op.fn();
      });
      opsCell.appendChild(b);
    });
    const more = document.createElement("button");
    more.className = "btn btn-ghost ops-more";
    more.setAttribute("aria-label", "更多操作");
    more.title = "更多操作";
    more.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>';
    more.addEventListener("click", (e) => {
      e.stopPropagation();
      const r = more.getBoundingClientRect();
      openCtxMenu(node, r.right, r.bottom + 4);
    });
    opsCell.appendChild(more);

    tr.append(nameCell, sizeCell, timeCell, permCell, opsCell);
    return tr;
  }

  function buildOps(node) {
    const isDir = node.type === "dir";
    const ops = [];
    if (isDir) ops.push({ key: "open", label: "打开", icon: ICONS.open, fn: () => openNode(node) });
    else ops.push({ key: "edit", label: "编辑", icon: ICONS.edit, fn: () => openNode(node) });
    ops.push({ key: "rename", label: "重命名", icon: ICONS.rename, fn: () => renameNode(node) });
    if (!isDir && isArchive(node.name)) ops.push({ key: "unzip", label: "解压", icon: ICONS.unzip, fn: () => mockOp("正在解压 " + node.name + " …"), extra: true });
    ops.push({ key: "prop", label: "属性", icon: ICONS.prop, fn: () => showProps(node), extra: true });
    ops.push({ key: "perm", label: "权限", icon: ICONS.perm, fn: () => showPerms(node), extra: true });
    ops.push({ key: "dl", label: "下载", icon: ICONS.dl, fn: () => mockOp("开始下载 " + node.name), extra: true });
    ops.push({ key: "zip", label: "压缩", icon: ICONS.zip, fn: () => mockOp("正在压缩 " + node.name), extra: true });
    ops.push({ key: "del", label: "删除", icon: ICONS.del, fn: () => removeNode(node), danger: true });
    return ops;
  }

  // ---- context menu ----
  const ctxMenu = document.getElementById("ctx-menu");
  function openCtxMenu(node, x, y) {
    ctxMenu.innerHTML = "";
    const ops = buildOps(node);
    ops.forEach((op) => {
      if (op.danger) {
        const sep = document.createElement("div");
        sep.className = "ctx-sep";
        ctxMenu.appendChild(sep);
      }
      const item = document.createElement("button");
      item.className = "ctx-item" + (op.danger ? " danger" : "");
      item.setAttribute("role", "menuitem");
      item.innerHTML = op.icon + "<span>" + op.label + "</span>";
      item.addEventListener("click", () => {
        closeCtxMenu();
        op.fn();
      });
      ctxMenu.appendChild(item);
    });
    ctxMenu.hidden = false;
    const mw = ctxMenu.offsetWidth;
    const mh = ctxMenu.offsetHeight;
    ctxMenu.style.left = Math.max(8, Math.min(x, window.innerWidth - mw - 8)) + "px";
    ctxMenu.style.top = Math.max(8, Math.min(y, window.innerHeight - mh - 8)) + "px";
  }
  function closeCtxMenu() {
    ctxMenu.hidden = true;
  }
  document.addEventListener("click", (e) => {
    if (!ctxMenu.hidden && !ctxMenu.contains(e.target)) closeCtxMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCtxMenu();
  });

  function nodeFromRow(tr) {
    const idx = Array.prototype.indexOf.call(body.children, tr);
    return currentDir()[idx];
  }

  // desktop right-click
  body.addEventListener("contextmenu", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    e.preventDefault();
    const node = nodeFromRow(tr);
    if (node) openCtxMenu(node, e.clientX, e.clientY);
  });

  // mobile long-press
  let pressTimer = null;
  body.addEventListener("touchstart", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    pressTimer = setTimeout(() => {
      const node = nodeFromRow(tr);
      if (node) {
        const r = tr.getBoundingClientRect();
        openCtxMenu(node, r.left + r.width - 8, r.top + 8);
      }
    }, 500);
  }, { passive: true });
  ["touchend", "touchmove", "touchcancel"].forEach((ev) =>
    body.addEventListener(ev, () => clearTimeout(pressTimer), { passive: true })
  );

  function isArchive(name) {
    return /\.(zip|tar|gz|jar|7z)$/i.test(name);
  }

  function openNode(node) {
    if (node.type === "dir") {
      path.push(node.name);
      loadDir();
    } else if (isBinary(node)) {
      mockOp("二进制文件，无法作为文本编辑：" + node.name);
    } else {
      const rel = path.concat(node.name).join("/");
      window.api("/api/servers/" + encodeURIComponent(sid) + "/files/read", { method: "POST", body: JSON.stringify({ path: rel }) })
        .then((r) => r.json())
        .then((d) => { node.content = d.content || ""; openEditor(node); })
        .catch((e) => mockOp(e.message || "读取失败"));
    }
  }

  function isBinary(node) {
    if (node.lang === "bin") return true;
    return /\.(jar|mca|dat|zip|gz|tar|7z|png|jpg|ogg|class)$/i.test(node.name);
  }

  function parentList() {
    if (path.length === 0) return tree;
    let node = tree;
    for (const seg of path.slice(0, -1)) node = node.find((n) => n.name === seg).children;
    return node;
  }

  function removeNode(node) {
    if (!confirm("确定删除 " + node.name + " 吗？")) return;
    const rel = path.concat(node.name).join("/");
    window.api("/api/servers/" + encodeURIComponent(sid) + "/files/delete", { method: "POST", body: JSON.stringify({ path: rel }) })
      .then((r) => r.json())
      .then((d) => { if (d.error) { mockOp(d.error); return; } loadDir(); })
      .catch((e) => mockOp(e.message || "删除失败"));
  }

  function renameNode(node) {
    mockOp("重命名需在服务器上操作");
  }

  function mockOp(msg) {
    if (window.toast) window.toast(msg, "info");
  }

  // ---- upload / new folder ----
  document.getElementById("fm-upload").addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    const f = fileInput.files[0];
    if (f) {
      const reader = new FileReader();
      const prog = window.toastProgress ? window.toastProgress("上传中：" + f.name, "info") : null;
      reader.onload = () => {
        const rel = path.concat(f.name).join("/");
        window.api("/api/servers/" + encodeURIComponent(sid) + "/files/write", { method: "POST", body: JSON.stringify({ path: rel, content: reader.result }) })
          .then((r) => r.json())
          .then((d) => {
            if (prog) prog.set(100);
            if (d.error) { mockOp(d.error); return; }
            if (prog) prog.done("已上传：" + f.name);
            loadDir();
          })
          .catch((e) => mockOp(e.message || "上传失败"));
      };
      reader.readAsText(f);
    }
    fileInput.value = "";
  });
  document.getElementById("fm-newfolder").addEventListener("click", () => {
    const name = prompt("输入文件夹名称");
    if (name) {
      const rel = path.concat(name).join("/");
      window.api("/api/servers/" + encodeURIComponent(sid) + "/files/mkdir", { method: "POST", body: JSON.stringify({ path: rel }) })
        .then((r) => r.json())
        .then((d) => { if (d.error) { mockOp(d.error); return; } loadDir(); })
        .catch((e) => mockOp(e.message || "创建失败"));
    }
  });

  function fmtSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  // ---- properties modal ----
  const propModal = document.getElementById("prop-modal");
  function showProps(node) {
    document.getElementById("prop-name").textContent = node.name;
    document.getElementById("prop-size").textContent = node.type === "dir" ? "文件夹" : node.size;
    document.getElementById("prop-time").textContent = node.created;
    document.getElementById("prop-perms").textContent = node.perms;
    document.getElementById("prop-type").textContent = node.type === "dir" ? "目录 (directory)" : "普通文件 (regular file)";
    document.getElementById("prop-path").textContent = "/" + path.concat(node.name).join("/");
    openModal(propModal);
  }

  // ---- permissions modal ----
  const permModal = document.getElementById("perm-modal");
  const permGrid = document.getElementById("perm-grid");
  const permPreview = document.getElementById("perm-preview");
  let permTarget = null;

  const GROUPS = ["owner", "group", "other"];
  const BITS = [
    ["r", "读"],
    ["w", "写"],
    ["x", "执行"],
  ];

  function showPerms(node) {
    permTarget = node;
    document.getElementById("perm-target").textContent = node.name;
    permGrid.innerHTML = "";
    const head = document.createElement("span");
    head.className = "pg-head";
    permGrid.appendChild(head);
    BITS.forEach(([b]) => {
      const h = document.createElement("span");
      h.className = "pg-head";
      h.textContent = b;
      permGrid.appendChild(h);
    });
    GROUPS.forEach((g) => {
      const label = document.createElement("span");
      label.className = "pg-group";
      label.textContent = g;
      permGrid.appendChild(label);
      BITS.forEach(([b]) => {
        const bit = document.createElement("label");
        bit.className = "perm-bit";
        bit.innerHTML = "<input type=\"checkbox\" data-g=\"" + g + "\" data-b=\"" + b + "\"><span>" + b + "</span>";
        permGrid.appendChild(bit);
      });
    });
    setPermChecks(node.perms);
    openModal(permModal);
  }

  function permsToBits(perms) {
    const m = perms.match(/^[d\-]([rwx\-]{3})([rwx\-]{3})([rwx\-]{3})$/);
    return m ? m.slice(1) : ["rw-", "r--", "r--"];
  }

  function setPermChecks(perms) {
    const bits = permsToBits(perms);
    permGrid.querySelectorAll("input").forEach((inp) => {
      const g = GROUPS.indexOf(inp.dataset.g);
      inp.checked = bits[g] && bits[g].includes(inp.dataset.b);
    });
    updatePermPreview();
  }

  function updatePermPreview() {
    let s = permTarget && permTarget.type === "dir" ? "d" : "-";
    GROUPS.forEach((g) => {
      let row = "";
      BITS.forEach(([b]) => {
        const inp = permGrid.querySelector("input[data-g=\"" + g + "\"][data-b=\"" + b + "\"]");
        row += inp && inp.checked ? b : "-";
      });
      s += row;
    });
    permPreview.textContent = s;
  }
  permGrid.addEventListener("change", updatePermPreview);

  document.getElementById("perm-save").addEventListener("click", () => {
    if (permTarget) permTarget.perms = permPreview.textContent;
    closeModal(permModal);
    render();
  });

  // ---- editor modal ----
  const editorModal = document.getElementById("editor-modal");
  let editor = null;
  let editorNode = null;
  let editorLang = null;

  function detectLang(name, content) {
    const ext = (name.split(".").pop() || "").toLowerCase();
    const map = {
      properties: "properties", yml: "yaml", yaml: "yaml", sh: "shell",
      js: "javascript", mjs: "javascript", json: "application/json",
      java: "text/x-java", c: "text/x-csrc", h: "text/x-csrc", cpp: "text/x-c++src", hpp: "text/x-c++src",
      py: "python", html: "htmlmixed", htm: "htmlmixed", css: "css",
      xml: "xml", md: "markdown", markdown: "markdown", sql: "sql",
    };
    if (map[ext]) return map[ext];
    if (content && content.startsWith("#!")) return "shell";
    if (content && content.trim().startsWith("<")) return "htmlmixed";
    if (content && content.trim().startsWith("{")) return "application/json";
    return null;
  }

  function openEditor(node) {
    editorNode = node;
    editorLang = detectLang(node.name, node.content);
    document.getElementById("editor-name").textContent = "/" + path.concat(node.name).join("/");
    document.getElementById("editor-lang").textContent = editorLang ? editorLang.split("/").pop().split("-").join(" ") : "纯文本";
    openModal(editorModal);
    const textarea = document.getElementById("editor-text");
    if (!editor) {
      editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        theme: "default",
        lineWrapping: true,
        indentUnit: 2,
      });
    }
    editor.setOption("mode", editorLang || "text/plain");
    editor.setValue(node.content || "");
    setTimeout(() => editor.refresh(), 30);
  }

  document.getElementById("editor-save").addEventListener("click", () => {
    if (!editorNode) return;
    editorNode.content = editor.getValue();
    const rel = path.concat(editorNode.name).join("/");
    window.api("/api/servers/" + encodeURIComponent(sid) + "/files/write", { method: "POST", body: JSON.stringify({ path: rel, content: editorNode.content }) })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { mockOp(d.error); return; }
        mockOp("已保存 " + editorNode.name);
        closeModal(editorModal);
        loadDir();
      })
      .catch((e) => mockOp(e.message || "保存失败"));
  });

  // ---- modal helpers ----
  function openModal(el) {
    el.hidden = false;
  }
  function closeModal(el) {
    el.hidden = true;
  }
  document.querySelectorAll(".modal-backdrop").forEach((bd) => {
    bd.addEventListener("click", (e) => {
      if (e.target === bd) closeModal(bd);
    });
    bd.querySelectorAll("[data-close]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(bd));
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop").forEach((bd) => { if (!bd.hidden) closeModal(bd); });
    }
  });

  render();
  loadDir();
})();
