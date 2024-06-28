"use client";

import Link from "next/link";
import LoginSVG from "@/app/svg/login";
import RecordsSVG from "@/app/svg/records";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  return(
    <nav className="p-5 top-0 bg-white">
      <div className="flex justify-between items-center flex-wrap mx-auto">
        <div className="flex justify-between basis-full md:basis-auto">
          <a href="/" className="flex flex-row items-center space-x-3 ml-5 text-primary font-bold text-xl">
            <Image width="55" height="55" src="/icons/logo.png" />
            <span className="text-primary">CA Atlas</span>
          </a>
          <div className="flex items-center md:hidden gap-3">
            <Link href="/records">
              {pathname == "/records" ? 
              <RecordsSVG fill="#fff" className="bg-primary h-10 w-10 p-2 rounded-xl"/> :
              <RecordsSVG fill="#008080" className="h-10 w-10 p-2 rounded-xl"/>
              }
            </Link>
            <Link href="/login">
              {pathname == "/login" ? 
              <LoginSVG fill="#fff" className="bg-primary h-10 w-10 p-2 rounded-xl"/> :
              <LoginSVG fill="#008080" className="h-10 w-10 p-2 rounded-xl"/>
              }
            </Link>
          </div>
        </div>
        <div className="hidden ml-3 mt-4 justify-evenly md:flex md:flex-row md:basis-auto md:mt-0">
          <Link href="/records" className="mx-2 cursor-pointer transition duration-200 ease-in-out font-semibold py-2 px-4 rounded-md bg-transparent hover:bg-primary-100 text-primary-600">Récords del club</Link>
          <Link href="/login" className="mx-2 cursor-pointer transition duration-200 ease-in-out font-semibold py-2 px-4 rounded-md bg-primary-600 hover:bg-primary-500 text-white">Iniciar sesión</Link>
        </div> 
      </div>
    </nav>
  )
}