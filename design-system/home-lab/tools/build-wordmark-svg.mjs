// Construct the HELIX wordmark as clean vector geometry (lines + circular arcs, no auto-Béziers) from the
// primitives measured in the supplied raster (see wordmark-measurements*.json, fit-windows.mjs output).
//   R0 "faithful":  same alignment and spacing as the supplied artwork (regularised to symmetry in X only).
//   R1 "proposal":  R0 + common cap-line/baseline + equal minimum letter gaps. Needs the founder's agreement.
// Verification: rasterise with rsvg-convert at the original 2500x1000 and diff the alpha channel against the PNG.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const f = n => (Math.round(n * 10) / 10).toString();
const P = (x, y) => `${f(x)} ${f(y)}`;
// SVG arc from p to q about centre c (radius r), minor arc. sweep chosen from rotation direction in y-down space.
const arc = (p, q, c, r) => { const cross = (p[0] - c[0]) * (q[1] - c[1]) - (p[1] - c[1]) * (q[0] - c[0]); return `A${f(r)} ${f(r)} 0 0 ${cross > 0 ? 1 : 0} ${P(q[0], q[1])}`; };

// ---- measured primitives (px in the 2500 x 1000 source) ----
const M = {
  top: 125.0, base: 801.5,
  H: { l: 56.0, stem: 176.7, r: 635.7, barTop: 397.5, barBot: 564.7 },
  E: { l: 682.5, r: 1155.5, rOut: 237.3, armTopBot: 294.6, midTop: 385.2, midBot: 545.75, botArmTop: 634.0, counterX: 855.3, rIn: 65 },
  L: { l: 1203.0, stem: 177.0, footR: 1582.8, footTop: 624.2, rOut: 212.5, rIn: 48.5, top: 118.5 },
  I: { l: 1641.3, r: 1818.9, top: 123.6, base: 801.4 },
  X: { l: 1870.0, r: 2436.9, xc: 2153.4, yc: 463.0, top: 124.5, base: 801.5, innerX: 2042.8, rOuter: 176.4, rInner: 62.0, outerAngle: 46.83, outerPt: [1971.4, 392.6], innerAngle: 48.06, innerPt: [2110.1, 310.9] },
};

