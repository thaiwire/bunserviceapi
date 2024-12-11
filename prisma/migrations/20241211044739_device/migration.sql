/*
  Warnings:

  - You are about to drop the column `username` on the `Device` table. All the data in the column will be lost.
  - Added the required column `name` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;
