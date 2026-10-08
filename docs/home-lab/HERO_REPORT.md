# Hero report and Gate H1 summary (Brief 01 v2.1) — PROPOSALS ONLY, NOTHING LOCKED

**Gate line: nothing here is locked. The founder reviews with the art director and replies by ID, for example "HERO-C, bigger consumer page; TYPE-2; S0 plus Lenis desktop only; P1", or `LOCK HOME v1`. I have stopped at the gate and will not build further until then.**

Companion documents (all in `docs/home-lab/` unless noted): `THESIS.md`, `MOODBOARD.md`, `PATTERNS.md`, `BRAND_AUDIT.md`, `MOTION_STACK_REPORT.md`, `MOTION_SPEC.md`, `TRUST_CHECKLIST_RESULTS.md`, `CONFLICTS_FOR_FOUNDER.md`, `PAGE_REVIEW_CHECKLIST.proposed.md`; research in `docs/research/design/` (six new cards, `TECH_FINGERPRINT.md`, `SYNTHESIS.md` v1.0); artefacts in `design-system/home-lab/` (`compare.html`, `heroes/`, `brand/`, `motion-bench/`).

## 0. Section 1: read first, what I can and cannot do

1. **Browser automation:** yes. Playwright 1.64 driving Chrome 154 (headless) for captures, scripted scroll, CPU throttling, touch gestures, JS-off and reduced-motion runs; Lighthouse 13.5 with 5 runs per page for my own pages and 3 for the references.
2. **Image viewing:** yes. I viewed the hero, brand and bench screenshots and the 14-site contact sheet myself; the six reference captures were read in detail by delegated agents, whose cards I spot-checked, and whose reports flagged errors in my probe that I corrected.
3. **Shell:** yes (zsh, Node 22, esbuild, ffmpeg-static, rsvg-convert, sharp). Libraries are installed only in `design-system/home-lab/tools/`; the site's `package.json` is untouched.
4. **Web access:** yes (public pages and package registries). Six references were captured; none blocked automation; robots.txt allowed `/` on all six. No sign-ins were used.
5. **HELIX product repository or a staging tenant: NO.** I cannot say which product screens exist or are presentable, and I cannot verify claims C-06 to C-14 in code. Everything shown from the product is coded and captioned.

**The baseline.** `helix-home.html` does not exist in the repo, its history, `~/Downloads`, `~/Desktop` or `~/Documents`. `design-system/Reference-page.html` (commit e2774c1, "New reference page") matches every unique detail the brief names (Tidewell indigo #4338CA, the offset-curves mark, the navy band, the tenant switcher, an operator-console block, the merchant booking screen), so it was used as the baseline. Please confirm.

**The current site.** Next.js 15.1.7 App Router, React 19; `next dev --turbopack` for development and `next build` for production (package.json scripts); JavaScript, Tailwind 3.4, styled-components 6. Next prerenders the home page to static HTML, so hero text can be server-rendered. **But the existing agency-era home is one `"use client"` GSAP component whose prerendered HTML contains 36 inline `opacity:0` styles** (read from `.next/server/app/index.html`; I did not run a new build). Those parts are blank without JavaScript, a risk to the SEO and AI-SEO goals. The lab heroes contain no such styles.

## 1. Recommendation (reasoned; the founder decides)

| Question | Recommendation | Why (evidence) |
|---|---|---|
| Which hero | **HERO-B today. Promote HERO-C to lead only when C-06 is verified on a live tenant and real captures exist.** HERO-D's name field is an optional module under whichever hero leads. HERO-A is the sharpened baseline and is dominated by C | B asserts the least: its only frame is a labelled operator-console list and it needs no unverified claim except one sentence that can be deleted. A, C and D all need C-06 (`[BRIEF-ONLY]`). C is the strongest proof of the thesis (specificity 5) but is the most exposed (four coded merchant and consumer screens). My own scores put B and D joint first (41 of 50), C 38, A 37, but see "what the scores cannot say" below |
| Thesis | **T2 "wear their name", with T3 as its discipline** | `THESIS.md`: only a white-label page can have a proof object that re-brands itself |
| Palette | **P1** (blue is the brand, ink text, outline header button) | Real blue is now known (`#4161F4`, 4.95:1 on white). P1 makes the tenant swap read against a blue page; blue stays out of the window (measured) |
| Headline type | **TYPE-2** (Geist 700, -0.045em) as the middle position, plus the real wordmark as the only heavy element | The wordmark's stem to cap-height ratio is 0.26, very heavy. 600 is quiet beside it, 800 (B's default) risks "agency" for this audience (Learning 12). The founder should look at TYPE-1/2/3 in `compare.html` |
| Headline wording | Keep the Spec's "Run your own branded shipping platform." for A, C, D; B tests Spec alternative B | No cold 5-second test has been run, so there is no evidence to change either |
| Motion stack | **S0 (native), nothing else on the home route** | `MOTION_STACK_REPORT.md`: 0.5 KB JS; the heavier options add 5 to 112 KB, hide text from find-in-page, and showed no measurable benefit here. Smooth scrolling (S1, 5.5 KB) is the founder's perception call via `motion-bench/feel-test.html` |
| Atmosphere | Pre-rendered still or none; no WebGL | A grain still is 133 KB (smooth 9 KB); WebGL costs about 14 times the idle CPU. The Spec also forbids the texture |
| Compact mark | C1 (the wordmark H in a tile) | `BRAND_AUDIT.md` |

