// Pexo: DOM structure probe for hero carousel, prompt box, header and stepper. Observation only.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3500);
const out = await page.evaluate(() => {
  const cs = (el, props) => { const s = getComputedStyle(el); const o = {}; props.forEach(p => o[p] = s.getPropertyValue(p)); return o; };
  const chain = el => { const a = []; let e = el; for (let i = 0; i < 7 && e && e !== document.body; i++, e = e.parentElement) { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); a.push({ tag: e.tagName.toLowerCase(), cls: (e.getAttribute('class') || '').slice(0, 120), transform: s.transform, transition: s.transition.slice(0, 120), animation: s.animationName + ' ' + s.animationDuration, overflow: s.overflow, w: Math.round(r.width), x: Math.round(r.x), style: (e.getAttribute('style') || '').slice(0, 140) }); } return a; };
  const res = {};
  const card = [...document.querySelectorAll('button')].find(b => b.innerText.includes('Create a launch video'));
  res.cardChain = card ? chain(card) : null;
  const hero = document.querySelector('section'); const hs = getComputedStyle(hero);
  res.heroSection = { cls: hero.className.slice(0, 160), bg: hs.backgroundImage, h: hero.getBoundingClientRect().height, pad: hs.padding, bgColor: hs.backgroundColor };
  const h1 = document.querySelector('h1'); const h1s = getComputedStyle(h1);
  res.h1 = { w: h1.getBoundingClientRect().width, h: h1.getBoundingClientRect().height, textWrap: h1s.textWrap, maxW: h1s.maxWidth, ls: h1s.letterSpacing, fvs: h1s.fontVariationSettings, fontFeature: h1s.fontFeatureSettings, cls: h1.className.slice(0,160), html: h1.innerHTML.slice(0, 300) };
  const sub = h1.nextElementSibling; if (sub) { const s = getComputedStyle(sub); res.sub = { tag: sub.tagName, text: sub.innerText.slice(0, 80), fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, color: s.color, w: sub.getBoundingClientRect().width }; }
  // prompt box
  const ta = document.querySelector('textarea, [contenteditable="true"], [role="textbox"]');
  res.prompt = ta ? { tag: ta.tagName, ph: ta.getAttribute('placeholder'), aria: ta.getAttribute('aria-label'), chain: chain(ta).slice(0, 4) } : null;
  // header
  const hd = document.querySelector('header'); const hds = getComputedStyle(hd);
  res.header = { cls: hd.className.slice(0, 200), pos: hds.position, bg: hds.backgroundColor, bf: hds.backdropFilter, shadow: hds.boxShadow, transition: hds.transition.slice(0, 200), h: hd.getBoundingClientRect().height, inner: (hd.firstElementChild ? hd.firstElementChild.className.slice(0, 160) : null), innerStyle: hd.firstElementChild ? getComputedStyle(hd.firstElementChild).backgroundColor : null };
  // sections list: tag, class, height, top, bg
  res.sections = [...document.querySelectorAll('main > section, main > div > section, main section')].slice(0, 20).map(s => { const r = s.getBoundingClientRect(); const c = getComputedStyle(s); return { top: Math.round(r.top + scrollY), h: Math.round(r.height), bg: c.backgroundColor, bgi: c.backgroundImage.slice(0, 60), pt: c.paddingTop, pb: c.paddingBottom, cls: s.className.slice(0, 80), h2: (s.querySelector('h1,h2') || {}).innerText && (s.querySelector('h1,h2')).innerText.slice(0, 50) }; });
  // container widths
  res.containers = [...document.querySelectorAll('main *')].filter(e => { const s = getComputedStyle(e); return s.maxWidth !== 'none' && s.marginLeft === s.marginRight && parseFloat(s.maxWidth) > 600; }).slice(0, 8).map(e => ({ cls: e.className.slice(0, 80), maxW: getComputedStyle(e).maxWidth, w: Math.round(e.getBoundingClientRect().width), px: getComputedStyle(e).paddingLeft }));
  // scroll-to-top button
  const up = [...document.querySelectorAll('button')].find(b => (b.getAttribute('aria-label') || '').toLowerCase().includes('top')); res.toTop = up ? { aria: up.getAttribute('aria-label'), pos: getComputedStyle(up).position, op: getComputedStyle(up).opacity } : null;
  return res;
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
