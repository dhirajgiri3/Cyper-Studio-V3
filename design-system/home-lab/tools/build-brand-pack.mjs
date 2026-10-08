// Generates the brand proposals: compact-mark concepts (SVG) and brand/index.html (audit page).
// Inputs: brand/helix-wordmark.{faithful,proposal}.svg (built by build-wordmark-svg.mjs), assets-inbox/brand/cyper-*.svg,
// brand/palette-measurements.json, brand/wordmark-measurements*.json. Nothing here edits the supplied files.
import fs from 'node:fs';
const B = '../brand';
const rd = p => fs.readFileSync(p, 'utf8');
const paths = svg => Object.fromEntries([...svg.matchAll(/<path id="(\w)" d="([^"]+)"\/>/g)].map(m => [m[1], m[2]]));
const faithful = paths(rd(`${B}/helix-wordmark.faithful.svg`));
const proposal = paths(rd(`${B}/helix-wordmark.proposal.svg`));
const vb = svg => rd(svg).match(/viewBox="([^"]+)"/)[1];
const vbF = vb(`${B}/helix-wordmark.faithful.svg`), vbP = vb(`${B}/helix-wordmark.proposal.svg`);
const BLUE = '#4161F4';
const pal = JSON.parse(rd(`${B}/palette-measurements.json`));
const wm = JSON.parse(rd(`${B}/wordmark-measurements-subpixel.json`));
const wmFit = JSON.parse(rd(`${B}/wordmark-fit-report.json`));

