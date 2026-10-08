import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3500);
await page.evaluate(() => {
  window.__m = []; const t0 = performance.now();
  const f = () => { const btn = [...document.querySelectorAll('a,button')].find(e => (e.innerText || '').trim() === 'Create now');
    let r = null; if (btn) { const chain = []; let e = btn; for (let i = 0; i < 6 && e && e.tagName !== 'HEADER'; i++, e = e.parentElement) { const s = getComputedStyle(e); chain.push(s.opacity + '|' + s.transform + '|' + s.visibility + '|' + s.transitionDuration + '|' + s.transitionTimingFunction.slice(0, 22) + '|' + (e.getAttribute('data-state') || '')); } r = chain; }
    window.__m.push([Math.round(performance.now() - t0), r]); if (performance.now() - t0 < 1500) requestAnimationFrame(f); };
  requestAnimationFrame(f);
});
await page.mouse.move(549, 36);
await sleep(1700);
const m = await page.evaluate(() => window.__m);
let prev = ''; m.forEach(([t, r]) => { const k = JSON.stringify(r); if (k !== prev) { console.log(t, k); prev = k; } });
// close behaviour: move away and sample whether it closes after delay
await page.mouse.move(700, 600); await sleep(120);
const open120 = await page.evaluate(() => document.querySelectorAll('[aria-expanded=true]').length);
await sleep(600);
const open720 = await page.evaluate(() => document.querySelectorAll('[aria-expanded=true]').length);
console.log('after leaving: expanded at 120ms', open120, 'at 720ms', open720);
await browser.close();
