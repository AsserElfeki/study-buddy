"use client";

import Image from "next/image";
import logo from "/public/Icon.jpg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from 'next-auth/react';
import { Avatar } from '@mui/material';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import Tooltip from '@mui/material/Tooltip';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export default function Navbar() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const isActive = pathname;
  return (
    <div className="w-full flex bg-stone-200 justify-center sticky z-10 top-0 mb-2 py-2">

      <div className="flex max-w-7xl flex-grow justify-between place-items-center items-center ">
        <Link
          href="/"
          className="flex flex-row place-items-center justify-center gap-2 min-w-fit ">
          <Image src={logo} alt="Logo" width={46} height={46} />
          <h1 className="font-bold hidden md:block">StudyBuddy</h1>
        </Link>

        <ul className="flex flex-col items-center md:flex-row  md:w-full justify-around ">
          <li
            className={`fadeInBorder hover:border-b-2 hover:cursor-pointer hover:animate-bounce ${isActive === "/about" ? "border-red-900" : "border-red-900"
              }`}
          >
            <Link href="/about"
              className="active p-2">About
            </Link>
          </li>
          <li
            className={`fadeInBorder hover:border-b-2 hover:cursor-pointer hover:animate-bounce ${isActive === "/about" ? "border-b-2 border-red-900" : ""
              }`}
          >
            <Link
              href="/search"
              className='p-2'>Search</Link>
          </li>
          <li
            className={`fadeInBorder hover:border-b-2 hover:cursor-pointer hover:animate-bounce ${isActive === "/about" ? "border-b-2 border-red-900" : ""
              }`}
          >
            <Link href="/faq" className='p-2'>Faq</Link>
          </li>
          <li
            className={`fadeInBorder hover:border-b-2 hover:cursor-pointer hover:animate-bounce ${isActive === "/about" ? "border-b-2 border-red-900" : ""
              }`}
          >
            <Link href="/testimonials" className='p-2'>Testimonials</Link>
          </li>
        </ul>

        {session?.user ? (
          <div className='flex flex-row justify-center items-center gap-2'>
            <Tooltip title="Profile" placement='bottom' arrow>
              <Link
                href="./profile"
                className='rounded-full hover:shadow-2xl border-4 '
              >
                <Avatar alt={session?.user.name} src={session?.user?.image} />
              </Link>
            </Tooltip>

            <Tooltip title="Settings" placement='bottom' arrow>
              <Link href="/settings">
                <ManageAccountsOutlinedIcon fontSize='large' color='primary' />
              </Link>
            </Tooltip>

            <Tooltip title='Notifications' placement='bottom' arrow>
                <Badge badgeContent={4} color="error">
                 <NotificationsNoneOutlinedIcon fontSize='large' />
                </Badge>

              </Tooltip>
            
            <Tooltip title="Sign out" placement='bottom' arrow>
              <Link href="/">
                <button
                  onClick={() => signOut()}
                >
                  <LogoutOutlinedIcon fontSize='large' color='error' />
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
    </div>
  );
}