**What I would change if the founder rejects this:** reject B for "too quiet": go to D (the same first-viewport answers, a memorable action, no autoplay) and accept its C-06 dependency. Reject P1: P2 is one class (`p2`) away. Reject S0: S0 plus its fallback is already measured; add Lenis for desktop pointers only if the blind test favours it.

**What the scores cannot say.** They are my judgement (below). They do not measure whether a sceptical logistics founder trusts the page in 30 seconds. Appendix A item 1 needs a cold test with three people outside the team; nobody has tried it.

## The four heroes: idea, moment, mobile, risk

Files: `design-system/home-lab/heroes/hero-a-reskin.html`, `hero-b-editorial.html`, `hero-c-pair.html`, `hero-d-your-name.html`; side by side: `design-system/home-lab/compare.html` (ID overlays HERO-A to D, 1440/390 switch, P1/P2 palette, TYPE-1/2/3, reduced-motion, interact on/off). Generated from `heroes/_build/` (shared partials; each output is a single standalone HTML file with inline CSS, a few hundred bytes of inline JS and no external requests; fonts are the self-hosted Geist subsets). Palette default P1, P2 by the `p2` class (also `?palette=p2`).

All four share the same fixed content: eyebrow "HELIX by Cyper Studio, a product engineering company in India", the entity line from Spec 17.2, the trust-line placeholder, one filled primary "Request a demo", a quiet outline header button, a four-field demo form (below), canonical, Open Graph URL and an Organization JSON-LD stub (founding date 2024, email `info@cyper.studio`, legal name and city `{{CONFIRM}}`).

### HERO-A: Tenant re-skin, sharpened
- **Idea.** Centred headline with the same HELIX platform shown below under three sample brands, on a full-width band that takes the tenant's tint, so the brand name, domain pill, accent colour and band all change at once while the HELIX chrome (header, wordmark, CTA) stays blue and still. The contrast is the proof.
- **Signature moment.** One 4-second sequence on load (swaps at 1.4, 2.6, 3.8 s), then it stops; the three buttons take over. It answers "what makes the re-skin undeniable in 3 seconds": the first swap lands at 1.4 s and changes the band behind the window, the window's brand name, domain, mark and accent in one cut (frames: `heroes/shots/seq-hero-a-reskin.webp`).
- **Mobile (390).** Headline in 3 lines, CTA, entity line and trust line fill the first viewport; the switch and window start at the fold; domain pill and nav hide to keep the window readable.
- **Truth risk.** C-06 (stated only in hedged wording, tagged) and C-07 (rates table, sample services only); merchant booking screen is the C-2 exception. The switch is JS-only, so it is hidden with JS off and the page shows tenant one.
- **How it fails.** If C-06 is not true on a live tenant the whole idea is false. A repeat visitor who scrolls straight past misses the swap (mitigated by the buttons). The first viewport at 1440 x 800 shows only the window's top bar, so a taller laptop screen shows more than a 768 px one.
- **Operator-console-only version.** Replace the merchant window with the operator console frame (as in HERO-B) and show the swap in its "brand colour" column; the proof becomes the tenant list rather than the merchant screen. It loses the "customers see your name" half of the claim.

