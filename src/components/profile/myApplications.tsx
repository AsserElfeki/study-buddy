"use client";

import { getMyapplications } from '@src/lib/_profile'
import { useEffect, useState } from 'react'

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
    })

    return (
        <div>
            <h1>My Applications</h1>
            <ul>
                {applications.map((app: any) => (
                    <li key={app.id}>{app.status}</li>
                ))}
            </ul>
        </div>
    )
}

export default MyApplications