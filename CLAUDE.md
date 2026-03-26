# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EcoProfit** is a barangay waste management and community buyback system for residents to contribute recyclable materials, with barangay admins managing collections, inventory, redemption programs, and finances. Based on real operations in Barangay Beddeng Laud, Vigan City.

## Commands

### Frontend (Next.js — run from `frontend/`)
```bash
npm run dev     # Dev server at http://localhost:3000
npm run build   # Production build
npm run lint    # ESLint
```

### Backend (Express — run from `backend/`)
```bash
npm run dev     # Nodemon dev server at http://localhost:5001
npm run seed    # Seed DB with dev data (barangay + admin account)
```

### Database
```bash
# From backend/
npx prisma migrate dev   # Apply migrations
npx prisma generate      # Regenerate Prisma client after schema changes
npx prisma studio        # GUI to inspect database
```

## Architecture

Monorepo with separate `frontend/` and `backend/` directories. Frontend calls backend over HTTP; no shared code between them.

```
frontend (Next.js) ──HTTP──► backend (Express) ──Prisma──► PostgreSQL
     :3000                        :5001
```

### Backend (`backend/src/`)
- `server.js` — Express app, CORS, middleware
- `config/db.js` — Prisma client singleton (connect/disconnect)
- `routes/` — Route definitions (currently only `auth.route.js`)
- `controllers/` — Business logic per route file
- `utils/sms.js` — Semaphore SMS API; in dev mode logs OTP to console instead of sending
- `prisma/schema.prisma` — Source of truth for DB schema
- `prisma/seed.js` — Dev seed: creates Barangay Beddeng Laud + admin account (+639990000001 / barangay123) + 3 sitios

### Frontend (`frontend/src/`)
- `app/(auth)/` — Login, signup, OTP, forgot-password, barangay admin login
- `app/(resident)/` — Resident dashboard (home, profile, capture, requests, etc.)
- `app/(barangay)/` — Barangay admin pages (collection requests management)
- `app/(intro)/` — Onboarding flow
- `components/` — Shared components organized by domain (auth, layout, navigation, requests, ui)

### Database Models
- `Barangay` — Registered barangay organizations
- `Sitio` — Sub-divisions within a barangay (unique per barangay)
- `User` — Residents and admins; roles: `RESIDENT`, `BARANGAY_ADMIN`, `SUPER_ADMIN`
- `OtpVerification` — SMS OTP codes with expiration

### Current Auth API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/auth/barangays?search=` | Search registered barangays (max 10) |
| GET | `/auth/barangays/:id/sitios` | List sitios for a barangay |
| POST | `/auth/register` | Register + send OTP |
| POST | `/auth/login` | Login by phone + password |
| POST | `/auth/verify-otp` | Verify OTP + create user |
| POST | `/auth/resend-otp` | Resend OTP |

## Key Rules

- **JavaScript only** — no TypeScript
- **Prisma for all DB access** — no raw SQL
- **Do not rewrite stable files** — especially auth pages; only modify what a feature requires
- **No third-party address APIs** — use own DB for barangay/sitio data
- Use `react-hook-form` + `yup` for forms in the frontend
- Frontend and backend are separate concerns; keep them that way

## Docs

- `docs/project-overview.md` — System description and current focus
- `docs/business-rules.md` — Core rules governing the domain
- `docs/module-boundaries.md` — What each module owns and must not cross
- `docs/current-progress.md` — What's done and what's next
- `AGENTS.md` — AI-specific development guidelines (read before making significant changes)
