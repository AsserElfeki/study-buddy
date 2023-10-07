/*
  Warnings:

  - You are about to drop the column `ApplyDate` on the `StudyProgram` table. All the data in the column will be lost.
  - You are about to drop the column `universityLink` on the `University` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudyProgram" DROP CONSTRAINT "StudyProgram_disciplineId_fkey";

-- AlterTable
ALTER TABLE "StudyProgram" DROP COLUMN "ApplyDate",
ADD COLUMN     "applyDate" TEXT;

-- AlterTable
ALTER TABLE "University" DROP COLUMN "universityLink";

-- CreateTable
CREATE TABLE "DisciplineOnProgram" (
    "disciplineId" TEXT NOT NULL,
    "studyProgramId" TEXT NOT NULL,

    CONSTRAINT "DisciplineOnProgram_pkey" PRIMARY KEY ("disciplineId","studyProgramId")
);

-- AddForeignKey
ALTER TABLE "DisciplineOnProgram" ADD CONSTRAINT "DisciplineOnProgram_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineOnProgram" ADD CONSTRAINT "DisciplineOnProgram_studyProgramId_fkey" FOREIGN KEY ("studyProgramId") REFERENCES "StudyProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
