/*
  Warnings:

  - Added the required column `photo` to the `Voter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voter" ADD COLUMN     "photo" TEXT NOT NULL;
