'use client'
import { IconButton } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function DisciplineToggler({
    children,
}: {
    children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState(false);

    
    return (
        <div className={`flex flex-col w-80`}>
            <div className={`flex justify-between items-center w-full px-2  ${isOpen ? "flex-row" : "flex-row"}`}>
                <h2 className='font-bold font-inter underline'>Disciplines</h2>
                <IconButton
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="expand"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </div>
            {isOpen ? (children) : null}
        </div>
    )
}
