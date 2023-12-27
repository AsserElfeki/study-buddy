"use client";

import { ThumbUp } from '@mui/icons-material';
import { checkPostOwnership, likePost } from '@src/utils/_actions'
import { useSession } from 'next-auth/react';
import { type } from 'os'
import React, { useEffect, useState } from 'react'
import { buffer } from 'stream/consumers';

type Props = {
    postId: string;
}

function LikePostComponent({ postId }: Props) {

    const [postBelongsToUser, setPostBelongsToUser] = useState(false);
    // check if the post belongs to user
    useEffect(() => {
        const fetchPostBelongsToUser = async () => {
            const res = await checkPostOwnership(postId);
            setPostBelongsToUser(res);
            console.log(res);
        }
        fetchPostBelongsToUser()
    }, [postId])

    return (
        postBelongsToUser ? null :
        <button
            onClick={async () => {
                await likePost(postId);
            }}
            className='p-2 rounded-full bg-blue-500 text-white'>
            <ThumbUp />
        </button>

    )
}

export default LikePostComponent