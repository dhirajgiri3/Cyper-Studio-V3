# Process, Anti-Slop Discipline & Verification

Covers how to approach a polish task from first read to final sign-off: the
required execution order, the anti-slop stance to hold throughout, and the
closing verification passes that prove nothing regressed.

---

## Evidence-First Execution

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

## Mandatory Pre-Polish Brief

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

## Required Execution Sequence

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

## Step 1 — Understand the User Task

Ask:

* What is the user trying to accomplish?
* What information is required?
* What decisions are required?
* What action completes the task?
* What state confirms success?
* What commonly goes wrong?
* What does an experienced user repeat frequently?

The UI should be designed around that task.

Not around the component tree.

---

## Step 2 — Protect Existing Product Behavior

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

## Step 3 — Remove Unnecessary UI

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

## Anti-AI-Slop Lockdown

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

## Distinctiveness Standard

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

## Polish Scope Discipline

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

## Implementation Order

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

## Final Removal Pass

Before finishing, ask again:

> What can be removed without reducing meaning, capability, trust, or usability?

Remove it.

The last 10% of premium visual quality often comes from subtraction.

---

## Runtime Validation

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

Do not mark states "tested" if only source was inspected.

---

## Regression Validation

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

## Anti-Slop Final Gate

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
