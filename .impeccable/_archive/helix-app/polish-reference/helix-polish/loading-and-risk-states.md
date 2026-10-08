# Loading, Async, Financial Trust & Risk-Tiered States

Covers loading/skeleton behavior, async provider lifecycle communication,
financial trust surfaces, permission/entitlement state differentiation,
destructive-action risk tiering, and context preservation across navigation.

---

## Loading States

Choose loading behavior by scope.

### Initial content

Skeleton matching final geometry.

### Button mutation

Button pending state.

### Background refresh

Keep existing data and subtly indicate refresh.

### Provider/background process

Persistent lifecycle status.

Never clear useful content during refresh without necessity.

Never use fake progress percentages.

---

## Skeleton Quality

Skeletons should approximate final structure.

Avoid:

* shimmer over every surface;
* wildly inaccurate shapes;
* layout shifts on load.

Reduced-motion users must receive a suitable non-animated version.

---

## Async Provider UX

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

## Financial Trust UX

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

## Permissions

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

## Destructive Actions

Classify risk.

### Reversible

Prefer undo/light confirmation.

### Medium

Explicit confirmation.

### Irreversible/high impact

Strong consequence confirmation.

Typed confirmation should be rare.

Do not add confirmation dialogs to every ordinary action.

---

## Context Preservation

Preserve useful operator context where appropriate:

* filters;
* sort;
* pagination;
* tab;
* scroll;
* date range;
* selected view.

List → detail → back should not unnecessarily reset the user's workspace.
