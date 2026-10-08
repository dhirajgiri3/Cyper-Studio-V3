# Observation card: crealo

| Field | Value |
|---|---|
| URL | https://www.crealo.app/ |
| Role | Secondary |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | flat, ledger-like, sharp |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: Ratio (2933), Manrope (2899)
- Loaded font files: Manrope 400 normal, Manrope 700 normal, Manrope 600 normal, Ratio 400 normal, Ratio 500 normal, Axeptio CJK Fallback 100 900 normal
- h1: 64px / wt 400 / lh 70.4px / ls -0.75px / Ratio / #2d2d2d
- h2: 40px / wt 400 / lh 40px / ls -0.75px / Ratio / #333333
- Body: 16px / wt 400 / lh 22.4px / ls normal / Manrope / #333333
- Button label: 14.4px / wt 600 / lh 21.6px / ls 0.4px / Manrope / #ffffff
- Note: Display face "Ratio" at 64px/1.1 with -0.012em, Manrope 16/22 body, buttons 14.4px 600 with +0.4px tracking.

## Colour system
- Largest background areas: #ffffff , #2d2d2d , #fcf6ef , #d1eef7 
- Text colours by use: #2d2d2d, #6d6d6d, #333333, #ffffff
- Borders: 1px #2d2d2d, 1px #dfe1e7, 1px #0070ff
- Gradients in computed styles: 2; backdrop-filter elements: 0
- `color-scheme`: normal
- Note: White, near-black text and a single saturated blue for CTAs (#0070ff). No shadows anywhere, 2px radii.

## Layout and rhythm
- Common container widths (px, count): [['952', 2]]
- Section top padding / height (first 6): [('0px', 802), ('0px', 1041), ('0px', 936), ('0px', 767), ('0px', 992), ('0px', 633)]
- Radii (value, count): [['2px', 16], ['6px', 1], ['4px 4px 0px 0px', 1]]
- Shadows: none
- Page height at 1440: 7096 px
- Mobile 390: horizontal scroll = False
- Note: Centred hero; right-angled buttons; three-up image row where the third image is a real data table; Webflow build; French-language page.

## Components
- Header: {'position': 'absolute', 'height': 0, 'bg': '#dddddd', 'backdrop': 'none', 'border': '0px none rgb(0, 0, 0)', 'links': []}
- Primary CTAs in first viewport: [{'label': 'Planifier une démo', 'bg': '#0070ff', 'color': '#ffffff', 'radius': '2px', 'h': 40, 'pad': '7.2px 14px'}, {'label': 'Planifier une démo', 'bg': '#0070ff', 'color': '#ffffff', 'radius': '2px', 'h': 42, 'pad': '8px 16px'}, {'label': 'Nous contacter', 'bg': '#ffffff', 'color': '#2d2d2d', 'radius': '2px', 'h': 42, 'pad': '8px 16px'}]
- Counts: {'gradients': 2, 'backdrop': 0, 'filters': 51, 'video': 0, 'canvas': 0, 'svg': 70, 'img': 100, 'buttons': 0, 'forms': 1, 'tables': 0, 'details': 0, 'accordionsAria': 8, 'links': 81}
- Footer: None
- Section order (first headings): ["H1 Logiciel de gestion des droits d'auteur pour les éditeurs", 'H2 Le système de référence pour vos droits d’auteur', 'H3 Reddition des comptes', 'H3 Gestion des cessions', 'H3 Analytics', 'H3 Gestion des contrats', 'H3 Espace auteur', 'H2 Ils recommandent Crealo', "H2 Transformez votre gestion des droits d'auteur et des contrats, simplif"]
- Structure note: Hero: category headline, one sentence, two CTAs (filled and outlined), three-image strip with the product table.

## Product UI treatment
A real table screenshot (royalty management) over an illustrative backdrop.

## Motion inventory
- Web Animations at load: 0; after scroll steps: [{'at': 0.35, 'n': 0}]
- Named keyframes: ['spin']
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 3; non-passive wheel listeners: 0; non-passive touch listeners: 1
- Canvas contexts: ['2d', 'webgl']; requestAnimationFrame calls per second at idle: 120
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): ['Webflow', 'jQuery', 'gtag', 'mixpanel', 'hj', 'dataLayer']
- Reduced-motion run: animations at load 0; infinite animations still running after scroll 0
- Observed behaviour: No Web Animations at load; 120 rAF per second at idle (a 2D/WebGL canvas); minimal.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 57, accessibility 97, best-practices 73, SEO 100
- LCP 2507 ms, CLS 0.082, TBT 5715 ms, FCP 1368 ms; LCP element: None
- Transfer on desktop load: JS 1,275 KB, CSS 1 KB, fonts 257 KB, images 497 KB, media 0 KB; 121 requests
- Third parties by bytes: [['cdn.prod.website-files.com', 1886658], ['static.axept.io', 225413], ['www.googletagmanager.com', 123173], ['script.hotjar.com', 58314], ['cdn.mxpnl.com', 34167], ['unpkg.com', 32966]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'serious': 1}; items: [('color-contrast', 10)]
- `lang`: 'fr'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 5954 characters of visible text; h1 in DOM: "Logiciel de gestion des droits d'auteur pour les éditeurs"; elements at opacity 0: 0

## Structured data and meta
- Title: "Crealo - Logiciel de gestion des droits d'auteur pour les éditeurs"
- Description present: True; OG image: True; JSON-LD types: ['"WebSite"', '"SiteNavigationElement"', '"Organization"', '["Organization","WebSite","SoftwareApplication"]']

## Premium and trust signals
Square corners, no shadows and a visible data table communicate a serious ledger tool.

## What not to borrow
Stock-style portrait photography, pastel decorative art, a floating chat widget.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`.