---
name: audit
description: >
  Runs technical quality checks on the Cyper Studio website: the Spec's binary gates (placeholders, banned terms, domain integrity, founding year, no-JS render, meta length), WCAG 2.2 AA, performance budgets, dependency weight, SEO and structured data, and design-token drift. Produces a scored P0-P3 report. Use before any release, after dependency changes, or on request.
metadata:
  argument-hint: "[area: route, directory, or 'site']"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - critique
    - polish
    - optimize
---

<!-- impeccable-pinned-skill -->

This is a site-aware `audit` skill that delegates to `$impeccable audit`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Audit Context

**Run the mechanical gates first and report them as P0/P1 before any component-level review:**
```bash
bash scripts/check-all.sh            # placeholders, banned terms, domains, founding year
bash scripts/check-nojs.sh <url>     # against a running build/preview; needs h1, white-label, logistics, Cyper Studio, 2024, info@, HELIX
.impeccable/impeccable/scripts/impeccable detect --json <targets>
```

**Audit dimensions (from Spec 16, 17, 18.10, 21):**
- **Gates:** `{{CONFIRM` / `{{DECISION` in output; banned terms; non-canonical hostname, subdomain, staging host, email; founding year not 2024.
- **Rendering:** is hero text in the initial HTML? Client-only primary content is **P0**. Check `curl`, not just the browser.
- **Performance (Lighthouse mobile, throttled 4G, mid-range Android):** LCP <= 2.5s, INP <= 200ms, CLS <= 0.1, perf >= 90 (target 95), a11y/BP/SEO >= 95. Budgets: HTML <= 40KB, JS <= 90KB gz, CSS <= 30KB gz, fonts <= 100KB, hero image <= 120KB, <= 25 requests above the fold, 0 third-party scripts except deferred privacy-friendly analytics.
- **Dependency weight:** `gsap`, `three`, `@react-three/*`, `matter-js`, `poly-decomp`, `tsparticles-slim`, `react-particles`, `react-confetti`, `framer-motion`, `react-icons`, `lodash`, `react-use`, `styled-components`. Report which are imported above the fold or site-wide (P1) and measured KB.
- **SEO and AI search:** one h1; unique titles <= 60 and descriptions <= 160; canonical on the canonical domain only; `lang="en-IN"`; Organization / WebSite / SoftwareApplication JSON-LD whose every value appears on the page; `robots.ts`, `sitemap.ts`, `llms.txt`; real 404 status; single-hop redirects.
- **Accessibility (WCAG 2.2 AA):** contrast per token pair (record results), 2px focus ring never removed, focus not obscured by the sticky header, 44px targets, skip link, landmarks, form labels + `autocomplete`, diagram `<title>`/`<desc>`, `prefers-reduced-motion`.
- **Token drift:** raw hex/rgb/px in components; legacy tokens (`--accent-gradient`, `pulse-glow`, blobs); dark-mode hooks; `themeColor` dark entry.
- **Content hygiene:** unconfirmed claims; names, logos, metrics without evidence tags.

Score out of 20 per the engine's audit reference; every finding gets a severity, a file path, and a recommended command.

## Delegation

Invoke `$impeccable audit` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
