"use client";

//this is just a components that displays user's session on the client side 

import { useSession } from "next-auth/react";

export const User = () => {
    const { data: session } = useSession();

    return (
        <>
            <h1>Client Session</h1>
            <pre className='whitespace-pre-wrap'>{JSON.stringify(session)}</pre>
        </>
    );
};
