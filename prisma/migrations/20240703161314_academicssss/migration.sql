/*
  Warnings:

  - Made the column `endDate` on table `Education` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "endDate" SET NOT NULL;
