"use client";
import {  getMaxTuition } from '@src/lib/searchFilters'
import TuitionCard from './tuitionCard';
import { useEffect, useState } from 'react';

export default  function TuitionContainer() {
    const [maxFee, setMaxFee] = useState(0);
    console.log("🚀 ~ file: tuitionContainer.tsx:10 ~ TuitionContainer ~ maxFee:", maxFee)

    useEffect(() => {
        const fetchMaxTuition = async () => {
            const maxTuition = await getMaxTuition();
            
            setMaxFee(maxTuition);
        };

        fetchMaxTuition();
    }, []);

    const inputProps = {
        step: 100,
        shrink: "true",
        min: 0,
        max: maxFee
    };

    return (
        <>
            <TuitionCard inputProps={inputProps} /> 
        </>

    )
}

