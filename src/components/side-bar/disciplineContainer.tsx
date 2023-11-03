import { getAllDisciplines, getProgramCount } from '@lib/search-disciplines'
import DisciplineCard from './disciplineCard'
import { Discipline } from '@prisma/client'


export default async function DisciplineContainer() {

  const disciplinesList: Discipline[] = await getAllDisciplines() || [];

  const programCountsPromises = disciplinesList.map(discipline => getProgramCount(discipline.id));
  const programCounts: number[] = await Promise.all(programCountsPromises);

  const disciplines = disciplinesList.map((discipline, index) =>
    <DisciplineCard key={discipline.id} name={discipline.name} count={programCounts[index]} />
  );

  return (
    <div className="h-[200px] overflow-y-auto">
      {disciplines}
    </div>
    
  )
}

