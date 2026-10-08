// clay.com observation script 7: computed type of the exact text-node parents (hero sub, chips, stat labels, footer headings).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('../../../../../design-system/home-lab/tools/node_modules/playwright-core');
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' })).newPage();
await page.goto('https://www.clay.com/', { waitUntil: 'load', timeout: 60000 }).catch(() => {});
await new Promise(r => setTimeout(r, 4000));
for (let y = 0; y <= 9000; y += 600) { await page.evaluate(v => window.scrollTo(0, v), y); await new Promise(r => setTimeout(r, 150)); }
const res = await page.evaluate(() => {
  const want = ['Infrastructure to get any', 'or install directly', 'Start free trial', 'ORCHESTRATION', 'ENRICHMENT', 'QUALIFIED AND SCORED', 'CUSTOMERS', 'Clay 3x', 'GET TICKETS', 'Trusted by more', 'customers', 'DATA INFRASTRUCTURE', 'Learn more about building plays', 'Build systems to grow', 'The most creative', 'Figma increased'];
  const out = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set(); let n;
  while ((n = tw.nextNode())) { const t = n.textContent.replace(/\s+/g, ' ').trim(); for (const w of want) { if (t.startsWith(w) && !seen.has(w)) { const e = n.parentElement; const r = e.getBoundingClientRect(); if (r.width === 0) continue; const s = getComputedStyle(e); seen.add(w); out.push({ w, tag: e.tagName.toLowerCase(), cls: (e.getAttribute('class') || '').slice(0, 34), size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, tt: s.textTransform, color: s.color, bg: s.backgroundColor, radius: s.borderRadius, pad: s.padding }); } } }
  return out;
});
res.forEach(r => console.log(JSON.stringify(r)));
await browser.close();
