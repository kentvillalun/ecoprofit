# Business Rules

## 1. Immediate Sorting

All materials are sorted during collection or intake.

There is no delayed sorting process and no pending sorting workflow.

---

## 2. Contribution / Intake as the Core Entity

All recyclable materials must be recorded as a **Contribution / Intake Transaction**.

This applies to:
- Sunday EcoAid household collection
- pickup requests
- event-based collection
- barangay exchange programs
- other direct submissions

---

## 3. Unified Intake Model

Each contribution must have a source type:

- SUNDAY_ECOAID
- PICKUP_REQUEST
- EVENT_COLLECTION
- BARANGAY_EXCHANGE

These source types are part of one unified intake model.

---

## 4. Separation of Concerns

- Collection Requests -> handles pickup workflow only
- Collection & Sorting -> records actual material intake
- Redemption Programs -> defines exchange and reward rules
- Reward Inventory -> tracks goods, medicine, supplies, and service outputs
- Material Stock -> read-only derived data from intake
- Program Funds -> tracks expenses, income/proceeds, and profits

---

## 5. Material Stock is Read-Only

Material Stock is automatically derived from completed intake transactions.

Staff do NOT manually add materials in this module.

---

## 6. Reward Eligibility

- Rewards are based on verified and sorted contributions
- Users can see eligible rewards after intake
- Rewards are claimed later through the appropriate releasing process

---

## 7. Pickup Request Scope

Only actual override / on-demand pickup scenarios use Collection Requests.

Barangay hall exchange and event contributions do NOT create requests.

Sunday EcoAid is a regular household collection activity, not a request flow.

---

## 8. Request Lifecycle and Batch Collection

Override / on-demand pickup requests follow this lifecycle:

REQUESTED -> APPROVED -> IN_PROGRESS -> COLLECTED
           ->
            REJECTED

Definitions:
- APPROVED = ready for pickup
- IN_PROGRESS = selected for batch collection or ongoing pickup activity
- COLLECTED = materials already picked up, sorted, and recorded as intake

Batch collection is the step that moves approved requests into IN_PROGRESS.

---

## 9. Financial Tracking

Program Funds must support:
- recording expenses
- recording sales proceeds or income
- computing or displaying profits
- documenting financial activity for transparency and reporting
