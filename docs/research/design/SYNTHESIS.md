# Design research synthesis (v0.0, 8 Oct 2026)

Evidence base: 12 live pages observed in real Chrome (5 primary, 4 secondary, 3 calibration), home page only, desktop plus 1024 and 390 viewports. Cards: `<site>/CARD.md`. Numbers: [`MEASURED.md`](MEASURED.md). Motion: [`motion-catalogue.md`](motion-catalogue.md). Anything not measured is marked `NOT OBSERVED` in the cards. Nothing here is copied from a reference; principles and ratios only.

## 1. Research summary (one page)

1. **Richness is expensive, and most of the references are rich.** The seven pages built on WebGL or canvas heroes, gradient surfaces or hundreds of animations scored **30 to 42** on Lighthouse mobile performance with lab LCP of **5.9 to 27.4 s**. Only two pages scored 90 or above (getenergy 94, wama 93), and only getenergy met LCP <= 2.5 s while also being a calm, light-mode product page (136 KB JavaScript, 15 KB CSS, 39 requests). The HELIX targets (LCP <= 2.5 s, JS <= 90 KB) are met by almost none of the references, so the references can inform feel but not method.
2. **The feeling of "premium" is mostly typographic and structural, not decorative.** The recurring, cheap devices are: very large tightly tracked display type (about -0.02 to -0.035em), hierarchy by tone rather than weight or colour, hairline borders (0.5 to 1px at 6 to 12% opacity), one confident CTA, and a real product frame. These cost nothing in performance.
3. **The strongest credibility signal observed is a real, dense data screen early on** (stableapp's cost table with severity chips and large figures; crealo's rights table). That maps directly to HELIX (rate-card tables, AWB and COD figures). No reference achieves credibility through illustration.
4. **The incumbent in HELIX's market (Shiprocket) competes on noise**: promo banner, rainbow gradient, carousel, stock-style portrait, logo marquee, unverifiable counts ("4 Lakhs+ Businesses") and banned words ("Seamless", "Empowerment") in headlines. The EasyPost 3PL page, the nearest white-label shipping product found, leads with its demo form, has no navigation, and makes numeric claims ("100+ carriers", "99.99% uptime") that HELIX cannot make. HELIX's honest differentiator is to say less, truthfully, and to show the operator console.
5. **Accessibility and resilience are weak across the set.** Colour-contrast was the most common automated finding; one page (handhold) renders nothing with JavaScript disabled; five pages keep infinite animations running under reduced motion; four had a consent banner covering part of the first viewport.
6. **Third-party scripts are universal in the set (12 of 12).** HELIX's budget (none except deferred privacy-friendly analytics) is stricter than every reference, so no reference can be used as proof that a lean setup is normal.
7. **Implication for the Lab:** all three directions get their personality from type, shape, density, hairlines, the four locked signature devices and the product frame, not from gradients or motion. This is what makes the performance targets reachable.

## 2. Pattern-frequency matrix

Legend: **Y** observed, **~** partial or at the edge of the first viewport, **-** not observed in the frames I viewed, **?** not checked. Based on first-viewport and scroll-frame screenshots, computed styles and the harness data; "not observed" is not proof of absence.

| Pattern | spacefs | handhold | workos-atlas | eden | stableapp | monday | getenergy | crealo | wama | shiprocket | easypost-3pl | linear |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Real product UI in first viewport | - | - (stylised) | ~ | Y | Y | Y | ~ | ~ | - (client work) | Y | - | ? |
| Centred hero | Y | Y | Y | Y | Y | - | Y | Y | Y | - | - | ? |
| Pill or fully rounded primary CTA | Y | Y | Y | Y | - | Y | Y | - | Y | - | - | ? |
| Tone-shift or emphasis inside the headline | Y | - | - | Y | - | - | Y (accent word) | - | - | - | - | ? |
| Dark theme | - | - | - | Y | - | - | - | - | - | - | - | Y |
| Canvas / WebGL / 3D element on page | Y | Y | Y | - | - | - | - | - | - | Y | - | - |
| Sticky or fixed header | Y (floating pill) | - | - | Y | - | - | Y | - | - | - | - | Y |
| Numbered, mono, or label-value device | - | - | Y | Y | ~ (outlined chips) | - | - | - | - | - | - | Y (mono font) |
| Audience or use-case selector (chips or tabs) | Y | - | Y | Y | - | Y | Y | - | - | - | - | - |
| Customer-logo wall or marquee | - | Y | - | - | Y | Y | - | - | Y (clients) | Y | - | - |
| Native `<details>` FAQ | - | - | - | - | - | - | Y (8) | - | - | - | - | - |
| Visible text with JS disabled | Y | **- (0 chars)** | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Infinite animation under reduced-motion | - | - | Y (8) | Y (1) | - | Y (4) | Y (2) | - | - | - | - | Y (76) |
| Consent banner covering first viewport | - | Y | - | - | - | Y | Y | - | - | - | Y | - |
| Lighthouse mobile performance >= 90 | - (39) | - (38) | - (37) | - (42) | - (42) | - (31) | **Y (94)** | - (57) | **Y (93)** | - (57) | - (36) | - (30) |
| Third-party scripts of any kind (analytics, pixels, chat, visitor ID) | Y | Y (Plausible) | Y | Y | Y | Y | Y (small visitor-ID script) | Y | Y (Framer events) | Y | Y | Y (Intercom) |
| JS under 140 KB | - | - | - | - | - | - | **Y (136)** | - | - | - | - | - |

