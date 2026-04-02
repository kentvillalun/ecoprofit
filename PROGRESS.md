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
- [ ] Resident side cookie auth
- [x] Pickup request schema — PickupRequests model with MaterialType, WeightUnit, Status enums; migration applied (20260401174639_add_pickup_request)
- [x] Capture page Cloudinary upload — photo uploads to Cloudinary on "Next" click; cloudinaryUrl stored for later submission; retake resets the URL; loading state disables button; sonner toast on upload error
- [ ] Pickup request backend endpoint (POST /requests/pickup)
- [ ] Capture page form submission wired to backend
- [ ] Collection schedule module
- [ ] Dashboard with real data

## Current State
Barangay auth is fully integrated end-to-end with two-layer route
protection and logout. The pickup request module has been started on
two fronts:

**Schema:** `PickupRequests` model added to schema.prisma with enums
`MaterialType` (METALS, PAPERS, BOTTLES, PLASTICS), `WeightUnit`
(KG, GRAMS, LBS), and `Status` (REQUESTED, APPROVED, IN_PROGRESS,
COLLECTED, REJECTED). Migration applied.

**Capture page frontend:** Cloudinary upload is wired into the "Next"
button flow — photo is uploaded to Cloudinary first, and only if
successful does the form slide into view. The `cloudinaryUrl` is stored
in state for use when the request is eventually submitted. "Retake"
resets the Cloudinary URL so a new upload is triggered. Sonner Toaster
added to the capture page for upload error feedback.

Next task: wire up the backend POST endpoint for pickup requests, then
connect the capture page form submission to it.

## Key Decisions Made
- httpOnly cookies over localStorage → XSS protection
- Token blacklist in PostgreSQL → production grade logout
- requireRoles as higher-order function → flexible RBAC
- secure: process.env.NODE_ENV === "production" → works in both dev and prod
- generateToken accepts object → cleaner, more flexible
- cookie-parser registered before routes → cookies available everywhere
- CORS credentials: true → required for cookie based auth
- sonner added for toast notifications in barangay layout → consistent error UX without inline state

## Key Files
- backend/src/controllers/auth.controller.js
- backend/src/middlewares/authMiddleware.js
- backend/src/routes/auth.route.js
- backend/src/routes/dashboard.route.js
- backend/src/utils/generateToken.js
- backend/prisma/schema.prisma
- frontend/src/proxy.js — Next.js middleware (Layer 1 route protection)
- frontend/src/lib/config.js — shared API_BASE_URL constant
- frontend/src/app/(auth)/barangay/login/page.jsx — barangay login form
- frontend/src/app/(barangay)/dashboard/page.jsx — server component with Layer 2 auth check
- frontend/src/app/(barangay)/layout.jsx — barangay layout with DrawerContext + Toaster
- frontend/src/components/navigation/Sidebar.jsx — sidebar with logout handler

## Known Issues / TODO
- Resident side: cookie auth + token blacklist still pending
- BlacklistedToken cleanup job needed (periodic deletion of
  expired tokens using the expiresAt field)
- Dashboard returns placeholder response, real data pending
- Capture page: `setError` called in `uploadToCloudinary` but `error` state is not defined — needs a `useState` or replace with `toast.error`
- Capture page: form "Submit Request" button not yet wired to backend; currently just shows success modal

## Mentor Instructions
Act as a senior dev mentor — guide me, don't just give me answers.
Challenge me first, explain concepts before showing code, ask what 
I've tried, flag shortcuts that hurt my learning. I'm a 3rd year 
BS IT student focused on becoming a full stack developer. My main 
concern is AI over-reliance — make sure I actually understand what 
I'm building.

<!-- Read PROGRESS.md for context, then update it to reflect recent changes. -->