import Image from 'next/image';

type Author = {
    firstName: string;
    lastName: string;
    image?: string;
}
type Comment = {
    id: string;
    content: string;
    createdAt: Date;
    postId: string;
    authorId: string;
    author: Author;
}

type Props = {
    comment: Comment;
}

export default function CommentCard({ comment }: Props) {
    
    return (
        <div className=' rounded-lg p-3 border-2 mb-1 shadow-sm bg-white'>
            <div className='flex  flex-col'>
                <div className='flex flex-row justify-start items-center mb-2 bg-zinc-100 w-fit rounded-md px-2'>
                <Image
                    src={comment.author.image !== null ?comment.author.image : '/images/default.png'}
                    alt={comment.author.firstName}
                    width={32}
                    height={32}
                    className='rounded-full h-8 w-8 mr-3'
                />
                    <p className='text-gray-800 font-semibold'>{comment.author.firstName + ' ' + comment.author.lastName}</p>
                </div>
                    <p className='text-gray-800'>{comment.content}</p>
            </div>
        </div>
    );
}
