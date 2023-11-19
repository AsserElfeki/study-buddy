"use client";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { AddComment } from '@src/utils/actions';
import { useRef } from 'react';

type AddCommentProps = {
    postId: string;
}

export default function AddCommentComponent({ postId } : AddCommentProps) {

    const formRef = useRef(null);
    const textareaRef = useRef(null);
    return (

        <form
            ref = {formRef}
            action={
                async formData => {
                    formRef.current.reset();
                    textareaRef.current.style.height = 'auto';
                await AddComment(formData, postId);
            }
        }>
            <div className='flex bg-gray-200 items-center rounded-lg'>
                <textarea
                    required
                    name='comment'
                    ref={textareaRef}
                    placeholder='add a comment'
                    className='w-full text-gray-800 p-2 bg-inherit rounded-lg border-none resize-none focus:border-none focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus:ring-offset-transparent'
                    onInput={() => {
                        textareaRef.current.style.height = 'auto';
                        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                    }}
                />
                <button
                    type='submit'
                    className='flex items-center justify-center '
                >
                <AddCommentIcon
                    color='primary'
                    fontSize='large'
                    />
                </button>
            </div>
        </form>
    )
}
