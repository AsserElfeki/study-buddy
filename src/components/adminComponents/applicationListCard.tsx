"use client"

import { Card, CardContent, Avatar, Typography, Button, Link, Chip, AlertColor, MenuItem, Select } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ApplicationListCard({ application }) {

    const { data: session } = useSession();

    const [currentApplication, setCurrentApplication] = useState({});

    const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    // Update the status in your database here
    setCurrentApplication({ ...currentApplication, status: newStatus });
    };
    
    useEffect(() => {
        setCurrentApplication(application)
        console.log(currentApplication)
    }, [application])

    return (
        <>
            <Card className='grid grid-cols-8 w-full items-center justify-items-center p-4'>
                <Typography variant="body1" sx={{ mr: 2 }} className='col-span-1'>
                    {currentApplication?.user?.firstName} {currentApplication?.user?.lastName}
                </Typography>
                <Typography variant="body1" sx={{ mr: 2,  }} className='col-span-1'>
                    {currentApplication.studyProgram?.name}
                </Typography>
                <Typography variant="body1" sx={{ mr: 2,  }} className='col-span-1'>
                    {currentApplication.studyProgram?.university?.name}
                </Typography>
                <Typography variant="body1" sx={{ mr: 2 }} className='col-span-1'>
                    {new Date(currentApplication.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ mr: 2 }} className='col-span-1'>
                    {new Date(currentApplication.updatedAt).toLocaleString()}
                </Typography>
                <Chip
                    label={currentApplication.status}
                    sx={{
                        bgcolor: currentApplication.status === 'accepted' ? green[100] : currentApplication.status === 'pending' ? 'yellow' : red[100],
                        color: 'black',
                        mr: 2
                    }}
                    className='col-span-1'
                />
                <Select
                    value={currentApplication.status}
                    onChange={handleStatusChange}
                    className='col-span-1'
                >
                    <MenuItem value={'pending'}>Pending</MenuItem>
                    <MenuItem value={'accepted'}>Accepted</MenuItem>
                    <MenuItem value={'rejected'}>Rejected</MenuItem>
                </Select>
            </Card>
        </>
    );
}