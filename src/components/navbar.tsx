"use client";

import Image from "next/image";
import logo from "/public/Icon.jpg";
import Link from "next/link";
import Sidebar from "./sidebar";
import { useState } from "react";
import { usePathname } from "next/navigation";

function Navbar() {
  const [openSidebar, SetOpenSidebar] = useState<boolean>(false);
  const pathname = usePathname();
  const isActive = pathname;

  const handleOpen = () => {
    SetOpenSidebar(!openSidebar);
  };
  return (
    <div className=" flex md:w-screen bg-white top-0 ">
      <div className=" flex justify-between  items-center flex-1 py-5 px-5 md:px-10 z-50 bg-white">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Logo" width={46} height={46} />
          <h1 className="font-bold">StudyBuddy</h1>
        </Link>

        <ul className="hidden md:flex gap-10 align-items-center h-6 ">
          <li
            className={`hover:border-b-2 hover:border-red-800 transition-all duration-150 ${
              isActive === "/about" ? "border-b-2 border-red-900" : ""
            }`}
          >
            <Link href="/about" className=" active">
              About
            </Link>
          </li>
          <li
            className={`hover:border-b-2 hover:border-red-800 transition-all duration-150 ${
              isActive === "/search" ? "border-b-2 border-red-900" : ""
            }`}
          >
            <Link href="/search"> Search</Link>
          </li>
          <li
            className={`hover:border-b-2 hover:border-red-800 transition-all duration-150 ${
              isActive === "/faq" ? "border-b-2 border-red-900" : ""
            }`}
          >
            <Link href="/faq"> Faq</Link>
          </li>
          <li
            className={`hover:border-b-2 hover:border-red-900 transition-all duration-150 ${
              isActive === "/testimonials" ? "border-b-2 border-red-900" : ""
            }`}
          >
            <Link href="/testimonials"> Testimonials</Link>
          </li>
        </ul>

        <div className="flex gap-2">
          <button className="bg-red-900 rounded-lg font-medium p-2 text-white">
            Join now
          </button>
          <button className="text-3xl md:hidden" onClick={handleOpen}>
            {openSidebar ? (
              <div className="w-2">&#128473;</div>
            ) : (
              <div className="w-2">&#9776;</div>
            )}
          </button>
        </div>
      </div>
      {openSidebar && <Sidebar />}
    </div>
  );
}

export default Navbar;
