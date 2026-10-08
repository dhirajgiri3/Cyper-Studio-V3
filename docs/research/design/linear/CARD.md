# Observation card: linear

| Field | Value |
|---|---|
| URL | https://linear.app/ |
| Role | Calibration: infrastructure SaaS (counter-example) |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | dark, kinetic, polished |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: Inter Variable (7412), Berkeley Mono (1339)
- Loaded font files: Inter Variable 100 900 normal, Berkeley Mono 100 900 normal
- h1: 64px / wt 510 / lh 64px / ls -1.408px / Inter Variable / #f7f8f8
- h2: 48px / wt 510 / lh 48px / ls -1.056px / Inter Variable / #8a8f98
- Body: 15px / wt 400 / lh 24px / ls -0.165px / Inter Variable / #8a8f98
- Button label: 13px / wt 400 / lh 19.5px / ls normal / Inter Variable / #8a8f98
- Note: Inter Variable at weight 510, 64px/1.0, -0.022em; Berkeley Mono for code and labels. The only very-light-on-dark treatment in the set.

## Colour system
- Largest background areas: #08090a , #0f1011 , #090a0b , #101112 , #ffffff a0.01 
- Text colours by use: #8a8f98, #d0d6e0, #62666d, #f7f8f8
- Borders: 1px #ffffff a0.08, 1px #ffffff a0.12, 1px #ffffff a0.05
- Gradients in computed styles: 58; backdrop-filter elements: 2
- `color-scheme`: dark
- Note: Near-black (#08090a) with off-white text; 1px borders at 5 to 12% white; 58 gradient surfaces. Dark theme is outside the locked system.

## Layout and rhythm
- Common container widths (px, count): [['1344', 16], ['672', 12], ['674', 4], ['1392', 2], ['1436', 2]]
- Section top padding / height (first 6): [('0px', 9394), ('128px', 1226), ('128px', 1229), ('128px', 1232), ('128px', 1220), ('0px', 564)]
- Radii (value, count): [['9999px', 72], ['8px', 29], ['4px', 22], ['12px', 19], ['9px', 18]]
- Shadows: ['rgba(0, 0, 0, 0.2) 0px 0px 0px 1px', 'rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset']
- Page height at 1440: 9960 px
- Mobile 390: horizontal scroll = False
- Note: Fixed 73px blurred header; centred hero; dense bento-style product panels with hundreds of animated grid dots (grid-dot keyframes).

## Components
- Header: {'position': 'fixed', 'height': 73, 'bg': None, 'backdrop': 'blur(20px)', 'border': '1px solid rgba(255, 255, 255, 0.08)', 'links': ['Customers', 'Pricing', 'Now', 'Contact', 'Log in', 'Sign up']}
- Primary CTAs in first viewport: [{'label': 'Sign up', 'bg': '#e5e5e6', 'color': '#08090a', 'radius': '9999px', 'h': 32, 'pad': '0px 12px'}, {'label': '', 'bg': '#ffffff a0.02', 'color': '#e2e4e7', 'radius': '9999px', 'h': 28, 'pad': '0px'}]
- Counts: {'gradients': 58, 'backdrop': 2, 'filters': 10, 'video': 0, 'canvas': 0, 'svg': 228, 'img': 39, 'buttons': 71, 'forms': 0, 'tables': 0, 'details': 0, 'accordionsAria': 5, 'links': 74}
- Footer: {'h': 494, 'links': 42, 'text': 'ProductIntakePlanAIBuildPricingSecurityFeaturesAsksAgentsCoding SessionsCustomer RequestsInsightsMobileIntegrationsChangelogCompanyAboutCustomersCareersNowMethodQualityBrandResourcesSwitchDownloadDocumentationDocsDevelop'}
- Section order (first headings): ['H1 The product development system for teams and agentsThe product develop', 'H3 Faster app launch', 'H2 A new species of product tool. Purpose-built for modern teams with AI ', 'H2 Intakeand integrations', 'H2 Planningand monitoring', 'H2 AI andautomations', 'H2 Build, review,and ship', 'H2 Changelog', 'H2 Built for the future. Available today.']
- Structure note: Hero headline, product panels, feature bento; pricing and contact in header.

## Product UI treatment
Interactive product panels with extensive micro-animation in place of screenshots.

## Motion inventory
- Web Animations at load: 82; after scroll steps: [{'at': 0.2, 'n': 83}, {'at': 0.4, 'n': 522}, {'at': 0.6, 'n': 526}, {'at': 0.8, 'n': 520}]
- Named keyframes: ['grid-dot-0-0-upDown', 'grid-dot-0-1-upDown', 'grid-dot-0-2-upDown', 'grid-dot-0-3-upDown', 'grid-dot-0-4-upDown', 'grid-dot-1-0-upDown', 'grid-dot-1-1-upDown', 'grid-dot-1-2-upDown', 'grid-dot-1-3-upDown', 'grid-dot-1-4-upDown']
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 5; non-passive wheel listeners: 0; non-passive touch listeners: 0
- Canvas contexts: []; requestAnimationFrame calls per second at idle: 0
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): ['Intercom']
- Reduced-motion run: animations at load 76; infinite animations still running after scroll 76
- Observed behaviour: 82 animations at load rising to about 520 concurrent after scroll; all 76 observed infinite animations still ran under reduced-motion; 478 requests; Lighthouse performance 30. Chosen as a calm premium benchmark but observed to be dark and heavy: recorded as evidence that premium feel can be bought with very high motion cost.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 30, accessibility 81, best-practices 96, SEO 100
- LCP 27440 ms, CLS 0, TBT 1725 ms, FCP 5878 ms; LCP element: None
- Transfer on desktop load: JS 1,519 KB, CSS 223 KB, fonts 503 KB, images 284 KB, media 0 KB; 478 requests
- Third parties by bytes: [['', 0]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'critical': 1, 'serious': 2}; items: [('button-name', 1), ('color-contrast', 17), ('link-name', 1)]
- `lang`: 'en'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 8709 characters of visible text; h1 in DOM: 'The product development system for teams and agentsThe product developmentsystem for teams'; elements at opacity 0: 0

## Structured data and meta
- Title: 'Linear – The system for product development'
- Description present: True; OG image: True; JSON-LD types: []

## Premium and trust signals
Mono labels beside sans headings; hairline borders at low opacity; precise alignment. These are transferable without the motion.

## What not to borrow
Dark theme, hundreds of simultaneous animations, backdrop-blur header, 515 KB of fonts, 478 requests.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`, `desktop-1440-full.png`.