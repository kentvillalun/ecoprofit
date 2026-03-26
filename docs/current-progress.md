# Current Progress

## Completed
- Resident-side authentication frontend is fixed and now stable
- Stable auth flows:
  - onboarding
  - login (resident, connected to backend)
  - signup with barangay autocomplete and sitio dependent dropdown (connected to backend)
  - OTP validation (6-digit input, resend cooldown, verify/resend endpoints)
  - forgot password (full flow: phone → OTP → reset password, all connected to backend)
  - reset password page
- Collection Requests UI tabs
- Basic request filtering using mock data
- Approved tab selection and mock batch collection flow to In Progress
- Resident signup address selection (barangay autocomplete + sitio dependent dropdown)
- Backend endpoints for barangay search and sitio listing
- Backend validation for barangay/sitio combinations during registration
- OTP backend: `OtpVerification` model, `sendOtp` utility, verify and resend endpoints
- Forgot password backend: `PasswordResetToken` model, `forgotPassword`, `verifyForgotPasswordOtp`, `resetPassword` controllers + routes
- `resendOtp` updated to handle both signup and forgot-password flows via `otpFlow` param
- Resident capture page: camera access via file input, image preview, submit confirmation UI

---

## In Progress
- Barangay login backend connection
  - UI exists at `/barangay/login` but is not connected to any backend endpoint
  - Uses email/username input — needs to align with what the backend will accept
  - Login button has no handler and no API call yet

---

## Next Steps

1. Connect barangay login to backend (decide identifier: phone or email/username)
2. Add backend endpoint or extend existing login to support BARANGAY_ADMIN role
3. Integrate real Semaphore API key so OTP sends actual SMS (currently logs to console in dev)
4. Connect capture page to backend (submit captured image as a pickup request)
5. Implement request lifecycle backend: create, approve, reject, move to in-progress, collect
6. Replace mock data in Collection Requests UI with real backend data
7. Build resident requests page backend integration (list own requests, see status)
8. Continue with intake module after request lifecycle is stable

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