function letterH(o = {}) {
  const t = o.top ?? M.top, b = o.base ?? M.base, h = M.H, dx = o.dx ?? 0;
  const x = v => v + dx;
  return `M${P(x(h.l), t)}H${f(x(h.l + h.stem))}V${f(h.barTop)}H${f(x(h.r - h.stem))}V${f(t)}H${f(x(h.r))}V${f(b)}H${f(x(h.r - h.stem))}V${f(h.barBot)}H${f(x(h.l + h.stem))}V${f(b)}H${f(x(h.l))}Z`;
}
function letterE(o = {}) {
  const e = M.E, t = o.top ?? M.top, b = o.base ?? M.base, dx = o.dx ?? 0; const x = v => v + dx;
  const cxo = e.l + e.rOut;                       // centre x of the outer corner arcs
  const ctY = t + e.rOut, cbY = b - e.rOut;       // centre y of top-left / bottom-left outer arcs
  const ciX = e.counterX + e.rIn;                 // counter fillet centre x
  const topCnt = [x(e.counterX), e.armTopBot + e.rIn], botCnt = [x(e.counterX), e.botArmTop - e.rIn];
  let d = `M${P(x(e.r), t)}V${f(e.armTopBot)}H${f(x(ciX))}`;
  d += arc([x(ciX), e.armTopBot], topCnt, [x(ciX), e.armTopBot + e.rIn], e.rIn);
  d += `V${f(e.midTop)}H${f(x(e.r))}V${f(e.midBot)}H${f(x(e.counterX))}V${f(botCnt[1])}`;
  d += arc(botCnt, [x(ciX), e.botArmTop], [x(ciX), e.botArmTop - e.rIn], e.rIn);
  d += `H${f(x(e.r))}V${f(b)}H${f(x(cxo))}`;
  d += arc([x(cxo), b], [x(e.l), cbY], [x(cxo), cbY], e.rOut);
  d += `V${f(ctY)}`;
  d += arc([x(e.l), ctY], [x(cxo), t], [x(cxo), ctY], e.rOut);
  return d + 'Z';
}
function letterL(o = {}) {
  const l = M.L, t = o.top ?? l.top, b = o.base ?? M.base, dx = o.dx ?? 0; const x = v => v + dx;
  const cxo = l.l + l.rOut, cbY = b - l.rOut; const sr = l.l + l.stem;
  const inC = [x(sr + l.rIn), l.footTop - l.rIn];
  let d = `M${P(x(l.l), t)}H${f(x(sr))}V${f(l.footTop - l.rIn)}`;
  d += arc([x(sr), l.footTop - l.rIn], [x(sr + l.rIn), l.footTop], inC, l.rIn);
  d += `H${f(x(l.footR))}V${f(b)}H${f(x(cxo))}`;
  d += arc([x(cxo), b], [x(l.l), cbY], [x(cxo), cbY], l.rOut);
  return d + 'Z';
}
function letterI(o = {}) { const i = M.I, t = o.top ?? i.top, b = o.base ?? i.base, dx = o.dx ?? 0; return `M${P(i.l + dx, t)}H${f(i.r + dx)}V${f(b)}H${f(i.l + dx)}Z`; }
function letterX(o = {}) {
  const X = M.X, t = o.top ?? X.top, b = o.base ?? X.base, dx = o.dx ?? 0;
  const xc = X.xc + dx, yc = X.yc;
  const rad = a => a * Math.PI / 180;
  // outer shoulder (convex): tangent to vertical x=X.l and the outer diagonal through outerPt
  const thO = rad(X.outerAngle), nO = [Math.sin(thO), -Math.cos(thO)], dO = [Math.cos(thO), Math.sin(thO)];
  const rO = X.rOuter, cxO = X.l + rO;
  const cyO = X.outerPt[1] + (((cxO - X.outerPt[0]) * nO[0]) - rO) / (-nO[1]) * 1;   // solve (c-p0).n = r  (n_y negative)
  const cO = [cxO, X.outerPt[1] + ((rO - (cxO - X.outerPt[0]) * nO[0]) / nO[1])];
  const pV = [X.l, cO[1]];                               // tangent point on the vertical
  const pD = [cO[0] - nO[0] * rO, cO[1] - nO[1] * rO];   // tangent point on the diagonal
  // inner shoulder (concave, centre in the notch): tangent to vertical x=innerX and inner diagonal through innerPt
  const thI = rad(X.innerAngle), nI = [Math.sin(thI), -Math.cos(thI)];
  const rI = X.rInner, cxI = X.innerX + rI;
  const cI = [cxI, X.innerPt[1] + ((rI - (cxI - X.innerPt[0]) * nI[0]) / nI[1])];
  const qV = [X.innerX, cI[1]];
  const qD = [cI[0] - nI[0] * rI, cI[1] - nI[1] * rI];
  // apex of the notch on x = xc along the inner diagonal
  const apexY = X.innerPt[1] + (X.xc - X.innerPt[0]) * Math.tan(thI);
  // waist vertex: outer diagonal meets y = yc
  const waistDx = (yc - X.outerPt[1]) / Math.tan(thO); const waistX = X.outerPt[0] + waistDx;
  const mx = p => [2 * xc - (p[0] + dx), p[1]], my = p => [p[0], 2 * yc - p[1]], mxy = p => [2 * xc - (p[0] + dx), 2 * yc - p[1]];
  const sh = p => [p[0] + dx, p[1]];
  const topY = t, botY = b;
  // clockwise from the top-left outer corner
  let d = `M${P(X.l + dx, topY)}H${f(X.innerX + dx)}V${f(qV[1])}`;
  d += arc(sh(qV), sh(qD), sh(cI), rI) + `L${P(xc, apexY)}L${P(...mx(qD))}`;
  d += arc(mx(qD), mx(qV), mx(cI), rI) + `V${f(topY)}H${f(2 * xc - (X.l + dx))}V${f(cO[1])}`;
  d += arc(mx(pV), mx(pD), mx(cO), rO) + `L${P(2 * xc - (waistX + dx), yc)}L${P(...mxy(pD))}`;
  d += arc(mxy(pD), mxy(pV), mxy(cO), rO) + `V${f(botY)}H${f(2 * xc - (X.innerX + dx))}V${f(2 * yc - qV[1])}`;
  d += arc(mxy(qV), mxy(qD), mxy(cI), rI) + `L${P(xc, 2 * yc - apexY)}L${P(...my(sh(qD)))}`;
  d += arc(my(sh(qD)), my(sh(qV)), my(sh(cI)), rI) + `V${f(botY)}H${f(X.l + dx)}V${f(2 * yc - cO[1])}`;
  d += arc(my(sh(pV)), my(sh(pD)), my(sh(cO)), rO) + `L${P(waistX + dx, yc)}L${P(...sh(pD))}`;
  d += arc(sh(pD), sh(pV), sh(cO), rO) + 'Z';
  return d;
}

