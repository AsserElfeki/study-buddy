/*
  Warnings:

  - You are about to drop the column `national_id` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_national_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "national_id";
