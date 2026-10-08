"use client";

import { useEffect, useRef } from "react";

/*
 * The Route Line: one SVG path that leaves Helyo's inlay terminal in the hero and runs down the page.
 * Its shape is designed in CSS: anchors are DOM elements inside the route root, in document order:
 *   data-route="start"  Helyo figure; the point is the inlay terminal (data-tx / data-ty, % of the image box)
 *   data-route="via"    an invisible point that shapes the path
 *   data-route="stop"   a visible waypoint; gets data-on="true" once the line has reached it
 *   data-route="gap"    the line lifts here and continues at the next anchor (used on small screens)
 * Anchors that are not rendered (display: none) are skipped, so each breakpoint can have its own route.
 * Elements with data-lit are switched to data-lit="on" as the pen passes them.
 * No JS: the static stub under Helyo and the always-on waypoints stand in. Reduced motion: fully drawn.
 */

const SAMPLE_STEP = 6; // px of path length between lookup samples

// Layout position inside the root. Ancestors' transforms are ignored (entrance animations must not bend
// the route); the anchor's own translate is kept, so an anchor centred with transform still lands true.
function boxIn(el, root) {
  let x = 0;
  let y = 0;
  let n = el;
  while (n && n !== root) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent;
  }
  if (n !== root) {
    const r = root.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    return { x: b.left - r.left, y: b.top - r.top, w: b.width, h: b.height };
  }
  const t = getComputedStyle(el).transform;
  if (t && t !== "none") {
    const m = new DOMMatrixReadOnly(t);
    x += m.m41;
    y += m.m42;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

function pointOf(el, root) {
  if (el.dataset.route === "start") {
    const img = el.querySelector("img") || el;
    const b = boxIn(img, root);
    return { x: b.x + (b.w * parseFloat(el.dataset.tx)) / 100, y: b.y + (b.h * parseFloat(el.dataset.ty)) / 100 };
  }
  const b = boxIn(el, root);
  return { x: b.x + b.w / 2, y: b.y + b.h / 2 };
}

function buildPath(points) {
  let d = "";
  let prev = null;
  for (const p of points) {
    if (p.gap) { prev = null; continue; }
    if (!prev) { d += `M${p.x.toFixed(1)} ${p.y.toFixed(1)}`; prev = p; continue; }
    const dy = p.y - prev.y;
    const k = Math.max(24, dy * 0.5);
    d += `C${prev.x.toFixed(1)} ${(prev.y + k).toFixed(1)} ${p.x.toFixed(1)} ${(p.y - k).toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    prev = p;
  }
  return d;
}

export default function RouteLine() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const ghostRef = useRef(null);
  const penRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const ghost = ghostRef.current;
    const pen = penRef.current;
    const root = svg?.parentElement;
    if (!svg || !path || !root) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let samples = []; // [{l, x, y}]
    let total = 0;
    let stops = []; // [{el, l}]
    let lit = []; // [{el, y}]
    let startY = 0;
    let frame = 0;
    let visible = true;
    let lastLen = -1;

    function layout() {
      const anchors = [...root.querySelectorAll("[data-route]")].filter((el) => el.getClientRects().length > 0);
      const pts = anchors.map((el) => (el.dataset.route === "gap" ? { gap: true, el } : { ...pointOf(el, root), el }));
      const w = root.scrollWidth;
      const h = root.scrollHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      const d = buildPath(pts);
      path.setAttribute("d", d);
      ghost.setAttribute("d", d);
      total = d ? path.getTotalLength() : 0;
      samples = [];
      for (let l = 0; l <= total; l += SAMPLE_STEP) {
        const p = path.getPointAtLength(l);
        samples.push({ l, x: p.x, y: p.y });
      }
      if (total) { const p = path.getPointAtLength(total); samples.push({ l: total, x: p.x, y: p.y }); }
      const first = pts.find((p) => !p.gap);
      startY = first ? first.y : 0;
      stops = pts
        .filter((p) => !p.gap && p.el.dataset.route === "stop")
        .map((p) => {
          let best = samples[0];
          for (const s of samples) if (Math.hypot(s.x - p.x, s.y - p.y) < Math.hypot(best.x - p.x, best.y - p.y)) best = s;
          return { el: p.el, l: best ? best.l : 0 };
        });
      lit = [...root.querySelectorAll("[data-lit]")].map((el) => {
        const b = boxIn(el, root);
        return { el, y: b.y + b.h / 2 };
      });
      lastLen = -1;
      update();
    }

    function lengthAtY(y) {
      // Path y grows along the route; find the first sample at or below y.
      let lo = 0;
      let hi = samples.length - 1;
      if (!samples.length) return 0;
      if (y <= samples[0].y) return 0;
      if (y >= samples[hi].y) return total;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].y < y) lo = mid + 1; else hi = mid;
      }
      return samples[lo].l;
    }

    function update() {
      frame = 0;
      if (!total) return;
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const vh = window.innerHeight;
      const full = reduce.matches;
      const penY = Math.max(window.scrollY - rootTop + vh * 0.78, startY + Math.min(150, vh * 0.18));
      const len = full ? total : lengthAtY(penY);
      if (len === lastLen) return;
      lastLen = len;
      svg.style.setProperty("--route-p", (len / total).toFixed(5));
      if (pen) {
        const s = samples[Math.min(samples.length - 1, Math.round(len / SAMPLE_STEP))];
        const hide = full || len <= 0 || len >= total;
        pen.style.opacity = hide ? "0" : "1";
        if (s) pen.setAttribute("transform", `translate(${s.x.toFixed(1)} ${s.y.toFixed(1)})`);
      }
      for (const s of stops) s.el.dataset.on = len >= s.l - 2 ? "true" : "false";
      for (const w of lit) w.el.dataset.lit = full || penY >= w.y ? "on" : "off";
    }

    function schedule() {
      if (!frame && visible) frame = requestAnimationFrame(update);
    }

    let relayoutFrame = 0;
    function scheduleLayout() {
      cancelAnimationFrame(relayoutFrame);
      relayoutFrame = requestAnimationFrame(layout);
    }

    svg.classList.add("is-intro");
    const introTimer = setTimeout(() => svg.classList.remove("is-intro"), 2000);
    layout();

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) schedule();
    });
    io.observe(root);
    const ro = new ResizeObserver(scheduleLayout);
    ro.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleLayout);
    reduce.addEventListener("change", scheduleLayout);
    document.fonts?.ready.then(scheduleLayout);

    return () => {
      clearTimeout(introTimer);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(relayoutFrame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", scheduleLayout);
      reduce.removeEventListener("change", scheduleLayout);
    };
  }, []);

  return (
    <svg ref={svgRef} className="route" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path ref={ghostRef} className="route__ghost" />
      <path ref={pathRef} className="route__path" pathLength="1" />
      <circle ref={penRef} className="route__pen" r="5" style={{ opacity: 0 }} />
    </svg>
  );
}