## 3. Positioning map

![Positioning map](positioning-map.svg)

Axes are **judgement, informed by measured counts** (gradient elements, canvas, infinite animations, requests, text per viewport), not a computed score. Target for HELIX: **calm** (left) and **medium-dense** (upper middle), with the product frame carrying density rather than ornament.

| Site | Calm to expressive (0 to 10) | Airy to dense (0 to 10) | Basis |
|---|---|---|---|
| getenergy | 3 | 4 | one animation set, 22 gradient elements, lean payload |
| crealo | 2 | 5 | flat, 2px radii, no shadow, data table image |
| wama | 4 | 3 | typographic, image-led, scroll-timeline reveals |
| spacefs | 6 | 2 | particle canvas, pinned scroll story |
| handhold | 7 | 3 | WebGL ribbon, grain gradients |
| workos-atlas | 7 | 3 | 3D mascot, 61 gradient elements |
| stableapp | 6 | 6 | blobs plus dense product table |
| eden | 6 | 8 | dark, 395 SVGs, tabbed dense cards |
| monday | 8 | 7 | 377 requests, mascots, many CTAs |
| shiprocket | 8 | 9 | banner, carousel, logos, widgets |
| linear | 8 | 7 | 520 concurrent animations |
| **HELIX target** | 2 to 3 | 5 to 6 | calm, product-framed, tabular |

## 4. Taste translation

Several references sit in other categories or lean expressive. For each pattern you are likely drawn to (inferred from the reference list; correct me at Gate 1):

| Appeal | What actually drives it | How to deliver the same feeling, calmly, light, maintainable |
|---|---|---|
| Atmospheric backgrounds (particles, ribbons, blobs: spacefs, handhold, stableapp) | Depth, a sense that the product is "alive", and a break from flat white | Hatched paper (locked device), one `--accent-tint` field behind the product frame, corner brackets, soft `--shadow-2` on the frame. Static. Cost: zero JS |
| Two-tone display headline (spacefs, eden) | Hierarchy inside one headline without extra weight or colour | `--ink` first line, `--muted` second line (CSS only). Offered as a Lab toggle in all three directions; measured contrast of `--muted` on white is 4.97 to 6.31:1 |
| Product UI above the fold (eden, stableapp, monday) | "This is real software" in one glance | A real console screenshot framed with brackets and numbered markers; until it exists a labelled "Screenshot pending" frame. This is also the Spec's own hero rule |
| Typed or animated headline (eden) | Liveliness and a sense of authorship | A static headline plus one 250ms opacity/transform reveal of the product frame (motion moment 1). Never animate the LCP text |
| Pill CTAs and floating pill nav (spacefs, getenergy, handhold) | Modern softness and touch-friendliness | Offered as a shape variable (`--r-btn`): square 4, soft 10, pill 999. Header stays a plain sticky 64px bar |
| Mascot or 3D (workos-atlas) | Warmth and a memorable asset | Not delivered. Warmth comes from direction C (palette, radii, 18px body) instead |
| Dark theme (eden, linear) | Focus and "serious tool" feel | Locked out. Density, mono labels and a darker `--ink` CTA (direction B) give the serious-instrument feel in light mode |
| Numbered section labels (eden) | Order and rhythm | Already a locked device: mono index labels ("01 / Compare") |
| Bento grids (linear, ink-orbit) | Showing several capabilities at once | A 3-card static bento with diagrams (adapted `ink-orbit-features`, no fabricated live data) |

