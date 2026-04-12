-- AlterEnum
ALTER TYPE "MaterialType" ADD VALUE 'ASSORTED';

-- CreateTable
CREATE TABLE "CollectionItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "requestId" UUID NOT NULL,
    "materialType" "MaterialType" NOT NULL,
    "actualWeight" DOUBLE PRECISION NOT NULL,
    "weightUnit" "WeightUnit" NOT NULL,

    CONSTRAINT "CollectionItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "PickupRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
