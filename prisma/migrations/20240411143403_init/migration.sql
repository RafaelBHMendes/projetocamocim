-- CreateEnum
CREATE TYPE "Opening" AS ENUM ('Aberta', 'Fechada');

-- CreateTable
CREATE TABLE "Bidding" (
    "id" SERIAL NOT NULL,
    "processNumber" VARCHAR(255) NOT NULL,
    "object" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "opening" "Opening" NOT NULL,
    "view" BYTEA NOT NULL,

    CONSTRAINT "Bidding_pkey" PRIMARY KEY ("id")
);
