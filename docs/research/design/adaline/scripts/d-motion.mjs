// adaline.ai home: motion / runtime probes. Observation only: no clicks, no forms, hover and scroll only.
// Run: node d-motion.mjs <scratchDir> <evidenceDir>
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCR = process.argv[2]; const EV = process.argv[3];
fs.mkdirSync(SCR, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const out = {};

const INIT = () => {
  // entrance sampler + rAF source counter + canvas/animate counters
  const S = (window.__d = { t0: performance.now(), samples: {}, rafBy: {}, animateCalls: 0, found: {} });
  const sels = { nav: 'nav', copy: '.first-load-hero-copy-enter', cta: '.first-load-hero-cta-enter', trusted: '.first-load-trusted-by-enter', pen: '.pen-stage-fade-in', pre: '[data-pen-stage] pre' };
  const raf = window.requestAnimationFrame;
  window.requestAnimationFrame = function (cb) { try { const k = String(cb).replace(/\s+/g, ' ').slice(0, 70); S.rafBy[k] = (S.rafBy[k] || 0) + 1; } catch {} return raf.call(this, cb); };
  const an = Element.prototype.animate; Element.prototype.animate = function (...a) { S.animateCalls++; return an.apply(this, a); };
  const tick = () => {
    const t = Math.round(performance.now() - S.t0);
    if (t < 3200) {
      for (const [k, s] of Object.entries(sels)) {
        const el = document.querySelector(s); if (!el) continue;
        if (!(k in S.found)) S.found[k] = t;
        const cs = getComputedStyle(el); const m = /matrix\(([^)]+)\)/.exec(cs.transform);
        const ty = m ? +m[1].split(',')[5] : 0;
        (S.samples[k] = S.samples[k] || []).push([t, +(+cs.opacity).toFixed(3), +ty.toFixed(1)]);
      }
      raf.call(window, tick);
    }
  };
  raf.call(window, tick);
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });

