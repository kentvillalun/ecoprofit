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
| POST   | `/auth/login`                       | Resident login by username + password            |
| POST   | `/auth/verify-otp`                  | Verify OTP + activate account                    |
| POST   | `/auth/resend-otp`                  | Resend OTP (signup or forgot-password flow)      |
| POST   | `/auth/forgot-password`             | Send password reset OTP                          |
| POST   | `/auth/verify-forgot-password-otp`  | Verify password reset OTP                        |
| POST   | `/auth/reset-password`              | Set new password after OTP verified              |
| POST   | `/auth/barangay/login`              | Barangay staff login — sets `barangay_token` httpOnly cookie |
| POST   | `/auth/logout`                      | Logout — clears cookie, blacklists token         |
| GET    | `/auth/me`                          | Resident: returns id, role, barangay from JWT    |
| GET    | `/auth/barangay/me`                 | Barangay staff: returns id, role from JWT        |

### Resident (`/resident`)

Protected by `authenticateResident` middleware.

| Method | Path                     | Description                                              |
|--------|--------------------------|----------------------------------------------------------|
| GET    | `/resident/me`           | Returns resident profile (name, sitio, barangay, phone)  |
| GET    | `/resident/barangay-info`| Returns resident's barangay info (name, city, contact, registration status) |

### Pickup Requests (`/pickup-requests`)

| Method | Path                                    | Required role                       | Description                           |
|--------|-----------------------------------------|-------------------------------------|---------------------------------------|
| POST   | `/pickup-requests/`                     | RESIDENT                            | Submit new pickup request             |
| GET    | `/pickup-requests/my-requests`          | RESIDENT                            | List authenticated resident's requests |
| GET    | `/pickup-requests/collection-requests`  | CAPTAIN, SECRETARY, COLLECTOR       | List all pickup requests              |
| GET    | `/pickup-requests/collection-requests/:id` | CAPTAIN, SECRETARY, COLLECTOR    | Get single request detail             |
| PATCH  | `/pickup-requests/collection-requests/:id` | CAPTAIN, SECRETARY, COLLECTOR    | Update request status                 |

### Redemption (`/redemption`)

Protected by `authenticateBarangay + requireRoles(["CAPTAIN","SECRETARY","SK"])`.

| Method | Path                          | Description                                       |
|--------|-------------------------------|---------------------------------------------------|
| POST   | `/redemption/programs`        | Create redemption program                         |
| GET    | `/redemption/programs`        | List all programs                                 |
| GET    | `/redemption/programs/:id`    | Get program detail with materials and transactions |
| PATCH  | `/redemption/programs/:id`    | Update program and upsert material point values   |
| POST   | `/redemption/transactions`    | Record a redemption transaction                   |
| GET    | `/redemption/transactions`    | List all redemption transactions                  |

### Dashboard (`/dashboard`)

| Method | Path           | Required role | Description           |
|--------|----------------|---------------|-----------------------|
| GET    | `/dashboard`   | CAPTAIN       | Barangay dashboard (placeholder) |

---

## Database Models

- `Barangay` — Registered barangay organizations; fields include `name`, `city`, `code`, `isRegistered`, `contactNumber`
- `Sitio` — Sub-divisions within a barangay (unique per barangay)
- `User` — Residents and barangay staff; roles: `RESIDENT`, `CAPTAIN`, `SECRETARY`, `TREASURER`, `SK`, `COLLECTOR`, `SUPER_ADMIN`; `username` field for login
- `OtpVerification` — SMS OTP codes with expiration
- `PasswordResetToken` — Tokens for forgot-password flow
- `BlackListedToken` — Revoked JWTs; checked on every authenticated request
- `PickupRequests` — Resident pickup requests with `MaterialType`, `WeightUnit`, `Status` enums
- `CollectionItem` — Per-material breakdown recorded at collection time (child of `PickupRequests`)
- `Program` — Redemption program with allotted budget, max points, description, and active flag
- `ProgramMaterial` — Per-material point value scoped to a program (junction table)
- `RedemptionTransaction` — Records each redemption event with a frozen `currentPointValue` snapshot

---

## Frontend Pages

| Route group      | Pages                                                                                       |
|------------------|---------------------------------------------------------------------------------------------|
| `(intro)`        | Onboarding flow                                                                             |
| `(auth)`         | Login (with splash screen), signup, OTP verification, forgot password, reset password, barangay login |
| `(resident)`     | Home (live data: profile + recent requests), community (live barangay info), capture, requests, profile, announcements |
| `(barangay)`     | Dashboard, collection requests (list + detail), redemption programs (list + detail)         |

---

## Current Status

Both resident and barangay auth flows are complete and stable (username-based login, OTP, forgot password, split middleware). The full pickup request lifecycle is wired end-to-end on the barangay side (REQUESTED → APPROVED → IN_PROGRESS → COLLECTED or REJECTED, including batch collection and ASSORTED material breakdown). The Redemption Management module is fully wired end-to-end (programs with create/edit/deactivate, transactions, program detail page). The resident home page and community page fetch live data from the backend (profile, recent requests, barangay contact info). The app ships as a PWA with web manifests and a splash screen on login.

Next focus: Manual Collection Intake module (Sunday EcoAid manual entry with resident search).

See `docs/current-progress.md` for a detailed breakdown of what is done and what is next.

---

## Documentation

- `docs/project-overview.md` — system description and current development status
- `docs/business-rules.md` — core rules governing the domain
- `docs/module-boundaries.md` — what each module owns
- `docs/current-progress.md` — completed features and next steps