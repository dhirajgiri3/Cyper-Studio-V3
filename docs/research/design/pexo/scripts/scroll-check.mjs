import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3000);
const info = () => page.evaluate(() => { const p = document.querySelector('.sticky.grid'); const tr = document.querySelector('.how-to-section-module__Hpxu5a__track'); const r = p.getBoundingClientRect(); const tr_ = tr.getBoundingClientRect(); return { scrollY: Math.round(scrollY), panelY: Math.round(r.y), trackTop: Math.round(tr_.top + scrollY), trackH: Math.round(tr_.height), docH: document.documentElement.scrollHeight }; });
console.log('load', JSON.stringify(await info()));
for (const y of [2000, 2800, 3247, 3500, 4108, 5333]) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(1300); console.log('scrollTo', y, JSON.stringify(await info())); }
// wheel path for comparison
await page.evaluate(() => window.scrollTo(0, 0)); await sleep(500);
await page.mouse.move(720, 500);
for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 300); await sleep(150); }
await sleep(800); console.log('after 12x300 wheel', JSON.stringify(await info()));
await browser.close();
