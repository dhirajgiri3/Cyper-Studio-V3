import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
for (const waitMs of [3000, 12000]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(waitMs);
  const r = await page.evaluate(async () => {
    const out = []; const t0 = performance.now();
    const docH0 = document.documentElement.scrollHeight;
    window.scrollTo(0, 2000);
    for (let i = 0; i < 12; i++) { await new Promise(r => setTimeout(r, i < 4 ? 30 : 150)); out.push([Math.round(performance.now() - t0), Math.round(scrollY), document.documentElement.scrollHeight]); }
    return { docH0, out };
  });
  console.log('wait', waitMs, 'docH0', r.docH0, JSON.stringify(r.out));
  await ctx.close();
}
await browser.close();
