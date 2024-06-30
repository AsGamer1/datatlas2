"use client";

import Link from "next/link";
import LoginSVG from "@/app/svg/login";
import RecordsSVG from "@/app/svg/records";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export default function Navbar({ session }) {

  const pathname = usePathname();

  return (
    <nav className="py-5 px-10 bg-[#173f3f] flex justify-between items-center shadow-sm">
      <a href="/" className="flex items-center space-x-3 text-tertiary font-bold text-xl">
        <Image width="40" height="40" src="/icons/logo.png" />
        <span>CA Atlas</span>
      </a>
      <div className="flex items-center gap-x-2 md:hidden">
        <Link href="/records">
          <Button variant={pathname == "/records" ? "default" : "ghost"} size="icon">
            <RecordsSVG className={`${pathname == "/records" ? "fill-white" : "fill-tertiary hover:fill-tertiary/80"} h-10 w-10 p-2`} />
          </Button>
        </Link>
        {session ?
          <UserButton session={session} />
          :
          <Link href="/login">
            <Button variant={pathname == "/login" ? "default" : "ghost"} size="icon">
              <LoginSVG className={`${pathname == "/login" ? "fill-white" : "fill-tertiary hover:fill-tertiary/80"} h-10 w-10 p-2`} />
            </Button>
          </Link>
        }
      </div>
      <div className="hidden gap-x-2 md:flex">
        <Link href="/records">
          <Button variant="outline">Récords del club</Button>
        </Link>
        {session ?
          <UserButton session={session} />
          :
          <Link href="/login">
            <Button>Iniciar sesión</Button>
          </Link>
        }
      </div>
    </nav>
  )
}