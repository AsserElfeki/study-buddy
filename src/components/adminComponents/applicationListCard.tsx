"use client"

import { Card, CardContent, Avatar, Typography, Button, Link, Chip, AlertColor, MenuItem, Select } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateApplicationStatus } from '@src/utils/_adminFunctions';
import CustomSnackbar from '../customSnackBar';
import { usePathname } from 'next/navigation';



export default function ApplicationListCard({ application , callBack }) {

    const { data: session } = useSession();

    const path = usePathname();

    const [currentApplication, setCurrentApplication] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
    const [status, setStatus] = useState("");
    const [newDate, setNewDate] = useState("");

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        
        const res = await updateApplicationStatus(currentApplication.id, newStatus, path);
        setNewDate(res.data.updatedAt);
        console.log("🚀 ~ handleStatusChange ~ res:", res)
        if (res.success) {
            // setStatus(newStatus);
            
            setCurrentApplication( {...currentApplication, ...res.data} )
            setSnackbarMessage("Application status updated successfully");
            setSnackbarSeverity('success');
            callBack();
            // setCurrentApplication({ ...currentApplication, status: newStatus });
        }
        else {
            setSnackbarMessage("Error while updating status");
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);

    };

    useEffect(() => {
        setCurrentApplication(application)
    }, [application])

    return (
        <>
            <Card className='grid grid-cols-10 w-full items-center justify-items-center py-4 pr-8'>
                <Link href={`profile/${currentApplication.user?.id}`} sx={{ m: 2 }} className='col-span-1 flex flex-col gap-1 justify-center items-center'>
                    <Avatar
                        alt={currentApplication.user?.firstName + ' ' + currentApplication.user?.lastName}
                        src={currentApplication.user?.image}
                        sx={{ width: 56, height: 56 }}
                    />
                    {currentApplication?.user?.firstName} {currentApplication?.user?.lastName}
                </Link>
                
                <Typography variant="body1" sx={{ mr: 2, }} className='col-span-1'>
                    {currentApplication.studyProgram?.name}
                </Typography>
                <Typography variant="body1" sx={{ mr: 2, }} className='col-span-2'>
                    {currentApplication.studyProgram?.university?.name}
                </Typography>
                <Typography variant="body1" sx={{ mr: 2 }} className='col-span-2'>
                    {new Date(currentApplication.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ mr: 2 }} className='col-span-2'>
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
                {currentApplication.status ? (
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        className='col-span-1'
                        displayEmpty
                        
                    >
                        <MenuItem value="" disabled>
                            Update Status
                        </MenuItem>
                        <MenuItem value={'pending'}>Pending</MenuItem>
                        <MenuItem value={'accepted'}>Accepted</MenuItem>
                        <MenuItem value={'rejected'}>Rejected</MenuItem>
                    </Select>
                ) : null}
            </Card>
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
        </>
    );
}