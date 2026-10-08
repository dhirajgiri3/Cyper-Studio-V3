<!-- Moved from .agents/skills/polish-ux-ui/SKILL.md on 2026-10-02 (skill consolidation). Content unchanged except the skill name. -->

> Loaded by `.impeccable/polish/SKILL.md` for Helix product surfaces. Supporting detail lives in `reference/helix-polish/` (process and verification, interaction and hierarchy, loading and risk states, page patterns and copy, platform and tokens, design-system compliance, hand-off template).

# Polish UX & UI — Helix Design System V5 Execution Skill

## 1. Outcome

Transform an already functional Helix interface into a:

* clear;
* intuitive;
* highly usable;
* operationally efficient;
* accessible;
* visually refined;
* distinctive;
* responsive;
* trustworthy;
* Design System V5-compliant

product experience.

The goal is not to make the screen look more “designed”.

The goal is:

> Make the interface feel obvious, calm, fast, trustworthy, and unusually refined.

This skill is responsible for **execution and refinement**.

It must not become speculative product design.

---

# 2. Relationship With `ux-audit`

These skills have intentionally separate responsibilities.

## `ux-audit`

Determines:

* what is wrong;
* who is affected;
* why it matters;
* supporting evidence;
* severity;
* confidence;
* recommended target behavior.

## `polish` (this reference)

Implements or specifies:

* the justified correction;
* improved hierarchy;
* better interaction structure;
* correct states;
* visual refinement;
* responsive adaptation;
* accessibility;
* V5 compliance.

When a UX audit exists, use it as primary diagnosis input.

Do not independently reinterpret a verified audit finding unless implementation
evidence disproves the assumption.

---

# 3. When to Use

Use when an existing surface:

* is functionally implemented but visually weak;
* feels generic or AI-generated;
* has poor hierarchy;
* is unnecessarily noisy;
* hides important actions;
* has excessive cards, badges, borders, gradients, or whitespace;
* has weak information architecture;
* is difficult to scan;
* has confusing state feedback;
* has inconsistent loading/error/empty/success behavior;
* is inefficient for repeated operational use;
* has poor mobile/tablet/desktop adaptation;
* violates accessibility requirements;
* duplicates components;
* diverges from Design System V5;
* exposes engineering terminology rather than user language;
* handles financial or provider state unclearly;
* feels inconsistent with adjacent Helix surfaces.

---

# 4. When NOT to Use

Do not use this skill to silently:

* add net-new product functionality;
* invent an endpoint;
* invent backend state;
* invent analytics;
* create a new workflow not supported by the codebase;
* change business rules;
* change permission rules;
* change financial calculation logic;
* merge B2C/B2B/International workflows;
* refactor unrelated frontend architecture;
* replace functioning features simply because another pattern looks prettier.

For net-new functionality, use the appropriate feature implementation process.

For diagnosis only, use `ux-audit`.

---

# 5. Canonical Authority

Before execution, inspect the current authoritative:

```text
helix-kernel/docs/8_DESIGN/Design_System.md
```

The current Design System V5 is the primary UX/UI authority.

Also inspect the actual:

```text
helix-interface/app/globals.css
helix-interface/src/components/ui/
```

Do not assume the documentation perfectly reflects current code.

When documentation and implementation differ:

1. identify the mismatch;
2. determine the actual current behavior;
3. preserve valid functionality;
4. align toward V5;
5. do not silently create parallel primitives.

---

# 6. Core V5 Doctrine

Every polished surface must obey:

### Clarity over decoration.

### Intuition over novelty.

### Recognition over recall.

### Hierarchy over uniformity.

### Organization over hiding complexity.

### Restraint over visual noise.

### Discoverability over screenshot cleanliness.

### Efficiency over ceremony.

### Minimum steps to goal completion.

