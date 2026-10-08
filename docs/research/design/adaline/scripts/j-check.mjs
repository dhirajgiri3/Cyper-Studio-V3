import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(2500);
await page.mouse.move(30, 450);
let cur = 0, g = 0; while (cur < 11000 && g++ < 80) { await page.mouse.wheel(0, 300); await sleep(60); cur = await page.evaluate(() => scrollY); }
await sleep(1500);
const r = await page.evaluate(() => {
  const t = document.body.textContent;
  const hits = ['illustrative', 'sample data', 'simulated', 'demo', 'mock', 'example'].map(k => [k, (t.match(new RegExp(k, 'gi')) || []).length]);
  const labelled = [...document.querySelectorAll('[aria-label]')].filter(e => /window|graph|chart|hero/i.test(e.getAttribute('aria-label'))).map(e => ({ tag: e.tagName.toLowerCase(), role: e.getAttribute('role'), aria: e.getAttribute('aria-label'), hidden: e.getAttribute('aria-hidden'), inert: e.hasAttribute('inert') }));
  const wins = [...document.querySelectorAll('img[src*="tonalism"]')].map(i => { const c = i.parentElement; const w = c.querySelector('[aria-label*="window" i]'); const r = w && w.getBoundingClientRect(); return w ? [Math.round(r.width), Math.round(r.height)] : null; });
  const art = [...document.querySelectorAll('article[role=button]')].map(a => ({ tabindex: a.getAttribute('tabindex'), expanded: a.getAttribute('aria-expanded'), label: a.getAttribute('aria-label').slice(0, 50) })).slice(0, 3);
  return { hits, labelled, wins, art, footerSections: [...document.querySelectorAll('footer h3')].map(h => h.textContent) };
});
console.log(JSON.stringify(r));
await browser.close();
