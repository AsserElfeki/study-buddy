-- DropForeignKey
ALTER TABLE "StudyProgram" DROP CONSTRAINT "StudyProgram_university_id_fkey";

-- AddForeignKey
ALTER TABLE "StudyProgram" ADD CONSTRAINT "StudyProgram_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;
