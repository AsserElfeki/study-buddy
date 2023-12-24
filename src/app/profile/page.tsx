"use client";

import ProfileHeader from '@src/components/profile/profileHeader';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Profile() {


    return (
        <>
            <ProfileHeader />
        </>
    );
}
