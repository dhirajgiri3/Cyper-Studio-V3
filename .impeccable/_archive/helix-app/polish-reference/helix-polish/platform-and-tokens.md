# Design Tokens & Platform-Specific Guidance

Covers the token-level visual system (typography, color, spacing, radius,
elevation), locale/currency/unit handling, desktop vs. mobile responsive
strategy, motion, accessibility, dark mode, performance-as-UX, and the final
visual design pass checklist.

---

## Typography

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

## Numeric Typography

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

## Color

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

## White-Label Safety

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

## Spacing

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

## Radius

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

## Elevation

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

## Locale, Money, Date and Units

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

## Responsive Strategy

Use **adaptive-first** design.

Every supported interface must work at narrow widths, but the design should match
the actual task environment.

### Desktop operational UI

Can be denser.

May show:

* more columns;
* more contextual actions;
* side-by-side detail;
* keyboard shortcuts.

### Mobile

Prioritize:

* critical information;
* primary action;
* essential context;
* simplified navigation;
* appropriate bottom sheets/drawers.

Do not stretch mobile layouts across desktop.

Do not squeeze desktop tables onto mobile.

---

## Touch Targets

Mobile/touch-critical interactions should generally provide approximately
44×44px effective hit areas.

Dense desktop controls may appear visually smaller when their effective hit area
and accessibility remain sufficient.

Do not make every desktop table row 44px+ simply because mobile guidance exists.

---

## Navigation

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

## Motion

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

## Micro-Interactions

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

## Accessibility

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

## Focus Design

Focus is a first-class visual state.

Do not remove focus outlines.

Use semantic focus tokens.

Ensure focus:

* remains visible on all themes;
* is not clipped;
* is not hidden beneath sticky elements;
* follows logical task order.

---

## Dark Mode

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

## Performance as UX

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

## Final Visual Design Pass

Perform a deliberate final pass.

Check:

### Alignment

Edges, baselines, grid relationships.

### Spacing

Consistent relationship rhythm.

### Typography

Correct hierarchy and line-height.

### Borders

Only where needed.

### Radius

Consistent and restrained.

### Color

Neutral majority, deliberate accent.

### Surfaces

No unnecessary nested containers.

### Icons

Consistent size/stroke/placement.

### Motion

Subtle and functional.

### Density

Appropriate to task.
