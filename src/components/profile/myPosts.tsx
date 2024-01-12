"use client";

import React, { useEffect, useState } from 'react'
import PaginationContainer from '../paginationContainer'
import { getMyPosts } from '@src/lib/_profile'
import PostCardComponent from '../postCard';
import AddPostComponent from '../addPostComponent';

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
                    <div>No posts</div>
    )}
            
        </div>
    )
}

export default MyPosts