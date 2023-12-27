"use client";

import React, { useEffect, useState } from 'react'
import PaginationContainer from '../paginationContainer'
import { getMyPosts } from '@src/lib/_profile'
import PostCardComponent from '../postCard';

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
            <PaginationContainer totalItems={10} itemsPerPage={10} >
                {posts.map((post: any) => (
                    <PostCardComponent key={post.id} post={post} />
                ))}
            </PaginationContainer>
        </div>
    )
}

export default MyPosts