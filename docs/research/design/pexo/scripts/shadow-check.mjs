import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3000);
const r = await page.evaluate(() => {
  const layers = {}; let withReal = 0;
  document.querySelectorAll('body *').forEach(e => { const s = getComputedStyle(e).boxShadow; if (s === 'none') return; const parts = s.split(/,(?![^(]*\))/).map(x => x.trim()); const real = parts.filter(p => !/^rgba\(0, 0, 0, 0\)/.test(p) && !/ 0px 0px 0px 0px$/.test(p)); if (real.length) { withReal++; real.forEach(p => layers[p] = (layers[p] || 0) + 1); } });
  const dropShadows = [...document.querySelectorAll('body *')].filter(e => /drop-shadow/.test(getComputedStyle(e).filter)).length;
  const textShadow = [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).textShadow !== 'none').length;
  return { withReal, layers: Object.entries(layers).sort((a, b) => b[1] - a[1]).slice(0, 8), dropShadows, textShadow };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
