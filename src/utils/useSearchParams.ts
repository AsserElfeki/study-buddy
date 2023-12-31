"use client"
import { useSearchParams } from 'next/navigation';

export function useHandleSearchParams() {
    const searchParams = useSearchParams();

    const name = searchParams?.get("name") ? searchParams.get("name").toString() : '';
    const tuition = searchParams?.get("tuition") ? searchParams.get("tuition").toString() : '';
    const minFee = tuition ? Number(tuition.split(',')[0].split('[')[1]) : null;
    const maxFee = tuition ? Number(tuition.split(',')[1].split(']')[0]) : null;
    const discipline = searchParams?.get("discipline") ? searchParams.get("discipline").toString() : '';
    const language = searchParams?.get("language") ? searchParams.get("language").toString() : '';
    const duration = searchParams?.get("duration") ? searchParams.get("duration").toString() : '';
    const minDuration = duration ? Number(duration.split(',')[0].split('[')[1]) : null;
    const maxDuration = duration ? Number(duration.split(',')[1].split(']')[0]) : null;
    const format = searchParams?.get("format") ? searchParams.get("format").toString() : '';
    const attendance = searchParams?.get("attendance") ? searchParams.get("attendance").toString() : '';
    const degreeType = searchParams?.get("degree") ? searchParams.get("degree").toString() : '';
    const page = searchParams?.get("page") ? Number(searchParams.get("page")) : 1;
    const university = searchParams?.get("university") ? searchParams.get("university").toString() : '';
    
    return { minFee, maxFee, discipline, language, minDuration, maxDuration, format, attendance, degreeType, page, name, university}
}