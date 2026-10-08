# Observation card: handhold

| Field | Value |
|---|---|
| URL | https://handhold.io/ |
| Role | Primary |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | editorial, warm, atmospheric |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: Inter (4513), bureauSerif (1364)
- Loaded font files: Inter 100 900 normal, bureauSerif 200 normal
- h1: 72px / wt 200 / lh 72px / ls -2.16px / bureauSerif / lab(0 0 0)
- h2: 40px / wt 200 / lh 40px / ls -1.2px / bureauSerif / lab(0 0 0)
- Body: 16px / wt 400 / lh 24px / ls -0.18px / Inter / lab(0 0 0)
- Button label: 14px / wt 400 / lh 20px / ls -0.13px / Inter / lab(0 0 0)
- Note: Light-weight serif display (weight 200) at 72px with about -0.03em tracking over Inter 16/24 body. The contrast between a hairline serif and a neutral sans is the whole typographic personality.

## Colour system
- Largest background areas: lab(95.139 -0.175655 2.06032) , lab(0 0 0 / 0.4) , #f2f1ed , lab(100 0 0) 
- Text colours by use: lab(0 0 0 / 0.55), lab(0 0 0), lab(0 0 0 / 0.4), lab(100 0 0)
- Borders: 1px null, 1px #000000, 1px lab(86.0894 0.121564 5.46051)
- Gradients in computed styles: 2; backdrop-filter elements: 0
- `color-scheme`: light
- Note: Warm off-white (#f2f1ed) and near-black; colour appears only inside soft grain gradients (green, orange, blue ribbons) in demo cards and the hero ribbon. Colour values are `lab()`, so site tokens are not hex.

## Layout and rhythm
- Common container widths (px, count): [['1376', 9], ['1184', 2], ['683', 1], ['1408', 1]]
- Section top padding / height (first 6): [('0px', 828), ('0px', 2101), ('0px', 292), ('0px', 428)]
- Radii (value, count): [['3.35544e+07px', 38], ['32px', 9], ['8px', 1], ['24px', 1]]
- Shadows: ['rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0']
- Page height at 1440: 7629 px
- Mobile 390: horizontal scroll = False
- Note: Centred hero; two-column feature rows alternating copy and a gradient demo card; hairline-separated list rows beside each card; container about 1376px; generous vertical space.

## Components
- Header: {'position': 'relative', 'height': 72, 'bg': None, 'backdrop': 'none', 'border': '0px solid rgb(0, 0, 0)', 'links': ['Sign in', 'Try for free']}
- Primary CTAs in first viewport: [{'label': 'Try for free', 'bg': 'lab(0 0 0)', 'color': 'lab(100 0 0)', 'radius': '3.35544e+07px', 'h': 40, 'pad': '8px 16px'}, {'label': 'See AI demo', 'bg': 'lab(0 0 0)', 'color': 'lab(100 0 0)', 'radius': '3.35544e+07px', 'h': 40, 'pad': '8px 16px'}, {'label': 'Try for free', 'bg': 'lab(95.139 -0.175655 2.06032)', 'color': 'lab(0 0 0)', 'radius': '3.35544e+07px', 'h': 40, 'pad': '8px 16px'}]
- Counts: {'gradients': 2, 'backdrop': 0, 'filters': 0, 'video': 0, 'canvas': 7, 'svg': 66, 'img': 16, 'buttons': 24, 'forms': 0, 'tables': 0, 'details': 0, 'accordionsAria': 8, 'links': 14}
- Footer: {'h': 276, 'links': 7, 'text': 'Handhold (“Handhold”) provides technology and AI-powered agents designed to help businesses engage visitors, qualify inbound leads, deliver personalized product experiences, and guide users through onboarding. Handhold i'}
- Section order (first headings): ['H1 A dedicated guide for every buyer', 'H2 See Handhold in action', 'H2 Deploy agents across your customer journey', 'H2 Help leads validate with AI chat', 'H2 Give 1:1 demos at scale with an AI expert', 'H2 Provide tailored onboarding with an AI guide', 'H2 Get started in minutes', 'H2 1.', 'H2 2.']
- Structure note: Hero: outcome headline, one-line subhead, two pill CTAs, logo row. Then alternating agent sections each with a tag chip, headline, three hairline-separated benefit rows, and a visual.

## Product UI treatment
Product shown as stylised wireframe cards on gradient grounds with a chat bubble, not as a literal screenshot; logo row near the hero.

## Motion inventory
- Web Animations at load: 0; after scroll steps: [{'at': 0.2, 'n': 0}, {'at': 0.4, 'n': 0}, {'at': 0.6, 'n': 0}, {'at': 0.8, 'n': 0}]
- Named keyframes: ['logoSlide', 'livePulse', 'accordionDown', 'accordionUp', 'spin', 'pulse', 'swipe-out-left', 'swipe-out-right', 'swipe-out-up', 'swipe-out-down']
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 30; non-passive wheel listeners: 1; non-passive touch listeners: 1
- Canvas contexts: ['webgl2']; requestAnimationFrame calls per second at idle: 60
- Wheel scroll behaviour: page did not scroll under wheel input (a dialog or scroll lock was active; inconclusive)
- Globals detected (libraries / platforms): ['plausible']
- Reduced-motion run: animations at load 0; infinite animations still running after scroll 0
- Observed behaviour: WebGL2 ribbon in the hero and 7 canvases in total; 30 IntersectionObserver instances; keyframes include logo slide, live pulse, accordion. A cookie dialog was open during the wheel probe and the page did not scroll, so that probe is inconclusive and is NOT treated as a hijack.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 38, accessibility 100, best-practices 96, SEO 92
- LCP 12872 ms, CLS 0, TBT 1606 ms, FCP 2339 ms; LCP element: None
- Transfer on desktop load: JS 1,070 KB, CSS 29 KB, fonts 600 KB, images 2,245 KB, media 0 KB; 185 requests
- Third parties by bytes: []

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {}; items: []
- `lang`: 'en-GB'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 0 characters of visible text; h1 in DOM: 'A dedicated guide for every buyer'; elements at opacity 0: 6

## Structured data and meta
- Title: 'Handhold'
- Description present: True; OG image: True; JSON-LD types: ['["Organization","WebSite","Person","Person"]']

## Premium and trust signals
Hairline serif against neutral sans; soft grain; strict alignment; short row labels with hairline dividers; restrained black pill buttons.

## What not to borrow
Serif or light display weight (Geist is locked), grain gradients and WebGL ribbons, logo wall, a page that is blank with JavaScript disabled, a modal cookie dialog that blocks the first viewport.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`, `desktop-1440-full.png`.