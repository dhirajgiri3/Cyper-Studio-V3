# Observation card: getenergy

| Field | Value |
|---|---|
| URL | https://getenergy.com/ |
| Role | Secondary |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | calm, literate, lean |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: DM Sans (10590), Quadrant Text (615), ui-monospace (401)
- Loaded font files: DM Sans 400 600 normal, Quadrant Text 400 normal
- h1: 80px / wt 400 / lh 81.6px / ls -2.4px / Quadrant Text / #1d2521
- h2: 38px / wt 400 / lh 41.8px / ls -1.14px / Quadrant Text / #1d2521
- Body: 18px / wt 400 / lh 28.8px / ls normal / DM Sans / #626965
- Button label: 16px / wt 400 / lh normal / ls normal / DM Sans / #1d2521
- Note: A serif display (Quadrant Text 400, 80px/1.02, -0.03em) with one accent-coloured word, over DM Sans 18/29 body.

## Colour system
- Largest background areas: #ffffff , #fcfcfc , #1d2521 a0.08 , #0e1512 , #edf2fb 
- Text colours by use: #1d2521, #626965, #6d7684, #6b736e
- Borders: 1px #1d2521 a0.1, 1px #1d2521 a0.08, 1px #1d2521 a0.06
- Gradients in computed styles: 22; backdrop-filter elements: 5
- `color-scheme`: normal
- Note: White with a pale blue-grey mist image behind the hero; ink-green text (#1d2521), black pill CTA, one blue accent word.

## Layout and rhythm
- Common container widths (px, count): [['1120', 15], ['655', 6], ['634', 1], ['740', 1], ['820', 1]]
- Section top padding / height (first 6): [('88px', 1323), ('96px', 401), ('136px', 975), ('136px', 1165), ('136px', 796), ('136px', 942)]
- Radii (value, count): [['999px', 52], ['12px', 22], ['7px', 21], ['8px', 16], ['10px', 11]]
- Shadows: ['rgba(70, 91, 124, 0.14) 0px 24px 60px 0px', 'rgba(43, 61, 78, 0.1) 0px 10px 36px 0px']
- Page height at 1440: 10489 px
- Mobile 390: horizontal scroll = False
- Note: Floating rounded sticky header (52px, 88% white with 18px blur); centred hero; use-case tab chips above the product frame; eight native `<details>` FAQ items.

## Components
- Header: {'position': 'sticky', 'height': 52, 'bg': '#ffffff a0.88', 'backdrop': 'blur(18px)', 'border': '1px solid rgba(255, 255, 255, 0.76)', 'links': ['energy', 'Product', 'Workflows', 'Enterprise', 'Pricing', 'Blog', 'Download for macOS']}
- Primary CTAs in first viewport: [{'label': 'Download for macOS', 'bg': '#111111', 'color': '#ffffff', 'radius': '999px', 'h': 34, 'pad': '0px 14px 0px 12px'}, {'label': 'Energy for teams', 'bg': '#ffffff a0.8', 'color': '#3d4540', 'radius': '999px', 'h': 31, 'pad': '6px 12px 6px 14px'}, {'label': 'Download for macOS', 'bg': '#111111', 'color': '#ffffff', 'radius': '999px', 'h': 56, 'pad': '8px 22px 8px 18px'}]
- Counts: {'gradients': 22, 'backdrop': 5, 'filters': 0, 'video': 1, 'canvas': 0, 'svg': 73, 'img': 35, 'buttons': 31, 'forms': 2, 'tables': 0, 'details': 8, 'accordionsAria': 0, 'links': 31}
- Footer: {'h': 544, 'links': 18, 'text': 'energyAI that finishes the whole task, across every tool your team uses.Stay in the loopProduct news and tips, straight to your inbox.Email address→ProductHow it worksAutomationsWorkflowsEnterprisePricingResourcesBlogTru'}
- Section order (first headings): ['H1 Work at the speedof thought.', 'H2 See Energy run your workflow.', 'H2 Most AI stops halfway. Energy manages the workflow.', 'H3 AI does the whole task', 'H2 Chatbots answer. Energy has a computer.', 'H3 Every tool you use', 'H3 Your permissions', 'H3 Nothing to integrate', 'H2 Runs before you ask. Tells you what changed.']
- Structure note: Hero: pill link, headline, subhead, two CTAs, platform note, use-case tabs, product frame. FAQ in native details.

## Product UI treatment
Product window under a use-case tab strip (Finance, E-commerce, Growth, People, IT).

## Motion inventory
- Web Animations at load: 0; after scroll steps: [{'at': 0.35, 'n': 2}]
- Named keyframes: ['spin', 'composer-label-in']
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 1; non-passive wheel listeners: 0; non-passive touch listeners: 0
- Canvas contexts: ['2d', 'webgl']; requestAnimationFrame calls per second at idle: 59
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): []
- Reduced-motion run: animations at load 0; infinite animations still running after scroll 2
- Observed behaviour: Almost none: 0 animations at load, 2 after scroll, one keyframe (`composer-label-in`), 1 IntersectionObserver, 76 rAF calls total. 2 infinite animations ran under reduced-motion.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 94, accessibility 100, best-practices 92, SEO 100
- LCP 2271 ms, CLS 0, TBT 234 ms, FCP 1371 ms; LCP element: None
- Transfer on desktop load: JS 136 KB, CSS 15 KB, fonts 82 KB, images 137 KB, media 0 KB; 39 requests
- Third parties by bytes: [['cdn.snitcher.com', 25779], ['radar.snitcher.com', 1193]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'serious': 1}; items: [('target-size', 2)]
- `lang`: 'en'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 9754 characters of visible text; h1 in DOM: 'Work at the speedof thought.'; elements at opacity 0: 0

## Structured data and meta
- Title: 'Energy — Work at the Speed of Thought'
- Description present: True; OG image: True; JSON-LD types: ['["Organization","WebSite","WebPage"]']

## Premium and trust signals
Proof that calm and fast coexist: 139 KB JS, 15 KB CSS, 83 KB fonts, 39 requests, Lighthouse performance 94. Native `<details>` FAQ. One accent word as the only colour in the headline.

## What not to borrow
Serif display (locked to Geist), the mist photo, the accent-coloured headline word (decorative; breaks the accent-only-for-action rule).

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`.