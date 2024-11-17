-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Worker', 'Manager');

-- CreateTable
CREATE TABLE "QrCode" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pckSize" INTEGER NOT NULL,

    CONSTRAINT "QrCode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "qtyIn" INTEGER NOT NULL DEFAULT 0,
    "qtyOut" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "image_url" TEXT,
    "roles" "Roles" DEFAULT 'Worker',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_qrCode_fkey" FOREIGN KEY ("qrCode") REFERENCES "QrCode"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
