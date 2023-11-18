'use client';

import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import prisma from '@src/lib/prisma';
import PostCard from '@src/components/PostCard';

function ForumPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await prisma.post.findMany(); // Adjust the API endpoint as needed
                setPosts(response);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);


    return (
        <>
            <div className='w-full max-w-xl'>
                <h1 className='font-black text-2xl text-center mb-6'>Forum Page</h1>
                <PostCard
                    author={{ name: 'John Doe', image: '' }}
                    title='Sample Post Title'
                    body='This is a sample post body.'
                    comments={[
                        { author: { name: 'Jane Doe', image: '/path/to/image.jpg' }, content: 'Sample comment content.' },
                        // Add more static comments as needed
                    ]}
                />
                <PostCard
                    author={{ name: 'John Doe', image: '' }}
                    title='Sample Post Title'
                    body='This is a sample post body.'
                    comments={[
                        { author: { name: 'Jane Doe', image: '/path/to/image.jpg' }, content: 'Sample comment content.' },
                        // Add more static comments as needed
                    ]}
                />
                <PostCard
                    author={{ name: 'John Doe', image: '' }}
                    title='Sample Post Title'
                    body='This is a sample post body.'
                    comments={[
                        { author: { name: 'Jane Doe', image: '/path/to/image.jpg' }, content: 'Sample comment content.' },
                        // Add more static comments as needed
                    ]}
                />
            </div>
            
        </>
    )
}

export default ForumPage