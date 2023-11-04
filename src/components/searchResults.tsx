import { getPrograms } from '@src/lib/searchFilters';
import StudyProgramCard from './studyProgramCard';
import { StudyProgram } from '@prisma/client';

export default async function SearchResults({
    query,
}: {
    query: { [key: string]: string | string[] | undefined };
}) {


    const tuition = query?.tuition ? query.tuition.toString() : '';
    const t1 = tuition ? Number(tuition.split(',')[0].split('[')[1]) : null;
    const t2 = tuition ? Number(tuition.split(',')[1].split(']')[0]) : null;

    const discipline = query?.discipline ? query.discipline.toString() : '';
    const language = query?.language ? query.language.toString() : '';

    const duration = query?.duration ? query.duration.toString() : '';
    const format = query?.format ? query.format.toString() : '';
    const attendance = query?.attendance ? query.attendance.toString() : '';
    const degree = query?.degree ? query.degree.toString() : '';
    // console.log("🚀 ~ file: searchResults.tsx:20 ~ degree:", degree)

    const programs: StudyProgram[] = await getPrograms(t1, t2, discipline, language, duration, format, attendance, degree)
    console.log("🚀 ~ file: searchResults.tsx:26 ~ programs:", programs)

    return (
        <div className='p-4 w-full flex justify-center'>
            {/* {programs.map((program) => (
                <StudyProgramCard
                    key={program.id}
                    title={program.name}
                    description={program.description}
                    university={program["university"]}
                    tuition={program.tuitionFee}
                    duration={program.duration}
                    tuitionCycle={program.paymentCycle}
                />
            ))} */}
        </div>
    )
}