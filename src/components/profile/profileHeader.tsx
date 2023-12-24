"use client";
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSession } from 'next-auth/react';

const ProfileCard = () => {

    const { data: session } = useSession();
    const [user, setUser] = useState({
        name: "",
        profilePicture: "",
    });

    useEffect(() => {
        setUser({
            name: session?.user?.name,
            profilePicture: session?.user?.image,
        });
        // console.log(session?.user);
    }, [session]);

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-purple-500 p-4 text-right">
                {/* Change cover and icon buttons */}
                <Button variant="contained" color="secondary" size="small" className="mr-2">
                    Change Cover
                </Button>
                <Button variant="contained" color="secondary" size="small">
                    Change Icon
                </Button>
            </div>
            <div className="flex justify-center -mt-12">
                {/* Profile image */}
                <Avatar
                    alt={user.name}
                    src={user.profilePicture}
                    sx={{ width: 124, height: 124, border: '4px solid white' }}
                    className="align-middle"
                />
            </div>
            <div className="text-center p-4">
                {/* Profile name and title */}
                <h1 className="text-2xl font-semibold">{user.name}</h1>
                {/* <p className="text-sm text-gray-600">{title}</p> */}
                {/* Info button */}
                <Button variant="outlined" color="primary" className="mt-4">
                    Info
                </Button>
            </div>
        </div>
    );
};

export default ProfileCard;
