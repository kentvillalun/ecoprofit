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
- Resident signup address selection (barangay autocomplete + sitio dependent dropdown)
- Backend endpoints for barangay search and sitio listing
- Backend validation for barangay/sitio combinations during registration
- Full auth flow connected to backend (login and signup call real API)
- OTP backend implemented: `OtpVerification` model, `sendOtp` utility, verify/resend endpoints
- OTP frontend: 6-digit input with auto-focus, resend cooldown (60s), API integration
- Resident capture page: camera access via file input, image preview, submit confirmation UI

---

## In Progress
- Nothing actively in progress

---

## Next Steps

1. Integrate real Semaphore API key so OTP sends actual SMS (currently logs to console in dev)
2. Connect capture page to backend (submit captured image as a pickup request)
3. Implement request lifecycle backend: create, approve, reject, move to in-progress, collect
4. Replace mock data in Collection Requests UI with real backend data
5. Build resident requests page backend integration (list own requests, see status)
6. Continue with intake module after request lifecycle is stable

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
