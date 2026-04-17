# EcoProfit - AI Context File

## Stack
- Frontend: Next.js (PWA for resident, dashboard for barangay)
- Backend: Node.js + Express
- Database: PostgreSQL
- ORM: Prisma
- Auth: JWT with httpOnly cookies
- SMS: Semaphore OTP
- Roles: RESIDENT, CAPTAIN, SECRETARY, TREASURER, SK, COLLECTOR, SUPER_ADMIN

## What's Built
- [x] Resident signup with barangay/sitio autocomplete
- [x] OTP verification via Semaphore SMS
- [x] Resident login
- [x] Barangay login with JWT token generation
- [x] Auth endpoints:
      POST /auth/register
      POST /auth/verify-otp
      POST /auth/resend-otp
      POST /auth/login
      POST /auth/barangay/login
      POST /auth/forgot-password
      POST /auth/verify-forgot-password-otp
      POST /auth/reset-password
      POST /auth/logout
      GET  /auth/me (returns id, role, barangay from JWT)
- [x] JWT middleware: authenticate and requireRoles
- [x] httpOnly cookie authentication
- [x] Token blacklist (BlacklistedToken table)
- [x] Logout endpoint (clears cookie + blacklists token)
- [x] Protected route: GET /dashboard (CAPTAIN only)
- [x] Barangay login page with form validation (fully integrated end-to-end)
- [x] Proxy route protection (Layer 1) — middleware in frontend/src/proxy.js
- [x] Server component auth verification (Layer 2) — dashboard page calls GET /auth/me and redirects on failure
- [x] Shared config: frontend/src/lib/config.js exports API_BASE_URL
- [x] Barangay logout — Sidebar button calls POST /auth/logout with credentials: "include", clears cookie, redirects to /barangay/login; toast notifications via sonner
- [x] Pickup request schema — PickupRequests model with MaterialType, WeightUnit, Status enums; migration applied (20260401174639_add_pickup_request)
- [x] Capture page Cloudinary upload — photo uploads to Cloudinary on "Next" click; cloudinaryUrl stored for later submission; retake resets the URL; loading state disables button; sonner toast on upload error
- [x] Resident cookie auth — POST /auth/login sets `resident_token` httpOnly cookie (7-day); authenticate middleware reads it; proxy Layer 1 guards resident routes (/home, /capture, /requests, /profile, /announcements, /community); login page wired end-to-end with credentials: "include", RESIDENT role guard, localStorage session store, redirect to /home
- [x] Resident logout frontend — Profile page logout button calls POST /auth/logout with credentials: "include"; redirects to /login on success; Toaster for error feedback
- [x] Capture page form submission wired to backend — onSubmit calls POST /pickup-request with credentials: "include"; sends materialType, estimatedWeight, weightUnit, notes, photoUrl (Cloudinary); shows success modal on 200; toast on error
- [x] Barangay sidebar logout endpoint corrected — Sidebar now calls POST /auth/barangay/logout (was /auth/logout)
- [x] Resident logout backend — logoutResident implemented and exported from auth.controller.js; blacklists resident_token cookie and clears it
- [x] Pickup request backend endpoint — POST /pickup-requests route created; controller validates required fields, reads userId from JWT, writes to PickupRequests table via Prisma; mounted in server.js at /pickup-requests; protected by authenticate + requireRoles(["RESIDENT"])
- [x] Deployment — backend deployed to Railway; `backend/package.json` postinstall runs `prisma generate`; CORS origin via `CORS_ORIGIN` env var; cookie `sameSite: "none"` for cross-origin production auth
- [x] Frontend API proxy — `next.config.mjs` rewrites `/api/:path*` to backend; env-based URL switches between localhost:5001 (dev) and Railway URL (prod); `allowedDevOrigins` set for LAN dev
- [x] Proxy middleware matcher hardened — explicit `matcher` array added to `proxy.js` covering all barangay + resident routes; `"/"` included as resident-guarded root
- [x] Onboarding step text updated — steps 2, 3, and 4 rewritten to accurately reflect the redemption/rewards model and pickup request lifecycle; removed inaccurate "weighed and paid" framing
- [x] `<img>` → Next.js `<Image>` — signup and onboarding pages now use `next/image` for optimized image loading
- [x] Capture page upload toast — loading toast shown while Cloudinary upload is in flight; dismissed and replaced with success toast on completion; error toast on failure
- [x] Barangay login bug fix — corrected redirect/token handling in auth.controller.js and barangay/login/page.jsx; simplified dashboard/page.jsx (removed redundant auth logic)
- [x] `useFetch` custom hook — `frontend/src/hooks/useFetch.js` wraps GET requests with `isLoading`, `isError`, `data`, `error` state; accepts `refetchCount` to re-trigger fetches; uses `credentials: "include"` automatically
- [x] `useUpdate` custom hook — `frontend/src/hooks/useUpdate.js` wraps PATCH requests; exposes `updateStatus({ id, status })` function with loading/error state
- [x] Collection requests management UI (barangay side) — tabbed page at `/collection-requests` with Pending / Approved / In Progress / Collected / Rejected tabs; `RequestCard` (mobile) and `RequestTable` (desktop) components; batch "Create Batch Collection" action for approved requests
- [x] Pickup request backend endpoints live — `GET /pickup-requests/collection-requests` and `PATCH /pickup-requests/collection-requests/:id` uncommented and active; protected by `authenticate + requireRoles(["CAPTAIN","SECRETARY","COLLECTOR"])`
- [x] Collection requests UI wired to real backend — `useFetch` replaces mock data; `handleRefetchCount` increments `refetchCount` to trigger re-fetch after mutations
- [x] Approve action wired end-to-end — `PendingActions` calls `useUpdate.updateStatus({ id, status: "APPROVED" })` then `handleRefetchCount()`; table refreshes automatically
- [x] Decline modal UI built — `Modal` component at `frontend/src/components/ui/Modal.jsx` with rejection reason textarea, Cancel/Decline buttons; not yet wired to `updateStatus`
- [x] Make Modal reusable with React Portal (render outside DOM tree to avoid stacking context issues)
- [x] Wire Decline modal: pass `id` + `handleRefetchCount` into Modal; on submit call `updateStatus({ id, status: "REJECTED", rejectionReason })` then close modal and refetch
- [x] actualWeight input UI for COLLECTED action
- [x] `GET /pickup-requests/collection-requests/:id` backend endpoint — `getRequest` controller fetches single request with full user/sitio/timeline fields; added to route and exported
- [x] `formatDate` utility — `frontend/src/lib/formatDate.js` formats ISO date strings to human-readable locale strings (e.g. "Apr 10, 2026, 3:00 PM")
- [x] `LabelValue` component — `frontend/src/components/ui/LabelValue.jsx` renders a label + value pair used across detail cards
- [x] `RequestDetailHeader` component — card with back button (`history.back()`), clipboard icon, title, and status `Pill`
- [x] View Details full page — `/collection-requests/[id]` fetches via `useFetch`; shows Resident Info, Request Info, Photo Evidence, and Timeline cards (timeline entries shown conditionally per status); renders `PendingActions` / `ApprovedActions` / `InProgressActions` card based on current status; `onSuccess` navigates back to list
- [x] `ASSORTED` MaterialType — added to `MaterialType` enum in `schema.prisma`; capture page dropdown and yup schema updated to include `ASSORTED`
- [x] `CollectionItem` Prisma model — stores per-material breakdown at collection time (`requestId`, `materialType`, `actualWeight`, `weightUnit`); related to `PickupRequests` via `collectionItems` relation
- [x] `updateStatus` COLLECTED handler upgraded — now creates `CollectionItem` records via `prisma.collectionItem.createMany` before updating request status; replaces the old single `actualWeight`/`weightUnit` fields on the request row
- [x] `useUpdate` hook updated — `updateStatus` now accepts and forwards an `items` array to the backend for the COLLECTED transition
- [x] `InProgressActions` redesigned — two modes based on `materialType` prop: simple mode (single actual weight + unit input) and ASSORTED mode (dynamic table with add/remove rows, each row has materialType/actualWeight/weightUnit fields)
- [x] "Finalized Collection" card on detail page — `/collection-requests/[id]` shows a collection items breakdown table (materialType, actualWeight, weightUnit) when status is `COLLECTED`; backend `getRequest` now selects the `collectionItems` relation
- [x] Capture page sitio auto-fetch — on mount, page calls `GET /auth/me` and displays the resident's sitio name as a read-only field; removes the "unregistered field" known issue
- [x] Login page session guards — `useEffect` added to redirect to `/home` if localStorage session exists; `useEffect` added to redirect to `/onboarding` if user hasn't seen onboarding
- [x] Root page redirect — `app/page.js` redirects `/` to `/login`
- [x] Username/password auth system — `username` field added to `User` model (unique, optional for backward compat); both resident and barangay login now accept `username`; signup collects `firstName`, `lastName`, `username` upfront; backend validates uniqueness; seed updated with `username: "barangayadmin"`
- [x] Split authenticate middleware — `authenticateResident` and `authenticateBarangay` separated; each only accepts its own cookie, preventing cross-role token acceptance; all pickup-request routes updated accordingly
- [x] `GET /auth/barangay/me` endpoint added using `authenticateBarangay`; existing `GET /auth/me` now uses `authenticateResident`
- [x] `frontend/src/lib/roles.js` — exports `BARANGAY_ROLES` array for reuse across frontend
- [x] Signup page stores `otpFlow: "signup"` in `sessionStorage` before pushing to `/otp`
- [x] Redemption module backend foundation:
      - `Program` model — name, allotted budget, max points
      - `ProgramMaterial` model — per-material point value scoped to a program; unique on `(programId, materialType)`
      - `RedemptionTransaction` model — records each redemption event with `programMaterialId`, `quantity`, `collectorName`, `beneficiaryName`, `educationalLevel`, and `currentPointValue` snapshot
      - `EducationalLevel` enum (`PRIMARY` / `SECONDARY` / `TERTIARY`) added to schema
      - `redemption.controller.js` — `createProgram`, `getPrograms`, `getProgram`, `createTransaction`, `getTransactions`; `createTransaction` snapshots `pointValue` before writing
      - `redemption.route.js` — protected by `authenticateBarangay + requireRoles(["CAPTAIN","SECRETARY","SK"])`; registered at `/redemption` in `server.js`
      - Endpoints: `POST /redemption/programs`, `GET /redemption/programs`, `GET /redemption/programs/:id`, `POST /redemption/transactions`, `GET /redemption/transactions`
