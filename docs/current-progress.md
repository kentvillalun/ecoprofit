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

- **Username/password auth system**: `username` field added to `User` model (unique, optional for backward compat); login for both residents and barangay staff now accepts `username` instead of `phoneNumber`
- Signup flow now collects `firstName`, `lastName`, and `username` upfront; backend validates uniqueness and passes them through `register` → `verifyOtp` → `prisma.user.create`
- `authenticateResident` and `authenticateBarangay` split from the single `authenticate` middleware — each only accepts its own cookie (`resident_token` / `barangay_token`), preventing cross-role token acceptance
- `GET /auth/me` now uses `authenticateResident`; new `GET /auth/barangay/me` added using `authenticateBarangay`
- All pickup-request routes updated: resident routes use `authenticateResident`, barangay collection-request routes use `authenticateBarangay`
- `frontend/src/lib/roles.js` created — exports `BARANGAY_ROLES` array for reuse across frontend
- Seed updated: dev admin account now seeded with `username: "barangayadmin"`
- Signup page stores `otpFlow: "signup"` in `sessionStorage` before pushing to `/otp`

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

- `ASSORTED` MaterialType — added to `MaterialType` enum in schema; capture page dropdown and yup validation updated to include it
- `CollectionItem` Prisma model — per-material breakdown stored at collection time (`requestId`, `materialType`, `actualWeight`, `weightUnit`)
- `updateStatus` COLLECTED handler upgraded — creates `CollectionItem` records before updating request status; replaces single `actualWeight`/`weightUnit` fields on the request row
- `useUpdate` hook — now forwards `items` array to the backend for the COLLECTED transition
- `InProgressActions` redesigned — simple mode (single weight input) for non-ASSORTED requests; ASSORTED mode shows a dynamic table of rows (materialType/actualWeight/weightUnit) with add/remove row support
- "Finalized Collection" card — detail page `/collection-requests/[id]` shows a breakdown table of `collectionItems` when status is `COLLECTED`; `getRequest` controller now selects `collectionItems` relation
- Capture page sitio auto-fetch — fetches resident's sitio from `GET /auth/me` on mount; displays it as a read-only field
- Login page session guards — redirects to `/home` if already logged in; redirects to `/onboarding` if user hasn't seen it
- Root page redirect — `app/page.js` redirects `/` to `/login`

- **Redemption module — backend foundation**:
  - `Program` model — stores redemption program name, allotted budget, and max points
  - `ProgramMaterial` model — per-material point value scoped to a program; unique constraint on `(programId, materialType)`
  - `RedemptionTransaction` model — records each redemption event: `programMaterialId`, `quantity`, `collectorName`, `beneficiaryName`, `educationalLevel` (`PRIMARY`/`SECONDARY`/`TERTIARY`), and `currentPointValue` snapshot (preserves value at time of transaction)
  - `EducationalLevel` enum added to schema
  - `redemption.controller.js` — `createProgram`, `getPrograms`, `getProgram`, `createTransaction`, `getTransactions`; `createTransaction` snapshots the current `pointValue` from `ProgramMaterial` before writing the record
  - `redemption.route.js` — all routes protected by `authenticateBarangay` + `requireRoles(["CAPTAIN", "SECRETARY", "SK"])`; registered at `/redemption` in `server.js`
  - Endpoints: `POST /redemption/programs`, `GET /redemption/programs`, `GET /redemption/programs/:id`, `POST /redemption/transactions`, `GET /redemption/transactions`

- **Redemption Management frontend scaffold**:
  - `app/(barangay)/redemption-programs/page.jsx` — page with Programs section (cards) and Transaction History section; "Add Program" button opens `AddProgramModal` via `createPortal`; currently driven by mock data
  - `TransactionTable` — desktop table showing beneficiary, program·material, quantity, computed points (`quantity × currentPointValue`), and date; hidden on mobile
  - `TransactionCard` — mobile card view of the same data; hidden on desktop
  - `AddProgramModal` — modal form for creating a new program (name, allotted budget, max points, per-material point values for Plastics/Metals/Bottles/Papers); UI complete, **not yet wired to backend**
  - `Badge` — reusable pill badge component accepting `label` and `color` props (used in `TransactionCard`)
  - `Modal` — added `isPill` prop; when true, renders a `Pill` status chip next to the modal title (used by `PendingActions` and `InProgressActions`)

---

## In Progress

- Redemption Management frontend: wire `AddProgramModal` to `POST /redemption/programs`; add "Record Transaction" modal wired to `POST /redemption/transactions`; replace mock data with real API calls

---

## Next Steps (priority order)

1. Finish wiring Redemption Management frontend to backend (create program, record transaction, fetch real data)
2. Build Manual Collection Intake module (Sunday EcoAid manual entry flow with resident search)
3. Build Leaderboard (resident ranking by total contribution)
4. Build Reward Inventory module
5. Build Program Funds module (expenses, junkshop income, profits)
6. Build Material Stock read-only view
7. Reports module

---

## Notes

- Auth frontend bugs are no longer an active work area
- Login is now username-based (not phone number) for both residents and barangay staff
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
