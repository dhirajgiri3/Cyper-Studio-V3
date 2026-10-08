// Fit the supplied HELIX wordmark raster with lines and circular arcs only (no auto-Béziers).
// 1) sub-pixel contour by marching squares at alpha = 0.5   2) greedy line/arc segmentation
// 3) snap near-axis lines to H/V   4) emit SVG path data   5) report fit quality against the raster.
// Output: ../brand/wordmark-fit.json  (segments per letter). SVG assembly is done in build-wordmark-svg.mjs.
import sharp from 'sharp';
import fs from 'node:fs';

const SRC = '../../../assets-inbox/brand/helix-wordmark.original.png';
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, C = info.channels;
const v = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? 0 : data[(y * W + x) * C + 3] / 255;
const T = 0.5;

// ---- marching squares -> loops ----
const segs = [];
const pt = (kind, x, y) => {
  // interpolated crossing on a cell edge; coordinates are in pixel-edge space (pixel centre = +0.5)
  if (kind === 'h') { const a = v(x, y), b = v(x + 1, y); const t = (T - a) / (b - a); return { id: `h${x},${y}`, x: x + 0.5 + t, y: y + 0.5 }; }
  const a = v(x, y), b = v(x, y + 1); const t = (T - a) / (b - a); return { id: `v${x},${y}`, x: x + 0.5, y: y + 0.5 + t };
};
for (let y = -1; y < H; y++) for (let x = -1; x < W; x++) {
  const tl = v(x, y) >= T, tr = v(x + 1, y) >= T, br = v(x + 1, y + 1) >= T, bl = v(x, y + 1) >= T;
  const code = (tl ? 8 : 0) | (tr ? 4 : 0) | (br ? 2 : 0) | (bl ? 1 : 0);
  if (code === 0 || code === 15) continue;
  const top = () => pt('h', x, y), bottom = () => pt('h', x, y + 1), left = () => pt('v', x, y), right = () => pt('v', x + 1, y);
  const add = (p, q) => segs.push([p, q]);
  switch (code) {
    case 1: case 14: add(left(), bottom()); break;
    case 2: case 13: add(bottom(), right()); break;
    case 3: case 12: add(left(), right()); break;
    case 4: case 11: add(top(), right()); break;
    case 6: case 9: add(top(), bottom()); break;
    case 7: case 8: add(left(), top()); break;
    case 5: case 10: { const c = (v(x, y) + v(x + 1, y) + v(x + 1, y + 1) + v(x, y + 1)) / 4 >= T; if ((code === 5) === c) { add(left(), top()); add(bottom(), right()); } else { add(left(), bottom()); add(top(), right()); } break; }
  }
}
const adj = new Map();
for (const [p, q] of segs) { for (const [a, b] of [[p, q], [q, p]]) { if (!adj.has(a.id)) adj.set(a.id, { p: a, n: [] }); adj.get(a.id).n.push(b); } }
const used = new Set(); const loops = [];
for (const [id, node] of adj) {
  if (used.has(id)) continue;
  const loop = []; let cur = node.p, prev = null; let guard = 0;
  while (guard++ < 200000) {
    used.add(cur.id); loop.push(cur);
    const nb = adj.get(cur.id).n.find(n => n.id !== (prev && prev.id) && !used.has(n.id));
    if (!nb) break; prev = cur; cur = nb;
  }
  if (loop.length > 200) loops.push(loop);
}
const area = L => { let s = 0; for (let i = 0; i < L.length; i++) { const a = L[i], b = L[(i + 1) % L.length]; s += a.x * b.y - b.x * a.y; } return Math.abs(s / 2); };
const big = loops.filter(l => area(l) > 5000).sort((a, b) => a[0].x - b[0].x);
fs.mkdirSync('.cache',{recursive:true}); fs.writeFileSync('.cache/loops.json', JSON.stringify(big.map(l=>l.map(p=>[+p.x.toFixed(3),+p.y.toFixed(3)]))));
console.log('loops >5000px²:', big.length, big.map(l => Math.round(area(l))));

