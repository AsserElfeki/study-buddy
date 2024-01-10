import { Card, Typography } from '@mui/material';
import ApplicationListCard from '@src/components/adminComponents/applicationListCard';
import ApplicationListHeader from '@src/components/adminComponents/applicationListHeader';
import { getAllApplications, getAllUsers } from '@src/utils/_adminFunctions';

export default async function Applications() {

    const applications = await getAllApplications();


    return (
        <>
            <div className='flex flex-col gap-4 '>
                <ApplicationListHeader />

                {applications?.data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).map((app) => (
                    <ApplicationListCard key={app.id} application={app}  />
                ))}
            </div>
        </>
    )
}
