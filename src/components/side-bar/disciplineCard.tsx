import { getProgramCount } from '@src/lib/search-disciplines';

//react component that accepts prop of type string
type Props = {
    name: string,
    id: string,
};

export default async function DisciplineCard(props: Props) {
    const count = await getProgramCount(props.id);
    return (
        <div className='flex justify-between px-8'>
            <span>{props.name}</span>
            <span>{count}</span>
        </div>
    )
}


