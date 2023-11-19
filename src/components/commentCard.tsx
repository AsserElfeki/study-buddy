import Image from 'next/image';
import React from 'react';

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
        <div className='bg-gray-100 rounded-lg p-3 border-2 mb-1 shadow-sm'>
            <div className='flex items-center'>
                <Image
                    src={comment.author.image !== null ?comment.author.image : '/images/default.png'}
                    alt={comment.author.firstName}
                    width={32}
                    height={32}
                    className='rounded-full h-8 w-8 mr-3' />
                <div>
                    <p className='text-gray-800 font-semibold'>{comment.author.firstName + ' ' + comment.author.lastName}</p>
                    <p className='text-gray-600'>{comment.content}</p>
                </div>
            </div>
        </div>
    );
}
