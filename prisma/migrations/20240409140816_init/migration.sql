-- CreateEnum
CREATE TYPE "OpeningStatus" AS ENUM ('Aberta', 'Fechada');

-- CreateTable
CREATE TABLE "Bidding" (
    "id" SERIAL NOT NULL,
    "processNumber" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "opening" "OpeningStatus" NOT NULL DEFAULT 'Aberta',

    CONSTRAINT "Bidding_pkey" PRIMARY KEY ("id")
);
