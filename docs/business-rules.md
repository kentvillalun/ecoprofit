# Business Rules

## 1. Immediate Sorting

All materials are sorted immediately during collection or intake. No delayed sorting.

---

## 2. Contribution / Intake as the Core Entity

All recyclable material intake must be recorded as a **Contribution / Intake Transaction** with a source type:

- SUNDAY_ECOAID
- PICKUP_REQUEST
- EVENT_COLLECTION
- BARANGAY_EXCHANGE

---

## 3. Collection Requests Scope

Collection Requests handles pickup workflow only (override / on-demand). Sunday EcoAid, events, and barangay exchange do NOT create requests.

---

## 4. Pickup Request Lifecycle

REQUESTED → APPROVED → IN_PROGRESS → COLLECTED, or REQUESTED → REJECTED.

COLLECTED means materials are already picked up, sorted, and recorded as intake.

---

## 5. ASSORTED Material Type

The ASSORTED material type is valid for pickup requests. During collection, the collector finalizes the actual breakdown by category.

---

## 6. Sunday EcoAid Manual Entries

Sunday EcoAid manual entries (no prior request) are recorded directly in the Manual Collection Intake module by searching the resident and inputting their contribution. These entries are flagged as source: MANUAL_ENTRY and hasAppRecord: false.

---

## 7. Leaderboard Inclusivity

All contributions — including manual entries — count toward the leaderboard. Effort is recognized regardless of app usage.

---

## 8. Pickup Requests Are Not Rewarded

Pickup request contributions are community participation obligations. There is no reward equivalent for completing a pickup request.

---

## 9. Redemption Program Structure

The Redemption Program (SK project) allows the SK to create programs, assign point values per material category, set a maximum point cap, and set an allocated budget. Point values are stored per program per material type (not globally) so they are never overwritten across programs.

---

## 10. Frozen Redemption Transactions

RedemptionTransaction records are frozen to the exact ProgramMaterial row at the time of redemption. Past transactions are unaffected by future point value changes.

---

## 11. Reward Releasing

Releasing of rewards happens in the Reward Inventory module, not in Redemption Programs.

---

## 12. Material Stock is Read-Only

Material Stock is read-only and derived from completed intake transactions. Staff do not manually add materials here.

---

## 13. Program Funds

Program Funds tracks expenses, income/proceeds, and profits. Plant distribution expenses are recorded here. No resident linking is required for plant distribution.

---

## 14. Junkshop Sales

The barangay sells recyclables to junkshops. Receipts from these sales are recorded as income in Program Funds.

---

## 15. Leaderboard

The leaderboard ranks residents by total contribution (kg or points) to provide recognition and motivation for active participants.

---

## 16. Junkshop Price Comparison

The Junkshop Sales module tracks price offers per material type from multiple junkshops. This allows the barangay to compare buyers and sell to whoever offers the highest price.