import { getAllDisciplines } from '@lib/search-disciplines'
import React, { useState } from 'react'
import DisciplineCard from './disciplineCard'
import { Discipline } from '@prisma/client'

async function DisciplineContainer() {

  // const [isOpen, setIsOpen] = useState(false);
  
  const disciplinesList : Discipline[] = await getAllDisciplines() || [];
  const disciplines = disciplinesList.map((discipline) => 
    <DisciplineCard key={discipline.id} name={discipline.name} id={discipline.id} />
  );
  return (
    <div>
      {disciplines}
    </div>
    
  )
}

export default DisciplineContainer