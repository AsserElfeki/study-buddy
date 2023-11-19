"use client";   

import { ThumbUp } from '@mui/icons-material';
import { likePost } from '@src/utils/actions'
import { type } from 'os'
import React from 'react'
import { buffer } from 'stream/consumers';

type Props = {
    postId: string;
}

function LikePostComponent({ postId } : Props) {
  return (
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