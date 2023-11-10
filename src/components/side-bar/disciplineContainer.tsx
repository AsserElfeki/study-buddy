"use client";
import { getAllDisciplines, getProgramCountinDiscipline } from '@src/lib/searchFilters'
import DisciplineCard from './disciplineCard'
import { Discipline } from '@prisma/client'
import { Suspense, useEffect, useState } from 'react';


export default function DisciplineContainer() {

  const [disciplinesList, setDisciplinesList] = useState<Discipline[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const disciplines: Discipline[] = await getAllDisciplines() || [];
      setDisciplinesList(disciplines);
    };
    fetchData();
  }, []);

  const disciplines = disciplinesList.map((discipline, index) =>
    <DisciplineCard key={discipline.id} name={discipline.name} id={discipline.id}  />
  );

  return (
    <div className="h-[200px] overflow-y-auto overflow-x-clip">
        {disciplines}
    </div>

  )
}

