// Pexo: does page JS move the window scroll position (scroll hijack / gating)? Traces scrollTo/scrollBy/scrollIntoView/scrollTop writes.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await ctx.addInitScript(() => {
  const L = window.__calls = [];
  window.__mark = false;
  const wrap = (obj, name, label) => { const o = obj[name]; if (!o) return; obj[name] = function (...a) { if (window.__mark) { const st = (new Error().stack || '').split('\n').slice(2, 4).map(s => s.trim().replace(/https:\/\/pexo\.ai\/_next\/static\/chunks\//, '').slice(0, 90)); L.push({ t: Math.round(performance.now()), fn: label, args: JSON.stringify(a).slice(0, 80), who: this === window ? 'window' : (this.tagName || '') + '.' + String(this.className || '').slice(0, 30), st }); } return o.apply(this, a); }; };
  wrap(window, 'scrollTo', 'window.scrollTo'); wrap(window, 'scroll', 'window.scroll'); wrap(window, 'scrollBy', 'window.scrollBy');
  wrap(Element.prototype, 'scrollTo', 'el.scrollTo'); wrap(Element.prototype, 'scrollBy', 'el.scrollBy'); wrap(Element.prototype, 'scrollIntoView', 'el.scrollIntoView');
  const d = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop'); if (d && d.set) Object.defineProperty(Element.prototype, 'scrollTop', { get: d.get, set(v) { if (window.__mark) L.push({ t: Math.round(performance.now()), fn: 'scrollTop=', args: String(v), who: (this.tagName || '') + '.' + String(this.className || '').slice(0, 30), st: [] }); d.set.call(this, v); }, configurable: true });
  const dl = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollLeft'); if (dl && dl.set) Object.defineProperty(Element.prototype, 'scrollLeft', { get: dl.get, set(v) { if (window.__mark && !String(this.className).includes('scrollbar-hide')) L.push({ t: Math.round(performance.now()), fn: 'scrollLeft=', args: String(v), who: (this.tagName || '') + '.' + String(this.className || '').slice(0, 30), st: [] }); dl.set.call(this, v); }, configurable: true });
});
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3000);
// A: wheel only (user-like) through the pinned stepper, small ticks
await page.evaluate(() => { window.__mark = true; window.__calls.length = 0; });
await page.mouse.move(720, 500);
const ys = [];
for (let i = 0; i < 30; i++) { await page.mouse.wheel(0, 120); await sleep(110); ys.push(await page.evaluate(() => Math.round(scrollY))); }
console.log('A wheel 30 x 120px (expected +3600):', ys.join(','));
console.log('A page-JS scroll calls:', JSON.stringify(await page.evaluate(() => window.__calls.filter(c => !/scrollbar-hide/.test(c.who)).slice(0, 12)), null, 0));
// B: one big jump programmatic from top (what my earlier script did) -> traced
await page.evaluate(() => { window.scrollTo(0, 0); }); await sleep(800);
await page.evaluate(() => { window.__calls.length = 0; });
await page.evaluate(() => { window.__mark = true; window.scrollTo(0, 2000); });
await sleep(1500);
console.log('B scrollTo(2000) ->', await page.evaluate(() => Math.round(scrollY)));
console.log('B page-JS scroll calls:', JSON.stringify(await page.evaluate(() => window.__calls.filter(c => !/scrollbar-hide/.test(c.who)).slice(0, 12)), null, 0));
await browser.close();
