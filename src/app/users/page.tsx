import UserCard from '@src/components/adminComponents/userCard';
import { getAllUsers } from '@src/utils/_adminFunctions';

export default async function Users() {

    const users = await getAllUsers();
    console.log("🚀 ~ Users ~ users:", users)


    return (
        <>
            <div className='flex flex-col gap-4'>
                

                {users?.users?.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </>
    )
}
