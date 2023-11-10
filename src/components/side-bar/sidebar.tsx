import { getMaxTuition } from '@src/lib/searchFilters';
import CurrentFilters from './currentFilters';
import DisciplineContainer from './disciplineContainer';
import Toggler from './toggler';
import TuitionContainer from './tuitionContainer';

export default async function Sidebar() {
    const maxFee = await getMaxTuition();
    console.log("🚀 ~ file: sidebar.tsx:9 ~ Sidebar ~ maxFee:", typeof maxFee)
    return (
        <div className='self-start bg-white rounder-xl mt-4 ml-2 shadow-md'>
            <CurrentFilters fee = {maxFee} />
            <Toggler displayName='Disciplines'>
                <DisciplineContainer />
            </Toggler>

            <Toggler displayName='Tuition Fees'>
                <TuitionContainer />
            </Toggler>

        </div>
    )
}

