"use client";

import Image from "next/image";
import logo from "/public/Icon.jpg";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  const [openSidebar, SetOpenSidebar] = useState<boolean>(false);
  const pathname = usePathname();
  const isActive = pathname;

  const handleOpen = () => {
    //reverse the previoust state
    SetOpenSidebar(!openSidebar);
  };
  return (
    <div className=" md:w-screen max-w-5xl mx-auto bg-white  z-10 top-0 ">

      <div className=" flex justify-between  items-center py-5 px-5 md:px-10 z-50 bg-white border-2 border-green-700">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Logo" width={46} height={46} />
          <h1 className="font-bold">StudyBuddy</h1>
        </Link>

        <ul className="hidden md:flex md:w-full justify-around items-center align-items-center h-6 border-4 border-blue-900">
          <li
            className={`hover:border-b-2 hover:border-red-800 transition-all duration-150 ${isActive === "/about" ? "border-b-2 border-red-900" : ""
              }`}
          >
            <Link href="/about" className=" active">
              About
            </Link>
          </li>
          <li
            className={`hover:border-b-2 hover:border-red-800 transition-all duration-150 ${isActive === "/search" ? "border-b-2 border-red-900" : ""
              }`}
          >
            <Link href="/search"> Search</Link>
          </li>
          <li
            className={`hover:border-b-2 hover:border-red-800 transition-all duration-150 ${isActive === "/faq" ? "border-b-2 border-red-900" : ""
              }`}
          >
            <Link href="/faq"> Faq</Link>
          </li>
          <li
            className={`hover:border-b-2 hover:border-red-900 transition-all duration-150 ${isActive === "/testimonials" ? "border-b-2 border-red-900" : ""
              }`}
          >
            <Link href="/testimonials"> Testimonials</Link>
          </li>
        </ul>

        {session?.user ? (
          <div className='flex flex-col justify-center items-center md:flex-row'>
            <Link href="/">
              <button
                onClick={() => signOut()}
                className="px-8 py-1 text-white rounded-2xl mr-2 my-3 bg-red-800"
              >
                Logout
              </button>
            </Link>

            <Image
              src={session.user.image}
              alt='user profile picture'
              width={60}
              height={40}
              className='rounded-full'
            />
          </div>

        ) : (
          <div className="flex gap-2">
            <Link href="/register" className="bg-red-900 rounded-lg font-medium p-2 text-white">
              Join now
            </Link>
            <button className="text-3xl md:hidden" onClick={handleOpen}>
              {openSidebar ? (
                <div className="w-2">&#128473;</div>
              ) : (
                <div className="w-2">&#9776;</div>
              )}
            </button>
          </div>
        )}

      </div>
      {openSidebar && <Sidebar />}
    </div>
  );
}

