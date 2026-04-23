import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "../src/generated/prisma/index.js";

// To seed, just run this command after migrate reset
// node prisma/seed.js


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const DEV_BARANGAY = {
  name: "Barangay Beddeng Laud",
  city: "Vigan City",
  code: "BEDDENG_LAUD_VIGAN_CITY",
  adminPhoneNumber: "09990000001",
  adminPassword: "barangay123",
  adminFirstName: "Beddeng",
  adminLastName: "Laud Admin",
  sitios: ["Sitio 1", "Sitio 2", "Sitio 3"],
  adminUsername: "barangayadmin",
  contactNumber: "09177744669"
};

async function main() {
  const passwordHash = await bcrypt.hash(DEV_BARANGAY.adminPassword, 10);

  const barangay = await prisma.barangay.upsert({
    where: {
      code: DEV_BARANGAY.code,
    },
    update: {
      name: DEV_BARANGAY.name,
      city: DEV_BARANGAY.city,
      isRegistered: true,
      contactNumber: DEV_BARANGAY.contactNumber
    },
    create: {
      name: DEV_BARANGAY.name,
      city: DEV_BARANGAY.city,
      code: DEV_BARANGAY.code,
      isRegistered: true,
      contactNumber: DEV_BARANGAY.contactNumber
    },
  });

  for (const sitioName of DEV_BARANGAY.sitios) {
    await prisma.sitio.upsert({
      where: {
        barangayId_name: {
          barangayId: barangay.id,
          name: sitioName,
        },
      },
      update: {},
      create: {
        name: sitioName,
        barangayId: barangay.id,
      },
    });
  }

  await prisma.user.upsert({
    where: {
      phoneNumber: DEV_BARANGAY.adminPhoneNumber,
    },
    update: {
      firstName: DEV_BARANGAY.adminFirstName,
      lastName: DEV_BARANGAY.adminLastName,
      role: Role.CAPTAIN,
      passwordHash,
      barangayId: barangay.id,
      address: `Barangay Hall, ${DEV_BARANGAY.name}, ${DEV_BARANGAY.city}`,
      isActive: true,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
      username: DEV_BARANGAY.adminUsername
    },
    create: {
      phoneNumber: DEV_BARANGAY.adminPhoneNumber,
      firstName: DEV_BARANGAY.adminFirstName,
      lastName: DEV_BARANGAY.adminLastName,
      role: Role.CAPTAIN,
      passwordHash,
      barangayId: barangay.id,
      address: `Barangay Hall, ${DEV_BARANGAY.name}, ${DEV_BARANGAY.city}`,
      isActive: true,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
      username: DEV_BARANGAY.adminUsername
    },
  });

  console.log("Seeded development barangay account:", {
    barangay: DEV_BARANGAY.name,
    city: DEV_BARANGAY.city,
    adminPhoneNumber: DEV_BARANGAY.adminPhoneNumber,
    sitios: DEV_BARANGAY.sitios,
  });
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
