"use client";

//reusable button components 


import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

/**
 * Renders a login button component.
 *
 * @return {JSX.Element} The rendered login button.
 */
export const LoginButton = () => {
    return (
        <button style={{ marginRight: 10 }} onClick={() => signIn()}>
            Sign in
        </button>
    );
};

export const RegisterButton = () => {
    return (
        <Link href="/register" style={{ marginRight: 10 }}>
            Register
        </Link>
    );
};

export const LogoutButton = () => {
    return (
        <button style={{ marginRight: 10 }} onClick={() => signOut()}>
            Sign Out
        </button>
    );
};

export const ProfileButton = () => {
    return <Link href="/profile">Profile</Link>;
};
