// adaline.ai home: what keeps moving under prefers-reduced-motion when a product window is in view; meta lengths.
// Run: node h-reduced.mjs <outJson>
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const out = {};
for (const rm of ['no-preference', 'reduce']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', reducedMotion: rm });
  const page = await ctx.newPage();
  await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(2500);
  await page.mouse.move(30, 450);
  let cur = 0; while (cur < 1500) { await page.mouse.wheel(0, 300); await sleep(60); cur = await page.evaluate(() => scrollY); }
  await sleep(1200);
  const r = await page.evaluate(() => new Promise(res => {
    const card = document.querySelector('img[src*="tonalism"]').parentElement;
    let at = 0, ch = 0; const mo = new MutationObserver(l => { for (const m of l) { if (m.type === 'attributes') at++; else if (m.type === 'childList') ch++; } });
    mo.observe(card, { subtree: true, attributes: true, childList: true });
    const anims = document.getAnimations().filter(a => card.contains(a.effect && a.effect.target)).length;
    let raf = 0; const rf = () => { raf++; if (raf < 600) requestAnimationFrame(rf); };
    setTimeout(() => { mo.disconnect(); res({ attrMutations3s: at, childListMutations3s: ch, animationsInWindow: anims, windowNodes: card.querySelectorAll('*').length }); }, 3000);
  }));
  out[rm] = r;
  // rAF loop sources in view (count of callbacks in 2s) via wrapper
  out[rm].rafPerSec = await page.evaluate(() => new Promise(res => { let n = 0; const orig = window.requestAnimationFrame; window.requestAnimationFrame = function (cb) { n++; return orig.call(window, cb); }; setTimeout(() => { window.requestAnimationFrame = orig; res(Math.round(n / 2)); }, 2000); }));
  await page.screenshot({ path: `/private/tmp/claude-501/-Users-dhirajgiri-Documents-Projects-Cyper-studio/3dca7f24-f36b-4ab9-8421-75ac28c81e10/scratchpad/h-${rm}.jpg`, type: 'jpeg', quality: 55 });
  if (rm === 'no-preference') {
    out.meta = await page.evaluate(() => { const d = document.querySelector('meta[name=description]'); const og = document.querySelector('meta[property="og:description"]'); return { title: document.title, titleLen: document.title.length, descLen: d && d.content.length, ogTitle: (document.querySelector('meta[property="og:title"]') || {}).content, ogDescLen: og && og.content.length, twitterCard: (document.querySelector('meta[name="twitter:card"]') || {}).content }; });
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
