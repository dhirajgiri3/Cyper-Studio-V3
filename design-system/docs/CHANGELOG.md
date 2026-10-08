# DESIGN SYSTEM CHANGELOG

## v0.1.1 · Gate 2 changes · 8 Oct 2026 (draft, not locked)

- D-16: `--fs-label` 0.75rem to **0.8125rem (13px)**; tokens, Foundations page, DESIGN_SYSTEM.md and Spec updated.
- D-17: header CTA filled at md with the same label and destination as the hero CTA (lg); the secondary variant is kept in the Lab only for comparison.
- D-18: header line and hover sheen classified as not motion moments; sheen not on the hero.
- D-19: Spec `Cyper_Studio_Redesign.md` to v1.1 (patches A1 to A3, B1 to B3). `spec-patches.md` marks status; B4 to B6 listed, not applied.
- Version bumped to 0.1.1 in `tokens.json`, generated files and the Lab bar.
- Regression re-run after the changes: 22 of 22 page-viewport runs, 0 axe violations (PROOF_REPORT Gate 2 addendum).
- Round 2 paused; scope updated in `DECISION_SHEET.md`.

## v0.1.0 · Round 1 · 8 Oct 2026

**Scope (10 changes, per the Gate 1 reply):**
1. `tokens.json` source of truth; generated `tokens.css`, `tokens.ts`, `contrast.md`; build exits non-zero on a failing contrast pair (R1-01)
2. Foundations page with the script-computed contrast table (R1-02)
3. Type scale with `₹`, AWB and tabular-figure specimens, full level set (R1-03)
4. Components: Button, Link, Field, Card, Badge, all states (R1-04)
5. Header with a no-JS mobile menu (R1-05) and Footer (R1-06)
6. PRO-HERO-01 with product frame, annotation markers and the mono key-value rail (R1-07)
7. PRO-TBL-01 rate-card table (R1-08)
8. Lab tooling: ID overlay, grid overlay, token export (R1-09)
9. CTA hover-sheen experiment, measured (R1-10)
10. `DESIGN_SYSTEM.md` v0.1, `react-mapping.md`, `spec-patches.md`, Round 1 research

Also: reference checks on mobile menus, footers, pricing, FAQ and hover (`docs/research/design/ROUND1_RESEARCH.md`); licensing and DNS findings (PROOF_REPORT R1.7).

Corrected during the round (PROOF_REPORT R1.5): wordmark accessible name, long-label overflow, focus hidden behind the sticky header, footer link width, landmarks and headings, Lab link size, two raw literals in `components.css`, table scroll cue, header-line test.

Regression: 22 of 22 page-viewport runs with 0 axe violations; 26 of 26 contrast pairs pass; LCP unchanged with the hero settle (1508 ms median both ways).

Git: raw PNGs untracked and ignored (`a83ba10`, local); 11 key WebP images added.

## v0.0 · Gate 1 · 8 Oct 2026

**Scope:** research, three style studies, repo recon. No design system exists yet; `DESIGN_SYSTEM.md` starts at v0.1 after Gate 1.

Added (all inside the write boundary):
- `design-system/docs/00-repo-recon.md`, `PROOF_REPORT.md`, `DECISION_SHEET.md`, `DECISIONS.md`, `CHANGELOG.md`, `screenshots/`
- `docs/research/design/`: 12 observation cards with screenshots and raw JSON, `MEASURED.md`, `SYNTHESIS.md`, `motion-catalogue.md`, `positioning-map.svg`
- `design-system/` static Lab: hub, `directions/` (three studies), subset Geist fonts and OFL licence
- Consolidated: unified `docs/design-system/` and `design-system/` into a single root `design-system/` workspace (`tokens/`, `scripts/`, `docs/`, `components/`, etc.).

Changed: nothing outside the write boundary. No existing file was modified.

Corrected during the round (see `PROOF_REPORT.md` section 5): `--border-strong` values failed 3:1 and were replaced; heading structure, landmarks, CLS, favicon, hero column ratio and B's grid-over-text legibility were fixed.
