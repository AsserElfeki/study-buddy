"use client";

import Image from "next/image";
import logo from "/public/logo-no-text.svg";
import s from "/public/study buddy.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from 'next-auth/react';
import { AlertColor, Avatar } from '@mui/material';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import Tooltip from '@mui/material/Tooltip';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState } from 'react';
import CustomSnackbar from './customSnackBar';
import router from 'next/router';
import { Role } from '@prisma/client';

export default function Navbar() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const isActive = pathname;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setSnackbarMessage('Sign Out Successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 3000)
    } catch (error) {
      setSnackbarMessage('Sign Out Failed!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  return (
    <div className="w-full flex bg-white shadow-lg justify-center sticky z-10 top-0 mb-2 py-2">

      <div className="flex max-w-7xl flex-grow justify-between place-items-center items-center ">
        <Link
          href="/"
          className={`flex flex-col mt-[-10px] place-items-center justify-center min-w-fit ${isActive === "/" ? "animated-gradient font-extrabold hover:animate-spin" : ""}`}>
          <Image src={logo} alt="Logo" width={80} height={80} />
          <h1 className={`font-bold hidden md:block mt-[-15px]`}>StudyBuddy</h1>
        </Link>
        {session?.user?.role === Role.ADMIN ? (
          <ul className="flex flex-col items-center md:flex-row  md:w-full justify-evenly mx-16 ">
            <li
              className={`hover:cursor-pointer hover:animate-bounce ${isActive === "/users" ? "animated-gradient font-extrabold hover:animate-spin" : ""
                }`}
            >
              <Link
                href="/users"
                className='p-2 active'>Users
              </Link>
            </li>

            <li
              className={`hover:cursor-pointer hover:animate-bounce ${isActive === "/applications" ? "animated-gradient font-extrabold hover:animate-spin" : ""
                }`}
            >
              <Link
                href="/applications"
                className='active p-2'>Applications
              </Link>
            </li>

            <li
              className={`hover:cursor-pointer hover:animate-bounce ${isActive === "/forum" ? "animated-gradient font-extrabold hover:animate-spin" : ""
                }`}
            >
              <Link
                href="/forum"
                className='p-2'>Forum</Link>
            </li>

          </ul>
        ) :
          (
            <ul className="flex flex-col items-center md:flex-row  md:w-full justify-around ">
              <li
                className={` hover:cursor-pointer hover:animate-bounce ${isActive === "/about" ? "animated-gradient font-extrabold hover:animate-spin" : ""
                  }`}
              >
                <Link href="/about"
                  className="active p-2">About
                </Link>
              </li>
              <li
                className={`hover:cursor-pointer hover:animate-bounce ${isActive === "/search" ? "animated-gradient font-extrabold hover:animate-spin" : ""
                  }`}
              >
                <Link
                  href="/search"
                  className='p-2'>Search</Link>
              </li>
              <li
                className={`hover:cursor-pointer hover:animate-bounce ${isActive === "/forum" ? "animated-gradient font-extrabold hover:animate-spin" : ""
                  }`}
              >
                <Link
                  href="/forum"
                  className='p-2'>Forum</Link>
              </li>
              <li
                className={`hover:cursor-pointer hover:animate-bounce ${isActive === "/faq" ? "animated-gradient font-extrabold hover:animate-spin" : ""
                  }`}
              >
                <Link href="/faq" className='p-2'>Faq</Link>
              </li>
              <li
                className={`hover:cursor-pointer hover:animate-bounce ${isActive === "/testimonials" ? "animated-gradient font-extrabold hover:animate-spin" : ""
                  }`}
              >
                <Link href="/testimonials" className='p-2'>Testimonials</Link>
              </li>
            </ul>
          )}
        
        {session?.user  ? (
          <div className='flex flex-row justify-center items-center gap-2'>
            <Tooltip title="Profile" placement='bottom' arrow>
              <Link
                href="/profile"
                className={`rounded-full hover:shadow-2xl border-4 ${isActive === "/profile" ? "border-red-900" : "border-transparent"}`}
              >
                <Avatar alt={session?.user.name} src={session?.user.image} />
              </Link>
            </Tooltip>

            <Tooltip title="Settings" placement='bottom' arrow>
              <Link href="/settings">
                <SettingsOutlinedIcon fontSize='large'
                  className='text-gray-500 hover:text-black hover:animate-spin'
                />
              </Link>
            </Tooltip>

            <Tooltip title='Notifications' placement='bottom' arrow>
              <Badge badgeContent={0} color="error">
                <NotificationsNoneOutlinedIcon fontSize='large'
                  className='text-gray-500 hover:text-blue-600 hover:animate-pulse'
                />
              </Badge>
            </Tooltip>

            <Tooltip title="Sign out" placement='bottom' arrow>
              <Link href="/">
                <button
                  onClick={() => handleSignOut()}
                >
                  <LogoutOutlinedIcon fontSize='large' color='error'
                    className='text-gray-500 hover:text-red-600 hover:animate-ping'
                  />
                </button>
              </Link>
            </Tooltip>
          </div>

        ) : (
          <div className="flex gap-2 items-center">
            <Tooltip title="Sign up" placement='bottom' arrow>
              <Link href="/register" >
                <HowToRegOutlinedIcon color='primary' fontSize='large' />
              </Link>
            </Tooltip>
            <Tooltip title="Sign in" placement='bottom' arrow>
              <Link href="/login" >
                <LoginOutlinedIcon color='success' fontSize='large' />
              </Link>
            </Tooltip>
          </div>
        )}

      </div>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
}

