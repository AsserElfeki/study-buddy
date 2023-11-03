import { getAllDisciplines, getMaxTuition, getProgramCount } from '@src/lib/searchFilters'
import DisciplineCard from './disciplineCard'
import { Discipline } from '@prisma/client'
import TuitionCard from './tuitionCard';

export default async function TuitionContainer() {
    const maxFee = await getMaxTuition();
    const inputProps = {
        step: 100,
        shrink: true,
        min: 0,
        max: maxFee
    };

    return (
        <>
            <TuitionCard inputProps={inputProps} /> 
        </>

    )
}