## 5. Transferable principles (with evidence)

1. **Make the product the proof.** Real UI early, not illustration (eden, stableapp, monday, shiprocket show UI in the first viewport; spacefs defers it and relies on atmosphere).
2. **State the category in one plain line.** Headlines in getenergy, crealo, wama and the spacefs sub-line name what the thing is; none depend on metaphor.
3. **One primary CTA per viewport.** Four of the five primary sites show one or two hero buttons (stableapp has none, only a nav CTA); monday and shiprocket add more paths and read busier.
4. **Hierarchy by scale and tone, not by colour.** Display sizes 57 to 84px with -0.02 to -0.035em tracking recur (spacefs 76, workos 84, eden 58, handhold 72, getenergy 80).
5. **Hairlines over shadows.** Premium surfaces use 0.5 to 1px borders at 6 to 12% opacity (spacefs inset 0.5px, eden 7 to 10% white, getenergy 6 to 10%).
6. **Restraint in motion predicts performance.** The two pages scoring >= 90 are the two with the least motion and gradient work.
7. **Richness has a measurable bill.** WebGL, canvas heroes and hundreds of animations co-occur with LCP of 6 to 27 s in this lab.
8. **Real tables build trust.** stableapp and crealo put dense data on screen early; large numerals and outlined severity chips carry authority.
9. **Label | value pairs and mono labels explain compactly.** workos-atlas pills, eden numbered eyebrows, linear mono labels.
10. **Name the audience near the headline.** monday and getenergy use chips or tabs for roles and use cases.
11. **Use native elements for disclosure.** getenergy's eight `<details>` items work without JavaScript.
12. **Content must survive without JavaScript.** handhold's blank no-JS page is the counter-example; every other page kept its text.
13. **Do not let a consent banner cover the first viewport.** Four of twelve did. (With privacy-friendly, cookieless analytics HELIX may need no banner at launch; a legal-review item.)
14. **Reserve space for media and forms.** easypost-3pl CLS 0.305 and crealo 0.082.
15. **Do not state what you cannot show.** Incumbents lead with counts and uptime figures that a visitor cannot verify; HELIX's claim register forbids them, so its credibility must come from the console, the entity block and a working contact.

## 6. Explicit reject list

Dark theme; WebGL, canvas, particle or 3D mascot backgrounds; typed or auto-advancing headlines; scroll pinning and scroll-jacking (including `preventDefault` on wheel or touch and smooth-scroll libraries); logo walls and marquees; carousels; investor, award or "backed by" badges; numeric or uptime claims; stock or portrait photography; backdrop-blur headers; third-party chat launchers; full-page consent overlays; gradient text and gradient blobs; infinite or looping animation; serif or light display weights (Geist is locked).

## 7. What incumbents say versus what HELIX can truthfully say (factual, non-disparaging)

| Observed on the incumbent or nearest peer (home or landing page, 8 Oct 2026) | What HELIX can truthfully say today |
|---|---|
| Shiprocket headline: "Your Partner for eCommerce Empowerment"; sub-line "end-to-end"; counts such as "4 Lakhs+ Businesses" | "HELIX is a white-label, multi-tenant logistics operating system built by Cyper Studio." Founded 2024. No counts |
| Shiprocket product copy uses "Seamless" in a heading | Plain verbs from the claim register once confirmed: compare, book, print, recover, settle |
| EasyPost 3PL sub-headline: "100+ carriers. 99.99% uptime." | No carrier count and no uptime until verified (C-07, C-16) |
| Both lead with a sign-up or demo form (Shiprocket adds a promo banner and a logo marquee) | A real console screenshot, an entity block with legal name and `info@` on the same domain, and a short form later on the page |

## 8. Limits of this research

Home pages only; no pricing, docs or mobile-menu states; no frame capture of JS or WebGL motion; single Lighthouse run per site on a developer machine; automated accessibility only; no real devices. The positioning axes are judgement. Calibration choices were mine: Shiprocket (market incumbent), EasyPost 3PL (nearest white-label shipping product the search surfaced), Linear (intended as a calm infrastructure benchmark but observed to be dark and heavy, so it is recorded as a counter-example).
