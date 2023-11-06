"use client"
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';

type Props = {
    name?: string,
    id?: string,
    count?: number,
    inputProps: {
        step: number,
        shrink: string,
        min: number,
        max: number
    }
};

function valuetext(value: number) {
    return `${value}€`;
}

export default function TuitionCard(props: Props) {
    const inputProps = props.inputProps;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const minFee = searchParams.get('tuition') ? Number(searchParams.get('tuition').split(',')[0].slice(1)) : inputProps.min;
    const maxFee = searchParams.get('tuition') ? Number(searchParams.get('tuition').split(',')[1].slice(0, -1)) : inputProps.max;

    const [currentValues, setCurrentValues] = useState([minFee, maxFee]);


    function handleSearch(min: number, max: number) {
        setCurrentValues([min, max]);
        // console.log("min, max", min, max);
        const params = new URLSearchParams(searchParams);
        if (min > -1) {
            console.log("min in tuitioncard", min.toString());
            if (min == 0) {
                let stringMin = String(0);
                params.set("tuition", `[${stringMin}, ${currentValues[1]}]`);
            }
            else
                params.set("tuition", `[${min.toString()}, ${currentValues[1]}]`);
        }
        console.log("🚀 ~ file: tuitionCard.tsx:48 ~ handleSearch ~ params:", params.toString())

        if (max < inputProps.max)
            params.set("tuition", `[${currentValues[0]}, ${max.toString()}]`);
        if (min == 0 && max == inputProps.max)
            params.delete("tuition");
        // console.log(params.toString());


        
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex justify-around gap-8 pt-2">
                <TextField
                    id="standard-number"
                    label="from"
                    type="number"
                    variant="outlined"
                    size='small'
                    value={currentValues[0]}
                    inputProps={props.inputProps}
                    onChange={(e) => handleSearch(Number(e.target.value), maxFee)}
                />
                <TextField
                    id="standard-number"
                    label="up to"
                    type="number"
                    variant="outlined"
                    size='small'
                    value={currentValues[1]}
                    inputProps={props.inputProps}
                    onChange={(e) => handleSearch(minFee, Number(e.target.value))}
                // onChangeCommitted={(e) => setCurrentValues([Number(e.target.value), maxFee])}
                />
            </div>
            <Box className="flex justify-center w-4/5">
                <Slider
                    className='w-full'
                    getAriaLabel={valuetext}
                    value={currentValues}
                    onChange={(e, value) => handleSearch(value[0], value[1])}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    min={inputProps.min}
                    max={inputProps.max}
                    step={inputProps.step}
                // size='small'
                />
            </Box>
        </div>
    )
}




