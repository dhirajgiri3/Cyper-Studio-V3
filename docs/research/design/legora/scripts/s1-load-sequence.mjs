// legora.com: load-time instrumentation. Observation only (GET of the home page, no clicks, no forms).
// Records (a) Element.animate() calls with keyframes/options, (b) per-frame effective opacity/transform of
// key hero elements from document start, (c) hero <video> events and currentTime, (d) a JPEG frame sequence.
// Usage: node s1-load-sequence.mjs <outDir>
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/');
const { chromium } = require('playwright-core');
const sharp = require('sharp');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

const INIT = () => {
  const R = (window.__rec = { anim: [], frames: [], vid: [], t0: performance.now() });
  const desc = el => el ? (el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : '') + ' "' + (el.textContent || '').trim().slice(0, 24) + '"') : null;
  const an = Element.prototype.animate;
  Element.prototype.animate = function (kf, opts) {
    try {
      if (R.anim.length < 200) R.anim.push({ t: Math.round(performance.now()), target: desc(this), kf: JSON.parse(JSON.stringify(kf)), opts: typeof opts === 'object' ? JSON.parse(JSON.stringify(opts)) : opts });
    } catch {}
    return an.apply(this, arguments);
  };
  const effective = el => {
    let op = 1, tr = null, n = el, d = 0;
    while (n && n !== document.documentElement && d < 8) {
      const s = getComputedStyle(n);
      op *= parseFloat(s.opacity);
      if (!tr && s.transform && s.transform !== 'none') tr = s.transform;
      n = n.parentElement; d++;
    }
    return { op: +op.toFixed(3), tr };
  };
  const textEl = txt => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) if (n.textContent.trim() === txt) return n.parentElement; return null; };
  let last = {};
  const tick = () => {
    const t = Math.round(performance.now());
    if (t > 7000) return;
    if (document.body) {
      const els = {
        announce: textEl('Introducing Skills'),
        h1: document.querySelector('h1'),
        sub: textEl('Collaborative AI for exceptional lawyers'),
        cta: [...document.querySelectorAll('a')].filter(a => (a.textContent || '').trim().startsWith('Book a demo')).slice(-1)[0],
        navProduct: textEl('Product'),
      };
      const cur = {};
      for (const [k, el] of Object.entries(els)) { if (el) cur[k] = effective(el); }
      const key = JSON.stringify(cur);
      if (key !== last.key) { R.frames.push({ t, ...cur }); last.key = key; }
      const v = document.querySelector('video');
      if (v && (t % 4 === 0 || !R.vid.length)) { if (R.vid.length < 400) R.vid.push({ t, ct: +v.currentTime.toFixed(2), paused: v.paused, rs: v.readyState }); }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });

// pass A: instrumented load, no screenshots
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  await page.goto('https://legora.com/', { waitUntil: 'commit' });
  await page.waitForLoadState('load').catch(() => {});
  await sleep(7500);
  const rec = await page.evaluate(() => window.__rec);
  const extra = await page.evaluate(() => {
    const v = document.querySelector('video');
    return { dur: v.duration, vw: v.videoWidth, vh: v.videoHeight, ct: v.currentTime, paused: v.paused, loop: v.loop, preload: v.preload, poster: v.poster, currentSrc: v.currentSrc, objectFit: getComputedStyle(v).objectFit, parentCls: v.parentElement.className };
  });
  fs.writeFileSync(path.join(out, 's1-rec.json'), JSON.stringify({ rec, extra }, null, 1));
  await ctx.close();
}

// pass B: JPEG frame sequence from navigation start
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  const t0 = Date.now();
  const nav = page.goto('https://legora.com/', { waitUntil: 'commit' }).catch(() => {});
  await nav;
  const frames = [];
  let i = 0;
  while (Date.now() - t0 < 9000) {
    const t = Date.now() - t0;
    try {
      const buf = await page.screenshot({ type: 'jpeg', quality: 55, timeout: 3000 });
      frames.push({ t, buf });
    } catch {}
    await sleep(120);
    i++;
  }
  // contact sheet: pick up to 24 frames evenly, 360x225 each, 4 columns
  const pick = [];
  const n = Math.min(24, frames.length);
  for (let k = 0; k < n; k++) pick.push(frames[Math.floor(k * (frames.length - 1) / Math.max(1, n - 1))]);
  const W = 360, H = 225, cols = 4, rows = Math.ceil(pick.length / cols);
  const comps = [];
  for (let k = 0; k < pick.length; k++) {
    const img = await sharp(pick[k].buf).resize(W, H).toBuffer();
    const label = Buffer.from(`<svg width="${W}" height="22" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="22" fill="#000" fill-opacity=".6"/><text x="6" y="16" font-size="14" fill="#fff" font-family="Arial">${pick[k].t} ms</text></svg>`);
    comps.push({ input: img, left: (k % cols) * W, top: Math.floor(k / cols) * H });
    comps.push({ input: label, left: (k % cols) * W, top: Math.floor(k / cols) * H });
  }
  await sharp({ create: { width: W * cols, height: H * rows, channels: 3, background: '#fff' } }).composite(comps).jpeg({ quality: 70 }).toFile(path.join(out, 's1-load-contact.jpg'));
  fs.writeFileSync(path.join(out, 's1-frames-index.json'), JSON.stringify(frames.map(f => f.t)));
  await ctx.close();
}
await browser.close();
console.log('done');
