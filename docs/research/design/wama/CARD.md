# Observation card: wama

| Field | Value |
|---|---|
| URL | https://wama.com.br/ |
| Role | Secondary |
| Date | 2026-10-08 |
| Viewports | 1440x900, 1024x768, 390x844 (top frames); scroll frames at 1440 |
| Tool | playwright-core + Google Chrome (headless); Lighthouse for scores |
| Personality in three words | agency, showy, image-led |
| HTTP status | 200 |

## Type system
- Fonts by share of visible text: TWK Lausanne 200 Regular (5136), TWK Lausanne 400 Regular (2447), CUSTOM;TWK Lausanne 200 (8)
- Loaded font files: TWK Lausanne 400 Regular 400 normal, TWK Lausanne 200 Regular 200 normal, TWK Lausanne 400 Regular Placeholder normal normal
- h1: 72px / wt 400 / lh 79.2px / ls -0.72px / TWK Lausanne 400 Regular / #000000
- h2: 56px / wt 400 / lh 67.2px / ls -0.56px / TWK Lausanne 400 Regular / #ffffff
- Body: 20px / wt 400 / lh 24px / ls 0.2px / TWK Lausanne 400 Regular / #000000
- Button label: 14px / wt 400 / lh normal / ls normal / CUSTOM;TWK Lausanne 200 / #000000
- Note: TWK Lausanne 400 at 72px/1.1, body 20/24 with +0.2px tracking.

## Colour system
- Largest background areas: #ffffff , #000000 , #0f0f0f , #000000 a0.03 
- Text colours by use: #4f4f4f, #000000, #ffffff, #cdff59
- Borders: 1px #d2cdd8, 2px #767676, 1px null
- Gradients in computed styles: 1; backdrop-filter elements: 0
- `color-scheme`: normal
- Note: White and black; all colour comes from client brand imagery.

## Layout and rhythm
- Common container widths (px, count): [['1296', 15], ['1013', 3], ['1380', 1], ['1400', 1]]
- Section top padding / height (first 6): [('156px', 1230), ('160px', 1079), ('160px', 9657), ('0px', 4950), ('160px', 1832), ('160px', 1858)]
- Radii (value, count): [['10px', 86], ['58px', 14], ['60px', 14], ['8px', 7], ['999px', 4]]
- Shadows: ['rgba(0, 0, 0, 0.35) -28px 8px 40px 0px']
- Page height at 1440: 24501 px
- Mobile 390: horizontal scroll = False
- Note: Centred headline then a fanned grid of client-work cards; Framer build (6.3 MB from framerusercontent).

## Components
- Header: {'position': 'relative', 'height': 79, 'bg': '#ffffff', 'backdrop': 'none', 'border': '0px none rgb(0, 0, 0)', 'links': ['clientesclientes', 'projetosprojetos', 'serviçosserviços', 'sobresobre', 'blogblog', 'Inicie um projeto']}
- Primary CTAs in first viewport: [{'label': 'Inicie um projeto', 'bg': '#000000', 'color': '#0000ee', 'radius': '999px', 'h': 39, 'pad': '7px 24px 8px'}]
- Counts: {'gradients': 1, 'backdrop': 0, 'filters': 4, 'video': 18, 'canvas': 0, 'svg': 11, 'img': 118, 'buttons': 2, 'forms': 1, 'tables': 0, 'details': 0, 'accordionsAria': 1, 'links': 67}
- Footer: {'h': 2176, 'links': 34, 'text': 'FALE CONOSCOSeu próximo projeto começa aquiEntendemos seu momento, seus objetivos e mostramos como design e código podem transformar sua ideia em um produto digital de alto nível.Entendimento do projeto, objetivos e nece'}
- Section order (first headings): ['H1 Design e desenvolvimento de produtos digitais', 'H2 Criatividade, excelência, & reconhecimento.', 'H2 Superando padrões.Não apenas expectativas.', 'H3 Camila Farani', 'H3 KFC Brasil', 'H3 Tera', 'H3 Vibra', 'H3 Wiz Benefícios', 'H3 Pepper']
- Structure note: Hero: service headline, one sentence, client-work showcase.

## Product UI treatment
Client work, not a product. This is the pattern the Spec says to leave behind (agency portfolio on the main page).

## Motion inventory
- Web Animations at load: 8; after scroll steps: [{'at': 0.35, 'n': 8}]
- Named keyframes: []
- CSS scroll-timeline rules in stylesheets: True
- IntersectionObservers created: 83; non-passive wheel listeners: 0; non-passive touch listeners: 0
- Canvas contexts: []; requestAnimationFrame calls per second at idle: 60
- Wheel scroll behaviour: native (each 300px wheel moved exactly 300px)
- Globals detected (libraries / platforms): []
- Reduced-motion run: animations at load 0; infinite animations still running after scroll 0
- Observed behaviour: CSS scroll-timeline in the stylesheet; 83 IntersectionObservers; 8 animations at load; no infinite animations under reduced-motion.
- Timing and easing of JS-driven or WebGL motion were not measured; only Web Animations (CSS) expose duration and easing to the harness.

## Performance (measured)
- Lighthouse mobile (single run, simulated slow 4G): performance 93, accessibility 100, best-practices 100, SEO 100
- LCP 2944 ms, CLS 0, TBT 74 ms, FCP 1427 ms; LCP element: None
- Transfer on desktop load: JS 391 KB, CSS 0 KB, fonts 62 KB, images 5,755 KB, media 1,466 KB; 174 requests
- Third parties by bytes: [['framerusercontent.com', 6341907], ['zaafqpmrqhleovqxkmnm.supabase.co', 1500929], ['events.framer.com', 12069], ['framer.com', 4105], ['app.framerstatic.com', 2214], ['', 0]]

## Accessibility spot checks (axe 4.x, WCAG 2.2 A/AA tags; automated only)
- Violations by impact: {}; items: []
- `lang`: 'pt-BR'; h1 count not asserted; landmarks not individually audited (NOT OBSERVED)
- JavaScript disabled: 8039 characters of visible text; h1 in DOM: 'Design e desenvolvimento de produtos digitais'; elements at opacity 0: 0

## Structured data and meta
- Title: 'Wama | Agência de Design, Sites, SaaS e Aplicativos'
- Description present: True; OG image: True; JSON-LD types: ['["WebPage","ContactPage","ItemList"]', '"FAQPage"', '[["Organization","ProfessionalService"],"Person","WebSite"]']

## Premium and trust signals
Typographic restraint: one weight, tight tracking, no decoration around the headline.

## What not to borrow
The whole portfolio-led structure; real client logos; 5.9 MB images.

## NOT OBSERVED
- Hover, focus and active states of buttons and cards (not exercised).
- Mobile menu open state and sticky behaviour on mobile (not exercised).
- Easing and duration of JS, canvas or WebGL motion (no frame capture).
- Pricing, blog and other pages (home page only).
- Real-device behaviour (desktop Chrome with device emulation only).

Screenshots in this folder: `desktop-1440-top.png`, `desktop-1440-scroll-*.png`, `desktop-1440-nojs.png`, `tablet-1024-top.png`, `mobile-390-top.png`.