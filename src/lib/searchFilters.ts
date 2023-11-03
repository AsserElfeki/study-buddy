import { TuitionInfo } from './../types/dataPrep.d';
import { disciplinePath, studyProgramPath } from './apiPaths';
import { Discipline, StudyProgram } from '@prisma/client';
import prisma from './prisma';



export async function getProgramCount(disciplineId: string) : Promise<number> {
    const res: Response = await fetch(`${disciplinePath}/${disciplineId}`, {
        method: "GET",
    })

    const data = await res.json();
    return data.disciplineOnProgram.length;
}


export async function getAllDisciplines(): Promise<Array<Discipline>> {
    const res: Response = await fetch(`${disciplinePath}`, {
        method: 'GET',
    });
    
    const data: Array<Discipline> = await res.json();
    return data;
}

export async function getMaxTuition() : Promise<number> {

    const res: Response = await fetch(`${studyProgramPath}`, {
        method: 'GET',
    });

    const data: Array<StudyProgram> = await res.json();
    
    //filter data to extract the highest tuition
    let fees = data.map((program) => program.tuitionFee);
    let max = Math.max(...fees);
    return max;
}

//get program based on filters in search query
export async function getPrograms(tuMin : number, tuMax: number, disciplineId : string, language : string, duration: string, format : string, attendance : string, degree : string) : Promise<Array<StudyProgram>> {
    const res: Response = await fetch(`${studyProgramPath}?degree=${degree}&language=${language}&attendance=${attendance}&format=${format}&minTuition=${tuMin}&maxTuition=${tuMax}&discipline=${disciplineId}`, {
        method: 'GET',
        // cache: 'no-cache',
    });

    const data: Array<StudyProgram> = await res.json();
    return data;
}