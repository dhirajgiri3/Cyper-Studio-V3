import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await ctx.addInitScript(() => {
  const L = window.__L = []; window.__on = false;
  const log = (fn, a, extra) => { if (window.__on) L.push({ t: Math.round(performance.now()), fn, a: String(a).slice(0, 60), y: Math.round(scrollY), st: (new Error().stack || '').split('\n').slice(2, 5).map(s => s.trim().replace(/https:\/\/pexo\.ai\/_next\/static\/chunks\//, '').slice(0, 80)) }); };
  for (const n of ['scrollTo', 'scroll', 'scrollBy']) { const o = window[n]; window[n] = function (...a) { log('window.' + n, JSON.stringify(a)); return o.apply(this, a); }; }
  for (const n of ['scrollTo', 'scroll', 'scrollBy', 'scrollIntoView']) { const o = Element.prototype[n]; Element.prototype[n] = function (...a) { if (!String(this.className).includes('scrollbar-hide')) log('el.' + n, JSON.stringify(a) + ' ' + this.tagName + '.' + String(this.className).slice(0, 30)); return o.apply(this, a); }; }
  const d = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop'); Object.defineProperty(Element.prototype, 'scrollTop', { get: d.get, set(v) { if (this === document.documentElement || this === document.body || this === document.scrollingElement) log('root.scrollTop=', v); d.set.call(this, v); }, configurable: true });
  addEventListener('scroll', () => log('scroll-event', ''), { passive: true });
});
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(4000);
await page.evaluate(() => { window.__on = true; window.__L.length = 0; window.scrollTo(0, 2000); });
await sleep(1200);
const L = await page.evaluate(() => window.__L);
L.forEach(x => console.log(JSON.stringify(x)));
// also: is there an element whose height/min-height limits? check max scroll via html scrollHeight and any 'scroll-margin'/'scroll-padding'
console.log(await page.evaluate(() => JSON.stringify({ y: Math.round(scrollY), sp: getComputedStyle(document.documentElement).scrollPaddingTop, ov: getComputedStyle(document.documentElement).overflowY, bodyOv: getComputedStyle(document.body).overflowY, anchor: getComputedStyle(document.documentElement).overflowAnchor })));
await browser.close();
