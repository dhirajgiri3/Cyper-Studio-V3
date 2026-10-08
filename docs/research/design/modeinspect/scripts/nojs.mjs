// No-JS probe: which content is actually visible (effective opacity), not just present in innerText.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import path from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://modeinspect.com/', { waitUntil: 'load' });
await sleep(1500);
const r = await page.evaluate(() => {
  const eff = el => { let o = 1; for (let e = el; e; e = e.parentElement) { const s = getComputedStyle(e); o *= parseFloat(s.opacity); if (s.display === 'none' || s.visibility === 'hidden') return 0; } return o; };
  const sel = 'h1,h2,h3,p,a,img,video,svg,button';
  const all = [...document.querySelectorAll(sel)].filter(e => (e.innerText || '').trim() || /^(IMG|VIDEO)$/.test(e.tagName));
  let vis = 0, hid = 0; const hiddenHeads = [], visHeads = [];
  for (const e of all) { const o = eff(e); if (o > 0.5) vis++; else { hid++; } if (/^H[123]$/.test(e.tagName)) (o > 0.5 ? visHeads : hiddenHeads).push(e.innerText.trim().replace(/\n/g, ' ').slice(0, 50)); }
  let visChars = 0, hidChars = 0;
  for (const e of document.querySelectorAll('p,h1,h2,h3,a,li,span')) { if (e.children.length) continue; const t = (e.innerText || '').trim().length; eff(e) > 0.5 ? visChars += t : hidChars += t; }
  const vids = [...document.querySelectorAll('video')].map(v => ({ src: (v.currentSrc || v.src || (v.querySelector('source') || {}).src || '').split('/').pop(), poster: (v.poster || '').split('/').pop(), eff: eff(v), preload: v.preload, autoplay: v.autoplay, controls: v.controls }));
  const heroFrame = [...document.querySelectorAll('main *')].find(e => /Acme Store/.test(e.textContent) && e.children.length < 3 && /Acme Store/.test(e.innerText || ''));
  return { vis, hid, visChars, hidChars, visHeads, hiddenHeads, vids, heroFrameEff: heroFrame ? eff(heroFrame) : null, docH: document.documentElement.scrollHeight, opacity0Inline: document.querySelectorAll('[style*="opacity:0"],[style*="opacity: 0"]').length };
});
console.log(JSON.stringify(r, null, 1));
await page.screenshot({ path: path.join(out, 'desktop-1440-nojs-full.png'), fullPage: true });
await page.screenshot({ path: path.join(out, 'desktop-1440-nojs-screen2.png'), clip: { x: 0, y: 900, width: 1440, height: 900 } });
await browser.close();
