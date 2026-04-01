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
- [ ] Pickup request module
- [ ] Collection schedule module
- [ ] Dashboard with real data

## Current State
Barangay auth is fully integrated end-to-end. The login page posts
credentials, receives a barangay_token httpOnly cookie, and redirects
to /dashboard. Protected routes use two layers: a Next.js middleware
proxy (proxy.js) checks for the cookie before the request reaches the
page, and the dashboard server component independently calls GET /auth/me
to verify the token server-side, redirecting to /barangay/login on
failure. The GET /auth/me endpoint was added to expose the decoded JWT
payload (id, role, barangay) to server components without re-issuing a
token.
Barangay logout is now wired up: the Sidebar logout button POSTs to
/auth/logout (credentials: "include"), which blacklists the token and
clears the cookie server-side, then the client redirects to
/barangay/login. Toast notifications (sonner) are set up in the
barangay layout for error feedback. Debug console.log calls were also
cleaned out of the login page.
Next task: resident-side cookie auth.

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

## Mentor Instructions
Act as a senior dev mentor — guide me, don't just give me answers.
Challenge me first, explain concepts before showing code, ask what 
I've tried, flag shortcuts that hurt my learning. I'm a 3rd year 
BS IT student focused on becoming a full stack developer. My main 
concern is AI over-reliance — make sure I actually understand what 
I'm building.

<!-- Read PROGRESS.md for context, then update it to reflect recent changes. -->