### HERO-B: Editorial headline, product rising
- **Idea.** Typography leads. The headline is set at 800 weight, -0.045em, up to 80 px, in three lines of plain keywords (white-label, logistics software, couriers, 3PLs, freight brokers), carrying the wordmark's heaviness across the whole headline instead of one accented word. The operator console rises into place as the page scrolls; the real wordmark closes the page at full width as the one oversized display moment.
- **Signature moment.** Native scroll-driven rise of the console (transform only; always fully visible, so there is no LCP or no-JS cost). No JavaScript runs for it.
- **Mobile (390).** Headline in five lines at 40 px, same order; the console sits under the fold and scrolls horizontally inside its frame rather than shrinking.
- **Truth risk.** Lowest of the four: the only frame is an operator console listing three sample tenants (C-04 multi-tenant). One hedged C-06 sentence below the hero.
- **How it fails.** A very heavy headline can read "creative agency" to an operator (Learning 12): TYPE-1 (600) is one click away. In browsers without scroll-driven animation the console is static, which is the fallback.
- **Operator-console-only version.** This is it.

### HERO-C: White-label proof pair
- **Idea.** Two fictional operators, two screens each (merchant booking, consumer tracking), same engine, different company. Read left to right, top to bottom: the layout is identical, only the name, colour and domain change.
- **Signature moment.** The four screens arrive once in 250 ms with a 90 ms stagger (opacity and an 8 px rise). Nothing else moves.
- **Mobile (390).** The text block comes first (all required items in the first viewport); the pair stacks as four full-width screens below, each labelled with its sample brand and domain.
- **Truth risk.** Highest of the four: C-06 twice, C-07 on two screens, and four screens that are the C-2 exception. Sample carriers are not named.
- **How it fails.** Four coded screens read as a mock-up to a sceptical operator until real captures replace them; at 1440 x 800 only the first row is fully in view.
- **Operator-console-only version.** Replace each row with the console's tenant list filtered to one tenant plus that tenant's branded domain card; much less persuasive.

### HERO-D (wildcard): your name on the platform
- **Idea.** The visitor types their own company name and sees a tracking page under it, with a domain, a mark and one of three sample colours. "Your name on the platform" is the claim, so the hero makes the visitor perform it. The thermal-label candidate from the brief was challenged and dropped (below).
- **Signature moment.** User-driven: a 160 ms opacity dip on each change. No autoplay, no moment.
- **Mobile (390).** Input and colour dots are visible without scrolling next to the CTA; the phone-shaped frame follows.
- **Truth risk.** C-06 and the implied "your own domain" (the preview invents `track.<yourname>.example`; the `.example` suffix and the "Preview only. Nothing is sent or stored." line keep it honest). Needs JS, so the control is hidden without it and the static tenant-one preview remains.
- **How it fails.** It can feel like a toy to a serious buyer; people may type something silly; an unusual name could break the mark. Name length is capped at 28, rendered with `textContent` (no HTML injection).
- **Operator-console-only version.** Preview the operator console's tenant row for the typed name instead of a consumer page. Honest, but less personal.
- **Why not the thermal label.** It asserts label generation (C-08, `[BRIEF-ONLY]`), shows an invented AWB barcode, repeats the baseline's floating-label tell, and explains less than a name does. If label generation is confirmed live, it earns a place inside the product section, not the hero.

