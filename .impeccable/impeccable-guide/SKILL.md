---
name: impeccable-guide
description: >
  Autonomous design orchestrator for the Cyper Studio / HELIX marketing website.
  Inspects the target page or component, classifies its surface mode, selects the
  shortest pipeline from the 22 Impeccable commands, declares it, executes it, and
  verifies the result against the Site Gate (truth, no-JS, domain integrity, tokens,
  voice, motion budget, accessibility). Use whenever starting or refining any UI,
  copy, or layout work in this repository, or when unsure which command to run.
metadata:
  argument-hint: "[optional: target route/file, intent, or design question]"
  domain: Website / Design System / Orchestration
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
    - .impeccable/design.json
    - CLAUDE.md
  related_skills:
    - impeccable
    - shape
    - critique
    - audit
    - polish
    - harden
    - clarify
    - distill
    - layout
    - typeset
    - quieter
    - optimize
---

# Impeccable Orchestrator: Cyper Studio / HELIX Website

**Repository:** Next.js 15 App Router, JavaScript, Tailwind 3.4, styled-components, root `app/`.
**Spec:** `Cyper_Studio_Redesign.md`. **Constraints and policy:** `.impeccable/site-context.md`.

This is a **marketing site**, not the HELIX product UI. Ignore anything about wallets, paise, tenant theming, dispatch tables, or `helix-interface`; that belongs to the Helix-Core repository.

## 0. When to use

Use for any change to `app/`, `content/`, `public/`, `tailwind.config.mjs`, or copy on this site. Do not use for backend-only work (form endpoint internals, email infrastructure, DNS) except to design its user-visible states.

## 1. The loop

```text
1. CLASSIFY  -> target file(s); surface mode (Persuade | Read); which Spec blueprint section it maps to
2. SELECT    -> the shortest pipeline (2-4 commands); declare it before writing code
3. EXECUTE   -> load each command's .impeccable/<cmd>/SKILL.md only when it is in the pipeline
4. VERIFY    -> Site Gate (section 4); name what ran and what did not
```

Fewest commands that fully satisfy the goal. Running six commands when two suffice is a defect.

## 2. Surface modes

| Mode | Routes | Rules |
|---|---|---|
| **Persuade** | `/`, `/helix`, `/contact`, `/about` | One primary CTA style per viewport; the product screenshot is the visual; two diagrams; no decoration; max two motion moments |
| **Read** | `/changelog`, `/blog`, `/privacy`, `/terms`, 404 | Structure for comprehension; dated entries; no motion; 65ch; question-shaped headings where natural |
| ~~Operate~~ | none | No task-completion UI exists on this site |
| ~~Experience~~ | none | No portfolio or showcase; client/portfolio work leaves `/` (D-09) |

## 3. Pipeline dispatch

State the chosen pipeline before coding. When the intent is ambiguous, read the target, classify it, and default to `critique -> distill -> polish`.

| Intent | Pipeline | Focus |
|---|---|---|
| Build a new page or section | `shape -> [code] -> harden -> polish` | Blueprint, claims, states |
| "Make this better / cleaner" | `critique -> distill -> layout -> polish` | Hierarchy and focus |
| Migrate a legacy agency section | `critique -> quieter -> distill -> clarify -> polish` | Remove noise, fix voice |
| Rewrite copy | `clarify -> polish` | Claims, glossary, banned list |
| Hero / above-the-fold | `shape -> typeset -> layout -> adapt -> polish` | Five-question test |
| Contact / demo form | `shape -> harden -> clarify -> onboard -> polish` | Never fail silently, no-JS POST |
| Diagrams | `shape -> [inline SVG] -> adapt -> polish` | Mechanism, text alternative |
| Type / tokens / rupee glyph | `document -> typeset -> colorize -> audit` | Appendix B, contrast, D-05 |
| Mobile problems | `adapt -> layout -> polish` | 390x844 |
| Slow page / heavy dependency | `optimize -> harden -> audit` | Budgets, measured deltas |
| Needs more presence | `bolder -> layout -> polish` | Type scale and product framing only |
| Wants motion | `animate -> optimize -> polish` | Two-moment budget |
| WebGL / particles / "wow" | **stop**: `overdrive` is disabled; route to `bolder` or `animate` | Spec 15.4, 15.5 |
| Pre-release | `audit -> polish` | Gates, Lighthouse |
| Brand / token change landed | `init -> document -> extract` | Keep PRODUCT/DESIGN/sidecar in sync |
| Compare layout options | `live` | Hierarchy variants only |

