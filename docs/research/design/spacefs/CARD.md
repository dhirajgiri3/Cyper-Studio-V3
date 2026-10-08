# Observation card: spacefs

| Field | Value |
|---|---|
| URL | https://spacefs.com/ |
| Role | Primary |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | airy, soft, product-led |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: Google Sans (4904), -apple-system (2104), SF Mono (744), Helvetica Neue (328)
- Loaded font files: Google Sans 400 700 normal, Google Sans Code 400 600 normal
- h1: 76px / wt 400 / lh 77.52px / ls -2.66px / Google Sans / #0e0f12
- h2: 60px / wt 400 / lh 62.4px / ls -2.1px / Google Sans / #0e0f12
- Body: 17px / wt 400 / lh 27.625px / ls normal / Google Sans / #686d78
- Button label: 14px / wt 500 / lh 20px / ls normal / Google Sans / #0e0f12
- Note: Display weight is regular (400) with a tone shift: line one in ink, line two in a mid-grey. Tracking about -0.035em at 76px. A single humanist sans does everything; the OS-window mockup supplies the only "UI" typography.

## Colour system
- Largest background areas: #f7f8fa , #ffffff , #2a1d14 , #0e0f12 a0.024 , #e9ecf2 
- Text colours by use: #686d78, #0e0f12, #1d1d1f, #000000 a0.85
- Borders: 1px #0f172a a0.09, 1px #0e0f12 a0.08, 1px #0f172a a0.08
- Gradients in computed styles: 36; backdrop-filter elements: 42
- `color-scheme`: light
- Note: Near-white cool page (#f7f8fa) with ink text and a mid-grey secondary; almost no accent colour in the chrome. Colour comes from a particle-field backdrop and the product mockup, not from the interface.

## Layout and rhythm
- Common container widths (px, count): [['1280', 7], ['1200', 6], ['768', 3], ['672', 2], ['620', 1]]
- Section top padding / height (first 6): [('0px', 900), ('0px', 2891), ('96px', 1327), ('96px', 1324), ('96px', 1790), ('96px', 1171)]
- Radii (value, count): [['9999px', 62], ['6px', 53], ['4px', 35], ['7px', 26], ['28px', 10]]
- Shadows: ['rgba(0, 0, 0, 0.12) 0px 0px 0px 0.5px inset', 'rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset, rgba(15, 23,']
- Page height at 1440: 12458 px
- Mobile 390: horizontal scroll = False
- Note: Centred single-column hero, wide airy gaps, a floating pill-shaped nav (Menu button centre, CTA right). The page is about 12,458px tall at 1440 wide. A scroll-pinned hero swaps its headline while the page scrolls (headline changed between the 0% and 40% frames).

## Components
- Header: {'position': 'fixed', 'height': 80, 'bg': None, 'backdrop': 'none', 'border': '0px solid rgb(229, 231, 235)', 'links': ['Space', 'Download']}
- Primary CTAs in first viewport: [{'label': 'Skip to main content', 'bg': '#f7f8fa', 'color': '#0e0f12', 'radius': '6px', 'h': 52, 'pad': '12px 16px'}, {'label': 'Space', 'bg': '#ffffff a0.66', 'color': '#0e0f12', 'radius': '9999px', 'h': 52, 'pad': '0px'}, {'label': 'Download', 'bg': '#0e0f12', 'color': '#f7f8fa', 'radius': '9999px', 'h': 40, 'pad': '0px 16px'}]
- Counts: {'gradients': 36, 'backdrop': 42, 'filters': 1, 'video': 1, 'canvas': 1, 'svg': 52, 'img': 108, 'buttons': 22, 'forms': 0, 'tables': 0, 'details': 0, 'accordionsAria': 15, 'links': 38}
- Footer: {'h': 809, 'links': 22, 'text': 'SpaceThe infinite AI-native filesystem.DownloadProductOverviewSpace SearchUse casesPricingFAQIndustriesDevelopersEnterpriseCompanyBlogChangelogAboutContactLegalPrivacy NoticeTerms of UseCookie PolicySocialXGitHubLinkedIn'}
- Section order (first headings): ['H1 The infiniteAI-native filesystem', 'H2 Terabytes of files.Zero bytes on disk.', 'H2 Never wait for file transfers again', 'H3 Files open instantly', 'H3 Instant sync and collaboration', 'H3 Works with the apps you already use', 'H3 Your agents work in it too', 'H3 Persistent and versioned', 'H2 Find anything.Ask anything.']
- Structure note: Hero: category line in two tones, one sentence, one CTA, platform note. Then a pinned feature story with a tab strip over a product window. Footer lists company, legal and pricing links (Spec R-01).

## Product UI treatment
A large OS-window mockup is the main visual from the second scroll step; a tab strip (Search / AI / Drives / Team / Clipboard) selects views of the product. The first viewport has no product UI, only atmosphere.

## Motion inventory
- Web Animations at load: 6; after scroll steps: [{'at': 0.2, 'n': 6}, {'at': 0.4, 'n': 7}, {'at': 0.6, 'n': 8}, {'at': 0.8, 'n': 7}]
- Named keyframes: ['pulse', 'launcher-caret', 'launcher-shimmer', 'launcher-word-in', 'launcher-spin', 'pulse-dot', 'blink', 'stream-fill', 'drop-pulse', 'fade-in']
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 28; non-passive wheel listeners: 0; non-passive touch listeners: 0
- Canvas contexts: ['webgl']; requestAnimationFrame calls per second at idle: 61
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): []
- Reduced-motion run: animations at load 1; infinite animations still running after scroll 0
- Observed behaviour: Particle field rendered on a WebGL canvas, running continuously (about 61 requestAnimationFrame calls per second at idle). Scroll-pinned headline swap. 28 IntersectionObserver instances. Wheel and touch listeners are all passive; scrolling was native (300px wheel moved exactly 300px). Under reduced-motion no infinite animations were still running.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 39, accessibility 93, best-practices 73, SEO 91
- LCP 8310 ms, CLS 0, TBT 1309 ms, FCP 3354 ms; LCP element: None
- Transfer on desktop load: JS 872 KB, CSS 3 KB, fonts 69 KB, images 998 KB, media 0 KB; 127 requests
- Third parties by bytes: [['connect.facebook.net', 271531], ['fonts.gstatic.com', 70864], ['www.redditstatic.com', 25168], ['static.cloudflareinsights.com', 10438], ['fonts.googleapis.com', 3117], ['pixel-config.reddit.com', 389]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'serious': 2}; items: [('color-contrast', 35), ('html-has-lang', 1)]
- `lang`: ''; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 8698 characters of visible text; h1 in DOM: 'The infiniteAI-native filesystem'; elements at opacity 0: 0

## Structured data and meta
- Title: 'Space | The infinite AI-native filesystem'
- Description present: True; OG image: True; JSON-LD types: []

## Premium and trust signals
Very large tightly-tracked display type with a tone shift instead of weight; a single black pill CTA; real-product mockup; hairline 0.5px inset borders and very soft shadows; one plain declarative line under the headline.

## What not to borrow
WebGL particle backdrop (about 893 KB JS, continuous rAF), scroll-pinned headline swaps, third-party pixels (Facebook, Reddit), "Backed by" investor chip (HELIX has no such claim), a fonts host at runtime.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`, `desktop-1440-full.png`.