"use client";

import { useHandleSearchParams } from '@src/utils/useSearchParams';
import { useRouter, useSearchParams } from 'next/navigation';

// ...

function CurrentFilters() {
    const searchParams = useSearchParams();

    const { minFee, maxFee, discipline, language, duration, format, attendance, degreeType } = useHandleSearchParams(searchParams);

    const props = { discipline, minFee, maxFee, format, language, degreeType };

    // console.log("🚀 ~ file: currentFilters.tsx:15 ~ CurrentFilters ~ props:", props)
    return (
        <div>
            {Object.entries(props).map(([key, value]) => value && (
                <div key={key} className="flex flex-row">
                    <span>{`${key}: ${value}`}</span>
                    <button onClick={() => console.log(`Remove ${key}`)}>x</button>
                </div>
            ))}
        </div>
    )
}

export default CurrentFilters