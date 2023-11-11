"use client";
import { getAllDisciplines, getProgramCountinDiscipline } from '@src/lib/searchFilters'
import DisciplineCard from './disciplineCard'
import { Discipline } from '@prisma/client'
import { Suspense, useEffect, useRef, useState } from 'react';


export default function DisciplineContainer() {

  const [disciplinesList, setDisciplinesList] = useState<Discipline[]>([]);

  const disciplinesRef = useRef<JSX.Element[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const disciplines: Discipline[] = await getAllDisciplines() || [];
      setDisciplinesList(disciplines);
    };
    fetchData();
    disciplinesRef.current = disciplinesList.map((discipline, index) =>
      <DisciplineCard key={discipline.id} name={discipline.name} id={discipline.id} />
    );
  }, [disciplinesList]);

 

  return (
    <div className="h-[200px] overflow-y-auto overflow-x-clip">
      {disciplinesRef.current}
    </div>

  )
}