Phase mapping to the Spec roadmap (Section 20): Emergency pass = `critique -> distill -> clarify -> audit` on `/`; Relaunch = `shape -> typeset -> layout -> harden -> polish` per section; Full revamp adds `optimize`, `animate` (budgeted), `audit`.

## 4. Execution protocol

**Declare:**
```text
[Impeccable] Surface: <Persuade|Read> · Target: <file/route> · Blueprint: <Spec section>
Pipeline: <cmd> -> <cmd> -> <cmd> — <one-sentence rationale>
```

**Execute** each command per its SKILL.md. Do not speculatively read skills that are not in the pipeline. Load `impeccable/reference/craft-floor.md` immediately before any UI edit (engine rule).

**Site Gate (never skip; report each as pass / fail / not run):**

- [ ] **Truth:** every factual sentence maps to a claim ID and its allowed wording; no `[BRIEF-ONLY]` claim rendered; no invented number, customer, logo, quote, certification, pricing.
- [ ] **No-JS:** h1, subhead, trust line, primary CTA, entity line, `info@` in server HTML; content never waits on hydration or animation classes.
- [ ] **Domain integrity:** hostnames/emails/year only from `siteConfig`; no subdomain, localhost, vercel.app, non-canonical email; founding year 2024.
- [ ] **Tokens and light mode:** no raw hex/rgb/px in components; no dark-mode, gradient, glow, glass.
- [ ] **Voice:** no banned term, no metaphor headline, Capability -> Outcome, acronyms defined once, **HELIX** casing.
- [ ] **Motion and weight:** <= 2 motion moments, `transform`/`opacity` only, reduced-motion safe, no scroll hijacking, no new dependency without measured KB, budgets met.
- [ ] **Accessibility:** one h1, landmarks, 2px focus ring, 44px targets, descriptive alt, diagram `<title>`/`<desc>`, contrast per pair.

Mechanical help: `bash scripts/check-all.sh` (static gates), `bash scripts/check-nojs.sh <url>`, `bash scripts/check-meta-length.sh <url...>`, and once at the end `.impeccable/impeccable/scripts/impeccable detect --json <changed files>`.

## 5. Command quick reference

| Stage | Command | Use on this site |
|---|---|---|
| Build | `init` | Update PRODUCT.md when a founder answer or verified claim arrives |
| Build | `document` | Keep DESIGN.md + design.json aligned with the code |
| Build | `shape` | Confirm a blueprint card before coding a section |
| Build | `extract` | Components to `app/components/ui`, copy to `content/`, `siteConfig` |
| Evaluate | `critique` | Five-question test, heuristics, checklists A-D/G/H, personas |
| Evaluate | `audit` | Static gates, Lighthouse budgets, a11y, dependency weight, SEO |
| Refine | `distill` | Remove agency/portfolio/non-HELIX blocks; one idea per section |
| Refine | `quieter` | Remove gradients/glow/blobs/particles; default migration tool |
| Refine | `bolder` | Hierarchy, scale, product framing only |
| Refine | `harden` | Form states, no-JS, reduced motion, gating, 404 |
| Refine | `onboard` | Post-submit success state and auto-reply |
| Refine | `polish` | Last pass before release |
| Enhance | `typeset` | Geist/Inter, `₹` test, scale, mono data |
| Enhance | `layout` | Grid, rhythm, hero and strip layouts |
| Enhance | `colorize` | Accent discipline, contrast validation |
| Enhance | `animate` | Two-moment motion budget |
| Enhance | `delight` | Restricted; default no |
| Enhance | `overdrive` | **Disabled** |
| Fix | `clarify` | Copy: claims, glossary, banned list, errors |
| Fix | `adapt` | 390x844 / 1366x768, sticky CTA, stacked diagrams |
| Fix | `optimize` | Budgets, dependency removal, measured deltas |
| Iterate | `live` | Hierarchy/composition variants on Persuade pages |

## 6. Completion summary

```markdown
### Impeccable Orchestration Complete

**Surface:** Persuade | Read · **Target:** `path` · **Blueprint:** Spec §X
**Pipeline:** `cmd -> cmd -> cmd`

#### Transformations
1. **cmd:** what changed and why
2. ...

#### Site Gate
- Truth: pass | fail | not run
- No-JS: ...
- Domain integrity: ...
- Tokens / light mode: ...
- Voice: ...
- Motion / weight: ...
- Accessibility: ...

#### Open items
Claims still unconfirmed (IDs), founder questions blocking (Q-xx), removed dependencies to follow up.
```

Be explicit about what was **not** verified (for example Lighthouse not run, no real Android device). Do not report a gate as passed without running it.
