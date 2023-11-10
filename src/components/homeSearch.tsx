"use client"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import { use, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Discipline } from '@prisma/client';
import { getAllDisciplines } from '@src/lib/searchFilters';



type DisciplineOption = {
    label: string;
    id: string; 
};
type DisciplineOptionsArray = DisciplineOption[];



function HomeSearch( ) {

    const [disciplines, setDisciplines] = useState<DisciplineOptionsArray>();

    useEffect( () => {
        const fetchData = async () => {
            const disciplines = await getAllDisciplines();
            const disciplineNames = disciplines.map((discipline) => {
                return {
                    label: discipline.name,
                    id: discipline.id
                }
            })
            setDisciplines(disciplineNames);
        }
        fetchData();
    }, [])
    
    const [selectedDiscipline, setSelectedDiscipline] = useState("");
    console.log("🚀 ~ file: homeSearch.tsx:24 ~ HomeSearch ~ selectedDiscipline:", selectedDiscipline)
    const router = useRouter();
    
    const handleSearch = () => {
        if(selectedDiscipline)
        router.push(`/search?discipline=${selectedDiscipline}`);
    }

    

    return (
        <div className="flex flex-col justify-center">
            <div className='flex flex-row mt-4 justify-around'>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={disciplines}
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