# Business Rules

## 1. Immediate Sorting

All materials are sorted during collection or intake.

There is no delayed sorting process.

---

## 2. Contribution as the Core Entity

All recyclable materials must be recorded as a **Contribution Transaction**.

This applies to:
- Sunday EcoAid household collection
- pickup requests
- event-based collection
- barangay exchange programs
- other direct submissions

---

## 3. Separation of Concerns

- Collection & Sorting → records materials (input)
- Redemption Programs → defines reward rules (logic)
- Reward Inventory → tracks outputs (goods/services)
- Material Stock → read-only derived data
- Program Funds → tracks expenses, proceeds, and profits

---

## 4. Material Stock is Read-Only

Material Stock is automatically derived from completed intake transactions.

Staff do NOT manually add materials in this module.

---

## 5. Reward Eligibility

- Rewards are based on verified/sorted contributions
- Users can see eligible rewards after intake
- Rewards are claimed later through SK staff or the appropriate releasing process

---

## 6. No Fake Requests

Only actual override / on-demand pickup scenarios use Collection Requests.

Barangay hall exchange and event contributions do NOT create requests.

Sunday EcoAid is a regular collection activity, not a request flow.

---

## 7. Source Types

Each contribution must have a source type:

- SUNDAY_ECOAID
- PICKUP_REQUEST
- EVENT_COLLECTION
- BARANGAY_EXCHANGE

---

## 8. Financial Tracking

Program Funds must support:
- recording expenses
- recording sales proceeds or income
- computing or displaying profits
- documenting financial activity for transparency and reporting