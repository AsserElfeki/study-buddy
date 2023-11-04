"use client"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Discipline } from '@prisma/client';

type DisciplineOption = {
    label: string;
    id: string; 
};
type DisciplineOptionsArray = DisciplineOption[];

interface HomeSearchProps {
    disciplineNames: DisciplineOptionsArray;
}

function HomeSearch({ disciplineNames } : HomeSearchProps) {
    // console.log("🚀 ~ file: homeSearch.tsx:16 ~ HomeSearch ~ disciplineNames:", disciplineNames)

    
    const [selectedDiscipline, setSelectedDiscipline] = useState("");
    const { replace } = useRouter();
    
    const handleSearch = () => {
        if(selectedDiscipline)
        replace(`/search?discipline=${selectedDiscipline}`);
    }
    return (
        <div className="flex flex-col justify-center">
            <div className='flex flex-row mt-4 justify-around'>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={disciplineNames}
                    clearOnEscape
                    autoComplete={true}
                    includeInputInList={true}
                    limitTags={10}
                    onChange={(event, value) => setSelectedDiscipline(value.id)}
                    sx={{ width: 300 }}
                    className='rounded-lg shadow-md'
                    renderInput={(params) => <TextField {...params} label="what do you want to study?" />}
                />
                <Button
                    className='bg-primary text-white font-bold rounded-lg bg-opacity-90'
                    color='error'
                    disableFocusRipple
                    variant="contained"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>

        </div>
    )
}

export default HomeSearch