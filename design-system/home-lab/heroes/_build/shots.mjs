// First-viewport screenshots (1440 x 800 and 390 x 844) and motion frame sequences for each hero. WebP, each under 100 KB.
import { chromium } from '../../tools/node_modules/playwright-core/index.mjs';
import { createRequire } from 'node:module'; const sharp = createRequire(import.meta.url)('../../tools/node_modules/sharp');
import fs from 'node:fs';
const BASE = 'http://127.0.0.1:4174/home-lab/heroes/'; const H = { a: 'hero-a-reskin.html', b: 'hero-b-editorial.html', c: 'hero-c-pair.html', d: 'hero-d-your-name.html' };
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const save = async (buf, name, w, q = 72) => { let img = sharp(buf).resize({ width: w }); const out = `../shots/${name}.webp`; await img.webp({ quality: q, effort: 5 }).toFile(out); const sz = fs.statSync(out).size; if (sz > 100 * 1024) { await sharp(buf).resize({ width: w }).webp({ quality: 50, effort: 6 }).toFile(out); } return fs.statSync(out).size; };
const sizes = {};
// 1. first viewport, both widths
for (const [k, f] of Object.entries(H)) {
  for (const [vn, vp, mob] of [['1440', { width: 1440, height: 800 }, false], ['390', { width: 390, height: 844 }, true]]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mob ? 2 : 1, isMobile: mob, hasTouch: mob, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    await p.goto(BASE + f, { waitUntil: 'load' }); await sleep(900);
    sizes[`hero-${k}-${vn}`] = await save(await p.screenshot(), `hero-${k}-${vn}`, mob ? 390 : 1440);
    await ctx.close();
  }
}
// 2. frame sequences (4 frames side by side)
const strip = async (frames, name, fw) => { const bufs = await Promise.all(frames.map(f => sharp(f).resize({ width: fw }).toBuffer())); const meta = await sharp(bufs[0]).metadata(); const comp = await sharp({ create: { width: fw * bufs.length + 8 * (bufs.length - 1), height: meta.height, channels: 3, background: '#E4E7EC' } }).composite(bufs.map((x, i) => ({ input: x, left: i * (fw + 8), top: 0 }))).png().toBuffer(); sizes[name] = await save(comp, name, fw * bufs.length + 8 * (bufs.length - 1), 66); };
{ // A: the swap sequence, no reduced motion; frames at 0.4, 1.9, 3.1, 4.6 s after load
  const ctx = await b.newContext({ viewport: { width: 1440, height: 800 } }); const p = await ctx.newPage(); await p.goto(BASE + H.a, { waitUntil: 'load' }); const t0 = Date.now(); const fr = [];
  for (const t of [400, 1900, 3100, 4600]) { await sleep(Math.max(0, t - (Date.now() - t0))); fr.push(await p.screenshot({ clip: { x: 0, y: 500, width: 1440, height: 300 } })); }
  await strip(fr, 'seq-hero-a-reskin', 600); await ctx.close(); }
{ // B: scroll-driven rise, scrollY 0, 250, 500, 800
  const ctx = await b.newContext({ viewport: { width: 1440, height: 800 } }); const p = await ctx.newPage(); await p.goto(BASE + H.b, { waitUntil: 'load' }); await sleep(700); const fr = [];
  for (const y of [0, 250, 500, 800]) { await p.evaluate(y => scrollTo(0, y), y); await sleep(500); fr.push(await p.screenshot()); }
  await strip(fr, 'seq-hero-b-scroll', 600); await ctx.close(); }
{ // C: stagger, frames at 0.15, 0.45, 0.75, 1.3 s
  const ctx = await b.newContext({ viewport: { width: 1440, height: 800 } }); const p = await ctx.newPage(); await p.goto(BASE + H.c, { waitUntil: 'commit' }); const t0 = Date.now(); const fr = [];
  for (const t of [150, 450, 750, 1300]) { await sleep(Math.max(0, t - (Date.now() - t0))); fr.push(await p.screenshot({ clip: { x: 640, y: 64, width: 800, height: 736 } })); }
  await strip(fr, 'seq-hero-c-stagger', 400); await ctx.close(); }
{ // D: type a name and pick colour 3
  const ctx = await b.newContext({ viewport: { width: 1440, height: 800 } }); const p = await ctx.newPage(); await p.goto(BASE + H.d, { waitUntil: 'load' }); await sleep(600); const fr = []; const box = { x: 900, y: 64, width: 540, height: 736 };
  fr.push(await p.screenshot({ clip: box })); await p.fill('#nm', 'Bramble Logistics'); await sleep(400); fr.push(await p.screenshot({ clip: box })); await p.click('.dots [data-i="1"]'); await sleep(400); fr.push(await p.screenshot({ clip: box })); await p.click('.dots [data-i="2"]'); await p.fill('#nm', 'Northline Cargo'); await sleep(400); fr.push(await p.screenshot({ clip: box }));
  await strip(fr, 'seq-hero-d-typing', 300); await ctx.close(); }
await b.close(); fs.writeFileSync('../results/shots.json', JSON.stringify(sizes, null, 1)); console.log(Object.entries(sizes).map(([k, v]) => `${k} ${(v / 1024).toFixed(0)}KB`).join('  '));
