/*
  Warnings:

  - Changed the type of `degreeType` on the `StudyProgram` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `format` on the `StudyProgram` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `attendance` on the `StudyProgram` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "StudyProgram" ALTER COLUMN "tuition_fee" SET DATA TYPE TEXT,
DROP COLUMN "degreeType",
ADD COLUMN     "degreeType" TEXT NOT NULL,
DROP COLUMN "format",
ADD COLUMN     "format" TEXT NOT NULL,
DROP COLUMN "attendance",
ADD COLUMN     "attendance" TEXT NOT NULL;
