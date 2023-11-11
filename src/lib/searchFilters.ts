"use server"
import { disciplinePath, studyProgramPath, universityPath } from './apiPaths';
import { Discipline, StudyProgram } from '@prisma/client';

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
    disciplineName,
    language,
    duration,
    format,
    attendance,
    degree,
    universityId,
}: {
    tuMin?: number;
    tuMax?: number;
    disciplineName?: string;
    language?: string;
    duration?: string;
    format?: string;
    attendance?: string;
    degree?: string;
    universityId?: string;
} = {}): Promise<Array<StudyProgram>> {
    console.log("💧", disciplineName)
    let disciplineId = null;
    if (disciplineName) {
        const desciplineRes: Response = await fetch(`${disciplinePath}?name=${disciplineName}`, {
            method: "GET",
        });

        const desciplineData = await desciplineRes.json();
        console.log("🌈 ~ file: searchFilters.ts:62 ~ desciplineRes:", desciplineData)
        if (desciplineData) {
            disciplineId = desciplineData[0].id;
            console.log("🎽 ~ file: searchFilters.ts:68 ~ disciplineId:", disciplineId)
        }
    }
    const queryParams = new URLSearchParams();
    if (degree) queryParams.append('degree', degree);
    if (language) queryParams.append('language', language);
    if (attendance) queryParams.append('attendance', attendance);
    if (format) queryParams.append('format', format);
    if (tuMin) queryParams.append('minTuition', tuMin.toString());
    if (tuMax) queryParams.append('maxTuition', tuMax.toString());
    if (disciplineId) queryParams.append('discipline', disciplineId);
    if (universityId) queryParams.append('universityId', universityId);
    if (duration) queryParams.append('duration', duration);
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
        next: {
            revalidate: 10,
        }
    });
    const data = await res.json();
    console.log("🚀 ~ file: searchFilters.ts:132 ~ getUniversity ~ data:", data)
    return data;
}

export async function getProgram(id: string) {
    const res: Response = await fetch(`${studyProgramPath}/${id}`, {
        method: 'GET',
        // cache: 'no-cache',
    });
    // console.log("🚀 ~ file: searchFilters.ts:144 ~ getProgram ~ `${studyProgramPath}/${id}`:", `${studyProgramPath}/${id}`)

    const data = await res.json();
    return data;
}
