'use client'
import { IconButton } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function Toggler({
    children, displayName
}: {
        children: React.ReactNode, 
        displayName: string
}) {
    const [isOpen, setIsOpen] = useState(false);

    
    return (
        <div className="flex flex-col w-80 ">
            <div className="flex justify-between items-center w-full px-2">
                <IconButton
                    className="flex justify-between items-center w-full px-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="expand"
                >
                <h2 className={`font-bold font-inter text-sm ${isOpen? "underline" : ""}`}>{displayName}</h2>
                    <ExpandMoreIcon className={`${isOpen ? " -rotate-90" : ""}`} />
                </IconButton>
            </div>
            {isOpen ? (children) : null}
        </div>
    )
}
