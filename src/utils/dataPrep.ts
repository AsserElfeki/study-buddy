import { Program, TuitionInfo } from './../types/dataPrep.d';
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




export function extractTuitionInfo(str: string): TuitionInfo {
    if (str.trim().toLowerCase() === "free") {
        return { amount: 0, paymentCycle: "FREE" };
    }

    if (!str) {
        return { amount: null, paymentCycle: "unknown" };
    }

    // Match 3 to 5 digit numbers, allowing for commas
    // const amountMatch = str.match(/\d{3,5}(?:,\d{3})*/);
    const amountMatch = str.match(/(\d{1,3}(?:,\d{3})*)/);
    const amount = amountMatch ? parseInt(amountMatch[0].replace(',', '')) : null;

    // Match the specific payment cycle options
    const paymentCycleMatch = str.match(/year|semester|module|full/i);
    const paymentCycle = paymentCycleMatch ? paymentCycleMatch[0] : "unknown";
    // console.log("🚀 ~ file: dataPrep.ts:74 ~ extractTuitionInfo ~ paymentCycle:", paymentCycle)

    return { amount, paymentCycle };
}

