#!/usr/bin/env python3
"""Generate the static Lab pages from tokens.json and the component HTML below.

Usage (repo root):  python3 -I design-system/scripts/build-tokens.py && python3 -I design-system/scripts/build-lab.py
Writes only inside design-system/. Pages are plain HTML and CSS; the only JavaScript is Lab tooling (lab.js).
"""
import json, os, re, html

HERE = os.path.dirname(os.path.abspath(__file__))
DS_DIR = os.path.abspath(os.path.join(HERE, '..'))
ROOT = os.path.abspath(os.path.join(DS_DIR, '..'))
LAB = DS_DIR
TOKENS_DIR = os.path.join(DS_DIR, 'tokens')
T = json.load(open(os.path.join(TOKENS_DIR, 'tokens.json')))
PAIRS = json.load(open(os.path.join(TOKENS_DIR, 'contrast.json')))
V = T['version']
esc = html.escape

# ------------------------------------------------------------------ forced-state CSS (derived from components.css; lab only)
src = open(os.path.join(LAB, 'components', 'components.css')).read()
forced = ['/* GENERATED from components.css by build-lab.py. Lab-only: lets the gallery display :hover/:active/:focus-visible states. */']
depth = 0
for line in src.splitlines():
    s = line.strip()
    opens, closes = s.count('{'), s.count('}')
    if depth == 0 and not s.startswith('@') and not s.startswith('/*') and opens == 1 and closes == 1 and re.search(r':(hover|active|focus-visible)', s):
        sel, body = s.split('{', 1)
        if 'hx-btn--sheen' in sel:
            depth += opens - closes; continue
        parts = [p.strip() for p in sel.split(',')]
        new = []
        for p in parts:
            q = p.replace(':hover', '[data-force~="hover"]').replace(':active', '[data-force~="active"]').replace(':focus-visible', '[data-force~="focus"]')
            new.append(q)
        forced.append(', '.join(new) + ' {' + body)
    depth += opens - closes
forced.append('.hx-root [data-force~="focus"] { outline: var(--ring-w) solid var(--accent); outline-offset: var(--ring-offset); }')
os.makedirs(os.path.join(LAB, 'lab'), exist_ok=True)
open(os.path.join(LAB, 'lab', 'forced-states.css'), 'w').write('\n'.join(forced) + '\n')

# ------------------------------------------------------------------ shared chrome
def bar(here):
    items = [('Foundations', '../foundations/index.html'), ('Components', '../components/index.html'), ('Compositions', '../compositions/index.html'), ('Directions (Gate 1)', '../directions/index.html'), ('Lab home', '../index.html')]
    cur = ' aria-current="page"'
    nav = ''.join('<a href="%s"%s>%s</a>' % (h, cur if n == here else '', n) for n, h in items)
    return f'''<header class="lab-bar"><span>HELIX Design Lab · v{V} · Round 1 · noindex · never ships</span>
<nav aria-label="Lab"><button class="lab-btn" id="lab-ids" type="button" aria-pressed="false">IDs</button><button class="lab-btn" id="lab-grid" type="button" aria-pressed="false">Grid</button><button class="lab-btn" id="lab-export" type="button">Export tokens</button>{nav}</nav></header>'''

def page(title, body, here, extra_head='', tools=True, standalone=False):
    return f'''<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>{esc(title)}</title>
<link rel="icon" href="data:,">
<link rel="preload" as="font" type="font/woff2" crossorigin href="../fonts/Geist-Variable.subset.woff2">
<link rel="preload" as="font" type="font/woff2" crossorigin href="../fonts/GeistMono-Variable.subset.woff2">
<link rel="stylesheet" href="../components/tokens.css">
<link rel="stylesheet" href="../components/components.css">
<link rel="stylesheet" href="../lab/lab.css">
<link rel="stylesheet" href="../lab/forced-states.css">
{extra_head}</head>
<body class="hx-root">
{'' if standalone else bar(here)}
{body}
{'' if (standalone or not tools) else '<script src="../lab/tokens-manifest.js"></script><script src="../lab/lab.js"></script>'}
</body>
</html>'''

def write(rel, content):
    p = os.path.join(LAB, rel); os.makedirs(os.path.dirname(p), exist_ok=True); open(p, 'w').write(content)

# ------------------------------------------------------------------ component HTML (the canonical markup; mirrored in react-mapping.md)
ARROW = '<svg class="hx-btn__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ALERT = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v4.5M10 13.25v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
MENU_OPEN = '<svg class="hx-menu__icon hx-menu__icon--open" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M3.5 6h13M3.5 10h13M3.5 14h13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
MENU_CLOSE = '<svg class="hx-menu__icon hx-menu__icon--close" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'

