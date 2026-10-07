---
paths:
  - "content/**"
  - "app/**/*.jsx"
  - "app/**/*.js"
  - "app/**/*.md"
  - "app/**/*.mdx"
---

# Copy and claims

- Every sentence that states a fact about the company or product maps to a claim ID in Spec 4.4 and uses only its "Allowed wording now". Tags: `[BRIEF]` may be stated; `[BRIEF-ONLY]` (C-06..C-14) and `[FOUNDER-TO-CONFIRM]` (C-15, C-16) may not.
- Unknown value: write `{{CONFIRM: what is needed}}`. Never guess a legal entity, city, carrier, timeline, reply time, price, client count, or metric. Items with `confirmed: false` are filtered out of the build (not CSS-hidden).
- No "trusted by", no client names or logos, no testimonials without an attributable source, no team size, funding, awards, certifications, uptime, compliance claims, or Claude/Anthropic usage claims.
- Voice: banned list is `scripts/banned-terms.txt`; no metaphor or rhetorical-question headlines; Capability -> Operator outcome; active voice; sentences <= 20 words avg; paragraphs <= 3 sentences; define NDR, COD, 3PL, AWB, LTL once per page.
- Naming: **HELIX** (all caps), **Cyper Studio**; operator / tenant / merchant / consumer / carrier per Spec 5.4. "Platform" means the operator's branded shipping platform.
- Reuse the canonical entity definitions verbatim (PRODUCT.md, Spec 17.2) in hero, about, meta, JSON-LD, FAQ.
- Copy belongs in `content/*.js`; components receive props and contain no headlines.
