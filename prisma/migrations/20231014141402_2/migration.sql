/*
  Warnings:

  - You are about to drop the column `studyProgramId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Application` table. All the data in the column will be lost.
  - The primary key for the `DisciplineOnProgram` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `disciplineId` on the `DisciplineOnProgram` table. All the data in the column will be lost.
  - You are about to drop the column `studyProgramId` on the `DisciplineOnProgram` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `studyProgramLink` on the `StudyProgram` table. All the data in the column will be lost.
  - You are about to drop the column `universityId` on the `StudyProgram` table. All the data in the column will be lost.
  - Added the required column `study_program_id` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discipline_id` to the `DisciplineOnProgram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study_program_id` to the `DisciplineOnProgram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `application_id` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `application_id` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_cycle` to the `StudyProgram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `study_program_link` to the `StudyProgram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university_id` to the `StudyProgram` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_studyProgramId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplineOnProgram" DROP CONSTRAINT "DisciplineOnProgram_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplineOnProgram" DROP CONSTRAINT "DisciplineOnProgram_studyProgramId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "StudyProgram" DROP CONSTRAINT "StudyProgram_universityId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "studyProgramId",
DROP COLUMN "userId",
ADD COLUMN     "study_program_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DisciplineOnProgram" DROP CONSTRAINT "DisciplineOnProgram_pkey",
DROP COLUMN "disciplineId",
DROP COLUMN "studyProgramId",
ADD COLUMN     "discipline_id" TEXT NOT NULL,
ADD COLUMN     "study_program_id" TEXT NOT NULL,
ADD CONSTRAINT "DisciplineOnProgram_pkey" PRIMARY KEY ("discipline_id", "study_program_id");

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "applicationId",
ADD COLUMN     "application_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "applicationId",
ADD COLUMN     "application_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudyProgram" DROP COLUMN "studyProgramLink",
DROP COLUMN "universityId",
ADD COLUMN     "payment_cycle" TEXT NOT NULL,
ADD COLUMN     "study_program_link" TEXT NOT NULL,
ADD COLUMN     "university_id" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Attendance";

-- DropEnum
DROP TYPE "Degree";

-- DropEnum
DROP TYPE "Format";

-- AddForeignKey
ALTER TABLE "StudyProgram" ADD CONSTRAINT "StudyProgram_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineOnProgram" ADD CONSTRAINT "DisciplineOnProgram_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineOnProgram" ADD CONSTRAINT "DisciplineOnProgram_study_program_id_fkey" FOREIGN KEY ("study_program_id") REFERENCES "StudyProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_study_program_id_fkey" FOREIGN KEY ("study_program_id") REFERENCES "StudyProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
