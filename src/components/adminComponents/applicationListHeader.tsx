"use client"
import {  Divider, Typography } from '@mui/material'

function ApplicationListHeader() {
    return (
        <>
            <div className='grid grid-cols-10 w-full items-center justify-items-center p-4 pr-8'>
                <Typography variant="h6" className='col-span-1'>
                    User 
                </Typography>
                <Typography variant="h6" className='col-span-1'>
                    Program
                </Typography>
                <Typography variant="h6" className='col-span-2'>
                    University
                </Typography>
                <Typography variant="h6" className='col-span-2'>
                    Created At
                </Typography>
                <Typography variant="h6" className='col-span-2'>
                    Last Modified
                </Typography>
                <Typography variant="h6" className='col-span-1'>
                    Status
                </Typography>
                <Typography variant="h6" className='col-span-1'>
                    Actions
                </Typography>
            </div>
            <Divider />

        </>
    )
}

export default ApplicationListHeader