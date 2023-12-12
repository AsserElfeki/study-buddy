"use client";

import { getPrograms } from '@src/lib/searchFilters';
import StudyProgramCard from './studyProgramCard';
import { StudyProgram } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useHandleSearchParams } from '@src/utils/useSearchParams';
import PaginationContainer from './paginationContainer';

export default function SearchResults() {
    const [programs, setPrograms] = useState<StudyProgram[]>([]);
    // console.log("🦄 ~ file: searchResults.tsx:12 ~ SearchResults ~ programs:", programs)

    const { minFee, maxFee, discipline, language, minDuration, maxDuration, format, attendance, degreeType, name, university } = useHandleSearchParams();
    
    useEffect(() => {
        const fetchPrograms = async () => {
            const fetchedPrograms: StudyProgram[] = await getPrograms({
                tuMin: minFee,
                tuMax: maxFee,
                disciplineName: discipline,
                name,
                language,
                minDuration,
                maxDuration,
                format,
                attendance,
                degree: degreeType,
                universityName: university

            });
            setPrograms(fetchedPrograms);
            
        };
        fetchPrograms();
    }, [minFee, maxFee, discipline, language, format, attendance, degreeType, name, university, minDuration, maxDuration]);


    return (
        <div className='flex flex-col justify-center items-center gap-4 p-4 self-start w-full'>
            <h1 className='text-4xl font-bold text-primary'>Found {programs.length? programs.length : 0} program(s) matching your criteria</h1>
            <PaginationContainer totalItems={programs.length} itemsPerPage={10}>
            {programs.length > 0 && programs.map((program) => (
                <StudyProgramCard
                    key={program.id}
                    title={program.name}
                    id = {program.id}
                    description={program.description}
                    university={program["university"]}
                    tuition={program.tuitionFee}
                    duration={program.duration}
                    tuitionCycle={program.paymentCycle}
                />
            ))}
            </PaginationContainer>
            
        </div>
    )
}