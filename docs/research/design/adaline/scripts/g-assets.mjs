// adaline.ai home: format / natural size / cache headers of the image assets the page itself requests (read via in-page fetch HEAD/GET size only).
// Run: node g-assets.mjs <outJson>
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(2500);
const urls = [
  '/images/footer-clouds.png', '/images/footer-stars.png', '/images/footer-meteor.jpg',
  '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftonalism-7.86316a2e.png&w=1200&q=75',
  '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-hills.2b662532.png&w=3840&q=50',
  '/logos/Customers/Small/DoorDash.svg', '/metadata/og-image.png',
];
const out = await page.evaluate(async (urls) => {
  const res = [];
  for (const u of urls) {
    try {
      const r = await fetch(u, { headers: { Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8' } });
      const b = await r.blob();
      const dims = await new Promise(ok => { if (!/image\/(png|jpeg|webp|avif)/.test(b.type)) return ok(null); const i = new Image(); i.onload = () => ok([i.naturalWidth, i.naturalHeight]); i.onerror = () => ok(null); i.src = URL.createObjectURL(b); });
      res.push({ u: u.slice(0, 90), status: r.status, type: b.type, bytes: b.size, dims, cache: r.headers.get('cache-control'), xvc: r.headers.get('x-vercel-cache') });
    } catch (e) { res.push({ u, err: String(e.message).slice(0, 60) }); }
  }
  return res;
}, urls);
await browser.close();
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
for (const r of out) console.log(JSON.stringify(r));
