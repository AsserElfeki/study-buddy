"use client";

import { getMyapplications } from '@src/lib/_profile'
import { useEffect, useState } from 'react'
import ApplicationCard from './applicationCard';
import Placeholder from './placeHolder';

function MyApplications() {

    const [applications, setApplications] = useState([]);

    // const apps = await getMyapplications();
    useEffect(() => {
        const fetchData = async () => {
            const apps = await getMyapplications();
            if (apps.success) {
                setApplications(apps.data);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            {applications?.length !== 0 ? (
                <div className='flex gap-4 flex-wrap justify-center mt-8'>
                    {
                        applications.map((app: any) => (
                            <ApplicationCard key={app.id} application={app} />
                        ))
                    }
                </div>
            )
                : (
                    <Placeholder text='No applications yet' link='/search' buttonText='Search programs' />
                )}

        </>
    )
}

export default MyApplications