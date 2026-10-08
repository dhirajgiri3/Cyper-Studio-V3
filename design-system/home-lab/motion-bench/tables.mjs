// Turns results/*.json into markdown tables for MOTION_STACK_REPORT.md and HERO_REPORT.md. No numbers are typed by hand.
import fs from 'node:fs';
const R = f => { try { return JSON.parse(fs.readFileSync(`results/${f}`, 'utf8')); } catch { return null; } };
const kb = b => (b / 1024).toFixed(1);
const out = [];
const t = (title, head, rows) => { out.push(`### ${title}\n\n| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map(r => '| ' + r.join(' | ') + ' |').join('\n')}\n`); };
const bs = R('bundle-sizes.json');
if (bs) t('Bytes (built by esbuild, tree-shaken, minified; gzip level 9, brotli quality 11)', ['Candidate', 'JS before first paint gz', 'JS loaded after `load` gz', 'JS total gz', 'JS total br', 'CSS gz', 'HTML gz'],
  ['s0', 's1', 's2', 's3', 's4'].map(k => { const v = bs.totals[k]; return [k.toUpperCase(), kb(v.jsBeforeFirstPaint.gzip) + ' KB', kb(v.jsAfterLoad.gzip) + ' KB', kb(v.jsTotal.gzip) + ' KB', kb(v.jsTotal.brotli) + ' KB', kb(v.css.gzip) + ' KB', kb(v.html.gzip) + ' KB']; }));
const lhRows = ids => ids.map(id => { const r = R(`lh-${id}.json`); if (!r) return [id, 'NOT RUN']; const m = r.median; return [id, r.runs.map(x => x.perf).join(', '), m.perf, (m.fcp / 1000).toFixed(2) + ' s', (m.lcp / 1000).toFixed(2) + ' s', Math.round(m.tbt) + ' ms', m.cls, (m.si / 1000).toFixed(2) + ' s', kb(m.scriptBytes) + ' KB', kb(m.bytesTotal) + ' KB']; });
const LHH = ['ID', 'perf, 5 runs', 'median perf', 'FCP', 'LCP', 'TBT', 'CLS', 'Speed Index', 'script transfer', 'total transfer'];
t('Lighthouse mobile (default simulated 4G + 4x CPU slowdown), 5 runs, medians', LHH, lhRows(['s0', 's1', 's2', 's3', 's4']));
t('Atmosphere variants, Lighthouse mobile, 5 runs', LHH, lhRows(['atmos-none', 'atmos-webp', 'atmos-webp-grain', 'atmos-video', 'atmos-webgl']));
t('Heroes and baseline, Lighthouse mobile, 5 runs', LHH, lhRows(['hero-a', 'hero-b', 'hero-c', 'hero-d', 'baseline']));
const perfRows = (ids, mobile) => ids.map(id => { const r = R(`perf-${id}${mobile ? '-mobile' : ''}.json`); if (!r) return [id, 'NOT RUN']; const m = r.median; return [id, m.tbtLoadMs + ' ms', m.tbtSessionMs + ' ms', m.maxLongTask + ' ms', m.inpMs + ' ms', m.cls, m.frameP95 + ' ms', m.frameP99 + ' ms', m.pctOver33 + '%', m.droppedFrames, m.scriptMs + ' ms']; });
const PH = ['ID', 'TBT load', 'TBT whole session', 'longest task', 'INP (scripted)', 'CLS', 'frame p95', 'frame p99', 'frames >33 ms', 'dropped frames', 'script time'];
t('CPU 4x throttle, desktop viewport 1280x720, scripted wheel scroll then interactions, medians of 3', PH, perfRows(['s0', 's1', 's2', 's3', 's4']));
t('CPU 4x throttle, mobile viewport 390x844, touch scroll gestures, medians of 3', PH, perfRows(['s0', 's1', 's2', 's3', 's4'], true));
t('S0 forced to its JS fallback path (`?fallback=1`), desktop', PH, perfRows(['s0-fallback']));
t('Atmosphere, CPU 4x, desktop, medians of 3', PH, perfRows(['atmos-none', 'atmos-webp', 'atmos-webp-grain', 'atmos-video', 'atmos-webgl']));
const aRows = ['s0', 's1', 's2', 's3', 's4'].map(id => { const a = R(`a11y-${id}.json`); if (!a) return [id, 'NOT RUN']; const k = a.keyboardScroll.expect; const under = Object.entries(a.anchors).filter(([, v]) => v.hiddenUnderHeader).map(([h]) => h).join(', ') || 'none'; const f = a.findInPage; return [id.toUpperCase(), `${k.spaceMoved ? 'Y' : 'N'}/${k.pageDownMoved ? 'Y' : 'N'}/${k.endReachedMax ? 'Y' : 'N'}/${k.homeReachedZero ? 'Y' : 'N'}`, under, Object.entries(f).map(([t2, v]) => `${t2}: ${v.visuallyReadable ? 'readable' : v.found ? 'found, not readable' : 'not found'}`).join('<br>'), a.reducedMotion.runningAnimations + ' anim, steps overlap ' + a.reducedMotion.stepsOverlap + ', lenis ' + a.reducedMotion.lenisActive + ', pins ' + a.reducedMotion.gsapPins, a.jsOff.litWordsMinOpacityAtParagraphEnd + ' / overlap ' + a.jsOff.stepsOverlap, a.touch.resultingDeltas.join(', ') + ' (sent 600)', a.zoom200.docOverflowX + ' px; steps ' + a.zoom200.stepBoxes.map(s => s.fitsInBox ? 'fit' : 'CLIPPED').join('/')]; });
t('Accessibility and robustness (one scripted pass per candidate)', ['ID', 'Space/PageDown/End/Home work', 'anchors landing under sticky header', 'find-in-page (window.find)', 'reduced motion', 'JS off: lit words min opacity at paragraph end', 'touch: px moved per 600 px gesture', '200% zoom: horizontal overflow; step text in box'], aRows);
fs.writeFileSync('results/tables.md', out.join('\n'));
console.log('wrote results/tables.md', out.length, 'tables');