- [x] `useMutation` custom hook — `frontend/src/hooks/useMutation.js` wraps POST/PATCH requests; exposes `makeRequest({ url, method, body })` with `isLoading`, `isError`, `error` state; returns `true` on success
- [x] `useFetch` bug fix — `setIsError(false)` now resets before each fetch attempt so stale error state no longer persists across refetches
- [x] `SkeletonCard` component — accepts `rowsCount` prop; renders grey animated placeholder rows while data loads
- [x] `Spinner` component — inline loading spinner for button/modal loading states
- [x] `Error` component — error state card with a "Try again" button that calls `handleRefetchCount` callback
- [x] `Empty` component — empty state card with title and subtext props
- [x] Redemption Management frontend — fully wired to backend:
      - `AddProgramModal` wired to `POST /redemption/programs` via `useMutation`; form validated with `react-hook-form` + `yup`; success triggers program list refetch
      - `RecordTransactionModal` — dependent dropdowns (program → filtered materials); fields: program, material, beneficiary name, collector name, quantity, educational level; wired to `POST /redemption/transactions`; success triggers transaction list refetch
      - `redemption-programs/page.jsx` — mock data replaced with `useFetch`; separate `refetchCount` states for programs and transactions; "Record Transaction" button passes fetched programs into modal
      - `TransactionTable` and `TransactionCard` — now receive live data with loading/error states
