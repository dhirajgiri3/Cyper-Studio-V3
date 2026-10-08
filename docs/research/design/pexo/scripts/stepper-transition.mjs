// Pexo: timing/easing of the stepper's step change. Native wheel input; in-page rAF sampler.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3000);
await page.evaluate(() => window.scrollTo(0, 1400));
await sleep(800);
// describe ancestors of the 2nd video
const desc = await page.evaluate(() => {
  const sec = [...document.querySelectorAll('section')].find(s => s.querySelector('h2') && /How Pexo Delivers/.test(s.querySelector('h2').innerText));
  const vids = [...sec.querySelectorAll('video')];
  const v = vids[1]; const a = []; let e = v;
  for (let i = 0; i < 7 && e && e !== sec; i++, e = e.parentElement) { const s = getComputedStyle(e); a.push({ tag: e.tagName.toLowerCase(), cls: (e.className || '').toString().slice(0, 110), tr: s.transform, trans: s.transitionProperty + ' ' + s.transitionDuration + ' ' + s.transitionTimingFunction, op: s.opacity, w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height), top: s.top, style: (e.getAttribute('style') || '').slice(0, 120) }); }
  const dot = sec.querySelector('button'); const dots = [...sec.querySelectorAll('span')].filter(s => s.className.toString().includes('rounded-full')).slice(0, 6).map(s => ({ cls: s.className.toString().slice(0, 90), tr: getComputedStyle(s).transition.slice(0, 100), w: Math.round(s.getBoundingClientRect().width) }));
  return { a, dots };
});
console.log(JSON.stringify(desc, null, 1));
await page.evaluate(() => {
  const sec = [...document.querySelectorAll('section')].find(s => s.querySelector('h2') && /How Pexo Delivers/.test(s.querySelector('h2').innerText));
  const vids = [...sec.querySelectorAll('video')];
  const btns = [...sec.querySelectorAll('button')];
  const S = window.__st = [];
  const t0 = performance.now();
  const tick = () => { const t = performance.now() - t0; const f = { t: Math.round(t), sy: Math.round(scrollY), v: vids.slice(0, 3).map(v => { const r = v.getBoundingClientRect(); return [Math.round(r.y), Math.round(r.width)]; }), b: btns.map(b => getComputedStyle(b).backgroundColor.slice(-8)) };
    S.push(f); if (t < 4000) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
await page.mouse.move(720, 500);
for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 50); await sleep(80); }
await sleep(3500);
const S = await page.evaluate(() => window.__st);
fs.writeFileSync(path.join(here, 'stepper-transition.out.json'), JSON.stringify(S));
let prev = '';
S.forEach(f => { const k = JSON.stringify([f.v, f.b]); if (k !== prev) { console.log(f.t, f.sy, JSON.stringify(f.v), f.b.join(',')); prev = k; } });
await browser.close();
