import HomeSearch from '@src/components/homeSearch';
import { getAllDisciplines, getDisciplineNames, getProgramNames, getProgramsCount, getUniversityCount } from '@src/lib/searchFilters';

async function SearchBox() {

    const programCount = await getProgramsCount();
    const universityCount = await getUniversityCount();
    const disciplines = (await getAllDisciplines()).map((discipline) => {
        return {
            label: discipline.name,
            id: discipline.id
        }
    })
    
    // const programNames = await getProgramNames();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
            <div className="text-center">
                <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                    Bachelor&apos;s degrees from all around Poland
                </h2>
                <div className='mt-4'>
                    <span className="font-bold text-xl">
                        {programCount}
                    </span>
                    <span className="text-lg font-normal"> Programs & </span>
                    <span className="font-bold text-xl">
                        {universityCount}
                    </span>
                    <span className="text-lg font-normal"> Universities</span>
                </div>
            </div>
            <HomeSearch disciplineNames={disciplines} />
            
        </div>
    );
};

export default SearchBox