// ---------- A. entrance sequence + hero runtime (normal motion) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  const frames = [];
  const nav = page.goto('https://www.adaline.ai/', { waitUntil: 'commit', timeout: 60000 });
  await nav;
  const t0 = Date.now();
  for (let i = 0; i < 10; i++) { const t = Date.now() - t0; try { const buf = await page.screenshot({ type: 'jpeg', quality: 45, clip: { x: 0, y: 0, width: 1440, height: 900 } }); frames.push({ t, i }); fs.writeFileSync(path.join(SCR, `ent-${String(i).padStart(2, '0')}.jpg`), buf); } catch (e) { } await sleep(60); }
  out.entranceFrames = frames;
  await page.waitForLoadState('load').catch(() => {});
  await sleep(3500);
  out.entrance = await page.evaluate(() => {
    const S = window.__d; const res = { found: S.found };
    for (const [k, arr] of Object.entries(S.samples)) {
      const first = arr[0]; const firstVis = arr.find(s => s[1] > 0.001); const done = arr.find(s => s[1] >= 0.99 && Math.abs(s[2]) < 0.2);
      const startedMoving = arr.find(s => s[1] > 0.02);
      res[k] = { n: arr.length, firstSample: first, firstVisibleAt: firstVis && firstVis[0], reaches99At: done && done[0], ty0: startedMoving && startedMoving[2] };
    }
    return res;
  });
  // fonts actually used (CDP)
  const fontsUsed = {};
  try {
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
    const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
    const probes = { h1: 'h1', heroSub: 'h1 + div p, h1 ~ p', navDocs: 'nav a', cta: 'section a:has(span), a[href*="get-started"]', eyebrow: 'a[href*="agent-self-improvement"]', trusted: '.first-load-trusted-by-enter p, .first-load-trusted-by-enter span', pre: '[data-pen-stage] pre', h2: 'h2', };
    for (const [k, sel] of Object.entries(probes)) {
      try { const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel }); if (!nodeId) { fontsUsed[k] = null; continue; } const r = await cdp.send('CSS.getPlatformFontsForNode', { nodeId }); fontsUsed[k] = r.fonts.map(f => `${f.familyName}${f.isCustomFont ? ' (webfont)' : ' (system)'} x${f.glyphCount}`); } catch (e) { fontsUsed[k] = 'err ' + String(e.message).slice(0, 60); }
    }
  } catch (e) { fontsUsed.err = String(e.message).slice(0, 80); }
  out.fontsUsed = fontsUsed;

  // hero computed styles
  out.heroStyles = await page.evaluate(() => {
    const g = (el, props) => { if (!el) return null; const s = getComputedStyle(el); const o = {}; for (const p of props) o[p] = s[p]; const r = el.getBoundingClientRect(); o.rect = [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)]; o.text = (el.innerText || '').trim().slice(0, 40); return o; };
    const T = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'color', 'textWrap', 'maxWidth'];
    const h1 = document.querySelector('h1');
    const sub = h1.parentElement.querySelector('p');
    const chip = [...document.querySelectorAll('a')].find(a => /Self-Improving Agent/i.test(a.innerText));
    const trusted = [...document.querySelectorAll('p,span,div')].find(e => e.children.length === 0 && /^trusted by$/i.test((e.innerText || '').trim()));
    const btns = [...document.querySelectorAll('a')].filter(a => /^(get started|read docs)$/i.test((a.innerText || '').trim()));
    const heroGrid = h1.closest('section');
    return { h1: g(h1, T), sub: g(sub, T), chip: g(chip, T.concat(['backgroundColor', 'borderRadius', 'padding'])), trusted: g(trusted, T), btn0: g(btns[0], T.concat(['backgroundColor', 'borderRadius', 'padding', 'height', 'borderWidth'])), btn1: g(btns[1], T.concat(['backgroundColor', 'borderRadius', 'padding', 'borderColor', 'borderWidth'])), btnNav: g(btns.find(b => b.closest('nav')), T.concat(['backgroundColor', 'borderRadius', 'padding'])), heroSection: g(heroGrid, ['paddingTop', 'paddingBottom', 'display', 'gridTemplateColumns']), penStage: g(document.querySelector('[data-pen-stage]'), ['opacity', 'contain']), htmlBg: getComputedStyle(document.documentElement).backgroundColor, bodyBg: getComputedStyle(document.body).backgroundColor };
  });

  // ASCII field + pen state
  out.pen = await page.evaluate(() => { const st = document.querySelector('[data-pen-stage]'); if (!st) return null; const rows = [...st.querySelectorAll('pre')]; const path = st.querySelector('svg path'); const r = st.getBoundingClientRect(); return { rows: rows.length, cols: rows[0] && rows[0].textContent.length, stageRect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], dash: path && path.style.strokeDasharray, offset: path && path.style.strokeDashoffset, pathLen: path && Math.round(path.getTotalLength()), stroke: path && getComputedStyle(path).stroke, strokeW: path && getComputedStyle(path).strokeWidth, preFont: rows[0] && getComputedStyle(rows[0]).fontFamily.slice(0, 80), preColor: rows[0] && getComputedStyle(rows[0]).color, ariaHidden: rows[0] && rows[0].getAttribute('aria-hidden') }; });
  // mutation rate on stage
  out.penMutations = await page.evaluate(() => new Promise(res => { const st = document.querySelector('[data-pen-stage]'); if (!st) return res(null); let cd = 0, ch = 0, at = 0; const mo = new MutationObserver(l => { for (const m of l) { if (m.type === 'characterData') cd++; else if (m.type === 'childList') ch++; else at++; } }); mo.observe(st, { subtree: true, characterData: true, childList: true, attributes: true }); setTimeout(() => { mo.disconnect(); res({ seconds: 3, characterData: cd, childList: ch, attributes: at }); }, 3000); }));
  // pen dashoffset sampled over 4 s (shows JS-driven stroke animation + eased speed)
  out.penOffsetSeries = await page.evaluate(() => new Promise(res => { const p = document.querySelector('[data-pen-stage] svg path'); const s = []; const t0 = performance.now(); const f = () => { const t = performance.now() - t0; s.push([Math.round(t), +parseFloat(p.style.strokeDashoffset || '0').toFixed(1)]); if (t < 4000) requestAnimationFrame(f); else res(s.filter((_, i) => i % 20 === 0)); }; f(); }));
  // pointer-enter slows pen (hover only)
  const stage = await page.locator('[data-pen-stage]').boundingBox();
  await page.mouse.move(stage.x + stage.width / 2, stage.y + stage.height / 2); await sleep(300);
  const hs = await page.evaluate(() => new Promise(res => { const p = document.querySelector('[data-pen-stage] svg path'); const a = parseFloat(p.style.strokeDashoffset); const t0 = performance.now(); setTimeout(() => { const b = parseFloat(p.style.strokeDashoffset); res({ dtMs: Math.round(performance.now() - t0), delta: +(b - a).toFixed(1) }); }, 1000); }));
  await page.mouse.move(5, 700); await sleep(1500);
  const ns = await page.evaluate(() => new Promise(res => { const p = document.querySelector('[data-pen-stage] svg path'); const a = parseFloat(p.style.strokeDashoffset); const t0 = performance.now(); setTimeout(() => { const b = parseFloat(p.style.strokeDashoffset); res({ dtMs: Math.round(performance.now() - t0), delta: +(b - a).toFixed(1) }); }, 1000); }));
  out.penHoverSlowdown = { hovering: hs, notHovering: ns };

  // rAF sources at top, mid, footer
  const rafWindow = async (label) => { await page.evaluate(() => { window.__d.rafBy = {}; }); await sleep(2000); out['raf_' + label] = await page.evaluate(() => Object.entries(window.__d.rafBy).map(([k, v]) => [Math.round(v / 2), k])); };
  await page.mouse.move(40, 450);
  await rafWindow('top');
  // scroll through; keep mouse in gutter
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const goTo = async y => { let cur = await page.evaluate(() => scrollY); let guard = 0; while (Math.abs(cur - y) > 4 && guard++ < 60) { await page.mouse.wheel(0, Math.sign(y - cur) * Math.min(400, Math.abs(y - cur))); await sleep(50); cur = await page.evaluate(() => scrollY); } await sleep(900); return cur; };
  await goTo(3000); await rafWindow('mid3000');
  await goTo(6400); await rafWindow('ship6400');
  await goTo(11000); await rafWindow('footer11000');
  out.animateCallsAfterScroll = await page.evaluate(() => window.__d.animateCalls);
  await goTo(0);
  await ctx.close();
}

