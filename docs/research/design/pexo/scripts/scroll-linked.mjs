// Pexo: detect scroll-linked transform/opacity motion in sections below the stepper; native wheel only for positioning (after passing the stepper).
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3000);
for (const y of [1200, 1600, 2080, 2560, 3040, 3300]) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(250); }
const SNAP = () => page.evaluate(() => {
  const m = new Map(); let i = 0;
  document.querySelectorAll('main *').forEach(e => { if (e.closest('.how-to-section-module__Hpxu5a__track')) return; const r = e.getBoundingClientRect(); if (r.width === 0) return; const s = getComputedStyle(e); const k = i++; if (s.transform !== 'none' || parseFloat(s.opacity) < 1 || s.filter !== 'none') m.set(k, { tag: e.tagName + '.' + String(e.className).slice(0, 40), t: s.transform, o: s.opacity, f: s.filter.slice(0, 30), top: Math.round(r.top + scrollY) }); });
  return [...m.values()];
});
const secs = [['social', 4188, 1225], ['more', 5413, 1066], ['gets-it-done', 7255, 1842], ['reviews', 9097, 1483], ['blog', 10580, 954], ['faq', 11534, 575]];
for (const [name, top, h] of secs) {
  const frames = [];
  for (const off of [-700, -400, -100, 200, 500]) { await page.evaluate(v => window.scrollTo(0, v), Math.max(0, top + off)); await sleep(700); frames.push(await SNAP()); }
  // keyed by tag+top: compare transform/opacity across frames
  const idx = new Map(); frames.forEach((fr, fi) => fr.forEach(x => { const k = x.tag + '@' + x.top; if (!idx.has(k)) idx.set(k, []); idx.get(k).push(x.t + '|' + x.o); }));
  const varying = [...idx.entries()].filter(([k, v]) => new Set(v).size > 1 && v.length >= 3);
  const statics = [...idx.entries()].filter(([k, v]) => new Set(v).size === 1).length;
  console.log(name, 'elements with transform/opacity<1/filter:', idx.size, '| static:', statics, '| VARYING with scroll:', varying.length);
  varying.slice(0, 4).forEach(([k, v]) => console.log('   ', k.slice(0, 70), JSON.stringify([...new Set(v)].slice(0, 3)).slice(0, 160)));
}
const inline = await page.evaluate(() => [...document.querySelectorAll('[style]')].filter(e => /transform|opacity|will-change/.test(e.getAttribute('style'))).length);
console.log('elements with inline style transform/opacity/will-change (now):', inline);
await browser.close();