function build(variant) {
  const R1 = variant === 'R1';
  const o = R1 ? { top: M.top, base: M.base } : {};
  // R1 spacing: all four minimum facing gaps equal the H-E gap measured in the source (46.6)
  const G = 46.6;
  const eL = M.H.r + G;                                  // E left edge
  const dxE = R1 ? eL - M.E.l : 0;
  const lL = M.E.r + dxE + G, dxL = R1 ? lL - M.L.l : 0;
  const iL = M.L.footR + dxL + G, dxI = R1 ? iL - M.I.l : 0;
  const xL = M.I.r + dxI + G, dxX = R1 ? xL - M.X.l : 0;
  const parts = [
    ['H', letterH({ ...o })],
    ['E', letterE({ ...o, dx: dxE })],
    ['L', letterL({ ...o, dx: dxL })],
    ['I', letterI({ ...o, dx: dxI, top: R1 ? M.top : undefined, base: R1 ? M.base : undefined })],
    ['X', letterX({ ...o, dx: dxX, top: R1 ? M.top : undefined, base: R1 ? M.base : undefined })],
  ];
  const right = M.X.r + dxX, x0 = M.H.l, top = R1 ? M.top : M.L.top, bot = M.base + 0.5;
  return { parts, viewBox: [x0, top, +(right - x0).toFixed(1), +(bot - top).toFixed(1)], shifts: { E: dxE, L: dxL, I: dxI, X: dxX } };
}

function svg(b, { title = 'HELIX', fill = '#4161F4', wide = true } = {}) {
  const [x, y, w, h] = b.viewBox;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title><g fill="${fill}">${b.parts.map(([n, d]) => `<path id="${n}" d="${d}"/>`).join('')}</g></svg>\n`;
}

const out = '../brand';
const r0 = build('R0'), r1 = build('R1');
fs.writeFileSync(`${out}/helix-wordmark.faithful.svg`, svg(r0));
fs.writeFileSync(`${out}/helix-wordmark.proposal.svg`, svg(r1));
console.log('R1 shifts', r0.shifts, r1.shifts, 'viewBox R0', r0.viewBox, 'R1', r1.viewBox);

// ---- verification: rasterise R0 at the source geometry and diff against the PNG alpha ----
const full = `<svg xmlns="http://www.w3.org/2000/svg" width="2500" height="1000" viewBox="0 0 2500 1000"><g fill="#000">${r0.parts.map(([, d]) => `<path d="${d}"/>`).join('')}</g></svg>`;
fs.writeFileSync('.cache/r0-full.svg', full);
execFileSync('rsvg-convert', ['-w', '2500', '-h', '1000', '-o', '.cache/r0-full.png', '.cache/r0-full.svg']);
const a = await sharp('.cache/r0-full.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const b = await sharp('../../../assets-inbox/brand/helix-wordmark.original.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let inter = 0, uni = 0, off = 0, offBig = 0, maxRow = 0;
const perLetter = {};
const letters = [[56, 640, 'H'], [680, 1160, 'E'], [1200, 1590, 'L'], [1640, 1820, 'I'], [1865, 2440, 'X']];
for (let y = 0; y < 1000; y++) for (let x = 0; x < 2500; x++) {
  const i = (y * 2500 + x) * 4 + 3; const va = a.data[i] / 255, vb = b.data[i] / 255;
  inter += Math.min(va, vb); uni += Math.max(va, vb); const d = Math.abs(va - vb);
  if (d > 0.5) { offBig++; const L = letters.find(l => x >= l[0] && x <= l[1]); if (L) { perLetter[L[2]] = (perLetter[L[2]] || 0) + 1; } }
}
const rep = { IoU: +(inter / uni).toFixed(5), pixelsOff_gt_half: offBig, perLetterPixelsOff: perLetter, note: 'R0 vs supplied PNG alpha at 2500x1000; pixelsOff counts pixels whose coverage differs by > 0.5 (i.e. >0.5 px edge error)' };
fs.writeFileSync(`${out}/wordmark-fit-report.json`, JSON.stringify(rep, null, 2));
console.log(rep);
