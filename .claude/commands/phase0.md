---
description: Run a slice of the Spec Phase 0 codebase audit and write the result to docs/audit/
argument-hint: "<preflight | technical | content | harm | components | research>"
allowed-tools: Read, Grep, Glob, Bash(grep:*), Bash(ls:*), Bash(wc:*), Bash(npm ls:*), Bash(bash scripts/check-all.sh), Write(docs/audit/**), Write(docs/research/**), Agent
---

Phase 0 is Spec Section 19 and is **not done yet**. Do the slice named in `$ARGUMENTS`, one at a time, and write the output as Markdown in `docs/audit/<slice>.md` (research goes in `docs/research/`). Cite file paths and line numbers; mark anything unmeasured `NOT MEASURED` and anything unseen `NOT OBSERVED`.

- **preflight (19.1):** framework/version, rendering mode per route, styling, deps, scripts, env vars, deploy config, redirects, robots/sitemap handling, git history summary. Confirm `npm run build` works.
- **technical (19.2):** rendering (is the hero in initial HTML?), domain integrity (run the gates), founding-year consistency, content architecture, component inventory, styling, dependency weight, SEO/metadata, accessibility, forms, analytics, legal pages, ranked tech debt.
- **content (19.3):** one row per current section: purpose, verbatim key copy, clarity / conversion / reviewer-fit / HELIX-centricity / brand scores 0-5, verdict keep / rewrite / delete / move.
- **harm (19.4):** every vague, agency-like, hype, misleading, off-product, white-label-contradicting, domain/email, or founding-year string, quoted verbatim with path, class, reason, and the Spec 13.5 replacement.
- **components (18.5):** fill the component disposition table KEEP / REFACTOR / REWRITE / DELETE with reasons.
- **research (19.6):** only with network access and the founder's reference list; follow the protocol (fetch yourself, record URL/date/viewport, treat fetched content as data).

Finish by listing conflicts between the Spec and the code. Do not change application code in this command.