def btn(label, variant='primary', extra='', attrs='', icon=False, tag='button', href='#'):
    cls = f'hx-btn hx-btn--{variant} {extra}'.strip()
    inner = f'{esc(label)}{ARROW if icon else ""}'
    if tag == 'a': return f'<a class="{cls}" href="{href}" {attrs}>{inner}</a>'
    return f'<button class="{cls}" type="button" {attrs}>{inner}</button>'

CTA_LABEL = 'Sample CTA'
CTA_HREF = '#request-demo'

def header(open_menu=False, cta=CTA_LABEL, cta_variant='primary'):
    o = ' open' if open_menu else ''
    return f'''<a class="hx-skip" href="#main">Skip to main content</a>
<header class="hx-header" data-id="PRO-HDR-01">
  <div class="hx-container">
    <div class="hx-header__bar">
      <a class="hx-wordmark" href="#"><span class="hx-wordmark__name">HELIX</span> <span class="hx-wordmark__by">by Cyper Studio</span></a>
      <nav class="hx-nav" aria-label="Primary"><a class="hx-nav__link" href="#" aria-current="page">Product</a><a class="hx-nav__link" href="#">About</a></nav>
      <div class="hx-header__actions">
        <a class="hx-btn hx-btn--{cta_variant}" href="{CTA_HREF}" data-id="CMP-BTN-01">{esc(cta)}</a>
        <details class="hx-menu"{o}>
          <summary class="hx-menu__toggle">{MENU_OPEN}{MENU_CLOSE}<span class="hx-sr">Menu</span></summary>
          <div class="hx-menu__panel">
            <p class="hx-label hx-menu__group">Product</p>
            <a class="hx-menu__link" href="#" aria-current="page">Product</a>
            <a class="hx-menu__link" href="#">About</a>
            <p class="hx-label hx-menu__group">Company</p>
            <a class="hx-menu__link" href="#">Contact</a>
          </div>
        </details>
      </div>
    </div>
  </div>
</header>'''

def footer():
    return '''<footer class="hx-footer" data-id="PRO-FTR-01">
  <div class="hx-container">
    <div class="hx-footer__grid">
      <div class="hx-footer__brand">
        <a class="hx-wordmark" href="#"><span class="hx-wordmark__name">HELIX</span> <span class="hx-wordmark__by">by Cyper Studio</span></a>
        <p class="hx-small">HELIX is a product of Cyper Studio, a product engineering company based in India. Founded in 2024. <span class="lab-sample">Sample entity text</span></p>
        <p class="hx-small" style="margin-top:var(--s2)"><a class="hx-link hx-footer__email" href="#">info@&lt;canonical&gt;</a> <span class="lab-sample">Sample domain</span></p>
      </div>
      <nav aria-label="Product"><p class="hx-label hx-footer__h">Product</p><ul class="hx-footer__list"><li><a class="hx-footer__link" href="#">HELIX overview</a></li></ul></nav>
      <nav aria-label="Company"><p class="hx-label hx-footer__h">Company</p><ul class="hx-footer__list"><li><a class="hx-footer__link" href="#">About</a></li><li><a class="hx-footer__link" href="#">Contact</a></li></ul></nav>
      <nav aria-label="Legal"><p class="hx-label hx-footer__h">Legal</p><ul class="hx-footer__list"><li><a class="hx-footer__link" href="#">Privacy</a></li><li><a class="hx-footer__link" href="#">Terms</a></li></ul></nav>
    </div>
    <div class="hx-footer__base"><p class="hx-caption">© 2026 Sample Legal Entity <span class="lab-sample">Year computed at build in production</span></p><p class="hx-caption">Founded 2024 · India</p></div>
  </div>
</footer>'''

