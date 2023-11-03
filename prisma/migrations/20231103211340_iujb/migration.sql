/*
  Warnings:

  - You are about to drop the column `applyDate` on the `study_programs` table. All the data in the column will be lost.
  - You are about to drop the column `studyProgramLanguage` on the `study_programs` table. All the data in the column will be lost.
  - The `format` column on the `study_programs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "study_programs" DROP COLUMN "applyDate",
DROP COLUMN "studyProgramLanguage",
ADD COLUMN     "apply_date" TEXT,
ADD COLUMN     "study_program_language" "studyProgramLanguage" NOT NULL DEFAULT 'EN',
DROP COLUMN "format",
ADD COLUMN     "format" TEXT[];
