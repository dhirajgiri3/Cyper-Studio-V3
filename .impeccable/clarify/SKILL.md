---
name: clarify
description: >
  Improves copy on the Cyper Studio website: headlines that state facts, Capability -> Operator outcome sentences, glossary-consistent terms, banned-word removal, claim-register compliance, acronyms defined once, and clear form and error messages. Use whenever text is vague, agency-like, hypey, or unverified.
metadata:
  argument-hint: "[target page, section, or string]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - harden
    - shape
    - polish
---

<!-- impeccable-pinned-skill -->

This is a site-aware `clarify` skill that delegates to `$impeccable clarify`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Clarify Context (Spec 4, 5, 13)

**Hard writing rules (13.2):** headline states a fact/outcome/claim, no metaphor/pun/rhetorical question; section opens with the point; one idea per sentence; average <= 20 words, paragraphs <= 3 sentences; active voice; "you" = operator, "we" = Cyper Studio, "HELIX" = product; concrete verbs (compare, book, print, recover, settle, reconcile); numbers only when sourced; no superlatives; each acronym (NDR, COD, 3PL, AWB, LTL) defined once per page; Indian-English friendly.

**Glossary (5.4):** **HELIX** (not "the Helix app"/"our software"), **Cyper Studio**, **operator** (our customer), **tenant** (mostly `/helix`), **merchant**, **consumer**, **carrier**, **platform** reserved for the operator's branded shipping platform.

**Before writing any sentence:**
1. Find its claim ID (Spec 4.4). Use only the "Allowed wording now". `[BRIEF-ONLY]` -> write `{{CONFIRM: ...}}` or omit the block.
2. Check the banned list: `bash scripts/check-banned.sh` (patterns in `scripts/banned-terms.txt`).
3. Apply the rewrite pairs (13.5) to agency strings.
4. Reuse the canonical entity definitions (PRODUCT.md / Spec 17.2) verbatim in hero, about, meta, JSON-LD, FAQ.

**Form and error copy:** say what happened, why, and what to do next; failures always show `info@` on the canonical domain; no blame; no jargon; no exclamation marks.

**Never:** invent a metric, client, quote, or capability; write "trusted by"; promise a reply time or onboarding timeline the founder has not confirmed (Q-14, Q-05).

## Delegation

Invoke `$impeccable clarify` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
