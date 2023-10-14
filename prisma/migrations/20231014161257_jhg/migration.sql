-- DropForeignKey
ALTER TABLE "DisciplineOnProgram" DROP CONSTRAINT "DisciplineOnProgram_study_program_id_fkey";

-- AddForeignKey
ALTER TABLE "DisciplineOnProgram" ADD CONSTRAINT "DisciplineOnProgram_study_program_id_fkey" FOREIGN KEY ("study_program_id") REFERENCES "StudyProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
