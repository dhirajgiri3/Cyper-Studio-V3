import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
for (const reduced of [false, true]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page); await cdp.send('Network.enable');
  const reqs = new Map();
  cdp.on('Network.requestWillBeSent', e => reqs.set(e.requestId, { url: e.request.url, type: e.type }));
  cdp.on('Network.loadingFinished', e => { const r = reqs.get(e.requestId); if (r) r.bytes = e.encodedDataLength; });
  await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(6000);
  const r = await page.evaluate(() => ({
    playing: [...document.querySelectorAll('video')].filter(v => !v.paused).length,
    withSrc: [...document.querySelectorAll('video')].filter(v => v.currentSrc || v.src).length,
    fontsLoaded: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/"/g, '') + ' ' + f.weight).slice(0, 20),
    fontsAll: [...document.fonts].length,
  }));
  const ts = [...reqs.values()].filter(r => /\.ts$/.test(r.url)).reduce((s, r) => s + (r.bytes || 0), 0);
  const tot = [...reqs.values()].reduce((s, r) => s + (r.bytes || 0), 0);
  console.log(reduced ? 'REDUCED' : 'NORMAL', JSON.stringify(r), 'ts KB', Math.round(ts / 1024), 'total KB', Math.round(tot / 1024));
  await ctx.close();
}
await browser.close();
