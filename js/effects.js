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

  global.MotionFX = {
    initGlowCards: initGlowCards,
    initScramble: initScramble,
    initSplitChar: initSplitChar,
    addEntrance: addEntrance,
  };
})(window);
