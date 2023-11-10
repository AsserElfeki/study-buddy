import UniversitiesContainer from '@src/components/universitiesContainer';
import { getUniversity } from '@src/lib/searchFilters';
import React from 'react'
import UniversityCard from '@src/components/universityCard';

async function University({ params }: { params: { id: string } | null }) {

    const uni = await getUniversity(params.id);
    console.log("🚀 ~ file: page.tsx:10 ~ University ~ uni:", uni)


    return (
        <section>
            <UniversityCard university={uni} />
            <div className='flex flex-col gap-4'>
                <UniversitiesContainer studyPrograms={uni.studyPrograms} university={uni} itemsPerPage={10} />
            </div>
        </section>
    );

}

export default University

