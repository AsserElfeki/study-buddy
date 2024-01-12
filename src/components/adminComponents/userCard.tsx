"use client"

import { Card, CardContent, Avatar, Typography, Button, Link, Chip, AlertColor } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { User } from '@prisma/client';
import { banUser, unbanUser } from '@src/utils/_adminFunctions';
import { useEffect, useState } from 'react';
import CustomSnackbar from '../customSnackBar';
import { useSession } from 'next-auth/react';
import UserListHeader from './userListHeader';




function UserCard({ user , callBack}) {

    const { data: session } = useSession();

    const [currentUser, setCurrentUser] = useState<User | null>({});

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');

    async function handleBanUser(id: any) {
        let res;
        if (!currentUser.isActive) {
            res = await unbanUser(id);
            setSnackbarMessage('User Unbanned');
        }
        else {
            res = await banUser(id);
            setSnackbarMessage('User Banned');
        }
        if (res.success) {
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
        else {
            setSnackbarMessage(`${res.error}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        callBack();
    }

    useEffect(() => {

        setCurrentUser(user)
    }, [user])

    return (
        <>
            <Card className='grid grid-cols-10 w-full items-center justify-items-center'>
                <Link href={`profile/${currentUser.id}`} sx={{ m: 2 }} className='col-span-1'>
                    <Avatar
                        alt={currentUser.firstName + ' ' + currentUser.lastName}
                        src={currentUser.image}
                        sx={{ width: 56, height: 56 }}
                    />
                </Link>
                <Typography variant="h6" sx={{ mr: 2 }} className='col-span-1'>
                    {currentUser.firstName} {currentUser.lastName}
                </Typography>
                <Typography variant="body1" sx={{ mr: 2, color: 'text.secondary' }} className='col-span-2 '>
                    {currentUser.role?.split('_').join(' ')}
                </Typography>
                <Chip
                    label={currentUser.isActive ? 'Active' : 'Inactive'}
                    color={currentUser.isActive ? 'success' : 'default'}
                    sx={{ bgcolor: currentUser.isActive ? green[100] : red[100], mr: 2 }}
                    className='col-span-1'
                />
                <Typography variant="body1" sx={{ mr: 2 }} className='col-span-2'>
                    {currentUser.email}
                </Typography>
                <Link href={`/admin/applications?userId=${currentUser.id}`} sx={{ mr: 2 }} className='col-span-1'>
                    Applications
                </Link>
                <Link href={`/admin/forum?userId=${currentUser.id}`} sx={{ mr: 2 }} className='col-span-1'>
                    Posts
                </Link>
                <Button 
                    variant="outlined" 
                    color={currentUser.isActive ? "error" : "success"} 
                    onClick={() => handleBanUser(currentUser.id)} 
                    className='col-span-1'
                    disabled={currentUser.id === session?.user?.id}
                >
                    {currentUser.isActive ? "Ban User" : "Unban User"}
                </Button>
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

export default UserCard