# ECOPROFIT

Turning Waste Materials into Worth Through a Community Buyback and Management Platform.

ECOPROFIT is a barangay waste management system that allows residents to contribute recyclable materials and enables the barangay to manage collections, track inventory, run redemption programs, and monitor finances. Based on real operations in Barangay Beddeng Laud, Vigan City.

---

## Project Structure

```
ecoprofit/
├── frontend/   Next.js app (resident and barangay web UI)
├── backend/    Node.js + Express API
├── docs/       System documentation and business rules
├── AGENTS.md   AI assistant instructions
└── CLAUDE.md   Claude Code instructions
```

---

## Running the Project

**Frontend** (from `frontend/`):
```bash
npm run dev     # http://localhost:3000
```

**Backend** (from `backend/`):
```bash
npm run dev     # http://localhost:5001
npm run seed    # Seed database with dev data
```

The backend requires a PostgreSQL database. Set `DATABASE_URL` in `backend/.env`.

---

## Current Status

Resident authentication is fully working end-to-end. The current active work is connecting the barangay admin login to the backend.

See `docs/current-progress.md` for a detailed breakdown of what is done and what is next.

---

## Documentation

- `docs/project-overview.md` — system description and current development status
- `docs/business-rules.md` — core rules governing the domain
- `docs/module-boundaries.md` — what each module owns
- `docs/current-progress.md` — completed features and next steps
- `AGENTS.md` — instructions for AI assistants working in this codebase
