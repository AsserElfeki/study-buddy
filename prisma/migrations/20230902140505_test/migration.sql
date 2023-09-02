/*
  Warnings:

  - You are about to alter the column `sex` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(32)` to `VarChar(1)`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "sex" SET DATA TYPE VARCHAR(1);
