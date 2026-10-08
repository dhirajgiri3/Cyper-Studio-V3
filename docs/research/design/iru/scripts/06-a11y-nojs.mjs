// iru.com card, script 6: axe-core run (JS on), no-JS inventory, fade-in keyframe lookup. Observation only.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/package.json');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const AXE = '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/axe-core/axe.min.js';
const OUT = process.argv[2]; const SHOT = process.env.SHOT_DIR;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const out = {};

{ // axe
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 }); await sleep(5000);
  try {
    await page.addScriptTag({ path: AXE });
    out.axe = await page.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }); return { version: axe.version, violations: r.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes.slice(0, 2).map(n => n.target.join(' ').slice(0, 90)) })), passes: r.passes.length, incomplete: r.incomplete.map(v => v.id) }; });
  } catch (e) { out.axeErr = String(e).slice(0, 200); }
  out.cssFade = await page.evaluate(() => { const res = []; for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch { continue; } for (const r of rules) { if (r instanceof CSSKeyframesRule && /^fade-in$|^slide-down-custom$/.test(r.name)) res.push({ name: r.name, css: r.cssText.slice(0, 220) }); } } const f = document.querySelector('form.hs-form'); const g = e => { const s = getComputedStyle(e); return { name: s.animationName, dur: s.animationDuration, timing: s.animationTimingFunction, delay: s.animationDelay, fill: s.animationFillMode, iter: s.animationIterationCount }; }; const owners = [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).animationName === 'fade-in').map(e => e.tagName.toLowerCase() + '.' + String(e.className).slice(0, 50) + ' ' + JSON.stringify(g(e))); return { kf: res, owners: owners.slice(0, 5) }; });
  out.metaLens = await page.evaluate(() => ({ title: document.title.length, desc: document.querySelector('meta[name=description]').content.length, titleText: document.title }));
  await ctx.close();
}

{ // no-JS
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 }); await sleep(2500);
  out.nojs = await page.evaluate(() => {
    const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && s.opacity !== '0'; };
    const heads = [...document.querySelectorAll('h1,h2,h3')].map(h => ({ t: h.tagName, text: h.innerText.replace(/\n/g, ' ').slice(0, 50), vis: vis(h) }));
    const ctas = [...document.querySelectorAll('a')].filter(a => /Book a demo|Request a quote|View .* Overview|Explore Iru AI/.test(a.innerText) && vis(a)).map(a => a.innerText.trim() + ' -> ' + (a.getAttribute('href') || '').slice(0, 60));
    const videos = [...document.querySelectorAll('video')].map(v => ({ src: v.getAttribute('src') || (v.querySelector('source') ? v.querySelector('source').getAttribute('src') : null), poster: v.getAttribute('poster'), vis: vis(v), w: Math.round(v.getBoundingClientRect().width) }));
    const lot = document.getElementById('homepage-hero-lottie');
    const form = document.querySelector('#homepage-hero-form-widget_1776259163676');
    const imgs = [...document.querySelectorAll('img')].filter(i => vis(i)).length;
    const zeroOpacity = [...document.querySelectorAll('main *, .body-wrapper *')].filter(e => getComputedStyle(e).opacity === '0' && e.getBoundingClientRect().width > 0 && !e.closest('#iru-header')).length;
    const mega = [...document.querySelectorAll('#iru-header div.inset-x-0.absolute.z-10')].map(p => getComputedStyle(p).display);
    const aiSec = [...document.querySelectorAll('h2,h3')].find(h => /Unified by design/.test(h.textContent));
    const aiBg = aiSec ? (() => { let e = aiSec; for (let i = 0; i < 10 && e; i++) { const bg = getComputedStyle(e).backgroundColor; if (bg !== 'rgba(0, 0, 0, 0)') return [bg, Math.round(e.getBoundingClientRect().height)]; e = e.parentElement; } })() : null;
    const aiColor = aiSec ? getComputedStyle(aiSec).color : null;
    const marqueeImgs = document.querySelectorAll('.marquee-content img').length;
    return { visibleChars: document.body.innerText.length, heads, ctas, videos, lottieBoxChildren: lot ? lot.children.length : null, lottieBox: lot ? [Math.round(lot.getBoundingClientRect().width), Math.round(lot.getBoundingClientRect().height)] : null, formBox: form ? [Math.round(form.getBoundingClientRect().width), Math.round(form.getBoundingClientRect().height), form.querySelectorAll('input').length] : null, imgs, zeroOpacity, mega, aiBg, aiColor, marqueeImgs, footerLinks: document.querySelectorAll('footer a').length, noscript: [...document.querySelectorAll('noscript')].length };
  });
  await page.evaluate(() => { const h = [...document.querySelectorAll('h2,h3')].find(h => /Unified by design/.test(h.textContent)); if (h) window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 300); });
  await sleep(500); await page.screenshot({ path: SHOT + '/nojs-ai.png' });
  await ctx.close();
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
await browser.close(); console.log('ok');
