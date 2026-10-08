# DECISION SHEET (rolling) · v0.1.1 · after Gate 2 · 8 Oct 2026

**Nothing is locked. Round 1 is not LOCK.** Round 2 is paused until the visual-assets task reaches its first review gate.

## A. Resolved (full log in `DECISIONS.md`)

| ID | Decision |
|---|---|
| D-1 to D-15 | Resolved at Gate 1 (see `DECISIONS.md`) |
| D-16 | Mono labels are **13px (0.8125rem)**, the only text allowed below 14px. Done in tokens and Spec |
| D-17 | Header CTA stays **filled (primary), md**, same label and destination as the hero CTA (lg). Switch to secondary only if you say so after seeing both |
| D-18 | The header line and the hover sheen are **not** motion moments. The sheen stays off the hero until you have tried it with a real mouse |
| D-19 | Spec patches A1 to A3 and B1 to B3 applied (Spec now v1.1); B4 to B6 listed, not applied |
| D-20 | Option (c): no force-push; squash-merge later |
| D-21 | Demo biotif, SF Pro and Clash files deleted from `public/Assets/Fonts` in one separate commit (see the redeploy notes in the final message) |
| D-22 | Round 1 committed, no PNGs |
| D-23 | Mobile menu uses native `<details>`; Escape and outside-click close are an optional React enhancement |

## B. Waiting on you (not blocking anything today)

| # | Item | What I need |
|---|---|---|
| W-1 | **Header CTA treatment** | Look at `compositions/hero.html` (filled header CTA, the decided default) and `compositions/header-secondary-cta.html` (secondary). Say "secondary" only if you want the change |
| W-2 | **CTA hover sheen** | Open `components/index.html`, hover the "EXPERIMENT" button with a mouse. Tell me keep, drop, or tune. It is not on the hero |
| W-3 | **Spec items B4 to B6** | Apply or ignore (listed in `spec-patches.md`) |
| W-4 | **Wording of the "one primary action" rule** | I reworded the Spec rule to keep it consistent with your filled-header answer. Confirm the phrasing or give me yours |
| W-5 | **Brand colour and logo files** (Spec Q-12) and **real console screenshots** (Q-13) | Still the biggest unknowns for the final look; the accent remains the working cobalt |

## C. Round 2 (paused) scope when it resumes

In scope: segmented selector or tabs (CSS-only), fact strip, stepper, callout, FAQ, form states, mobile compositions, live controls.
Deferred: compare mode and the playable motion lab.
Moved to the visual-assets task: capability grid, white-label diagram, lifecycle, annotated screenshot, diagram card.

## D. Side items

- Raw PNGs from `cf51450` stay in pushed history until the branch is squash-merged (D-20 c).
- Deleting the font files does not remove them from git history (D-21).
- `cyper.studio` TLS, SPF and DKIM findings (PROOF_REPORT R1.7 item 2) are unresolved and outside this task.
