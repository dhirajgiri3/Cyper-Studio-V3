---
name: impeccable-guide
description: >
  Comprehensive usage guide and decision engine for the Impeccable design skill
  system within HELIX by Cyper Studio. Explains all 22 design commands (polish,
  audit, critique, shape, animate, colorize, typeset, layout, harden, adapt,
  clarify, optimize, onboard, bolder, quieter, distill, delight, overdrive,
  document, extract, live, init), when to use each, standard multi-step workflows,
  sequencing rules, and Design System V5.1 compliance. Use when starting a design
  task, selecting the right command, or understanding how design tools interact.
metadata:
  argument-hint: "[optional: workflow, target surface, or design question]"
  domain: Design System / AI Design Execution
  dependencies:
    - helix-kernel/docs/8_DESIGN/Design_System.md
    - helix-kernel/docs/8_DESIGN/DESIGN.md
    - helix-kernel/docs/8_DESIGN/PRODUCT.md
    - .impeccable/design.json
    - AGENTS.md
  related_skills:
    - init
    - document
    - critique
    - audit
    - shape
    - polish
    - harden
---

# Impeccable Design System — Helix Usage Guide & Skill Manual
### HELIX Logistics Operating System · Cyper Studio · Design System V5.1
**Location:** `.impeccable/` · **Target Repository:** `helix-interface` (Next.js 16 App Router / React 19 / Tailwind CSS v4)

---

## 1. Executive Summary & Design System V5.1 Doctrine

**Impeccable** is the production design execution, evaluation, and quality-enforcement engine for **HELIX by Cyper Studio** (`cyperstudio.in`). It is invoked directly during AI pairing sessions to guarantee commercial-grade craft, visual quietness, and operational ergonomics while eliminating generic "AI slop" or decorative excess.

