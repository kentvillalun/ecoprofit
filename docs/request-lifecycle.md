# Request Lifecycle

## Scope

This applies only to **override / on-demand pickup requests**.

It does NOT apply to:
- Sunday EcoAid household collection
- event-based collection
- barangay hall exchange

---

## Status Flow

REQUESTED -> APPROVED -> IN_PROGRESS -> COLLECTED
           ->
            REJECTED

---

## Definitions

### REQUESTED
Resident submits a pickup request.

---

### APPROVED
Barangay accepts the request and marks it ready for pickup.

---

### IN_PROGRESS
Request has been selected for batch collection or is part of ongoing pickup work.

---

### COLLECTED
Materials have been:
- picked up
- sorted
- recorded as an intake transaction

---

### REJECTED
Request is declined.

---

## Important Rule

COLLECTED means:
- materials are already sorted
- materials are already recorded
- contribution transaction has been created

---

## Batch Collection

Batch collection is used to move one or more approved requests into IN_PROGRESS.

IN_PROGRESS is used to track ongoing collection before completion.