// ---- compact mark concepts (exploration only) ----
const Hpath = faithful.H;
const r = 120; // C3 outer-left corner radius
const H3 = `M${56 + r} 125H232.7V397.5H459.7V125H635.7V801.5H459.7V564.7H232.7V801.5H${56 + r}A${r} ${r} 0 0 1 56 ${801.5 - r}V${125 + r}A${r} ${r} 0 0 1 ${56 + r} 125Z`;
const Xpath = faithful.X;
const mark = (d, box, fg, bg, rx = 0.22) => {
  const [x, y, w, h] = box; const s = Math.max(w, h) * 1.26; const cx = x + w / 2, cy = y + h / 2;
  const vx = cx - s / 2, vy = cy - s / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx.toFixed(1)} ${vy.toFixed(1)} ${s.toFixed(1)} ${s.toFixed(1)}" aria-hidden="true"><rect x="${vx.toFixed(1)}" y="${vy.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" rx="${(s * rx).toFixed(1)}" fill="${bg}"/><path d="${d}" fill="${fg}"/></svg>`;
};
const boxH = [56, 125, 579.7, 676.5], boxX = [1870, 124.5, 566.9, 677];
const concepts = {
  'c1-h': { name: 'C1  H', note: 'The wordmark H, unchanged, centred in a rounded tile. Zero invention: it is the first letter of the supplied artwork.', svg: mark(Hpath, boxH, '#fff', BLUE) },
  'c2-x': { name: 'C2  X', note: 'The wordmark X, unchanged. The crossing is the most distinctive letterform, but a lone X reads as "X", not HELIX.', svg: mark(Xpath, boxX, '#fff', BLUE) },
  'c3-h-round': { name: 'C3  H, rounded left', note: 'The H with the wordmark\'s rounded outer-left corner (as on E and L) applied to its left stem. A design decision, not a given.', svg: mark(H3, boxH, '#fff', BLUE) },
};
for (const [k, c] of Object.entries(concepts)) fs.writeFileSync(`${B}/helix-mark.${k}.svg`, c.svg + '\n');
// plain (no tile) versions for the nav at 20-32 px
const bare = (d, box, fill) => { const [x, y, w, h] = box; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" aria-hidden="true"><path d="${d}" fill="${fill}"/></svg>`; };

// ---- Cyper mark (supplied SVG, tight viewBox only; the supplied files are untouched) ----
const cyperD = rd('../../../assets-inbox/brand/cyper-dark-logo.svg');
const cyperInner = cyperD.replace(/<svg[^>]*>/, '').replace('</svg>', '').trim();
const cyperAt = (fill, px) => `<svg width="${px}" height="${px}" viewBox="40 40 152 152" aria-hidden="true">${cyperInner.replace(/fill="black"/g, `fill="${fill}"`)}</svg>`;

// ---- wordmark helpers ----
const wmSvg = (paths, vbox, fill, h) => { const [, , w, hh] = vbox.split(' ').map(Number); return `<svg viewBox="${vbox}" height="${h}" width="${(h * w / hh).toFixed(1)}" role="img" aria-label="HELIX"><g fill="${fill}">${Object.values(paths).map(d => `<path d="${d}"/>`).join('')}</g></svg>`; };

const bgs = [['White', '#FFFFFF', '#121820'], ['Mist', '#F3F5F8', '#121820'], ['Navy', '#101C2E', '#FFFFFF'], ['HELIX blue', BLUE, '#FFFFFF']];
const cr = (a, b) => { const l = h => { h = h.replace('#', ''); const c = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }; const [x, y] = [l(a), l(b)].sort((p, q) => q - p); return ((x + 0.05) / (y + 0.05)).toFixed(2); };

const cyperTest = bgs.map(([n, bg, fg]) => `<div class="tile" style="background:${bg};color:${fg}"><b>${n} <i>${bg}</i></b><div class="row">${[16, 24, 48].map(px => `<span class="cell">${cyperAt(fg, px)}<small>${px}px</small></span>`).join('')}</div><small class="c">mark ${fg === '#FFFFFF' ? 'white' : 'dark'} on ${bg}: ${cr(fg, bg)}:1</small></div>`).join('');

const sizesRow = (svgFn, label) => `<div class="mrow"><span class="lab">${label}</span>${[16, 24, 32, 48].map(px => `<span class="cell">${svgFn(px)}<small>${px}px</small></span>`).join('')}</div>`;
const tile = (svg, px) => svg.replace('<svg ', `<svg width="${px}" height="${px}" `);

const compactBlock = Object.entries(concepts).map(([k, c]) => `
  <article class="concept"><h4>${c.name}</h4><p>${c.note}</p>
    <div class="mrow">${[16, 24, 32, 48, 96].map(px => `<span class="cell">${tile(c.svg, px)}<small>${px}px</small></span>`).join('')}</div>
    <div class="mrow on-white">${[16, 32].map(px => `<span class="cell">${tile(bare(k === 'c3-h-round' ? H3 : k === 'c2-x' ? Xpath : Hpath, k === 'c2-x' ? boxX : boxH, BLUE), px)}<small>bare ${px}</small></span>`).join('')}</div>
  </article>`).join('');

const html = `<!doctype html>
<html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>HELIX brand audit (lab, not locked)</title>
<meta name="robots" content="noindex">
<style>
@font-face{font-family:Geist;src:url(../../fonts/Geist-Variable.subset.woff2) format("woff2");font-weight:100 900;font-display:swap}
@font-face{font-family:"Geist Mono";src:url(../../fonts/GeistMono-Variable.subset.woff2) format("woff2");font-weight:100 900;font-display:swap}
:root{color-scheme:light;--ink:#121820;--ink2:#3A4452;--ink3:#5E6979;--mist:#F3F5F8;--line:#E2E6EC;--blue:${BLUE}}
*{box-sizing:border-box}body{margin:0;font:16px/1.55 Geist,system-ui,sans-serif;color:var(--ink);background:#fff}
main{width:min(100% - 40px,1160px);margin:0 auto;padding:40px 0 96px}
h1{font-size:34px;letter-spacing:-.03em;margin:0 0 6px}h2{font-size:24px;letter-spacing:-.02em;margin:56px 0 8px;padding-top:24px;border-top:1px solid var(--ink)}h3{font-size:18px;margin:28px 0 8px}h4{margin:0 0 4px;font-size:16px}
p{max-width:70ch;color:var(--ink2);margin:0 0 12px}small,.mono{font-family:"Geist Mono",ui-monospace,monospace;font-size:12px;color:var(--ink3)}
.badge{display:inline-block;font:500 12px "Geist Mono",monospace;padding:3px 8px;border:1px solid var(--line);border-radius:6px;color:var(--ink3);margin-bottom:12px}
.grid{display:grid;gap:16px}.g2{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}
@media(max-width:820px){.g2,.g3,.g4{grid-template-columns:1fr 1fr}}@media(max-width:520px){.g2,.g3,.g4{grid-template-columns:1fr}}
.card{border:1px solid var(--line);border-radius:10px;padding:20px;background:#fff}
.stage{position:relative;border:1px solid var(--line);border-radius:10px;background:#fff;padding:24px;overflow:hidden}
.stage img,.stage svg{display:block}
.stack{position:relative}.stack>*{position:absolute;inset:0;width:100%;height:100%}
table{border-collapse:collapse;width:100%;font-size:14px}th,td{text-align:left;padding:8px 10px;border-top:1px solid var(--line)}th{font:500 12px "Geist Mono",monospace;color:var(--ink3);border-top:0}td.n,th.n{text-align:right;font-family:"Geist Mono",monospace}
.pass{color:#0F7A4E}.fail{color:#B42318}.warn{color:#9A6700}
.tile{border:1px solid var(--line);border-radius:10px;padding:16px;display:grid;gap:12px}.tile b{font-weight:500}.tile i{font-style:normal;font:12px "Geist Mono",monospace;opacity:.7}.tile small{color:inherit;opacity:.85}
.row,.mrow{display:flex;gap:18px;align-items:flex-end;flex-wrap:wrap}.cell{display:grid;gap:6px;justify-items:center}.cell small{opacity:.8;color:inherit}.mrow{padding:10px 0}.mrow .lab{width:120px;font:12px "Geist Mono",monospace;color:var(--ink3)}
.on-white{background:#fff}.sw{display:flex;align-items:center;gap:10px;margin:4px 0}.sw i{width:28px;height:28px;border-radius:6px;border:1px solid rgba(0,0,0,.12);flex:none}
.lock{display:flex;align-items:center;gap:12px;padding:16px 0;border-top:1px solid var(--line)}
.concept{border:1px solid var(--line);border-radius:10px;padding:16px}
.note{border-left:3px solid var(--blue);padding:8px 14px;background:var(--mist);margin:12px 0}
.guide{stroke:#E5484D;stroke-width:1.5;stroke-dasharray:6 4;fill:none}
code{font:13px "Geist Mono",monospace;background:var(--mist);padding:1px 5px;border-radius:4px}
</style></head><body><main>
<span class="badge">LAB · PROPOSAL · NOTHING LOCKED</span>
<h1>HELIX brand audit</h1>
<p>Brief 01 v2.1, Section 2. Supplied files are untouched in <code>assets-inbox/brand/</code>. Everything on this page is a proposal until the founder replies <code>LOCK HOME v1</code>. Measurements come from <code>tools/wordmark-audit*.mjs</code>, <code>tools/build-wordmark-svg.mjs</code>, <code>tools/palette.mjs</code>; numbers are in <code>brand/*.json</code>.</p>

<h2>1 · Wordmark: measured, then vectorised</h2>
<div class="grid g2">
  <div class="card"><h3 style="margin-top:0">Measured in the supplied raster (2500 × 1000)</h3>
    <table><thead><tr><th>Letter</th><th class="n">top y</th><th class="n">bottom y</th><th class="n">height</th></tr></thead><tbody>
    ${['H', 'E', 'L', 'I', 'X'].map(k => `<tr><td>${k}</td><td class="n ${k === 'L' ? 'fail' : ''}">${wm[k].topEdgeMedian}</td><td class="n">${wm[k].botEdgeMedian}</td><td class="n">${(wm[k].botEdgeMedian - wm[k].topEdgeMedian).toFixed(1)}</td></tr>`).join('')}
    </tbody></table>
    <p style="margin-top:12px">Common cap line is 125.0 (H and E). L rises <b>6.5 px</b> above it (0.96% of cap height); I and X sit 1.5 px and 1.0 px high. Baseline: 801.5, E 802.0. The brief estimated "about 4 px"; the measurement is 6.5 px.</p></div>
  <div class="card"><h3 style="margin-top:0">Minimum facing gaps (px) and optical gap</h3>
    <table><thead><tr><th>Pair</th><th class="n">min gap</th><th class="n">optical (cap 30)</th></tr></thead><tbody>
    ${wm.opticalGaps.map(g => `<tr><td>${g.pair}</td><td class="n ${g.pair === 'LI' ? 'warn' : ''}">${g.minGap}</td><td class="n">${g.meanGap_cap30}</td></tr>`).join('')}
    </tbody></table>
    <p style="margin-top:12px"><b>The E–L gap is not tighter than the others</b> (47.1 vs H–E 46.6). The loosest pair is <b>L–I</b> (57.7 geometric, 80.4 optical vs ~60 for H–E and E–L), because the L's open right side leaves a large void above its foot.</p></div>
</div>
<h3>Before and after</h3>
<div class="grid g3">
  <div class="stage"><span class="badge">BEFORE · supplied PNG</span><div class="stack" style="aspect-ratio:2381/684"><img alt="HELIX wordmark as supplied" src="../../../assets-inbox/brand/helix-wordmark.original.png" style="width:calc(2500/2381*100%);height:auto;position:absolute;left:calc(-56/2381*100%*2500/2500 - 0%);top:-17.3%;"></div></div>
  <div class="stage"><span class="badge">R0 · faithful vector</span>${wmSvg(faithful, vbF, BLUE, 96).replace('height="96"', 'style="width:100%;height:auto"')}<small>IoU against the raster ${wmFit.IoU}; X deviates up to ~1.7 px (original is not symmetric)</small></div>
  <div class="stage"><span class="badge">R1 · proposal (needs founder agreement)</span>${wmSvg(proposal, vbP, BLUE, 96).replace('height="96"', 'style="width:100%;height:auto"')}<small>common cap line 125.0 and baseline 801.5; all four minimum gaps = 46.6 (L–I −11.1, I–X shifts accumulate); 17.5 px narrower overall</small></div>
</div>
<div class="note"><b>Overlay check.</b> Red dashed lines mark the common cap line (y 125.0) and baseline (801.5). Left: supplied raster (L pokes above). Right: R1.</div>
<div class="grid g2">
  <div class="stage"><svg viewBox="0 100 2500 720" width="100%"><image href="../../../assets-inbox/brand/helix-wordmark.original.png" x="0" y="0" width="2500" height="1000"/><line class="guide" x1="0" x2="2500" y1="125" y2="125"/><line class="guide" x1="0" x2="2500" y1="801.5" y2="801.5"/></svg></div>
  <div class="stage"><svg viewBox="${(+vbP.split(' ')[0] - 40)} 100 ${(+vbP.split(' ')[2] + 80)} 720" width="100%"><g fill="${BLUE}">${Object.values(proposal).map(d => `<path d="${d}"/>`).join('')}</g><line class="guide" x1="0" x2="2500" y1="125" y2="125"/><line class="guide" x1="0" x2="2500" y1="801.5" y2="801.5"/></svg></div>
</div>
<h3>Is it a licensed typeface, a custom drawing, or unknown?</h3>
<p><b>Unknown. I will not guess a font name.</b> Evidence only: stems are uniform (176 to 178 px on H, L, I); the E and L share a rounded outer-left corner but with <em>different</em> radii (E ≈ 237, L ≈ 212, both measured); the X has arcs of r ≈ 176 (one stem width) and r ≈ 62, with diagonals at 47° (outer) and 48° (inner); the L's top edge and the E's bottom edge are off the shared lines by 6.5 px and 0.5 px. A font file would normally put flat caps on one cap line, so these offsets look like hand drawing or a trace. <b>Question for the founder:</b> who drew it, and is there an original vector (AI, Figma, SVG) or a font name?</p>

<h2>2 · Compact mark (exploration only)</h2>
<p>The wordmark is 3.5:1 wide. At a 16 px favicon its cap height would be about 4.6 px, so it will not survive. A compact mark is needed for favicon, app icon and social avatar; the nav can keep the wordmark (a 20 px cap height is about 70 px wide). Three concepts, all derived from the supplied letterforms. <b>Recommendation: C1</b> (no invention) unless the founder wants a device of their own.</p>
<div class="grid g3">${compactBlock}</div>

<h2>3 · Two brands, one page</h2>
<p>HELIX is the product and carries the colour. Cyper Studio is the company and stays neutral (ink or white), never blue, never larger than the wordmark. The supplied Cyper SVGs have 40-unit padding on a 232 grid; the page crops with <code>viewBox="40 40 152 152"</code> only.</p>
<div class="grid g4">${cyperTest}</div>
<h3>Lockup proposals</h3>
<div class="card">
  <div class="lock">${wmSvg(faithful, vbF, BLUE, 20)}<span style="color:var(--ink3);font-size:13px">by</span>${cyperAt('#121820', 14)}<span style="font-size:13px;color:var(--ink2)">Cyper Studio</span><small>NAV · wordmark cap 20 px, mark 14 px (70%)</small></div>
  <div class="lock">${wmSvg(faithful, vbF, BLUE, 20)}<span style="width:1px;height:16px;background:var(--line)"></span>${cyperAt('#121820', 12)}<small>NAV alt · mark only, 12 px (60%); name in the accessible label</small></div>
  <div class="lock" style="background:var(--mist);padding:16px"><span style="font-size:14px;color:var(--ink2)">Built by</span>${cyperAt('#121820', 24)}<span style="font-weight:600">Cyper Studio</span><small>FOOTER / BUILT-BY SECTION · mark 24 px beside the name</small></div>
  <div class="lock" style="background:${BLUE};padding:16px;border-radius:8px"><span style="font-size:14px;color:#fff">Built by</span>${cyperAt('#FFFFFF', 24)}<span style="font-weight:600;color:#fff">Cyper Studio</span><small style="color:#fff">on HELIX blue: white mark (white on blue ${cr('#FFFFFF', BLUE)}:1); the dark mark on blue is ${cr('#000000', BLUE)}:1, do not use</small></div>
</div>
<p>Rules proposed: the Cyper mark is never recoloured to HELIX blue; its ink height is at most 70% of the wordmark cap height in the same lockup; minimum size 12 px in the nav, 16 px elsewhere (at 16 px the half-disc, square and triangle remain distinct); on blue and navy use the white version.</p>

<h2>4 · Palette routes</h2>
<p>Brand blue sampled from the raster: every one of 1,028,126 opaque pixels is exactly <code>rgb(65, 97, 244)</code> = <code>${BLUE}</code>. Contrast figures below are computed (WCAG 2.x relative luminance), not estimated.</p>
<div class="grid g2">
<div class="card"><h3 style="margin-top:0">Blue ${BLUE}: where it passes</h3>
  <table><thead><tr><th>Use</th><th class="n">Ratio</th><th>Verdict</th></tr></thead><tbody>
  <tr><td>Blue text on white</td><td class="n">${pal.blueOn.white}</td><td class="pass">AA normal text (needs 4.5)</td></tr>
  <tr><td>White text on blue (button)</td><td class="n">${pal.whiteOnBlue}</td><td class="pass">AA normal text; not AAA (7)</td></tr>
  <tr><td>Blue text on mist #F3F5F8</td><td class="n">${pal.blueOn.mist}</td><td class="warn">passes by 0.03; use darker blue for links</td></tr>
  <tr><td>Blue text on mist-2 #E9EDF2</td><td class="n">${pal.blueOn['mist-2']}</td><td class="fail">fails normal text; large text / graphics only (3:1)</td></tr>
  <tr><td>Blue on ink #121820 / navy #101C2E</td><td class="n">${pal.blueOn.ink} / ${pal.blueOn.navy}</td><td class="fail">graphics and large text only</td></tr>
  <tr><td>Ink text on blue</td><td class="n">${pal.inkOnBlue}</td><td class="fail">do not</td></tr>
  <tr><td>Hover #3350C8, white text</td><td class="n">${pal['hover #3350C8'].whiteOn}</td><td class="pass">button hover, link on mist</td></tr>
  <tr><td>Blue on tint #EEF1FE (badge)</td><td class="n">${pal['tint #EEF1FE'].blueOn}</td><td class="fail">use #2F49BE text (${pal['tint #EEF1FE'].darkBlueOn}:1)</td></tr>
  </tbody></table></div>
<div class="card"><h3 style="margin-top:0">Tenant colours: distance to HELIX blue (OKLab)</h3>
  <table><thead><tr><th>Candidate</th><th class="n">ΔE</th><th class="n">white text</th></tr></thead><tbody>
  ${pal.tenants.filter(t => ['#4338CA', '#C2410C', '#0F766E', '#86198F', '#A21CAF', '#9F1239'].includes(t.hex)).map(t => `<tr><td><span class="sw" style="display:inline-flex;margin:0"><i style="background:${t.hex};width:14px;height:14px"></i></span> ${t.name}</td><td class="n ${t.distToBlue_OKLab < 0.15 ? 'fail' : ''}">${t.distToBlue_OKLab}</td><td class="n">${t.whiteTextOn}</td></tr>`).join('')}
  </tbody></table>
  <p style="margin-top:12px">Baseline Tidewell indigo #4338CA is the closest of 14 candidates (0.108). Proposed sample set: <b>Kestrel #C2410C</b>, <b>Monsoon #0F766E</b>, <b>Bramble #86198F</b> (plum). All ≥ 0.22 from the blue, white text ≥ 5.18:1.</p></div>
</div>
<div class="grid g2" style="margin-top:16px">
<div class="card"><span class="badge">P1 · recommended</span><h3 style="margin-top:0">Blue is the brand</h3>
  <div class="sw"><i style="background:${BLUE}"></i><span><b>Blue ${BLUE}</b> wordmark, primary CTA, text links, focus ring. One primary-blue button per viewport.</span></div>
  <div class="sw"><i style="background:#121820"></i><span><b>Ink</b> headings and body; header CTA is outline ink so it never competes.</span></div>
  <div class="sw"><i style="background:#F3F5F8"></i><span><b>Mist</b> section bands, product-frame ground.</span></div>
  <div class="sw"><i style="background:#fff"></i><span><b>White</b> page.</span></div>
  <p>Retired: amber highlighter and the navy band. Blue is forbidden inside the tenant window.</p></div>
<div class="card"><span class="badge">P2 · alternative</span><h3 style="margin-top:0">Ink leads, blue signs</h3>
  <div class="sw"><i style="background:#121820"></i><span><b>Ink</b> primary CTA (white text 17:1), headings, body.</span></div>
  <div class="sw"><i style="background:${BLUE}"></i><span><b>Blue</b> wordmark and one diagram highlight only; links are ink with a blue underline.</span></div>
  <div class="sw"><i style="background:#F3F5F8"></i><span><b>Mist</b> bands.</span></div>
  <p>Calmer and closer to the baseline; the page chrome carries less colour, so the tenant re-skin contrast is lower. Blue still forbidden inside the tenant window.</p></div>
</div>

<h2>5 · Voice from the wordmark</h2>
<p>The wordmark is heavy and extended; Geist 600 headlines are quiet. Proposal: <b>the wordmark is the only heavy thing.</b> One oversized display moment (the wordmark itself, once, at section scale), everything else stays Geist 500 to 600. <b>Where the weight must not go:</b> body copy, the h2s, buttons, nav, numbers in product frames, the form. Candidate display faces (proposals only; Google Fonts static Latin instance, bytes by HTTP HEAD on 2026-10-08, licence per the google/fonts METADATA.pb): Anybody wdth 125 wght 800 (OFL, 12,980 B), Archivo wdth 125 wght 800 (OFL, 14,564 B), Unbounded 800 (OFL, 21,708 B), Syne 800 (OFL, 13,776 B). None matches the wordmark, so a display face is only useful for one headline, and a headline in a lookalike face next to the real wordmark may read as a mistake. <b>Recommendation: no display face this round; use the wordmark as the display element.</b></p>
</main></body></html>`;
fs.writeFileSync(`${B}/index.html`, html);
console.log('wrote brand/index.html', (html.length / 1024).toFixed(1) + ' KB', 'concepts:', Object.keys(concepts).join(','));
