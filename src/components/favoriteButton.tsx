"use client";

import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { addToFavorites, getFavorites, removeFromFavorites } from '@src/utils/_actions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';



export default function FavoriteButton({ id } : { id: string }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const {data : session} = useSession();

    useEffect(() => {
        const fetchIsFavorite = async () => {
            if (!session?.user) return;
            const favorites = await getFavorites();
            const isFavorite = favorites.includes(id);
            setIsFavorite(isFavorite);
        };

        fetchIsFavorite();
    }, [id]);

    const handleClick: () => Promise<void> = async () => {
        console.log("🚀 ~ file: favoriteButton.tsx:50 ~ handleClick ~ id", id)
        !isFavorite ? await addToFavorites(id) : await removeFromFavorites(id);
        setIsFavorite(!isFavorite);
    };

    
    return (
        <Tooltip title="Add to favourites">
            <IconButton
                className="absolute bottom-4 right-4 text-pink-600 "
                aria-label="add to favorites"
                onClick={handleClick}
            >
                {session?.user && (
                    isFavorite ? <Favorite /> : <FavoriteBorder />
                )}
            </IconButton>
        </Tooltip>
    )

}