def hero(settle=True, with_header=False):
    st = ' hx-settle' if settle else ''
    return f'''<section class="hx-section hx-section--hatched hx-hero" data-id="PRO-HERO-01" aria-labelledby="hero-h">
  <div class="hx-container hx-hero__grid">
    <div>
      <p class="hx-hero__eyebrow"><span class="hx-badge">Sample eyebrow</span></p>
      <h1 class="hx-display hx-hero__title" id="hero-h">Sample headline that states a fact</h1>
      <p class="hx-lead">Sample subhead: one or two plain sentences define the product, the customer and the outcome, with no metaphor. <span class="lab-sample">Sample copy</span></p>
      <div class="hx-hero__actions">{btn(CTA_LABEL, 'primary', 'hx-btn--lg', icon=False, tag='a', href=CTA_HREF)}{btn('Sample secondary', 'secondary', 'hx-btn--lg', tag='a')}</div>
      <p class="hx-caption hx-hero__trust">Sample trust line: company, location, founded year.</p>
    </div>
    <div>
      <div class="hx-brackets">
        <figure class="hx-frame{st}" style="margin:0" data-id="CMP-FRM-01">
          <div class="hx-frame__bar"><span class="hx-label">Operator console · sample</span><span class="hx-label">Screenshot pending</span></div>
          <div class="hx-frame__media">
            <img src="../assets/screenshot-pending.webp" width="1280" height="720" alt="Placeholder for a HELIX operator console screenshot, pending delivery" fetchpriority="high" decoding="async">
            <span class="hx-marker" style="top:20%;left:22%" aria-hidden="true">1</span><span class="hx-marker" style="top:58%;left:68%" aria-hidden="true">2</span>
          </div>
          <dl class="hx-kv" data-id="CMP-KV-01"><div><dt>Rate card</dt><dd>Sample</dd></div><div><dt>Zone</dt><dd>Sample</dd></div><div><dt>Valid until</dt><dd>Sample</dd></div></dl>
        </figure>
      </div>
      <ul class="hx-annot hx-caption" aria-label="Annotations"><li><b class="hx-label">01</b><span>Sample annotation caption.</span></li><li><b class="hx-label">02</b><span>Sample annotation caption.</span></li></ul>
    </div>
  </div>
</section>'''

def table():
    rows = [('Zone A (local)', '0 to 0.5 kg', '₹42.00', '₹38.00', '31 Mar 2027'),
            ('Zone B (metro)', '0 to 0.5 kg', '₹58.50', '₹46.00', '31 Mar 2027'),
            ('Zone C (regional)', '0 to 0.5 kg', '₹71.00', '₹55.00', '31 Mar 2027'),
            ('Zone D (heavy freight)', '500 to 1,000 kg', '₹1,12,450.00', '₹210.00', '30 Sep 2027'),
            ('Zone E (remote)', '0 to 0.5 kg', '₹94.00', '₹72.50', '31 Mar 2027')]
    body = ''.join(f'<tr><th scope="row">{a}</th><td>{b}</td><td class="hx-num">{c}</td><td class="hx-num">{d}</td><td class="hx-num">{e}</td></tr>' for a, b, c, d, e in rows)
    return f'''<div class="hx-table-wrap" role="region" aria-labelledby="tbl-cap" aria-describedby="tbl-hint" tabindex="0" data-id="PRO-TBL-01">
  <table class="hx-table">
    <caption id="tbl-cap"><span class="hx-h4">Rate card</span> <span class="hx-badge hx-badge--neutral">Illustrative</span> <span class="lab-sample">Fictional data</span></caption>
    <thead><tr><th scope="col">Zone</th><th scope="col">Weight slab</th><th scope="col" class="hx-num">Base rate</th><th scope="col" class="hx-num">Each extra 0.5 kg</th><th scope="col" class="hx-num">Valid until</th></tr></thead>
    <tbody>{body}</tbody>
  </table>
</div>
<p class="hx-caption hx-table-hint" id="tbl-hint">Scroll sideways to see all columns.</p>'''

def sr_main(inner):  # wrap content in <main>
    return f'<main id="main">{inner}</main>'

# ------------------------------------------------------------------ FOUNDATIONS
def swatches():
    out = []
    for k, v in T['color'].items():
        h = v['value']; r, g, b = (int(h[i:i+2], 16) for i in (1, 3, 5))
        out.append(f'<div class="lab-sw" data-id="{v["id"]}"><i style="background:var(--{k})"></i><div><b>--{k}</b>{h}<br>rgb({r}, {g}, {b})<br>{esc(v["role"])}</div></div>')
    return '\n'.join(out)

def contrast_table():
    rows = []
    for p in PAIRS:
        res = p['result']; cls = 'pass' if res == 'PASS' else ('fail' if res == 'FAIL' else '')
        rows.append(f'<tr><td>{esc(p["name"])}</td><td><span style="display:inline-block;width:14px;height:14px;border:1px solid var(--border);background:var(--{p["fg"]});vertical-align:-2px"></span> {p["fgHex"]}</td><td><span style="display:inline-block;width:14px;height:14px;border:1px solid var(--border);background:var(--{p["bg"]});vertical-align:-2px"></span> {p["bgHex"]}</td><td class="hx-data">{p["ratio"]:.2f}:1</td><td>{(">= " + str(p["min"]) + ":1") if p["min"] else "none"}</td><td class="{cls}">{res}</td></tr>')
    fails = sum(1 for p in PAIRS if p['result'] == 'FAIL')
    return f'<p class="hx-small" style="margin-bottom:var(--s3)">{len(PAIRS)} pairs computed by <code>build-tokens.py</code> (WCAG 2.x relative luminance). <strong>{fails} failing.</strong> Source: <code>design-system/tokens/contrast.md</code>.</p><div class="lab-scroll" tabindex="0" role="region" aria-label="Contrast table"><table class="lab-table"><thead><tr><th>Pair</th><th>Foreground</th><th>Background</th><th>Ratio</th><th>Required</th><th>Result</th></tr></thead><tbody>{"".join(rows)}</tbody></table></div>'

