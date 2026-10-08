// Layout, type, hero-mount timing, FAQ timing, and mobile probes for modeinspect.com (observation only; no form is submitted).
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const R = {};
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });

// ---- 1. hero visual mount timing (desktop, 1440) -------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await ctx.addInitScript(() => {
    window.__m = [];
    const go = () => {
      const t0 = performance.now();
      const tick = () => {
        const f = document.querySelector('main section .mt-16.max-w-\\[1200px\\]');
        const kids = f ? f.querySelectorAll('*').length : -1;
        let eff = null, tr = null;
        if (f) { let o = 1; let cur = f; const chain = []; while (cur && cur !== document.body) { const s = getComputedStyle(cur); o *= +s.opacity; cur = cur.parentElement; } eff = +o.toFixed(3); const first = f.firstElementChild; if (first) { const s = getComputedStyle(first); tr = [s.opacity, s.transform === 'none' ? 'none' : new DOMMatrix(s.transform).m42.toFixed(1)]; } }
        const h1 = document.querySelector('h1'); const h1o = h1 ? getComputedStyle(h1).opacity : null;
        window.__m.push({ t: Math.round(performance.now()), kids, eff, tr, h1o, anim: f ? f.getAnimations({ subtree: true }).length : 0 });
        if (performance.now() - t0 < 2600) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    document.addEventListener('DOMContentLoaded', go, { once: true });
    new PerformanceObserver(l => { window.__lcp = l.getEntries().map(e => [Math.round(e.startTime), e.element && e.element.tagName]); }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  const page = await ctx.newPage();
  await page.goto('https://modeinspect.com/', { waitUntil: 'load' });
  await sleep(3200);
  const m = await page.evaluate(() => window.__m);
  const firstKids = m.find(x => x.kids > 0);
  const stable = m.find(x => x.kids > 400 && x.eff === 1);
  R.heroMount = { samples: m.length, firstFrameT: m[0] && m[0].t, firstWithChildren: firstKids, firstFullyVisible: stable, transitionRows: m.filter(x => x.kids > 0 && x.eff < 1 || (x.tr && x.tr[0] !== '1')).slice(0, 14), lcp: await page.evaluate(() => window.__lcp), nav: await page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), ttfb: Math.round(n.responseStart) }; }) };
  await ctx.close();
}