> Every feature must reach its successful outcome in the minimum number of logically necessary steps. A step is logically necessary only when it requires genuine user judgment, captures information the system cannot infer, or satisfies a non-negotiable safety or business constraint. Steps that exist purely to structure the UI are ceremony — eliminate them. This is not about fewest clicks. It is about the shortest path that is still complete, correct, and safe.

### Trust over animation.

### Accessibility by default.

### Distinctive execution over generic SaaS styling.

### Real functionality over imagined functionality.

---

# 7. Absolute Safety Rule — Do Not Degrade Functionality

Polishing must never remove or alter supported behavior unless explicitly
authorized.

Before modifying a page, identify:

```text
Current actions
Current permissions
Current filters
Current states
Current API interactions
Current error paths
Current bulk actions
Current responsive behavior
Current feature gates
Current navigation
```

After implementation, verify they remain available.

A visually cleaner page that loses functionality is a failed polish.

---

# 8. Evidence-First Execution

Never redesign from screenshots or appearance alone when source is available.

Inspect enough implementation to understand:

```text
Page
→ components
→ state
→ hooks/API
→ permissions
→ feature flags
→ business states
→ async behavior
```

Do not rewrite the business flow based on visual assumptions.

---

# 9. Mandatory Pre-Polish Brief

Before editing, write a compact internal brief:

```text
Target:
Route/component:
Persona:
Job to be done:
Current primary action:
Frequent secondary actions:
Critical information:
Risky actions:
Current states:
Permission/capability constraints:
Responsive contexts:
Existing shared components:
Known UX findings:
V5 violations:
Do-not-change behavior:
```

This prevents styling before understanding.

---

# 10. Required Execution Sequence

Use this order.

```text
1. Understand
2. Preserve
3. Simplify
4. Prioritize
5. Structure
6. Correct interactions
7. Correct states
8. Apply visual system
9. Improve responsive behavior
10. Accessibility pass
11. Performance pass
12. Anti-slop pass
13. Regression verification
14. Final design pass
```

Do not begin with gradients, spacing, fonts, cards, or animation.

---

# 11. Step 1 — Understand the User Task

Ask:

* What is the user trying to accomplish?
* What information is required?
* What decisions are required?
* What action completes the task?
* What state confirms success?
* What commonly goes wrong?
* What does an experienced user repeat frequently?
* **How many steps does reaching success currently require — and how many are logically necessary?**

The UI should be designed around that task.

Not around the component tree.

## Minimum Steps Audit (required before polish begins)

Before applying any visual refinement, map the current path to task completion:

```text
For every step in the current flow, classify:
  [REQUIRED]   — genuine user judgment, unique information, safety/compliance gate
  [INFERRED]   — system can default, remember, or derive without user input
  [CEREMONY]   — intermediate screen, redundant confirmation, or navigation step
                 that adds no information and prevents no error
```

For each [CEREMONY] step identified, the polish pass must evaluate one or more of:

* **Smart default** — pre-select the most contextually appropriate value.
* **Auto-population** — fill from prior session, account data, or API context.
* **Persistence** — remember the user's last selection across sessions.
* **Inline action** — surface the action where the user is, removing a modal or redirect.
* **Conditional skip** — omit the step entirely when the system already knows the answer.
* **Step merge** — combine two consecutive screens into one when inputs are independent.
* **System-initiated continuation** — advance automatically when only one valid path exists.

Polishing does not authorize inventing new backend state. Eliminations must be achievable with existing API contracts and permissions.

---

# 12. Step 2 — Protect Existing Product Behavior

Identify every existing functional capability.

Example:

```text
Search
Filter
Sort
Bulk action
Export
Create
Edit
Retry
Cancel
View details
Pagination
Saved state
Provider state
Permissions
```

Do not accidentally hide, remove, or relocate critical behavior without a
justified UX reason.

---

# 13. Step 3 — Remove Unnecessary UI

Before adding anything, perform a removal pass.

For every visible element ask:

> Does this improve task completion, comprehension, trust, hierarchy, or brand identity?

If not, remove it.