def type_rows():
    cls = {'display': 'hx-display', 'h1': 'hx-h1', 'h2': 'hx-h2', 'h3': 'hx-h3', 'h4': 'hx-h4', 'h5': 'hx-h5', 'h6': 'hx-h6', 'body-lg': 'hx-lead', 'body': 'hx-p', 'small': 'hx-small', 'caption': 'hx-caption', 'label': 'hx-label', 'data': 'hx-data'}
    sample = {'label': 'Index label · 01 / Compare', 'data': '₹12,450.00  AWB 1234567890'}
    out = []
    for k, v in T['type'].items():
        if k.startswith('_'): continue
        txt = sample.get(k, 'Sample text sets the scale')
        out.append(f'<tr data-id="{v["id"]}"><td class="hx-label" style="white-space:nowrap">{k}</td><td><div class="{cls[k]}" style="max-width:none">{txt}</div></td><td class="hx-data" style="white-space:nowrap">{esc(v["size"])}<br>{v["fixed"]}</td><td class="hx-data">{v["lh"]}<br>{v["weight"]} / {v["ls"]}</td><td class="hx-small">{esc(v["use"])}</td></tr>')
    return '\n'.join(out)

def foundations():
    space = ''.join(f'<div style="width:{v};height:{v}" title="{k}">{k}</div>' for k, v in T['space'].items())
    motion = ''.join(f'<tr data-id="{v["id"]}"><td class="hx-data">--{k}</td><td class="hx-data">{esc(v["value"])}</td><td class="hx-small">{esc(v.get("use", "Easing for every transition and reveal"))}</td></tr>' for k, v in T['motion'].items())
    body = f'''<main id="main"><div class="lab-note"><h1 class="hx-h1">Foundations</h1><p class="hx-p" style="margin-top:var(--s3)">Tokens v{V} (DRAFT). Direction A with the mono key-value rail. Everything below reads from <code>tokens.css</code>; edit <code>tokens.json</code> and rebuild, never the generated files. Toggle <b>IDs</b> to see <code>TOK-…</code> identifiers, <b>Grid</b> for the 12-column overlay, <b>Export tokens</b> to copy current values.</p></div>
<div class="hx-container" style="padding-bottom:var(--s9)">
<h2 class="hx-h2 lab-h2">1. Colour</h2><p class="lab-meta">Accent #1F4FE0 is a working choice (D-14, Q-12), changed in one place</p>
<div class="lab-swatches">{swatches()}</div>
<h3 class="hx-h3" style="margin-top:var(--s7)">Contrast (script-computed)</h3>
{contrast_table()}

<h2 class="hx-h2 lab-h2">2. Typography</h2>
<p class="lab-meta">Geist Sans + Geist Mono · self-hosted variable woff2 · Latin + ₹ subset</p>
<div class="lab-grid" style="margin-bottom:var(--s6)">
  <div class="lab-cell" data-id="TOK-FNT-01"><p class="hx-label">Geist Sans, weights 400 / 500 / 600</p><p class="hx-h2" style="font-weight:400">Regular 400</p><p class="hx-h2" style="font-weight:500">Medium 500</p><p class="hx-h2">Semibold 600</p></div>
  <div class="lab-cell" data-id="TOK-FNT-02"><p class="hx-label">Geist Mono</p><p class="hx-data" style="font-size:var(--fs-h3)">₹12,450.00</p><p class="hx-data" style="font-size:var(--fs-h3)">₹1,12,450.00</p><p class="hx-data" style="font-size:var(--fs-h3)">AWB 1234567890</p><p class="hx-data" style="font-size:var(--fs-h3)">28.5 kg · 07 / 12</p></div>
  <div class="lab-cell"><p class="hx-label">Tabular figures in Geist Sans</p><div class="lab-row" style="align-items:flex-start;gap:var(--s6)"><div><p class="hx-caption">default</p><p class="hx-p" style="text-align:right;font-size:var(--fs-h4);width:8ch">1,111<br>8,888<br>1,181</p></div><div><p class="hx-caption">tabular-nums</p><p class="hx-p" style="text-align:right;font-size:var(--fs-h4);width:8ch;font-variant-numeric:tabular-nums">1,111<br>8,888<br>1,181</p></div></div></div>
  <div class="lab-cell"><p class="hx-label">Test results (measured)</p><p class="hx-small">₹ (U+20B9) present in both faces. Geist Sans has <code>tnum</code>. Full variable files 141 KB; subset <b>46.7 KB</b> total. Licence: SIL OFL 1.1.</p></div>
</div>
<div class="lab-scroll" tabindex="0" role="region" aria-label="Type scale table"><table class="lab-table"><thead><tr><th>Level</th><th>Specimen</th><th>Size</th><th>Line / weight / tracking</th><th>Use</th></tr></thead><tbody>
{type_rows()}
</tbody></table></div>
<p class="hx-caption" style="margin-top:var(--s3)">Mono labels are 13px (0.8125rem), the only text allowed below 14px (D-16, decided at Gate 2).</p>

<h2 class="hx-h2 lab-h2">3. Spacing and layout</h2>
<p class="lab-meta">4px base · container 1200px · gutter 20px mobile, 24px desktop · section padding 64px / 96px</p>
<div class="lab-space" data-id="TOK-SPC-01">{space}</div>
<p class="hx-small" style="margin-top:var(--s4)">Breakpoints (documented only): 390 · 768 · 1024 · 1280. 12-column grid with 24px gaps; toggle the overlay with <b>Grid</b>. Prose measure 65ch.</p>

<h2 class="hx-h2 lab-h2">4. Shape, elevation, borders, focus</h2>
<div class="lab-grid">
  <div class="lab-cell"><p class="hx-label">Radius</p><div class="lab-row"><div class="lab-rad" style="border-radius:var(--r-sm)" data-id="TOK-RAD-01">sm 6</div><div class="lab-rad" style="border-radius:var(--r-md)" data-id="TOK-RAD-02">md 10</div><div class="lab-rad" style="border-radius:var(--r-lg)" data-id="TOK-RAD-03">lg 16</div></div></div>
  <div class="lab-cell"><p class="hx-label">Elevation (product frames only)</p><div class="lab-row"><div class="lab-rad" style="box-shadow:var(--shadow-1);border-color:var(--border)" data-id="TOK-SHD-01">shadow-1</div><div class="lab-rad" style="box-shadow:var(--shadow-2);border-color:var(--border)" data-id="TOK-SHD-02">shadow-2</div></div></div>
  <div class="lab-cell"><p class="hx-label">Borders</p><div class="lab-row"><div class="lab-rad" style="border-color:var(--border)">--border<br>decorative</div><div class="lab-rad" style="border-color:var(--border-strong)">--border-strong<br>controls 3:1</div></div></div>
  <div class="lab-cell"><p class="hx-label">Focus ring</p><div class="lab-row"><button class="hx-btn hx-btn--secondary" type="button" data-force="focus">2px accent, 2px offset</button></div></div>
  <div class="lab-cell"><p class="hx-label">Hatched paper (max two sections)</p><div class="hx-section--hatched" style="height:88px;border:1px solid var(--border);border-radius:var(--r-md)"></div></div>
  <div class="lab-cell"><p class="hx-label">Corner brackets</p><div class="hx-brackets" style="padding:var(--s5)"><p class="hx-small">Brackets use --border-strong</p></div></div>
</div>

<h2 class="hx-h2 lab-h2">5. Motion tokens</h2>
<p class="lab-meta">Motion lab (playable, with reduced-motion toggle) arrives in Round 2</p>
<div class="lab-scroll" tabindex="0" role="region" aria-label="Motion tokens table"><table class="lab-table"><thead><tr><th>Token</th><th>Value</th><th>Use</th></tr></thead><tbody>{motion}</tbody></table></div>
</div></main>'''
    return page('Foundations · HELIX Design Lab', body, 'Foundations')

