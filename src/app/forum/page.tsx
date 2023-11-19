import React from 'react'
import PostCardComponent from '../../components/postCard';
import { getAllPosts } from '@src/utils/actions';


//here fetching data from the database and passing it to the postcard component

export default async function ForumPage() {

    const posts = await getAllPosts(0, 10);
    // console.log("🚀 ~ file: page.tsx:29 ~ ForumPage ~ posts:", posts[0])

    return (
        <>
            <div className='flex flex-col w-full max-w-3xl'>
                {Array.isArray(posts) ? posts.map((post) => (
                    <PostCardComponent key={post.id} post={post} />
                )) : <p>loading...</p>}

            </div>
        </>
    )
}
