import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";

const register = async (req, res) => {
  try {
    // Read request from the body
    const {
      phoneNumber,
      purok,
      barangay,
      password,
      confirmPassword,
      termsAccepted,
    } = req.body ?? {};

    // Field Validation
    if (!phoneNumber || !password || !confirmPassword || !barangay) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Password match validation
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }

    // Terms and conditions check
    if (termsAccepted !== true) {
      return res
        .status(400)
        .json({ error: "You must check the Terms & Conditions" });
    }

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "User already exists with this phone number" });
    }

    // Ensure barangay is valid
    const barangayRecord = await prisma.barangay.findUnique({
      where: { code: barangay },
    });

    if (!barangayRecord) {
      return res.status(400).json({ error: "Barangay not found" });
    }

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating the user
    const user = await prisma.user.create({
      data: {
        phoneNumber,
        purok,
        passwordHash: hashedPassword,
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
        barangay: { select: { id: true, code: true, name: true } },
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
