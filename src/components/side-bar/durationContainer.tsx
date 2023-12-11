"use client";
import {  getMaxDuration, getMaxTuition } from '@src/lib/searchFilters'
import TuitionCard from './tuitionCard';
import { useEffect, useState } from 'react';
import DurationionCard from './durationCard';

export default  function DurationContainer() {
    const [maxFee, setMaxFee] = useState(0);
    // console.log("🚀 ~ file: tuitionContainer.tsx:10 ~ TuitionContainer ~ maxFee:", maxFee)

    useEffect(() => {
        const fetchMaxDuration = async () => {
            const maxDuration = await getMaxDuration();
            // console.log("🚀 ~ file: durationContainer.tsx:14 ~ fetchMaxDuration ~ maxTuition:", maxDuration)
            
            setMaxFee(maxDuration);
        };

        fetchMaxDuration();
    }, []);

    const inputProps = {
        step: 0.5,
        shrink: "true",
        min: 0,
        max: maxFee || 100000
    };

    return (
        <>
            <DurationionCard inputProps={inputProps} /> 
        </>

    )
}

