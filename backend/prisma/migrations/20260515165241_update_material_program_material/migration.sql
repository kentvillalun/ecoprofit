/*
  Warnings:

  - You are about to drop the column `cashValue` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `pointValue` on the `Material` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Material" DROP COLUMN "cashValue",
DROP COLUMN "pointValue";

-- AlterTable
ALTER TABLE "ProgramMaterial" ADD COLUMN     "cashValue" DOUBLE PRECISION;
