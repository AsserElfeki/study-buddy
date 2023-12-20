"use server"
import { disciplinePath, studyProgramPath, universityPath } from './apiPaths';
import { Discipline, StudyProgram, University } from '@prisma/client';
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

/**
 * Retrieves a list of study programs based on the specified filters.
 *
 * @param {Object} options - An object containing the filter options:
 *   @param {number} options.tuMin - The minimum tuition value.
 *   @param {number} options.tuMax - The maximum tuition value.
 *   @param {string} options.disciplineName - The name of the discipline.
 *   @param {string} options.language - The language of the program.
 *   @param {number} options.minDuration - The minimum duration of the program.
 *   @param {number} options.maxDuration - The maximum duration of the program.
 *   @param {string} options.format - The format of the program.
 *   @param {string} options.attendance - The attendance mode of the program.
 *   @param {string} options.degree - The degree level of the program.
 *   @param {string} options.universityId - The ID of the university.
 *   @param {string} options.name - The name of the program.
 *   @param {string} options.universityName - The name of the university.
 * @return {Promise<Array<StudyProgram>>} A promise that resolves to an array of study programs.
 */
export async function getPrograms({
    tuMin,
    tuMax,
    disciplineName,
    language,
    minDuration,
    maxDuration,
    format,
    attendance,
    degree,
    universityId,
    name,
    universityName
}: {
    tuMin?: number;
    tuMax?: number;
    disciplineName?: string;
    language?: string;
    minDuration?: number;
    maxDuration?: number;
    format?: string;
    attendance?: string;
    degree?: string;
    universityId?: string;
    name?: string;
    universityName?: string;
} = {}): Promise<Array<StudyProgram>> {
    // console.log("💧", disciplineName)
    let disciplineId = null;
    if (disciplineName) {
        const desciplineRes: Response = await fetch(`${disciplinePath}?name=${disciplineName}`, {
            method: "GET",
            cache: 'no-cache',
        });

        const desciplineData = await desciplineRes.json();
        // console.log("🌈 ~ file: searchFilters.ts:62 ~ desciplineRes:", desciplineData)
        if (desciplineData) {
            // console.log("🇨🇳 ~ file: searchFilters.ts:68 ~ desciplineData:", desciplineData)
            disciplineId = desciplineData[0].id;
            // console.log("🎽 ~ file: searchFilters.ts:68 ~ disciplineId:", disciplineId)
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
    if (minDuration) queryParams.append('minDuration', minDuration.toString());
    if (maxDuration) queryParams.append('maxDuration', maxDuration.toString());
    if (name) queryParams.append('name', name);
    if (universityName) queryParams.append('universityName', universityName);
    const url = `${studyProgramPath}?${queryParams.toString()}`;
    console.log(`🌍${url}`);

    const res: Response = await fetch(url, {
        method: "GET",
        cache: 'no-cache',
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
    return JSON.stringify(data.length);
}

export async function getProgramNames() {
    const res: Response = await fetch(`${studyProgramPath}`, {
        method: 'GET',
    });

    const data: Array<StudyProgram> = await res.json();
    let names = data.map((program) => program.name);
    // console.log("🚀 ~ file: searchFilters.ts:73 ~ getProgramNames ~ names:", names)
    return JSON.stringify(names);
}

export async function getUniversityNames() {
    const res: Response = await fetch(`${universityPath}`, {
        method: 'GET',
    });
    const data = await res.json();
    let names = data.map((university) => university.name);
    return JSON.stringify(names);
}

export async function getDisciplineNames() {
    const res: Response = await fetch(`${disciplinePath}`, {
        method: 'GET',
    });
    const data = await res.json();
    let names = data.map((discipline: Discipline) => discipline.name);
    return JSON.stringify(names);
}

export async function getUniversity(id: string) {
    console.log("woohoooo 🎉");
    const res: Response = await fetch(`${universityPath}/${id}`, {
        method: 'GET',
        cache: 'no-cache',
    });
    const data = await res.json();
    // console.log("🚀 ~ file: searchFilters.ts:132 ~ getUniversity ~ data:", data)
    return data;
}

export async function getProgram(id: string) {
    const res: Response = await fetch(`${studyProgramPath}/${id}`, {
        method: 'GET',
        cache: 'no-cache',
    });
    // console.log("🚀 ~ file: searchFilters.ts:144 ~ getProgram ~ `${studyProgramPath}/${id}`:", `${studyProgramPath}/${id}`)

    const data = await res.json();
    return data;
}

export async function getMaxDuration() {
    //return max duration from study programs
    const res = await prisma.studyProgram.aggregate({
        _max: {
            duration: true
        }
    })
    console.log("🚀 ~ file: searchFilters.ts:182 ~ getMaxDuration ~ res:", res)
    return res._max.duration;
}




