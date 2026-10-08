# Design-System Compliance & Component/Architecture Discipline

Covers how to treat component reuse, shared-primitive changes, component
sizing, data/API integrity, feature flags, page archetypes, and the
FOLLOW/CORRECT/EXTEND/CHANGE/EXCEPTION classification for weighing a V5 rule
against an observed poor outcome.

---

## Component Reuse

Before creating a component:

1. search `src/components/ui/`;
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

## Shared Component Change Safety

Before modifying a shared primitive:

* find usages;
* understand variants;
* inspect breaking risk;
* test representative surfaces;
* prefer additive compatible changes;
* update documentation/tests.

Never globally change a primitive to fix one page without checking consumers.

---

## Component Responsibility

Do not split components based on arbitrary thresholds such as:

* 150 lines;
* 3 `useState`;
* 8 props.

Split when there are distinct conceptual responsibilities.

A large coherent component may be better than many tiny indirections.

---

## Data Hooks and API Integrity

Preserve established data architecture.

Do not:

* add raw API calls into pages;
* create duplicate endpoint wrappers;
* invent response fields;
* map speculative backend states;
* change cache behavior unrelated to UX polish.

Use actual current hooks/contracts.

---

## Feature Flags and Entitlements

Do not place every polish change behind a new feature flag.

Use flags when the change is:

* high-risk;
* staged;
* experimentally validated;
* dependent on backend rollout;
* intended for gradual migration.

Avoid permanent flag debt for trivial design corrections.

---

## Page Archetype Alignment

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

## Design-System Classification

For every relevant issue classify:

### Follow

Already correct.

### Correct

Implementation should align to V5.

### Extend

V5 needs a reusable capability.

### Change

Current V5 rule causes a poorer outcome and should be revised.

### Exception

The page has a justified contextual need.

Do not blindly obey a rule that demonstrably harms users.

Raise the discrepancy.
