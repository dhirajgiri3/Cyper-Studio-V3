# Observation card: easypost-3pl

| Field | Value |
|---|---|
| URL | https://get.easypost.com/3pl-solutions |
| Role | Calibration: white-label / embedded shipping platform (found by search) |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | direct, form-first, corporate-friendly |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: Poppins (4372), Roboto (492)
- Loaded font files: Poppins 700 normal, Poppins 300 normal, Poppins 500 normal, Poppins 400 normal
- h1: 48px / wt 700 / lh 52.8px / ls normal / Poppins / #061340
- h2: 28px / wt 400 / lh 30.8px / ls normal / Poppins / #061340
- Body: 8px / wt 400 / lh 12px / ls normal / Poppins / #47547f
- Button label: 12px / wt 700 / lh 13.8px / ls normal / Roboto / #000000
- Note: Poppins 700 at 48px/1.1 in brand blue, Poppins body; no mono.

## Colour system
- Largest background areas: #000000 a0.7 , #f9f9f9 , #ffffff , #061340 
- Text colours by use: #47547f, #061340, #000000, #002d5b
- Borders: 1px #8d9ec1, 1px #000000, 1px #1feeb4
- Gradients in computed styles: 3; backdrop-filter elements: 0
- `color-scheme`: normal
- Note: White and mint-tinted hero, navy text (#061340), blue headline, mint CTA; subtle line-art shapes in the background.

## Layout and rhythm
- Common container widths (px, count): []
- Section top padding / height (first 6): [('0px', 4987), ('0px', 4987)]
- Radii (value, count): [['4px', 9], ['3px', 2], ['50%', 2], ['5px', 1], ['10px', 1]]
- Shadows: ['rgba(0, 0, 0, 0.25) 0px 0px 35px 0px']
- Page height at 1440: 4987 px
- Mobile 390: horizontal scroll = False
- Note: Minimal header (logo only, no nav) on a landing page; two-column hero with copy left and a six-field demo form plus consent right; a cookie banner overlays the lower viewport.

## Components
- Header: {'position': 'static', 'height': 108, 'bg': '#ffffff', 'backdrop': 'none', 'border': '0px none rgb(0, 0, 0)', 'links': []}
- Primary CTAs in first viewport: [{'label': 'Preferences', 'bg': None, 'color': '#000000', 'radius': '3px', 'h': 31, 'pad': '7.5px 24px'}, {'label': 'Accept', 'bg': '#1feeb4', 'color': '#000000', 'radius': '3px', 'h': 31, 'pad': '7.5px 24px'}]
- Counts: {'gradients': 3, 'backdrop': 0, 'filters': 0, 'video': 0, 'canvas': 0, 'svg': 11, 'img': 34, 'buttons': 6, 'forms': 1, 'tables': 0, 'details': 0, 'accordionsAria': 0, 'links': 19}
- Footer: None
- Section order (first headings): ['H1 The Shipping Platform Built for3PL Scale', 'H2 EasyPost is built for the way modern 3PLs operate', 'H3 Shipping Complexity Is Now a Core 3PL Challenge', 'H3 Offering Shipping as a Service to Your Clients?', 'H3 Stop Making Carrier Decisions Based on Two-Year-Old Rules', 'H2 Trusted by companies worldwide', 'H3 Stop Overpaying on Every Label', 'H3 Ready To Scale Your 3PL Shipping Infrastructure?']
- Structure note: Hero: audience-specific headline, two-sentence claim, short pain paragraph, form. Below: feature columns for sub-accounts, parcel and freight, self-serve configuration.

## Product UI treatment
No product UI above the fold; the lead form is the visual. Numeric claims in the sub-headline ("100+ carriers. 99.99% uptime.") that HELIX cannot make today.

## Motion inventory
- Web Animations at load: 1; after scroll steps: [{'at': 0.2, 'n': 1}, {'at': 0.4, 'n': 1}, {'at': 0.6, 'n': 1}, {'at': 0.8, 'n': 1}]
- Named keyframes: ['scrollDown', 'fadeIn', 'pulse-ring', 'pulse-dot', 'bounce', 'flash', 'rubberBand', 'shake', 'headShake', 'swing']
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 4; non-passive wheel listeners: 0; non-passive touch listeners: 0
- Canvas contexts: ['2d', 'webgl']; requestAnimationFrame calls per second at idle: 0
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): ['jQuery', 'gtag', '_hsq', 'dataLayer']
- Reduced-motion run: animations at load 1; infinite animations still running after scroll 0
- Observed behaviour: Practically none: 1 animation, 49 rAF calls in total, no infinite animations.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 36, accessibility 93, best-practices 73, SEO 69
- LCP 4895 ms, CLS 0.305, TBT 877 ms, FCP 2960 ms; LCP element: None
- Transfer on desktop load: JS 1,458 KB, CSS 44 KB, fonts 197 KB, images 737 KB, media 0 KB; 148 requests
- Third parties by bytes: [['www.googletagmanager.com', 365086], ['connect.facebook.net', 216095], ['app.termly.io', 173811], ['tools.luckyorange.com', 151522], ['easypost.chilipiper.com', 53088], ['js.hs-analytics.net', 44039]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'serious': 2}; items: [('color-contrast', 1), ('frame-title', 1)]
- `lang`: 'en'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 4327 characters of visible text; h1 in DOM: 'The Shipping Platform Built for3PL Scale'; elements at opacity 0: 0

## Structured data and meta
- Title: 'EasyPost 3PL Shipping Solution | Multi-Carrier Shipping Built to Scale'
- Description present: True; OG image: False; JSON-LD types: ['"VideoObject"']

## Premium and trust signals
Honest directness: the form is the first thing, labels above fields, strong 1px field borders (#8d9ec1) that clearly delimit inputs. It shows a form-in-hero pattern for B2B lead capture.

## What not to borrow
Numeric claims, a form that requires a phone number and business type up front (Spec 12.3 does not ask for a phone number), generic gradient shapes, an overlay cookie banner that covers content.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`, `desktop-1440-full.png`.