// ---- 2. layout + type on settled desktop ---------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://modeinspect.com/', { waitUntil: 'load' });
  await sleep(2500);
  // settle lazy content by scrolling through once
  for (let y = 0; y < 11500; y += 700) { await page.evaluate(v => scrollTo(0, v), y); await sleep(120); }
  await page.evaluate(() => scrollTo(0, 0)); await sleep(500);
  R.layout = await page.evaluate(() => {
    const css = (e, ps) => { const s = getComputedStyle(e); const o = {}; ps.forEach(p => o[p] = s.getPropertyValue(p)); return o; };
    const rect = e => { const r = e.getBoundingClientRect(); return { x: Math.round(r.left), w: Math.round(r.width), top: Math.round(r.top + scrollY), h: Math.round(r.height) }; };
    const secs = [...document.querySelectorAll('main > section, main > div > section, footer')].map(s => ({ ...rect(s), bg: getComputedStyle(s).backgroundColor, pt: getComputedStyle(s).paddingTop, pb: getComputedStyle(s).paddingBottom, h2: (s.querySelector('h1,h2') || {}).innerText && s.querySelector('h1,h2').innerText.slice(0, 28).replace(/\n/g, ' '), nav: s.getAttribute('data-nav-tone') }));
    const containers = {}; document.querySelectorAll('main [class*="max-w-"]').forEach(e => { const m = String(e.className).match(/max-w-(\[[^\]]+\]|[a-z0-9]+)/); if (m) { const k = m[1] + ' @' + Math.round(e.getBoundingClientRect().width); containers[k] = (containers[k] || 0) + 1; } });
    const grids = [...document.querySelectorAll('main *')].filter(e => getComputedStyle(e).display === 'grid').slice(0, 12).map(e => ({ cols: getComputedStyle(e).gridTemplateColumns.slice(0, 70), gap: getComputedStyle(e).columnGap + '/' + getComputedStyle(e).rowGap, w: Math.round(e.getBoundingClientRect().width) }));
    const tp = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'text-transform', 'font-variant-numeric', 'font-feature-settings'];
    const h1 = document.querySelector('h1'); const sp = h1.querySelector('span');
    const sub = h1.nextElementSibling;
    const eyebrow = [...document.querySelectorAll('main *')].find(e => /loved by design engineers/i.test(e.textContent) && e.children.length === 0);
    const stat = [...document.querySelectorAll('main *')].find(e => e.children.length <= 2 && /^22\s*days?$/i.test((e.innerText || '').trim()));
    const statNum = stat && stat.querySelector('*') ? stat : stat;
    const nav = document.querySelector('header nav a'); const hbtn = [...document.querySelectorAll('header a')].find(a => /Get started/.test(a.innerText));
    const h2s = [...document.querySelectorAll('h2')].slice(0, 2); const h3 = document.querySelector('main h3');
    const card = document.querySelector('.home-panel'); const faq = document.querySelector('main button[aria-expanded]');
    const quote = [...document.querySelectorAll('main p')].find(p => /merge|respects our design system|PR/.test(p.innerText) && p.innerText.length > 60);
    const mono = [...document.querySelectorAll('footer p')][1];
    return {
      containers, grids, secs,
      type: {
        h1: css(h1, tp), h1span: css(sp, tp), sub: css(sub, tp), eyebrow: eyebrow && css(eyebrow, tp), navlink: css(nav, tp), headerBtn: css(hbtn, tp),
        h2: h2s.map(e => css(e, tp)), h2span: h2s.map(e => e.querySelector('span') ? css(e.querySelector('span'), tp) : null), h3: h3 && css(h3, tp), stat: stat && css(stat, tp), statChildren: stat ? [...stat.querySelectorAll('*')].map(c => ({ t: c.innerText, ...css(c, ['font-family', 'font-size', 'color']) })) : null, cardTxt: card && css(card, ['font-size']), faq: faq && css(faq, tp), quote: quote && css(quote, tp), foot: mono && css(mono, tp),
      },
      heroCta: (() => { const a = [...document.querySelectorAll('main a')].find(x => /Get started/.test(x.innerText)); const r = a.getBoundingClientRect(); return { ...css(a, ['background-color', 'color', 'border-radius', 'font-size', 'font-weight', 'letter-spacing', 'box-shadow', 'height', 'padding']), w: Math.round(r.width) }; })(),
      panel: card && css(card, ['background-color', 'border', 'border-radius', 'box-shadow', 'padding']),
    };
  });
  // FAQ open timing: click an accordion trigger (local UI toggle only; sends nothing), sample content opacity/transform
  try {
    const btn = page.locator('main button[aria-expanded]').first();
    await btn.scrollIntoViewIfNeeded(); await sleep(600);
    await page.evaluate(() => { window.__f = []; const b = document.querySelector('main button[aria-expanded]'); const panel = b.closest('div,li').querySelector('.home-faq-panel-content'); const t0 = performance.now(); const tick = () => { const s = getComputedStyle(panel); const m = s.transform === 'none' ? 0 : new DOMMatrix(s.transform).m42; window.__f.push([Math.round(performance.now() - t0), +(+s.opacity).toFixed(2), +m.toFixed(1), s.filter]); if (performance.now() - t0 < 700) requestAnimationFrame(tick); }; window.__t0 = performance.now(); requestAnimationFrame(tick); });
    await btn.click(); await sleep(900);
    R.faqOpen = (await page.evaluate(() => window.__f)).filter((_, i) => i % 3 === 0).slice(0, 14);
    R.faqMeta = await page.evaluate(() => { const b = document.querySelector('main button[aria-expanded]'); return { expanded: b.getAttribute('aria-expanded'), tag: b.tagName, hasDetails: !!document.querySelector('details'), panelInDomWhenClosed: [...document.querySelectorAll('.home-faq-panel')].length, panelAriaHidden: [...document.querySelectorAll('.home-faq-panel-inner')].slice(0, 2).map(e => e.getAttribute('aria-hidden') || e.getAttribute('inert')) }; });
    await btn.click();
  } catch (e) { R.faqErr = String(e.message).slice(0, 120); }
  // contrast of FAQ focus ring and lime CTA text
  R.contrast = await page.evaluate(() => { const lum = c => { const [r, g, b] = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; }; const cr = (a, b) => { const x = lum(a), y = lum(b); return +((Math.max(x, y) + .05) / (Math.min(x, y) + .05)).toFixed(2); }; const bg = [224, 218, 213]; const lime = [194, 236, 102]; const limeBtn = [215, 247, 146]; const mix = (f, a, b) => f.map((v, i) => Math.round(v * a + b[i] * (1 - a))); const sub = mix([17, 17, 16], .62, bg); const subOnLime = mix([17, 17, 16], .62, [200, 232, 120]); return { ringLime90_vs_bg: cr(mix(lime, .9, bg), bg), ctaText_vs_btn: cr([22, 33, 10], limeBtn), subhead62_vs_bg: cr(sub, bg), subhead62_vs_limeField: cr(subOnLime, [200, 232, 120]), digidecay62_vs_limeField: cr(subOnLime, [200, 232, 120]), fg_vs_bg: cr([17, 17, 16], bg) }; });
  await ctx.close();
}

