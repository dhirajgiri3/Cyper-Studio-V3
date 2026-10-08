// Pexo: hero motion sampler. In-page rAF sampler starts before first paint; no clicks, no input.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const reduced = process.argv.includes('--reduced');
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', reducedMotion: reduced ? 'reduce' : 'no-preference' });
await ctx.addInitScript(() => {
  const S = window.__s = { frames: [], t0: performance.now(), ph: [] };
  let last = -1;
  const tick = () => {
    const t = performance.now() - S.t0;
    if (t - last >= 50) {
      last = t;
      const q = sel => document.querySelector(sel);
      const cs = el => el ? getComputedStyle(el) : null;
      const h1 = q('h1');
      const f = { t: Math.round(t) };
      if (h1) {
        const chain = []; let e = h1; for (let i = 0; i < 4 && e; i++, e = e.parentElement) { const s = cs(e); chain.push(s.opacity + '|' + s.transform + '|' + s.filter); }
        f.h1 = chain.join(' ; ');
        const sub = h1.nextElementSibling; if (sub) { const s = cs(sub); f.sub = s.opacity + '|' + s.transform; }
        const box = document.querySelector('textarea'); if (box) { const p = box.parentElement; const s = cs(p); f.box = s.opacity + '|' + s.transform; const pp = p.parentElement; const s2 = cs(pp); f.boxP = s2.opacity + '|' + s2.transform; }
        const sc = document.querySelector('.scrollbar-hide.overflow-x-auto'); if (sc) { f.sl = +sc.scrollLeft.toFixed(2); const s = cs(sc.parentElement); f.scp = s.opacity + '|' + s.transform; const c0 = sc.querySelector('button'); if (c0) { const s0 = cs(c0); f.c0 = s0.opacity + '|' + s0.transform; } }
        const hd = document.querySelector('header'); if (hd) f.hd = cs(hd).opacity + '|' + cs(hd).transform + '|' + cs(hd).backgroundColor;
        const g = document.querySelector('span[class*="from-[#c641ff]"]'); if (g) { f.ph = g.textContent; f.phOp = cs(g).opacity; const pr = g.parentElement; f.phFull = pr.textContent.slice(0, 80); f.phPar = cs(pr).opacity + '|' + cs(pr).transform; }
        f.anims = document.getAnimations().length;
      }
      S.frames.push(f);
    }
    if (t < 20000) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'commit', timeout: 60000 });
await sleep(21000);
const frames = await page.evaluate(() => window.__s.frames);
fs.writeFileSync(path.join(here, reduced ? 'hero-motion.reduced.out.json' : 'hero-motion.out.json'), JSON.stringify(frames));
console.log('frames', frames.length);
await browser.close();
