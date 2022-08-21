/*
  Warnings:

  - The primary key for the `Constituency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Constituency` table. All the data in the column will be lost.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Country` table. All the data in the column will be lost.
  - The primary key for the `District` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `District` table. All the data in the column will be lost.
  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `memberId` on the `Member` table. All the data in the column will be lost.
  - The primary key for the `Party` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PollingStation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `PollingStation` table. All the data in the column will be lost.
  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Region` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `Region` table. All the data in the column will be lost.
  - The primary key for the `Religion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Voter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `voterId` on the `Voter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voterId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Party` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Region` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `electoralAreaId` to the `Voter` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sex` on the `Voter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female');

-- DropForeignKey
ALTER TABLE "Constituency" DROP CONSTRAINT "Constituency_districtId_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_educationId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_partyId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_religionId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_voterId_fkey";

-- DropForeignKey
ALTER TABLE "PollingStation" DROP CONSTRAINT "PollingStation_constituencyId_fkey";

-- DropForeignKey
ALTER TABLE "Region" DROP CONSTRAINT "Region_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_constituencyId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_districtId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_pollingStationId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_regionId_fkey";

-- DropIndex
DROP INDEX "Member_memberId_key";

-- DropIndex
DROP INDEX "Voter_voterId_key";

-- AlterTable
ALTER TABLE "Constituency" DROP CONSTRAINT "Constituency_pkey",
DROP COLUMN "code",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "districtId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Constituency_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Constituency_id_seq";

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
DROP COLUMN "code",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Country_id_seq";

-- AlterTable
ALTER TABLE "District" DROP CONSTRAINT "District_pkey",
DROP COLUMN "code",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "regionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "District_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "District_id_seq";

-- AlterTable
ALTER TABLE "Education" DROP CONSTRAINT "Education_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Education_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Education_id_seq";

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "memberId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "partyId" SET DATA TYPE TEXT,
ALTER COLUMN "voterId" SET DATA TYPE TEXT,
ALTER COLUMN "positionId" SET DATA TYPE TEXT,
ALTER COLUMN "religionId" SET DATA TYPE TEXT,
ALTER COLUMN "educationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Member_id_seq";

-- AlterTable
ALTER TABLE "Party" DROP CONSTRAINT "Party_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Party_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Party_id_seq";

-- AlterTable
ALTER TABLE "PollingStation" DROP CONSTRAINT "PollingStation_pkey",
DROP COLUMN "code",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "constituencyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PollingStation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PollingStation_id_seq";

-- AlterTable
ALTER TABLE "Position" DROP CONSTRAINT "Position_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Position_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Position_id_seq";

-- AlterTable
ALTER TABLE "Region" DROP CONSTRAINT "Region_pkey",
DROP COLUMN "code",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "countryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Region_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Region_id_seq";

-- AlterTable
ALTER TABLE "Religion" DROP CONSTRAINT "Religion_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Religion_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Religion_id_seq";

-- AlterTable
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_pkey",
DROP COLUMN "voterId",
ADD COLUMN     "electoralAreaId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "countryId" SET DATA TYPE TEXT,
ALTER COLUMN "regionId" SET DATA TYPE TEXT,
ALTER COLUMN "districtId" SET DATA TYPE TEXT,
ALTER COLUMN "constituencyId" SET DATA TYPE TEXT,
ALTER COLUMN "pollingStationId" SET DATA TYPE TEXT,
DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex" NOT NULL,
ADD CONSTRAINT "Voter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Voter_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Country_title_key" ON "Country"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Member_voterId_key" ON "Member"("voterId");

-- CreateIndex
CREATE UNIQUE INDEX "Party_title_key" ON "Party"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Region_title_key" ON "Region"("title");

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_constituencyId_fkey" FOREIGN KEY ("constituencyId") REFERENCES "Constituency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_pollingStationId_fkey" FOREIGN KEY ("pollingStationId") REFERENCES "PollingStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_religionId_fkey" FOREIGN KEY ("religionId") REFERENCES "Religion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "Voter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constituency" ADD CONSTRAINT "Constituency_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollingStation" ADD CONSTRAINT "PollingStation_constituencyId_fkey" FOREIGN KEY ("constituencyId") REFERENCES "Constituency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
