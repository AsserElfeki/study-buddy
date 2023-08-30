/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[national_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('NEW_STUDENT', 'ACCEPTED_STUDENT', 'COMMUNITY_ANGEL', 'ADMIN');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "first_name" VARCHAR(32),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_name" VARCHAR(32),
ADD COLUMN     "national_id" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'NEW_STUDENT',
ADD COLUMN     "sex" VARCHAR(32),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(64);

-- DropTable
DROP TABLE "VerificationRequest";

-- CreateIndex
CREATE UNIQUE INDEX "users_national_id_key" ON "users"("national_id");