Common removal candidates:

* unnecessary card containers;
* repeated headings;
* decorative icons;
* duplicated labels;
* excessive helper copy;
* meaningless metrics;
* redundant status badges;
* decorative separators;
* unnecessary shadows;
* fake activity indicators;
* repetitive actions;
* excessive empty space.

---

# 14. Anti-AI-Slop Lockdown

Ordinary Helix product UI must not default to:

* glassmorphism;
* neon glows;
* animated gradients;
* blurred blobs;
* giant hero sections;
* oversized application headings;
* decorative sparkles;
* magic-wand icons;
* huge faded background icons;
* gradient cards;
* excessive badges;
* excessive pills;
* unnecessary rounded containers;
* every section inside a Card;
* generic 4-KPI dashboard rows;
* arbitrary sparklines;
* decorative charts;
* floating shapes;
* noise overlays;
* repeated entrance animations;
* card grids without information rationale.

Do not remove a justified pattern simply because it resembles a trend.

The problem is purposeless application.

---

# 15. Distinctiveness Standard

Do not make Helix unique by inventing unfamiliar interaction behavior.

Keep familiar:

* buttons;
* forms;
* tabs;
* tables;
* dialogs;
* drawers;
* search;
* filtering;
* pagination;
* navigation.

Create Helix character through:

* typography;
* spacing rhythm;
* density;
* page composition;
* information hierarchy;
* iconography;
* status language;
* motion character;
* data visualization;
* operational workflows;
* microcopy;
* tenant-brand integration.

Use:

> Familiar interactions + distinctive execution.

---

# 16. Visual Hierarchy Pass

Every screen should make these apparent:

```text
Where am I?
What matters?
What can I do?
What needs attention?
What is secondary?
```

Use hierarchy through:

1. position;
2. typography;
3. grouping;
4. spacing;
5. contrast;
6. restrained color;
7. elevation only where necessary.

Do not rely primarily on cards.

---

# 17. Blur Test

Mentally blur or visually inspect the page without reading detail.

Can you identify:

* page identity;
* dominant workspace;
* important exception;
* primary action;
* secondary controls?

If everything has equal visual weight, restructure.

---

# 18. Grayscale Test

The page hierarchy must still work without color.

Color reinforces meaning.

Color must not create the entire hierarchy.

---

# 19. Five-Second Test

A user should quickly understand:

```text
What page is this?
What is happening?
What can I do here?
```

If not, simplify or restructure.

---

# 20. Action Hierarchy

Classify visible actions.

## Primary

Main forward action.

## Secondary

Important alternative.

## Tertiary

Low-emphasis convenience action.

## Contextual

Related to one object.

## Destructive

Potential harm.

## Overflow

Rare only.

Important frequent actions must not be buried merely to keep the toolbar clean.

---

# 21. One Dominant Action Per Decision Context

Do not blindly enforce one primary action for the entire screen.

Correct principle:

> Two actions competing for the same decision should not have equal visual weight.

A page may legitimately contain:

* page-level create;
* export;
* bulk actions;
* row actions;
* contextual actions.

Their hierarchy must make sense.

---

# 22. Discoverability

Visibility should correspond to:

```text
importance × frequency
```

### High importance + high frequency

Visible.

### High frequency + contextual

Visible near relevant object.

### Occasional

Secondary area.

### Rare

Overflow.

### Dangerous

Separated and clearly identified.

Do not hide important actions behind a three-dot menu merely for visual neatness.

---

# 23. Information Grouping

Use this order before introducing containers:

```text
Proximity
→ Alignment
→ Typography
→ Spacing
→ Divider
→ Surface change
→ Border
→ Card
```

Cards should represent real bounded objects or interaction groups.

They are not the default section wrapper.

---

# 24. Density Selection

Select density based on the job.

## Compact

Use for:

* operational queues;
* reconciliation;
* high-volume tables;
* finance operations;
* Operator Console.

## Standard

Use for:

* forms;
* detail screens;
* dashboards;
* settings.

## Spacious

Use selectively for:

* auth;
* onboarding;
* empty states;
* focused setup.

Do not globally make the application spacious.

---

# 25. Typography

Typography must carry hierarchy.

Avoid oversized SaaS headings.

Application guidance:

```text
Page title       ~24–28px
Section title    ~18–20px
Subsection       ~16px
Body             ~14–16px
Dense body       ~13–14px
Label            ~12–13px
Caption          ~11–12px
```

Use existing V5 semantic typography tokens where implemented.

Do not hardcode a new font hierarchy locally.

---

# 26. Numeric Typography

Use tabular numerals for meaningful numeric scanning:

* money;
* rates;
* weights;
* COD;
* invoice values;
* percentages;
* counts;
* tabular columns.

Use monospace only when it improves technical/data scanning.

Do not make the entire product monospace.

---

# 27. Color

Use semantic color for:

* action;
* status;
* selection;
* brand identity;
* data differentiation.

Most operational UI should remain neutral.

Do not use multiple accent colors to make sections visually interesting.

Tenant branding must use semantic brand tokens rather than Helix-specific hardcoded blue.

---

# 28. White-Label Safety

Tenant-facing UI must respect the current branding system.

Verify:

* tenant logo;
* primary brand token;
* dark/light contrast;
* selected states;
* button contrast;
* focus contrast.

Do not allow tenant branding to change:

* status meaning;
* component semantics;
* destructive color meaning;
* layout rules;
* permissions;
* information architecture.

---

# 29. Spacing

Spacing communicates relationships.

Prefer a restrained V5 scale.

Typical relationships:

```text
4–8px    tightly related
8–16px   component internals
16–24px  subsection separation
24–40px  major sections
```

Do not create large empty gaps purely to signal premium quality.

---

# 30. Radius

Keep product geometry restrained.

Use V5 semantic radius tokens.

Avoid giant rounded corners on:

* tables;
* filters;
* ordinary cards;
* page containers;
* dashboards.

`rounded-2xl` should never become the automatic AI default.

---

# 31. Elevation

Elevation represents layering.

Use it for:

* dropdowns;
* popovers;
* floating menus;
* dialogs;
* drawers.

Do not add shadow to every card.

Do not ban all shadows if layering genuinely benefits from subtle elevation.

---

# 32. Forms

Polish forms around completion.

Check:

* field order;
* grouping;
* labels;
* helper text;
* defaults;
* validation;
* keyboard order;
* autofill;
* dependent fields;
* server errors;
* input preservation.

Never use placeholder text as the only label.

Do not split forms into steps merely because there are many fields.

Split when the task has meaningful cognitive or dependency boundaries.

---

# 33. Validation UX

Avoid aggressive validation while the user is still typing.

Use appropriate timing:

* meaningful input completion;
* blur;
* dependent-value change;
* submit.

Backend validation should map to relevant fields whenever possible.

For cross-field errors, use an appropriate form-level message.

---

# 34. Tables

Tables are core Helix work surfaces.

Polish for:

* scanability;
* priority columns;
* sorting;
* filtering;
* selection;
* bulk actions;
* row actions;
* pagination;
* saved views;
* column visibility;
* sticky context;
* numeric alignment.

Do not replace a highly efficient operational table with decorative cards on
desktop solely to look modern.

---

# 35. Mobile Table Adaptation

Do not simply squeeze the desktop table.

Prioritize information.

Possible strategies:

* remove secondary columns;
* move details into expandable rows;
* stack critical information;
* use mobile list/card representation where genuinely better.

Ensure all original important actions remain reachable.

---

# 36. Filters

Do not enforce arbitrary filter chip limits.

Expose filters according to:

* frequency;
* importance;
* space;
* persona;
* dataset.

Secondary filters can move into a filter panel.

Always show active filters clearly.

Users must understand why results changed.

---

# 37. Bulk Workflows

