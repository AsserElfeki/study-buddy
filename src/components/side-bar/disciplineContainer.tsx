import { getAllDisciplines } from '@lib/search-disciplines'
import DisciplineCard from './disciplineCard'
import { Discipline } from '@prisma/client'


export default async function DisciplineContainer() {
  const disciplinesList : Discipline[] = await getAllDisciplines() || [];
  const disciplines = disciplinesList.map((discipline) => 
    <DisciplineCard key={discipline.id} name={discipline.name} id={discipline.id} />
  );
  return (
    <div className="h-[200px] overflow-y-auto">
      {disciplines}
    </div>
    
  )
}