### The Core Design Thesis (Design System V5.1)
From [`helix-kernel/docs/8_DESIGN/Design_System.md §0`](file:///Users/dhirajgiri/Documents/Projects/Helix%20India/Helix-Core/helix-kernel/docs/8_DESIGN/Design_System.md):

> **"Make a complex logistics platform feel remarkably simple, fast, understandable, and refined."**  
> **"Make Helix feel obvious."**  
> **"Organize complexity. Do not merely remove it."**  
> **"Familiar interactions. Distinctive execution."**  
> **"Clarity · Intuition · Restraint · Hierarchy · Distinctiveness · Efficiency · Trust."**

In enterprise logistics SaaS, UI is an operational tool, not an art gallery. Every millisecond of friction delays dock dispatch, and every ambiguous financial label risks merchant trust during COD reconciliation.

---

## 2. Quick Reference — All 22 Commands by Lifecycle Stage

Every command below corresponds to a contextual Helix skill located in `.impeccable/<command>/SKILL.md`.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   IMPECCABLE COMMAND MATRIX                                      │
├─────────────────┬──────────────────┬─────────────────┬──────────────────┬───────────────┬────────┤
│ I. BUILD        │ II. EVALUATE     │ III. REFINE     │ IV. ENHANCE      │ V. FIX        │ VI.    │
├─────────────────┼──────────────────┼─────────────────┼──────────────────┼───────────────┼────────┤
│ /init           │ /critique [path] │ /polish [path]  │ /animate [path]  │ /clarify [p]  │ /live  │
│ /document       │ /audit [path]    │ /bolder [path]  │ /colorize [path] │ /adapt [path] │        │
│ /shape [name]   │                  │ /quieter [path] │ /typeset [path]  │ /optimize [p] │        │
│ /extract [targ] │                  │ /distill [path] │ /layout [path]   │               │        │
│                 │                  │ /harden [path]  │ /delight [path]  │               │        │
│                 │                  │ /onboard [path] │ /overdrive [path]│               │        │
└─────────────────┴──────────────────┴─────────────────┴──────────────────┴───────────────┴────────┘
```

### I. BUILD (Groundwork & Architecture)
*Use when creating new features, capturing foundations, or standardizing components.*

| Command | Syntax / Target | When to Use | Deliverable / Output |
|---|---|---|---|
| **`/init`** | `/init` | Project bootstrap or stale product truth. | Writes/refreshes `helix-kernel/docs/8_DESIGN/PRODUCT.md`. |
| **`/document`** | `/document` | When CSS tokens or components change. | Extracts tokens → `DESIGN.md` & `.impeccable/design.json`. |
| **`/shape`** | `/shape [feature]` | **Mandatory** before implementing any new UI. | Structured interview → confirmed Design Brief. |
| **`/extract`** | `/extract [target]` | When repetitive UI markup is found. | Consolidates into `src/components/ui/` primitives. |

### II. EVALUATE (Diagnostics & Quality Measurement)
*Use before editing unfamiliar code to discover true root causes instead of guessing.*

| Command | Syntax / Target | When to Use | Deliverable / Output |
|---|---|---|---|
| **`/critique`** | `/critique [path]` | When UI feels off, crowded, or unrefined. | Dual-agent review (Nielsen + detector), score /40, P0–P3 roadmap. |
| **`/audit`** | `/audit [path]` | Technical compliance & accessibility check. | Deterministic scan (a11y WCAG 2.2 AA, perf, tokens), score /20. |

### III. REFINE (Production Hardening & Final Pass)
*Use to elevate working code into bulletproof, production-ready software.*

| Command | Syntax / Target | When to Use | Deliverable / Output |
|---|---|---|---|
| **`/harden`** | `/harden [path]` | **Before `/polish`** to handle all edge cases. | Adds missing states: loading skeleton, empty, error, permission. |
| **`/polish`** | `/polish [path]` | **Final step** before opening a PR or merging. | Calibrates micro-alignment, spacing, borders, token fidelity. |
| **`/distill`** | `/distill [path]` | When a screen is cluttered or overwhelming. | Removes redundant borders/boxes; preserves 100% functionality. |
| **`/bolder`** | `/bolder [path]` | When UI looks timid, bland, or generic. | Increases contrast, typographic authority, and spatial presence. |
| **`/quieter`** | `/quieter [path]` | When UI is visually noisy, aggressive, or chaotic.| Calms surfaces, softens borders, restores operational breathing room. |
| **`/onboard`** | `/onboard [path]` | First-run flows for new features or sellers. | Guided activation, contextual progressive disclosure, setup steps. |

### IV. ENHANCE (Interaction & Micro-Craft)
*Use to add purposeful depth, typography hierarchy, and motion.*

| Command | Syntax / Target | When to Use | Deliverable / Output |
|---|---|---|---|
| **`/animate`** | `/animate [path]` | When transitions feel jarring or lifeless. | Purposeful Framer Motion animations with `prefers-reduced-motion`. |
| **`/colorize`** | `/colorize [path]` | When interface is grey or statuses lack clarity. | Injects semantic V5 status tokens (blue, green, amber, red). |
| **`/typeset`** | `/typeset [path]` | When typography hierarchy is flat or untamed. | Tabular figures for money/metrics, monospace for AWBs/IDs. |
| **`/layout`** | `/layout [path]` | Misaligned grids, inconsistent padding/margins. | Aligns to 4px spacing rhythm, fixes table and form density. |
| **`/delight`** | `/delight [path]` | Successful milestone moments (e.g. bulk manifest).| Subtle, non-gratuitous micro-celebrations and haptic feedback. |
| **`/overdrive`** | `/overdrive [path]` | **Marketing/showcase surfaces only.** | Advanced 3D canvas/physics effects. **Forbidden on dispatch desks.** |

### V. FIX (Targeted Usability Remediation)
*Use to repair specific bugs, mobile breakage, or performance bottlenecks.*

| Command | Syntax / Target | When to Use | Deliverable / Output |
|---|---|---|---|
| **`/clarify`** | `/clarify [path]` | Ambiguous buttons, confusing error messages. | Explicit microcopy: states what happened, why, and how to fix it. |
| **`/adapt`** | `/adapt [path]` | Broken on mobile viewports (<768px). | Mobile card decks, responsive breakpoints, 44px touch targets. |
| **`/optimize`** | `/optimize [path]` | Sluggish tables, janky scrolling, re-renders. | Virtualization, TanStack Query cache tuning, memoization. |

### VI. ITERATE (Live Visual Sandboxing)
*Use for real-time visual comparison directly in the browser.*

| Command | Syntax / Target | When to Use | Deliverable / Output |
|---|---|---|---|
| **`/live`** | `/live` | Experimenting with visual variants live. | HMR hot-swap panel in running Next.js dev server (`helix-interface`). |

---

## 3. Decision Engine — Which Command to Use?

Follow this decision tree whenever planning design work:

```text
Is this NEW surface/feature (no code written yet)?
  │
  ├─► YES ────► Step 1: /shape [feature] ──► (Interview & Confirmed Brief)
  │             Step 2: Implement Small Slice via `add-frontend-feature`
  │             Step 3: /harden [path] ────► (Inject 7 mandatory UI states)
  │             Step 4: /polish [path] ────► (Final quality pass)
  │
  └─► NO (Existing code / feature)
        │
        ├─► Nature of the problem is UNCLEAR?
        │     └─► RUN: /critique [path] (Design-director review)
        │           └─► RUN: /audit [path] (Technical scan)
        │                 └─► Follow prioritized P0–P3 roadmap
        │
        └─► SPECIFIC SYMPTOM IDENTIFIED:
              ├─ "Page looks generic / timid / lacks presence"  ──► /bolder
              ├─ "Too noisy / visual clutter / boxes in boxes"  ──► /distill or /quieter
              ├─ "Grey / washed out / status colors unclear"     ──► /colorize
              ├─ "Typography hierarchy flat / IDs not mono"     ──► /typeset
              ├─ "Spacing inconsistent / misaligned grid"       ──► /layout
              ├─ "Error messages cryptic / confusing labels"    ──► /clarify
              ├─ "Table overflows / broken on mobile"           ──► /adapt
              ├─ "Missing loading / empty / error states"       ──► /harden
              ├─ "Table laggy / slow rendering / heavy bundle"  ──► /optimize
              ├─ "Static / jarring transitions"                 ──► /animate
              ├─ "New seller activation / empty queue"          ──► /onboard
              ├─ "Flagship landing page hero"                   ──► /overdrive (Marketing only!)
              └─ "Everything functionally done; ready to ship"  ──► /polish
```

---

## 4. Standard Helix Workflows — End-to-End Sequences

### 1. New Seller or Admin Page (Full Lifecycle)
```text
1. /shape [page name]         → Discovery interview, surface mode declared, locked brief
2. Code Implementation        → Consume primitives from `src/components/ui/`
3. /audit [new page]          → Catch WCAG 2.2 AA and token compliance early
4. /harden [new page]         → Ensure all 7 states (Loading/Empty/Error/Populated/etc.) exist
5. /polish [new page]         → Calibrate micro-alignment, spacing, and borders before PR
```

### 2. Existing Page Feels "Off" (Diagnosis-First)
```text
1. /critique [page path]      → Full design-director verdict + Nielsen 10 check (Score /40)
2. /audit [page path]         → Code-level scan confirms accessibility & performance (Score /20)
3. Execute Remediation        → Run indicated commands in priority order (P0 → P1 → P2)
4. /polish [page path]        → Final pass after all structural issues are resolved
```

### 3. High-Density Operational Table (Shipments, Consignments, Manifests)
```text
1. /distill [table page]      → Strip nested containers, excessive borders, and visual noise
2. /typeset [table page]      → Tabular numbers for weights/amounts; monospace for AWBs/LRs
3. /colorize [table page]     → Strict status tokens via `StatusBadge` (no raw color guessing)
4. /adapt [table page]        → Fluid mobile card fallback with 44px touch-friendly actions
5. /harden [table page]       → Skeletons matching exact row count + zero-result empty state
6. /polish [table page]       → Final pass on row heights (36px compact / 44px standard)
```

### 4. Financial Cockpit (Wallet, COD Remittance, Invoices, Billing)
```text
1. /critique [financial page] → Audit financial trust, hierarchy, and visibility of balance
2. /clarify [financial page]  → Ensure fees, deductions, and COD payouts explain amount + reason
3. /typeset [financial page]  → Strict tabular numerals (`font-variant-numeric: tabular-nums`)
4. /harden [financial page]   → Edge cases: zero balance, payment gateway drop, partial remittance
5. /polish [financial page]   → Final pass; ensure hero balance uses approved §4 WavyGlowCard
```

### 5. NDR / Exception Resolution Queue (Time-Critical Dispatch)
```text
1. /critique [NDR page]       → Warehouse dispatcher persona validation (fast scanning)
2. /clarify [NDR page]        → Explicit actions: "Reschedule Attempt" / "Return to Origin"
3. /harden [NDR page]         → All-clear celebration empty state + network recovery
4. /adapt [NDR page]          → Warehouse handheld scanner / mobile compatibility
5. /polish [NDR page]         → Final pass on persistent bottom action bar
```

### 6. First-Run Activation & Onboarding
```text
1. /shape [onboarding flow]   → Identify activation milestone and prerequisite sequence
2. /onboard [feature]         → Design progressive disclosure steps and clear aha moment
3. /clarify [copy]            → State what is unlocked at each step (e.g. "Unlocks full dispatch")
4. /harden [steps]            → Handle plan-gated features and permission-denied views
5. /polish [onboarding]       → Final visual pass on progress indicators and milestones
```

---

## 5. Design System V5.1 Authority & Documented Exceptions

All Impeccable commands operate under **Design System 5.1** authority ([`Design_System.md`](file:///Users/dhirajgiri/Documents/Projects/Helix%20India/Helix-Core/helix-kernel/docs/8_DESIGN/Design_System.md)).

### The Flat-by-Default Rule
Operational surfaces (`Operate` and `Read`) build visual hierarchy through **spacing, contrast, borders, and surface-shifts before elevation**. Decorative gradients, glassmorphism, floating cards, and heavy drop shadows are deprecated.

### §4 Documented Exceptions (The Bounded Carve-Out)
Per Design System 5.1 §4, exactly three patterns are approved exceptions to flat design on operational surfaces because they serve a documented functional purpose:

1. **Hero/Financial Summary Cards (`WavyGlowCard`)**:
   - **Functional Purpose:** Instant perceptual landmark. Signals "this is the single number that matters" (e.g. Wallet Balance, COD Remittance, Top-Line GMV, Onboarding Completion) against flat surrounding tables.
   - **Constraint:** Strictly bounded to single-metric hero cards. **Never** applied to repeated table rows, stat grids, or item cards.
2. **Primary CTA Buttons**:
   - **Functional Purpose:** Unambiguous dominant action affordance across all viewports. Uses a restrained gradient (`linear-gradient(180deg, var(--primary-blue-light) 0%, var(--action-primary) 48%, var(--primary-blue-deep) 100%)`), inset highlight, and subtle hover glow.
   - **Constraint:** Bounded strictly to `variant="primary"` buttons. Secondary, outline, ghost, and danger buttons remain completely flat.
3. **Card Elevation via `--shadow-card`**:
   - **Functional Purpose:** Prevents raised cards from reading as flat cutouts over tinted canvas backgrounds (`--surface-canvas`).
   - **Light Mode:** Barely-there diffused shadow (`0 1px 2px rgba(15, 23, 42, 0.03)`).
   - **Dark Mode:** Top inset highlight rather than an unnatural drop shadow.

---

## 6. The Sidecar Architecture: `DESIGN.md` & `.impeccable/design.json`

Impeccable utilizes a synchronized dual-file specification:

```text
helix-kernel/docs/8_DESIGN/DESIGN.md       .impeccable/design.json
┌──────────────────────────────────────┐   ┌──────────────────────────────────────┐
│ Frontmatter:                         │   │ Sidecar Payload (Schema v2):         │
│ • Canonical hex/hsl color tokens     │   │ • Extensions:                        │
│ • Typography scale & font stacks     │◄──┤   - 8-step tonal ramps per color     │
│ • Corner radii (rounded.*)           │   │   - Shadows (Level 0–2, shadow-card) │
│ • 4px base spacing scale             │   │   - Motion tokens & easing curves    │
│                                      │   │   - Breakpoint values                │
│ Prose Narrative:                     │   │ • Components (Live Shadow DOM):      │
│ • Creative North Star                │   │   - Buttons, Inputs, Chips, Cards    │
│ • The 6 Canonical Rules              │   │   - Operational Table, Hero Card     │
│ • Do's and Don'ts                    │   │ • Narrative:                         │
│                                      │   │   - Rules, Do's, Don'ts, North Star  │
└──────────────────────────────────────┘   └──────────────────────────────────────┘
```

### Why Both Files Exist:
1. **`DESIGN.md`**: Human-readable and machine-scannable markdown that provides immediate context to LLMs and agents in any environment.
2. **`.impeccable/design.json`**: Machine-readable JSON companion that powers the live browser panel (`live-browser.js`). It renders project-specific component snippets inside Shadow DOM containers and provides visual color swatches with tonal ramps.

### Verification of Sidecar Integrity
Whenever token primitives or core components are updated:
- Run `npm run verify:design-system` in `helix-interface` to ensure zero policy drift.
- Verify that every color in `DESIGN.md` frontmatter has a corresponding entry in `design.json` `extensions.colorMeta`.

---

## 7. Constitutional Invariants Every Command Must Enforce

From [`AGENTS.md`](file:///Users/dhirajgiri/Documents/Projects/Helix%20India/Helix-Core/AGENTS.md) and [`HELIX_SECURITY_INVARIANTS.md`](file:///Users/dhirajgiri/Documents/Projects/Helix%20India/Helix-Core/helix-kernel/docs/1_CORE/HELIX_SECURITY_INVARIANTS.md):

1. **System Identities Are Never Merged**:
   - Platform Operator (`CyperTeamMember`): `/api/operator/v1/*`
   - Tenant Admin (`User`, `companyId: null`): `/api/v1/*`
   - Company User (`Membership`, `companyId` set): `/api/v1/*`
   - *Design implication:* UI controls meant for operators must never appear on seller screens.
2. **Data-Format Strictness (No Floats)**:
   - Money is strictly positive integer **paise**; weight is strictly positive integer **grams**.
   - *Design implication:* Display formatters handle currency (`₹`) and decimals; UI code must never perform float arithmetic.
3. **White-Label Theming Isolation**:
   - Tenant branding dynamically updates `--brand-h`, `--brand-s`, `--brand-l` at runtime.
   - *Design implication:* Never hard-code `#2525FF` or specific hex blues in feature components; consume `var(--action-primary)` or `var(--brand-primary)`.
4. **Functional Safety Boundary**:
   - Design commands refine visual presentation, typography, spacing, and accessibility.
   - *Design implication:* Never alter API route logic, mutation contracts, authorization checks, or business calculations during design passes.
5. **Zero Unhandled States**:
   - Every interactive view must account for: Loading, Empty, Populated, Error, Partial, Filter-Empty, and Permission-Denied.

---

## 8. Command Sequencing & Anti-Pattern Firewall

### Required Command Order:
- **Always evaluate before fixing:** Run `/critique` or `/audit` when the problem is unclear.
- **`/shape` blocks implementation:** Never code a new surface without a completed `/shape` brief.
- **`/harden` before `/polish`:** Missing empty/error states cannot be polished; they must be implemented first.
- **`/polish` is always last:** It is a final-pass polishing tool, not a foundational builder.

### Anti-Patterns to Refuse:
| Anti-Pattern | Description | Correct Helix Rule |
|---|---|---|
| **Overdrive on Dispatch** | Adding 3D cards, particle effects, or parallax scrolling to warehouse queues. | Restrict `/overdrive` strictly to marketing/landing pages. Dispatch queues must remain flat, dense, and calm. |
| **Decorative Minimalism** | Deleting pagination, column headers, or filter chips to make a page look "clean". | Organize complexity; never delete required logistics controls. |
| **Status-as-Brand** | Coloring status badges with tenant brand blue. | Statuses have fixed semantics: Success (green), Warning (amber), Danger (red), Info (blue), Neutral (gray). Brand is not a status. |
| **Raw Backend Enums** | Displaying `OUT_FOR_DELIVERY` or `MANIFEST_GENERATED` directly. | Map all enums through `StatusBadge` or domain presentation registries. |
| **Missing Focus Visibility** | Removing CSS `:focus-visible` outlines with `outline: none`. | Every interactive control must have a visible 2px semantic focus ring with 2px offset. |

---

## 9. Troubleshooting & Diagnostics

- **"Commands run generic checks instead of Helix-specific ones"**:
  Ensure `helix-kernel/docs/8_DESIGN/PRODUCT.md` exists and run `/init` if it is outdated.
- **"Token warnings or policy failures during build"**:
  Run `npm run verify:design-system` in `helix-interface` to locate unauthorized CSS classes or deprecated token names.
- **"Live panel indicates DESIGN.md is newer than design.json"**:
  Run `/document` to synchronize the `.impeccable/design.json` sidecar.
- **"How to test mobile behavior without a physical phone"**:
  Run `/adapt [path]` to inspect breakpoint configurations, table card-mode triggers, and minimum 44px touch targets.
