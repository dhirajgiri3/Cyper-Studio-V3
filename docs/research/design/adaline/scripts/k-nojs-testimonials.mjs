import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(1000);
await page.mouse.move(30, 450);
let found = false;
for (let i = 0; i < 40 && !found; i++) {
  await page.mouse.wheel(0, 300); await sleep(150);
  const r = await page.evaluate(() => ({ y: Math.round(scrollY), H: document.documentElement.scrollHeight, vis: [...document.querySelectorAll('article')].map(a => { const r = a.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.width), Math.round(r.height)]; }).filter(v => v[1] > 0 && v[0] < 800 && v[0] > -200).length, h2: [...document.querySelectorAll('h2')].filter(h => { const r = h.getBoundingClientRect(); return r.top > 0 && r.top < 900; }).map(h => h.textContent.trim().slice(0, 24)) }));
  if (r.vis > 0) { found = true; console.log('found', JSON.stringify(r)); await sleep(500); await page.screenshot({ path: '/Users/dhirajgiri/Documents/Projects/Cyper studio/docs/research/design/adaline/ev-nojs-testimonials.jpg', type: 'jpeg', quality: 55 }); }
  else if (i % 6 === 0) console.log('step', i, JSON.stringify(r));
}
if (!found) console.log('no visible articles found in no-JS scroll');
await browser.close();
