---
name: critique
description: >
  Evaluates a page or section of the Cyper Studio website like a design director: the five-question reviewer test, Nielsen heuristics, visual hierarchy, conversion architecture, truthfulness, and a deterministic detector scan. Produces a scored critique with P0-P3 issues and recommended next commands. Use when asked to review, critique, or sanity-check a route, section, or the whole site.
metadata:
  argument-hint: "[route, section, or component]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - audit
    - polish
    - shape
    - distill
---

<!-- impeccable-pinned-skill -->

This is a site-aware `critique` skill that delegates to `$impeccable critique`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Critique Context

**Design thesis to judge against (Spec 14, DESIGN.md):** precise, calm, product-first, slightly technical; operational software a logistics business would trust with money movement. Creativity lives inside the system.

**Always score first with the five-question test** (Spec 3.2) on the first viewport at 1366x768 and 390x844, with and without JS: 1 company, 2 product, 3 customer, 4 real/early-stage, 5 email domain = site domain. Pass / Partial / Fail with evidence. Anything below 5/5 is a **P0**.

**Then apply the Spec's checklists** (Section 21): A clarity and positioning, B conversion, C trust and proof, D visual design, G accessibility, H mobile. Mark PASS / PARTIAL / FAIL with evidence.

**Site-specific failure modes to hunt (each is at least P1):**
- Agency voice: "tech wizards", "digital glitter", "our work", "digital solutions partner", portfolio sections on `/`.
- A claim not in the register, a number without a source, "trusted by" without permission, a `[BRIEF-ONLY]` claim rendered as fact.
- A metaphor headline, a rhetorical-question headline, a slogan without a claim.
- Dark theme, gradients, glows, blobs, particles, canvas, parallax, scroll-jacking.
- More than one primary-style button in a viewport; no CTA within one scroll.
- Hero depends on JS; LCP is an image that delays text.
- Non-canonical host or email anywhere; founding year other than 2024.
- Stock imagery, AI imagery, fake dashboards, fabricated names.

**Personas (see `.impeccable/site-context.md`):** Operator Founder, Technical Evaluator, Vetoer, Programme Reviewer. Test against all four.

**If P0s are structural** (wrong information architecture, section order, or positioning), recommend `/shape` or `/distill` before any refine command; polish cannot fix a broken page.

Save the report under `.impeccable/critique/` as `<UTC timestamp>__<slug>.md`.

## Delegation

Invoke `$impeccable critique` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
