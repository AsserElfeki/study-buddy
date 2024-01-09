"use client";

import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { AlertColor, IconButton, Tooltip } from '@mui/material';
import { addToFavorites, getFavorites, removeFromFavorites } from '@src/utils/_actions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CustomSnackbar from './customSnackBar';



export default function FavoriteButton({ id, style }: { id: string, style: boolean }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const { data: session } = useSession();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    useEffect(() => {
        const fetchIsFavorite = async () => {
            if (!session?.user) return;
            const favorites = await getFavorites();
            const isFavorite = favorites.includes(id);
            setIsFavorite(isFavorite);
        };

        fetchIsFavorite();
    }, [id, session?.user]);

    const handleClick: () => Promise<void> = async () => {
        // console.log("🚀 ~ file: favoriteButton.tsx:50 ~ handleClick ~ id", id)
        if (!isFavorite) {
            await addToFavorites(id);
            setSnackbarMessage('Added program to favorites');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        }
        else {
            setSnackbarMessage('Removed program from favorites');
            await removeFromFavorites(id);
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
        }
        setIsFavorite(!isFavorite);
    };


    return (
        <>
            <Tooltip title="Add to favourites">
                <IconButton
                    className={`${style ? '' : 'absolute bottom-4 right-4'} bottom-4 right-4 text-pink-600 `}
                    aria-label="add to favorites"
                    onClick={handleClick}
                >
                    {session?.user && (
                        isFavorite ? <Favorite /> : <FavoriteBorder />
                    )}
                </IconButton>
            </Tooltip>

            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
        </>
    )

}
