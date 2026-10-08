// Pexo: record scrollTop writes on the stepper's overflow-hidden column while wheeling slowly through the pinned range.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await ctx.addInitScript(() => {
  window.__w = [];
  const d = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollTop');
  Object.defineProperty(Element.prototype, 'scrollTop', { get: d.get, set(v) { if (String(this.className).includes('pointer-events-none relative h-full overflow-hidden bg-black')) window.__w.push([Math.round(performance.now()), +(+v).toFixed(2), Math.round(scrollY)]); d.set.call(this, v); }, configurable: true });
});
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(4000);
await page.evaluate(() => window.scrollTo(0, 1100)); await sleep(1000);
await page.evaluate(() => { window.__w.length = 0; });
await page.mouse.move(720, 500);
for (let i = 0; i < 22; i++) { await page.mouse.wheel(0, 100); await sleep(400); }
await sleep(1500);
const w = await page.evaluate(() => window.__w);
fs.writeFileSync(path.join(here, 'scrolltop-series.out.json'), JSON.stringify(w));
// segment into tweens (gaps > 120ms)
const segs = []; let cur = [];
w.forEach(p => { if (cur.length && p[0] - cur[cur.length - 1][0] > 120) { segs.push(cur); cur = []; } cur.push(p); }); if (cur.length) segs.push(cur);
console.log('writes', w.length, 'segments', segs.length);
segs.filter(s => s.length > 4).slice(0, 8).forEach(s => { const dur = s[s.length - 1][0] - s[0][0]; const d = s[s.length - 1][1] - s[0][1]; const frac = s.map(p => ((p[1] - s[0][1]) / (d || 1)).toFixed(2)); console.log(`seg start t=${s[0][0]} writes=${s.length} dur=${dur}ms delta=${d.toFixed(0)}px scrollY ${s[0][2]}->${s[s.length - 1][2]} progress:`, frac.filter((_, i) => i % Math.ceil(s.length / 10) === 0).join(' ')); });
await browser.close();