For high-volume operational work:

* make selection count visible;
* expose bulk actions contextually;
* preserve filters;
* show partial failure;
* prevent duplicate execution;
* maintain selected context where safe.

Do not make users repeat identical actions one record at a time.

---

# 38. Dashboards

Do not mechanically generate:

```text
4 KPI cards
+ chart
+ quick-action grid
```

First determine what the persona needs upon entry.

Possible dashboard priorities:

* urgent exceptions;
* operational workload;
* financial position;
* provider health;
* business health;
* pending actions.

Only show metrics that support a decision.

---

# 39. KPI Quality

A KPI requires:

* clear label;
* current value;
* useful context.

Optional only when meaningful:

* delta;
* trend;
* sparkline;
* comparison range;
* target.

Do not render a sparkline because the component supports one.

Semantic interpretation controls status color.

Example:

```text
RTO ↓12%
```

is positive.

---

# 40. Data Visualization

Use a chart only when graphical structure improves understanding.

Prefer a number/table/list when clearer.

Charts must:

* use semantic tokens;
* show units;
* use honest scales;
* remain readable in both themes;
* have accessible alternatives;
* avoid decorative chrome;
* avoid unnecessary grid lines;
* communicate actual data, not decoration.

---

# 41. Loading States

Choose loading behavior by scope.

## Initial content

Skeleton matching final geometry.

## Button mutation

Button pending state.

## Background refresh

Keep existing data and subtly indicate refresh.

## Provider/background process

Persistent lifecycle status.

Never clear useful content during refresh without necessity.

Never use fake progress percentages.

---

# 42. Skeleton Quality

Skeletons should approximate final structure.

Avoid:

* shimmer over every surface;
* wildly inaccurate shapes;
* layout shifts on load.

Reduced-motion users must receive a suitable non-animated version.

---

# 43. Feedback Hierarchy

Do not use Toast for every event.

Use:

## Field

For field-specific validation.

## Inline

For component-specific state.

## Banner / alert

For persistent page-level problems.

## Toast

For transient confirmation.

## Notification / persistent activity state

For asynchronous background outcomes.

## Dialog

For decisions requiring focused confirmation.

Match feedback persistence to consequence.

---

# 44. Success

Prefer changed interface state as primary proof.

Toast may reinforce.

For consequential operations show:

* what completed;
* affected object;
* resulting state;
* next action where relevant.

---

# 45. Error States

Every meaningful error should answer:

1. What failed?
2. What was affected?
3. What was not affected?
4. What can the user do?
5. Is retry safe?

Avoid:

```text
Something went wrong
```

when better information exists.

---

# 46. Async Provider UX

For provider-backed flows clearly communicate:

```text
Accepted
Queued
Processing
Waiting for provider
Completed
Failed
Retryable
Manual action required
```

Do not force users to keep a modal open while a job completes.

Do not allow ambiguous resubmission that might duplicate operations.

---

# 47. Financial Trust UX

For money-related surfaces verify clarity around:

* amount;
* debit;
* credit;
* balance;
* COD;
* settlement;
* refund;
* adjustment;
* outstanding amount;
* postpaid credit.

Balance-affecting actions require persistent evidence.

Do not rely only on a short-lived toast.

---

# 48. Permissions

Correctly differentiate:

* hidden;
* disabled;
* read-only;
* permission denied;
* prerequisite missing;
* plan restricted;
* feature disabled;
* temporarily unavailable.

Do not make every unavailable action look identical.

If the user can fix the restriction, explain how.

---

# 49. Destructive Actions

Classify risk.

## Reversible

Prefer undo/light confirmation.

## Medium

Explicit confirmation.

## Irreversible/high impact

Strong consequence confirmation.

Typed confirmation should be rare.

Do not add confirmation dialogs to every ordinary action.

---

# 50. Context Preservation

Preserve useful operator context where appropriate:

* filters;
* sort;
* pagination;
* tab;
* scroll;
* date range;
* selected view.

