import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import path from 'node:path'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3000);
for (const y of [1200, 1600, 2080, 2560, 3040, 3300]) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(350); }
const targets = [['tabs', 3247], ['social', 4108], ['more', 5333], ['models', 6399], ['reviews2', 9700], ['blog', 10500], ['faq', 11454]];
for (const [n, y] of targets) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(1800); const sy = await page.evaluate(() => Math.round(scrollY)); console.log(n, y, '->', sy); await page.screenshot({ path: path.join(here, `deep-${n}.png`) }); }
await browser.close();
