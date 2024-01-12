"use client";

import { getMyapplications } from '@src/lib/_profile'
import { useEffect, useState } from 'react'
import ApplicationCard from './applicationCard';

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
    },[])

    return (
        <div className='flex gap-4 flex-wrap justify-center mt-8'>
            {applications?.length !== 0 ? (
                <div>
                {
                    applications.map((app: any) => (
                        <ApplicationCard key={app.id} application={app} />
                        ))
                    }
                    </div>
            )
                : (
                    <div>
                        jghjf
                   </div> 
        )}
                
        </div>
    )
}

export default MyApplications