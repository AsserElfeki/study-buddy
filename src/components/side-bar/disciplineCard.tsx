"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
    name: string,
    id: string,
    count: number,

};

export default function DisciplineCard(props: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term)
            params.set('discipline', term);
        else
            params.delete('discipline');

        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        
        <div className='flex justify-between px-8'>
            <button
                className='font-inter font-bold text-start hover:shadow-md'
                onClick={() => handleSearch(props.id)}>{props.name}
            </button>
            <span>{props.count}</span>
        </div>
    )
}


