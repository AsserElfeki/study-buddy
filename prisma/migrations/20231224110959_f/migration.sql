/*
  Warnings:

  - Added the required column `updatedAt` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "applicationStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "applicationStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
