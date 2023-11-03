"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

//react component that accepts prop of type string
type Props = {
    name: string,
    count: number,
};

export default function DisciplineCard(props: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    // console.log("🚀 ~ file: disciplineCard.tsx:14 ~ DisciplineCard ~ pathname:", pathname)
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
            <button onClick={() => handleSearch(props.name)}>{props.name}</button>
            <span>{props.count}</span>
        </div>
    )
}


