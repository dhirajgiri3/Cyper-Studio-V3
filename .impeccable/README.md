# Impeccable — Cyper Studio

Design skill system for the Cyper Studio website. Engine: Impeccable 4.4.0 (detector 0.1.5).

## Where things live

| Path | What | Git |
|---|---|---|
| `.claude/skills/impeccable/` | Engine: `SKILL.md`, `reference/*.md` playbooks, `scripts/impeccable` launcher | shared |
| `.claude/skills/<command>/SKILL.md` | 22 pinned shortcuts (`/polish`, `/critique`, ...), each with a Cyper Studio note | shared |
| `PRODUCT.md` (repo root) | Product truth — written by `/init` | shared |
| `DESIGN.md` (repo root) | Visual system — written by `/document` | shared |
| `.impeccable/design.json` | Machine-readable sidecar to `DESIGN.md` (ramps, motion, components) | shared |
| `.impeccable/config.json` | `buildPath` + design hook settings, detector ignores | shared |
| `.impeccable/config.local.json` | Per-developer overrides, hook consent | ignored |
| `.impeccable/hook.cache.json`, `live/`, `review/`, `mocks/`, `build/`, `shots/` | Session state and generated captures | ignored |
| `.claude/settings.local.json` | Design hook (PostToolUse + Stop), installed by `impeccable hooks on` | ignored |

Shared design rules for this site are in the **Design work** section of `/CLAUDE.md`.

## Commands

| Stage | Commands |
|---|---|
| Build | `/init` (PRODUCT.md) · `/document` (DESIGN.md + sidecar) · `/shape [feature]` · `/extract [target]` |
| Evaluate | `/critique [target]` · `/audit [target]` |
| Refine | `/harden` → `/polish` (always last) · `/bolder` · `/quieter` · `/distill` · `/onboard` |
| Enhance | `/animate` · `/colorize` · `/typeset` · `/layout` · `/delight` · `/overdrive` |
| Fix | `/clarify` · `/adapt` · `/optimize` |
| Iterate | `/live` (needs `npm run dev`) · `/impeccable generate [n] [action] [element]` |
| Engine | `/impeccable` (menu) · `/impeccable doctor` · `/impeccable hooks <on\|off\|status>` · `/impeccable pin <pin\|unpin> <cmd>` |

Typical loop: unsure what's wrong → `/critique` then `/audit`; known symptom → the matching command; before merge → `/harden`, `/polish`, then `impeccable detect` on the changed files.

## Maintenance

- **Setup on a new machine:** `.claude/skills/impeccable/scripts/impeccable hooks on` (installs the hook locally; the engine binary downloads to `~/.impeccable` on first run).
- **Upgrade the engine:** `npx impeccable update`, then re-check that launcher paths in `reference/` still point at `.claude/skills/impeccable/scripts/` and that the Cyper notes in the pinned skills survived (`grep -L "Cyper Studio" .claude/skills/*/SKILL.md`).
- **Add a shortcut:** `impeccable pin pin <command>`, then add a one-line `**Cyper Studio:**` note above its `Invoke` line.