- [ ] `/redemption-programs/[id]` detail page (program detail with material breakdown and transaction history)
- [ ] Collection requests 500 error — investigation pending
- [ ] Manual Collection Intake module (Sunday EcoAid manual entry with resident search)
- [ ] Collection schedule module
- [ ] Dashboard with real data

## Current State
App is deployed. Backend runs on Railway (`ecoprofit-production.up.railway.app`).
Frontend proxies `/api/*` to the backend via `next.config.mjs` rewrites, switching
between localhost and Railway based on `NODE_ENV`. CORS origin is now env-var
controlled (`CORS_ORIGIN`). Cookies use `sameSite: "none"` so they work across
origins in production. Pickup requests are fully end-to-end in both dev and prod.

Auth is now username-based for both residents and barangay staff. The `authenticate`
middleware is split into `authenticateResident` and `authenticateBarangay` to prevent
cross-role token acceptance.

The full pickup request lifecycle is end-to-end on the barangay side (list, approve,
decline, schedule, collect, detail page with ASSORTED breakdown). The Redemption
Management module is now fully wired end-to-end — programs and transactions are fetched
from real API data, `AddProgramModal` and `RecordTransactionModal` submit to the backend
via `useMutation`. Next focus: `/redemption-programs/[id]` detail page, investigating
collection requests 500 error, and Manual Collection Intake module.

