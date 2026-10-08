// clay.com observation script 5: use-case tab autoplay switch (rAF-level poll) and logo-wall changes over time. Observation only.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('../../../../../design-system/home-lab/tools/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2] || 'clay-s5.json';
const shots = process.argv[3] || '.';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://www.clay.com/', { waitUntil: 'load', timeout: 60000 }).catch(() => {});
await sleep(3500);
const res = {};
// logo wall: 4 clips over 9 s
await page.evaluate(() => window.scrollTo(0, 700)); await sleep(1500);
for (let i = 0; i < 4; i++) { await page.screenshot({ path: `${shots}/wall-${i}.jpg`, type: 'jpeg', quality: 55, clip: { x: 60, y: 120, width: 1320, height: 560 } }); await sleep(2500); }
// wall: which cards change width/content over time (compare card rect lists)
const cardSnap = () => page.evaluate(() => [...document.querySelectorAll('.logo-card')].filter(c => { const r = c.getBoundingClientRect(); return r.right > 0 && r.left < innerWidth; }).map(c => { const r = c.getBoundingClientRect(); return `${Math.round(r.left)}:${Math.round(r.width)}x${Math.round(r.height)}`; }));
const w1 = await cardSnap(); await sleep(3000); const w2 = await cardSnap();
res.wallCards = { t0: w1.length, t3: w2.length, widthsChangedSamples: w1.map((s, i) => [s, w2[i]]).filter(([a, b]) => a && b && a.split(':')[1] !== b.split(':')[1]).slice(0, 6) };
// autoplay switch
await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /GTM engineers/.test(h.innerText)); h && window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 100); }); await sleep(1500);
res.autoplay = await page.evaluate(async () => {
  const vis = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.top > -50 && r.top < innerHeight; };
  const tabs = [...document.querySelectorAll('.tab-btn')].filter(vis);
  const bkgs = [...document.querySelectorAll('.home-flow_tab-bkg')];
  const imgs = [...document.images].filter(i => /case-\d+/.test(i.src) && i.getBoundingClientRect().width > 500);
  const sig = () => JSON.stringify({ t: tabs.map(b => getComputedStyle(b).backgroundColor), k: bkgs.map(b => +(+getComputedStyle(b).opacity).toFixed(2) + '|' + getComputedStyle(b).transform.replace('matrix', 'm').replace(/ /g, '').slice(0, 24)), i: imgs.map(i => +(+getComputedStyle(i).opacity).toFixed(2) + '|' + getComputedStyle(i).transform.replace('matrix', 'm').replace(/ /g, '').slice(0, 24)) });
  const log = []; const t0 = performance.now(); let prev = ''; const names = tabs.map(b => b.textContent.trim().slice(0, 14));
  await new Promise(res => { const f = () => { const t = performance.now() - t0; const s = sig(); if (s !== prev) { const o = JSON.parse(s); log.push({ t: Math.round(t), activeTabs: o.t.map((c, i) => c !== 'rgb(244, 243, 240)' ? names[i] + c.replace('rgb', '') : null).filter(Boolean), bkgVisible: o.k.filter(x => !x.startsWith('0|') || x.length).slice(0, 8), imgsMoving: o.i.filter(x => x !== '0|m(1,0,0,1,0,24)' && x !== '1|' && x !== '1|none').slice(0, 6) }); prev = s; } if (t < 9000) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
  return { tabsVisible: names, nLog: log.length, log: log.slice(0, 60) };
});
res.tabTransition = await page.evaluate(() => { const b = document.querySelector('.tab-btn'); const s = getComputedStyle(b); return { transition: s.transition, cursor: s.cursor }; });
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log('written', out);
await browser.close();
