// Pexo: keyboard focus ring evidence, and no-JS full-page text survival. Observation only.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
// A: focus ring
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(3000);
  for (let i = 0; i < 2; i++) { await page.keyboard.press('Tab'); await sleep(150); }
  const info = await page.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return { el: e.tagName + ':' + (e.innerText || '').slice(0, 20), outline: s.outline, outlineOffset: s.outlineOffset, boxShadow: s.boxShadow, matchesFV: e.matches(':focus-visible') }; });
  console.log('focus-visible info (2nd tab)', JSON.stringify(info));
  await page.screenshot({ path: path.join(here, 'focus-nav.png'), clip: { x: 340, y: 0, width: 800, height: 80 } });
  for (let i = 0; i < 6; i++) { await page.keyboard.press('Tab'); await sleep(100); }
  const info2 = await page.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return { el: e.tagName + ':' + (e.innerText || e.getAttribute('aria-label') || '').slice(0, 20), outline: s.outline, boxShadow: s.boxShadow.slice(0, 160), fv: e.matches(':focus-visible') }; });
  console.log('8th tab', JSON.stringify(info2));
  // skip link?
  const skip = await page.evaluate(() => [...document.querySelectorAll('a')].slice(0, 3).map(a => ({ t: a.innerText.slice(0, 30), href: a.getAttribute('href'), cls: a.className.slice(0, 60) })));
  console.log('first anchors', JSON.stringify(skip));
  await ctx.close();
}
// B: no JS
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(2500);
  const res = await page.evaluate(() => {
    const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05; };
    const out = { secs: [] };
    document.querySelectorAll('main section, main > div > section').forEach(s => {
      const t = s.innerText.replace(/\s+/g, ' ').trim();
      const hs = s.querySelector('h1,h2');
      // visible text chars: count text nodes whose parent chain is visible
      let vchars = 0, hidden = 0; const w = document.createTreeWalker(s, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) { const n = w.currentNode; const txt = n.textContent.trim(); if (!txt) continue; let e = n.parentElement, ok = true; while (e && e !== s.parentElement) { const st = getComputedStyle(e); if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity) < 0.05) { ok = false; break; } e = e.parentElement; } if (ok) vchars += txt.length; else hidden += txt.length; }
      out.secs.push({ h: hs ? hs.innerText.slice(0, 40) : null, h_px: Math.round(s.getBoundingClientRect().height), top: Math.round(s.getBoundingClientRect().top + scrollY), vchars, hiddenChars: hidden });
    });
    out.pageH = document.documentElement.scrollHeight;
    out.h1 = (document.querySelector('h1') || {}).innerText;
    out.cta = [...document.querySelectorAll('header a, header button')].map(b => b.innerText.trim()).filter(Boolean);
    out.videos = [...document.querySelectorAll('video')].length;
    out.imgsLoadedZero = [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0).length;
    out.carouselVisible = (() => { const c = [...document.querySelectorAll('button')].find(b => b.innerText.includes('Create a launch video')); if (!c) return 'no node'; const r = c.getBoundingClientRect(); return { vis: vis(c), rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] }; })();
    out.footerText = (document.querySelector('footer') || {}).innerText ? document.querySelector('footer').innerText.length : null;
    out.faq = document.querySelectorAll('details').length;
    out.openFaq = [...document.querySelectorAll('details')].filter(d => d.open).length;
    out.email = /@/.test(document.body.innerText);
    return out;
  });
  console.log('NOJS', JSON.stringify(res, null, 1));
  await page.screenshot({ path: path.join(here, 'nojs-1.png'), fullPage: false });
  await page.evaluate(() => window.scrollTo(0, 1100)); await sleep(300);
  await page.screenshot({ path: path.join(here, 'nojs-2.png'), fullPage: false });
  await page.evaluate(() => window.scrollTo(0, 3300)); await sleep(300);
  await page.screenshot({ path: path.join(here, 'nojs-3.png'), fullPage: false });
  await ctx.close();
}
await browser.close();
