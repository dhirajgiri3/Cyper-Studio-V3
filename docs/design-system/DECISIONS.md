# DECISIONS LOG

Format: ID · decision · who decided · date · rationale · alternatives rejected. Entries marked **proposed** await your reply.

## Locked before this task (from the brief and `Cyper_Studio_Redesign.md`)

| ID | Decision | Decided by | Date |
|---|---|---|---|
| L-1 | HELIX-centred site; Cyper Studio founded 2024; audience: operators of couriers, 3PLs, brokers, franchise networks, aggregators in India | Founder | before 8 Oct 2026 |
| L-2 | Light mode only | Founder | before 8 Oct 2026 |
| L-3 | Geist Sans + Geist Mono, self-hosted variable woff2, <= 3 weights; Inter only if Geist fails the `₹` test | Founder | before 8 Oct 2026 |
| L-4 | Signature devices: hatched paper (<= 2 sections), corner brackets, mono index labels, annotated screenshots | Founder | before 8 Oct 2026 |
| L-5 | Motion budget: <= 2 moments per page, transform and opacity only, no scroll hijack, parallax, autoplay video above the fold, or animation library above the fold; no-JS and reduced-motion safe | Founder | before 8 Oct 2026 |
| L-6 | Performance and accessibility targets (LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1, Lighthouse mobile >= 90, JS <= 90 KB gz, CSS <= 30 KB gz, fonts <= 100 KB, hero <= 120 KB; WCAG 2.2 AA) | Founder | before 8 Oct 2026 |
| L-7 | Component verdicts: ink-orbit-features adapt; image-stream-hero optional below the fold; scroll-morph-hero and hero-section-3 rejected | Founder | before 8 Oct 2026 |
| L-8 | Real console screenshots only; "Screenshot pending" placeholder; no stock or AI imagery | Founder | before 8 Oct 2026 |

## Resolved by measurement this round (no decision needed, recorded for traceability)

| ID | Finding | Evidence | Date |
|---|---|---|---|
| M-1 | Geist Sans and Geist Mono both contain `₹` (U+20B9); Geist Sans has `tnum`. Inter fallback not needed | fontTools cmap and GSUB on the shipped files | 8 Oct 2026 |
| M-2 | Full Geist variable files are 141 KB, over the 100 KB budget; the Latin plus `₹` subset is 46.7 KB | file sizes | 8 Oct 2026 |

## Proposed at Gate 1 (all answered in the Gate 1 reply, see below)

| ID | Proposal | Status |
|---|---|---|
| D-1 | Direction A as base with two optional imports | proposed |
| D-2 | Reject `liquid-metal-button` | proposed |
| D-3 | Reject `image-stream-hero` by default | proposed |
| D-4 | The two motion moments | proposed |
| D-5 | Add `--border-strong` (3:1) token | proposed |
| D-6 | Reject visible grid as a device unless B is chosen | proposed |
| D-7 | Tone-shift headline as optional variant | proposed |
| D-8 | Keep working cobalt accent | proposed |
| D-9 | 17px body | proposed |
| D-10 to D-15 | Housekeeping and delivery items | proposed |

## Founder decisions made in this task

Gate 1 reply, 8 Oct 2026 (founder):