# ------------------------------------------------------------------ COMPONENTS
def cell(label, inner, ident=''):
    d = f' data-id="{ident}"' if ident else ''
    return f'<div class="lab-cell"{d}><p class="hx-label">{label}</p>{inner}</div>'

def components():
    # Buttons
    states = [('default', ''), ('hover', 'data-force="hover"'), ('focus-visible', 'data-force="focus"'), ('active', 'data-force="active"'), ('disabled', 'disabled'), ('loading', 'aria-busy="true"')]
    btn_cells = []
    for v in ('primary', 'secondary', 'tertiary'):
        for name, at in states:
            label = 'Sending…' if name == 'loading' else f'{v.capitalize()}'
            btn_cells.append(cell(f'{v} · {name}', f'<div class="lab-row">{btn(label, v, attrs=at)}</div>', 'CMP-BTN-01'))
    btn_cells.append(cell('size lg (52px)', f'<div class="lab-row">{btn("Large primary", "primary", "hx-btn--lg")}</div>'))
    btn_cells.append(cell('with icon', f'<div class="lab-row">{btn("With icon", "primary", icon=True)}</div>'))
    btn_cells.append(cell('long label stress test', f'<div class="lab-row">{btn("Request a demo of the full platform", "primary")}</div>'))
    btn_cells.append(cell('block (full width)', f'{btn("Block button", "secondary", "hx-btn--block")}'))
    # Experiment
    exp = cell('EXPERIMENT · CTA hover sheen (hover with a mouse)', f'<div class="lab-row">{btn("Sample primary action", "primary", "hx-btn--sheen hx-btn--lg")}{btn("No sheen (control)", "primary", "hx-btn--lg")}</div><p class="hx-caption" style="margin-top:var(--s3)">Solid translucent bar, no gradient. transform only, 600ms, one-way, hover-capable pointers only, off under reduced motion. Cost measured in PROOF_REPORT.md.</p>', 'CMP-BTN-02')
    # Links
    links = [cell('inline link', '<p class="hx-p">Body text with an <a class="hx-link" href="#">inline link</a> in the middle.</p>', 'CMP-LNK-01'),
             cell('hover', '<p class="hx-p"><a class="hx-link" href="#" data-force="hover">Inline link</a></p>'),
             cell('focus-visible', '<p class="hx-p"><a class="hx-link" href="#" data-force="focus">Inline link</a></p>'),
             cell('active', '<p class="hx-p"><a class="hx-link" href="#" data-force="active">Inline link</a></p>'),
             cell('arrow link (tertiary action)', f'<a class="hx-link hx-link--arrow" href="#">Read the product overview<svg class="hx-link__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>')]
    # Fields
    def field(fid, label, control, hint='', error='', req=False, invalid=False):
        r = ' <span class="hx-field__req" aria-hidden="true">*</span>' if req else ''
        desc = ' '.join(x for x in [f'{fid}-hint' if hint else '', f'{fid}-err' if error else ''] if x)
        ad = f' aria-describedby="{desc}"' if desc else ''
        h = f'<p class="hx-field__hint" id="{fid}-hint">{hint}</p>' if hint else ''
        e = f'<p class="hx-field__error" id="{fid}-err" role="alert">{ALERT}<span>{error}</span></p>' if error else ''
        inv = ' data-invalid="true"' if invalid else ''
        return f'<div class="hx-field"{inv}><label class="hx-field__label" for="{fid}">{label}{r}</label>{control(ad)}{h}{e}</div>'
    inp = lambda fid, extra='': (lambda ad: f'<input class="hx-input" id="{fid}" name="{fid}" type="text" autocomplete="off" {extra}{ad}>')
    fields = [
        cell('text · default', field('f1', 'Work email', lambda ad: f'<input class="hx-input" id="f1" name="f1" type="email" autocomplete="email" placeholder="you@company.example"{ad}>', hint='Hint text sits under the field.', req=True), 'CMP-FLD-01'),
        cell('text · hover', f'<div class="hx-field"><label class="hx-field__label" for="f2">Company</label><input class="hx-input" id="f2" type="text" value="Sample company" data-force="hover"></div>'),
        cell('text · focus-visible', f'<div class="hx-field"><label class="hx-field__label" for="f3">Company</label><input class="hx-input" id="f3" type="text" value="Sample company" data-force="focus"></div>'),
        cell('text · filled', f'<div class="hx-field"><label class="hx-field__label" for="f4">Name</label><input class="hx-input" id="f4" type="text" value="Sample Person" autocomplete="name"></div>'),
        cell('text · disabled', f'<div class="hx-field"><label class="hx-field__label" for="f5">Disabled</label><input class="hx-input" id="f5" type="text" value="Not editable" disabled></div>'),
        cell('text · error', field('f6', 'Work email', lambda ad: f'<input class="hx-input" id="f6" name="f6" type="email" value="not-an-email" aria-invalid="true" autocomplete="email"{ad}>', error='Enter an email address in the form name@company.example.', req=True, invalid=True)),
        cell('select', f'<div class="hx-field"><label class="hx-field__label" for="f7">Company type <span class="hx-field__req" aria-hidden="true">*</span></label><div class="hx-select-wrap"><select class="hx-select" id="f7"><option>Select one</option><option>Sample option A</option><option>Sample option B</option></select></div></div>'),
        cell('textarea', f'<div class="hx-field"><label class="hx-field__label" for="f8">Message</label><textarea class="hx-textarea" id="f8" maxlength="500" placeholder="Optional context"></textarea><p class="hx-field__hint">500 characters maximum.</p></div>'),
    ]
    # Cards
    cards = [
        cell('default', '<article class="hx-card"><p class="hx-label hx-card__index">01</p><h3 class="hx-h3 hx-card__title">Sample capability title</h3><p class="hx-card__text">One sentence states the capability with a concrete verb.</p><p class="hx-card__outcome">One sentence states the outcome for the operator.</p></article>', 'CMP-CRD-01'),
        cell('on surface', '<article class="hx-card hx-card--surface"><p class="hx-label hx-card__index">02</p><h3 class="hx-h3 hx-card__title">Sample capability title</h3><p class="hx-card__text">One sentence states the capability.</p></article>'),
        cell('with corner brackets', '<div class="hx-brackets"><article class="hx-card"><p class="hx-label hx-card__index">03</p><h3 class="hx-h3 hx-card__title">Sample capability title</h3><p class="hx-card__text">Brackets use --border-strong.</p></article></div>'),
    ]
    # Badges
    badges = [cell('default (accent tint)', '<span class="hx-badge">Sample label</span>', 'CMP-BDG-01'), cell('neutral', '<span class="hx-badge hx-badge--neutral">Illustrative</span>'),
              cell('success', '<span class="hx-badge hx-badge--success"><span class="hx-badge__dot" aria-hidden="true"></span>Sample success</span>'),
              cell('warning', '<span class="hx-badge hx-badge--warning"><span class="hx-badge__dot" aria-hidden="true"></span>Sample warning</span>'),
              cell('danger', '<span class="hx-badge hx-badge--danger"><span class="hx-badge__dot" aria-hidden="true"></span>Sample danger</span>')]
    g = lambda cells: '<div class="lab-grid">' + '\n'.join(cells) + '</div>'
    body = f'''<main id="main"><div class="lab-note"><h1 class="hx-h1">Components</h1><p class="hx-p" style="margin-top:var(--s3)">Round 1 set: Button, Link, Field, Card, Badge (Header and Footer are on the Compositions page). Plain HTML and CSS using <code>hx-</code> classes; each maps 1:1 to a React component in <code>react-mapping.md</code>. Hover, focus and active previews use <code>data-force</code> attributes generated from the real component rules. Toggle <b>IDs</b> for <code>CMP-…</code> identifiers.</p></div>
<div class="hx-container" style="padding-bottom:var(--s9)">
<h2 class="hx-h2 lab-h2">Button <span class="lab-sample">CMP-BTN-01</span></h2><p class="lab-meta">44px minimum · one primary per viewport · focus ring never removed · loading is a label change, no spinner</p>{g(btn_cells)}
<h2 class="hx-h3" style="margin-top:var(--s7)">Experiment: CTA hover sheen <span class="lab-sample">CMP-BTN-02</span></h2>{g([exp])}
<h2 class="hx-h2 lab-h2">Link <span class="lab-sample">CMP-LNK-01</span></h2>{g(links)}
<h2 class="hx-h2 lab-h2">Field <span class="lab-sample">CMP-FLD-01</span></h2><p class="lab-meta">44px · label above · border 3:1 (--border-strong) · error is icon + text + aria-invalid, never colour alone</p>{g(fields)}
<h2 class="hx-h2 lab-h2">Card <span class="lab-sample">CMP-CRD-01</span></h2>{g(cards)}
<h2 class="hx-h2 lab-h2">Badge <span class="lab-sample">CMP-BDG-01</span></h2><p class="lab-meta">State badges always pair colour with a dot and text</p>{g(badges)}
</div></main>'''
    return page('Components · HELIX Design Lab', body, 'Components')

