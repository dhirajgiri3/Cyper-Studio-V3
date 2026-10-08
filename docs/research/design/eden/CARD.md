# Observation card: eden

| Field | Value |
|---|---|
| URL | https://eden.so/ |
| Role | Primary |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | dark, dense, product-forward |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: Inter (23443), Geist (3607)
- Loaded font files: Geist 400 normal, Geist 500 normal, Geist 600 normal, Inter 400 normal, Inter 500 normal, Inter 600 normal
- h1: 57.6px / wt 500 / lh 60.48px / ls -2.016px / Geist / #a3a3a3
- h2: 26px / wt 500 / lh 33.8px / ls -1.04px / Geist / #ffffff a0.92
- Body: 20.48px / wt 400 / lh 28.16px / ls normal / Inter / #a3a3a3
- Button label: 13.6px / wt 400 / lh 22.1px / ls normal / Inter / #a3a3a3
- Note: Geist 500 at 57.6px/1.05 with about -0.035em tracking, with Inter for body at 20/28; emphasis inside running text is by tone (white vs grey), not weight. Section eyebrows are numbered ("05 · Sell what you know").

## Colour system
- Largest background areas: #111111 , #0a0a0a , #141414 , #161616 , #1a1a1a 
- Text colours by use: #a3a3a3, #f5f5f5, #ffffff a0.9, #737373
- Borders: 1px #ffffff a0.08, 1px #ffffff a0.1, 1px #ffffff a0.07
- Gradients in computed styles: 99; backdrop-filter elements: 46
- `color-scheme`: normal
- Note: Dark theme: #0a0a0a to #161616 grounds, #a3a3a3 body, white emphasis, 1px borders at 7 to 10% white. Locked out for HELIX (light mode only).

## Layout and rhythm
- Common container widths (px, count): [['1120', 20], ['1376', 5], ['768', 4], ['954', 3], ['978', 3]]
- Section top padding / height (first 6): [('108px', 1378), ('0px', 820), ('0px', 686)]
- Radii (value, count): [['9999px', 242], ['8px', 78], ['12px', 40], ['10px', 34], ['14px', 22]]
- Shadows: ['rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0', 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0']
- Page height at 1440: 15604 px
- Mobile 390: horizontal scroll = False
- Note: Sticky 67px blurred header with nine nav items; centred hero then a large application window; later sections are two-column with a tabbed product panel; container about 1120px; 108px section padding.

## Components
- Header: {'position': 'sticky', 'height': 67, 'bg': '#0a0a0a a0.72', 'backdrop': 'blur(20px) saturate(1.4)', 'border': '1px solid rgba(255, 255, 255, 0.08)', 'links': ['Eden', 'Marketplace', 'Referral program', 'Agencies', 'Pricing', 'Download', 'Help', 'Sign in', 'Start free']}
- Primary CTAs in first viewport: [{'label': 'New', 'bg': '#ffffff a0.09', 'color': '#ffffff a0.75', 'radius': '9999px', 'h': 32, 'pad': '0px 12px'}]
- Counts: {'gradients': 99, 'backdrop': 46, 'filters': 3, 'video': 0, 'canvas': 0, 'svg': 395, 'img': 114, 'buttons': 49, 'forms': 1, 'tables': 0, 'details': 0, 'accordionsAria': 1, 'links': 195}
- Footer: {'h': 1039, 'links': 64, 'text': "EdenThe content brain for creators and marketers.UpdatesGet the occasional email on what's working in content right now.ResourcesBlogCustom AI marketplacePricingEden for agenciesEden for teamsCareersReferral programPartn"}
- Section order (first headings): ['H1 Finally, one place to research viral posts, create original content, s', 'H2 Discover', 'H3 How I Got My Attention Span Back.', 'H3 How to Stop Wasting Your Life (Avoid These 5 Things)', 'H2 All items', 'H3 Script: How to actually grow an audience from scratch', 'H3 How to Build a Profitable Personal Brand (In Just 30 Days)', 'H2 Creators see results within days.', 'H2 Find ideas people already care about.']
- Structure note: Hero: audience line, headline with typed words, subhead with tone emphasis, one pill CTA, microcopy under it, then the app window. Then numbered feature sections with tabs.

## Product UI treatment
The first viewport already shows a working UI (sidebar, search, content cards). Later sections show tabbed product cards with real-looking data (avatars, revenue chart).

## Motion inventory
- Web Animations at load: 8; after scroll steps: [{'at': 0.2, 'n': 19}, {'at': 0.4, 'n': 19}, {'at': 0.6, 'n': 8}, {'at': 0.8, 'n': 8}]
- Named keyframes: ['ping', 'pulse', 'spin', 'eden-pulse-dot', 'eden-caret-blink', 'eden-shimmer-line', 'board-tile-in', 'hero-card-in', 'hero-fade-in', 'hero-underline-draw']
- CSS scroll-timeline rules in stylesheets: True
- IntersectionObservers created: 32; non-passive wheel listeners: 0; non-passive touch listeners: 0
- Canvas contexts: []; requestAnimationFrame calls per second at idle: 0
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): ['dataLayer']
- Reduced-motion run: animations at load 4; infinite animations still running after scroll 1
- Observed behaviour: Typed headline with a blinking caret (JS), `hero-card-in` and `board-tile-in` keyframes, shimmer line, pulse dot. The stylesheet contains scroll-timeline rules. Little continuous rAF (0 per second at idle). One infinite animation remained under reduced-motion.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 42, accessibility 84, best-practices 77, SEO 100
- LCP 18604 ms, CLS 0.017, TBT 706 ms, FCP 3632 ms; LCP element: None
- Transfer on desktop load: JS 1,127 KB, CSS 3 KB, fonts 76 KB, images 15,737 KB, media 0 KB; 129 requests
- Third parties by bytes: [['www.googletagmanager.com', 310120], ['connect.facebook.net', 271182], ['fonts.gstatic.com', 77781], ['bzrcdn.openai.com', 28202], ['fonts.googleapis.com', 2651], ['www.facebook.com', 20]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'serious': 4}; items: [('aria-prohibited-attr', 21), ('color-contrast', 70), ('html-has-lang', 1), ('scrollable-region-focusable', 1)]
- `lang`: ''; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 15411 characters of visible text; h1 in DOM: 'Finally, one place to research viral posts, create original content, sell digital products'; elements at opacity 0: 0

## Structured data and meta
- Title: 'Eden | The content brain for creators and marketers'
- Description present: True; OG image: True; JSON-LD types: ['"Organization"', '"SoftwareApplication"', '"WebSite"']

## Premium and trust signals
Product UI above the fold; numbered eyebrow labels; tone-based emphasis; blurred sticky header; dense but ordered cards.

## What not to borrow
Dark theme, typed-headline effect, backdrop-blur header, 16 MB of images (the heaviest page in the set), creator avatars and implied social proof, tracking pixels.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`, `desktop-1440-full.png`.