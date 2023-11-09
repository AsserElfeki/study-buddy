import PaginationContainer from '@src/components/universitiesContainer';
import StudyProgramCard from '@src/components/studyProgramCard';
import { getUniversity } from '@src/lib/searchFilters';
import React from 'react'
import { type } from 'os';

async function University({ params }: { params: { id: string } }) {

    const uni = await getUniversity(params.id);
    // console.log("🚀 ~ file: page.tsx:9 ~ University ~ uni:", uni)
    const programs = uni.studyPrograms;
    
    return (
        <div className='flex flex-col gap-4'>
            <PaginationContainer studyPrograms={uni.studyPrograms} university={uni} itemsPerPage={2} /> 
        </div>
    );

}

export default University

