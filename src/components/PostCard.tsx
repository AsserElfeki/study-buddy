import Image from 'next/image';
import React from 'react';

const PostCard = ({ author, title, body, comments }) => {
    if (!author || !comments || !Array.isArray(comments)) {
        return null; // or render some error message
    }

    return (
        <div className='bg-white shadow-md rounded-lg p-4 mb-6'>
            <div className='flex items-center mb-4'>
                <Image
                    src={ '/images/default.png'}
                    alt={author.name}
                    width={48}
                    height={48}
                    className='rounded-full  mr-4' />
                <div>
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <p className='text-gray-600'>by {author.name}</p>
                </div>
            </div>
            <p className='text-gray-800'>{body}</p>
            <div className='mt-4'>
                <h3 className='text-lg font-semibold mb-2'>Comments:</h3>
                <ul>
                    {comments.map((comment, index) => {
                        if (!comment || !comment.author) {
                            return null; // or render some error message
                        }

                        return (
                            <li key={index} className='bg-gray-100 rounded-lg p-3 mb-2'>
                                <div className='flex items-center'>
                                    <Image
                                        src={ '/images/default.png'}
                                        alt={comment.author.name}
                                        width={32}
                                        height={32}
                                        className='rounded-full mr-3' />
                                    <div>
                                        <p className='text-gray-800 font-semibold'>{comment.author.name}</p>
                                        <p className='text-gray-600'>{comment.content}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PostCard;