"use client"
import UserCard from '@src/components/adminComponents/userCard';
import UserListHeader from '@src/components/adminComponents/userListHeader';
import { getAllUsers } from '@src/utils/_adminFunctions';
import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

export default function Users() {

    //get session

    // Inside the Users function
    const { data: session } = useSession();
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const fetchUsers = async () => {
            const users = await getAllUsers();
            if (users.success)
                setUsers(users.data)
        }
        fetchUsers();
        setLoading(false)
    }, [])

    const revalidate = async () => {
        // setLoading(true)

        const users = await getAllUsers();
        if (users.success)
            setUsers(users.data)
        // setLoading(false)
    }

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <>
            {session && session.user?.role === Role.ADMIN ? (
                <div className='flex flex-col gap-4 '>
                    <UserListHeader />

                    {users?.sort((a, b) => a.lastName.localeCompare(b.lastName)).map((user) => (
                        <UserCard key={user.id} user={user} callBack={revalidate} />
                    ))}
                </div>
            ) :
                <div className='mt-8 font-black text-3xl text-red-500'>
                    Unauthorized
                </div >
            }

        </>
    )
}
