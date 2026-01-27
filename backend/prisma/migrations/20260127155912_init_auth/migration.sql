-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RESIDENT', 'BARANGAY_ADMIN', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "Barangay" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Barangay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "barangayId" UUID,
    "role" "Role" NOT NULL DEFAULT 'RESIDENT',
    "phoneNumber" VARCHAR(20) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "purok" TEXT,
    "passwordHash" TEXT NOT NULL,
    "termsAcceptedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Barangay_code_key" ON "Barangay"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "User_barangayId_idx" ON "User"("barangayId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
