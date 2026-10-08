// Contrast (WCAG 2.x relative luminance) and perceptual distance (OKLab) for the HELIX palette proposal.
import fs from 'node:fs';
const hex = h => { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = h => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const oklab = h => { const [r, g, b] = hex(h).map(lin); const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b); return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
const dE = (a, b) => { const A = oklab(a), B = oklab(b); return Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]); };
const lch = h => { const [L, a, b] = oklab(h); return { L: +L.toFixed(3), C: +Math.hypot(a, b).toFixed(3), h: +(((Math.atan2(b, a) * 180 / Math.PI) + 360) % 360).toFixed(0) }; };
const BLUE = '#4161F4';
const rows = {};
// 1. the brand blue in context
const bg = { white: '#FFFFFF', mist: '#F3F5F8', 'mist-2': '#E9EDF2', ink: '#121820', navy: '#101C2E', slate: '#101C2E' };
rows.blueOn = Object.fromEntries(Object.entries(bg).map(([k, v]) => [k, +cr(BLUE, v).toFixed(2)]));
rows.whiteOnBlue = +cr('#FFFFFF', BLUE).toFixed(2);
rows.inkOnBlue = +cr('#121820', BLUE).toFixed(2);
// hover/active darker blues
for (const h of ['#3A57DB', '#3350C8', '#2F49BE']) rows['hover ' + h] = { whiteOn: +cr('#FFFFFF', h).toFixed(2), onWhite: +cr(h, '#FFFFFF').toFixed(2) };
// tint backgrounds for blue badge
for (const t of ['#EEF1FE', '#E8ECFD', '#DCE3FC']) rows['tint ' + t] = { blueOn: +cr(BLUE, t).toFixed(2), darkBlueOn: +cr('#2F49BE', t).toFixed(2) };
// text greys on white / mist (design-system tokens may differ; shown for reference)
for (const [n, h] of Object.entries({ 'ink-2 #3A4452': '#3A4452', 'ink-3 #5E6979': '#5E6979', 'muted #667085': '#667085' })) rows[n] = { white: +cr(h, '#FFFFFF').toFixed(2), mist: +cr(h, '#F3F5F8').toFixed(2) };
// 2. tenant colour candidates
const cands = { 'Kestrel orange #C2410C': '#C2410C', 'Monsoon teal #0F766E': '#0F766E', 'Tidewell indigo #4338CA (baseline)': '#4338CA', 'rose #BE123C': '#BE123C', 'green #15803D': '#15803D', 'forest #166534': '#166534', 'plum #86198F': '#86198F', 'amber-brown #B45309': '#B45309', 'crimson #9F1239': '#9F1239', 'magenta #A21CAF': '#A21CAF', 'olive #4D7C0F': '#4D7C0F', 'cyan-dark #0E7490': '#0E7490', 'brick #9A3412': '#9A3412', 'slate-green #115E59': '#115E59' };
rows.tenants = Object.entries(cands).map(([n, h]) => ({ name: n, hex: h, oklch: lch(h), distToBlue_OKLab: +dE(h, BLUE).toFixed(3), whiteTextOn: +cr('#FFFFFF', h).toFixed(2) })).sort((a, b) => a.distToBlue_OKLab - b.distToBlue_OKLab);
// 3. pick three tenant colours maximising the minimum pairwise distance, all >= 0.20 from the blue and white text >= 4.5
const ok = rows.tenants.filter(t => t.distToBlue_OKLab >= 0.2 && t.whiteTextOn >= 4.5);
let best = null;
for (let i = 0; i < ok.length; i++) for (let j = i + 1; j < ok.length; j++) for (let k = j + 1; k < ok.length; k++) {
  const d = Math.min(dE(ok[i].hex, ok[j].hex), dE(ok[i].hex, ok[k].hex), dE(ok[j].hex, ok[k].hex));
  if (!best || d > best.d) best = { d: +d.toFixed(3), set: [ok[i], ok[j], ok[k]].map(t => t.hex + ' ' + t.name) };
}
rows.bestTenantTrio = best;
rows.blueVsCyperBlack = +cr('#000000', BLUE).toFixed(2);
fs.writeFileSync('../brand/palette-measurements.json', JSON.stringify(rows, null, 2));
console.log(JSON.stringify(rows, null, 1));
