# Current Progress

## Completed
- Resident-side authentication frontend is fixed and now stable
- Stable auth flows:
  - onboarding
  - login
  - signup
  - OTP validation
  - forgot password
  - barangay login
- Collection Requests UI tabs
- Basic request filtering using mock data
- Approved tab selection and mock batch collection flow to In Progress

---

## In Progress
- Resident signup address selection
- Barangay autocomplete using registered barangays from the database
- Sitio dependent dropdown based on selected barangay
- Replacing temporary or mock address values with backend-driven data
- Backend validation for valid barangay and sitio combinations

---

## Next Steps

1. Add backend endpoint for registered barangay suggestions in resident signup
2. Add backend endpoint or service for sitio options by selected barangay
3. Connect signup form barangay autocomplete to real backend data
4. Disable sitio until barangay is selected and reset sitio on barangay change
5. Enforce backend validation that barangay exists
6. Enforce backend validation that selected sitio belongs to the selected barangay
7. Continue request lifecycle and intake backend work after signup address selection is stable

---

## Notes

- Auth frontend bugs are no longer an active work area
- Avoid unnecessary refactoring of stable auth pages unless required by a new feature
- Barangay options must come only from registered barangays in the system
- No third-party or external address API should be used for signup address selection
- Sitio must stay dependent on the selected barangay to prevent invalid combinations
- Sorting is done during collection or intake
- Sunday EcoAid is household collection
- Override pickups use request lifecycle
- Batch collection moves approved requests into IN_PROGRESS
- Redemption is separate from intake
- Material Stock is read-only and derived from intake transactions
