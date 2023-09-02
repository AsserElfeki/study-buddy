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
        <Link href="/login" className='' >
            Sign in
        </Link>
    );
};

export const RegisterButton = () => {
    return (
        <Link href="/register" className=''>
            Register
        </Link>
    );
};

export const LogoutButton = () => {
    return (
        <button className='' onClick={() => signOut()}>
            Sign Out
        </button>
    );
};

export const ProfileButton = () => {
    return <Link href="/profile">Profile</Link>;
};

export const HaveAccount = () => {
    return (
        <Link href="/login" className='inline-block px-7 py-4 bg-red-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-950 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full max-w-md text-center'>
            Already have an account?
        </Link>
    );
}
