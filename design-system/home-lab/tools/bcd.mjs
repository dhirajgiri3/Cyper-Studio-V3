// Browser support facts for S0 features, read from @mdn/browser-compat-data at build time (not from memory).
import fs from 'node:fs'; import { createRequire } from 'node:module';
const bcd = createRequire(import.meta.url)('@mdn/browser-compat-data');
const pkg = JSON.parse(fs.readFileSync('node_modules/@mdn/browser-compat-data/package.json', 'utf8'));
const get = p => p.split('.').reduce((o, k) => o && o[k], bcd);
const FEATURES = { 'animation-timeline': 'css.properties.animation-timeline', 'animation-range': 'css.properties.animation-range', 'view() / scroll() functions': 'css.properties.animation-timeline.view', 'view-timeline (named)': 'css.properties.view-timeline', 'timeline-scope': 'css.properties.timeline-scope', 'View Transitions (same-document)': 'api.Document.startViewTransition', '@property': 'css.at-rules.property', 'position: sticky': 'css.properties.position.sticky', 'IntersectionObserver': 'api.IntersectionObserver', 'Web Animations: Element.animate': 'api.Element.animate', 'prefers-reduced-motion': 'css.at-rules.media.prefers-reduced-motion', 'CSS clamp()': 'css.types.clamp', 'svh units': 'css.types.length.viewport_percentage_units_small', 'window.find': 'api.Window.find' };
const BR = ['chrome', 'chrome_android', 'edge', 'firefox', 'firefox_android', 'safari', 'safari_ios', 'samsunginternet_android', 'webview_android', 'opera'];
const rows = []; const raw = {};
for (const [name, path] of Object.entries(FEATURES)) {
  const f = get(path); if (!f || !f.__compat) { rows.push([name, 'NOT IN BCD: ' + path]); continue; }
  const s = f.__compat.support; const cell = b => { let v = s[b]; if (!v) return 'n/a'; if (Array.isArray(v)) v = v.find(x => !x.flags && !x.prefix && !x.alternative_name) || v[0]; if (v.flags) return 'flag only'; if (v.version_added === false) return 'NO'; if (v.version_added === true) return 'yes'; return String(v.version_added).replace('≤', '≤') + (v.partial_implementation ? ' (partial)' : ''); };
  raw[name] = Object.fromEntries(BR.map(b => [b, cell(b)])); rows.push([name, ...BR.map(cell)]);
}
const md = `BCD ${pkg.version} (${new Date().toISOString().slice(0, 10)}). Value = first version with unflagged support; "NO" = not supported; "flag only" = behind a flag.\n\n| Feature | ${BR.join(' | ')} |\n|${['---', ...BR.map(() => '---')].join('|')}|\n${rows.map(r => '| ' + r.join(' | ') + ' |').join('\n')}\n`;
fs.writeFileSync('../motion-bench/results/browser-support.md', md); fs.writeFileSync('../motion-bench/results/browser-support.json', JSON.stringify({ bcd: pkg.version, raw }, null, 1)); console.log(md);
