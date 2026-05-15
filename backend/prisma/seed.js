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
  name: "Beddeng Laud",
  municipality: "Vigan City",
  province: "Ilocos Sur",
  zipCode: "2700",
  logoUrl: null,
  adminPhoneNumber: "09990000001",
  adminPassword: "barangay123",
  adminFirstName: "Beddeng",
  adminLastName: "Laud Admin",
  sitios: ["Sitio 1", "Sitio 2", "Sitio 3"],
  adminUsername: "barangayadmin",
  contactNumber: "09177744669",
};

const DEV_CATEGORIES = ["Metals", "Papers", "Bottles", "Plastics"];

async function main() {
  const passwordHash = await bcrypt.hash(DEV_BARANGAY.adminPassword, 10);

  const barangay = await prisma.barangay.upsert({
    where: {
      zipCode: DEV_BARANGAY.zipCode,
    },
    update: {
      name: DEV_BARANGAY.name,
      municipality: DEV_BARANGAY.municipality,
      province: DEV_BARANGAY.province,
      isRegistered: true,
      contactNumber: DEV_BARANGAY.contactNumber,
    },
    create: {
      name: DEV_BARANGAY.name,
      municipality: DEV_BARANGAY.municipality,
      province: DEV_BARANGAY.province,
      zipCode: DEV_BARANGAY.zipCode,
      isRegistered: true,
      contactNumber: DEV_BARANGAY.contactNumber,
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
      address: `Barangay Hall, ${DEV_BARANGAY.name}, ${DEV_BARANGAY.municipality}`,
      isActive: true,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
      username: DEV_BARANGAY.adminUsername,
    },
    create: {
      phoneNumber: DEV_BARANGAY.adminPhoneNumber,
      firstName: DEV_BARANGAY.adminFirstName,
      lastName: DEV_BARANGAY.adminLastName,
      role: Role.CAPTAIN,
      passwordHash,
      barangayId: barangay.id,
      address: `Barangay Hall, ${DEV_BARANGAY.name}, ${DEV_BARANGAY.municipality}`,
      isActive: true,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
      username: DEV_BARANGAY.adminUsername,
    },
  });

  console.log("Seeded development barangay account:", {
    barangay: DEV_BARANGAY.name,
    municipality: DEV_BARANGAY.municipality,
    adminPhoneNumber: DEV_BARANGAY.adminPhoneNumber,
    sitios: DEV_BARANGAY.sitios,
  });

  for (const categoryName of DEV_CATEGORIES) {
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: {
        name: categoryName
      }
      
    })
  }
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