// ---- 3. mobile probes ------------------------------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', locale: 'en-US' });
  const page = await ctx.newPage();
  const reqs = [];
  page.on('requestfinished', async r => { try { const sz = await r.sizes(); reqs.push({ u: r.url().replace('https://modeinspect.com', '').slice(0, 70), rt: r.resourceType(), b: sz.responseBodySize }); } catch {} });
  await page.goto('https://modeinspect.com/', { waitUntil: 'load' });
  await sleep(2500);
  R.mobile = {};
  R.mobile.hero = await page.evaluate(() => { const a = [...document.querySelectorAll('main a')].filter(x => /Get started/.test(x.innerText)).map(x => ({ vis: x.getBoundingClientRect().width > 0, disp: getComputedStyle(x).display })); const f = document.querySelector('main form'); const inp = f && f.querySelector('input'); return { getStartedLinksInMain: a, form: !!f, formAction: f && (f.getAttribute('action') || null), formMethod: f && f.method, inputType: inp && inp.type, inputName: inp && inp.name, inputAutocomplete: inp && inp.autocomplete, inputLabel: inp && (inp.getAttribute('aria-label') || (inp.labels && inp.labels[0] && inp.labels[0].innerText) || null), placeholder: inp && inp.placeholder, copy: f && f.parentElement.innerText.slice(0, 80).replace(/\n/g, ' | '), h1: getComputedStyle(document.querySelector('h1')).fontSize, hscroll: document.documentElement.scrollWidth > innerWidth }; });
  const fixedAt = async y => { await page.evaluate(v => scrollTo(0, v), y); await sleep(1200); return page.evaluate(() => [...document.querySelectorAll('body *')].filter(e => ['fixed', 'sticky'].includes(getComputedStyle(e).position) && e.getBoundingClientRect().width > 0 && !e.matches('body::before')).map(e => ({ c: (e.tagName + '.' + String(e.className).split(' ').slice(0, 3).join('.')).slice(0, 60), pos: getComputedStyle(e).position, top: Math.round(e.getBoundingClientRect().top), h: Math.round(e.getBoundingClientRect().height), op: getComputedStyle(e).opacity })).slice(0, 8)); };
  R.mobile.fixed0 = await fixedAt(0); R.mobile.fixed1500 = await fixedAt(1500); R.mobile.fixed5000 = await fixedAt(5000);
  R.mobile.ctaBar = await page.evaluate(() => { const b = document.querySelector('.home-mobile-cta-bar'); return b ? { text: b.innerText.slice(0, 80), pos: getComputedStyle(b).position, bottom: getComputedStyle(b).bottom, op: getComputedStyle(b).opacity, tr: getComputedStyle(b).transform } : null; });
  await page.evaluate(() => scrollTo(0, 0)); await sleep(400);
  R.mobile.reqsByType = reqs.reduce((a, r) => { a[r.rt] = (a[r.rt] || 0) + r.b; return a; }, {});
  R.mobile.mediaReqs = reqs.filter(r => r.rt === 'media').map(r => [r.u, r.b]);
  R.mobile.videoCount = await page.evaluate(() => [...document.querySelectorAll('video')].map(v => [v.paused, v.readyState, v.preload]));
  // menu animation timing
  try {
    await page.evaluate(() => { window.__mm = []; });
    const btn = page.locator('header button', { hasText: 'Menu' }).first();
    await btn.tap(); 
    await page.evaluate(() => { const t0 = performance.now(); const tick = () => { const o = document.querySelector('.fixed.inset-0.z-\\[60\\]'); if (o) { const s = getComputedStyle(o); window.__mm.push([Math.round(performance.now() - t0), +(+s.opacity).toFixed(2), s.backdropFilter]); } if (performance.now() - t0 < 900) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
    await sleep(1100);
    R.mobile.menu = (await page.evaluate(() => window.__mm)).filter((_, i) => i % 4 === 0).slice(0, 12);
    R.mobile.menuA11y = await page.evaluate(() => { const o = document.querySelector('.fixed.inset-0.z-\\[60\\]'); const dlg = document.querySelector('[role="dialog"]'); return { overlay: !!o, role: dlg && dlg.getAttribute('role'), ariaModal: dlg && dlg.getAttribute('aria-modal'), bodyOverflow: getComputedStyle(document.body).overflow, links: [...document.querySelectorAll('[role="dialog"] a')].map(a => a.innerText.trim()) }; });
  } catch (e) { R.mobile.menuErr = String(e.message).slice(0, 120); }
  await ctx.close();
}
fs.writeFileSync(path.join(path.dirname(process.argv[1]), 'layout-type-mount-output.json'), JSON.stringify(R, null, 1));
console.log('done');
await browser.close();
