"use client";

import { IconButton } from '@mui/material';
import { useHandleSearchParams } from '@src/utils/useSearchParams';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
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
    // const [items, setItems] = useState([]);
    
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const router = useRouter();

    const { page } = useHandleSearchParams(searchParams);

    // const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentChildren = React.Children.toArray(children).slice(indexOfFirstItem, indexOfLastItem);

    // console.log("🚀 ~ file: searchResults.tsx:45 ~ SearchResults ~ programs:", programs);
    // const endIndex = indexOfLastItem > items.length ? items.length : indexOfLastItem;
    // let currentItems = []

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            {currentChildren}

            <div className={`${totalItems > itemsPerPage ? 'flex' : 'hidden'} flex-row justify-center items-center gap-2 bottom-0`}>
                <IconButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <NavigateBeforeIcon />
                </IconButton>
                {currentPage}
                <IconButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                >
                    <NavigateNextIcon />
                </IconButton>
            </div>
        </>
    )
}

export default PaginationContainer