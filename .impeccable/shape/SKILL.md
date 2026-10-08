---
name: shape
description: >
  Plans a page, section, or flow for the Cyper Studio website before any code is written, using the Spec's blueprint format (order, priority, purpose, visitor and reviewer question, final copy, layout, evidence, acceptance, metric, effort). Produces a confirmed brief that cites claim IDs and component names. Use for any new route, new homepage section, a new diagram, or a significant rewrite.
metadata:
  argument-hint: "[page or section to shape, e.g. '/helix console tour' or 'homepage section 7']"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - clarify
    - layout
    - harden
    - critique
---

<!-- impeccable-pinned-skill -->

This is a site-aware `shape` skill that delegates to `$impeccable shape`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Shape Context

The Spec already contains a blueprint for every launch page (Sections 9-11). **Start from it.** Shape confirms, narrows, or amends a blueprint; it does not invent a competing one.

**Required discovery (ask only what the Spec and PRODUCT.md do not answer):**
1. Which route and blueprint section? Surface mode: Persuade or Read (see `.impeccable/site-context.md`).
2. Which visitor and which of the five reviewer questions (Q1-Q5, Spec 3.2) must this answer?
3. Which claim IDs does the copy use, and what is each one's allowed wording **today**? Any `[BRIEF-ONLY]` claim means the block is absent from the build until promoted.
4. What is the primary action? (One primary CTA style per viewport; Spec 12.2 CTA map.)
5. Which evidence exists? Real console screenshots (Q-13)? If not, the brief carries a "Screenshot pending" dev frame and a launch blocker.
6. JS-disabled behaviour: what renders in the server HTML, and how does the form fall back?
7. Motion: which of the two motion moments, if any, does this section use?
8. Which content module holds the copy (`content/<page>.js`) and which components does it use (Spec 18.3)?

**Brief must include:** blueprint card in the Spec's format, copy with claim tags, component list, the **path to demo request** (steps from landing to submitted form, each REQUIRED / INFERRED / CEREMONY, target: one scroll to a CTA, form of <= 5 required fields), acceptance criteria that are binary and testable, and the metric event (Spec 12.6).

There is no state machine, wallet, or permission model on this site. Do not import those concepts.

## Delegation

Invoke `$impeccable shape` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
