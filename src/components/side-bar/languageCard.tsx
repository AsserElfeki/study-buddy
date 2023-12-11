"use client";
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function LanguageCard() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const language = searchParams.get('language');
    const [currentValue, setCurrentValue] = useState(language || "");

    useEffect(() => {
        setCurrentValue(language || "");
    }, [language]);

    function handleSearch() {
        const selectedLanguage = document.querySelector('input[name="language"]:checked')?.id;
        setCurrentValue(selectedLanguage);

        const params = new URLSearchParams(searchParams);
        if (selectedLanguage)
            params.set('language', selectedLanguage);
        else
            params.delete('language');

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            <div className='flex flex-col gap-2 ml-4'>
                <div className='flex items-center gap-2'>
                    <input type="radio" name="language" id="en"
                        onChange={handleSearch} checked={currentValue === "en"} />
                    <label htmlFor="en">English</label>
                </div>
                <div className='flex items-center gap-2'>
                    <input type="radio" name="language" id="pl"
                        onChange={handleSearch} checked={currentValue === "pl"} />
                    <label htmlFor="pl">Polish</label>
                </div>
            </div>
        </>
    )
}

export default LanguageCard;