# ------------------------------------------------------------------ COMPOSITIONS
def compositions():
    body = f'''<main id="main"><div class="lab-note"><h1 class="hx-h1">Compositions</h1><p class="hx-p" style="margin-top:var(--s3)">Round 1: PRO-HDR-01 (with mobile menu), PRO-HERO-01, PRO-TBL-01, PRO-FTR-01. Prototypes with sample content, not pages. The mobile menu is a native <code>&lt;details&gt;</code>, so it works with JavaScript disabled. Standalone pages for each live in this folder.</p></div>
<div class="hx-container"><h2 class="hx-h2 lab-h2">PRO-HDR-01 Header and mobile menu</h2>
<p class="lab-meta">Sticky 64px · 1px line appears on scroll (opacity-only, <code>animation-timeline</code> where supported) · menu toggle 44px</p>
<div class="lab-row" style="align-items:flex-start;gap:var(--s6)">
  <div class="lab-device"><iframe title="Header, menu closed, 390px" src="header.html"></iframe></div>
  <div class="lab-device"><iframe title="Header, menu open, 390px" src="header-open.html"></iframe></div>
</div></div>
<div class="hx-container"><h2 class="hx-h2 lab-h2">Header at desktop width</h2><p class="lab-meta">D-17: header CTA is filled (primary), md size, same label and destination as the hero CTA (lg). Compare with the secondary variant: <a class="hx-link" href="header-secondary-cta.html">header-secondary-cta.html</a> versus <a class="hx-link" href="hero.html">hero.html</a>. Changes only if you say so.</p></div>
{header()}
<div class="hx-container"><h2 class="hx-h2 lab-h2">PRO-HERO-01 Hero composition</h2><p class="lab-meta">Hatched section · frame settles via transform only (motion moment 1) · placeholder image is a real raster so LCP can be tested</p></div>
{hero()}
<div class="hx-container"><h2 class="hx-h2 lab-h2">PRO-TBL-01 Rate-card table</h2><p class="lab-meta">Illustrative fictional data · mono, right-aligned, tabular · horizontal scroll region on narrow screens, keyboard focusable</p>
{table()}</div>
<div class="hx-container"><h2 class="hx-h2 lab-h2">PRO-FTR-01 Footer</h2></div>
{footer()}
</main>'''
    return page('Compositions · HELIX Design Lab', body, 'Compositions')

