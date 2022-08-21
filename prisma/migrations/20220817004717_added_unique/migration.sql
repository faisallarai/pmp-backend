/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Constituency` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `PollingStation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Position` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Religion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Constituency_title_key" ON "Constituency"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Education_title_key" ON "Education"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PollingStation_title_key" ON "PollingStation"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Position_title_key" ON "Position"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Religion_title_key" ON "Religion"("title");
