// Pexo: per-section motion survey (auto-scrollers, sticky, playing videos, WAAPI/CSS animations) + screenshots. Native wheel/scrollTo for positioning only.
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
const tops = await page.evaluate(() => [...document.querySelectorAll('main section')].map(s => ({ top: Math.round(s.getBoundingClientRect().top + scrollY), h: Math.round(s.getBoundingClientRect().height), t: (s.querySelector('h1,h2') || {}).innerText && s.querySelector('h1,h2').innerText.slice(0, 40) })));
console.log(JSON.stringify(tops));
const out = [];
const SNAP = () => page.evaluate(() => {
  const scrollers = [...document.querySelectorAll('*')].filter(e => { const s = getComputedStyle(e); return (s.overflowX === 'auto' || s.overflowX === 'scroll') && e.scrollWidth > e.clientWidth + 10 && e.getBoundingClientRect().height > 0; });
  return {
    anims: document.getAnimations().map(a => (a.animationName || a.transitionProperty || 'wapi') + ':' + (a.effect && a.effect.getTiming ? a.effect.getTiming().duration : '')).slice(0, 8),
    scrollers: scrollers.map(e => ({ cls: (e.className || '').toString().slice(0, 60), sl: Math.round(e.scrollLeft), sw: e.scrollWidth, cw: e.clientWidth, snap: getComputedStyle(e).scrollSnapType })).slice(0, 6),
    sticky: [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'sticky' && e.getBoundingClientRect().height > 0 && e.getBoundingClientRect().bottom > 0 && e.getBoundingClientRect().top < innerHeight).map(e => (e.className || '').toString().slice(0, 50)).slice(0, 4),
    playing: [...document.querySelectorAll('video')].filter(v => !v.paused).length,
    moving: (() => { return null; })(),
  };
});
for (const [i, s] of tops.entries()) {
  if (i === 0 || i === 1) continue;
  await page.evaluate(y => window.scrollTo(0, y), Math.max(0, s.top - 80));
  await sleep(1200);
  const a = await SNAP(); await sleep(2000); const b = await SNAP();
  const moved = a.scrollers.map((x, k) => b.scrollers[k] ? b.scrollers[k].sl - x.sl : null);
  out.push({ i, title: s.t, top: s.top, h: s.h, anims: a.anims, scrollersA: a.scrollers, movedIn2s: moved, sticky: a.sticky, playing: a.playing });
  await page.screenshot({ path: path.join(here, `sec-${String(i).padStart(2, '0')}.png`) });
}
fs.writeFileSync(path.join(here, 'sections-survey.out.json'), JSON.stringify(out, null, 1));
out.forEach(o => console.log(o.i, o.title, '| anims', o.anims.join(','), '| scrollers', JSON.stringify(o.scrollersA.map(s => s.cls.slice(0, 30) + ' ' + s.sl + '/' + s.sw + ' snap=' + s.snap)), '| moved', JSON.stringify(o.movedIn2s), '| sticky', o.sticky.join(','), '| playing', o.playing));
await browser.close();