| ID | Decision | Notes |
|---|---|---|
| D-1 | **Direction A** as base, plus B's mono key-value rail inside the product frame | |
| D-2 | `liquid-metal-button` is REJECT | In `spec-patches.md` A1 |
| D-3 | `image-stream-hero` rejected by default; reopen only with real tenant screens | In `spec-patches.md` A1 |
| D-4 | Two motion moments. **Moment 1 uses transform only; never opacity or hiding the LCP element; verify LCP unchanged** | Verified in Round 1: Lighthouse median 1508 ms both ways (PROOF_REPORT R1.3) |
| D-5 | `--border-strong` only for form controls and boundaries needed to identify a component; decorative borders stay on `--border` | In `spec-patches.md` A2; implemented |
| D-6 | Visible grid rejected | |
| D-7 | Tone-shift headline allowed as a variant, off by default | `hx-tone-muted` class exists, unused |
| D-8 | Accent: **blank in the reply; assumed KEEP cobalt `#1F4FE0`** | Assumption, see Decision Sheet A |
| D-9 | 17px body | |
| D-10 | Accepted; check whether any live page or production HTML references the biotif or SF Pro files | Checked: no reference anywhere, but the files are publicly downloadable (PROOF_REPORT R1.7) |
| D-11 | Accepted provisionally, subject to legal review | |
| D-12 | CSS-only tabs | |
| D-13 | Static HTML for the direction studies only; from Round 1 plain HTML and CSS components with a documented 1:1 React mapping and a screenshot-parity check at promotion | `react-mapping.md` |
| D-14 | Sample copy by default | |
| D-15 | `DESIGN.md` and `PRODUCT.md` refreshed after LOCK | |
| Taste | **Blank in the reply; assumed no corrections** to `SYNTHESIS.md` section 4 | Assumption |
| Spec | Do not edit the Spec; write `spec-patches.md` | Done |
| Git | Do not commit raw research screenshots; ignore them; commit cards, analysis files and key WebP under 100 KB | Done in `a83ba10` (local). Raw PNGs from `cf51450` remain in history, see D-20 |
| Experiment | Optional CTA hover sheen, transform-only pseudo-element, hover-only, <= 600ms, off under reduced motion; measure cost | Built and measured (PROOF_REPORT R1.4); not applied to the hero |
| Scope | Round 1: tokens, foundations, type scale, Button/Link/Field/Card/Badge, Header + mobile menu, Footer, PRO-HERO-01, PRO-TBL-01, ID overlay, token export | Delivered |

## Proposed in Round 1 (answered at Gate 2, see the Gate 2 table below)

D-16 mono label size · D-17 header CTA style · D-18 classify the header line and hover sheen as not counted · D-19 apply Spec patches · D-20 raw PNGs in pushed history · D-21 remove demo and SF Pro font files from `public/` · D-22 commit Round 1 · D-23 mobile menu close behaviour.

## Gate 2 reply, 8 Oct 2026 (founder). Nothing is locked.

| ID | Decision | Notes |
|---|---|---|
| D-16 | Mono labels **13px (0.8125rem)**, the only text allowed below 14px | `tokens.json` label size changed; Spec 14.2 and Appendix B `.mono-label` updated; Lab regression re-run |
| D-17 | Header CTA stays **filled**, same label and destination as the hero CTA, **md** size (hero uses **lg**). Change to secondary only if the founder says so after seeing both in the Lab | Both Lab renderings kept. Spec rule reworded to "one primary action per viewport" |
| D-18 | Header line and hover sheen are **not** motion moments. Sheen stays off the hero until the founder has tried it with a real mouse | Recorded in Spec 15.4 and DESIGN_SYSTEM.md |
| D-19 | Apply spec-patches A1 to A3 and B1 to B3 per the answers; list B4 to B6, do not apply | Applied; Spec v1.1. B2 applied as proposed (no separate answer) |
| D-20 | Option (c): no force-push; squash-merge later | No history change made |
| D-21 | **Explicit exception to the write boundary:** delete the demo biotif, SF Pro and Clash font files from `public/Assets/Fonts` in one separate commit that changes nothing else; report what must be redeployed | Done; history still contains the files |
| D-22 | Commit Round 1 now, with no PNGs | Done |
| D-23 | Accept: mobile menu close behaviour | |
| Round 2 | **Paused** until the visual-assets task reaches its first review gate. Scope when resumed: segmented selector or tabs (CSS-only), fact strip, stepper, callout, FAQ, form states, mobile compositions, live controls. Compare mode and the playable motion lab deferred. Capability grid, white-label, lifecycle, annotated screenshot and diagram card move to the assets task | |
| Lock | **Round 1 is not LOCK.** Nothing is frozen; v0.x remains draft | |
