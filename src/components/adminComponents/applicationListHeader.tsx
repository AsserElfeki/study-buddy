"use client"
import {  Divider, Typography } from '@mui/material'

function ApplicationListHeader() {
    return (
        <>
            <div className='grid grid-cols-6 w-full items-center justify-items-center p-4 mb-0'>
                <Typography variant="h6" className='col-span-1'>
                    User Name
                </Typography>
                <Typography variant="h6" className='col-span-1'>
                    Program
                </Typography>
                <Typography variant="h6" className='col-span-1'>
                    University
                </Typography>
                <Typography variant="h6" className='col-span-1'>
                    Created At
                </Typography>
                <Typography variant="h6" className='col-span-1'>
                    Last Modified
                </Typography>
            </div>
            <Divider />

        </>
    )
}

export default ApplicationListHeader