### Atmosphere specification (for the founder's image generators; not generated here)
The handhold-style grain ribbon is truthful (abstract, no claim) but conflicts with Spec 14.6 (no gradient or texture) and costs bytes (smooth still 9.3 KB, the same composition with real grain 133 KB, 8 s video loop 112 to 164 KB, WebGL about 13.6 KB gzip of JS plus continuous GPU work; measured, see MOTION_STACK_REPORT.md). If the founder wants it, brief the generator with: *Abstract only. Two soft, wide ribbons of flat brand blue #4161F4 at 8 to 55% opacity on a pale cool grey #F3F5F8 ground, flowing left to right across a 1600 x 900 frame, with a fine monochrome film grain over everything. No interface, no people, no text, no logos, no objects, no gradients between unrelated hues. Keep the left 40% of the frame nearly empty so headline text stays above 4.5:1 contrast. Deliver as a lossless PNG; we compress to AVIF and WebP.* Rule on our side: decorative only, `alt=""`, `fetchpriority="low"`, never the LCP, 100 KB budget, none on the 390 px layout.

## 2. Measured results (generated from `design-system/home-lab/heroes/results/*.json` and Lighthouse JSON)

Lighthouse is mobile defaults (simulated 4G, 4x CPU slowdown), 5 runs, against a local server with Brotli and caching like a CDN; the baseline loads Google Fonts over the real network, which is most of its 3.1 s LCP. The four heroes load no scripts from the network (the inline JS is 1 to 3 KB) so Lighthouse cannot separate them; the differences that matter are in the first-viewport, JS-off and accessibility tables.

### Weight and mobile Lighthouse (5 runs, medians)

| Hero | HTML bytes (inline CSS + JS) | LCP | CLS | TBT | perf scores (5 runs) | a11y / best-practices / SEO (run 1) | requests |
|---|---|---|---|---|---|---|---|
| HERO-A | 30.2 KB (15.9 KB CSS, 2.6 KB JS) | 1.20 s | 0 | 0 ms | 100, 100, 100, 100, 100 | 100 / 100 / 63 | 3 |
| HERO-B | 28.1 KB (15.7 KB CSS, 1.1 KB JS) | 1.20 s | 0 | 0 ms | 100, 100, 100, 100, 100 | 100 / 100 / 63 | 3 |
| HERO-C | 31.8 KB (15.5 KB CSS, 1.1 KB JS) | 1.20 s | 0 | 0 ms | 100, 100, 100, 100, 100 | 100 / 100 / 63 | 3 |
| HERO-D | 29.4 KB (15.8 KB CSS, 2.8 KB JS) | 1.20 s | 0 | 0 ms | 100, 100, 100, 100, 100 | 100 / 100 / 63 | 3 |
| Baseline (Reference-page.html) | n/a (external fonts) | 3.12 s | 0 | 0 ms | 88, 88, 89, 88, 91 | 95 / 96 / 60 | 8 |

### First viewport: the four questions as read from the rendered text (script)

| Hero | 1440 x 800: company / product / audience / outcome | 390 x 844: same | filled CTAs in view (1440 / 390) | trust-line placeholder in view (1440 / 390) | product frame in view (1440 / 390) | horizontal scroll (1440 / 390) |
|---|---|---|---|---|---|---|
| HERO-A | Y Y Y Y | Y Y Y Y | 1 / 1 | Y / Y | Y / N | no / no |
| HERO-B | Y Y Y Y | Y Y Y Y | 1 / 1 | Y / Y | N / N | no / no |
| HERO-C | Y Y Y Y | Y Y Y Y | 1 / 1 | Y / Y | Y / N | no / no |
| HERO-D | Y Y Y Y | Y Y Y Y | 1 / 1 | Y / Y | Y / N | no / no |

### Server HTML and JS off

