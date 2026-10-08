# Interaction Hierarchy, Density & Feedback Surfaces

Covers how to establish visual hierarchy, classify and place interactive
elements, choose density, and surface feedback (success/error) at the right
persistence level.

---

## Visual Hierarchy Pass

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

## Blur Test

Mentally blur or visually inspect the page without reading detail.

Can you identify:

* page identity;
* dominant workspace;
* important exception;
* primary action;
* secondary controls?

If everything has equal visual weight, restructure.

---

## Grayscale Test

The page hierarchy must still work without color.

Color reinforces meaning.

Color must not create the entire hierarchy.

---

## Five-Second Test

A user should quickly understand:

```text
What page is this?
What is happening?
What can I do here?
```

If not, simplify or restructure.

---

## Action Hierarchy

Classify visible actions.

### Primary

Main forward action.

### Secondary

Important alternative.

### Tertiary

Low-emphasis convenience action.

### Contextual

Related to one object.

### Destructive

Potential harm.

### Overflow

Rare only.

Important frequent actions must not be buried merely to keep the toolbar clean.

---

## One Dominant Action Per Decision Context

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

## Discoverability

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

## Information Grouping

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

## Density Selection

Select density based on the job.

### Compact

Use for:

* operational queues;
* reconciliation;
* high-volume tables;
* finance operations;
* Operator Console.

### Standard

Use for:

* forms;
* detail screens;
* dashboards;
* settings.

### Spacious

Use selectively for:

* auth;
* onboarding;
* empty states;
* focused setup.

Do not globally make the application spacious.

---

## Feedback Hierarchy

Do not use Toast for every event.

Use:

### Field

For field-specific validation.

### Inline

For component-specific state.

### Banner / alert

For persistent page-level problems.

### Toast

For transient confirmation.

### Notification / persistent activity state

For asynchronous background outcomes.

### Dialog

For decisions requiring focused confirmation.

Match feedback persistence to consequence.

---

## Success

Prefer changed interface state as primary proof.

Toast may reinforce.

For consequential operations show:

* what completed;
* affected object;
* resulting state;
* next action where relevant.

---

## Error States

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
