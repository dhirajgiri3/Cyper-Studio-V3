// Motion / interaction / asset probe for modeinspect.com (observation only; home page only; nothing is submitted).
// Usage: node motion.mjs <outDir> <scratchDir>
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [outDir, scratch] = process.argv.slice(2);
fs.mkdirSync(scratch, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const URL_ = 'https://modeinspect.com/';
const R = {};
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });

// ---------------- Stage A: entrance sequence (frame sampler + screenshots) ----------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await ctx.addInitScript(() => {
    window.__samples = [];
    const start = () => {
      const q = () => {
        const els = [...document.querySelectorAll('.reveal-in')].slice(0, 8);
        const h1 = document.querySelector('h1'); const hdr = document.querySelector('header .home-nav-pill'); 
        const frame = document.querySelector('main section')?.querySelectorAll('div')[0];
        return { els, h1, hdr };
      };
      const t0 = performance.now();
      const tick = () => {
        const { els, h1, hdr } = q();
        const row = { t: Math.round(performance.now()), els: els.map(e => { const s = getComputedStyle(e); const m = new DOMMatrix(s.transform === 'none' ? undefined : s.transform); return [+(+s.opacity).toFixed(3), +m.m42.toFixed(1)]; }), h1: h1 ? +(+getComputedStyle(h1).opacity).toFixed(2) : null, hdr: hdr ? getComputedStyle(hdr).opacity : null };
        window.__samples.push(row);
        if (performance.now() - t0 < 3000) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    document.addEventListener('DOMContentLoaded', start, { once: true });
  });
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto(URL_, { waitUntil: 'commit' });
  const frames = [];
  let i = 0;
  while (Date.now() - t0 < 2600 && i < 22) {
    const t = Date.now() - t0;
    try { const b = await page.screenshot({ type: 'jpeg', quality: 50 }); frames.push({ t, b64: b.toString('base64') }); } catch {}
    i++; await sleep(60);
  }
  await sleep(1500);
  const samples = await page.evaluate(() => window.__samples).catch(() => []);
  R.entrance = {
    revealEls: await page.evaluate(() => [...document.querySelectorAll('.reveal-in')].map(e => ({ tag: e.tagName, text: (e.innerText || '').trim().slice(0, 40).replace(/\n/g, ' '), delay: e.style.animationDelay, dur: e.style.animationDuration, y: e.style.getPropertyValue('--reveal-y'), top: Math.round(e.getBoundingClientRect().top + scrollY) })).slice(0, 12)),
    paint: await page.evaluate(() => performance.getEntriesByType('paint').map(p => [p.name, Math.round(p.startTime)])),
    sampleCount: samples.length,
    first: samples.slice(0, 3), 
    // time at which each element reaches final value
    series: samples.filter((s, k) => k % 3 === 0 && s.t < 2600).map(s => ({ t: s.t, els: s.els })).slice(0, 40),
    frameTimes: frames.map(f => f.t),
  };
  // contact sheet
  const sheet = await ctx.newPage();
  const sel = frames.filter((f, k) => k % 2 === 0).slice(0, 8);
  await sheet.setViewport ? null : null;
  await sheet.setViewportSize({ width: 1440, height: 760 });
  await sheet.setContent(`<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(4,1fr);gap:4px">${sel.map(f => `<div style="position:relative"><img style="width:100%;display:block" src="data:image/jpeg;base64,${f.b64}"><b style="position:absolute;left:6px;top:6px;background:#000;color:#fff;font:14px monospace;padding:2px 5px">${f.t}ms</b></div>`).join('')}</body>`);
  await sleep(400);
  await sheet.screenshot({ path: path.join(outDir, 'r2-entrance-contact-sheet.png') });
  await ctx.close();
}

