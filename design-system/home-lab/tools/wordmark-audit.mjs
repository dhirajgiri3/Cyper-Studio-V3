// Pixel measurement of the supplied HELIX wordmark raster. Reads only; writes JSON.
import sharp from 'sharp';
import fs from 'node:fs';
const src = '../../../assets-inbox/brand/helix-wordmark.original.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const A = (x, y) => data[(y * W + x) * C + 3];
const px = (x, y) => [data[(y * W + x) * C], data[(y * W + x) * C + 1], data[(y * W + x) * C + 2], data[(y * W + x) * C + 3]];

// 1. colour census of fully-opaque pixels
const census = new Map();
let opaque = 0, partial = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const [r, g, b, a] = px(x, y);
  if (a === 255) { opaque++; const k = `${r},${g},${b}`; census.set(k, (census.get(k) || 0) + 1); }
  else if (a > 0) partial++;
}
const top = [...census.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

// 2. overall ink bbox + column projection (alpha >= 128)
const T = 128;
const colInk = new Array(W).fill(0);
for (let x = 0; x < W; x++) for (let y = 0; y < H; y++) if (A(x, y) >= T) colInk[x]++;
let minX = W, maxX = -1;
for (let x = 0; x < W; x++) if (colInk[x] > 0) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
// letter segments = runs of columns with ink; gaps = runs without
const segs = [];
let s = null;
for (let x = minX; x <= maxX + 1; x++) {
  const on = x <= maxX && colInk[x] > 0;
  if (on && s === null) s = x;
  if (!on && s !== null) { segs.push([s, x - 1]); s = null; }
}
// 3. per-segment vertical extents
const letters = segs.map(([x0, x1], i) => {
  let y0 = H, y1 = -1;
  for (let x = x0; x <= x1; x++) for (let y = 0; y < H; y++) if (A(x, y) >= T) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  return { i, x0, x1, w: x1 - x0 + 1, y0, y1, h: y1 - y0 + 1 };
});
const gaps = letters.slice(1).map((l, i) => ({ between: `${i}-${i + 1}`, gap: l.x0 - letters[i].x1 - 1 }));
// 4. top/bottom of the stem columns (to see whether letters share a cap-height / baseline)
const out = { file: src, size: { W, H }, opaquePx: opaque, partialAlphaPx: partial, topColours: top, inkBBox: { minX, maxX, w: maxX - minX + 1 }, letters, gaps };
fs.writeFileSync('../brand/wordmark-measurements.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
