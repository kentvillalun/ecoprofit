# ECOPROFIT Frontend

This frontend is the resident and barangay web interface for the ECOPROFIT system.

## Current Status

Resident-side authentication is complete and connected to the backend.

Stable and working:
- onboarding
- resident login (connected to backend)
- signup with barangay autocomplete and sitio dependent dropdown (connected to backend)
- OTP validation (6-digit input, auto-focus, resend cooldown, connected to backend)
- forgot password full flow: phone → OTP → reset password (all connected to backend)
- resident capture page (camera, image preview, submit UI — backend not yet connected)

Barangay login:
- UI exists at `/barangay/login` with email/username and password fields
- Not yet connected to any backend endpoint
- This is the current active development target

These stable pages should not be treated as active bug-fix targets unless a new feature directly requires a change.

## Current Development Focus

Connecting the barangay login page to a backend endpoint so barangay admins can authenticate.

What needs to happen:
- decide and implement the identifier (phone or email/username) for barangay admin login
- add a backend endpoint or extend existing login to support `BARANGAY_ADMIN` role
- wire up the form with `react-hook-form` + `yup` following the same pattern as resident login
- on success, store session data and redirect to the barangay dashboard

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
