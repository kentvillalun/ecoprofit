# Project Overview

## Title
ECOPROFIT: Turning Waste Materials into Worth Through a Community Buyback and Management Platform

---

## Description

ECOPROFIT is a system designed to automate the process of collecting, managing, and utilizing recyclable materials in a barangay.

The system supports:
- community participation in waste contribution
- household collection of recyclables
- event-based and barangay-based intake
- material tracking and utilization
- redemption programs (waste-to-goods/services/medicine)
- financial tracking of expenses, income/proceeds, and profits
- reporting and transparency

---

## Current Development Status

Full resident and barangay authentication flows are complete and stable (username-based login, OTP, forgot password, split `authenticateResident`/`authenticateBarangay` middleware). The full collection request lifecycle is wired end-to-end: REQUESTED → APPROVED → IN_PROGRESS → COLLECTED (or REJECTED), including batch collection, decline modal with rejection reason, and ASSORTED material breakdown at collection. The Redemption Management module is complete end-to-end (programs with create/edit/deactivate/reactivate via `PATCH /redemption/programs/:id`, transactions, program detail page). The login page has a splash screen with session-aware redirect logic. The app ships a PWA-ready web manifest for mobile installation.

The resident home page fetches live data (profile, barangay name, recent pickup requests) and request cards navigate to the request detail page. The community page shows live barangay contact info, EcoAid schedule, and accepted materials. The resident requests list page (`/requests`) is wired end-to-end with Ongoing/History tab filtering. The resident request detail page (`/requests/[id]`) fetches from a new ownership-scoped `GET /pickup-requests/my-requests/:id` endpoint and shows photo, timeline, and collection breakdown. The `Barangay` model has a `contactNumber` field and supporting backend endpoints (`GET /resident/me`, `PATCH /resident/me`, `GET /resident/barangay-info`, `GET /pickup-requests/my-requests`, `GET /pickup-requests/my-requests/:id`).

The resident profile section is complete: `/profile` shows live name and barangay from the API; `/profile/personal-information` is fully wired with edit mode, `PATCH /resident/me` save, and a discard-changes modal. Profile sub-pages for Notification Settings, Settings, and Help & Support exist as UI shells (not yet wired to backend). The `ResidentHeader` component supports an `edit` action type and a `handleClick` prop used by these pages.

The barangay dashboard is partially wired. `GET /dashboard/` returns real DB counts for pending requests, collected pickups, and unverified residents. `GET /dashboard/recent-transactions` returns the last 3 `CollectionItem` records. Three stat cards (Total Recyclables Collected, Total Program Expenses, Current Fund Balance) remain hardcoded until the MRF and Program Funds modules are built. The `User` model has a new `isVerified` field.

The system is deployed. Backend runs on Railway. Frontend proxies via next.config.mjs rewrites.

Active development focus: Manual Collection Intake module (Sunday EcoAid manual entry flow with resident search).

---

## Core Idea

Residents contribute recyclable materials through a unified intake model.

The barangay:
- collects and records materials
- sorts them immediately during collection or intake
- tracks materials in the MRF
- uses materials for:
  - sale (future junkshop partnership)
  - barangay projects
  - shredding/hollow blocks
  - beautification
  - redemption and community programs

---

## Key Principle

> Identification and sorting happen during collection or intake.

This ensures:
- clean data
- immediate reward eligibility
- no delayed processing

---

## Collection Context

There are different ways materials enter the system:

- Sunday EcoAid household collection
- Override / on-demand pickup requests
- Event-based collection
- Barangay hall exchange or direct submission

All materials are recorded as Contribution / Intake transactions using one of these source types:

- SUNDAY_ECOAID
- PICKUP_REQUEST
- EVENT_COLLECTION
- BARANGAY_EXCHANGE

Pickup requests follow this lifecycle:

REQUESTED -> APPROVED -> IN_PROGRESS -> COLLECTED
           ->
            REJECTED

Batch collection moves approved requests into IN_PROGRESS before materials are collected, sorted, and recorded.
