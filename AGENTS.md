# ECOPROFIT - AI Project Instructions

## Project Overview
ECOPROFIT is a barangay waste management and community buyback system.

It enables residents to contribute recyclable materials and allows the barangay to:
- collect and record materials
- track material stock (MRF)
- manage redemption programs (waste-to-goods/services/medicine)
- manage program funds, including expenses, income/proceeds, and profits
- generate reports

This system is based on real barangay operations in Barangay Beddeng Laud, Vigan City.

---

## Tech Stack
- Frontend: Next.js (JavaScript, Tailwind CSS)
- Backend: Node.js + Express
- Database: PostgreSQL
- ORM: Prisma

---

## Project Structure
- `/frontend` -> Next.js app
- `/backend` -> Express API
- `/docs` -> system documentation
- `AGENTS.md` -> AI instructions

---

## Core System Concept

All recyclable materials must be recorded as a **Contribution / Intake Transaction**.

There are two intake categories:

1. **Pickup-Based Intake**
   - Sunday EcoAid household collection
   - Override / on-demand pickup requests

2. **Direct Intake**
   - Event-based collection
   - Barangay hall exchange (waste-to-goods/services)
   - Other direct barangay submissions

---

## Key Rule

> Materials are sorted immediately during collection or intake.

There is NO delayed sorting workflow.

---

## Core Modules

### 1. Collection Requests
- Handles override / on-demand pickup requests
- Status:
  - REQUESTED
  - APPROVED
  - IN_PROGRESS
  - COLLECTED
  - REJECTED

Note:
- Sunday EcoAid is a regular scheduled household collection, not a request flow.

---

### 2. Collection & Sorting (Intake Module)
- Records actual materials received
- Supports multiple source types:
  - SUNDAY_ECOAID
  - PICKUP_REQUEST
  - EVENT_COLLECTION
  - BARANGAY_EXCHANGE
- Materials are sorted and recorded immediately

---

### 3. Material Stock (MRF)
- Read-only module
- Derived from recorded intake transactions
- Shows total materials by type, weight, and intended use

---

### 4. Redemption Programs
- Defines waste-to-goods/services/medicine programs
- Contains:
  - eligibility rules
  - reward mappings

---

### 5. Reward Inventory
- Tracks goods, medicine, supplies, and service outputs
- Deducted or recorded when rewards are claimed/released

---

### 6. Program Funds
- Tracks program-related financial activity
- Includes:
  - expenses
  - income/proceeds
  - profits
  - other financial records related to barangay recycling programs

---

## Reward Logic

- Rewards are based on verified/sorted contributions
- Users can see eligible rewards after intake is recorded
- Rewards are claimed later, not during collection

---

## Current Focus

Resident-side auth pages are already fixed and considered stable.

Completed and now stable:
- onboarding
- login
- signup
- OTP validation
- forgot password
- barangay login

Current implementation target:
- resident signup address selection
- barangay input with autocomplete suggestions while typing
- only show registered barangays from the database
- sitio input as a dependent dropdown/select
- disable sitio until a barangay is selected
- refresh sitio options when barangay changes
- reset sitio when barangay changes
- validate that the barangay exists
- validate that the selected sitio belongs to the selected barangay
- replace any temporary or mock address values with backend/database-driven data

Data source rules:
- use only the project's own backend and database
- do NOT use third-party or external address APIs
- barangay options must come from registered barangay records managed by the system

Implementation approach:
- keep the solution simple and beginner-friendly
- prefer clear and maintainable patterns over abstraction
- do not over-engineer for production-scale scenarios yet
- avoid unnecessary refactoring of already stable auth pages

---

## Rules for Codex

- Do NOT rewrite entire files unless asked
- Follow existing project structure
- Keep frontend and backend responsibilities separate
- Use JavaScript consistently
- Use Prisma for database access
- Keep logic simple and modular
- Do not introduce unnecessary complexity
- Do not assume TypeScript unless explicitly requested

---

## How to Help

When assisting:
- Focus only on the requested feature
- Suggest minimal, clean implementations
- Align with existing architecture
- Preserve business rules from `/docs`
- Do not reopen or refactor stable auth UI flows unless the request explicitly requires it
- For signup address inputs, prefer backend-driven autocomplete and dependent dropdown behavior over hardcoded frontend lists
