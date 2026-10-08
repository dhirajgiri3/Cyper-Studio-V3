# Observation card: shiprocket

| Field | Value |
|---|---|
| URL | https://www.shiprocket.in/ |
| Role | Calibration: logistics (the incumbent aggregator operators rent) |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | busy, promotional, gradient-heavy |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: ManropeRegular (6289), ManropeMed (6258), TWKLausanneSemi (3106), TWKLausanne (2222)
- Loaded font files: TWKLausanne200 200 normal, TWKLausanne 300 normal, TWKLausanneSemi 500 normal, ManropeMed 400 normal, ManropeRegular 500 normal
- h1: 50px / wt 400 / lh 58px / ls normal / TWKLausanneSemi / #141413
- h2: 46px / wt 400 / lh 65px / ls normal / TWKLausanneSemi / #141413
- Body: 14px / wt 400 / lh 19.6px / ls normal / ManropeRegular / #09074f
- Button label: 14px / wt 400 / lh 19.6px / ls normal / ManropeRegular / #50504c
- Note: TWK Lausanne (two weights) for headings at 50px and Manrope for body; 5 font files loaded.

## Colour system
- Largest background areas: #f4f4f6 , #ffffff , #141413 , #000000 , #d1ff00 a0.54 
- Text colours by use: #141413, #735ae5, #bdbdbd, #c9c6c6
- Borders: 1px #dcdcdc a0.23, 1px #141413, 1px #cbcad7 a0.4
- Gradients in computed styles: 15; backdrop-filter elements: 1
- `color-scheme`: normal
- Note: Light grey ground (#f4f4f6), near-black, a violet (#735ae5) for actions and a lime (#d1ff00) highlight; a pastel rainbow gradient fills the hero.

## Layout and rhythm
- Common container widths (px, count): [['1320', 42]]
- Section top padding / height (first 6): [('140px', 710), ('48px', 235), ('70px', 364), ('0px', 3910), ('70px', 682), ('70px', 940)]
- Radii (value, count): [['6px', 178], ['50px', 28], ['10px', 19], ['20px', 16], ['12px', 15]]
- Shadows: ['rgba(32, 56, 85, 0.09) 0px 6px 10px 0px', 'rgba(16, 24, 40, 0.06) 0px 1px 2px 0px']
- Page height at 1440: 16252 px
- Mobile 390: horizontal scroll = False
- Note: Promo banner above a 92px header with 9 nav items; left-aligned hero with a phone-number sign-up field; autoplay carousel controls; a dark band with a marquee of customer logos.

## Components
- Header: {'position': 'static', 'height': 92, 'bg': None, 'backdrop': 'none', 'border': '0px none rgb(80, 80, 76)', 'links': ['Products', 'Platform', 'Pricing', 'Partners', 'Track Order', 'Resources', 'Investors', 'Log In', 'Try for Free']}
- Primary CTAs in first viewport: [{'label': 'Signup Now', 'bg': '#ffffff', 'color': '#0b0757', 'radius': '8px', 'h': 29, 'pad': '5px 8px'}, {'label': 'Log In', 'bg': None, 'color': '#735ae5', 'radius': '10px', 'h': 40, 'pad': '9.6px 24px'}, {'label': 'Try for Free', 'bg': '#735ae5', 'color': '#ffffff', 'radius': '10px', 'h': 40, 'pad': '9.6px 16px'}]
- Counts: {'gradients': 15, 'backdrop': 1, 'filters': 12, 'video': 0, 'canvas': 1, 'svg': 22, 'img': 385, 'buttons': 32, 'forms': 3, 'tables': 0, 'details': 0, 'accordionsAria': 2, 'links': 219}
- Footer: {'h': 1343, 'links': 61, 'text': '<img decoding="async" width="141" height="32" src="https://sr-website.shiprocket.in/wp-content/uploads/2024/11/Shiprocket-Logo-White.svg" alt="" class="wp-image-43773"/> <img decoding="async" src="https://sr-website.ship'}
- Section order (first headings): ['H1 Shiprocket, Your Partner for eCommerce Empowerment', 'H3 Sign Up for Exclusive Discounts', 'H1 Redefining Domestic Shipping-Seamless in Every Way', 'H1 Cross Border Commerce-Fulfill Your Global Aspirations', 'H1 AI Powered Solutions for Marketing Growth', 'H1 Financial Services, Supporting Your Ambitions at Every Step', 'H3 Building Success Stories with 4 Lakhs+ Businesses', 'H3 Unified domestic shipping', 'H3 Full-stack global enablement']
- Structure note: Hero with phone sign-up, logos, then product-family sections with the same pattern (headline, three bullets, visual).

## Product UI treatment
A collage of product widgets (order summary, WhatsApp message, "Ready to Ship" card) next to a smiling person photo.

## Motion inventory
- Web Animations at load: 9; after scroll steps: [{'at': 0.2, 'n': 25}, {'at': 0.4, 'n': 9}, {'at': 0.6, 'n': 11}, {'at': 0.8, 'n': 9}]
- Named keyframes: ['show-content-image', 'turn-on-visibility', 'turn-off-visibility', 'lightbox-zoom-in', 'lightbox-zoom-out', 'srScrimFade', 'b', 'c', 'd', 'e']
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 3; non-passive wheel listeners: 1; non-passive touch listeners: 1
- Canvas contexts: ['2d', 'webgl']; requestAnimationFrame calls per second at idle: 127
- Wheel scroll behaviour: non-linear (possible smoothing)
- Globals detected (libraries / platforms): ['gsap', 'ScrollTrigger', 'Lenis', 'jQuery', 'gtag', 'dataLayer']
- Reduced-motion run: animations at load 8; infinite animations still running after scroll 0
- Observed behaviour: Lenis smooth-scroll class present with a non-passive wheel listener (scroll behaviour is custom); GSAP and ScrollTrigger; carousel; 127 rAF per second at idle.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 57, accessibility 74, best-practices 73, SEO 85
- LCP 3096 ms, CLS 0, TBT 8554 ms, FCP 1896 ms; LCP element: None
- Transfer on desktop load: JS 2,043 KB, CSS 105 KB, fonts 154 KB, images 5,734 KB, media 0 KB; 259 requests
- Third parties by bytes: [['www.googletagmanager.com', 1020047], ['www.gstatic.com', 356031], ['connect.facebook.net', 274818], ['cdn.moengage.com', 118744], ['cdn.branch.io', 27898], ['scripts.clarity.ms', 26111]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'serious': 5, 'critical': 1}; items: [('aria-hidden-focus', 9), ('button-name', 4), ('color-contrast', 1), ('link-in-text-block', 3), ('list', 7)]
- `lang`: 'en-US'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 10205 characters of visible text; h1 in DOM: 'Shiprocket, Your Partner for eCommerce Empowerment'; elements at opacity 0: 19

## Structured data and meta
- Title: 'Shiprocket: Your All-in-One eCommerce Growth Partner'
- Description present: True; OG image: True; JSON-LD types: ['["WebPage","BreadcrumbList","WebSite","Organization"]']

## Premium and trust signals
Product widgets shown in real context (a WhatsApp confirmation, an order summary) make capabilities concrete.

## What not to borrow
Everything about density and noise: promo banner, rainbow gradients, stock-style portrait, carousel, customer-logo marquee and numeric claims ("4 Lakhs+ Businesses"), the banned words "Seamless" and "Empowerment" in headlines, 2.1 MB JS and 5.9 MB images. Useful as a contrast: HELIX can say less, truthfully, and show the operator console instead.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`, `desktop-1440-full.png`.