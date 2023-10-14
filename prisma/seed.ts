import { PrismaClient, studyProgramLanguage, Prisma } from "@prisma/client";
import { hashPassword } from '../src/lib/hashPasswords';
import cuid from 'cuid';
import { getDisciplinesSeedData, getUniversitySeedData, getDataArray, extractTuitionInfo, extractDuration } from '../src/utils/dataPrep';


const prisma = new PrismaClient();
async function seed() {
    const studyProgramSeedData = getDataArray();
    const amountOfData = studyProgramSeedData.length;

    const disciplineIDs = []

    //create disciplines
    const disciplineSeedData = getDisciplinesSeedData();
    for (const discipline of disciplineSeedData) {
        const newDiscipline = await prisma.discipline.create({
            data: {
                id: cuid(),
                name: discipline.toLowerCase()
            }
        })
        console.log("🚀 created new Discipline:", newDiscipline.name)
        disciplineIDs.push({ id: newDiscipline.id, name: newDiscipline.name });
    }
    // console.log("🚀 ~ file: seed.ts:27 ~ seed ~ disciplineIDs:", disciplineIDs)
    
    //================================================

    //create universities
    const universitySeedData = getUniversitySeedData();
    //used as a placeholder for university ids
    // to use it to connect to the study programs
    const universityIDs = []

    for (let i = 0; i < universitySeedData.length ; i++) {
        const newUni = await prisma.university.create({
            data: {
                id: cuid(),
                name: universitySeedData[i].universityName.trim().toLowerCase(),
                location: universitySeedData[i].location.trim().toLowerCase(),    
            }
        })
        console.log("🚀 created university:",i, newUni.name, newUni.id)
        universityIDs.push({id: newUni.id, name: newUni.name});
    }
    //================================================
    // create StudyPrograms

    const studyProgramIDs = []
    for (let i = 0; i < amountOfData; i++) {
        const tuitionInfo = extractTuitionInfo(studyProgramSeedData[i]["studyProgram"].tuition_fee);
        // console.log("🚀 ~ file: seed.ts:53 ~ seed ~ tuitionInfo:", tuitionInfo)
        const amount : number = tuitionInfo.amount;
        const paymentCycle: string = tuitionInfo.paymentCycle;
        
        const languageRequirement = studyProgramSeedData[i]["studyProgram"]["languageRequirments"]
        const IELTS = parseFloat(languageRequirement.ieltsScore) || null;
        const TOEFL = parseInt(languageRequirement.toeflScore) || null;
        const programDuration = extractDuration(studyProgramSeedData[i]["studyProgram"].duration);

        const newProgram = await prisma.studyProgram.create({
            data: {
                id: cuid(),
                name: studyProgramSeedData[i]["studyProgram"].name.trim().toLowerCase(),
                description: studyProgramSeedData[i]["studyProgram"].description.trim().toLowerCase(),
                studyProgramLink: studyProgramSeedData[i]["studyProgram"].studyProgramLink.trim().toLowerCase(),
                tuitionFee: amount,
                paymentCycle: paymentCycle.toLowerCase(),
                duration: programDuration,
                format: studyProgramSeedData[i]["studyProgram"].format.trim().toLowerCase(),
                attendance: studyProgramSeedData[i]["studyProgram"].attendance.trim().toLowerCase(),
                degreeType: studyProgramSeedData[i]["studyProgram"].degreeType.trim().toLowerCase(),
                studyProgramLanguage: studyProgramSeedData[i]["studyProgram"].studyProgramLanguage.trim() == "English" ? studyProgramLanguage.EN : studyProgramLanguage.PL,
                applyDate: studyProgramSeedData[i]["studyProgram"].applyDate.trim().toLowerCase(),
                startDate: studyProgramSeedData[i]["studyProgram"].startDate.trim().toLowerCase(),
                IELTSScore: IELTS,
                TOEFLScore: TOEFL,
                university: {
                    connect: {
                        id: universityIDs.find((uni) => uni.name === studyProgramSeedData[i]["university"].universityName.trim().toLowerCase()).id
                    }
                }
            }
        })
        console.log("🚀 created studyProgram:", i, newProgram.name)
        studyProgramIDs.push({ id: newProgram.id, program: studyProgramSeedData[i]});
    }

    //================================================
    // create DisciplineOnProgram
    for (const studyProgram of studyProgramSeedData) {
        // console.log("🚀 ~ file: seed.ts:81 ~ seed ~ studyProgram:", studyProgram)
        
        for (const discipline of studyProgram.discipline.programDisciplines) {
            // console.log("🚀 ~ file: seed.ts:85 ~ seed ~ discipline:", discipline.trim())

            const foundDiscipline = disciplineIDs.find((disciplineItem) => disciplineItem.name.trim().toLowerCase() === discipline.trim().toLowerCase())
            // console.log("🚀 ~ file: seed.ts:85 ~ seed ~ foundDiscipline:", foundDiscipline)
            const foundStudyProgram = studyProgramIDs.find((programItem) => programItem.program === studyProgram)
            // console.log("🚀 ~ file: seed.ts:87 ~ seed ~ foundStudyProgram:", foundStudyProgram)

            const newDisciplineOnProgram = await prisma.disciplineOnProgram.create({
                data: {
                    discipline: {
                        connect: {
                            id: foundDiscipline.id
                        }
                    },
                    studyProgram: {
                        connect: {
                            id: foundStudyProgram.id
                        }
                    }
                }
            })
            console.log("🚀 created new DisciplineOnProgram:", newDisciplineOnProgram)
        }
    }
}

async function main(): Promise<void> {
    const user = await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            email: "admin@admin.com",
            firstName: "Admin",
            lastName: "1",
            password: await hashPassword("password123"),
            role: "ADMIN",
            isActive: true,
            emailVerified: "2022-04-07T21:05:53.424Z",
            id: cuid()

        },
    });
    console.log(`created user with id ${user.id} and email ${user.email}`);

    await seed();
}


main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
