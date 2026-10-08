import sharp from 'sharp';
import fs from 'node:fs';
const { data, info } = await sharp('../../../assets-inbox/brand/helix-wordmark.original.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, C = info.channels;
const A = (x, y) => data[(y * W + x) * C + 3];
const L = JSON.parse(fs.readFileSync('../brand/wordmark-measurements.json')).letters;
const names = ['H', 'E', 'L', 'I', 'X'];

// sub-pixel top/bottom edge for one column: scan from the first alpha>0 downwards
function topEdge(x, y0, y1) { for (let y = y0; y <= y1; y++) { if (A(x, y) === 255) { const a = y > 0 ? A(x, y - 1) / 255 : 0; return y - a; } } return null; }
function botEdge(x, y0, y1) { for (let y = y1; y >= y0; y--) { if (A(x, y) === 255) { const a = A(x, y + 1) / 255; return y + 1 + a; } } return null; }
const med = a => { const s = [...a].sort((p, q) => p - q); return s[Math.floor(s.length / 2)]; };

const rep = {};
for (const l of L) {
  const n = names[l.i];
  const tops = [], bots = [];
  for (let x = l.x0; x <= l.x1; x++) { const t = topEdge(x, 100, 400), b = botEdge(x, 600, 830); if (t !== null) tops.push([x, t]); if (b !== null) bots.push([x, b]); }
  // "flat" top = columns whose top edge is within 1.5px of the letter's min top
  const minTop = Math.min(...tops.map(t => t[1]));
  const flatTop = tops.filter(t => t[1] <= minTop + 1.5);
  const maxBot = Math.max(...bots.map(t => t[1]));
  const flatBot = bots.filter(t => t[1] >= maxBot - 1.5);
  rep[n] = { topEdgeMedian: +med(flatTop.map(t => t[1])).toFixed(2), flatTopCols: flatTop.length, flatTopRange: [flatTop[0][0], flatTop[flatTop.length - 1][0]], botEdgeMedian: +med(flatBot.map(t => t[1])).toFixed(2), flatBotCols: flatBot.length };
}
// L top-edge profile: print distinct runs
const lp = []; let prev = null;
for (let x = L[2].x0; x <= L[2].x1; x++) { const t = topEdge(x, 100, 400); if (t === null) continue; const r = Math.round(t * 2) / 2; if (r !== prev) { lp.push([x, +t.toFixed(2)]); prev = r; } }
rep.L_topProfileRuns = lp.slice(0, 14);

// vertical-edge skew: left edge of H left stem & right edge of H right stem & I stem across rows 200..700
function leftEdgeAt(y, x0, x1) { for (let x = x0; x <= x1; x++) if (A(x, y) === 255) return x - A(x - 1, y) / 255; return null; }
function rightEdgeAt(y, x0, x1) { for (let x = x1; x >= x0; x--) if (A(x, y) === 255) return x + 1 + A(x + 1, y) / 255; return null; }
const skew = {};
for (const [n, i, side] of [['H.left', 0, 'L'], ['H.right', 0, 'R'], ['I.left', 3, 'L'], ['I.right', 3, 'R'], ['L.left', 2, 'L']]) {
  const l = L[i]; const ys = [], xs = [];
  for (let y = 200; y <= 700; y += 10) { const e = side === 'L' ? leftEdgeAt(y, l.x0 - 3, l.x1 + 3) : rightEdgeAt(y, l.x0 - 3, l.x1 + 3); if (e !== null) { ys.push(y); xs.push(e); } }
  skew[n] = { x_at_y200: +xs[0].toFixed(2), x_at_y700: +xs[xs.length - 1].toFixed(2), drift_px_over_500: +(xs[xs.length - 1] - xs[0]).toFixed(2) };
}
rep.verticalEdgeDrift = skew;

// stem widths (measured on a clear stem row)
const run = (y, x0, x1) => { const out = []; let s = null; for (let x = x0; x <= x1 + 1; x++) { const on = x <= x1 && A(x, y) >= 128; if (on && s === null) s = x; if (!on && s !== null) { out.push([s, x - 1, x - s]); s = null; } } return out; };
rep.rowRuns_y160 = { H: run(160, L[0].x0, L[0].x1), I: run(160, L[3].x0, L[3].x1), L: run(160, L[2].x0, L[2].x1) };
rep.rowRuns_y450 = { H: run(450, L[0].x0, L[0].x1), E: run(450, L[1].x0, L[1].x1) };

// optical gaps: per-row facing distance, capped at (min facing distance + D)
function profile(i, side) { const l = L[i]; const out = {}; for (let y = 140; y <= 780; y++) { out[y] = side === 'R' ? rightEdgeAt(y, l.x0 - 2, l.x1 + 2) : leftEdgeAt(y, l.x0 - 2, l.x1 + 2); } return out; }
const gaps = [];
for (let i = 0; i < 4; i++) {
  const R = profile(i, 'R'), Lp = profile(i + 1, 'L');
  const raw = []; for (let y = 140; y <= 780; y++) if (R[y] !== null && Lp[y] !== null) raw.push(Lp[y] - R[y]);
  const mn = Math.min(...raw);
  const row = { pair: names[i] + names[i + 1], minGap: +mn.toFixed(1), meanRawGap: +(raw.reduce((a, b) => a + b, 0) / raw.length).toFixed(1) };
  for (const D of [30, 60, 100]) { const c = raw.map(g => Math.min(g, mn + D)); row['meanGap_cap' + D] = +(c.reduce((a, b) => a + b, 0) / c.length).toFixed(1); }
  gaps.push(row);
}
rep.opticalGaps = gaps;
fs.writeFileSync('../brand/wordmark-measurements-subpixel.json', JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep, null, 1));
