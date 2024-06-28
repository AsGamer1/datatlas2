"use client";

import Link from "next/link";
import LoginSVG from "@/app/svg/login";
import RecordsSVG from "@/app/svg/records";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {

  const pathname = usePathname();

  return(
    <nav className="p-5 bg-white">
      <div className="flex justify-between items-center px-5">
        <a href="/" className="flex items-center space-x-3 text-primary font-bold text-xl">
          <Image width="55" height="55" src="/icons/logo.png" />
          <span>CA Atlas</span>
        </a>
        <div className="flex items-center gap-x-2 md:hidden">
          <Button variant={pathname=="/records"?"default":"ghost"} size="icon">
              <Link href="/records">
                <RecordsSVG className={`${pathname=="/records"?"fill-white":"fill-primary hover:fill-primary/80"} h-10 w-10 p-2`}/>
              </Link>
          </Button>
          <Button variant={pathname=="/login"?"default":"ghost"} size="icon">
              <Link href="/login">
                <LoginSVG className={`${pathname=="/login"?"fill-white":"fill-primary hover:fill-primary/80"} h-10 w-10 p-2`}/>
              </Link>
          </Button>
        </div>
        <div className="hidden gap-x-2 md:flex">
          <Button variant="ghost">
            <Link href="/records">Récords del club</Link>
          </Button>
          <Button>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div> 
      </div>
    </nav>
  )
}