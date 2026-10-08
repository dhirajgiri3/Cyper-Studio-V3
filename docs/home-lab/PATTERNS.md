# Pattern list (Brief 01 v2.1, Step 1) — PROPOSAL, nothing locked

Evidence: the six new cards and eight earlier cards in `docs/research/design/`, plus `TECH_FINGERPRINT.md`. Durations and curves are measured values quoted from those cards; anything not observed is not listed.

## Layout patterns (5)

| ID | Pattern | Seen in | HELIX-truthful form |
|---|---|---|---|
| L1 | Left-aligned two- or three-line headline, sub at 52 to 58 ch, one CTA, product frame half inside the first viewport | modeinspect, adaline | HERO-B, HERO-C, HERO-D. Frame is the labelled illustrative one until real captures exist |
| L2 | Centred headline, then one wide product window | spacefs, atlas, eden, handhold | HERO-A (centred copy, full-width window) |
| L3 | Product as a live DOM object with tabular mono data and status chips, not an image | adaline, modeinspect, eden | The operator-console frame in HERO-B; tenant windows in A, C, D (all coded, all captioned) |
| L4 | Hairline grid for facts, with footnoted sources | iru | The entity facts block (company, founded 2024, contact). Numbers only when claim-registered |
| L5 | Pinned stepper whose no-JS and reduced-motion fallback is a complete static layout | pexo (2x2 fallback), legora (scrub) | Static three-step layout by default; pinning only if the bench shows it is worth it. Bench S0 already ships static-by-default |

## Motion patterns (3)

| ID | Pattern | Measured in reference | Property | HELIX value (proposed) |
|---|---|---|---|---|
| M1 | One entrance reveal, expo/quint ease | adaline: 14 px rise, 520 ms, `cubic-bezier(.22,1,.36,1)`, stagger 20/150/500/580 ms. modeinspect: 24 px, 0.9 s, `cubic-bezier(.16,1,.3,1)` | transform (+ opacity on non-text) | 8 px, 250 ms, `--ease` (Spec 15.4). Never on the LCP text |
| M2 | Colour-only hover | adaline 150 ms; handhold 150 ms `cubic-bezier(.4,0,.2,1)`; atlas 150 ms | background-color | 150 ms, colour only (`--t-fast`) |
| M3 | Header state change on scroll | iru: wordmark collapses to mark in 150 ms; modeinspect: pills thicken after 20 px, 300 ms | opacity/transform (iru), blur (modeinspect, not allowed here) | A 1 px border that is simply there. No motion needed |
| (M4) | Scroll-scrubbed pinned scene, about 160 ms damping | legora: pinned 4,068 px, 0.00271 s/px | video currentTime | Not proposed. Measured in the bench as the cost of the S2/S3 class |

## Generic tells: patterns common across the references that make a site look templated

Counts are out of the 14 sites, from the cards (home page only; "NOT OBSERVED" is not counted).

| Tell | Sites that have it | Is it in the baseline (`design-system/Reference-page.html`)? |
|---|---|---|
| Customer-logo marquee / "Trusted by" strip | monday, handhold, adaline, legora, iru, clay, modeinspect (7+) | No. HELIX has none to show |
| Stat strip / count-up numbers | legora, iru, clay, modeinspect | No |
| Quote or testimonial cards | clay (in the logo/quote/stat bento), iru, pexo (unnamed bubbles), adaline, modeinspect | No |
| Two identical CTAs (header and hero), or the same label 3 to 5 times | legora, clay, modeinspect (x3), adaline (x5), iru | **Yes**: header "Request a demo" is the same label and style as the hero primary (lines 483, 508), plus a ghost second CTA (509) |
| Atmospheric gradient wash / glow behind the hero | modeinspect, pexo, spacefs, handhold, iru (glow video), adaline (aurora) | **Yes**: radial-gradient atmosphere (101 to 107), noise "dust" (108 to 111), glow behind the frame (136) |
| Soft pill or eyebrow-chip above the headline | spacefs, eden, atlas, handhold | **Yes**: the `eyebrow` pill with tag (113 to 114, 504) |
| Uniform fade-and-slide on everything | modeinspect (all sections), adaline | **Yes**: frame `rise` 1.1 s, label `drop` 0.9 s, chip `slide` 0.9 s, fan open, statement lit (140 to 204, 251) |
| Hover-scale or shadow-lift on cards | legora (2.5% scale). clay's hover is arrow and underline swaps, transform only, no scale | **Yes**: `.cap:hover .cap__ui` lifts and shadows (363), button hover shadow (65) |
| Bento / uneven capability grid | clay (logo/quote/stat bento), linear (earlier round) | **Yes**: the 12-column uneven `cap-grid` (355 to 359) |
| Word-by-word scroll-lit statement | (not seen on the 14; common on template sites) | **Yes** (250 to 252, 931 to 957) |
| Floating overlapped "proof" cards on the product window | (common in SaaS kits) | **Yes**: the label and two chips overlap the window (190 to 210) |
| Auto-advancing demo (carousel) | clay (autoplaying tabs), pexo (rotating prompt) | **Yes**: the tenant switch auto-cycles every 4.5 s forever (903 to 917) |
| Centred hero | 8 of the earlier 12; also pexo, legora | **Yes** |
| One accented headline word | getenergy (accent word), spacefs, eden | No (baseline is single-tone), but TYPE-3 here uses tone on the second clause; flagged below |
| Dark band on a light page | legora (ink band), pexo (dark stage) | **Yes**: the navy `band` (383 to 395). Conflict C-5 |
| Large footer wordmark | spacefs (earlier round: decorative, not adopted), legora (about 485 x 95 px, green) | **Yes** (`foot__word`, 445). Here replaced by the real wordmark in HERO-B only |

**Tells in the baseline: 11 of 15 rows.** Three of them (gradient atmosphere, glow, noise texture) are also Spec 14.6 violations, not just taste issues. The labelled "Illustrative interface" caption and tenant colour swap are the parts worth keeping.

**Tells in this round's own heroes (honest list):** centred hero (A); eyebrow line (all four, but plain text, not a pill); a product frame with brackets (a design-system device); a repeated header and hero "Request a demo" label (all four; the header button is outline, 40 px, weight 500 vs a filled 52 px primary, so they differ in weight but not in words); two-tone headline clause under TYPE-3; the segmented switch in A resembles a tab-switch widget. Not present: logo strip, stats, quotes, gradients, glow, noise, bento, floating cards, scroll-lit text, dark band.
