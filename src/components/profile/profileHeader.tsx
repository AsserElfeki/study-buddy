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
        role: "",
    });

    useEffect(() => {
        setUser({
            name: session?.user?.name,
            profilePicture: session?.user?.image,
            role: session?.user?.role.split('_').join(' '),
        });
        console.log(session?.user);
    }, [session]);

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden  w-full">
            <div className="bg-red-800 p-4 text-right min-w-full h-24">
            
            </div>
            <div className="flex justify-center -mt-12">
                <Avatar
                    alt={user.name}
                    src={user.profilePicture}
                    className="align-middle w-40 h-40 border-4 border-white"
                />
            </div>
            <div className="text-center p-4">
                {/* Profile name and title */}
                <h1 className="text-2xl font-semibold">{user.name}</h1>
                <p className="text-gray-600">{user.role}</p>
            </div>
        </div>
    );
};

export default ProfileCard;