| Hero | h1, sub, filled CTA, trust line, entity line, info@ in the HTML response | canonical, og:url, JSON-LD (Organization, founding 2024) | with JS disabled: h1 / sub / CTA / trust / entity painted | tenant-only controls hidden without JS | reduced motion: running animations |
|---|---|---|---|---|---|
| HERO-A | Y Y Y Y Y Y | Y Y Y | Y Y Y Y Y | true | 0 |
| HERO-B | Y Y Y Y Y Y | Y Y Y | Y Y Y Y Y | n/a | 0 |
| HERO-C | Y Y Y Y Y Y | Y Y Y | Y Y Y Y Y | n/a | 0 |
| HERO-D | Y Y Y Y Y Y | Y Y Y | Y Y Y Y Y | true | 0 |

### Accessibility, colour, form

| Hero | axe violations (WCAG 2.2 A/AA + best practice, 1440) | HELIX blue in tenant window: distinct colours checked / nearest colour to #4161F4 (OKLab) | required + optional fields | invalid email blocks submit / success state shown | first 6 tab stops |
|---|---|---|---|---|---|
| HERO-A | none | 13 / rgb(102,112,133) at 0.188 | 4 + 1 | Y / Y | a:Skip to content > a:HELIX by Cyper Studio, home > a:Product > a:About > a:Contact > a:Request a demo |
| HERO-B | none | no tenant window (operator console only) | 4 + 1 | Y / Y | a:Skip to content > a:HELIX by Cyper Studio, home > a:Product > a:About > a:Contact > a:Request a demo |
| HERO-C | none | 11 / rgb(102,112,133) at 0.188 | 4 + 1 | Y / Y | a:Skip to content > a:HELIX by Cyper Studio, home > a:Product > a:About > a:Contact > a:Request a demo |
| HERO-D | none | 8 / rgb(102,112,133) at 0.188 | 4 + 1 | Y / Y | a:Skip to content > a:HELIX by Cyper Studio, home > a:Product > a:About > a:Contact > a:Request a demo |


Lighthouse accessibility initially flagged HERO-A at 95: at narrow widths the brand names in the tenant switch are hidden by CSS and the buttons had no accessible name. axe at 1440 had not caught it. Fixed (explicit `aria-label`s) and re-measured: all four score 100 on accessibility.

Not measured: a real phone; LCP element identity (this Lighthouse version does not expose the audit key); INP on human input; real Safari and Firefox; screen-reader output (the DOM order and landmarks are clean, but I did not run VoiceOver or TalkBack).

## 3. Self-critique scores (0 to 5, my judgement, with the reason)

| Dimension | HERO-A | HERO-B | HERO-C | HERO-D | Notes |
|---|---|---|---|---|---|
| Specificity (only HELIX could be this) | 4 | 3 | 5 | 5 | A, C, D show a white-label swap, which only a white-label product can. B's keywords are specific but the layout is generic |
| Distinctiveness (cover the logo) | 3 | 4 | 4 | 5 | A's centred hero plus window is a common frame; B's heavy type is the strongest typographic voice; D's name field is the least common |
| Craft | 4 | 4 | 4 | 3 | D has the most JS edge cases (empty or odd names; mark from the first letter) |
| Typography | 3 | 4 | 3 | 3 | All Geist; B alone uses weight and tracking deliberately |
| Motion restraint | 4 | 5 | 4 | 5 | A autoplays once for 4 s; B is one scroll-linked transform; C one stagger; D no autoplay |
| Truth and provenance | 3 | 4 | 2 | 3 | C: four coded screens plus C-06 and C-07. A, D: C-06 plus one merchant or consumer screen. B: one hedged C-06 sentence |
| Brand fit (real wordmark and blue) | 4 | 5 | 4 | 4 | B carries the wordmark's weight and ends on it |
| Mobile (390) | 3 | 3 | 3 | 4 | All answer the four questions without scrolling; the product proof is below the fold in A, C, D and B. D's name field is in the first viewport |
| Performance | 5 | 5 | 5 | 5 | 100 on all five Lighthouse runs, CLS 0, TBT 0, 0 KB external JS, 28 to 32 KB of HTML. Lighthouse saturates here |
| Accessibility | 4 | 4 | 4 | 4 | axe: none; Lighthouse 100; keyboard order correct; not tested with a screen reader |
| **Total /50** | **37** | **41** | **38** | **41** | |

