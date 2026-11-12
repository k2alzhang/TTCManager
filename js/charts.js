(function (global) {
  "use strict";

  function createStreamChart(canvas, opts) {
    opts = opts || {};
    const color = opts.color || "#4F46E5";
    const fillAlpha = opts.fillAlpha != null ? opts.fillAlpha : 0.16;
    const maxPoints = opts.maxPoints || 90;
    const min = opts.min != null ? opts.min : 0;
    const max = opts.max != null ? opts.max : 100;
    const smooth = opts.smooth !== false;

    const ctx = canvas.getContext("2d");
    const data = [];
    let reveal = 0;
    let revealed = false;

    function resize() {
      const dpr = global.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0 && (canvas.width !== w * dpr || canvas.height !== h * dpr)) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    function toY(v) {
      const t = Math.max(0, Math.min(1, (v - min) / (max - min || 1)));
      return canvas.clientHeight - 4 - t * (canvas.clientHeight - 10);
    }

    function draw() {
      resize();
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w <= 0 || h <= 0) return;
      ctx.clearRect(0, 0, w, h);

      const n = data.length;
      if (n < 2) return;

      // grid lines (subtle)
      ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
      ctx.lineWidth = 1;
      for (let g = 1; g < 4; g++) {
        const gy = (h / 4) * g;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      const visible = Math.floor(n * reveal);
      const effective = Math.max(2, visible);
      const step = w / (maxPoints - 1);
      const startX = w - (n - 1) * step;

      // area + line
      const pts = [];
      for (let i = 0; i < effective; i++) {
        const idx = n - effective + i;
        pts.push([startX + idx * step, toY(data[idx])]);
      }

      // fading history: older points lower alpha
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let i = 0; i < pts.length - 1; i++) {
        const alpha = 0.25 + 0.75 * (i / (pts.length - 1 || 1));
        const x0 = pts[i][0];
        const y0 = pts[i][1];
        let x1 = pts[i + 1][0];
        let y1 = pts[i + 1][1];
        if (smooth && i + 2 < pts.length) {
          const mx = (pts[i + 1][0] + pts[i + 2][0]) / 2;
          const my = (pts[i + 1][1] + pts[i + 2][1]) / 2;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.quadraticCurveTo(x1, y1, mx, my);
          ctx.strokeStyle = hexToRgba(color, alpha);
          ctx.stroke();
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = hexToRgba(color, alpha);
        ctx.stroke();
      }

      // filled area under the visible curve
      if (pts.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], h - 2);
        for (let i = 0; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.lineTo(pts[pts.length - 1][0], h - 2);
        ctx.closePath();
        ctx.fillStyle = hexToRgba(color, fillAlpha);
        ctx.fill();
      }

      // current pulse dot
      const last = pts[pts.length - 1];
      const dotX = Math.max(4, Math.min(w - 4, last[0]));
      ctx.beginPath();
      ctx.arc(dotX, last[1], 3.2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function animate() {
      if (global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        reveal = 1;
        revealed = true;
        draw();
        return;
      }
      if (!revealed) {
        reveal = Math.min(1, reveal + 0.06);
        if (reveal >= 1) revealed = true;
        draw();
        requestAnimationFrame(animate);
      }
    }

    function push(v) {
      data.push(v);
      if (data.length > maxPoints) data.shift();
      if (!revealed) animate();
      else draw();
    }

    function seed(values) {
      data.length = 0;
      for (let i = 0; i < values.length; i++) data.push(values[i]);
      revealed = false;
      reveal = 0;
      animate();
    }

    function hexToRgba(hex, a) {
      let h = hex.replace("#", "");
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }

    const api = { push, seed, draw, resize };
    return api;
  }

  global.createStreamChart = createStreamChart;
})(window);