// ---- fitting ----
const dist2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
function fitLine(P, i, j) { // points i..j inclusive (mod n); returns {err, p, q}
  const n = P.length; const pts = []; for (let k = i; k <= j; k++) pts.push(P[k % n]);
  // endpoints line (chord) max deviation: robust and exact for straight edges
  const a = pts[0], b = pts[pts.length - 1]; const dx = b.x - a.x, dy = b.y - a.y; const len = Math.hypot(dx, dy) || 1e-9;
  let err = 0; for (const p of pts) err = Math.max(err, Math.abs((p.x - a.x) * dy - (p.y - a.y) * dx) / len);
  return { err, len };
}
function fitCircle(P, i, j) {
  const n = P.length; const pts = []; for (let k = i; k <= j; k++) pts.push(P[k % n]);
  if (pts.length < 8) return null;
  // Kåsa algebraic fit
  let sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0, sxz = 0, syz = 0, sz = 0; const m = pts.length;
  for (const p of pts) { const z = p.x * p.x + p.y * p.y; sx += p.x; sy += p.y; sxx += p.x * p.x; syy += p.y * p.y; sxy += p.x * p.y; sxz += p.x * z; syz += p.y * z; sz += z; }
  const A = [[sxx, sxy, sx], [sxy, syy, sy], [sx, sy, m]], B = [sxz, syz, sz];
  const det = M => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const d = det(A); if (Math.abs(d) < 1e-9) return null;
  const rep = c => A.map((row, r) => row.map((val, k) => (k === c ? B[r] : val)));
  const ca = det(rep(0)) / d / 2, cb = det(rep(1)) / d / 2, cc = det(rep(2)) / d;
  const cx = ca, cy = cb, r = Math.sqrt(Math.max(0, cc + cx * cx + cy * cy));
  if (!isFinite(r) || r < 6 || r > 3000) return null;
  let err = 0; for (const p of pts) err = Math.max(err, Math.abs(Math.hypot(p.x - cx, p.y - cy) - r));
  // sweep angle
  const a0 = Math.atan2(pts[0].y - cy, pts[0].x - cx), a1 = Math.atan2(pts[m - 1].y - cy, pts[m - 1].x - cx), am = Math.atan2(pts[m >> 1].y - cy, pts[m >> 1].x - cx);
  const norm = a => { while (a < 0) a += 2 * Math.PI; while (a >= 2 * Math.PI) a -= 2 * Math.PI; return a; };
  const ccw = norm(am - a0) < norm(a1 - a0); // is the path going counter-clockwise (in math coords with y down => visual clockwise flips)
  const sweep = ccw ? norm(a1 - a0) : norm(a0 - a1);
  return { err, cx, cy, r, sweep, ccw };
}
const TOL_LINE = 0.55, TOL_ARC = 0.6;
function segment(P) {
  const n = P.length;
  // start at the point of greatest turning (a corner) to avoid starting mid-segment
  const turn = k => { const a = P[(k - 6 + n) % n], b = P[k], c = P[(k + 6) % n]; const v1 = [b.x - a.x, b.y - a.y], v2 = [c.x - b.x, c.y - b.y]; return Math.abs(Math.atan2(v1[0] * v2[1] - v1[1] * v2[0], v1[0] * v2[0] + v1[1] * v2[1])); };
  let s = 0, best = -1; for (let k = 0; k < n; k++) { const t = turn(k); if (t > best) { best = t; s = k; } }
  const out = []; let i = s; let steps = 0;
  while (steps < n) {
    // longest line
    let lo = i + 3, hi = i + (n - steps) - 1, bestJ = i + 3;
    // grow by doubling then bisect (line error is monotone enough for this data)
    let step = 8, j = i + 3; while (j + step <= i + (n - steps) - 1 && fitLine(P, i, j + step).err <= TOL_LINE) { j += step; step *= 2; }
    for (let sz = step; sz >= 1; sz = Math.floor(sz / 2)) { while (j + sz <= i + (n - steps) - 1 && fitLine(P, i, j + sz).err <= TOL_LINE) j += sz; if (sz === 1) break; }
    const lineJ = j; const lineLen = fitLine(P, i, lineJ).len;
    // longest arc
    let arc = null, arcJ = i;
    { let jj = i + 12, stp = 16; let ok = fitCircle(P, i, jj); if (ok && ok.err <= TOL_ARC) { arcJ = jj; arc = ok; while (jj + stp <= i + (n - steps) - 1) { const t = fitCircle(P, i, jj + stp); if (t && t.err <= TOL_ARC && t.sweep < Math.PI * 0.98) { jj += stp; arcJ = jj; arc = t; stp *= 2; } else if (stp > 1) stp = Math.floor(stp / 2); else break; } } }
    const arcLen = arc ? arc.r * arc.sweep : 0;
    if (arc && arcLen > lineLen * 1.15 && arc.r < 2000 && arcJ - i > lineJ - i) { out.push({ type: 'A', from: P[i % n], to: P[arcJ % n], r: arc.r, cx: arc.cx, cy: arc.cy, ccw: arc.ccw, sweep: arc.sweep, err: arc.err, pts: arcJ - i }); steps += arcJ - i; i = arcJ; }
    else { out.push({ type: 'L', from: P[i % n], to: P[lineJ % n], err: fitLine(P, i, lineJ).err, pts: lineJ - i }); steps += lineJ - i; i = lineJ; }
    if (steps >= n - 2) break;
  }
  return out;
}
const names = ['H', 'E', 'L', 'I', 'X'];
const result = {};
big.forEach((loop, idx) => {
  const segsF = segment(loop);
  result[names[idx]] = segsF.map(s => s.type === 'L' ? { t: 'L', x0: +s.from.x.toFixed(2), y0: +s.from.y.toFixed(2), x1: +s.to.x.toFixed(2), y1: +s.to.y.toFixed(2), err: +s.err.toFixed(2) } : { t: 'A', x0: +s.from.x.toFixed(2), y0: +s.from.y.toFixed(2), x1: +s.to.x.toFixed(2), y1: +s.to.y.toFixed(2), r: +s.r.toFixed(1), cx: +s.cx.toFixed(1), cy: +s.cy.toFixed(1), ccw: s.ccw, sweepDeg: +(s.sweep * 180 / Math.PI).toFixed(1), err: +s.err.toFixed(2) });
});
fs.writeFileSync('../brand/wordmark-fit.json', JSON.stringify(result, null, 1));
for (const k of Object.keys(result)) { console.log(`--- ${k}: ${result[k].length} segments`); for (const s of result[k]) console.log(s.t === 'L' ? `  L (${s.x0},${s.y0}) -> (${s.x1},${s.y1})  err ${s.err}` : `  A (${s.x0},${s.y0}) -> (${s.x1},${s.y1}) r=${s.r} c=(${s.cx},${s.cy}) sweep=${s.sweepDeg}° err ${s.err}`); }
