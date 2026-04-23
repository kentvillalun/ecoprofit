/*
  Warnings:

  - A unique constraint covering the columns `[contactNumber]` on the table `Barangay` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Barangay" ADD COLUMN     "contactNumber" VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "Barangay_contactNumber_key" ON "Barangay"("contactNumber");
