// iru.com card, script 5: asset bytes after a scroll-through, stats section layout, mobile header/hero/chat-widget checks.
// Observation only: scrolling, screenshots, HEAD requests for public asset sizes. No clicks, no input.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/package.json');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = process.argv[2]; const SHOT = process.env.SHOT_DIR;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const out = {};
async function safe(page, fn, arg) { for (let i = 0; i < 4; i++) { try { return await page.evaluate(fn, arg); } catch (e) { if (!/context was destroyed|navigation/i.test(String(e))) throw e; await page.waitForLoadState('load').catch(() => {}); await sleep(1500); } } return null; }

// ---- desktop: scroll through slowly, then collect resource sizes for first-party media
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 }); await sleep(3500);
  const H = await safe(page, () => document.documentElement.scrollHeight);
  out.navEvents = []; page.on('framenavigated', f => { if (f === page.mainFrame()) out.navEvents.push(f.url().slice(0, 140)); });
  out.scrollLog = [];
  for (let y = 0; y <= H; y += 450) { const r = await safe(page, yy => { window.scrollTo({ top: yy, behavior: 'instant' }); return Math.round(scrollY); }, y); out.scrollLog.push([y, r]); await sleep(260); }
  await sleep(1500);
  out.resourcesAfterScroll = await page.evaluate(() => performance.getEntriesByType('resource').filter(e => /^https:\/\/www\.iru\.com/.test(e.name) && /(img|video|css|other)/.test(e.initiatorType) && !/favicon/.test(e.name)).map(e => ({ n: decodeURIComponent(e.name.replace('https://www.iru.com', '')).slice(0, 110), t: e.initiatorType, enc: e.encodedBodySize, dec: e.decodedBodySize })).filter(e => e.enc > 4000).sort((a, b) => b.enc - a.enc).slice(0, 30));
  out.imgTotals = await page.evaluate(() => { const es = performance.getEntriesByType('resource').filter(e => /^https:\/\/www\.iru\.com/.test(e.name) && e.initiatorType === 'img'); return { n: es.length, enc: es.reduce((a, e) => a + e.encodedBodySize, 0) }; });
  // stats section
  const top = await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /Numbers/.test(h.textContent)); return h ? h.getBoundingClientRect().top + scrollY : null; });
  out.statsTop = top;
  if (top) {
    await page.evaluate(y => window.scrollTo({ top: y - 220, behavior: 'instant' }), top); await sleep(900);
    await page.screenshot({ path: SHOT + '/stats.png' });
    out.stats = await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /Numbers/.test(h.textContent)); const sec = h.closest('[id^="widget_"]') || h.parentElement.parentElement; const s = getComputedStyle(h.parentElement); const dl = document.querySelector('dl.grid'); const dts = [...dl.querySelectorAll('dt')].map(d => d.innerText.replace(/\n/g, ' ').slice(0, 40)); const dds = [...dl.querySelectorAll('dd')].map(d => d.innerText); const dt0 = dl.querySelector('dt'); const dd0 = dl.querySelector('dd'); const pick = (e, ps) => Object.fromEntries(ps.map(p => [p, getComputedStyle(e)[p]])); return { h2: { rect: h.getBoundingClientRect().toJSON(), parentPos: s.position, parentTop: s.top, align: getComputedStyle(h).textAlign }, dts, dds, dt: pick(dt0, ['fontSize', 'lineHeight', 'color', 'fontWeight']), dd: pick(dd0, ['fontSize', 'lineHeight', 'letterSpacing', 'fontWeight', 'fontVariantNumeric']), grid: { cols: getComputedStyle(dl).gridTemplateColumns, gap: getComputedStyle(dl).gap, w: dl.getBoundingClientRect().width }, secH: sec.getBoundingClientRect().height }; });
  }
  // video file sizes (HEAD)
  out.head = {};
  for (const u of ['https://www.iru.com/hubfs/IRU_AI_Stringout_03_8.8mb.mp4', 'https://www.iru.com/hubfs/assets/iru-motions/intro-iru.webm', 'https://www.iru.com/hubfs/assets/iru-motions/intro-iru-poster.png', 'https://www.iru.com/hubfs/raw_assets/public/IruAurelia/fonts/FKGroteskNeue.woff2']) {
    try { const r = await page.request.head(u); out.head[u.replace(/^.*\//, '')] = { status: r.status(), len: r.headers()['content-length'], type: r.headers()['content-type'], cache: r.headers()['cache-control'], ranges: r.headers()['accept-ranges'] }; } catch (e) { out.head[u] = String(e).slice(0, 80); }
  }
  // IO-driven lazy: is the AI video src absent before approach? (fresh page)
  await ctx.close();
}

// ---- mobile
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'en-US', userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' });
  const page = await ctx.newPage();
  await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 }); await sleep(4500);
  out.mobile = {};
  out.mobile.hero = await page.evaluate(() => { const h1 = document.querySelector('h1'); const lot = document.getElementById('homepage-hero-lottie'); const svg = lot.querySelector('svg'); const form = document.querySelector('form.hs-form'); const btn = form && form.querySelector('input[type=submit]'); const hb = [...document.querySelectorAll('#iru-header header a')].find(a => /Book a demo/.test(a.innerText)); const hamb = document.querySelector('button[aria-label*="menu" i]'); const r = e => e ? [Math.round(e.getBoundingClientRect().left), Math.round(e.getBoundingClientRect().top), Math.round(e.getBoundingClientRect().width), Math.round(e.getBoundingClientRect().height)] : null; const hero = h1.closest('.bg-\\[\\#f6f6f6\\]') || h1.parentElement; return { h1: r(h1), lottie: r(lot), svg: r(svg), form: r(form), submit: r(btn), headerCta: r(hb), hamburger: r(hamb), hamburgerLabel: hamb && hamb.getAttribute('aria-label'), heroBox: r(hero), heroBg: getComputedStyle(hero).backgroundColor, order: 'h1.top=' + Math.round(h1.getBoundingClientRect().top) + ' lottie.top=' + Math.round(lot.getBoundingClientRect().top + scrollY), bannerH: 42, hdrFixed: getComputedStyle(document.querySelector('#iru-header')).position }; });
  out.mobile.scroll = [];
  for (const y of [0, 100, 300, 800, 1600]) { await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y); await sleep(600); out.mobile.scroll.push(await page.evaluate(() => ({ y: Math.round(scrollY), hdrTop: Math.round(document.querySelector('#iru-header').getBoundingClientRect().top), hdrH: Math.round(document.querySelector('#iru-header').getBoundingClientRect().height), wmW: Math.round(document.querySelector('header a svg').getBoundingClientRect().width) }))); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await sleep(400);
  // chat / widget identification
  out.mobile.widgets = await page.evaluate(() => [...document.querySelectorAll('body > *')].filter(e => !['SCRIPT', 'STYLE', 'NOSCRIPT', 'LINK'].includes(e.tagName)).map(e => ({ tag: e.tagName.toLowerCase(), id: e.id, cls: String(e.className).slice(0, 70), pos: getComputedStyle(e).position, z: getComputedStyle(e).zIndex, r: [Math.round(e.getBoundingClientRect().left), Math.round(e.getBoundingClientRect().top), Math.round(e.getBoundingClientRect().width), Math.round(e.getBoundingClientRect().height)] })).slice(0, 25));
  out.mobile.widgetHosts = await page.evaluate(() => [...document.querySelectorAll('iframe')].map(f => ({ src: f.src.slice(0, 100), title: f.title, id: f.id })).concat([...document.querySelectorAll('[id*="warmly" i],[class*="warmly" i],[id*="chat" i],[class*="chat" i]')].slice(0, 6).map(e => ({ el: e.tagName + '#' + e.id + '.' + String(e.className).slice(0, 50) }))));
  await page.screenshot({ path: SHOT + '/m-top.png' });
  // 2 more screens for density
  for (const y of [900, 1700, 2600]) { await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y); await sleep(900); await page.screenshot({ path: `${SHOT}/m-${y}.png` }); }
  await ctx.close();
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
await browser.close(); console.log('ok');
