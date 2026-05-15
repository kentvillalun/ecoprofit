/*
  Warnings:

  - You are about to drop the column `estimatedWeight` on the `PickupRequests` table. All the data in the column will be lost.
  - Added the required column `estimatedValue` to the `PickupRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PickupRequests" DROP COLUMN "estimatedWeight",
ADD COLUMN     "estimatedValue" DOUBLE PRECISION NOT NULL;
