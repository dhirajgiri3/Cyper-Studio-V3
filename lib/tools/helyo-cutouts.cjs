// Builds rough Helyo cutouts (transparent WebP) from the founder's off-white renders.
// Usage: node lib/tools/helyo-cutouts.cjs <A02-refined-hero.png> <A03-existing-emotions.png> <05-gesture-library.png>
// Output: public/helyo/*-rough.webp and public/helyo/manifest.json (sizes + Route Line terminal in image %).
// Rough files are replaced by the real transparent renders listed in docs/home-lab/ASSET_REQUESTS.md.
const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');

const OUT = path.join(__dirname, '../../public/helyo');
const [hero, emotions, gestures] = process.argv.slice(2);

const SLOTS = [
  { name: 'helyo-hero-welcome-rough', src: hero, box: null, width: 1040, floor: 0.775, legs: { ref: 0.70, pad: 0.035, from: 0.69 } },
  { name: 'helyo-problem-concern-rough', src: emotions, box: [0, 395, 418, 355], width: 560 },
  { name: 'helyo-reassure-rough', src: emotions, box: [836, 800, 418, 355], width: 560 },
  { name: 'helyo-celebrate-rough', src: emotions, box: [418, 800, 418, 355], width: 560 },
  { name: 'helyo-delivered-rough', src: emotions, box: [0, 800, 418, 355], width: 560 },
  { name: 'helyo-journey-inspect-rough', src: gestures, box: [0, 500, 512, 405], width: 640 },
  { name: 'helyo-journey-parcel-rough', src: gestures, box: [512, 500, 512, 405], width: 640 },
  { name: 'helyo-journey-guide-rough', src: gestures, box: [1024, 30, 512, 400], width: 640 },
  { name: 'helyo-present-rough', src: gestures, box: [512, 30, 512, 400], width: 640 },
];

const BG = 254;            // measured background level of the renders
const SHADOW = [74, 64, 56]; // warm dark used for the shadow matte

