import { getPrograms } from '@src/lib/searchFilters';

function splitFormats(format: string) {
    const arr = format.split(',');
    const formats = arr.map((item: string) => item.trim());
    return formats;
}

export default async function SearchResults({
    query,
}: {
    query: { [key: string]: string | string[] | undefined };
    }) {
    
    const tuition = query?.tuition ? query.tuition.toString() : '';
    const t1 = tuition ? Number(tuition.split(',')[0].split('[')[1]) : null;
    const t2 = tuition? Number(tuition.split(',')[1].split(']')[0]) : null;

    const discipline = query?.discipline ? query.discipline.toString() : '';
    const language = query?.language ? query.language.toString() : '';

    const duration = query?.duration ? query.duration.toString() : '';
    const format = query?.format ? query.format.toString() : '';
    //chek how many items result from splitting format by comma
    const formatList = splitFormats(format);

    const attendance = query?.attendance ? query.attendance.toString() : '';
    const degree = query?.degree ? query.degree.toString() : '';
    // console.log("🚀 ~ file: searchResults.tsx:20 ~ degree:", degree)

    const programs = await getPrograms(t1, t2, discipline, language, duration, formatList, attendance, degree)
    console.log("🚀 ~ file: searchResults.tsx:26 ~ programs:", programs.length)

    return (
        <div className='p-4 border-4 border-black'>
            {t1} - {t2} 
        </div>
    )
}