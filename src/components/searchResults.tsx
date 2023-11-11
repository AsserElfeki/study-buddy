"use client";

import { getPrograms } from '@src/lib/searchFilters';
import StudyProgramCard from './studyProgramCard';
import { StudyProgram } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useHandleSearchParams } from '@src/utils/useSearchParams';
import { getCostOfLiving } from '@src/lib/costOfLiving';

export default function SearchResults() {
    const [programs, setPrograms] = useState<StudyProgram[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    const router = useRouter();
    


    const { minFee, maxFee, discipline, language, duration, format, attendance, degreeType} = useHandleSearchParams(searchParams);
    console.log("💫 ~ file: searchResults.tsx:22 ~ SearchResults ~ useHandleSearchParams:",discipline )

    
    useEffect(() => {
        const fetchPrograms = async () => {
            console.log("useEffect fired ")
            await getCostOfLiving("krakow"); 
            const fetchedPrograms: StudyProgram[] = await getPrograms({
                tuMin: minFee,
                tuMax: maxFee,
                disciplineName: discipline,
                language,
                duration,
                format,
                attendance,
                degree: degreeType
            });
            // console.log("✅✅✅ ~ file: searchResults.tsx:26 ~ programs:", fetchedPrograms.length);
            setPrograms(fetchedPrograms);
            
        };
        handlePageChange(1);
        fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minFee, maxFee, discipline, language, duration, format, attendance, degreeType]);

    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // console.log("🚀 ~ file: searchResults.tsx:45 ~ SearchResults ~ programs:", programs);
    const endIndex = indexOfLastItem > programs.length ? programs.length : indexOfLastItem;
    let currentItems = []
    // console.log("start , end:", indexOfFirstItem, endIndex)
    if (programs.length > 0)
        currentItems = programs.slice(indexOfFirstItem, endIndex);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className='flex flex-col justify-center items-center gap-4 p-4 self-start w-full'>
            <h1 className='text-4xl font-bold text-primary'>Found {programs.length? programs.length : 0} program(s) matching your criteria</h1>
            {currentItems.map((program) => (
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
            <div className={`${programs.length > 10 ? 'flex' : 'hidden'}  flex-row justify-center items-center gap-2  bottom-0`}>
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
    )
}