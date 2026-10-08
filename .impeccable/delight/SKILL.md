---
name: delight
description: >
  Evaluates whether a Cyper Studio website moment deserves a touch of personality, and if so adds only honest, restrained micro-moments. Default answer on this site is no: the Spec is calm, product-first, and motion-budgeted. Use rarely, for example the form success message.
metadata:
  argument-hint: "[target moment]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - onboard
    - animate
    - quieter
---

<!-- impeccable-pinned-skill -->

This is a site-aware `delight` skill that delegates to `$impeccable delight`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Delight Context

**Presumption: no.** The brand is precise and serious; "delight" is trust, speed, and clarity. Confetti, sparkles, emoji, easter eggs, mascots, sound, and forced humour are banned (Spec 13.3, 13.4, 14.6). `react-confetti` and `tsparticles` should not be used anywhere on this site.

**Allowed, if the visitor benefits:**
- A form success message that is warm but factual ("Thanks. We have your request and will reply to ...").
- A well-written 404 ("This page does not exist. Go to the HELIX overview or request a demo.").
- A single clean hover or focus transition (counts toward the two-moment motion budget if it animates beyond 150ms).
- Considered micro-copy in empty or error states; the founder's real voice in the changelog.

Anything else: decline, say why (cite the Spec section), and offer `/bolder` (hierarchy) or `/animate` (inside budget).

## Delegation

Invoke `$impeccable delight` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
