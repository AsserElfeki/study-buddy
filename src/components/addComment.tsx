"use client";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { AddComment } from '@src/utils/_actions';
import { usePathname } from 'next/navigation';
import { KeyboardEventHandler, useRef } from 'react';

type AddCommentProps = {
    postId: string;
}

export default function AddCommentComponent({ postId }: AddCommentProps) {

    const formRef = useRef(null);
    const textareaRef = useRef(null);
    const pathName = usePathname();

    const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = async (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            // Call form action
            if (textareaRef.current.value === '') {
                //ToDo: add a better alert
                alert('please fill in both fields');
                return;
            }
            const formData = new FormData(formRef.current);
            formRef.current.reset();
            textareaRef.current.style.height = 'auto';
            await AddComment(formData, postId, pathName);
        }
    };

    return (

        <form
            ref={formRef}
            onKeyDown={handleKeyDown}
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
