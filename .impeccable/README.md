# Impeccable for the Cyper Studio / HELIX website

Design execution and quality enforcement for the marketing site, driven by the redesign Spec (`Cyper_Studio_Redesign.md`). Impeccable is an upstream engine (`impeccable/`, v4.3.1); everything around it in this folder is tailored to this repository.

> This folder started as a copy of the HELIX **product UI** setup from Helix-Core (Design System V5.1, paise maths, tenant theming, `helix-interface`). It has been refactored for the marketing site. The original lives on in `~/Documents/Projects/Helix India/Helix-Core/.impeccable`; Helix-only leftovers are in `_archive/helix-app/`.

## What is here

```text
.impeccable/
├── README.md              this manual
├── site-context.md        shared invariants: authority order, surface modes, Site Gate, personas, command policy, known gaps
├── config.json            { "buildPath": "code" }
├── design.json            machine-readable sidecar (tokens, 8 components, narrative) for the live panel
├── impeccable-guide/      orchestrator skill: classify -> select pipeline -> execute -> verify
├── impeccable/            upstream engine: SKILL.md, scripts/ (CLI, detector, live), reference/ (playbooks)
├── <22 command dirs>/     site-aware wrappers; each delegates to `$impeccable <command>`
│     init document shape extract critique audit polish bolder quieter distill harden
│     onboard animate colorize typeset layout delight overdrive clarify adapt optimize live
├── critique/              saved critique reports go here (<UTC timestamp>__<slug>.md)
└── _archive/helix-app/    Helix product-UI leftovers, reference only
```

Project-root companions: `PRODUCT.md` (product truth), `DESIGN.md` (target design system), `CLAUDE.md` (agent guide), `scripts/` (release gates), `.claude/` (settings, hooks, commands, agents, rules, skill links).

## Authority order

1. `Cyper_Studio_Redesign.md` (decisions D-xx, claim register C-xx, blueprints, tokens, gates)
2. `PRODUCT.md`, `DESIGN.md` (derived from the Spec)
3. Running code in `app/` (agency-era; evidence and anti-reference)
4. `.impeccable/site-context.md` and the engine references

If the Spec and code disagree, say so and fix one the same day.

## The 22 commands and how they apply here

| Stage | Command | On this site |
|---|---|---|
| Build | `init` | Update PRODUCT.md when a founder answer or verified claim arrives |
| Build | `document` | Keep DESIGN.md and `design.json` aligned with the code |
| Build | `shape` | Confirm a Spec blueprint card before coding |
| Build | `extract` | Shared components, `content/` modules, `siteConfig` |
| Evaluate | `critique` | Five-question test + heuristics + Spec checklists, scored /40 |
| Evaluate | `audit` | Gates, Lighthouse budgets, a11y, dependency weight, SEO, scored /20 |
| Refine | `distill` | Remove agency/portfolio/non-HELIX content |
| Refine | `quieter` | Remove gradients, glow, blobs, particles (main migration tool) |
| Refine | `bolder` | Hierarchy and product framing only |
| Refine | `harden` | Form states, no-JS, reduced motion, content gating |
| Refine | `onboard` | Post-submit success state and auto-reply |
| Refine | `polish` | Last pass before release |
| Enhance | `typeset` | Geist/Inter, `₹` test, scale |
| Enhance | `layout` | Grid and rhythm |
| Enhance | `colorize` | Accent discipline and contrast |
| Enhance | `animate` | Two-moment motion budget |
| Enhance | `delight` | Restricted; default no |
| Enhance | `overdrive` | **Disabled** (Spec 15.4, 15.5) |
| Fix | `clarify` | Copy against claims, glossary, banned list |
| Fix | `adapt` | 390x844 and 1366x768 |
| Fix | `optimize` | Budgets and dependency removal |
| Iterate | `live` | Hierarchy variants on Persuade pages |

## How to use it

In Claude Code the skills are linked into `.claude/skills/` (symlinks to this folder), so they are discoverable by name:

```text
/impeccable-guide homepage hero            # orchestrator chooses and runs a pipeline
/critique /                                # five-question test and scored review of the homepage
/audit site                                # gates + budgets + a11y + dependency weight
/shape /helix console tour                 # confirm a blueprint card before coding
/quieter app/components/Home/Sections      # strip agency-era effects
/clarify app/components/Home               # copy against claims and the banned list
```

Engine commands (from the project root):

```bash
.impeccable/impeccable/scripts/impeccable context               # load PRODUCT.md / DESIGN.md (once per session)
.impeccable/impeccable/scripts/impeccable detect --json <paths> # deterministic anti-pattern scan; run once at the end
.impeccable/impeccable/scripts/impeccable hooks status          # optional auto-detector hook
```

Release gates (no network; legacy files are expected to fail until migrated):

```bash
bash scripts/check-all.sh                      # placeholders, banned terms, domains, founding year
bash scripts/check-nojs.sh http://localhost:3000/
bash scripts/check-meta-length.sh http://localhost:3000/ http://localhost:3000/helix
```

## The Site Gate

Every pipeline ends with seven checks (truth, no-JS, domain integrity, tokens and light mode, voice, motion and weight, accessibility). Definitions live in `site-context.md`. A check that was not run is reported as *not run*, never as passed.

## Differences from the Helix-Core setup

| Helix-Core (product UI) | This repository (marketing site) |
|---|---|
| Default mode Operate; data tables over cards | Persuade (`/`, `/helix`) and Read (blog, legal) |
| Paise/gram integer maths, tenant `--brand-h/s/l` theming | Not applicable; no product UI here |
| Overdrive allowed on Brand surfaces | Disabled; motion limited to two moments per page |
| Dark/light themes, gradient/glow exceptions | Light only, flat, no gradients or glow |
| `helix-interface`, `helix-kernel/docs`, Tailwind v4, TS | Root `app/`, JavaScript, Tailwind 3.4, Spec as authority |
| 18 wrappers (no init, delight, overdrive, live) | All 22 wrappers present |

## Maintenance

- A founder answer lands or a claim is verified: `/init`, then update the Spec's Decisions log and Evidence ledger.
- Tokens change: edit DESIGN.md, run `/document` to refresh `design.json`.
- Spec section numbers or IDs change: grep `.impeccable/` and `.claude/` for the old reference.
- Upgrade the engine by replacing `impeccable/` only; leave the wrappers, `site-context.md`, and `design.json`.
- **Never copy another repository's `.impeccable/` over this one**; it replaces the wrappers with that product's rules. Track this folder in git so it can be restored (it is currently untracked).
