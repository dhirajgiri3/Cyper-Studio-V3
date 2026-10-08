import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3000);
const r = await page.evaluate(() => {
  const out = { snapType: [], snapAlign: [], cssRules: [] };
  document.querySelectorAll('*').forEach(e => { const s = getComputedStyle(e); if (s.scrollSnapType !== 'none') out.snapType.push({ tag: e.tagName, cls: (e.className || '').toString().slice(0, 80), v: s.scrollSnapType, h: Math.round(e.getBoundingClientRect().height) }); if (s.scrollSnapAlign !== 'none') out.snapAlign.push({ cls: (e.className || '').toString().slice(0, 80), v: s.scrollSnapAlign, y: Math.round(e.getBoundingClientRect().top + scrollY), h: Math.round(e.getBoundingClientRect().height), stop: s.scrollSnapStop }); });
  for (const ss of document.styleSheets) { try { for (const rule of ss.cssRules) { const t = rule.cssText; if (/scroll-snap|scroll-behavior|overscroll/.test(t)) out.cssRules.push(t.slice(0, 260)); if (rule.cssRules) for (const r2 of rule.cssRules) if (/scroll-snap/.test(r2.cssText)) out.cssRules.push('[nested] ' + r2.cssText.slice(0, 260)); } } catch (e) {} }
  const sec = document.querySelector('.how-to-section-module__Hpxu5a__track');
  out.trackCss = sec ? { snap: getComputedStyle(sec).scrollSnapType, children: [...sec.children].map(c => ({ cls: (c.className || '').toString().slice(0, 80), h: Math.round(c.getBoundingClientRect().height), snapAlign: getComputedStyle(c).scrollSnapAlign, pos: getComputedStyle(c).position })) } : null;
  out.html = { snap: getComputedStyle(document.documentElement).scrollSnapType, sb: getComputedStyle(document.documentElement).scrollBehavior, ob: getComputedStyle(document.documentElement).overscrollBehavior };
  return out;
});
console.log(JSON.stringify(r, null, 1));
// wheel one tick inside pin region, sample scrollY every 50ms to see if there is a snapping animation
await page.evaluate(() => window.scrollTo(0, 1300)); await sleep(1200);
const y0 = await page.evaluate(() => scrollY); console.log('start', y0);
await page.mouse.move(720, 500);
const samples = [];
await page.evaluate(() => { window.__ys = []; const t0 = performance.now(); const f = () => { window.__ys.push([Math.round(performance.now() - t0), Math.round(scrollY * 10) / 10]); if (performance.now() - t0 < 2500) requestAnimationFrame(f); }; requestAnimationFrame(f); });
await sleep(100); await page.mouse.wheel(0, 100); await sleep(2600);
const ys = await page.evaluate(() => window.__ys);
let prev = null; const rows = []; ys.forEach(([t, y]) => { if (y !== prev) { rows.push(t + ':' + y); prev = y; } });
console.log('wheel 100px in pin region -> scrollY changes (t:y)', rows.join(' '));
await browser.close();
