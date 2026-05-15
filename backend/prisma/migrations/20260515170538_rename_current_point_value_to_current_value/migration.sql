/*
  Warnings:

  - You are about to drop the column `currentPointValue` on the `RedemptionTransaction` table. All the data in the column will be lost.
  - Added the required column `currentValue` to the `RedemptionTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RedemptionTransaction" DROP COLUMN "currentPointValue",
ADD COLUMN     "currentValue" DOUBLE PRECISION NOT NULL;
