-- CreateEnum
CREATE TYPE "EducationalLevel" AS ENUM ('PRIMARY', 'SECONDARY', 'TERTIARY');

-- CreateTable
CREATE TABLE "Program" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "allotedBudget" DOUBLE PRECISION NOT NULL,
    "maxPoints" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramMaterial" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "programId" UUID NOT NULL,
    "materialType" "MaterialType" NOT NULL,
    "pointValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgramMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedemptionTransaction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "programMaterialId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "collectorName" TEXT NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPointValue" DOUBLE PRECISION NOT NULL,
    "educationalLevel" "EducationalLevel" NOT NULL,

    CONSTRAINT "RedemptionTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramMaterial_programId_materialType_key" ON "ProgramMaterial"("programId", "materialType");

-- AddForeignKey
ALTER TABLE "ProgramMaterial" ADD CONSTRAINT "ProgramMaterial_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedemptionTransaction" ADD CONSTRAINT "RedemptionTransaction_programMaterialId_fkey" FOREIGN KEY ("programMaterialId") REFERENCES "ProgramMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
