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

export async function getPrograms({
    tuMin,
    tuMax,
    disciplineId,
    language,
    duration,
    format,
    attendance,
    degree,
    universityId,
}: {
    tuMin?: number;
    tuMax?: number;
    disciplineId?: string;
    language?: string;
    duration?: string;
    format?: string;
    attendance?: string;
    degree?: string;
    universityId?: string;
} = {}): Promise<Array<StudyProgram>> {
    console.log("get programs func 🎉");

    const queryParams = new URLSearchParams();
    if (degree) queryParams.append('degree', degree);
    if (language) queryParams.append('language', language);
    if (attendance) queryParams.append('attendance', attendance);
    if (format) queryParams.append('format', format);
    if (tuMin) queryParams.append('minTuition', tuMin.toString());
    if (tuMax) queryParams.append('maxTuition', tuMax.toString());
    if (disciplineId) queryParams.append('discipline', disciplineId);
    if (universityId) queryParams.append('universityId', universityId);
    const url = `${studyProgramPath}?${queryParams.toString()}`;
    console.log(`🌍${url}`);

    const res: Response = await fetch(url, {
        method: "GET",
    });

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
    console.log("woohoooo 🎉");
    const res: Response = await fetch(`${universityPath}/${id}`, {
        method: 'GET',
        // cache: 'no-cache',
    });
    const data = await res.json();
    console.log("🚀 ~ file: searchFilters.ts:132 ~ getUniversity ~ data:", data)
    return data;
}
