/*
  Warnings:

  - You are about to drop the column `qtyIn` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `qtyOut` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "qtyIn",
DROP COLUMN "qtyOut",
ADD COLUMN     "pckIn" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pckOut" INTEGER NOT NULL DEFAULT 0;