// ---------- B. reduced motion at context level ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', reducedMotion: 'reduce' });
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(4000);
  await page.screenshot({ path: path.join(EV, 'ev-reduced-motion-top.png') });
  out.rm = await page.evaluate(() => {
    const st = document.querySelector('[data-pen-stage]'); const rows = st ? [...st.querySelectorAll('pre')] : [];
    const anims = document.getAnimations().map(a => ({ n: a.animationName || a.transitionProperty || null, it: a.effect && a.effect.getTiming().iterations, state: a.playState }));
    const mq = document.querySelector('[style*="customer-logo-marquee"]');
    return { stagePresent: !!st, stageOpacity: st ? getComputedStyle(st).opacity : null, preRows: rows.length, preNonEmpty: rows.filter(r => r.textContent.trim().length).length, firstRow: rows[0] && rows[0].textContent.slice(0, 40), pathOffset: st && st.querySelector('svg path') && st.querySelector('svg path').style.strokeDashoffset, anims: anims.slice(0, 10), nAnims: anims.length, marqueeAnimName: mq && getComputedStyle(mq).animationName, marqueeTransform: mq && getComputedStyle(mq).transform, canvasCount: document.querySelectorAll('canvas').length };
  });
  // Footer under reduced motion: footer CTA opacity + canvas
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await sleep(1500);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight - 1100)); await sleep(1500);
  out.rmFooter = await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(e => /Self-improve your agents now/.test(e.textContent)); const c = document.querySelector('canvas'); return { h2opacity: h && getComputedStyle(h).opacity, h2transform: h && getComputedStyle(h).transform, canvasW: c && c.width, ctxCreated: window.__d && Object.keys(window.__d.rafBy).length }; });
  await ctx.close();
}

// ---------- C. no-JS: what is in server HTML visible state ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(2500);
  out.nojs = await page.evaluate(() => {
    const op = el => { const s = getComputedStyle(el); return { op: s.opacity, vis: s.visibility, tf: s.transform.slice(0, 40) }; };
    const h2s = [...document.querySelectorAll('h2')].map(h => ({ text: (h.textContent || '').trim().slice(0, 40), ...op(h), top: Math.round(h.getBoundingClientRect().top + scrollY) }));
    const h1 = document.querySelector('h1');
    const ctas = [...document.querySelectorAll('a')].filter(a => /get started|read docs/i.test(a.textContent)).map(a => ({ t: a.textContent.trim().slice(0, 20), href: a.getAttribute('href'), ...op(a) }));
    const op0 = [...document.querySelectorAll('[style*="opacity:0"],[style*="opacity: 0"]')].map(e => ({ tag: e.tagName.toLowerCase(), text: (e.textContent || '').trim().slice(0, 40), style: e.getAttribute('style').slice(0, 60) }));
    const menu = document.querySelector('button[aria-label="Open menu"]');
    return { h1: h1 && h1.textContent, h1op: h1 && op(h1), h2s, ctas, opacity0: op0, canvas: document.querySelectorAll('canvas').length, pre: document.querySelectorAll('pre').length, imgs: document.querySelectorAll('img').length, tonalism: document.querySelectorAll('img[src*="tonalism"]').length, menuBtn: !!menu, textLen: document.body.innerText.length, links: [...document.querySelectorAll('nav a')].map(a => a.getAttribute('href')) };
  });
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  out.nojs.pageHeight = H;
  await page.evaluate(h => window.scrollTo(0, h), H); await sleep(500);
  await page.screenshot({ path: path.join(EV, 'ev-nojs-footer.png') });
  await page.evaluate(() => window.scrollTo(0, 1000)); await sleep(500);
  await page.screenshot({ path: path.join(EV, 'ev-nojs-y1000.png') });
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(SCR, 'd.json'), JSON.stringify(out, null, 1));
console.log('ok', Object.keys(out).join(','));