**Generic tells in my own work** (honest list): centred hero (A); eyebrow line above the headline (all four, plain text not a pill); product frame with corner brackets (a design-system device, but also a common look); the same "Request a demo" label in header and hero (all four; the header button is an outline at 44 px against a filled 52 px primary, so weight differs but the words do not); the segmented switch in A looks like a tab widget; the heavy 800 headline in B and the giant footer wordmark are the two things most likely to read "creative agency"; the "01 / Product" mono labels are a common SaaS-kit device. Not present: logo strip, stats, quotes, gradients, glow, noise, bento grid, floating cards, scroll-lit text, dark band, hover lifts.

**Impeccable critique pass.** The project's detector (`impeccable detect`, output `heroes/results/impeccable-detect.json`) reported 94 findings, 85 advisory and 9 warnings. What it flagged and what I did: (a) "overused font": Geist, on all four. Rejected: Geist is locked by decision D-05. (b) "tight leading" on HERO-B at 1.13x: intentional display leading (0.97 to 1.12), consistent with the design system's 1.05. (c) "hairline border with wide shadow" on the product frame: this is the Spec's own frame (1px border plus `--shadow-2`, Spec 15.2), kept; the detector disagrees with the Spec. (d) 8 to 9 "colour outside DESIGN.md" per hero: these are the new brand blue and its derived tokens, the placeholder amber, and a few literals; they are the token deltas listed below. (e) 3 to 6 "radius outside DESIGN.md" (4px focus rounding, 28px phone) and 7 to 9 "font size off the ramp": `DESIGN.md` and `design-system/tokens/tokens.css` disagree (the tokens file defines 1.1875, 0.8125 and 0.9375 rem; `DESIGN.md` does not), so this is a design-system inconsistency to reconcile, not only my drift. (f) "numbered section labels" on HERO-B: kept, a locked signature device. The brief names a "frontend-design" skill; it is not installed in this session, so I used the project's `impeccable-guide` (declared pipeline: shape, typeset, layout, adapt, critique, audit), `impeccable detect`, and axe and Lighthouse for accessibility. I did not run the `polish` command, because nothing is approved to polish.

## 4. Conversion and technical hygiene (Section 9A)

- **Form:** 4 required fields (name, work email, company, company type) plus 1 optional message, in all four. Honeypot present. Invalid email blocks submit; success state replaces the form and takes focus. No extra fields: monthly volume from the baseline was cut (it can be an optional follow-up after the first reply).
- **Response expectation:** `{{CONFIRM: reply within X business days}}`, shown in the section and in the success state. Not invented.
- **No-JS submit:** the form posts to `/contact` (method POST). **No endpoint exists** in the lab; the live site needs one (Formspree is in the agency-era code; Spec 12 governs).
- **Identity in every file:** canonical `https://cyper.studio/`, `og:url`, Organization JSON-LD (name Cyper Studio, `foundingDate` 2024, email `info@cyper.studio`, legal name and city `{{CONFIRM}}`); entity line "Founded in 2024"; footer "Founded 2024, India". Only hosts in the files: `cyper.studio` and `schema.org`; only email `info@cyper.studio`. The Spec's default domain is used; Q-01 is still the founder's.
- **Server-rendered primary content:** headline, subhead, filled CTA, trust-line placeholder, entity line and `info@` are in the HTML response in all four (script reads the response body), and are painted with JS disabled.
- **Performance as brand:** see section 2. 28 to 32 KB per page, 0 KB external JS, LCP 1.20 s, CLS 0.

