(function (global) {
  "use strict";

  var reduceMotion = false;
  try {
    reduceMotion = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  function initGlowCards(selector) {
    document.querySelectorAll(selector).forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  function initScramble(selector) {
    var pool = "01#/<>+=*[]{}%$&";
    document.querySelectorAll(selector).forEach(function (el) {
      var node = Array.prototype.filter.call(el.childNodes, function (n) {
        return n.nodeType === 3 && n.textContent.trim();
      })[0];
      if (!node) return;
      var original = node.textContent;
      var timer = null;
      function run() {
        if (reduceMotion) return;
        var f = 0;
        clearInterval(timer);
        timer = setInterval(function () {
          var out = "";
          for (var i = 0; i < original.length; i++) {
            var ch = original[i];
            if (ch === " ") out += " ";
            else if (i < f / 2.2) out += ch;
            else out += pool[Math.floor(Math.random() * pool.length)];
          }
          node.textContent = out;
          if (++f > original.length * 2.2) {
            clearInterval(timer);
            node.textContent = original;
          }
        }, 42);
      }
      el.addEventListener("mouseenter", run);
    });
  }

  function initSplitChar(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      var node = Array.prototype.filter.call(el.childNodes, function (n) {
        return n.nodeType === 3 && n.textContent.trim();
      })[0];
      if (!node) return;
      var wrap = document.createElement("span");
      wrap.className = "nav-label";
      node.textContent.split("").forEach(function (ch) {
        var s = document.createElement("span");
        s.className = "sc";
        s.textContent = ch === " " ? "\u00A0" : ch;
        wrap.appendChild(s);
      });
      node.replaceWith(wrap);
    });
  }

  function addEntrance(container, items, step) {
    if (reduceMotion) return;
    var s = step || 0.05;
    items.forEach(function (el, i) {
      el.classList.add("anim-in");
      el.style.setProperty("--d", (s * i).toFixed(2) + "s");
    });
  }

  function initToast() {
    if (document.getElementById("toast-wrap")) return;
    var wrap = document.createElement("div");
    wrap.id = "toast-wrap";
    wrap.setAttribute("aria-live", "polite");
    document.body.appendChild(wrap);
    global.toast = function (msg, type) {
      var t = document.createElement("div");
      t.className = "toast " + (type || "info");
      t.textContent = msg;
      wrap.appendChild(t);
      requestAnimationFrame(function () { t.classList.add("show"); });
      setTimeout(function () {
        t.classList.remove("show");
        setTimeout(function () { t.remove(); }, 300);
      }, 3000);
    };
    global.toastProgress = function (label, type) {
      var t = document.createElement("div");
      t.className = "toast toast-progress " + (type || "info");
      t.innerHTML = '<div class="toast-label"></div><div class="toast-bar"><div class="toast-bar-fill"></div></div>';
      t.querySelector(".toast-label").textContent = label;
      wrap.appendChild(t);
      requestAnimationFrame(function () { t.classList.add("show"); });
      var fill = t.querySelector(".toast-bar-fill");
      function finish(msg, doneType) {
        t.classList.remove("toast-progress");
        t.querySelector(".toast-label").textContent = msg || label;
        if (doneType) t.classList.add(doneType);
        setTimeout(function () {
          t.classList.remove("show");
          setTimeout(function () { t.remove(); }, 300);
        }, 900);
      }
      return {
        set: function (p) { fill.style.width = Math.min(100, Math.max(0, p)) + "%"; },
        done: function (m) { finish(m, "success"); },
        fail: function (m) { finish(m, "error"); },
      };
    };
  }
  initToast();

  global.MotionFX = {
    initGlowCards: initGlowCards,
    initScramble: initScramble,
    initSplitChar: initSplitChar,
    addEntrance: addEntrance,
  };
})(window);
