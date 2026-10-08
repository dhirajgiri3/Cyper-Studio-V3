---
name: init
description: >
  Captures or refreshes PRODUCT.md for the Cyper Studio / HELIX website. PRODUCT.md already exists and is derived from Cyper_Studio_Redesign.md, so this updates stale facts only (promoting a claim from BRIEF-ONLY to confirmed, answering a founder question Q-xx) rather than re-interviewing. Use when a founder decision lands, a claim is verified, or the stack changes.
metadata:
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - document
    - shape
    - critique
---

<!-- impeccable-pinned-skill -->

This is a site-aware `init` skill that delegates to `$impeccable init`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Init Context

PRODUCT.md exists and is the product record. **Do not reopen confirmed fields.** Init here means a targeted update:

- **A founder answer arrived (Q-01..Q-21, Spec 24):** record it in PRODUCT.md and in the Spec's Decisions log / Evidence ledger (Spec 25). Typical: canonical domain (Q-01), legal entity (Q-03), live capabilities (Q-05), brand colour (Q-12).
- **A claim was verified:** change its tag from `[BRIEF-ONLY]` to `[LIVE]` or `[PRODUCT-CODE]` with the source (path/line, URL, date) and move it from "Not confirmed" to "Confirmed" in PRODUCT.md. Only then may content modules set `confirmed: true`.
- **Stack changed (for example JS to TS, Tailwind 3 to 4):** update `## Stack` and the gap list in `.impeccable/site-context.md`.

Interview rules: the question bank is the Spec's Section 24 table, ordered by what blocks P0 work. Ask at most three questions per round, offer the Spec's default as the first option, and never ask for aesthetic direction (DESIGN.md owns that).

Never write a number, customer, quote, or capability that the founder has not stated. Record absence explicitly ("Absent, must not be fabricated").

`config.json` keeps `"buildPath": "code"`; do not re-ask.

## Delegation

Invoke `$impeccable init` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
