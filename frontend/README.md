# ECOPROFIT Frontend

This frontend is the resident and barangay web interface for the ECOPROFIT system.

## Current Status

Resident-side authentication frontend is already fixed and considered stable.

Stable pages and flows:
- onboarding
- login
- signup
- OTP validation
- forgot password
- barangay login

These should not be treated as active bug-fix targets unless a new feature directly requires a change.

## Current Development Focus

The active frontend work is the resident signup address selection feature.

Requirements:
- barangay input should use autocomplete suggestions while typing
- only registered barangays from the database should appear
- sitio should be a dropdown/select
- sitio should be disabled until a barangay is selected
- sitio options should update dynamically based on the selected barangay
- changing barangay should reset sitio
- invalid barangay and sitio combinations must be prevented

Data rules:
- use only the project's own backend and database
- do not use third-party or external address APIs
- barangay options come from barangay accounts created by super admin

Implementation style:
- keep it simple and beginner-friendly
- prefer readable and maintainable code
- avoid over-engineering

## Getting Started

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in the browser.

The main frontend code is under `src/app`.

## References

- Root project instructions: `../AGENTS.md`
- Project docs: `../docs`
- Next.js docs: https://nextjs.org/docs
