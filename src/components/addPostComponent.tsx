"use client";

import { useRef, KeyboardEventHandler } from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import { AddPost } from '@src/utils/_actions';
import path from 'path';
import { usePathname } from 'next/navigation';
function AddPostComponent() {

    const pathName = usePathname();
    const formRef = useRef(null);
    const textareaRef = useRef(null);
    const titleRef = useRef(null);

    const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            // Call form action
            //check if title or body is empty is empty
            // if (titleRef.current.value === '' || textareaRef.current.value === '') {
            //     //ToDo: add a better alert
            //     alert('please fill in both fields');
            //     return;
            // }
            const formData = new FormData(formRef.current);
            formRef.current.reset();
            textareaRef.current.style.height = 'auto';
            await AddPost(formData, pathName);
        }
    };

    return (
        <div className='w-full'>
            <form
                ref={formRef}
                onKeyDown={handleKeyDown}
                action={
                    async formData => {
                        formRef.current.reset();
                        textareaRef.current.style.height = 'auto';
                        await AddPost(formData, pathName);
                    }
                }
                className='border-2 border-white focus:border-blue-500 shadow-2xl  p-4 pb-0 mb-6 text-white rounded-xl mx-auto'
            >
                <div className='flex flex-col gap-1 items-center rounded-lg '>
                    {/* //input for post title */}
                    <input
                        required
                        name='title'

                        ref={titleRef}
                        placeholder='Title: write a short meaningful title'
                        className='w-full text-cyan-700 font-bold p-2 text-2xl bg-zinc-200 focus:bg-zinc-50 rounded-lg 
                         '
                    />
                    <textarea
                        required
                        name='content'
                        ref={textareaRef}
                        placeholder='what do you want to say?'
                        className='w-full text-cyan-500 font-satoshi p-2 text-lg bg-zinc-200 focus:bg-zinc-50 rounded-lg resize-none'
                        onInput={() => {
                            textareaRef.current.style.height = 'auto';
                            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                        }}
                    />
                    <button
                        type='submit'
                        className='flex items-center bg-white justify-center text-black font-bold text-lg border-2 border-transparent rounded-xl p-2 hover:border-primary'
                    >
                        Post
                        <PostAddIcon
                            color='primary'
                            fontSize='large'
                        />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddPostComponent