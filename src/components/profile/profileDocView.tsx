"use client";

import React, { useEffect, useState } from 'react'
import { Box,  Grid, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Link from 'next/link';

export default function ProfileReviewDocuments({ files }) {

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        setDocuments(files);
        console.log(files)
    }, [files])

    const getFileIcon = (fileName) => {
        if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
            return <ImageIcon />;
        } else if (fileName.endsWith('.pdf')) {
            return <PictureAsPdfIcon />;
        } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
            return <DescriptionIcon />;
        } else if (fileName.endsWith('.zip')) {
            return <FolderZipIcon />;
        } else {
            return <InsertDriveFileIcon />;
        }
    };

    const handleDeleteFile = (index) => {
        setDocuments(prevDocuments => prevDocuments.filter((_, i) => i !== index));
    }

    const downloadFile = async (url, filename) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            // Clean up and revoke the object URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {documents.map((file, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                        <Link 
                            href={file.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                        <Paper
                            className='lex flex-grow bg-orange-200 flex p-1 h-fit w-auto justify-between items-center hover:cursor-pointer'
                            // onClick={() => downloadFile(file.file_url, file.name)}
                        >
                            <Box >
                                <Typography
                                    variant="body1" gutterBottom m={1}>
                                    {getFileIcon(file.link)}
                                    <span className='break-all  max-w-xs text-sm ml-2 '>download</span>
                                </Typography>

                            </Box>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>

    )
}