List → detail → back should not unnecessarily reset the user's workspace.

---

# 51. Copy

Use user-domain language.

Prefer:

* clear;
* short;
* direct;
* specific.

Do not blindly remove domain terms that logistics users understand.

Terms such as:

```text
AWB
COD
NDR
RTO
SLA
```

may be appropriate.

Explain unfamiliar terms where necessary.

Avoid internal implementation terminology that offers no user value.

---

# 52. Button Copy

Prefer descriptive action labels.

Good:

```text
Book Shipment
Save Changes
Retry Booking
Add Funds
Download Invoice
```

Avoid vague:

```text
OK
Submit
Proceed
Execute
```

`Confirm` may be valid when confirmation itself is the meaningful action.

Do not ban words mechanically.

Use context.

---

# 53. Locale, Money, Date and Units

Do not assume all interfaces are domestic India.

Inspect actual workspace/context.

Domestic India may use:

```text
₹1,23,456.00
```

International may require different:

* currency;
* locale;
* timezone;
* units.

Do not globally prepend `₹`.

Stored UTC values must display in the relevant operational timezone.

---

# 54. Responsive Strategy

Use **adaptive-first** design.

Every supported interface must work at narrow widths, but the design should match
the actual task environment.

## Desktop operational UI

Can be denser.

May show:

* more columns;
* more contextual actions;
* side-by-side detail;
* keyboard shortcuts.

## Mobile

Prioritize:

* critical information;
* primary action;
* essential context;
* simplified navigation;
* appropriate bottom sheets/drawers.

Do not stretch mobile layouts across desktop.

Do not squeeze desktop tables onto mobile.

---

# 55. Touch Targets

Mobile/touch-critical interactions should generally provide approximately
44×44px effective hit areas.

Dense desktop controls may appear visually smaller when their effective hit area
and accessibility remain sufficient.

Do not make every desktop table row 44px+ simply because mobile guidance exists.

---

# 56. Navigation

Preserve stable user mental models.

Navigation should reflect:

* workflow;
* task;
* entity;
* frequency.

Do not reorganize navigation during a local polish unless scope explicitly allows
information-architecture changes.

When modifying navigation, verify:

* current permissions;
* feature flags;
* B2C/B2B/International separation;
* operator/admin/seller boundaries.

---

# 57. Motion

Motion must explain:

* state change;
* continuity;
* causality;
* spatial relationship;
* progress.

Use V5 motion tokens.

Avoid:

* animate-ping;
* animate-float;
* indefinite pulsing;
* animated gradients;
* decorative stagger;
* bounce/spring gimmicks.

Respect `prefers-reduced-motion`.

The interface must remain excellent without animation.

---

# 58. Micro-Interactions

Good micro-interactions are quiet.

Examples:

* clear pressed state;
* selected-row transition;
* subtle drawer transition;
* successful inline update;
* focus movement;
* collapse/expand continuity.

Do not animate everything because animation utilities exist.

---

# 59. Accessibility

Target:

> WCAG 2.2 AA

Check applicable:

* native semantics;
* keyboard path;
* logical focus;
* visible focus;
* focus restoration;
* focus not obscured;
* accessible names;
* labels;
* validation associations;
* dynamic announcements;
* contrast;
* touch target;
* reduced motion;
* zoom/reflow;
* color-independent meaning.

Automated checks alone are insufficient.

---

# 60. Focus Design

Focus is a first-class visual state.

Do not remove focus outlines.

Use semantic focus tokens.

Ensure focus:

* remains visible on all themes;
* is not clipped;
* is not hidden beneath sticky elements;
* follows logical task order.

---

# 61. Dark Mode

Dark mode must preserve hierarchy.

Do not merely invert colors.

Avoid:

* muddy gray text;
* neon accents;
* glow-heavy effects;
* ambiguous surfaces.

Check:

