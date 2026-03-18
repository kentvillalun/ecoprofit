# Current Progress

## Completed
- Collection Requests UI tabs
- Basic request filtering using mock data
- Approved tab selection and mock batch collection flow to In Progress

---

## In Progress
- Implementing real request lifecycle logic
- Removing mock data
- Designing Collection & Sorting intake flow
- Aligning modules with finalized business rules

---

## Next Steps

1. Define request status transitions in backend
2. Implement contribution / intake recording API
3. Implement batch collection handling from APPROVED to IN_PROGRESS in backend
4. Connect frontend to backend
5. Compute reward eligibility
6. Design Program Funds records and summaries

---

## Notes

- Sorting is done during collection or intake
- Sunday EcoAid is household collection
- Override pickups use request lifecycle
- Batch collection moves approved requests into IN_PROGRESS
- Redemption is separate from intake
- Material Stock is read-only and derived from intake transactions