## 5. Claim map for what the heroes name
| Capability or claim | ID | Tag | Where | Status shown |
|---|---|---|---|---|
| Company in India, founded 2024 | C-01, C-02 | `[BRIEF]` | entity line, footer, JSON-LD | statable |
| White-label, multi-tenant logistics OS; audiences | C-04, C-05 | `[BRIEF]` | subheads | statable |
| Merchants and consumers see only the operator's brand, domain and colours | C-06 | `[BRIEF-ONLY]` | A, C, D (frames and switch), B (one sentence) | `{{CONFIRM: live today or planned}}` in the source |
| Rate comparison at booking | C-07 | `[BRIEF-ONLY]` | merchant screens in A, C (generic services; no carrier named) | `{{CONFIRM}}` |
| Traction ("10+") | C-15 | `[FOUNDER-TO-CONFIRM]` | trust line, all four | `{{CONFIRM}}` placeholder only |
| Labels, NDR over WhatsApp, COD wallet, B2B, cross-border (C-08 to C-11) | | `[BRIEF-ONLY]` | **none of the four heroes** | absent from the build (the baseline had them) |


## 6. Questions for the founder
1. Is `design-system/Reference-page.html` the baseline you meant by `helix-home.html`?
2. **C-06 and C-07:** are they live today on a real tenant? (Q-05.) This decides whether A, C or D can ship.
3. **Real captures (Q-13):** can you supply (1) the operator console tenant list, (2) a merchant booking screen, (3) a consumer tracking page, each from a live tenant, with permission to show them?
4. May the coded merchant and consumer screens stay as labelled illustrations in A, C and D until then (Conflict C-2)?
5. **Traction wording (C-3):** which rung of the ladder in Spec 4.5 is true: live tenants; a mix of tenants and services clients; or not all in production? Is "enterprise" defensible and how is it defined?
6. **Wordmark:** who drew it, and is there an original vector or font name? Approve R1 (cap line, baseline, equal gaps) or keep R0? Compact mark: C1, C3 or your own?
7. **Palette P1 or P2, and TYPE-1, 2 or 3?** (P1 would also settle Q-12.)
8. **Smooth scrolling:** run `design-system/home-lab/motion-bench/feel-test.html` (blind A/B). Does either feel better?
9. **Cold test:** can three people outside the team see HERO-B and HERO-C for 5 seconds each and say what the company, product, audience and outcome are? (Protocol in `PAGE_REVIEW_CHECKLIST.proposed.md`.)
10. Legal entity name and city (Q-03); the form endpoint and the response time (Spec section 12 and 24); which pages come next (Conflict C-6).
11. Where should the review checklist live, given hard stop 2 (Conflict C-8)?

**Reference sites that blocked me: none.** No founder-supplied screenshots are needed for the research set. (Real-device checks on a mid-range Android are still outstanding.)

## 7. Self-check against Section 12
- [x] Observations came from screenshots or tools; unobserved items marked NOT OBSERVED or listed in the card
- [x] All 14 sites covered; none blocked
- [x] Library presence stated only from evidence; the first-pass probe's false positives are named and superseded (`TECH_FINGERPRINT.md`)
- [x] Nothing copied from a reference; no client logos; no invented claims; samples labelled
- [x] No HELIX blue in any tenant-branded screen (measured: nearest colour in every state is the neutral `#667085`, distance 0.188 in OKLab; HERO-B has no tenant window)
- [x] The four heroes differ in composition (centred stage, editorial type, matrix, phone)
- [x] Motion-stack numbers measured; licence terms read from the live GSAP page and the installed packages
- [x] Scores include my own generic tells
- [ ] Appendix A run on every hero with evidence: done in `TRUST_CHECKLIST_RESULTS.md`; **item 1's cold test and items 5 and 10 need the founder**
- [x] First viewport answers the four questions in plain text at both widths (script)
- [x] One primary CTA; four-field form; success state and `{{CONFIRM}}` response expectation
- [x] `cyper.studio`, `info@cyper.studio` and 2024 consistent in every hero file
- [x] Nothing locked; gate line included; work stopped
