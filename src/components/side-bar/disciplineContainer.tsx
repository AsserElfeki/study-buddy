import { getAllDisciplines, getProgramCount } from '@src/lib/searchFilters'
import DisciplineCard from './disciplineCard'
import { Discipline } from '@prisma/client'


export default async function DisciplineContainer() {

  const disciplinesList: Discipline[] = await getAllDisciplines() || [];

  const programCountsPromises = disciplinesList.map(discipline => getProgramCount(discipline.id));
  const programCounts: number[] = await Promise.all(programCountsPromises);

  const disciplines = disciplinesList.map((discipline, index) =>
    <DisciplineCard key={discipline.id} name={discipline.name} id={discipline.id} count={programCounts[index]} />
  );

  return (
    <div className="h-[200px] overflow-y-auto overflow-x-clip">
      {disciplines}
    </div>

  )
}

