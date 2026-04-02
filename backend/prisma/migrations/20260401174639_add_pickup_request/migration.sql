-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('METALS', 'PAPERS', 'BOTTLES', 'PLASTICS');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'GRAMS', 'LBS');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REQUESTED', 'APPROVED', 'IN_PROGRESS', 'COLLECTED', 'REJECTED');

-- CreateTable
CREATE TABLE "PickupRequests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "materialType" "MaterialType" NOT NULL DEFAULT 'PLASTICS',
    "estimatedWeight" DOUBLE PRECISION NOT NULL,
    "weightUnit" "WeightUnit" NOT NULL DEFAULT 'KG',
    "status" "Status" NOT NULL DEFAULT 'REQUESTED',
    "photoUrl" TEXT NOT NULL,
    "isScheduled" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "actualWeight" DOUBLE PRECISION,
    "rewardEquivalent" TEXT,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),
    "collectedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),

    CONSTRAINT "PickupRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PickupRequests" ADD CONSTRAINT "PickupRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
