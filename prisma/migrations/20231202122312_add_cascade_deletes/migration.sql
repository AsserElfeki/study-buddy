/*
  Warnings:

  - A unique constraint covering the columns `[study_program_id,user_id]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_study_program_id_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "educational_backgrounds" DROP CONSTRAINT "educational_backgrounds_application_id_fkey";

-- DropForeignKey
ALTER TABLE "personal_infos" DROP CONSTRAINT "personal_infos_application_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "applications_study_program_id_user_id_key" ON "applications"("study_program_id", "user_id");

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_study_program_id_fkey" FOREIGN KEY ("study_program_id") REFERENCES "study_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personal_infos" ADD CONSTRAINT "personal_infos_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_backgrounds" ADD CONSTRAINT "educational_backgrounds_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
