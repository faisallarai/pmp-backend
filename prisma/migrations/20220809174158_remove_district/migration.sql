/*
  Warnings:

  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `period` to the `PollingStation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Constituency" DROP CONSTRAINT "Constituency_districtId_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_districtId_fkey";

-- AlterTable
ALTER TABLE "PollingStation" ADD COLUMN     "period" TEXT NOT NULL;

-- DropTable
DROP TABLE "District";
