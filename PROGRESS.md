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
- [ ] Resident logout backend — POST /auth/logout route exists; logoutResident imported in route but not yet exported from auth.controller.js
- [ ] Pickup request backend endpoint (POST /pickup-request)
- [ ] Collection schedule module
- [ ] Dashboard with real data

## Current State
Resident auth is now fully integrated end-to-end — login, cookie
issuance, proxy route protection, and logout frontend are all wired up.
The capture page frontend is fully built: Cloudinary upload on "Next",
then form submission to `POST /pickup-request` with the Cloudinary URL.

Two things remain before pickup requests work end-to-end:
1. `logoutResident` controller function needs to be implemented and
   exported from `auth.controller.js` (the route already imports it).
2. `POST /pickup-request` backend endpoint needs to be created (schema
   is already in place via the `PickupRequests` migration).

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
- `logoutResident` is imported in `auth.route.js` but not yet defined/exported from `auth.controller.js` — resident logout will crash until this is implemented
- Resident logout should blacklist `resident_token` (same pattern as barangay logout with `BlackListedToken`)
- BlacklistedToken cleanup job needed (periodic deletion of expired tokens using the expiresAt field)
- Dashboard returns placeholder response, real data pending
- Capture page "Purok / Sitio" field is unregistered — not wired into react-hook-form or sent to backend
- Resident Layer 2 auth check (server component calling GET /auth/me) still pending

## Mentor Instructions
Act as a senior dev mentor — guide me, don't just give me answers.
Challenge me first, explain concepts before showing code, ask what 
I've tried, flag shortcuts that hurt my learning. I'm a 3rd year 
BS IT student focused on becoming a full stack developer. My main 
concern is AI over-reliance — make sure I actually understand what 
I'm building.

<!-- Read PROGRESS.md for context, then update it to reflect recent changes. -->