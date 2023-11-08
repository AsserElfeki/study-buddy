import { TuitionInfo } from './../types/dataPrep.d';
import { disciplinePath, studyProgramPath, universityPath } from './apiPaths';
import { Discipline, StudyProgram } from '@prisma/client';
import prisma from './prisma';

export async function getProgramCountinDiscipline(disciplineId: string): Promise<number> {
    const res: Response = await fetch(`${disciplinePath}/${disciplineId}`, {
        method: "GET",
    })
    const data = await res.json();
    return data.disciplineOnProgram.length; 
}

export async function getAllDisciplines() {
    const res: Response = await fetch(`${disciplinePath}`, {
        method: 'GET',
        // cache: 'no-cache',
    });

    const data = await res.json();
    return data;
}

export async function getMaxTuition(): Promise<number> {

    const res: Response = await fetch(`${studyProgramPath}`, {
        method: 'GET',
    });

    const data: Array<StudyProgram> = await res.json();

    //filter data to extract the highest tuition
    let fees = data.map((program) => program.tuitionFee);
    let max = Math.max(...fees);
    return max;
}

export async function getPrograms(tuMin: number, tuMax: number, disciplineId: string, language: string, duration: string, format: string, attendance: string, degree: string): Promise<Array<StudyProgram>> {
    console.log("get programs func 🎉")
    const res: Response = await fetch(`${studyProgramPath}?degree=${degree}&language=${language}&attendance=${attendance}&format=${format}&minTuition=${tuMin}&maxTuition=${tuMax}&discipline=${disciplineId}`, {
        method: 'GET',
    });
    console.log(`🌍${studyProgramPath}?degree=${degree}&language=${language}&attendance=${attendance}&format=${format}&minTuition=${tuMin}&maxTuition=${tuMax}&discipline=${disciplineId}`)

    const data: Array<StudyProgram> = await res.json();
    return data;
}

export async function getProgramsCount() {
    const res: Response = await fetch(`${studyProgramPath}`, {
        method: 'GET',
    });

    const data: Array<StudyProgram> = await res.json();
    return data.length;
}

export async function getUniversityCount() {
    const res: Response = await fetch(`${universityPath}`, {
        method: 'GET',
    });
    const data = await res.json();
    return data.length;
}

export async function getProgramNames() {
    const res: Response = await fetch(`${studyProgramPath}`, {
        method: 'GET',
    });

    const data: Array<StudyProgram> = await res.json();
    let names = data.map((program) => program.name);
    // console.log("🚀 ~ file: searchFilters.ts:73 ~ getProgramNames ~ names:", names.length)
    return names;
}

export async function getUniversityNames() {
    const res: Response = await fetch(`${universityPath}`, {
        method: 'GET',
    });
    const data = await res.json();
    let names = data.map((university) => university.name);
    return names;
}

export async function getDisciplineNames() {
    const res: Response = await fetch(`${disciplinePath}`, {
        method: 'GET',
    });
    const data = await res.json();
    let names = data.map((discipline: Discipline) => discipline.name);
    return names;
}

export async function getUniversity(id: string) {
    const res: Response = await fetch(`${universityPath}/${id}`, {
        method: 'GET',
    });
    const data = await res.json();
    return data;
}