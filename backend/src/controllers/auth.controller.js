import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (value) => UUID_REGEX.test(value ?? "");

const listBarangays = async (req, res) => {
  try {
    const search = req.query.search?.trim() ?? "";

    const barangays = await prisma.barangay.findMany({
      where: {
        isRegistered: true,
        ...(search
          ? {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
      take: 10,
    });

    return res.status(200).json({
      status: "success",
      data: barangays,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const listSitiosByBarangay = async (req, res) => {
  try {
    const { barangayId } = req.params;

    if (!isUuid(barangayId)) {
      return res.status(400).json({ error: "Invalid barangay ID" });
    }

    const barangay = await prisma.barangay.findFirst({
      where: {
        id: barangayId,
        isRegistered: true,
      },
      select: {
        id: true,
      },
    });

    if (!barangay) {
      return res.status(404).json({ error: "Barangay not found" });
    }

    const sitios = await prisma.sitio.findMany({
      where: {
        barangayId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json({
      status: "success",
      data: sitios,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    // Read request from the body
    const {
      phoneNumber,
      barangayId,
      sitioId,
      password,
      confirmPassword,
      termsAccepted,
    } = req.body ?? {};

    // Field Validation
    if (!phoneNumber || !password || !confirmPassword || !barangayId || !sitioId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!isUuid(barangayId) || !isUuid(sitioId)) {
      return res.status(400).json({ error: "Invalid address selection" });
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
    const barangayRecord = await prisma.barangay.findFirst({
      where: {
        id: barangayId,
        isRegistered: true,
      },
      select: {
        id: true,
        code: true,
        name: true,
      },
    });

    if (!barangayRecord) {
      return res.status(400).json({ error: "Barangay not found" });
    }

    const sitioRecord = await prisma.sitio.findFirst({
      where: {
        id: sitioId,
        barangayId: barangayRecord.id,
      },
      select: {
        id: true,
        name: true,
        barangayId: true,
      },
    });

    if (!sitioRecord) {
      return res.status(400).json({
        error: "Selected sitio does not belong to the selected barangay",
      });
    }

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating the user
    const user = await prisma.user.create({
      data: {
        phoneNumber,
        purok: sitioRecord.name,
        passwordHash: hashedPassword,
        barangay: {
          connect: { id: barangayRecord.id },
        },
        sitio: {
          connect: { id: sitioRecord.id },
        },
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

    return res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body ?? {};

    if (!phoneNumber || !password) {
      return res.status(400).json({ error: "Phone number and password are required" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
      include: {
        barangay: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        sitio: {
          select: {
            id: true,
            name: true,
          },
        },
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


export { listBarangays, listSitiosByBarangay, register, login };
