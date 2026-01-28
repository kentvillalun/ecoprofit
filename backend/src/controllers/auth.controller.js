import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";

const register = async (req, res) => {
  try {
    const {
      phoneNumber,
      purok,
      barangay,
      password,
      confirmPassword,
      termsAccepted,
    } = req.body ?? {}; // ✅ prevent destructure crash

    // 1) Required field checks
    if (!phoneNumber || !password || !confirmPassword || !barangay) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 2) Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // 3) Terms & Conditions check
    if (termsAccepted !== true) {
      return res
        .status(400)
        .json({ error: "You must accept the Terms & Conditions" });
    }

    // 4) Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User already exists with this phone number" });
    }

    // 5) Find barangay by code
    const barangayRecord = await prisma.barangay.findUnique({
      where: { code: barangay },
    });

    if (!barangayRecord) {
      return res.status(400).json({ error: "Barangay not found" });
    }

    // 6) Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7) Create user
    const user = await prisma.user.create({
      data: {
        phoneNumber,
        purok,
        passwordHash: hashedPassword,

        // ✅ connect user to existing barangay row
        barangay: {
          connect: { id: barangayRecord.id },
        },

        termsAccepted: true,
        termsAcceptedAt: new Date(),
      },
      select: {
        id: true,
        phoneNumber: true,
        purok: true,
        barangay: { select: { id: true, code: true, name: true } }, // optional
      },
    });

    return res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { register };