* canvas;
* surfaces;
* inputs;
* menus;
* borders;
* selected states;
* status colors;
* tenant brand colors.

---

# 62. Performance as UX

Do not optimize by superstition.

Inspect actual issues.

Current important experience metrics include:

```text
LCP
INP
CLS
```

Also consider:

* list responsiveness;
* filter responsiveness;
* route transitions;
* blocking tasks;
* heavy dialogs;
* large tables.

Do not add `useMemo`, `useCallback`, `React.memo`, or virtualization everywhere
without evidence.

---

# 63. Component Reuse

Before creating a component:

1. search `helix-interface/src/components/ui/`;
2. search relevant feature components;
3. inspect adjacent pages;
4. determine whether composition solves the problem;
5. create only when a legitimate gap remains.

Never solve an imperfect component by creating:

```text
ButtonV2
NewModal
ModernCard
BetterTable
```

Improve the shared component when appropriate.

---

# 64. Shared Component Change Safety

Before modifying a shared primitive:

* find usages;
* understand variants;
* inspect breaking risk;
* test representative surfaces;
* prefer additive compatible changes;
* update documentation/tests.

Never globally change a primitive to fix one page without checking consumers.

---

# 65. Component Responsibility

Do not split components based on arbitrary thresholds such as:

* 150 lines;
* 3 `useState`;
* 8 props.

Split when there are distinct conceptual responsibilities.

A large coherent component may be better than many tiny indirections.

---

# 66. Data Hooks and API Integrity

Preserve established data architecture.

Do not:

* add raw API calls into pages;
* create duplicate endpoint wrappers;
* invent response fields;
* map speculative backend states;
* change cache behavior unrelated to UX polish.

Use actual current hooks/contracts.

---

# 67. Feature Flags and Entitlements

Do not place every polish change behind a new feature flag.

Use flags when the change is:

* high-risk;
* staged;
* experimentally validated;
* dependent on backend rollout;
* intended for gradual migration.

Avoid permanent flag debt for trivial design corrections.

---

# 68. Page Archetype Alignment

Determine the page archetype before polishing:

* list;
* detail;
* queue;
* dashboard;
* wizard;
* settings;
* review/approval;
* analytics.

Use the established V5 archetype as structural guidance.

Do not force every page into a dashboard layout.

---

# 69. Design-System Classification

For every relevant issue classify:

## Follow

Already correct.

## Correct

Implementation should align to V5.

## Extend

V5 needs a reusable capability.

## Change

Current V5 rule causes a poorer outcome and should be revised.

## Exception

The page has a justified contextual need.

Do not blindly obey a rule that demonstrably harms users.

Raise the discrepancy.

---

# 70. Polish Scope Discipline

Do not turn a targeted polish task into a frontend rewrite.

Use the smallest coherent change set that solves the experience problem.

Avoid unrelated:

* directory restructuring;
* state-management migration;
* dependency changes;
* API refactors;
* global redesign.

Unless necessary to safely implement the intended correction.

---

# 71. Implementation Order

Within the target surface:

```text
1. Preserve functionality
2. Correct structure
3. Correct hierarchy
4. Correct action placement
5. Correct states
6. Correct copy
7. Align components/tokens
8. Refine spacing/typography
9. Refine responsive behavior
10. Accessibility
11. Motion
12. Performance
13. Final visual polish
```

Visual embellishment is last.

---

# 72. Final Visual Design Pass

Perform a deliberate final pass.

Check:

## Alignment

Edges, baselines, grid relationships.

## Spacing

Consistent relationship rhythm.

## Typography

Correct hierarchy and line-height.

## Borders

Only where needed.

## Radius

Consistent and restrained.

## Color

Neutral majority, deliberate accent.

## Surfaces

No unnecessary nested containers.

## Icons

Consistent size/stroke/placement.

## Motion

Subtle and functional.

## Density

Appropriate to task.

---

# 73. Final Removal Pass

Before finishing, ask again:

> What can be removed without reducing meaning, capability, trust, or usability?

