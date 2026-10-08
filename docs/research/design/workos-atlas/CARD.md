# Observation card: workos-atlas

| Field | Value |
|---|---|
| URL | https://workos.com/atlas |
| Role | Primary |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | bold, friendly, mascot-led |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: Inter (2079), Lato (2051), InterDisplay (199)
- Loaded font files: InterDisplay 600 normal, InterDisplay Fallback normal normal, Inter 400 normal, Inter 500 normal, Inter 600 normal, Inter Fallback normal normal
- h1: 84px / wt 600 / lh 85.68px / ls -1.68px / InterDisplay / #000000
- h2: 16px / wt 400 / lh 24px / ls normal / Inter / #000000
- Body: 18px / wt 500 / lh 28px / ls -0.18px / Inter / oklab(0 0 0 / 0.8)
- Button label: 16px / wt 400 / lh 24px / ls normal / Inter / oklab(0.999994 0.0000455678 0.0000200868 / 0.85)
- Note: Inter Display 600 at 84px/1.02, about -0.02em, centred; body Inter 18/28. A second face (Lato) appears in small UI text. Headlines are short, declarative, two lines.

## Colour system
- Largest background areas: #ffffff , lab(98.26 0 0) , #05070e , #000000 , oklab(0.999994 0.0000455678 0.0000200868 / 0.9) 
- Text colours by use: #1d1c1d, oklab(0 0 0 / 0.7), #000000, #616061
- Borders: 1px oklab(0 0 0 / 0.12), 1px oklab(0 0 0 / 0.16)
- Gradients in computed styles: 61; backdrop-filter elements: 6
- `color-scheme`: normal
- Note: Pure white page with black text and a black pill CTA. All colour is inside the product frame (blue gradient) and a glossy 3D mascot.

## Layout and rhythm
- Common container widths (px, count): [['1080', 6]]
- Section top padding / height (first 6): [('80px', 1757), ('0px', 1597), ('48px', 632), ('0px', 536), ('48px', 665), ('0px', 585)]
- Radii (value, count): [['3.35544e+07px', 94], ['50%', 37], ['4px', 35], ['6px', 19], ['8px', 19]]
- Shadows: ['rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0', 'rgba(41, 54, 61, 0.07) 0px 0px 0px 1px inset, rgba(41, 54, 6']
- Page height at 1440: 7001 px
- Mobile 390: horizontal scroll = False
- Note: Centred single column in a 1080px container; section top padding 48 to 80px; hero image bleeds off the viewport bottom into the product frame.

## Components
- Header: {'position': 'absolute', 'height': 88, 'bg': None, 'backdrop': 'none', 'border': '0px solid rgb(0, 0, 0)', 'links': ['Add to your Slack']}
- Primary CTAs in first viewport: [{'label': 'Add to your Slack', 'bg': '#000000', 'color': '#ffffff', 'radius': '3.35544e+07px', 'h': 40, 'pad': '8px 16px 8px 12px'}]
- Counts: {'gradients': 61, 'backdrop': 6, 'filters': 40, 'video': 0, 'canvas': 1, 'svg': 76, 'img': 153, 'buttons': 23, 'forms': 0, 'tables': 0, 'details': 0, 'accordionsAria': 0, 'links': 9}
- Footer: {'h': 464, 'links': 4, 'text': '© 2026 WorkOS, Inc.ContactTermsPrivacyWorkOS.com'}
- Section order (first headings): ['H1 Meet Atlas, your AI coworker.', 'H2 How teams use Atlas', 'H3 Right where your team works', 'H3 Talk it through', 'H3 Turn questions into action', 'H2 Connected to all your tools.', 'H2 A coworker for the whole team.', 'H2 Always learning, never guessing.', 'H2 Build your AI team.']
- Structure note: Hero headline + subhead + one CTA + product frame; "How teams use" tabs; feature rows with a visual each; a closing "Built on WorkOS. Secure by default." section.

## Product UI treatment
A product frame with example-task tabs ("Prep for a call", "Debug a regression", ...). Later sections use label | value pills (for example Escalation | Escalate billing to Priya) as the product-explanation device.

## Motion inventory
- Web Animations at load: 14; after scroll steps: [{'at': 0.2, 'n': 12}, {'at': 0.4, 'n': 19}, {'at': 0.6, 'n': 11}, {'at': 0.8, 'n': 15}]
- Named keyframes: []
- CSS scroll-timeline rules in stylesheets: False
- IntersectionObservers created: 29; non-passive wheel listeners: 0; non-passive touch listeners: 0
- Canvas contexts: ['webgpu', '2d', 'webgl']; requestAnimationFrame calls per second at idle: 60
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): ['_hsq', 'dataLayer']
- Reduced-motion run: animations at load 11; infinite animations still running after scroll 8
- Observed behaviour: A 3D robot rendered via WebGPU/WebGL/2D canvases; 14 animations at load, 8 infinite animations still running under reduced-motion (a miss). 29 IntersectionObservers; scrolling native.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 37, accessibility 97, best-practices 77, SEO 100
- LCP 12176 ms, CLS 0, TBT 5354 ms, FCP 1947 ms; LCP element: None
- Transfer on desktop load: JS 1,552 KB, CSS 19 KB, fonts 138 KB, images 613 KB, media 0 KB; 130 requests
- Third parties by bytes: [['www.googletagmanager.com', 693058], ['js.hs-analytics.net', 43682], ['www.redditstatic.com', 25771], ['js.hs-banner.com', 24446], ['js.hsadspixel.net', 5411], ['googleads.g.doubleclick.net', 3149]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {'serious': 1}; items: [('color-contrast', 10)]
- `lang`: 'en'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 4561 characters of visible text; h1 in DOM: 'Meet Atlas, your AI coworker.'; elements at opacity 0: 0

## Structured data and meta
- Title: 'Atlas by WorkOS'
- Description present: True; OG image: True; JSON-LD types: []

## Premium and trust signals
Headline scale and confidence; one CTA; the label | value pill pattern that explains a feature in one glance; consistent 1080 measure.

## What not to borrow
Mascot and 3D, gradient frame, Slack-specific CTA, Google Tag Manager (693 KB) and ad pixels, infinite animations that ignore reduced-motion.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`, `desktop-1440-full.png`.