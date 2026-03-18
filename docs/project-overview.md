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
