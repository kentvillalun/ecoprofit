// backend/src/controllers/auth.controller.js

import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { sendOtp } from "../utils/sms.js";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (value) => UUID_REGEX.test(value ?? "");

// ─────────────────────────────────────────────
// GET /auth/barangays?search=...
// Returns registered barangays matching the search term.
// Includes city so the frontend can show "Barangay — City"
// to distinguish barangays with the same name.
// ─────────────────────────────────────────────
const listBarangays = async (req, res) => {
  try {
    const search = req.query.search?.trim() ?? "";

    const barangays = await prisma.barangay.findMany({
      where: {
        isRegistered: true,
        ...(search
          ? { name: { contains: search, mode: "insensitive" } }
          : {}),
      },
      select: {
        id: true,
        name: true,
        city: true, // needed by frontend dropdown to distinguish same-name barangays
      },
      orderBy: { name: "asc" },
      take: 10,
    });

    return res.status(200).json({ status: "success", data: barangays });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /auth/barangays/:barangayId/sitios
// Returns all sitios belonging to a specific barangay.
// ─────────────────────────────────────────────
const listSitiosByBarangay = async (req, res) => {
  try {
    const { barangayId } = req.params;

    if (!isUuid(barangayId)) {
      return res.status(400).json({ error: "Invalid barangay ID" });
    }

    const barangay = await prisma.barangay.findFirst({
      where: { id: barangayId, isRegistered: true },
      select: { id: true },
    });

    if (!barangay) {
      return res.status(404).json({ error: "Barangay not found" });
    }

    const sitios = await prisma.sitio.findMany({
      where: { barangayId },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    return res.status(200).json({ status: "success", data: sitios });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ─────────────────────────────────────────────
// POST /auth/register
// Validates the signup data, sends an OTP to the phone number.
// Does NOT create the user yet — that happens in verifyOtp.
// ─────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const {
      phoneNumber,
      barangayId,
      sitioId,
      password,
      confirmPassword,
      termsAccepted,
    } = req.body ?? {};
    // ?? {} means "if req.body is null or undefined, use empty object"
    // prevents a crash when destructuring

    // ── Field presence check ──────────────────────────────────
    if (!phoneNumber || !password || !confirmPassword || !barangayId || !sitioId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ── UUID format check ─────────────────────────────────────
    // Never trust IDs from the frontend — validate format before
    // even touching the database
    if (!isUuid(barangayId) || !isUuid(sitioId)) {
      return res.status(400).json({ error: "Invalid address selection" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (termsAccepted !== true) {
      return res.status(400).json({ error: "You must accept the Terms & Conditions" });
    }

    // ── Duplicate phone check ─────────────────────────────────
    const userExists = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (userExists) {
      return res.status(400).json({ error: "This phone number is already registered" });
    }

    // ── Validate barangay ─────────────────────────────────────
    const barangayRecord = await prisma.barangay.findFirst({
      where: { id: barangayId, isRegistered: true },
      select: { id: true, code: true, name: true },
    });

    if (!barangayRecord) {
      return res.status(400).json({ error: "Barangay not found" });
    }

    // ── Validate sitio belongs to that barangay ───────────────
    // Important: someone could send a valid sitioId from a
    // completely different barangay. We verify the relationship.
    const sitioRecord = await prisma.sitio.findFirst({
      where: { id: sitioId, barangayId: barangayRecord.id },
      select: { id: true, name: true },
    });

    if (!sitioRecord) {
      return res.status(400).json({
        error: "Selected sitio does not belong to the selected barangay",
      });
    }

    // ── Clear any existing OTPs for this number ───────────────
    // Prevents multiple active OTPs for the same number
    // if the user tries to register more than once
    await prisma.otpVerification.deleteMany({
      where: { phoneNumber },
    });

    // ── Send OTP and save the returned code ───────────────────
    // sendOtp() handles generation — either via Semaphore (production)
    // or locally logged to terminal (dev mode, no API key)
    const code = await sendOtp(phoneNumber);

    // expiresAt = 10 minutes from now
    // Date.now() = current time in milliseconds
    // 10 * 60 * 1000 = 600,000ms = 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpVerification.create({
      data: { phoneNumber, code, expiresAt },
    });

    // User is NOT created yet — only after OTP is verified
    return res.status(200).json({
      status: "otp_sent",
      message: "Verification code sent to your phone number.",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ─────────────────────────────────────────────
// POST /auth/verify-otp
// Confirms the OTP code, then creates the user.
// ─────────────────────────────────────────────
const verifyOtp = async (req, res) => {
  try {
    const {
      phoneNumber,
      code,
      barangayId,
      sitioId,
      password,
      termsAccepted,
    } = req.body ?? {};

    if (!phoneNumber || !code) {
      return res.status(400).json({ error: "Phone number and OTP code are required" });
    }

    // ── Find a valid OTP record ───────────────────────────────
    // Checks all three at once:
    // 1. phoneNumber matches
    // 2. code matches exactly
    // 3. expiresAt is still in the future (gt = greater than now)
    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        phoneNumber,
        code,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid or expired verification code" });
    }

    // ── Re-validate address data ──────────────────────────────
    // We validate again even though register() already did it.
    // The user could have tampered with sessionStorage between steps.
    // Backend never trusts data just because it saw it before.
    if (!isUuid(barangayId) || !isUuid(sitioId)) {
      return res.status(400).json({ error: "Invalid address selection" });
    }

    const barangayRecord = await prisma.barangay.findFirst({
      where: { id: barangayId, isRegistered: true },
      select: { id: true, code: true, name: true },
    });

    if (!barangayRecord) {
      return res.status(400).json({ error: "Barangay not found" });
    }

    const sitioRecord = await prisma.sitio.findFirst({
      where: { id: sitioId, barangayId: barangayRecord.id },
      select: { id: true, name: true },
    });

    if (!sitioRecord) {
      return res.status(400).json({ error: "Invalid sitio selection" });
    }

    // ── Hash password and create the user ─────────────────────
    // bcrypt.hash(password, 10) — 10 is the salt rounds.
    // A salt is random data added before hashing so two users
    // with the same password still get different hashes.
    // 10 is the industry standard balance of security vs speed.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        phoneNumber,
        purok: sitioRecord.name,
        passwordHash: hashedPassword,
        barangay: { connect: { id: barangayRecord.id } },
        sitio: { connect: { id: sitioRecord.id } },
        termsAccepted: true,
        termsAcceptedAt: new Date(),
      },
      select: {
        id: true,
        phoneNumber: true,
        purok: true,
        barangay: { select: { id: true, code: true, name: true } },
        sitio: { select: { id: true, name: true } },
      },
    });

    // ── Delete the used OTP ───────────────────────────────────
    // Prevents the same code from being used twice
    await prisma.otpVerification.delete({
      where: { id: otpRecord.id },
    });

    return res.status(201).json({ status: "success", data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ─────────────────────────────────────────────
// POST /auth/resend-otp
// Deletes the old OTP and sends a fresh one.
// The 60-second cooldown is enforced on the frontend.
// ─────────────────────────────────────────────
const resendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body ?? {};

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Make sure this number isn't already a registered user
    const userExists = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (userExists) {
      return res.status(400).json({ error: "This phone number is already registered" });
    }

    // Delete old OTP and generate a fresh one
    await prisma.otpVerification.deleteMany({
      where: { phoneNumber },
    });

    const code = await sendOtp(phoneNumber);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpVerification.create({
      data: { phoneNumber, code, expiresAt },
    });

    return res.status(200).json({
      status: "otp_sent",
      message: "A new verification code has been sent.",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ─────────────────────────────────────────────
// POST /auth/login
// ─────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body ?? {};

    if (!phoneNumber || !password) {
      return res.status(400).json({ error: "Phone number and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { phoneNumber },
      include: {
        barangay: { select: { id: true, name: true, code: true } },
        sitio: { select: { id: true, name: true } },
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid phone number or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid phone number or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: "This account is inactive" });
    }

    return res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        role: user.role,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        barangay: user.barangay,
        sitio: user.sitio,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { listBarangays, listSitiosByBarangay, register, verifyOtp, resendOtp, login };