Remove it.

The last 10% of premium visual quality often comes from subtraction.

---

# 74. Runtime Validation

Where tooling allows, inspect the rendered result.

Test relevant:

```text
desktop
tablet
mobile/narrow viewport
light
dark
keyboard
loading
empty
error
success
permission denied
long content
high data density
```

Do not mark states “tested” if only source was inspected.

---

# 75. Regression Validation

Verify that polish did not break:

* actions;
* navigation;
* permissions;
* forms;
* filters;
* sorting;
* bulk actions;
* pagination;
* API calls;
* async provider states;
* financial values;
* tenant branding;
* workspace separation.

---

# 76. Anti-Slop Final Gate

Reject the result if it now contains:

```text
more containers than necessary
more visual effects than before
more clicks for frequent tasks
hidden important actions
meaningless dashboards
decorative metrics
gratuitous icons
excessive pills/badges
unnecessary modal flows
large blank areas reducing efficiency
generic AI-generated visual composition
```

The result should be simpler and stronger.

Not merely different.

---

# 77. Polish Verification Checklist

Before declaring completion:

```text
□ Current user task and persona understood

□ Existing supported functionality preserved

□ Relevant UX-audit findings resolved or explicitly deferred

□ Page purpose understandable within seconds

□ Important information visually prioritized

□ Frequent actions are discoverable

□ Rare actions do not compete visually

□ No unnecessary AI/SaaS visual slop

□ Cards used only for meaningful grouping

□ Density matches the operational task

□ Typography hierarchy is clear and restrained

□ Semantic V5 color/tokens used

□ Tenant branding remains correct where applicable

□ Loading state preserves context

□ Empty state guides action where needed

□ Errors explain recovery

□ Success is visible in persistent UI when consequential

□ Async provider states remain understandable

□ Financial outcomes are trustworthy and explicit

□ Permissions/entitlements communicate correct reason

□ Tables remain efficient for desktop operators

□ Mobile representation prioritizes critical information

□ Active filters remain visible

□ Context is preserved where appropriate

□ Accessibility follows WCAG 2.2 AA requirements

□ Keyboard path works for applicable interactions

□ Focus is visible and restored correctly

□ Reduced motion supported

□ Light and dark modes verified

□ No invented API fields or hypothetical behavior

□ No duplicate primitives introduced

□ Shared-component changes checked for regressions

□ Performance optimizations are evidence-based

□ Final visual removal pass completed

□ Functional regression check completed
```

---

# 78. Required Completion Report

When implementation is performed, report:

```text
## Surface
What was polished.

## UX problems addressed
Verified issues corrected.

## What changed
Structural and visual changes.

## What intentionally did not change
Business behavior/API/permissions preserved.

## Design System V5 decisions
Relevant rules applied.

## Reuse
Existing components reused or safely extended.

## States verified
Loading/error/empty/success/async etc.

## Responsive coverage
What was tested.

## Accessibility coverage
What was tested.

## Regression verification
Relevant checks/results.

## Remaining limitations
Anything requiring separate product/backend/design work.
```

Do not claim full compliance when states or devices were not actually validated.

---

# 79. Definition of Done

A polished Helix surface is complete only when:

> A first-time user can understand what the page is for and what to do next;
> an experienced user can perform the task efficiently; important information
> is prioritized; frequent actions remain reachable; system state is clear;
> failure is recoverable; accessibility is built in; dense operational work
> remains efficient; and the interface feels unmistakably deliberate rather
> than generically generated.

---

# 80. Final Principle

> **Do not polish the interface until it looks impressive. Polish it until nothing important is confusing, nothing unnecessary is competing for attention, and every remaining visual decision has a reason.**

Helix V5 polish should produce interfaces that feel:

**Obvious. Calm. Fast. Precise. Trustworthy. Distinctive.**

Never generic.

Never decorative for decoration's sake.

Never functionally degraded.

## Never AI slop.