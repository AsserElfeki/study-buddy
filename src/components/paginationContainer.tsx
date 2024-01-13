"use client";

import { IconButton } from '@mui/material';
import { useHandleSearchParams } from '@src/utils/useSearchParams';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React from 'react';


type PaginationContainerProps =  {
    children: React.ReactNode;
    totalItems: number;
    itemsPerPage?: number;
}

function PaginationContainer({ children, totalItems, itemsPerPage = 10 }: PaginationContainerProps) {
    const [currentPage, setCurrentPage] = useState(1);
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const { page } = useHandleSearchParams();
    useEffect(() => {
        handlePageChange(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentChildren = React.Children.toArray(children).slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className='mx-auto w-full'>
            {currentChildren}

            <div className={`${totalItems > itemsPerPage ? 'flex' : 'hidden'} flex-row justify-center items-center gap-2 bottom-0`}>
                <IconButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <NavigateBeforeIcon />
                </IconButton>
                {currentPage} / {totalPages}
                <IconButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                >
                    <NavigateNextIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default PaginationContainer