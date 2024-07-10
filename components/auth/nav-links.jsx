"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { logout } from "@/actions/logout";
import { LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import RecordsSVG from "@/app/svg/records";
import LoginSVG from "@/app/svg/login";
import { useState } from "react";

export default function UserButton({ session }) {

  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (session?.user) {
    return (
      <div className="flex items-center justify-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <Avatar>
              <AvatarFallback className=" bg-secondary text-primary font-bold border-tertiary border-4">
                {session?.user?.name.split(" ").map(function (item, index) { if (index < 2) return item[0] }).join('')}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => { setIsDialogOpen(true) }}>
              <LogOutIcon className="w-4 h-4 mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={isDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Quieres cerrar sesión?</AlertDialogTitle>
              <AlertDialogDescription>Esto hará que tengas que iniciar sesión de nuevo para poder ver tus marcas y estadísticas.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => { setIsDialogOpen(false) }}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => { logout();setIsDialogOpen(false) }}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
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