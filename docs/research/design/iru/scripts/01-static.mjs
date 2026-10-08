// iru.com card, script 1: static + runtime inventory (JS on). Observation only: no clicks, no form input.
// Output: JSON to the path given as argv[2].
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/package.json');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = process.argv[2];
const sleep = ms => new Promise(r => setTimeout(r, ms));

const INIT = () => {
  const stackKey = (skip = 2) => {
    try {
      const m = new Error().stack.split('\n').slice(skip, skip + 3).join('|').match(/https?:\/\/[^\s)|]+/g);
      return m && m[0] ? m[0].replace(/:\d+:\d+$/, '').slice(0, 140) : 'unknown';
    } catch { return 'err'; }
  };
  window.__h = { raf: { total: 0, by: {} }, canvas: [], io: [], animate: 0, ro: 0 };
  const raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = cb => { window.__h.raf.total++; const k = stackKey(2); window.__h.raf.by[k] = (window.__h.raf.by[k] || 0) + 1; return raf(cb); };
  const gc = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (t, ...a) { window.__h.canvas.push({ type: t, by: stackKey(2), inDom: this.isConnected }); return gc.call(this, t, ...a); };
  const IO = window.IntersectionObserver;
  window.IntersectionObserver = class extends IO { constructor(cb, o) { super(cb, o); window.__h.io.push({ by: stackKey(2), opts: o ? JSON.stringify({ t: o.threshold, rm: o.rootMargin }) : null }); } };
  const an = Element.prototype.animate;
  Element.prototype.animate = function (...a) { window.__h.animate++; return an.apply(this, a); };
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await ctx.addInitScript(INIT);
const page = await ctx.newPage();
const bodies = {};
page.on('response', async r => {
  try {
    const u = r.url(); const rt = r.request().resourceType();
    if ((rt === 'stylesheet' || rt === 'script') && /iru\.com/.test(u)) { const b = await r.body(); bodies[u] = { rt, size: b.length, text: b.toString('utf8') }; }
  } catch {}
});
await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 });
await sleep(6000);

const out = {};
const rawHtmlRes = await page.request.get('https://www.iru.com/');
const rawHtml = await rawHtmlRes.text();
out.rawHtml = {
  status: rawHtmlRes.status(), bytes: rawHtml.length, headers: rawHtmlRes.headers(),
  hasFormTag: /<form/i.test(rawHtml), hasHsForm: /hs-form|hbspt\.forms\.create|hsForm/i.test(rawHtml),
  hasSvgHero: (rawHtml.match(/<svg/g) || []).length, hasVideoTag: (rawHtml.match(/<video/g) || []).length,
  hasXData: (rawHtml.match(/x-data/g) || []).length, h1: (rawHtml.match(/<h1[^>]*>[\s\S]*?<\/h1>/i) || [''])[0].replace(/\s+/g, ' ').slice(0, 300),
  htmlTag: (rawHtml.match(/<html[^>]*>/i) || [''])[0],
  preloads: [...rawHtml.matchAll(/<link[^>]+rel="(preload|preconnect|prefetch|dns-prefetch|modulepreload)"[^>]*>/gi)].map(m => m[0].slice(0, 220)),
  metas: [...rawHtml.matchAll(/<meta[^>]+(name|property)="([^"]+)"[^>]*content="([^"]*)"/gi)].map(m => [m[2], m[3].slice(0, 140)]),
  jsonLd: [...rawHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => m[1].replace(/\s+/g, ' ').slice(0, 900)),
  heroSnippet: (() => { const i = rawHtml.indexOf('<h1'); return i < 0 ? null : rawHtml.slice(Math.max(0, i - 900), i + 1600).replace(/\s+/g, ' '); })(),
};

