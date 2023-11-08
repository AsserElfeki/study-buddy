"use client";

import { IconButton, Pagination } from '@mui/material';
import React, { useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { StudyProgram, University } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import StudyProgramCard from './studyProgramCard';

  

interface PaginationContainerProps {
    studyPrograms: StudyProgram[];
    university?: University;
}

const PaginationContainer: React.FC<PaginationContainerProps> = ({ studyPrograms, university }) => {
console.log("🚀 ~ file: paginationContainer.tsx:19 ~ studyPrograms:", studyPrograms)

    const [programs, setPrograms] = useState<StudyProgram[]>(studyPrograms);
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const itemsPerPage = 10; 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const endIndex = indexOfLastItem > programs.length ? programs.length : indexOfLastItem;

    let currentItems = []
    if (programs.length > 0)
        currentItems = programs.slice(indexOfFirstItem, endIndex);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div>
            <div className='flex flex-col justify-center items-center gap-4 p-4 self-start w-full'>
                
                {currentItems.map((program) => (
                    <StudyProgramCard
                        key={program.id}
                        title={program.name}
                        description={program.description}
                        university={university}
                        tuition={program.tuitionFee}
                        duration={program.duration}
                        tuitionCycle={program.paymentCycle}
                    />
                ))}
            </div>
        <div className={`${programs.length > 10 ? 'flex' : 'hidden'}  flex-row justify-center items-center gap-2 `}>
            <IconButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <NavigateBeforeIcon />
            </IconButton>
            {currentPage}
            <IconButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(programs.length / itemsPerPage)}
            >
                <NavigateNextIcon />
            </IconButton>
            </div>
        </div>

    );
};

export default PaginationContainer;