def standalone(title, body, nav_here='Compositions'):
    return page(title, body, nav_here, standalone=True)

def filler():
    return '<div class="hx-container hx-section"><h1 class="hx-h1" style="margin-bottom:var(--s4)">Sample page title</h1><p class="hx-p">Sample content so the sticky header can be tested while scrolling.</p>' + ''.join('<p class="hx-p" style="margin-top:var(--s4)">Sample paragraph. Scroll to test the header line, which appears after 64px. Each paragraph is placeholder text with no product claims.</p>' for _ in range(24)) + '</div>'

# ------------------------------------------------------------------ hub
def hub():
    return f'''<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>HELIX Design Lab</title><link rel="icon" href="data:,">
<link rel="stylesheet" href="components/tokens.css"><link rel="stylesheet" href="components/components.css"><link rel="stylesheet" href="lab/lab.css"></head>
<body class="hx-root"><main id="main" class="hx-container hx-section" style="max-width:760px">
<p class="hx-label">noindex · never ships · not part of the Next.js app</p>
<h1 class="hx-h1" style="margin:var(--s2) 0 var(--s4)">HELIX Design Lab</h1>
<p class="hx-p">Isolated static prototype environment for the Cyper Studio design system. Status: <b>v{V}, Round 1</b> (Direction A, DRAFT until LOCK v1.0). No real page has been redesigned.</p>
<ul class="hx-stack" style="padding-left:var(--s5);margin-top:var(--s5)">
<li><a class="hx-link" href="foundations/index.html">Foundations</a>: colour and contrast, type scale, spacing, shape, motion tokens</li>
<li><a class="hx-link" href="components/index.html">Components</a>: Button, Link, Field, Card, Badge</li>
<li><a class="hx-link" href="compositions/index.html">Compositions</a>: Header and mobile menu, Hero, Rate-card table, Footer</li>
<li><a class="hx-link" href="directions/index.html">Directions (Gate 1)</a>: the three style studies</li>
<li><a class="hx-link" href="Reference-page.html">Reference page</a>: full homepage prototype</li>
<li>Documentation: <a class="hx-link" href="docs/DESIGN_SYSTEM.md">DESIGN_SYSTEM.md</a>, decisions, and tokens in <code>docs/</code> and <code>tokens/</code></li>
<li>Motion lab, compare mode, live controls and the remaining compositions: Round 2</li></ul>
<p class="hx-p" style="margin-top:var(--s5)">Run from the repository root: <code>python3 -m http.server 4173 --directory design-system</code>, then open <code>http://localhost:4173</code>.</p>
</main></body></html>'''

