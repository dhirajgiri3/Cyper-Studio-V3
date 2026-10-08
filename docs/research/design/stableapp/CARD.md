# Observation card: stableapp

| Field | Value |
|---|---|
| URL | https://www.stableapp.cloud/ |
| Role | Primary |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | data-forward, approachable, soft-violet |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: Plus Jakarta Sans (7227)
- Loaded font files: Plus Jakarta Sans 400 normal, Plus Jakarta Sans 400 italic, Plus Jakarta Sans 500 normal, Plus Jakarta Sans 700 normal
- h1: 36px / wt 500 / lh 44px / ls normal / Plus Jakarta Sans / #191919
- h2: 64px / wt 500 / lh 80px / ls normal / Plus Jakarta Sans / #474747
- Body: 20px / wt 400 / lh 32px / ls normal / Plus Jakarta Sans / #191919 a0.56
- Button label: 16px / wt 400 / lh 24px / ls normal / Plus Jakarta Sans / #ffffff
- Note: Plus Jakarta Sans 500; h2 at 64px/80 and 20/32 body; wordmark-as-headline in the hero. Large numerals inside the product frame carry authority.

## Colour system
- Largest background areas: #f8f9fe , #f5f4fb , #ffffff , #f0f0f0 a0.4 , #e7e3f5 
- Text colours by use: #191919 a0.56, #ffffff, #745ac6, #c6bbe7
- Borders: 1px #191919 a0.16, 1px #745ac6, 1px #848484
- Gradients in computed styles: 66; backdrop-filter elements: 31
- `color-scheme`: normal
- Note: Cool off-white (#f8f9fe) and lilac surfaces with ink text and a violet accent used for buttons and links; blurred violet blobs sit behind the hero.

## Layout and rhythm
- Common container widths (px, count): [['1380', 12], ['1150', 5], ['1360', 4], ['690', 1], ['750', 1]]
- Section top padding / height (first 6): [('120px', 620), ('120px', 705), ('88px', 1078), ('120px', 852), ('120px', 678), ('120px', 514)]
- Radii (value, count): [['8px', 28], ['30px', 18], ['999px', 16], ['40px', 15], ['24px', 4]]
- Shadows: ['rgba(9, 14, 21, 0.16) 0px 5px 40px 0px']
- Page height at 1440: 13235 px
- Mobile 390: horizontal scroll = False
- Note: Centred hero; 120px section padding; 1150 to 1380px containers; carousels for features and testimonials; a client logo marquee.

## Components
- Header: {'position': 'relative', 'height': 68, 'bg': None, 'backdrop': 'none', 'border': '0px none rgba(25, 25, 25, 0.56)', 'links': ['Pricing', 'Resources', 'Help Center', 'Login', 'Free Trial']}
- Primary CTAs in first viewport: []
- Counts: {'gradients': 66, 'backdrop': 31, 'filters': 1, 'video': 1, 'canvas': 0, 'svg': 20, 'img': 66, 'buttons': 41, 'forms': 1, 'tables': 0, 'details': 0, 'accordionsAria': 30, 'links': 63}
- Footer: {'h': 891, 'links': 17, 'text': 'Amazon Web Services Resources Help Center Login Fr 🇫🇷 AWS Partner AWS Partner Evaluation AWS Meetup Québec Amazon Web Services AWS Partner AWS Partner Evaluation AWS Meetup Québec Social Links LinkedIn © 2026 Stable Po'}
- Section order (first headings): ['H1 Where no AWS waste can hide', 'H2 Crush your AWS cost creep', 'H2 Stable goes deeper', 'H3 The result?', 'H2 Features', 'H3 Prioritized recommendations for cost optimization', 'H3 Impact assessment', 'H3 Cost exploration', 'H3 Real-time, smart alerts']
- Structure note: Hero: wordmark, one-line promise, product frame. Then a testimonial carousel, clients, feature carousel with headings per feature (Prioritised recommendations, Impact assessment, ...).

## Product UI treatment
Most relevant to HELIX in the set: the first viewport shows a real data screen (cost cards, a table with severity chips EASY / MEDIUM / ADVANCED, currency figures) inside a device frame. Outlined status chips with semantic colour encode state.

## Motion inventory
- Web Animations at load: 0; after scroll steps: [{'at': 0.2, 'n': 0}, {'at': 0.4, 'n': 0}, {'at': 0.6, 'n': 0}, {'at': 0.8, 'n': 0}]
- Named keyframes: ['spinner-border', 'spinner-grow', 'splide-loading', 'launcherEnter']
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 18; non-passive wheel listeners: 0; non-passive touch listeners: 2
- Canvas contexts: ['2d', 'webgl']; requestAnimationFrame calls per second at idle: 260
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): ['jQuery', 'gtag', 'Intercom', 'dataLayer']
- Reduced-motion run: animations at load 0; infinite animations still running after scroll 0
- Observed behaviour: A canvas (2D and WebGL) runs continuously (about 260 rAF calls per second at idle); Splide carousels; Intercom widget. No Web Animations at load.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 42, accessibility 93, best-practices 77, SEO 100
- LCP 5923 ms, CLS 0, TBT 1001 ms, FCP 3120 ms; LCP element: None
- Transfer on desktop load: JS 1,817 KB, CSS 19 KB, fonts 49 KB, images 522 KB, media 1,377 KB; 103 requests
- Third parties by bytes: [['js.intercomcdn.com', 975121], ['www.gstatic.com', 356031], ['www.googletagmanager.com', 179064], ['www.youtube.com', 9429], ['api-iam.intercom.io', 8124], ['widget.intercom.io', 2499]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'serious': 1}; items: [('link-name', 1)]
- `lang`: 'en-US'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 6017 characters of visible text; h1 in DOM: 'Where no AWS waste can hide'; elements at opacity 0: 0

## Structured data and meta
- Title: 'Home - Stable'
- Description present: True; OG image: True; JSON-LD types: ['["WebPage","BreadcrumbList","WebSite"]']

## Premium and trust signals
A genuinely dense real table in the hero is the strongest credibility signal observed; chips with outline plus tint; large figures; consistent 120px rhythm.

## What not to borrow
Blurred gradient blobs, client logos and testimonials (HELIX may not claim them), carousels, the Intercom launcher (975 KB), an award badge, 1.86 MB of JS.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`, `desktop-1440-full.png`.