# Page-Level Patterns & Copy

Covers polish guidance specific to common Helix page archetypes — forms,
tables, filters, bulk workflows, dashboards, KPIs, data visualization — and
copy/microcopy standards including button labels.

---

## Forms

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

## Validation UX

Avoid aggressive validation while the user is still typing.

Use appropriate timing:

* meaningful input completion;
* blur;
* dependent-value change;
* submit.

Backend validation should map to relevant fields whenever possible.

For cross-field errors, use an appropriate form-level message.

---

## Tables

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

## Mobile Table Adaptation

Do not simply squeeze the desktop table.

Prioritize information.

Possible strategies:

* remove secondary columns;
* move details into expandable rows;
* stack critical information;
* use mobile list/card representation where genuinely better.

Ensure all original important actions remain reachable.

---

## Filters

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

## Bulk Workflows

For high-volume operational work:

* make selection count visible;
* expose bulk actions contextually;
* preserve filters;
* show partial failure;
* prevent duplicate execution;
* maintain selected context where safe.

Do not make users repeat identical actions one record at a time.

---

## Dashboards

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

## KPI Quality

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

## Data Visualization

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

## Copy

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

## Button Copy

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
