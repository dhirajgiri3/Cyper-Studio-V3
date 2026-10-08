# Observation card: monday

| Field | Value |
|---|---|
| URL | https://monday.com/ |
| Role | Secondary |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | energetic, broad, heavy |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: Poppins (9234), sans-serif (201)
- Loaded font files: Poppins 300 normal, Poppins 700 normal, Poppins 400 normal, Poppins 500 normal, Poppins 600 normal
- h1: 56px / wt 400 / lh 67.2px / ls -2.24px / Poppins / #000000
- h2: 56px / wt 400 / lh 67.2px / ls -1.68px / Poppins / #000000
- Body: 16.9656px / wt 400 / lh 27.145px / ls normal / Poppins / #000000
- Button label: 13px / wt 300 / lh 15.6px / ls normal / Poppins / #ffffff
- Note: Poppins 400 at 56px/1.2 with -0.04em; body 17/27.

## Colour system
- Largest background areas: #f3f4f5 , #ffffff , #f2ede9 , #000000 , #f4cdff 
- Text colours by use: #000000, #7c7b7b, #585965, #ffffff
- Borders: 1px #000000, 1px #e6e7ea a0.7, 1px #6161ff
- Gradients in computed styles: 4; backdrop-filter elements: 30
- `color-scheme`: normal
- Note: White ground, black text, a single periwinkle (#6161ff) for CTAs, links and chips; pastel status colours in the product UI.

## Layout and rhythm
- Common container widths (px, count): [['1360', 6], ['1280', 3], ['1184', 1], ['1192', 1]]
- Section top padding / height (first 6): [('0px', 592), ('0px', 249), ('0px', 791), ('0px', 1027), ('0px', 2410), ('0px', 781)]
- Radii (value, count): [['24px', 59], ['160px', 55], ['16px', 54], ['1600px', 31], ['50%', 10]]
- Shadows: ['rgba(0, 0, 0, 0.1) 0px 4px 20px 0px', 'rgba(0, 0, 0, 0.1) 0px 10px 40px 0px']
- Page height at 1440: 11405 px
- Mobile 390: horizontal scroll = False
- Note: Left-aligned two-column hero (copy left, product right); audience chips (Marketing, Operations, IT, Product, Sales, HR, PMO) under the headline; 42px header.

## Components
- Header: {'position': 'static', 'height': 42, 'bg': None, 'backdrop': 'none', 'border': '0px none rgb(0, 0, 0)', 'links': ['Enterprise', 'Pricing', 'Log in', 'Contact sales', 'Get Started']}
- Primary CTAs in first viewport: [{'label': 'Contact sales', 'bg': None, 'color': '#6161ff', 'radius': '80px', 'h': 40, 'pad': '12px 16px'}, {'label': 'Get Started', 'bg': '#6161ff', 'color': '#ffffff', 'radius': '160px', 'h': 42, 'pad': '12px 16px'}, {'label': 'Marketing', 'bg': '#d9d7ff', 'color': '#6161ff', 'radius': '32px', 'h': 32, 'pad': '8px 12px'}]
- Counts: {'gradients': 4, 'backdrop': 30, 'filters': 14, 'video': 4, 'canvas': 0, 'svg': 238, 'img': 627, 'buttons': 82, 'forms': 2, 'tables': 0, 'details': 0, 'accordionsAria': 8, 'links': 348}
- Footer: None
- Section order (first headings): ['H1 People and agents working as one team', 'H2 Get more done with agents', 'H3 Posts, campaigns and ads. Done.', 'H2 An agent for every use case', 'H2 Work in context', 'H2 Full control', 'H2 Consider yourself limitless', 'H3 Bring your own agent', 'H3 Use your favorite AI tools']
- Structure note: Hero with audience chips, one primary CTA and a reassurance line; logo row; long product tour.

## Product UI treatment
A table-based board with an overlaid "agent" card; character illustrations as supporting art.

## Motion inventory
- Web Animations at load: 4; after scroll steps: [{'at': 0.35, 'n': 4}]
- Named keyframes: ['spin', 'subtleSlideFade', 'subtleFade', 'splide-loading', 'swiper-preloader-spin', 'tagAnimation', 'breathe', 'shakeAnimation', 'magic-bounce-scale', 'orbSwoosh']
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 3; non-passive wheel listeners: 0; non-passive touch listeners: 11
- Canvas contexts: ['2d', 'webgl']; requestAnimationFrame calls per second at idle: 186
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): ['gsap', 'ScrollTrigger', 'Webflow', 'jQuery', 'Swiper', 'Splide', 'hj', '_hsq', 'dataLayer']
- Reduced-motion run: animations at load 4; infinite animations still running after scroll 4
- Observed behaviour: GSAP and ScrollTrigger, Swiper and Splide, Webflow; 4 infinite animations under reduced-motion; 186 rAF per second at idle.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 31, accessibility 97, best-practices 54, SEO 100
- LCP 11002 ms, CLS 0.001, TBT 2435 ms, FCP 4537 ms; LCP element: None
- Transfer on desktop load: JS 3,885 KB, CSS 411 KB, fonts 251 KB, images 2,126 KB, media 3,128 KB; 377 requests
- Third parties by bytes: [['dapulse-res.cloudinary.com', 3745264], ['cdn.prod.website-files.com', 2769244], ['connect.facebook.net', 242368], ['analytics.tiktok.com', 163861], ['cdn.jsdelivr.net', 140855], ['script.hotjar.com', 58315]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'serious': 1}; items: [('color-contrast', 4)]
- `lang`: 'en'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 4113 characters of visible text; h1 in DOM: 'People and agents working as one team'; elements at opacity 0: 5

## Structured data and meta
- Title: 'The AI Workspace for People & Agents | monday.com'
- Description present: True; OG image: True; JSON-LD types: ['["Organization","SoftwareApplication","WebSite","WebPage"]']

## Premium and trust signals
An audience selector directly under the headline names who the product is for in one glance.

## What not to borrow
Fortune 500 claim, mascots and illustration, 3.98 MB of JS and 377 requests, multiple CTAs per viewport.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`.