"use client";

import { useHandleSearchParams } from '@src/utils/useSearchParams';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
// ...

function CurrentFilters({ fee }: { fee: number | null }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const { minFee, maxFee, discipline, language, minDuration, maxDuration, format, attendance, degreeType, name, university } = useHandleSearchParams();

    const props = { discipline, minFee, maxFee, format, language, degreeType, name, minDuration, maxDuration, attendance, university };
    console.log("🚀 ~ file: currentFilters.tsx:19 ~ CurrentFilters ~ maxFixedFee:", fee)
    // console.log(fixedMaxFee)


    const handleCandelParam = (key: string) => () => {
        const params = new URLSearchParams(searchParams);
        if (key === 'minFee' || key === 'maxFee') {
            params.delete('tuition')
        }
        if (key === 'minDuration' || key === 'maxDuration') {
            params.delete('duration')
        }
        else

        params.delete(key);
        router.push(`${pathname}?${params.toString()}`);
    }

    // console.log("🚀 ~ file: currentFilters.tsx:15 ~ CurrentFilters ~ props:", props)
    return (
        <div>
            <Stack spacing={2} className='flex contenr-center flex-col justify-around items-center mt-2'>
                {Object.entries(props).map(([key, value]) => value != 0 && value != null && (
                    <div key={key} >
                        <Button
                            variant="outlined"
                            onClick={handleCandelParam(key)}
                            className='text-sm border-gray-500 text-primary '
                            size='small'
                            endIcon={<DeleteIcon
                                sx={{ color: 'gray' }}
                            />}
                        >
                            {key} : {value}
                        </Button>
                    </div>
                ))}
            </Stack>
        </div>
    )
}

export default CurrentFilters