# ------------------------------------------------------------------ write everything
write('index.html', hub())
write('foundations/index.html', foundations())
write('components/index.html', components())
write('compositions/index.html', compositions())
write('compositions/header.html', standalone('PRO-HDR-01 header (menu closed)', header() + sr_main(filler())))
write('compositions/header-open.html', standalone('PRO-HDR-01 header (menu open)', header(open_menu=True) + sr_main(filler())))
write('compositions/header-long-cta.html', standalone('PRO-HDR-01 header (long CTA label stress test)', header(cta='Request a demo') + sr_main(filler())))
write('compositions/header-secondary-cta.html', standalone('PRO-HDR-01 header (secondary CTA variant, D-17)', header(cta_variant='secondary') + hero(), 'Compositions'))
write('compositions/hero.html', standalone('PRO-HERO-01 hero', header() + sr_main(hero()) + footer()))
write('compositions/table.html', standalone('PRO-TBL-01 table', header() + sr_main('<div class="hx-container hx-section"><h1 class="hx-h1" style="margin-bottom:var(--s5)">Sample page title</h1>' + table() + '</div>') + footer()))
write('compositions/footer.html', standalone('PRO-FTR-01 footer', header() + sr_main(filler()) + footer()))
write('tests/hero-motion.html', standalone('Test: hero with settle motion', header() + sr_main(hero(settle=True))))
write('tests/hero-nomotion.html', standalone('Test: hero without settle motion', header() + sr_main(hero(settle=False))))
print('Lab pages written to design-system/')
