# Round 1 reference checks (8 Oct 2026)

Time-boxed follow-up requested at Gate 1: mobile menus, footers, pricing, FAQ and hover states on the five primary sites (spacefs, handhold, workos-atlas, eden, stableapp). Method: real Chrome via Playwright (390x844 touch emulation for menus, 1440x900 for the rest). Raw data: `<site>/r1.json`; screenshots `<site>/r1-*.png` (kept locally, not committed). JS and WebGL easing was skipped as agreed.

Everything below is observation of the home page only. A cookie banner was dismissed where one was found.

## 1. Mobile menu

| Site | Toggle found | Toggle size (px) | Pattern | Scroll locked | `dialog` role |
|---|---|---|---|---|---|
| spacefs | button "Open menu", `aria-expanded` | 40 x 28 | Floating rounded card under a pill nav; uppercase section labels (Product, Solutions, Social media); large primary links (about 28px), smaller grey secondary links; close X inside the card | No | No |
| handhold | button "Open menu", `aria-expanded`, `aria-controls` | 40 x 40 | Short list: Blog, Changelog, Docs, plus the CTA | No | No |
| workos-atlas | none (single CTA, no navigation) | n/a | n/a | n/a | n/a |
| eden | button "Open menu", `aria-expanded` | 36 x 36 | Full link list plus two CTAs | No | No |
| stableapp | button "Menu", `aria-controls="offcanvas-navbar"` | **21 x 20** | Full-screen off-canvas, centred links, CTA, close X at the bottom | **Yes** | **Yes** |

Takeaways for HELIX:
- Four of five toggles are below the 44px target the Spec requires; stableapp's 21 x 20 is below even WCAG 2.2's 24px minimum. HELIX's toggle is 44 x 44.
- Three of four use a button with `aria-expanded` and no scroll lock; one uses a modal off-canvas with scroll lock. None uses a native `<details>`. HELIX uses `<details>` (works with JavaScript disabled), no scroll lock, a panel directly under the header.
- spacefs's uppercase section labels inside the menu map to the locked mono index labels; adopted as `hx-menu__group`.
- Timing of the menu animation itself was not isolated: `getAnimations()` during opening also returned unrelated page animations (opacity and transform, 1.1 to 1.8s linear on spacefs and eden; a 40s transform loop on handhold). stableapp's off-canvas shows `transform 300ms ease-in-out` plus `opacity 150ms`. Treat menu timing as `NOT OBSERVED` for the other sites.

## 2. Hover states on the primary CTA

| Site | Element probed | Changed on hover | Transition |
|---|---|---|---|
| handhold | "Try for free" | background colour only (black to a lighter near-black) | 0.15s, cubic-bezier(0.4, 0, 0.2, 1) |
| workos-atlas | "Add to your Slack" | background colour only (black to 85% black) | 0.15s, cubic-bezier(0, 0, 0.2, 1), on background, colour and box-shadow |
| spacefs | probe selected "Skip to main content" | **inconclusive** | n/a |
| eden | probe selected "New" (an app control) | **inconclusive** | n/a |
| stableapp | no prominent CTA matched | `NOT OBSERVED` | n/a |

Takeaway: where observed, hover is a **150ms colour change with no transform or shadow**, which supports HELIX's 150ms colour-only hover (`--t-fast`). The Lab's experimental sheen is therefore a deliberate addition, not a convention of these references.

## 3. FAQ and accordions

- spacefs: 13 accordion triggers, `<button aria-expanded>`, a 150ms opacity transition (cubic-bezier(0.4, 0, 0.2, 1)) when opened.
- stableapp: 13 triggers, opacity 150ms linear.
- handhold: the matched control was a navigation dropdown, not a FAQ; **inconclusive**.
- workos-atlas, eden: no accordion on the home page.
- Earlier observation (getenergy) remains the only native `<details>` FAQ in the set.

Takeaway: the two real accordions both animate opacity in 150ms and need JavaScript; HELIX's native `<details>` needs neither.

## 4. Footers

| Site | Height at 1440 | Links | Groups | Legal links | Email shown | Copyright line | Entity name |
|---|---|---|---|---|---|---|---|
| spacefs | 809 | 22 | Product, Company, Legal, Social | Yes | **No** | Yes | "Space Computer, Inc." |
| handhold | 276 | 6 | none | Yes | No | No | not seen |
| workos-atlas | 464 | 4 | none | Yes | No | Yes | not seen |
| eden | 1,039 | 64 | many | Yes | No | Yes | not seen |
| stableapp | 891 | 12 | headings partly duplicated | Yes | No | Yes | not seen |

Takeaways:
- **None of the five shows an email address in the footer.** HELIX shows `info@` on the canonical domain and the legal entity on every page (Spec 12.4, 6.2). That is a trust differentiator for the "Is it real?" question and for the domain-match test.
- spacefs's pattern (small group headings, muted 14px links, a tagline, one CTA, a legal entity line in the bottom row) is the closest to HELIX's footer and informed `PRO-FTR-01`. Its giant decorative wordmark was not adopted.
- Footer link spacing at about 36px per link on spacefs; HELIX uses 44px on touch pointers and 48px on fine pointers to meet target-size rules.

## 5. Pricing

| Site | Pricing link | What it is |
|---|---|---|
| eden | `/pricing/` | Dedicated page: audience-intent chips ("What brings you to Eden?"), monthly/annual toggle, 1 table, 3 plans, a contact path |
| spacefs | `/#pricing` | Anchor to a section on the home page |
| stableapp | `/#pricing` | Anchor on the home page, contact CTA present |
| handhold, workos-atlas | none on the home page | n/a |

Takeaway: consistent with Spec D-07 (pricing posture as a section, not a page). The audience-intent chips on eden's pricing page are another instance of the "name the audience" pattern in `SYNTHESIS.md` principle 10.

## 6. Not observed or inconclusive

- Hover on spacefs, eden and stableapp CTAs (probe picked the wrong element or found none).
- Menu-specific animation timing on spacefs, handhold and eden.
- handhold FAQ.
- Anything beyond the home page, real devices, and assistive-technology behaviour.
