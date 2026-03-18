# Module Boundaries

## Collection Requests
Handles override / on-demand pickup requests only.

This module is responsible for pickup workflow status changes:
- REQUESTED
- APPROVED
- IN_PROGRESS
- COLLECTED
- REJECTED

## Collection & Sorting
Handles recording of actual recyclable materials from:
- Sunday EcoAid
- pickup requests that are being collected
- event-based collection
- barangay exchange

All materials are sorted immediately and recorded as intake transactions.

## Material Stock
Read-only view of recyclable materials already recorded through intake transactions.

## Redemption Programs
Defines eligibility rules and exchange or reward mappings for waste-to-goods, waste-to-medicine, and waste-to-services.

## Reward Inventory
Tracks goods, medicine, supplies, and service outputs available for claim or release.

## Program Funds
Tracks financial records such as:
- expenses
- income/proceeds
- profits
- fund-related summaries
