// legora.com: (a) aOS pill expansion: which properties change and how long, sampled per frame after a scroll jump;
// (b) scroll-reveal check: does below-the-fold content fade or move in when it enters the viewport?
// Observation only (native scrollTo + rAF sampling). Usage: node s7-pills-reveal.mjs <outDir>
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const RES = {};
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://legora.com/', { waitUntil: 'load' });
await sleep(5000);

// (a) pills
await page.evaluate(() => window.scrollTo(0, 2300)); await sleep(1800);
RES.pills = await page.evaluate(async () => {
  const pills = [...document.querySelectorAll('a')].filter(a => /^#aos|\.\/#aos/.test(a.getAttribute('href') || '') || (a.getAttribute('href') || '').startsWith('./#aos'));
  const snap = () => pills.map(p => { const r = p.getBoundingClientRect(); return [Math.round(r.width * 10) / 10, Math.round(r.height * 10) / 10]; });
  const start = snap(); const rows = []; const t0 = performance.now(); let last = JSON.stringify(start);
  window.scrollTo(0, 2800);
  await new Promise(res => { const tick = () => { const t = performance.now() - t0; const s = snap(); const k = JSON.stringify(s); if (k !== last) { rows.push([Math.round(t), s.map(x => x.join('x')).join(' ')]); last = k; } if (t < 1800) requestAnimationFrame(tick); else res(); }; tick(); });
  const cs = pills.slice(0, 2).map(p => { const s = getComputedStyle(p); const d = p.querySelector('div'); return { willChange: s.willChange, overflow: s.overflow }; });
  return { n: pills.length, start: start.map(x => x.join('x')).join(' '), changes: rows.slice(0, 40), nChanges: rows.length, cs };
});

// (b) reveal check at three sections
const reveal = async (label, yJump, textMatch) => page.evaluate(async ([yJump, textMatch]) => {
  const el = [...document.querySelectorAll('h3,p')].find(e => e.textContent.trim().startsWith(textMatch));
  if (!el) return { error: 'el not found' };
  const eff = n => { let op = 1, tr = null, d = 0; while (n && n !== document.documentElement && d < 12) { const s = getComputedStyle(n); op *= parseFloat(s.opacity); if (!tr && s.transform !== 'none') tr = s.transform; n = n.parentElement; d++; } return { op: +op.toFixed(3), tr }; };
  const before = eff(el); const rows = []; const t0 = performance.now(); let last = '';
  window.scrollTo(0, yJump);
  await new Promise(res => { const tick = () => { const t = performance.now() - t0; const e = eff(el); const k = JSON.stringify(e); if (k !== last) { rows.push([Math.round(t), e]); last = k; } if (t < 1200) requestAnimationFrame(tick); else res(); }; tick(); });
  return { before, rows: rows.slice(0, 8) };
}, [yJump, textMatch]);
await page.evaluate(() => window.scrollTo(0, 100)); await sleep(500);
RES.reveal = {};
RES.reveal.latestH3 = await reveal('latest', 6500, 'Our latest innovations');
RES.reveal.cardsBody = await reveal('cards', 7000, 'End-to-end execution');
RES.reveal.everyH3 = await reveal('every', 7600, 'Every team.');
RES.reveal.vision = await reveal('vision', 10300, 'Our Vision');
RES.reveal.security = await reveal('security', 11300, 'Compliant with');
fs.writeFileSync(path.join(out, 's7-results.json'), JSON.stringify(RES, null, 1));
console.log(JSON.stringify(RES).slice(0, 3500));
await browser.close();
