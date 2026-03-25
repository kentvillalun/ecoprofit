-- AlterTable
ALTER TABLE "Barangay" ADD COLUMN     "isRegistered" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sitioId" UUID;

-- CreateTable
CREATE TABLE "Sitio" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "barangayId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sitio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sitio_barangayId_idx" ON "Sitio"("barangayId");

-- CreateIndex
CREATE UNIQUE INDEX "Sitio_barangayId_name_key" ON "Sitio"("barangayId", "name");

-- CreateIndex
CREATE INDEX "User_sitioId_idx" ON "User"("sitioId");

-- AddForeignKey
ALTER TABLE "Sitio" ADD CONSTRAINT "Sitio_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sitioId_fkey" FOREIGN KEY ("sitioId") REFERENCES "Sitio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
