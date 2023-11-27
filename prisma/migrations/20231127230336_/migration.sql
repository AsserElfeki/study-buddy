/*
  Warnings:

  - You are about to drop the column `highestQualification` on the `educational_backgrounds` table. All the data in the column will be lost.
  - Added the required column `highest_qualification` to the `educational_backgrounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageProficiency` to the `personal_infos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nativeLanguage` to the `personal_infos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnglishLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "highestQualification" AS ENUM ('HighSchool', 'Bachelor', 'Master', 'PhD');

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_application_id_fkey";

-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_application_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_fkey";

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "link" TEXT;

-- AlterTable
ALTER TABLE "educational_backgrounds" DROP COLUMN "highestQualification",
ADD COLUMN     "highest_qualification" "highestQualification" NOT NULL;

-- AlterTable
ALTER TABLE "personal_infos" ADD COLUMN     "languageProficiency" "EnglishLevel" NOT NULL,
ADD COLUMN     "nativeLanguage" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
