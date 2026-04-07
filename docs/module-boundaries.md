# Module Boundaries

## Collection Requests
Handles override / on-demand pickup requests only. Responsible for the pickup workflow: REQUESTED, APPROVED, IN_PROGRESS, COLLECTED, REJECTED. Supports ASSORTED material type — finalized by collector at completion.

---

## Manual Collection Intake
Records actual recyclable materials from all sources: Sunday EcoAid, pickup requests being completed, event-based collection, and barangay exchange. All materials are sorted immediately and recorded as intake transactions. Sunday EcoAid entries with no prior request are manually entered here by searching the resident. Entries are flagged with source type and hasAppRecord status.

---

## Material Stock
Read-only view of recyclable materials derived from completed intake transactions. No manual input here.

---

## Redemption Management
SK creates and manages programs (e.g. basura to school supplies). Each program has a name, allocated budget, max points, and point values per material category stored in a junction table (ProgramMaterial). Redemption transactions are recorded here and frozen to the exact ProgramMaterial row. Designed to support future programs.

---

## Reward Inventory
Tracks goods, medicine, supplies, and service outputs available for release. Releasing of rewards happens here. Plant inventory is managed here with expenses logged in Program Funds.

---

## Program Funds
Tracks all financial records: expenses, junkshop sale proceeds, profits, and fund summaries. Junkshop receipts are inputted here as income.

---

## Leaderboard
Ranks residents by total recyclable contribution. Includes both app-based and manual entries. Serves as recognition for the barangay and motivation for residents.
