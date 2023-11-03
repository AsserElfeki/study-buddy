"use client"
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Role, searchQueryParamKeys } from '@prisma/client'

type Props = {
    name?: string,
    id?: string,
    count?: number,
    inputProps: {
        step: number,
        shrink: boolean,
        min: number,
        max: number
    }

};

function valuetext(value: number) {
    return `${value} EURO`;
}

export default function TuitionCard(props: Props) {
    const inputProps = props.inputProps;

    const [value, setValue] = useState<number[]>([inputProps.min, inputProps.max]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        console.log(value)
        handleSearch(value)
    };

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    function handleSearch(term: number[]) {
        const params = new URLSearchParams(searchParams);
        if (term)
            params.set("TuitionFees", `[${term[0]},${term[1]}]`);
        else
            params.delete("TuitionFees");

        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col gap-4  justify-center items-center">
            <div className="flex justify-around gap-8 pt-2">
                <TextField
                    id="standard-number"
                    label="from"
                    type="number"
                    variant="outlined"
                    size='small'
                    value = {value[0]}
                    inputProps={props.inputProps}
                    onChange={() => handleChange}
                />
                <TextField
                    id="standard-number"
                    label="up to"
                    type="number"
                    variant="outlined"
                    size='small'
                    value={value[1]}
                    inputProps={props.inputProps}
                    onChange={() => handleChange}
                />
            </div>
            <Box className="flex justify-center w-4/5">
                <Slider
                    className='w-full'
                    getAriaLabel={() => 'Tuition Fees'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={inputProps.min}
                    max={inputProps.max}
                    // size='small'
                />
            </Box>
        </div>
    )
}




