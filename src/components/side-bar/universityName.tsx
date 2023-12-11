"use client";

import { TextField } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function UniversityNameSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const name = searchParams.get('university');
    const [currentValue, setCurrentValue] = useState("");

    useEffect(() => {
        setCurrentValue(name || "");
    }, [name]);



    function handleSearch(term: string) {
        setCurrentValue(term);
        const params = new URLSearchParams(searchParams);
        if (term)
            params.set('university', term);
        else
            params.delete('university');

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="university name"
                variant="outlined"
                className='rounded-lg shadow-md w-full'
                value={currentValue}
                onChange={(event) => handleSearch(event.target.value)}
            />
        </div>
    )
}

export default UniversityNameSearch