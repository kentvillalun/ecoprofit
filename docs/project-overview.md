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

The full resident authentication flow is complete and connected to the backend.

Stable and fully working:
- onboarding
- resident login (connected to backend, bcrypt password check)
- signup with barangay autocomplete and sitio dependent dropdown (connected to backend)
- OTP validation (6-digit input, resend cooldown, backend verify/resend endpoints)
- forgot password full flow: phone entry → OTP → reset password (all connected to backend)
- resident capture page (camera access, image preview, submit UI — backend not yet connected)

OTP notes:
- Backend uses Semaphore API for SMS. Without a `SEMAPHORE_API_KEY`, OTP is printed to the server console (dev mode).
- Real SMS delivery requires setting `SEMAPHORE_API_KEY` in `backend/.env`.

Barangay login status:
- UI exists at `/barangay/login` with phone number and password fields
- Backend endpoint implemented: `POST /auth/barangay/login` (phone + password, returns JWT)
- Frontend is not yet connected — login button has no handler; wiring up the form is the current implementation target

After barangay login is connected, work continues with the request lifecycle backend.

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
