"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <nav className="p-5 top-0">
      <div className="flex justify-between items-center flex-wrap mx-auto">
        <div className="flex justify-between basis-full md:basis-auto">
          <a href="/" className="flex flex-row items-center space-x-3 ml-5 text-primary font-bold text-xl">
            <Image width="55" height="55" src="/icons/logo.png" />
            <span className="text-primary">CA Atlas</span>
          </a>
          <div className="flex items-center md:hidden">
            <button onClick={()=>{setIsOpen(!isOpen)}} className="w-6 mr-5 cursor-pointer rounded">
              <span className="block h-1 rounded-full bg-secondary"></span>
              <span className="block h-1 mt-1 rounded-full bg-tertiary"></span>
              <span className="block h-1 mt-1 rounded-full bg-primary"></span>
            </button>
          </div>
        </div>
        <div className={`${isOpen?'flex':'hidden'} ml-3 mt-4 basis-full justify-evenly md:flex md:flex-row md:basis-auto md:mt-0`}>
          <Link href="/records" className="mx-2 cursor-pointer transition duration-200 ease-in-out font-semibold py-2 px-4 rounded-md bg-transparent hover:bg-primary-100 text-primary-600">Récords del club</Link>
          <Link href="/login" className="mx-2 cursor-pointer transition duration-200 ease-in-out font-semibold py-2 px-4 rounded-md bg-primary-600 hover:bg-primary-500 text-white">Iniciar sesión</Link>
        </div> 
      </div>
    </nav>
  )
}