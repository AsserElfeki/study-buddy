import PaginationContainer from '@src/components/paginationContainer';
import StudyProgramCard from '@src/components/studyProgramCard';
import { getUniversity } from '@src/lib/searchFilters';
import React from 'react'

async function University({ params }: { params: { id: string } }) {

    const uni = await getUniversity(params.id);
    // console.log("🚀 ~ file: page.tsx:9 ~ University ~ uni:", uni)
    const programs = uni.studyPrograms;
    return (
        <div className='flex flex-col gap-4'>
            <PaginationContainer studyPrograms={programs} university={uni} />
            {/* {uni.studyPrograms && Array.isArray(uni.studyPrograms) && uni.studyPrograms.map(program => (
                <StudyProgramCard
                    key={program.id}
                    title={program.name}
                    description={program.description}
                    university={uni}
                    tuition={program.tuitionFee}
                    tuitionCycle={program.tuitionCycle}
                    duration={program.duration}
                />
            ))} */}
            
        </div>
    );

}

export default University

