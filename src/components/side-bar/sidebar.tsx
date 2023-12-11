import { getMaxTuition } from '@src/lib/searchFilters';
import CurrentFilters from './currentFilters';
import DisciplineContainer from './disciplineContainer';
import Toggler from './toggler';
import TuitionContainer from './tuitionContainer';
import NameSearch from './nameSearch';
import University from '@src/app/university/[id]/page';
import UniversityName from './universityName';
import UniversityNameSearch from './universityName';
import DurationCard from './durationCard';
import LanguageCard from './languageCard';

export default async function Sidebar() {
    const maxFee = await getMaxTuition();
    // console.log("🚀 ~ file: sidebar.tsx:9 ~ Sidebar ~ maxFee:", typeof maxFee)
    return (
        <div className='self-start bg-white rounder-xl mt-4 ml-2 shadow-md flex flex-col gap-4'>
            <CurrentFilters fee = {maxFee} />
            <NameSearch />
            <UniversityNameSearch />
            <Toggler displayName='Disciplines'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Duration'>
                <DurationCard />
            </Toggler>

            <Toggler displayName='Language of study'>
                <LanguageCard />
            </Toggler>

            <Toggler displayName='Tuition Fees'>
                <TuitionContainer />
            </Toggler>

        </div>
    )
}