// ---------------- Stage B: interactive probes on a settled page ----------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  const reqs = [];
  page.on('requestfinished', async r => { try { const sz = await r.sizes(); const resp = await r.response(); reqs.push({ url: r.url(), rt: r.resourceType(), body: sz.responseBodySize, hdr: sz.responseHeadersSize, status: resp && resp.status(), ct: resp && resp.headers()['content-type'], cc: resp && resp.headers()['cache-control'], ce: resp && resp.headers()['content-encoding'] }); } catch {} });
  await page.goto(URL_, { waitUntil: 'load' });
  await sleep(2500);
  R.reqsAtLoad = reqs.length;
  R.firstLoadMedia = reqs.filter(r => /image|media|font/.test(r.rt)).map(r => ({ u: r.url.replace('https://modeinspect.com', '').slice(0, 90), rt: r.rt, body: r.body, ct: r.ct }));

  // --- header behaviour
  const hdrState = async () => page.evaluate(() => [...document.querySelectorAll('header .home-nav-pill')].slice(0, 2).map(p => { const s = getComputedStyle(p); return { cls: p.className.replace(/\s+/g, ' ').slice(0, 90), bg: s.backgroundColor, bd: s.borderColor, bf: s.backdropFilter, rect: Math.round(p.getBoundingClientRect().top) }; }));
  R.header = { y0: await hdrState() };
  await page.evaluate(() => scrollTo(0, 10)); await sleep(500); R.header.y10 = await hdrState();
  await page.evaluate(() => scrollTo(0, 60)); await sleep(500); R.header.y60 = await hdrState();
  R.darkSections = await page.evaluate(() => [...document.querySelectorAll('[data-nav-tone="dark"]')].map(e => ({ tag: e.tagName, top: Math.round(e.getBoundingClientRect().top + scrollY), h: Math.round(e.getBoundingClientRect().height) })));
  R.docH = await page.evaluate(() => document.documentElement.scrollHeight);
  // transition timing sample at the moment the dark section reaches the header
  if (R.darkSections.length) {
    const d = R.darkSections[R.darkSections.length - 1];
    await page.evaluate(y => scrollTo(0, y - 200), d.top); await sleep(600);
    R.header.beforeDark = await hdrState();
    await page.evaluate(y => scrollTo(0, y - 40), d.top); await sleep(80);
    R.header.dark80ms = await hdrState();
    await sleep(600); R.header.dark680ms = await hdrState();
  }
  await page.evaluate(() => scrollTo(0, 0)); await sleep(600);

  // --- hover diffs
  const PROPS = ['background-color', 'color', 'box-shadow', 'transform', 'opacity', 'border-color', 'filter', 'outline', 'text-decoration-line'];
  const probeEl = async (name, locator) => {
    try {
      const loc = locator.first(); await loc.scrollIntoViewIfNeeded({ timeout: 2000 }); await page.mouse.move(2, 400); await sleep(400);
      const read = () => loc.evaluate((e, props) => { const s = getComputedStyle(e); const o = {}; for (const p of props) o[p] = s.getPropertyValue(p); o.transition = s.transition.slice(0, 160); o.cursor = s.cursor; return o; }, PROPS);
      const a = await read();
      await loc.hover({ timeout: 2000 }); await sleep(450);
      const b = await read();
      const diff = {}; for (const k of Object.keys(b)) if (a[k] !== b[k] && k !== 'transition') diff[k] = [String(a[k]).slice(0, 110), String(b[k]).slice(0, 110)];
      return { name, transition: a.transition, cursor: a.cursor, hoverDiff: diff };
    } catch (e) { return { name, error: String(e.message).slice(0, 100) }; }
  };
  R.hover = [];
  await page.evaluate(() => scrollTo(0, 0));
  R.hover.push(await probeEl('hero CTA Get started', page.locator('main a', { hasText: 'Get started' })));
  R.hover.push(await probeEl('header nav link Pricing', page.locator('header nav a', { hasText: 'Pricing' })));
  R.hover.push(await probeEl('header Sign in', page.locator('header a', { hasText: 'Sign in' })));
  R.hover.push(await probeEl('header Get started', page.locator('header a', { hasText: 'Get started' })));
  R.hover.push(await probeEl('logo pill (wordmark)', page.locator('header a[aria-label="Modeinspect home"] .home-nav-pill')));
  R.hover.push(await probeEl('home-panel card', page.locator('.home-panel')));
  R.hover.push(await probeEl('footer link', page.locator('footer a', { hasText: 'Pricing' })));
  R.hover.push(await probeEl('FAQ trigger', page.locator('main button[aria-expanded]')));
  // marquee pause on hover
  R.marquee = await page.evaluate(() => { const m = document.querySelector('.animate-marquee'); if (!m) return null; const par = m.closest('.pause-on-hover'); return { hasPauseParent: !!par, parentCls: par && par.className.slice(0, 80), childCount: m.children.length, width: Math.round(m.getBoundingClientRect().width) }; });

  // --- focus ring via keyboard
  await page.evaluate(() => scrollTo(0, 0)); await page.mouse.move(2, 400);
  R.focus = [];
  for (let k = 0; k < 7; k++) {
    await page.keyboard.press('Tab'); await sleep(250);
    R.focus.push(await page.evaluate(() => { const e = document.activeElement; if (!e) return null; const s = getComputedStyle(e); return { t: (e.innerText || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 24), outline: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor, shadow: s.boxShadow.slice(0, 120) }; }));
  }
  await page.keyboard.press('Shift+Tab'); 
  await page.evaluate(() => { document.activeElement && document.activeElement.blur(); scrollTo(0, 0); });

  // --- scroll-linked scan: settle at y, nudge 60px, compare doc-space top & transform/opacity
  const snap = () => page.evaluate(() => { const o = []; const all = document.querySelectorAll('main *, header *, footer *'); all.forEach((e, i) => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); if (r.bottom < -400 || r.top > innerHeight + 400 || r.width === 0) return; const hasT = s.transform !== 'none', hasO = s.opacity !== '1', hasF = s.filter !== 'none'; if (hasT || hasO || hasF || s.position === 'fixed' || s.position === 'sticky') o.push({ i, c: (e.tagName + '.' + String(e.className).split(' ').slice(0, 3).join('.')).slice(0, 60), pos: s.position, tr: s.transform, op: s.opacity, f: s.filter, top: Math.round((r.top + scrollY) * 10) / 10 }); }); return o; });
  R.scrollLinked = [];
  for (const y of [350, 1100, 2200, 3600, 5200, 7000]) {
    await page.evaluate(v => scrollTo(0, v), y); await sleep(1600);
    const a = await snap(); await page.evaluate(v => scrollTo(0, v + 60), y); await sleep(120); const b = await snap();
    const mb = new Map(b.map(x => [x.i, x]));
    const changed = [];
    for (const x of a) { const z = mb.get(x.i); if (!z) continue; const dTop = Math.abs(z.top - x.top); const dTr = x.tr !== z.tr; const dOp = x.op !== z.op; const dF = x.f !== z.f; if ((x.pos !== 'fixed' && x.pos !== 'sticky' && dTop > 1) || dTr || dOp || dF) changed.push({ c: x.c, pos: x.pos, dTop: +dTop.toFixed(1), tr: dTr ? [x.tr.slice(0, 40), z.tr.slice(0, 40)] : undefined, op: dOp ? [x.op, z.op] : undefined, f: dF ? [x.f, z.f] : undefined }); }
    R.scrollLinked.push({ y, tracked: a.length, changed: changed.slice(0, 12), fixedSticky: [...new Set(a.filter(x => x.pos === 'fixed' || x.pos === 'sticky').map(x => x.pos + ':' + x.c))].slice(0, 8) });
  }

  // --- videos
  R.videos = [];
  const vidInfo = () => page.evaluate(() => [...document.querySelectorAll('video')].map(v => { const r = v.getBoundingClientRect(); return { src: decodeURIComponent((v.currentSrc || v.src || '').split('/').pop()), docTop: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), paused: v.paused, t: +v.currentTime.toFixed(2), rs: v.readyState, preload: v.preload, loop: v.loop, muted: v.muted, playsInline: v.playsInline, poster: v.poster ? v.poster.split('/').pop() : null, dur: +(v.duration || 0).toFixed(1), vw: v.videoWidth, vh: v.videoHeight, ctl: v.controls, ar: v.getAttribute('aria-hidden'), tabindex: v.getAttribute('tabindex') }; }));
  R.videosAtTop = await vidInfo();
  const tops = (await vidInfo()).map(v => v.docTop);
  for (const t of tops.slice(0, 6)) { await page.evaluate(v => scrollTo(0, v - 200), t); await sleep(1800); const vi = await vidInfo(); R.videos.push({ at: t, now: vi.filter(v => Math.abs(v.docTop - t) < 5).map(v => ({ src: v.src, paused: v.paused, t: v.t, rs: v.rs })) }); }
  await page.evaluate(v => scrollTo(0, v), tops[0] ? tops[0] - 200 : 0); await sleep(300);
  R.videoInViewVsOut = await vidInfo();

  // --- hero frame composition
  await page.evaluate(() => scrollTo(0, 0)); await sleep(500);
  R.heroFrame = await page.evaluate(() => {
    const sec = document.querySelector('main section'); const cand = [...sec.querySelectorAll('div')].filter(d => { const r = d.getBoundingClientRect(); return r.width > 1000 && r.height > 500 && r.top > 300; })[0];
    if (!cand) return null; const r = cand.getBoundingClientRect(); const s = getComputedStyle(cand);
    return { cls: String(cand.className).slice(0, 160), w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), radius: s.borderRadius, shadow: s.boxShadow.slice(0, 200), bg: s.backgroundColor, border: s.border, descendants: cand.querySelectorAll('*').length, svgs: cand.querySelectorAll('svg').length, imgs: cand.querySelectorAll('img').length, canvases: cand.querySelectorAll('canvas').length, ariaHidden: cand.getAttribute('aria-hidden') || (cand.closest('[aria-hidden]') || {}).tagName || null, role: cand.getAttribute('role'), animations: cand.getAnimations({ subtree: true }).map(a => a.animationName || a.constructor.name), textLen: (cand.innerText || '').length, anyImgSrc: [...cand.querySelectorAll('img')].map(i => i.src.slice(-60)) };
  });
  // overlays / grain
  R.grain = await page.evaluate(() => { const out = []; for (const sel of ['body', '.home-field']) { const e = document.querySelector(sel); if (!e) continue; for (const ps of [null, '::before', '::after']) { const s = getComputedStyle(e, ps); if (s.content !== 'none' || ps === null) out.push({ sel: sel + (ps || ''), pos: s.position, op: s.opacity, blend: s.mixBlendMode, z: s.zIndex, bgImg: s.backgroundImage.slice(0, 40), size: s.backgroundSize, inset: s.inset, pe: s.pointerEvents }); } } const f = document.querySelector('.home-field'); if (f) { const r = f.getBoundingClientRect(); out.push({ homeFieldRect: [Math.round(r.width), Math.round(r.height)], pos: getComputedStyle(f).position }); } return out; });

  // --- section screenshots (settled), for evidence
  const heads = await page.evaluate(() => [...document.querySelectorAll('h2')].map(h => ({ t: h.innerText.slice(0, 30).replace(/\n/g, ' '), top: Math.round(h.getBoundingClientRect().top + scrollY) })));
  R.heads = heads;
  let n = 0;
  for (const h of heads) { n++; await page.evaluate(v => scrollTo(0, v), Math.max(0, h.top - 120)); await sleep(1800); if (n <= 7) await page.screenshot({ path: path.join(outDir, `r2-section-${n}.png`) }); }

  // --- all animation names in use anywhere after traversing the page
  R.animationsInUse = await page.evaluate(() => { const m = {}; document.querySelectorAll('*').forEach(e => { const s = getComputedStyle(e); if (s.animationName !== 'none') { const k = s.animationName + ' | ' + s.animationDuration + ' | ' + s.animationTimingFunction + ' | ' + s.animationIterationCount; (m[k] = m[k] || []).push((e.tagName + '.' + String(e.className).split(' ').slice(0, 2).join('.')).slice(0, 50)); } }); return Object.fromEntries(Object.entries(m).map(([k, v]) => [k, { n: v.length, e: v.slice(0, 2) }])); });
  R.transitionsInUse = await page.evaluate(() => { const m = {}; document.querySelectorAll('*').forEach(e => { const s = getComputedStyle(e); if (s.transitionDuration !== '0s' && s.transitionProperty !== 'none') { const k = s.transitionProperty.slice(0, 60) + ' | ' + s.transitionDuration.split(',')[0] + ' | ' + s.transitionTimingFunction.split(',')[0]; m[k] = (m[k] || 0) + 1; } }); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 14); });

  // --- full-run network (after scroll) for media + images + fonts
  await sleep(1200);
  R.afterScrollMedia = reqs.filter(r => /image|media|font/.test(r.rt)).map(r => ({ u: decodeURIComponent(r.url.replace('https://modeinspect.com', '')).slice(0, 80), rt: r.rt, body: r.body, ct: r.ct, cc: (r.cc || '').slice(0, 40), st: r.status }));
  R.reqsTotal = reqs.length;
  await ctx.close();
}
fs.writeFileSync(path.join(path.dirname(process.argv[1]), 'motion-output.json'), JSON.stringify(R, null, 1));
console.log('done', Object.keys(R));
await browser.close();
