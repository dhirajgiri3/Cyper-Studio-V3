## The four heroes: idea, moment, mobile, risk

Files: `design-system/home-lab/heroes/hero-a-reskin.html`, `hero-b-editorial.html`, `hero-c-pair.html`, `hero-d-your-name.html`; side by side: `design-system/home-lab/compare.html` (ID overlays HERO-A to D, 1440/390 switch, P1/P2 palette, TYPE-1/2/3, reduced-motion, interact on/off). Generated from `heroes/_build/` (shared partials; each output is a single standalone HTML file with inline CSS, a few hundred bytes of inline JS and no external requests; fonts are the self-hosted Geist subsets). Palette default P1, P2 by the `p2` class (also `?palette=p2`).

All four share the same fixed content: eyebrow "HELIX by Cyper Studio, a product engineering company in India", the entity line from Spec 17.2, the trust-line placeholder, one filled primary "Request a demo", a quiet outline header button, a four-field demo form (below), canonical, Open Graph URL and an Organization JSON-LD stub (founding date 2024, email `info@cyper.studio`, legal name and city `{{CONFIRM}}`).

### HERO-A: Tenant re-skin, sharpened
- **Idea.** Centred headline with the same HELIX platform shown below under three sample brands, on a full-width band that takes the tenant's tint, so the name, domain pill, colour and nav all change at once while the HELIX chrome (header, wordmark, CTA) stays blue and still. The contrast is the proof.
- **Signature moment.** One 4-second sequence on load (swaps at 1.4, 2.6, 3.8 s), then it stops; the three buttons take over. It answers "what makes the re-skin undeniable in 3 seconds": the first swap lands at 1.4 s and recolours about a third of the viewport (window, band, domain, brand name).
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
The handhold-style grain ribbon is truthful (abstract, no claim) but conflicts with Spec 14.6 (no gradient or texture) and costs bytes (smooth still 9.3 KB, the same composition with real grain 133 KB, 8 s video loop 112 to 164 KB, WebGL about 11.6 KB of JS plus continuous GPU work; measured, see MOTION_STACK_REPORT.md). If the founder wants it, brief the generator with: *Abstract only. Two soft, wide ribbons of flat brand blue #4161F4 at 8 to 55% opacity on a pale cool grey #F3F5F8 ground, flowing left to right across a 1600 x 900 frame, with a fine monochrome film grain over everything. No interface, no people, no text, no logos, no objects, no gradients between unrelated hues. Keep the left 40% of the frame nearly empty so headline text stays above 4.5:1 contrast. Deliver as a lossless PNG; we compress to AVIF and WebP.* Rule on our side: decorative only, `alt=""`, `fetchpriority="low"`, never the LCP, 100 KB budget, none on the 390 px layout.
