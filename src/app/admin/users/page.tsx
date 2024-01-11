import UserCard from '@src/components/adminComponents/userCard';
import UserListHeader from '@src/components/adminComponents/userListHeader';
import { getAllUsers } from '@src/utils/_adminFunctions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { Role } from '@prisma/client';

export default async function Users() {

    //get session

    // Inside the Users function
    const session = await getServerSession(authOptions);

    const users = await getAllUsers();


    return (
        <>
            {session && session.user?.role === Role.ADMIN ? (
                <div className='flex flex-col gap-4 '>
                    <UserListHeader />

                    {users.data?.sort((a, b) => a.firstName.localeCompare(b.firstName)).map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            ):
                <div className='mt-8 font-black text-3xl text-red-500'>
                    Unauthorized
                </div >
            }
            
        </>
    )
}
