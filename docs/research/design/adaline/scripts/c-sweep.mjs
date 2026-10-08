// adaline.ai home: viewport sweep at 1440x900 using wheel scrolling (as a user would), jpeg frames for visual review.
// Run: node c-sweep.mjs <outDir> [step=900]
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const outDir = process.argv[2]; const step = +(process.argv[3] || 900);
fs.mkdirSync(outDir, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3500);
await page.mouse.move(40, 450); // gutter: avoids the inner scroll regions inside the product windows (see card, scroll trap)
let H = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0, cur = 0;
const log = [];
while (cur < H - 900 + 5 && i < 20) {
  await page.screenshot({ path: path.join(outDir, `s${String(i).padStart(2, '0')}-y${Math.round(cur)}.jpg`), type: 'jpeg', quality: 62 });
  const info = await page.evaluate(() => ({ y: Math.round(scrollY), H: document.documentElement.scrollHeight, h2: [...document.querySelectorAll('h2')].filter(h => { const r = h.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }).map(h => h.innerText.slice(0, 50)) }));
  log.push(info);
  let moved = 0; while (moved < step) { const d = Math.min(300, step - moved); await page.mouse.wheel(0, d); moved += d; await sleep(60); }
  await sleep(1300);
  cur = await page.evaluate(() => scrollY); H = await page.evaluate(() => document.documentElement.scrollHeight);
  i++;
}
await page.screenshot({ path: path.join(outDir, `s${String(i).padStart(2, '0')}-y${Math.round(cur)}.jpg`), type: 'jpeg', quality: 62 });
fs.writeFileSync(path.join(outDir, 'log.json'), JSON.stringify(log, null, 1));
console.log('frames', i + 1, 'H', H);
await browser.close();
