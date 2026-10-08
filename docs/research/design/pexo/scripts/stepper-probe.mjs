// Pexo: "How Pexo Delivers A Full Video" stepper: structure + scroll-linked behaviour sampled with native wheel input.
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
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3000);
const STATE = () => page.evaluate(() => {
  const sec = [...document.querySelectorAll('section')].find(s => s.querySelector('h2') && /How Pexo Delivers/.test(s.querySelector('h2').innerText));
  const panel = [...sec.querySelectorAll('div')].find(d => getComputedStyle(d).backgroundColor === 'rgb(0, 0, 0)' && d.getBoundingClientRect().width > 1000);
  const steps = [...sec.querySelectorAll('button')];
  const r = e => { const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const vids = [...sec.querySelectorAll('video')];
  const st = steps.map(h => { const s = getComputedStyle(h); return { t: h.innerText.slice(0, 14).replace(/\n/g,' '), bg: s.backgroundColor, color: s.color, op: s.opacity, tx: s.transform, y: Math.round(h.getBoundingClientRect().y) }; });
  const stickyEls = [...sec.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'sticky').map(e => ({ cls: (e.className || '').toString().slice(0, 70), top: getComputedStyle(e).top, y: Math.round(e.getBoundingClientRect().y) }));
  return {
    scrollY: Math.round(scrollY), panel: panel ? r(panel) : null, steps: st,
    vids: vids.map(v => ({ y: Math.round(v.getBoundingClientRect().y), paused: v.paused, rs: v.readyState, t: +v.currentTime.toFixed(1), tr: getComputedStyle(v.parentElement).transform, op: getComputedStyle(v.parentElement).opacity })),
    stickyEls,
  };
});
const shots = [];
const frames = [];
await page.evaluate(() => window.scrollTo(0, 0));
for (let y = 0; y <= 3000; y += 150) {
  await page.evaluate(v => window.scrollTo(0, v), y); // programmatic positions only to sample state
  await sleep(500);
  const s = await STATE();
  frames.push(s);
  if ([900, 1500, 2100, 2700].includes(y)) await page.screenshot({ path: path.join(here, `stepper-${reduced ? 'rm-' : ''}${y}.png`) });
}
// structure
const struct = await page.evaluate(() => {
  const sec = [...document.querySelectorAll('section')].find(s => s.querySelector('h2') && /How Pexo Delivers/.test(s.querySelector('h2').innerText));
  const h3 = sec.querySelector('button'); const chain = []; let e = h3; for (let i = 0; i < 6 && e && e !== sec; i++, e = e.parentElement) { const s = getComputedStyle(e); chain.push({ tag: e.tagName.toLowerCase(), cls: (e.className || '').toString().slice(0, 140), display: s.display, pos: s.position, tr: s.transition.slice(0, 110), bg: s.backgroundColor, w: Math.round(e.getBoundingClientRect().width), role: e.getAttribute('role'), aria: e.getAttribute('aria-selected') || e.getAttribute('aria-current') }); }
  const ps = sec.querySelectorAll('[aria-selected],[aria-current],[role=tab],[role=tablist]').length;
  return { chain, ariaCount: ps, h3Count: sec.querySelectorAll('h3,h4').length, secInner: sec.innerHTML.length, buttons: [...sec.querySelectorAll('button')].map(b => b.innerText.slice(0, 20)).slice(0, 6) };
});
fs.writeFileSync(path.join(here, `stepper-probe${reduced ? '.reduced' : ''}.out.json`), JSON.stringify({ frames, struct }, null, 1));
console.log(JSON.stringify(struct, null, 1));
await browser.close();
