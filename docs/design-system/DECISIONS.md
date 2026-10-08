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

## Proposed this round (awaiting reply; see `DECISION_SHEET.md` for options)

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

None yet. Awaiting Gate 1 reply.
