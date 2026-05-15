/*
  Warnings:

  - You are about to drop the column `code` on the `Barangay` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[zipCode]` on the table `Barangay` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Barangay_code_key";

-- AlterTable
ALTER TABLE "Barangay" DROP COLUMN "code",
ADD COLUMN     "zipCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Barangay_zipCode_key" ON "Barangay"("zipCode");
