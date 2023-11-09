"use client";
import { getAllDisciplines, getProgramCountinDiscipline } from '@src/lib/searchFilters'
import DisciplineCard from './disciplineCard'
import { Discipline } from '@prisma/client'
import { useEffect, useState } from 'react';


export default function DisciplineContainer() {

  const [disciplinesList, setDisciplinesList] = useState<Discipline[]>([]);
  const [programCounts, setProgramCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const disciplines: Discipline[] = await getAllDisciplines() || [];
      setDisciplinesList(disciplines);

      const countsPromises = disciplines.map(discipline => getProgramCountinDiscipline(discipline.id));
      const counts: number[] = await Promise.all(countsPromises);
      setProgramCounts(counts);
    };

    fetchData();
  }, []);

  const disciplines = disciplinesList.map((discipline, index) =>
    <DisciplineCard key={discipline.id} name={discipline.name} id={discipline.id} count={programCounts[index]} />
  );

  return (
    <div className="h-[200px] overflow-y-auto overflow-x-clip">
      {disciplines}
    </div>

  )
}

