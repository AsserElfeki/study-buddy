"use client";
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function AddComment() {
    return (

        <form action="">
            <div className='flex bg-white items-center'>
                <input
                    type="text"
                    name='comment'
                    placeholder='add a comment'
                    className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-gray-500'
                />
                <button></button>
                <AddCommentIcon
                    color='primary'
                    fontSize='large'
                />
            </div>
        </form>
    )
}
