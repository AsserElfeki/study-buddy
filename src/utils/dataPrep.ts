import { Program } from './../types/dataPrep.d';
import * as fs from 'fs';

const universityDataFile = './src/utils/Data.json';
const disciplineDataFile = './src/utils/Disciplines.json';


export function getDataArray(): Program[] {
    const rawData = fs.readFileSync(universityDataFile, 'utf-8');
    const jsonData = JSON.parse(rawData) as Record<string, Program>;

    const dataArray: Program[] = Object.values(jsonData).map((data) => ({
        studyProgram: data.studyProgram,
        university: data.university,
        discipline: data.discipline,
    }));

    return dataArray;
}


export function getDisciplinesSeedData(): string[] {
    // Read the JSON file
    const data = getDataArray();
    const disciplines: string[] = [];
    for (const program of data) {
        for (const discipline of program.discipline.programDisciplines) {
            if (!disciplines.includes(discipline.trim())) {
                disciplines.push(discipline.trim());
            }
        }
    }
    return disciplines;
}

export function getUniversitySeedData() {
    const data: Program[] = getDataArray();
    const seeds: Program["university"][] = [];
    for (const program of data) {
        //check if university already exists
        if (seeds.find((seed) => seed.universityName === program.university.universityName)) {
            continue;
        }
        seeds.push(program.university);
    }
    return seeds;
}

// export function getStudyProgramSeedData() {
//     const data: Program[] = getDataArray();
//     const studyPrograms: {}[] = []
//     for (const program of data) {
//         studyPrograms.push({ ...program.studyProgram, ...program.discipline });
//     }
//     return studyPrograms;
// }


// console.log(getDisciplinesSeedData())