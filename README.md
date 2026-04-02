# ECOPROFIT

Turning Waste Materials into Worth Through a Community Buyback and Management Platform.

ECOPROFIT is a barangay waste management system that allows residents to contribute recyclable materials and enables the barangay to manage collections, track inventory, run redemption programs, and monitor finances. Based on real operations in Barangay Beddeng Laud, Vigan City.

---

## Project Structure

```
ecoprofit/
├── frontend/   Next.js app (resident and barangay web UI)
├── backend/    Node.js + Express API
└── docs/       System documentation and business rules
```

---

## Requirements

- Node.js 18+
- PostgreSQL database
- npm

---

## Setup

### 1. Clone and install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Configure environment variables

Create `backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"                       # token lifetime, e.g. "7d", "1h"
SEMAPHORE_API_KEY="your-semaphore-key"   # optional in dev — OTP prints to console if omitted
```

### 3. Set up the database

```bash
# From backend/
npx prisma migrate dev     # Apply migrations
npx prisma generate        # Regenerate Prisma client
npm run seed               # Seed dev data (barangay + admin account)
```

The seed creates:
- Barangay Beddeng Laud with 3 sitios
- Admin account: `+639990000001` / `barangay123`

---

## Running the Project

**Backend** (from `backend/`):
```bash
npm run dev     # http://localhost:5001
```

**Frontend** (from `frontend/`):
```bash
npm run dev     # http://localhost:3000
```

Both must be running for the app to work. The frontend calls the backend over HTTP.

---

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4            |
| Backend  | Node.js, Express 5, Prisma 7                    |
| Database | PostgreSQL                                      |
| Auth     | JWT (cookies), bcryptjs, SMS OTP via Semaphore  |
| Forms    | react-hook-form + yup                           |

---

## API Endpoints

### Auth (`/auth`)

| Method | Path                                | Description                                      |
|--------|-------------------------------------|--------------------------------------------------|
| GET    | `/auth/barangays?search=`           | Search registered barangays (max 10)             |
| GET    | `/auth/barangays/:id/sitios`        | List sitios for a barangay                       |
| POST   | `/auth/register`                    | Register resident + send OTP                     |
| POST   | `/auth/login`                       | Resident login by phone + password               |
| POST   | `/auth/verify-otp`                  | Verify OTP + activate account                    |
| POST   | `/auth/resend-otp`                  | Resend OTP (signup or forgot-password flow)      |
| POST   | `/auth/forgot-password`             | Send password reset OTP                          |
| POST   | `/auth/verify-forgot-password-otp`  | Verify password reset OTP                        |
| POST   | `/auth/reset-password`              | Set new password after OTP verified              |
| POST   | `/auth/barangay/login`              | Barangay staff login — sets `barangay_token` httpOnly cookie |
| POST   | `/auth/logout`                      | Barangay staff logout — clears cookie, blacklists token      |

### Dashboard (`/dashboard`)

Protected routes — authenticated via `barangay_token` httpOnly cookie (set by `/auth/barangay/login`) or `Authorization: Bearer <token>` header. The token is checked against the blacklist on every request.

| Method | Path           | Required role | Description           |
|--------|----------------|---------------|-----------------------|
| GET    | `/dashboard`   | CAPTAIN       | Barangay dashboard    |

---

## Database Models

- `Barangay` — Registered barangay organizations
- `Sitio` — Sub-divisions within a barangay (unique per barangay)
- `User` — Residents and barangay staff; roles: `RESIDENT`, `CAPTAIN`, `SECRETARY`, `TREASURER`, `SK`, `COLLECTOR`, `SUPER_ADMIN`
- `OtpVerification` — SMS OTP codes with expiration
- `PasswordResetToken` — Tokens for forgot-password flow
- `BlackListedToken` — Revoked JWTs; checked on every authenticated request

---

## Frontend Pages

| Route group      | Pages                                                        |
|------------------|--------------------------------------------------------------|
| `(intro)`        | Onboarding flow                                              |
| `(auth)`         | Login, signup, OTP verification, forgot password, reset password, barangay login |
| `(resident)`     | Dashboard, profile, capture, requests                        |
| `(barangay)`     | Collection requests management                               |

---

## Current Status

Resident authentication is fully working end-to-end (login, signup, OTP, forgot password, reset password). Barangay staff authentication backend is complete: login issues a `barangay_token` httpOnly cookie, logout clears the cookie and blacklists the JWT via the `BlackListedToken` table. The `authenticate` middleware accepts both the cookie and a `Bearer` token, checking the blacklist on every request. Frontend connection for barangay login is in progress.

See `docs/current-progress.md` for a detailed breakdown of what is done and what is next.

---

## Documentation

- `docs/project-overview.md` — system description and current development status
- `docs/business-rules.md` — core rules governing the domain
- `docs/module-boundaries.md` — what each module owns
- `docs/current-progress.md` — completed features and next steps