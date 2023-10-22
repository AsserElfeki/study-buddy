-- DropForeignKey
ALTER TABLE "DisciplineOnProgram" DROP CONSTRAINT "DisciplineOnProgram_discipline_id_fkey";

-- AddForeignKey
ALTER TABLE "DisciplineOnProgram" ADD CONSTRAINT "DisciplineOnProgram_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
