"use client";

import React, { useEffect, useState } from 'react'
import PaginationContainer from '../paginationContainer'
import { getMyPosts } from '@src/lib/_profile'
import PostCardComponent from '../postCard';
import AddPostComponent from '../addPostComponent';
import { Place } from '@mui/icons-material';
import Placeholder from './placeHolder';

function MyPosts() {
    //state for posts
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const postsData = await getMyPosts();

            if (postsData.success) {
                setPosts(postsData.data);
            }
        }

        fetchData();
        const intervalId = setInterval(fetchData, 1000); // Run fetchData every second

        return () => {
            clearInterval(intervalId); // Stop the interval when the component is unmounted
        }
    }, []);

    return (
        <div>
            <AddPostComponent />
            {posts?.length ? (
                <PaginationContainer totalItems={10} itemsPerPage={10} >
                    {posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((post: any) => (
                        <PostCardComponent key={post.id} post={post} />
                    ))}
                </PaginationContainer>
        )
                : (
                    <Placeholder text="Aou don't have posts yet!" link='/forum' buttonText='See what others are talking about' />
    )}
            
        </div>
    )
}

export default MyPosts