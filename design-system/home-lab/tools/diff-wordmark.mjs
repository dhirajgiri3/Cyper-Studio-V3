import sharp from 'sharp';
const [mine, orig, out] = process.argv.slice(2);
const a = await sharp(mine).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const b = await sharp(orig).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = 2500, H = 1000; const buf = Buffer.alloc(W * H * 3, 255);
for (let i = 0; i < W * H; i++) { const va = a.data[i * 4 + 3], vb = b.data[i * 4 + 3]; const d = va - vb;
  // grey where both agree & ink; red = mine only; blue = original only
  let r = 255, g = 255, bl = 255;
  if (Math.min(va, vb) > 200) { r = g = bl = 200; }
  if (d > 90) { r = 230; g = 40; bl = 40; } else if (d < -90) { r = 30; g = 80; bl = 240; }
  buf[i * 3] = r; buf[i * 3 + 1] = g; buf[i * 3 + 2] = bl; }
await sharp(buf, { raw: { width: W, height: H, channels: 3 } }).resize(1500).png().toFile(out);