out.page = await page.evaluate(() => {
  const r2 = n => Math.round(n * 100) / 100;
  const cs = (el, props) => { const s = getComputedStyle(el); const o = {}; for (const p of props) o[p] = s.getPropertyValue(p); return o; };
  const short = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 6).join('.') : '');
  const chain = el => { const a = []; let e = el; while (e && e !== document.documentElement && a.length < 9) { a.push(short(e)); e = e.parentElement; } return a; };
  const res = {};
  const html = document.documentElement;
  res.html = { cls: html.className, lang: html.lang, style: html.getAttribute('style'), dataAttrs: [...html.attributes].map(a => a.name + '=' + a.value.slice(0, 60)), scrollBehavior: getComputedStyle(html).scrollBehavior, scrollSnap: getComputedStyle(html).scrollSnapType, overflowX: getComputedStyle(document.body).overflowX };
  res.globals = Object.fromEntries(['gsap', 'ScrollTrigger', 'Lenis', 'lenis', 'THREE', 'Motion', 'motion', 'Swiper', 'rive', 'Rive', 'lottie', 'bodymovin', 'Alpine', 'LocomotiveScroll', 'barba', 'Splide', 'anime', 'htmx', 'React', 'Vue', '__NEXT_DATA__', 'Webflow', 'Plyr', 'hbspt', 'jQuery', '$', 'OneTrust', 'Optanon', 'WebFont', 'AOS', 'SplitType', 'Flickity', 'Glide'].map(k => [k, typeof window[k] !== 'undefined' ? (window[k] && (window[k].version || window[k].VERSION) ? String(window[k].version || window[k].VERSION) : 'present') : null]).filter(([, v]) => v));
  // lottie registry
  try {
    const L = window.lottie || window.bodymovin;
    if (L && L.getRegisteredAnimations) {
      res.lottieAnims = L.getRegisteredAnimations().map(a => ({ name: a.name, renderer: a.renderer && a.renderer.rendererType, totalFrames: a.totalFrames, frameRate: a.frameRate, firstFrame: a.firstFrame, currentFrame: r2(a.currentFrame), isPaused: a.isPaused, loop: a.loop, autoplay: a.autoplay, playSpeed: a.playSpeed, wrapper: a.wrapper ? chain(a.wrapper).slice(0, 5) : null, animW: a.animationData && a.animationData.w, animH: a.animationData && a.animationData.h, assetsLen: a.animationData && a.animationData.assets && a.animationData.assets.length, layersLen: a.animationData && a.animationData.layers && a.animationData.layers.length, durationSec: a.totalFrames && a.frameRate ? r2(a.totalFrames / a.frameRate) : null, path: a.path || null }));
      res.lottieVersion = L.version || null;
    }
  } catch (e) { res.lottieErr = String(e); }
  res.alpine = { xData: document.querySelectorAll('[x-data]').length, xInit: document.querySelectorAll('[x-init]').length, xShow: document.querySelectorAll('[x-show]').length, xCloak: document.querySelectorAll('[x-cloak]').length, ver: window.Alpine && window.Alpine.version, sample: [...document.querySelectorAll('[x-data]')].slice(0, 6).map(e => short(e) + ' :: ' + e.getAttribute('x-data').slice(0, 100)) };
  // header and banner
  const hdr = document.querySelector('header');
  res.header = hdr ? { chain: chain(hdr), rect: hdr.getBoundingClientRect().toJSON(), sticky: (() => { let e = hdr; const o = []; while (e && e !== document.body) { const s = getComputedStyle(e); if (s.position !== 'static') o.push({ el: short(e), pos: s.position, top: s.top, z: s.zIndex, h: e.getBoundingClientRect().height, bg: s.backgroundColor, bd: s.borderBottom, shadow: s.boxShadow, bf: s.backdropFilter, tr: s.transition }); e = e.parentElement; } return o; })() } : null;
  // hero
  const h1 = document.querySelector('h1');
  res.h1chain = chain(h1);
  const heroSec = h1.closest('section') || h1.parentElement.parentElement;
  res.heroSection = { el: short(heroSec), rect: heroSec.getBoundingClientRect().toJSON(), style: cs(heroSec, ['background-color', 'background-image', 'padding-top', 'padding-bottom', 'min-height', 'height', 'display', 'overflow']) };
  const heroSvg = [...document.querySelectorAll('svg')].find(s => s.getBoundingClientRect().width > 700);
  if (heroSvg) {
    const p = heroSvg.parentElement;
    res.heroSvg = { chain: chain(heroSvg), rect: heroSvg.getBoundingClientRect().toJSON(), attrs: [...heroSvg.attributes].map(a => a.name + '=' + a.value.slice(0, 80)), parentAttrs: [...p.attributes].map(a => a.name + '=' + a.value.slice(0, 80)), paths: heroSvg.querySelectorAll('path').length, gradients: heroSvg.querySelectorAll('linearGradient,radialGradient').length, clipPaths: heroSvg.querySelectorAll('clipPath').length, masks: heroSvg.querySelectorAll('mask').length, images: heroSvg.querySelectorAll('image').length, filters: heroSvg.querySelectorAll('filter').length, texts: heroSvg.querySelectorAll('text').length, innerBytes: heroSvg.outerHTML.length, topGroupTransform: (heroSvg.querySelector('g') || {}).getAttribute && heroSvg.querySelector('g').getAttribute('transform'), hasSmil: heroSvg.querySelectorAll('animate,animateTransform,set').length, textSample: [...heroSvg.querySelectorAll('text')].slice(0, 12).map(t => t.textContent.trim().slice(0, 40)) };
  }
  // hero form
  const forms = [...document.querySelectorAll('form')].map(f => ({ chain: chain(f).slice(0, 6), rect: f.getBoundingClientRect().toJSON(), action: f.getAttribute('action'), method: f.method, id: f.id, cls: f.className.slice(0, 100), inputs: [...f.querySelectorAll('input,select,textarea,button')].map(i => ({ tag: i.tagName, type: i.type, name: i.name, req: i.required, ac: i.autocomplete, ph: i.placeholder, aria: i.getAttribute('aria-label'), id: i.id, label: i.labels && i.labels[0] ? i.labels[0].innerText.slice(0, 40) : null, text: i.tagName === 'BUTTON' ? i.innerText : undefined })) }));
  res.forms = forms;
  res.iframes = [...document.querySelectorAll('iframe')].map(f => ({ src: f.src.slice(0, 140), rect: f.getBoundingClientRect().toJSON(), title: f.title, loading: f.loading }));
  // videos
  res.videos = [...document.querySelectorAll('video')].map(v => { const s = getComputedStyle(v); return { chain: chain(v).slice(0, 6), src: v.currentSrc || v.src, srcAttr: v.getAttribute('src'), sources: [...v.querySelectorAll('source')].map(x => x.src + ' ' + x.type), poster: v.poster, preload: v.preload, autoplay: v.autoplay, loop: v.loop, muted: v.muted, playsInline: v.playsInline, readyState: v.readyState, paused: v.paused, currentTime: r2(v.currentTime), duration: v.duration, vw: v.videoWidth, vh: v.videoHeight, rect: v.getBoundingClientRect().toJSON(), absTop: r2(v.getBoundingClientRect().top + scrollY), display: s.display, visibility: s.visibility, opacity: s.opacity, objectFit: s.objectFit, controls: v.controls, buffered: v.buffered.length ? [r2(v.buffered.start(0)), r2(v.buffered.end(v.buffered.length - 1))] : null }; });
  // images
  res.imgs = [...document.querySelectorAll('img')].filter(i => !/Company_Logos/.test(i.currentSrc || i.src)).map(i => ({ src: (i.currentSrc || i.src).slice(0, 170), rect: [r2(i.getBoundingClientRect().left), r2(i.getBoundingClientRect().top + scrollY), r2(i.getBoundingClientRect().width), r2(i.getBoundingClientRect().height)], natural: [i.naturalWidth, i.naturalHeight], loading: i.loading, fp: i.getAttribute('fetchpriority'), decoding: i.decoding, hasSrcset: !!i.srcset, sizes: i.sizes && i.sizes.slice(0, 60), alt: i.alt.slice(0, 50), inPicture: !!i.closest('picture'), complete: i.complete }));
  res.logoImgs = { count: document.querySelectorAll('img[src*="Company_Logos"]').length, unique: new Set([...document.querySelectorAll('img[src*="Company_Logos"]')].map(i => i.src)).size, sample: (() => { const i = document.querySelector('img[src*="Company_Logos"]'); return i ? { rect: i.getBoundingClientRect().toJSON(), filter: getComputedStyle(i).filter, opacity: getComputedStyle(i).opacity, w: getComputedStyle(i).width } : null; })() };
  res.svgs = [...document.querySelectorAll('svg')].map(s => ({ chain: chain(s).slice(0, 3), rect: [r2(s.getBoundingClientRect().left), r2(s.getBoundingClientRect().top + scrollY), r2(s.getBoundingClientRect().width), r2(s.getBoundingClientRect().height)], paths: s.querySelectorAll('path').length })).filter(s => s.rect[2] > 20 && s.rect[3] > 20);
  res.bgUrls = [...document.querySelectorAll('*')].map(e => { const s = getComputedStyle(e); return s.backgroundImage && s.backgroundImage !== 'none' ? { el: short(e).slice(0, 80), bg: s.backgroundImage.slice(0, 200), rect: [r2(e.getBoundingClientRect().width), r2(e.getBoundingClientRect().height)] } : null; }).filter(Boolean).slice(0, 25);
  // sections
  const main = document.querySelector('main');
  res.sections = [...(main ? main.children : [])].map(c => { const s = getComputedStyle(c); const r = c.getBoundingClientRect(); return { el: short(c).slice(0, 90), top: r2(r.top + scrollY), h: r2(r.height), pt: s.paddingTop, pb: s.paddingBottom, bg: s.backgroundColor, bgImg: s.backgroundImage.slice(0, 60), h2: (c.querySelector('h1,h2,h3') || {}).innerText && c.querySelector('h1,h2,h3').innerText.slice(0, 50).replace(/\n/g, ' ') }; });
  // containers: widths of direct wrappers around headings
  const cont = {}; for (const h of document.querySelectorAll('h1,h2')) { let e = h.parentElement; for (let i = 0; i < 6 && e; i++) { const s = getComputedStyle(e); if (s.maxWidth !== 'none' && parseFloat(s.maxWidth) > 600) { cont[s.maxWidth + ' pad:' + s.paddingLeft] = (cont[s.maxWidth + ' pad:' + s.paddingLeft] || 0) + 1; break; } e = e.parentElement; } }
  res.containers = cont;
  // type roles
  const role = (sel) => { const e = document.querySelector(sel); if (!e) return null; return { text: e.innerText.slice(0, 50).replace(/\n/g, ' '), ...cs(e, ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'text-wrap', 'font-feature-settings', 'font-variant-numeric', 'text-transform']) }; };
  res.type = { h1: role('h1'), heroSub: (() => { const e = h1.parentElement.querySelector('p'); return e ? { text: e.innerText.slice(0, 50), ...cs(e, ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'max-width', 'text-wrap']) } : null; })(), h2: role('h2'), h3: role('main h3'), nav: (() => { const e = document.querySelector('header nav a, header a[href]'); return e ? { text: e.innerText.slice(0, 30), ...cs(e, ['font-size', 'font-weight', 'line-height', 'letter-spacing', 'color']) } : null; })() };
  // eyebrow + g2 badge
  const g2 = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /5 star reviews/.test(e.textContent));
  res.g2 = g2 ? { chain: chain(g2).slice(0, 5), ...cs(g2, ['font-size', 'color', 'font-weight']), parentHtml: g2.parentElement.outerHTML.replace(/\s+/g, ' ').slice(0, 600) } : null;
  // stats section numbers
  const stat = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /^6,000\+$/.test(e.textContent.trim()));
  res.stat = stat ? { chain: chain(stat).slice(0, 5), ...cs(stat, ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'font-variant-numeric', 'font-feature-settings', 'color']) } : null;
  // CSS vars on :root from CSSOM
  const vars = {};
  for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch { continue; } const walk = rs => { for (const r of rs) { if (r.cssRules && !(r instanceof CSSStyleRule)) { walk(r.cssRules); continue; } if (r instanceof CSSStyleRule && /^(:root|html|:host|\*)/.test(r.selectorText)) { for (const p of r.style) if (p.startsWith('--') && !/^--tw-/.test(p)) vars[p] = r.style.getPropertyValue(p).trim().slice(0, 90); } } }; walk(rules); }
  res.rootVars = { count: Object.keys(vars).length, names: Object.keys(vars).slice(0, 400), colorish: Object.fromEntries(Object.entries(vars).filter(([k]) => /color|bg|text|border|accent|brand|surface|ink|font|radius|spacing|container|ease|shadow|breakpoint/i.test(k)).slice(0, 160)) };
  res.twProps = [...document.styleSheets].reduce((n, sh) => { try { return n + [...sh.cssRules].filter(r => r.constructor.name === 'CSSPropertyRule' && /^--tw-/.test(r.name)).length; } catch { return n; } }, 0);
  res.fontFaces = [...document.styleSheets].flatMap(sh => { try { return [...sh.cssRules].filter(r => r instanceof CSSFontFaceRule).map(r => ({ family: r.style.getPropertyValue('font-family'), weight: r.style.getPropertyValue('font-weight'), style: r.style.getPropertyValue('font-style'), display: r.style.getPropertyValue('font-display'), src: r.style.getPropertyValue('src').slice(0, 200), range: r.style.getPropertyValue('unicode-range').slice(0, 40) })); } catch { return []; } });
  res.docFonts = [...document.fonts].map(f => ({ family: f.family, weight: f.weight, style: f.style, status: f.status }));
  res.hasHScroll = document.documentElement.scrollWidth > innerWidth;
  res.pageHeight = document.documentElement.scrollHeight;
  return res;
});

