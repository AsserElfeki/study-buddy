"use client"
import { useSearchParams } from 'next/navigation';

export function useHandleSearchParams() {
    const searchParams = useSearchParams();


    const tuition = searchParams?.get("tuition") ? searchParams.get("tuition").toString() : '';
    const minFee = tuition ? Number(tuition.split(',')[0].split('[')[1]) : null;
    const maxFee = tuition ? Number(tuition.split(',')[1].split(']')[0]) : null;
    const discipline = searchParams?.get("discipline") ? searchParams.get("discipline").toString() : '';
    const language = searchParams?.get("language") ? searchParams.get("language").toString() : '';
    const duration = searchParams?.get("duration") ? searchParams.get("duration").toString() : '';
    const format = searchParams?.get("format") ? searchParams.get("format").toString() : '';
    const attendance = searchParams?.get("attendance") ? searchParams.get("attendance").toString() : '';
    const degreeType = searchParams?.get("degree") ? searchParams.get("degree").toString() : '';
    const page = searchParams?.get("page") ? Number(searchParams.get("page")) : 1;
    
    return {minFee, maxFee, discipline, language, duration, format, attendance, degreeType, page}
}