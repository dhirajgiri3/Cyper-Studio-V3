---
name: extract
description: >
  Consolidates repeated markup and ad-hoc styles in the Cyper Studio website into the Spec's component set (Button, Section, Container, Card, Badge, Field, Details, ProductFrame, diagrams) and moves hardcoded copy into content modules. Use when the same pattern exists in 2+ places or when copy is embedded in JSX.
metadata:
  argument-hint: "[target directory or pattern]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - audit
    - document
    - polish
---

<!-- impeccable-pinned-skill -->

This is a site-aware `extract` skill that delegates to `$impeccable extract`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Extract Context

**Where things go (this repo is JavaScript with a root `app/`):**
- Components: `app/components/ui/` (Button, Card, Badge, Field, Details, ProductFrame), `app/components/layout/` (Header, Footer, Container, Section), `app/components/sections/` (Hero, FactStrip, Problem, ...), `app/components/diagrams/`.
- Copy and facts: `content/*.js` (site, home, helix, about, contact, faq). Components receive props; they do not contain headlines.
- Tokens: CSS variables (Spec Appendix B) mapped in `tailwind.config.mjs`.
- Props are documented with JSDoc or `prop-types` (already a dependency), mirroring the Spec 18.5 interfaces.

**Extraction candidates to look for first:**
- Copy strings embedded in `app/components/Home/Sections/*` and `app/about/page.jsx` that belong in `content/`.
- Hostnames, emails, and the founding year repeated in JSX, metadata, or footers -> single `siteConfig` (Spec Appendix C).
- Multiple button implementations (`app/components/Buttons/PrimaryButton`) -> one `Button` with `primary | secondary | tertiary`.
- Section wrappers with ad-hoc padding -> `Section` with `tone: plain | surface | hatched` and the 96/64px rhythm.
- Styled-components wrappers that can become Tailwind + variables.

**Rules:** extract only with >= 2 real call sites and identical invariants; do not add props or variants nobody uses; do not extract the 3D/Animations/Gravity code, it is slated for disposition (Spec 18.5), not reuse; update every call site; record any new component in Spec Section 14.4 first (governance 14.7).

## Delegation

Invoke `$impeccable extract` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