## Key Decisions Made
- httpOnly cookies over localStorage → XSS protection
- Token blacklist in PostgreSQL → production grade logout
- requireRoles as higher-order function → flexible RBAC
- secure: process.env.NODE_ENV === "production" → works in both dev and prod
- generateToken accepts object → cleaner, more flexible
- cookie-parser registered before routes → cookies available everywhere
- CORS credentials: true → required for cookie based auth
- sonner added for toast notifications in barangay layout → consistent error UX without inline state
- resident_token cookie mirrors barangay_token pattern → same authenticate middleware handles both; proxy distinguishes by cookie name
- sameSite: "none" in production → required for cookies to cross the frontend/backend origin boundary on Railway
- CORS_ORIGIN env var → avoids hardcoding the deployed frontend URL in server.js
- next.config.mjs rewrites → frontend calls /api/* locally; Next.js proxies to backend; no CORS preflight from the browser in prod
- postinstall: prisma generate in backend/package.json → Railway runs it automatically after npm install so the Prisma client is always fresh

## Key Files
- backend/src/controllers/auth.controller.js
- backend/src/controllers/pickup-request.controller.js — pickup request creation
- backend/src/controllers/redemption.controller.js — createProgram, getPrograms, getProgram, createTransaction, getTransactions
- backend/src/middlewares/authMiddleware.js — authenticateResident, authenticateBarangay, requireRoles
- backend/src/routes/auth.route.js
- backend/src/routes/pickup-request.route.js — POST /pickup-requests; GET/PATCH/GET-by-id collection-requests routes; COLLECTED transition creates CollectionItem records
- backend/src/routes/redemption.route.js — redemption program and transaction endpoints
- backend/src/routes/dashboard.route.js
- frontend/src/lib/roles.js — BARANGAY_ROLES array
- backend/src/utils/generateToken.js
- backend/prisma/schema.prisma
- backend/package.json — postinstall: prisma generate (required for Railway deploy)
- frontend/next.config.mjs — /api/* rewrites; env-based backend URL; allowedDevOrigins
- frontend/src/proxy.js — Next.js middleware (Layer 1 route protection) with explicit matcher
- frontend/src/lib/config.js — shared API_BASE_URL constant
- frontend/src/app/(auth)/barangay/login/page.jsx — barangay login form
- frontend/src/app/(barangay)/dashboard/page.jsx — server component with Layer 2 auth check
- frontend/src/app/(barangay)/layout.jsx — barangay layout with DrawerContext + Toaster
- frontend/src/hooks/useFetch.js — reusable GET fetch hook; refetchCount dep triggers re-fetch; resets isError on each attempt
- frontend/src/hooks/useUpdate.js — PATCH hook exposing updateStatus({ id, status, rejectionReason? })
- frontend/src/hooks/useMutation.js — POST/PATCH hook exposing makeRequest({ url, method?, body }); returns true on success
- frontend/src/components/ui/SkeletonCard.jsx — skeleton loader with rowsCount prop
- frontend/src/components/ui/Spinner.jsx — inline loading spinner
- frontend/src/components/ui/Error.jsx — error state with handleRefetchCount callback
- frontend/src/components/ui/Empty.jsx — empty state with title and subtext
- frontend/src/components/redemption/modals/AddProgramModal.jsx — create program form wired to backend
- frontend/src/components/redemption/modals/RecordTransactionModal.jsx — record transaction form with dependent selects, wired to backend
- frontend/src/app/(barangay)/collection-requests/page.jsx — tabbed collection requests management UI
- frontend/src/app/(barangay)/collection-requests/[id]/page.jsx — full request detail page with timeline and action cards
- frontend/src/lib/formatDate.js — ISO date → readable locale string
- frontend/src/components/requests/RequestDetailHeader.jsx — header card with back button and status pill
- frontend/src/components/ui/LabelValue.jsx — label/value pair display component
- frontend/src/app/(resident)/capture/page.jsx — Cloudinary upload + pickup request submission
- frontend/src/app/(resident)/profile/page.jsx — resident logout
- frontend/src/components/navigation/Sidebar.jsx — sidebar with logout handler

## Known Issues / TODO
- BlacklistedToken cleanup job needed (periodic deletion of expired tokens using the expiresAt field)
- Dashboard returns placeholder response, real data pending
- Resident Layer 2 auth check (server component calling GET /auth/me) still pending
- POST /pickup-requests response has a typo: "submittion" → "submission"
- `InProgressActions` ASSORTED modal: minimum 2 rows enforced (removeRow disabled when `items.length === 2`) but rows start empty — no validation before submit (empty materialType/weight are silently sent to backend)
- Collection requests page returning 500 error — root cause not yet investigated
- `/redemption-programs/[id]` detail page not yet built

## Mentor Instructions
Act as a senior dev mentor — guide me, don't just give me answers.
Challenge me first, explain concepts before showing code, ask what 
I've tried, flag shortcuts that hurt my learning. I'm a 3rd year 
BS IT student focused on becoming a full stack developer. My main 
concern is AI over-reliance — make sure I actually understand what 
I'm building.