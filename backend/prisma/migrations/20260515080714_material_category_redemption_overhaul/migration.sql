/*
  Warnings:

  - You are about to drop the column `city` on the `Barangay` table. All the data in the column will be lost.
  - You are about to drop the column `materialType` on the `CollectionItem` table. All the data in the column will be lost.
  - You are about to drop the column `weightUnit` on the `CollectionItem` table. All the data in the column will be lost.
  - You are about to drop the column `materialType` on the `PickupRequests` table. All the data in the column will be lost.
  - You are about to drop the column `weightUnit` on the `PickupRequests` table. All the data in the column will be lost.
  - You are about to drop the column `materialType` on the `ProgramMaterial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[programId,materialId]` on the table `ProgramMaterial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actualUnit` to the `CollectionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materialId` to the `CollectionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barangayId` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materialId` to the `ProgramMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RedemptionMode" AS ENUM ('POINTS', 'CASH', 'BOTH');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('KG', 'GRAMS', 'LBS', 'PIECE');

-- DropIndex
DROP INDEX "ProgramMaterial_programId_materialType_key";

-- AlterTable
ALTER TABLE "Barangay" DROP COLUMN "city",
ADD COLUMN     "hasCollectionRequests" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasLeaderboard" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasRedemptionManagement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasRewardInventory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "municipality" TEXT,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "redemptionMode" "RedemptionMode" NOT NULL DEFAULT 'POINTS';

-- AlterTable
ALTER TABLE "CollectionItem" DROP COLUMN "materialType",
DROP COLUMN "weightUnit",
ADD COLUMN     "actualUnit" "Unit" NOT NULL,
ADD COLUMN     "materialId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "PickupRequests" DROP COLUMN "materialType",
DROP COLUMN "weightUnit",
ADD COLUMN     "estimatedUnit" "Unit" NOT NULL DEFAULT 'KG',
ADD COLUMN     "isAssorted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "materialId" UUID;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "barangayId" UUID NOT NULL,
ADD COLUMN     "isCashMode" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ProgramMaterial" DROP COLUMN "materialType",
ADD COLUMN     "materialId" UUID NOT NULL;

-- DropEnum
DROP TYPE "MaterialType";

-- DropEnum
DROP TYPE "WeightUnit";

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "categoryId" UUID NOT NULL,
    "barangayId" UUID NOT NULL,
    "defaultUnit" "Unit" NOT NULL DEFAULT 'KG',
    "pointValue" DECIMAL(65,30),
    "cashValue" DECIMAL(65,30),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "acceptNonSellable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramMaterial_programId_materialId_key" ON "ProgramMaterial"("programId", "materialId");

-- AddForeignKey
ALTER TABLE "PickupRequests" ADD CONSTRAINT "PickupRequests_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramMaterial" ADD CONSTRAINT "ProgramMaterial_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
