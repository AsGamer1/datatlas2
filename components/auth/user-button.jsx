"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/actions/logout";
import { LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import RecordsSVG from "@/app/svg/records";
import LoginSVG from "@/app/svg/login";

export default function UserButton({ session }) {

  const pathname = usePathname();

  if (session?.user) {
    return (
      <>
        <div className="flex items-center gap-x-2 md:hidden">
          <Link href="/records">
            <Button variant={pathname == "/records" ? "defaultIcon" : "ghost"} size="icon">
              <RecordsSVG className={`${pathname == "/records" ? "fill-white" : "fill-tertiary hover:fill-tertiary/80"} h-10 w-10 p-2`} />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none">
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className=" bg-secondary text-primary font-bold border-tertiary border-4">
                  {session?.user?.name.split(" ").map(function (item, index) { if (index < 2) return item[0] }).join('')}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <span onClick={() => { logout() }}>
                <DropdownMenuItem>
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </span>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden gap-x-2 md:flex">
          <Link href="/records">
            <Button variant="outline">Récords del club</Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none">
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className=" bg-secondary text-primary font-bold border-tertiary border-4">
                  {session?.user?.name.split(" ").map(function (item, index) { if (index < 2) return item[0] }).join('')}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <span onClick={() => { logout() }}>
                <DropdownMenuItem>
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </span>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="flex items-center gap-x-2 md:hidden">
          <Link href="/records">
            <Button variant={pathname == "/records" ? "defaultIcon" : "ghost"} size="icon">
              <RecordsSVG className={`${pathname == "/records" ? "fill-white" : "fill-tertiary hover:fill-tertiary/80"} h-10 w-10 p-2`} />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant={pathname == "/login" ? "defaultIcon" : "ghost"} size="icon">
              <LoginSVG className={`${pathname == "/login" ? "fill-white" : "fill-tertiary hover:fill-tertiary/80"} h-10 w-10 p-2`} />
            </Button>
          </Link>
        </div>
        <div className="hidden items-center gap-x-2 md:flex">
          <Link href="/records">
            <Button variant="outline">Récords del club</Button>
          </Link>
          <Link href="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
        </div>
      </>
    )
  }
}