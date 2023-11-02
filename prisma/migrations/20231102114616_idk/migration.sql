/*
  Warnings:

  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discipline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DisciplineOnProgram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudyProgram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `University` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_study_program_id_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_user_id_fkey";

-- DropForeignKey
ALTER TABLE "DisciplineOnProgram" DROP CONSTRAINT "DisciplineOnProgram_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "DisciplineOnProgram" DROP CONSTRAINT "DisciplineOnProgram_study_program_id_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_application_id_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_application_id_fkey";

-- DropForeignKey
ALTER TABLE "StudyProgram" DROP CONSTRAINT "StudyProgram_university_id_fkey";

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "Discipline";

-- DropTable
DROP TABLE "DisciplineOnProgram";

-- DropTable
DROP TABLE "Document";

-- DropTable
DROP TABLE "Form";

-- DropTable
DROP TABLE "StudyProgram";

-- DropTable
DROP TABLE "University";

-- CreateTable
CREATE TABLE "universities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TEXT,
    "studyProgramLanguage" "studyProgramLanguage" NOT NULL DEFAULT 'EN',
    "degreeType" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "attendance" TEXT NOT NULL,
    "applyDate" TEXT,
    "payment_cycle" TEXT NOT NULL,
    "study_program_link" TEXT,
    "university_id" TEXT NOT NULL,
    "tuition_fee" INTEGER,
    "IELTS_score" DOUBLE PRECISION,
    "TOEFL_score" INTEGER,
    "duration" DOUBLE PRECISION,

    CONSTRAINT "study_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplines_on_programs" (
    "discipline_id" TEXT NOT NULL,
    "study_program_id" TEXT NOT NULL,

    CONSTRAINT "disciplines_on_programs_pkey" PRIMARY KEY ("discipline_id","study_program_id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "study_program_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forms" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "study_programs" ADD CONSTRAINT "study_programs_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines_on_programs" ADD CONSTRAINT "disciplines_on_programs_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines_on_programs" ADD CONSTRAINT "disciplines_on_programs_study_program_id_fkey" FOREIGN KEY ("study_program_id") REFERENCES "study_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_study_program_id_fkey" FOREIGN KEY ("study_program_id") REFERENCES "study_programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