async function cut(slot) {
  let img = sharp(slot.src).removeAlpha();
  if (slot.box) { const [left, top, width, height] = slot.box; img = img.extract({ left, top, width, height }); }
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, N = W * H;
  const lum = new Float32Array(N), warm = new Int16Array(N), mn = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    lum[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b; warm[i] = r - b; mn[i] = Math.min(r, g, b);
  }
  // 1. Flood fill the background from the borders. Above the floor line only near-pure, neutral
  // pixels pass (the ivory highlights are warm: R - B >= 5); on the floor, soft shadows pass too.
  const yFloor = Math.round(H * (slot.floor || 0.8));
  // Optional leg columns: measured on a clean row above the floor; outside them the floor rule starts higher,
  // so the pale floor beside the feet is removed without eating rim light on the legs.
  const legRuns = [];
  let yFloorOut = yFloor;
  if (slot.legs) {
    const y = Math.round(H * slot.legs.ref);
    let start = -1;
    for (let x = 0; x <= W; x++) {
      const body = x < W && !(mn[y * W + x] >= 243 && warm[y * W + x] <= 3);
      if (body && start < 0) start = x;
      if (!body && start >= 0) { if (x - start > W * 0.06) legRuns.push([start, x]); start = -1; }
    }
    yFloorOut = Math.round(H * slot.legs.from);
  }
  // The legs flare towards the feet, so the protected margin grows from 0 at yFloorOut to `pad` at yFloor.
  const onLeg = (x, y) => {
    if (!legRuns.length) return true;
    const t = Math.max(0, Math.min(1, (y - yFloorOut) / Math.max(1, yFloor - yFloorOut)));
    const pad = W * slot.legs.pad * t ** 12;
    return legRuns.some(([a, b]) => x >= a - pad && x <= b + pad);
  };
  const passable = i => {
    if (mn[i] >= 243 && warm[i] <= 3) return true;
    const y = (i / W) | 0, x = i % W;
    if (y < yFloorOut) return false;
    const leg = onLeg(x, y);
    if (y < yFloor && leg) return false;
    return (warm[i] <= 14 && mn[i] >= 190) || mn[i] >= 238 || (!leg && warm[i] <= 8 && mn[i] >= 160);
  };
  const bg = new Uint8Array(N); const stack = [];
  for (let x = 0; x < W; x++) { stack.push(x, (H - 1) * W + x); }
  for (let y = 0; y < H; y++) { stack.push(y * W, y * W + W - 1); }
  // Also seed from unambiguous background anywhere (pure, neutral white), e.g. inside the arch.
  // A seed needs a pure neighbourhood, so specular dots in the eyes are never punched out.
  const pure = i => mn[i] >= 250 && warm[i] <= 2;
  for (let y = 6; y < H - 6; y++) for (let x = 6; x < W - 6; x++) {
    const i = y * W + x;
    if (pure(i) && pure(i - 6) && pure(i + 6) && pure(i - 6 * W) && pure(i + 6 * W) && pure(i - 6 * W - 6) && pure(i + 6 * W + 6)) stack.push(i);
  }
  while (stack.length) {
    const i = stack.pop(); if (bg[i] || !passable(i)) continue; bg[i] = 1;
    const x = i % W, y = (i / W) | 0;
    if (x > 0) stack.push(i - 1); if (x < W - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - W); if (y < H - 1) stack.push(i + W);
  }
  // 1b. Keep only the character (and props): drop body components smaller than 5% of the largest,
  // such as a neighbouring cell's hand caught in a sheet crop.
  const label = new Int32Array(N); const sizes = [0];
  for (let s0 = 0; s0 < N; s0++) {
    if (bg[s0] || label[s0]) continue;
    const id = sizes.length; let n = 0; const q = [s0]; label[s0] = id;
    while (q.length) {
      const i = q.pop(); n++; const x = i % W, y = (i / W) | 0;
      for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) {
        if (j >= 0 && !bg[j] && !label[j]) { label[j] = id; q.push(j); }
      }
    }
    sizes.push(n);
  }
  const biggest = Math.max(...sizes);
  for (let i = 0; i < N; i++) if (!bg[i] && sizes[label[i]] < biggest * 0.05) bg[i] = 1;
  // 2. Body mask, softened by a 3x3 box blur for a 1px feathered edge.
  const body = new Float32Array(N);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let s = 0, c = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
      s += bg[yy * W + xx] ? 0 : 1; c++;
    }
    body[y * W + x] = s / c;
  }
  // 3. Compose RGBA: body keeps its colour; background becomes a shadow matte.
  const out = Buffer.alloc(N * 4);
  const lumS = 0.2126 * SHADOW[0] + 0.7152 * SHADOW[1] + 0.0722 * SHADOW[2];
  // Shadow only on the floor, faded out toward the crop edges so no box edge shows on the page.
  const smooth = (e0, e1, v) => { const t = Math.max(0, Math.min(1, (v - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
  for (let i = 0; i < N; i++) {
    const x = i % W, y = (i / W) | 0;
    const fade = smooth(yFloor - H * 0.06, yFloor + H * 0.02, y) * smooth(0, 0.14, x / W) * smooth(0, 0.14, 1 - x / W) * smooth(0, 0.07, 1 - y / H);
    const aS = Math.max(0, Math.min(1, (BG - 1.5 - lum[i]) / (BG - lumS))) * 0.95 * fade;
    const aB = bg[i] ? body[i] * 0.6 : body[i];
    const a = Math.max(aB, aS);
    const k = a > 0 ? aB / a : 0; // share of body colour in this pixel
    for (let ch = 0; ch < 3; ch++) out[i * 4 + ch] = Math.round(k * data[i * 3 + ch] + (1 - k) * SHADOW[ch]);
    out[i * 4 + 3] = Math.round(a * 255);
  }
  // 4. Trim to content (alpha > 6) with a small margin.
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (out[(y * W + x) * 4 + 3] > 6) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const m = 6; x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(W - 1, x1 + m); y1 = Math.min(H - 1, y1 + m);
  const tw = x1 - x0 + 1, th = y1 - y0 + 1;
  // 5. Route Line terminal: lowest cluster of saturated blue pixels.
  let maxY = -1; const blue = [];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const i = y * W + x, r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    if (b > 180 && r < 100 && g < 100 && b - r > 110) { blue.push([x, y]); if (y > maxY) maxY = y; }
  }
  let terminal = null;
  if (blue.length) {
    const t = blue.filter(p => p[1] > maxY - Math.max(8, H * 0.025));
    const tx = t.reduce((a, p) => a + p[0], 0) / t.length, ty = t.reduce((a, p) => a + p[1], 0) / t.length;
    terminal = { x: +(((tx - x0) / tw) * 100).toFixed(2), y: +(((ty - y0) / th) * 100).toFixed(2) };
  }
  const outW = Math.min(slot.width, tw), outH = Math.round(th * outW / tw);
  await sharp(out, { raw: { width: W, height: H, channels: 4 } })
    .extract({ left: x0, top: y0, width: tw, height: th })
    .resize(outW, outH, { kernel: 'lanczos3' })
    .webp({ quality: 84, alphaQuality: 90, effort: 6 })
    .toFile(path.join(OUT, slot.name + '.webp'));
  const bytes = fs.statSync(path.join(OUT, slot.name + '.webp')).size;
  return { name: slot.name, width: outW, height: outH, terminal, bytes, source: path.basename(slot.src), box: slot.box };
}

(async () => {
  const manifest = {};
  for (const s of SLOTS) { const r = await cut(s); manifest[r.name] = r; console.log(r.name, r.width + 'x' + r.height, r.bytes + 'B', 'terminal', JSON.stringify(r.terminal)); }
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
})();
