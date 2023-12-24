"use client";

import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';

type CustomButtonProps = {
    text: string,
    link: string,
}

function CustomButton({ text, link }: CustomButtonProps) {
    const { data: session } = useSession();

    //return the button if the user is logged in, otherwise return nothing
    // if (!session) return null;
    return (
        <Button
            variant="outlined"
            className="mt-4 text-center max-w-fit self-center"
            href={link}
        >
            {text}
        </Button>
    )
}

export default CustomButton