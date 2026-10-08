import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
async function run(w, h, mobile) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(3000);
  const r = await page.evaluate(() => {
    const T = e => { if (!e) return null; const s = getComputedStyle(e); return { fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color, tt: s.textTransform, ff: s.fontFamily.split(',')[0], fnum: s.fontVariantNumeric, tw: s.textWrap, w: Math.round(e.getBoundingClientRect().width), sample: (e.innerText || '').slice(0, 40) }; };
    const find = (sel, re) => [...document.querySelectorAll(sel)].find(e => re.test((e.innerText || '').trim()));
    const out = {};
    out.h1 = T(document.querySelector('h1'));
    out.sub = T(document.querySelector('h1').nextElementSibling);
    out.h2_how = T(find('h2', /How Pexo Delivers/));
    out.h2_lead = T(find('h2', /How Pexo Delivers/).nextElementSibling);
    out.eyebrow = T(find('p,span,div', /^WHAT YOU CAN CREATE$/i));
    out.h2_kinds = T(find('h2', /One agent/));
    out.stepTitle = T(find('button', /^Start with an idea/)?.querySelector('*'));
    out.stepDesc = T(find('button', /^Start with an idea/)?.querySelector('p, div:last-child, span:last-child'));
    out.tab = T(find('button', /^MG Explainer/));
    out.cardTitleMore = T(find('h3', /^Text to video/));
    out.cardDescMore = T(find('h3', /^Text to video/)?.nextElementSibling);
    out.faqQ = T(find('summary, button, h3', /^What can I use Pexo for/));
    out.footerLink = T(find('footer a', /^Pricing/));
    out.footerHead = T(find('footer *', /^About Us$/));
    out.navLink = T(find('header a', /^Pricing/));
    out.cta = T(find('header button', /^Get Started/));
    out.ctaBig = T(find('a,button', /^Start for Free/));
    out.cardLabel = T([...document.querySelectorAll('.scrollbar-hide.overflow-x-auto button span')].find(s => /video|explainer/i.test(s.innerText)));
    out.promptText = T(document.querySelector('textarea'));
    out.gradText = (() => { const g = document.querySelector('span[class*="from-[#c641ff]"]'); if (!g) return null; const s = getComputedStyle(g); return { bgi: s.backgroundImage, clip: s.webkitBackgroundClip, color: s.color, fw: s.fontWeight }; })();
    out.tiers = null;
    // CSS variables on :root
    const vars = {}; for (const ss of document.styleSheets) { try { for (const rule of ss.cssRules) { if (rule.selectorText && /^(:root|html|:host)/.test(rule.selectorText)) { for (const p of rule.style) if (p.startsWith('--landing') || p.startsWith('--color') || p.startsWith('--background') || p.startsWith('--foreground')) vars[p] = rule.style.getPropertyValue(p).trim(); } if (rule.cssRules) for (const r2 of rule.cssRules) { if (r2.selectorText && /^(:root|html)/.test(r2.selectorText)) for (const p of r2.style) if (p.startsWith('--landing')) vars[p] = r2.style.getPropertyValue(p).trim(); } } } catch (e) {} }
    out.vars = vars;
    // card tints in "gets it done" section
    out.tints = [...document.querySelectorAll('main section')].filter(s => /Gets It Done/.test(s.innerText)).flatMap(s => [...s.querySelectorAll('div')].filter(d => { const bg = getComputedStyle(d).backgroundColor; return bg !== 'rgba(0, 0, 0, 0)' && d.getBoundingClientRect().width > 300 && d.getBoundingClientRect().height > 300; }).map(d => getComputedStyle(d).backgroundColor + ' r=' + getComputedStyle(d).borderRadius)).slice(0, 6);
    // radii and shadows in use (sample)
    const rad = {}, sh = {}; document.querySelectorAll('main *, header *, footer *').forEach(e => { const s = getComputedStyle(e); if (s.borderRadius !== '0px') rad[s.borderRadius] = (rad[s.borderRadius] || 0) + 1; if (s.boxShadow !== 'none') { const k = s.boxShadow.slice(0, 70); sh[k] = (sh[k] || 0) + 1; } });
    out.radii = Object.entries(rad).sort((a, b) => b[1] - a[1]).slice(0, 7); out.shadows = Object.entries(sh).sort((a, b) => b[1] - a[1]).slice(0, 5);
    // number of distinct font sizes and weights on the page
    const fs = {}, fw = {}; document.querySelectorAll('main *').forEach(e => { if (!e.childNodes.length) return; const hasText = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()); if (!hasText) return; const s = getComputedStyle(e); fs[s.fontSize] = (fs[s.fontSize] || 0) + 1; fw[s.fontWeight] = (fw[s.fontWeight] || 0) + 1; });
    out.fontSizes = Object.entries(fs).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])).map(([k, v]) => k + 'x' + v).join(' '); out.fontWeights = fw;
    return out;
  });
  await ctx.close();
  return r;
}
const d = await run(1440, 900, false);
console.log('=== DESKTOP'); console.log(JSON.stringify(d, null, 0).replace(/\},"/g, '},\n"'));
const m = await run(390, 844, true);
console.log('=== MOBILE h1/sub/h2/lead/faq'); console.log(JSON.stringify({ h1: m.h1, sub: m.sub, h2_how: m.h2_how, h2_kinds: m.h2_kinds, fontSizes: m.fontSizes }));
await browser.close();
