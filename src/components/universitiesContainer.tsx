"use client";

import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { StudyProgram, University } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import StudyProgramCard from './studyProgramCard';




interface PaginationContainerProps {
    studyPrograms: StudyProgram[];
    university?: University;
    itemsPerPage: number;
}

const PaginationContainer: React.FC<PaginationContainerProps> = ({ studyPrograms, university, itemsPerPage }) => {
    const [items, setItems] = useState(studyPrograms);
    // useEffect(() => {
    //     setItems(studyPrograms);
    // }, []);

    console.log("🚀 ~ file: universitiesContainer.tsx:23 ~ items:", items)
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const endIndex = indexOfLastItem > (items ? items.length : 0) ? (items ? items.length : 0) : indexOfLastItem;
        const page = searchParams.get('page');
        const pageNumber = Number(page) || 1;
        setCurrentPage(pageNumber);
        if (items && items.length > 0)
            setCurrentItems(items.slice(indexOfFirstItem, endIndex));
    }, [currentPage, items, searchParams, itemsPerPage]);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        router.push(`${pathname}?${params.toString()}`);
    }
    return (
        <>
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
                <div className={`${items && items.length > 10 ? 'flex' : 'hidden'}  flex-row justify-center items-center gap-2 `}>
                    <IconButton
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <NavigateBeforeIcon />
                    </IconButton>
                    {currentPage}
                    <IconButton
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
                    >
                        <NavigateNextIcon />
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default PaginationContainer;