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
- [ ] Make Modal reusable with React Portal (render outside DOM tree to avoid stacking context issues)
- [ ] Wire Decline modal: pass `id` + `handleRefetchCount` into Modal; on submit call `updateStatus({ id, status: "REJECTED", rejectionReason })` then close modal and refetch
- [ ] View Details full page — `/collection-requests/[id]` showing full request info
- [ ] actualWeight input UI for COLLECTED action
- [ ] Collection schedule module
- [ ] Collection schedule module
- [ ] Dashboard with real data

## Current State
App is deployed. Backend runs on Railway (`ecoprofit-production.up.railway.app`).
Frontend proxies `/api/*` to the backend via `next.config.mjs` rewrites, switching
between localhost and Railway based on `NODE_ENV`. CORS origin is now env-var
controlled (`CORS_ORIGIN`). Cookies use `sameSite: "none"` so they work across
origins in production. Pickup requests are fully end-to-end in both dev and prod.

The barangay-side collection requests management is now wired end-to-end: the list
fetches from the real backend via `useFetch`, and the Approve action updates status
and refetches via `useUpdate` + `handleRefetchCount`. The Decline modal UI is built
but not yet wired — the next step is making Modal reusable with a React Portal, then
wiring the rejection reason to `updateStatus`, and finally building the
`/collection-requests/[id]` view details page.

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
- backend/src/middlewares/authMiddleware.js
- backend/src/routes/auth.route.js
- backend/src/routes/pickup-request.route.js — POST /pickup-requests (RESIDENT only)
- backend/src/routes/dashboard.route.js
- backend/src/utils/generateToken.js
- backend/prisma/schema.prisma
- backend/package.json — postinstall: prisma generate (required for Railway deploy)
- frontend/next.config.mjs — /api/* rewrites; env-based backend URL; allowedDevOrigins
- frontend/src/proxy.js — Next.js middleware (Layer 1 route protection) with explicit matcher
- frontend/src/lib/config.js — shared API_BASE_URL constant
- frontend/src/app/(auth)/barangay/login/page.jsx — barangay login form
- frontend/src/app/(barangay)/dashboard/page.jsx — server component with Layer 2 auth check
- frontend/src/app/(barangay)/layout.jsx — barangay layout with DrawerContext + Toaster
- frontend/src/hooks/useFetch.js — reusable GET fetch hook; refetchCount dep triggers re-fetch
- frontend/src/hooks/useUpdate.js — PATCH hook exposing updateStatus({ id, status, rejectionReason? })
- frontend/src/app/(barangay)/collection-requests/page.jsx — tabbed collection requests management UI
- frontend/src/app/(resident)/capture/page.jsx — Cloudinary upload + pickup request submission
- frontend/src/app/(resident)/profile/page.jsx — resident logout
- frontend/src/components/navigation/Sidebar.jsx — sidebar with logout handler

## Known Issues / TODO
- BlacklistedToken cleanup job needed (periodic deletion of expired tokens using the expiresAt field)
- Dashboard returns placeholder response, real data pending
- Capture page "Purok / Sitio" field is unregistered — not wired into react-hook-form or sent to backend
- Resident Layer 2 auth check (server component calling GET /auth/me) still pending
- Decline modal not yet wired — clicking "Decline" calls `updateStatus` without a rejectionReason; backend rejects this with 400
- Modal component always renders (no `isOpen` guard) — needs Portal + open/close state before it's usable
- POST /pickup-requests response has a typo: "submittion" → "submission"

## Mentor Instructions
Act as a senior dev mentor — guide me, don't just give me answers.
Challenge me first, explain concepts before showing code, ask what 
I've tried, flag shortcuts that hurt my learning. I'm a 3rd year 
BS IT student focused on becoming a full stack developer. My main 
concern is AI over-reliance — make sure I actually understand what 
I'm building.