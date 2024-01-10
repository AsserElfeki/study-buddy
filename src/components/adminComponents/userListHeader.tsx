"use client"
import { Divider, Typography } from '@mui/material'

export default function UserListHeader() {
    return (
        <>
            <div className='grid grid-cols-10 w-full items-center justify-items-center p-4 mb-0'>
                <Typography variant="h6" className='col-span-1'>
                    Profile
                </Typography>
                <Typography variant="h6" className='col-span-1'>
                    Name
                </Typography>
                <Typography variant="h6" className='col-span-2'>
                    Role
                </Typography>
                <Typography variant="h6" className='col-span-1'>
                    Account Status
                </Typography>
                <Typography variant="h6" className='col-span-2'>
                    Email
                </Typography>
                <Typography variant="h6" className='col-span-3'>
                    Actions
                </Typography>
                
            </div>
            <Divider />

        </>
    )
}
