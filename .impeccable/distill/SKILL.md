---
name: distill
description: >
  Reduces a Cyper Studio website page to the Spec's blueprint: one idea per section, no agency or portfolio blocks, at most 12 blocks on the homepage, one CTA style per viewport. Use when a page has too many sections, mixed messages, or content that is about the studio instead of HELIX.
metadata:
  argument-hint: "[target page or section]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - layout
    - clarify
    - quieter
---

<!-- impeccable-pinned-skill -->

This is a site-aware `distill` skill that delegates to `$impeccable distill`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Distill Context

**The test for every block:** does it help a logistics operator understand HELIX, believe it is real, or request a demo? If not, delete it or move it (Spec 8.5, D-09).

**Remove or move off `/`:** agency/portfolio/"our work" sections, "what we do" service lists unrelated to HELIX, playful sections, team-fun blocks, testimonials without an attributable source, logo walls, anything needing client permission (Q-17).

**Keep to the blueprint:** homepage = header, hero, fact strip, problem, solution, white-label (Diagram 1), how it works (Diagram 2), capabilities (<= 6 cards), who it is for, built by Cyper Studio, FAQ + form, footer. One idea per sentence, one job per section, paragraphs <= 3 sentences, one primary CTA style per viewport.

**Structure:** flatten nested cards ("boxes inside boxes"), drop redundant wrappers, no duplicate CTAs competing in one viewport, no more than 3 columns of text-only content.

Do not delete functional controls (form fields in Spec 12.3, nav items for live pages). Report what was removed and where it went (deleted / moved to a later page / pending permission).

## Delegation

Invoke `$impeccable distill` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