out.resources = await page.evaluate(() => performance.getEntriesByType('resource').filter(e => /iru\.com|jsdelivr/.test(e.name) && !/hs-analytics|clarity/.test(e.name)).map(e => ({ n: e.name.replace('https://www.iru.com', '').slice(0, 150), t: e.initiatorType, enc: e.encodedBodySize, xfer: e.transferSize, dec: e.decodedBodySize, st: Math.round(e.startTime), d: Math.round(e.duration), proto: e.nextHopProtocol })));
out.hooks = await page.evaluate(() => ({ raf: window.__h.raf, canvas: window.__h.canvas, io: window.__h.io, animate: window.__h.animate }));
// idle rAF attribution: window of 2s
const a0 = await page.evaluate(() => JSON.parse(JSON.stringify(window.__h.raf)));
await sleep(2000);
const a1 = await page.evaluate(() => JSON.parse(JSON.stringify(window.__h.raf)));
out.rafIdle2s = { total: a1.total - a0.total, by: Object.fromEntries(Object.entries(a1.by).map(([k, v]) => [k, v - (a0.by[k] || 0)]).filter(([, v]) => v > 0)) };

// css greps
const cssAll = Object.entries(bodies).filter(([, b]) => b.rt === 'stylesheet').map(([u, b]) => ({ u: u.replace('https://www.iru.com', '').slice(0, 130), size: b.size, text: b.text }));
out.cssFiles = cssAll.map(c => ({ u: c.u, size: c.size }));
const inline = await page.evaluate(() => [...document.querySelectorAll('style')].map(s => s.textContent).join('\n'));
const hay = cssAll.map(c => c.text).join('\n') + '\n' + inline;
const count = re => (hay.match(re) || []).length;
out.cssGrep = {
  animationTimeline: count(/animation-timeline/g), viewTimeline: count(/view-timeline|scroll-timeline/g), viewTransition: count(/view-transition/g), startingStyle: count(/@starting-style/g), interpolateSize: count(/interpolate-size/g), atProperty: count(/@property/g), twProps: count(/@property\s+--tw-/g), tailwindV4: /tailwindcss v4/i.test(hay) || /@layer\s+theme/.test(hay), tailwindBanner: (hay.match(/tailwindcss v[\d.]+/i) || [null])[0],
  keyframes: [...new Set([...hay.matchAll(/@keyframes\s+([\w-]+)/g)].map(m => m[1]))],
  scrollBehaviorSmooth: count(/scroll-behavior:\s*smooth/g), scrollSnap: count(/scroll-snap-type/g), mixBlend: count(/mix-blend-mode/g),
  rmContexts: [...hay.matchAll(/prefers-reduced-motion[^{]*\{/g)].map(m => hay.slice(m.index, m.index + 420).replace(/\s+/g, ' ')),
  marqueeRules: [...hay.matchAll(/marquee[^{]*\{[^}]*\}/g)].slice(0, 8).map(m => m[0].slice(0, 300)),
  keyframesMarquee: [...hay.matchAll(/@keyframes\s+marquee[\w-]*\s*\{[\s\S]{0,400}/g)].slice(0, 3).map(m => m[0].replace(/\s+/g, ' ').slice(0, 350)),
  gradients: count(/(linear|radial|conic)-gradient\(/g), backdropFilter: count(/backdrop-filter/g),
};
// js greps (first party)
const jsBodies = Object.entries(bodies).filter(([, b]) => b.rt === 'script');
out.firstPartyJs = jsBodies.map(([u, b]) => {
  const t = b.text; const g = re => (t.match(re) || []).length; const ctx = (re, n = 160) => { const m = t.match(re); if (!m) return null; const i = m.index; return t.slice(Math.max(0, i - n), i + n).replace(/\s+/g, ' '); };
  return { u: u.replace('https://www.iru.com', '').slice(0, 130), size: b.size, lottieWeb: g(/lottie-web|bodymovin/gi), loadAnimation: g(/loadAnimation/g), dotlottie: g(/dotlottie/gi), alpine: g(/Alpine/g), gsap: g(/gsap|ScrollTrigger/gi), lenis: g(/lenis/gi), io: g(/IntersectionObserver/g), scrollListeners: g(/addEventListener\(["']scroll/g), raf: g(/requestAnimationFrame/g), svgRenderer: g(/svg/g), version: (t.match(/\/\*!?[\s\S]{0,200}?(lottie|bodymovin|alpine)[\s\S]{0,200}?\*\//i) || [null])[0], head: t.slice(0, 260).replace(/\s+/g, ' '), ioCtx: ctx(/IntersectionObserver/), scrollCtx: ctx(/addEventListener\(["']scroll/, 260), lottieCtx: ctx(/loadAnimation/, 260) };
});
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
await browser.close();
console.log('ok', OUT, Object.keys(bodies).length);
