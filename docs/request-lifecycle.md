# Request Lifecycle

## Scope
Applies only to override / on-demand pickup requests. Does NOT apply to Sunday EcoAid, events, or barangay exchange.

---

## Status Flow
REQUESTED → APPROVED → IN_PROGRESS → COLLECTED
REQUESTED → REJECTED

---

## Definitions

### REQUESTED
Resident submits a pickup request. Material type can be ASSORTED if recyclables are mixed.

---

### APPROVED
Barangay accepts the request and marks it ready for pickup.

---

### IN_PROGRESS
Request selected for batch collection or part of ongoing pickup activity.

---

### COLLECTED
Materials have been picked up, sorted, and recorded as an intake transaction. If material type was ASSORTED, the collector finalizes the actual breakdown by category at this step.

---

### REJECTED
Request is declined with a rejection reason.

---

## Batch Collection
Moves one or more APPROVED requests into IN_PROGRESS simultaneously.

---

## Sunday EcoAid Gap
If a resident contributes during Sunday EcoAid without having made a prior request, the collector manually inputs the record in the Manual Collection Intake module by searching the resident. No request is created for this flow.
