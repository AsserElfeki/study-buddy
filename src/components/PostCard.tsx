import { ThumbUp, Comment as CommentIcon } from '@mui/icons-material';
import Image from 'next/image';
import React from 'react';
import CommentCard from './commentCard';
import AddComment from './addComment';
// import { Post } from '@prisma/client';

// here rendering the postcard component from the props passed from the forum page
// and also rendering the comment card component from the props passed from the postcard component
// there should be a form component here to add new posts and comments 

type Comment = {
    id: string;
    content: string;
    createdAt: Date;
    postId: string;
    authorId: string;
    author: Author;
}
type Author = {
    firstName: string;
    lastName: string;
    image?: string;
}
type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    authorId: string;
    author: Author;
    comments?: Comment[];
}

type Props = {
    post: Post;
}

function PostCard( {post} : Props) {
    return (
        <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md rounded-lg p-4 mb-6 text-white'>
            <div className='flex items-center mb-4'>
                <Image 
                    src={post.author.image!== null? post.author.image : '/images/default.png'}
                    alt={post.author.firstName + ' ' + post.author.lastName}
                    width={48}
                    height={48} 
                    className='rounded-full h-12 w-12 mr-4 border-2 border-white' />
                <p className='text-gray-900'>{post.author.firstName + ' ' + post.author.lastName}</p>
            </div>
            {post.title && <h2 className='text-xl font-bold mb-2'>{post.title}</h2>}
            <p className='text-gray-800'>{post.content}</p>
            <div className='flex items-center justify-between mt-4'>
                <div className='flex items-center'>
                    <ThumbUp className='mr-2' />
                    {/* <span>{post.likes}</span> */}
                    <CommentIcon className='ml-4 mr-2' />
                    <span>{post.comments.length}</span>
                </div>
                <div>
                    <button className='p-2 rounded-full bg-blue-500 text-white'>
                        <ThumbUp />
                    </button>
                    <button className='p-2 rounded-full bg-green-500 text-white ml-2'>
                        <CommentIcon />
                    </button>
                </div>
            </div>
            <div className='mt-4'>
                {post.comments.map((comment, index) => (
                    <CommentCard key={index} comment={comment} />
                ))}
            </div>
            <AddComment />
        </div>
    );
}

export default PostCard;