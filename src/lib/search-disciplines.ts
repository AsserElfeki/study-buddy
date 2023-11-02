import { disciplinePath } from './apiPaths';
import { Discipline } from '@prisma/client';
import prisma from './prisma';

//first get discipline ID then get discipline program count

export async function getProgramCount(disciplineId: string) : Promise<number> {
    const res: Response = await fetch(`${disciplinePath}/${disciplineId}`, {
        method: "GET",
        cache: 'no-store'
    })
    // console.log(`${disciplinePath}/${disciplineId}`)

    const data = await res.json();
    // console.log("🚀 ~ file: search-disciplines.ts:13 ~ getProgramCount ~ data:", data);
    return data.disciplineOnProgram.length;
}


export async function getAllDisciplines(): Promise<Array<Discipline>> {
    const res: Response = await fetch(`${disciplinePath}`, {
        method: 'GET',
        cache: 'no-store',
    });
    
    const data: Array<Discipline> = await res.json();
    return data;
}
