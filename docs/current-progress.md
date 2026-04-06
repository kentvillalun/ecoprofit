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
- Barangay login backend: `POST /auth/barangay/login` accepts phone + password, validates barangay staff roles (CAPTAIN, SECRETARY, TREASURER, SK, COLLECTOR), issues JWT in a `barangay_token` httpOnly cookie (7-day expiry)
- Barangay logout: `POST /auth/logout` clears the `barangay_token` cookie and writes the token to `BlackListedToken` so it cannot be reused
- JWT token utility (`generateToken`) and auth middleware (`authenticate`, `requireRoles`)
- `authenticate` middleware accepts both `barangay_token` cookie and `Authorization: Bearer` header; checks every token against the `BlackListedToken` table before allowing access
- `cookie-parser` middleware registered in `server.js` to parse httpOnly cookies
- `BlackListedToken` model added to Prisma schema (stores revoked tokens until expiry)
- `Role` enum in Prisma schema covers all staff roles: `CAPTAIN`, `SECRETARY`, `TREASURER`, `SK`, `COLLECTOR`, `SUPER_ADMIN`, `RESIDENT`
- Protected dashboard route: `GET /dashboard` (requires valid JWT + CAPTAIN role)

- Barangay login frontend connected and bug fixed
- Toast notifications added to the resident capture page (via `sonner`)
- `useUpdate` custom hook: sends `PATCH /api/pickup-requests/collection-requests/:id` with `{ status, rejectionReason }`; returns `true` on success
- Reusable `Modal` component (`components/ui/Modal.jsx`): rendered via `createPortal`, accepts `title`, `subtitle`, `icon`, `status` (for pill), `confirmLabel`, `confirmClassName`, `onConfirm`, `onClose`, and `children`
- Pickup collection end-to-end: barangay admin can **approve** or **decline** `REQUESTED` pickups directly from the collection requests table; decline opens a modal for rejection reason input; toast feedback on success/error; list auto-refetches via `refetchCount` state
- `ApprovedActions` component: barangay admin can **schedule** an approved request, moving it from `APPROVED` → `IN_PROGRESS` (sets `isScheduled: true`)
- `InProgressActions` component: barangay admin can **complete** an in-progress request via a modal that captures actual weight and unit, transitioning `IN_PROGRESS` → `COLLECTED` (sets `collectedAt`, `actualWeight`, `weightUnit`)
- Batch collection wired to backend: selecting multiple approved requests and clicking "Create Batch Collection" fires `Promise.all` of `PATCH` requests, moving each to `IN_PROGRESS`; toast feedback on full success or partial failure; list auto-refetches and selection clears on success
- `updateStatus` backend controller extended to handle all 4 status transitions: `APPROVED` (sets `approvedAt`), `IN_PROGRESS` (sets `isScheduled`), `COLLECTED` (sets `collectedAt`, `actualWeight`, `weightUnit`), `REJECTED` (sets `rejectedAt`, `rejectionReason`)
- `useUpdate` hook extended to forward `actualWeight` and `weightUnit` to the backend
- Full request lifecycle now wired end-to-end: `REQUESTED` → `APPROVED` → `IN_PROGRESS` → `COLLECTED` (or `REJECTED` from `REQUESTED`)

---

## In Progress

- Nothing currently active

---

## Next Steps

1. Integrate real Semaphore API key so OTP sends actual SMS (currently logs to console in dev)
2. Connect capture page to backend (submit captured image as a pickup request)
3. Build resident requests page backend integration (list own requests, see status)
4. Continue with intake module after request lifecycle is stable

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
