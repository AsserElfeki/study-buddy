import UserCard from '@src/components/adminComponents/userCard';
import UserListHeader from '@src/components/adminComponents/userListHeader';
import { getAllUsers } from '@src/utils/_adminFunctions';

export default async function Users() {

    const users = await getAllUsers();


    return (
        <>
            <div className='flex flex-col gap-4 '>
                <UserListHeader />

                {users?.users?.sort((a, b) => a.firstName.localeCompare(b.firstName)).map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </>
    )
}
