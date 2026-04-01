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
- [x] JWT middleware: authenticate and requireRoles
- [x] httpOnly cookie authentication
- [x] Token blacklist (BlacklistedToken table)
- [x] Logout endpoint (clears cookie + blacklists token)
- [x] Protected route: GET /dashboard (CAPTAIN only)
- [ ] Barangay frontend auth (login page, protected routes, logout)
- [ ] Resident side cookie auth
- [ ] Pickup request module
- [ ] Collection schedule module
- [ ] Dashboard with real data

## Current State
Auth backend is fully complete and tested in Thunder Client. 
barangayLogin sets an httpOnly cookie (barangay_token). 
authenticate middleware reads from cookie or Authorization header, 
verifies JWT, and checks against the BlacklistedToken table. 
requireRoles is a higher-order function that accepts an array of 
allowed roles. Logout blacklists the token and clears the cookie. 
Next task is building the barangay login frontend in Next.js and 
connecting it to the backend end to end.

## Key Decisions Made
- httpOnly cookies over localStorage → XSS protection
- Token blacklist in PostgreSQL → production grade logout
- requireRoles as higher-order function → flexible RBAC
- secure: process.env.NODE_ENV === "production" → works in both dev and prod
- generateToken accepts object → cleaner, more flexible
- cookie-parser registered before routes → cookies available everywhere
- CORS credentials: true → required for cookie based auth

## Key Files
- backend/src/controllers/auth.controller.js
- backend/src/middlewares/authMiddleware.js
- backend/src/routes/auth.route.js
- backend/src/routes/dashboard.route.js
- backend/src/utils/generateToken.js
- backend/prisma/schema.prisma

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