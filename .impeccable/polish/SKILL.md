---
name: polish
description: >
  Final pre-release pass on a functionally complete Cyper Studio website page or section: alignment on the 4px scale, token fidelity, hierarchy, focus and hover states, copy against the banned list, no-JS render, and the Spec's definition of done. Use when a section works and needs to ship. Never adds claims, sections, devices, or motion.
metadata:
  argument-hint: "[target route, component, or section]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - harden
    - audit
    - critique
---

<!-- impeccable-pinned-skill -->

This is a site-aware `polish` skill that delegates to `$impeccable polish`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Polish Context

Polish is the **last** command. Run `/harden` first so states exist, `/audit` after.

**Preserve-first:** do not add new devices, glows, hairlines, blur, animation, copy, or claims while polishing. A taste change needs founder approval and a Spec update first (Spec 14.7).

**Polish checklist (check, then fix in one batch):**
- Spacing only from the 4px scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128); section rhythm 96px desktop / 64px mobile; no `p-[13px]`-style magic values.
- Colours and radii only from tokens; no raw hex; accent covers a small share of the viewport; one primary button per viewport.
- Type: h1 once, scale per DESIGN.md, body 17px/1.65 at <= 65ch, nothing under 14px, mono + tabular for data and index labels, no italic body.
- Focus ring visible on every interactive element, hover 150ms, targets >= 44px.
- Images: explicit `width`/`height`, descriptive `alt`, AVIF/WebP, lazy below the fold, `fetchpriority="high"` only on the LCP image.
- Copy: banned list clean, acronyms defined once per page, **HELIX** casing, glossary terms, Capability -> Outcome, no metaphor headline.
- Signature devices used consistently and sparingly (hatched <= 2 sections, brackets, index labels, annotated screenshots).
- Dev-only "Screenshot pending" frames and `{{CONFIRM` markers are gone or the section is gated off.

**Definition of done (Spec Appendix G):** blueprint acceptance passes; `scripts/check-all.sh` and `check-nojs.sh` pass; Lighthouse thresholds pass; Section 21 checklist has no FAIL for the page; every claim is in the Evidence Ledger; the founder has read it end to end.

## Delegation

Invoke `$impeccable polish` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
