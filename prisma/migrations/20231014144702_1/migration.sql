/*
  Warnings:

  - The `tuition_fee` column on the `StudyProgram` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "StudyProgram" DROP COLUMN "tuition_fee",
ADD COLUMN     "tuition_fee" INTEGER;
