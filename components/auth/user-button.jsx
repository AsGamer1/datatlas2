"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { logout } from "@/actions/logout";
import { LogOutIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export function UserButton({session}) {

  const user = useSession().data?.user

  return (
    session.user ?
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className=" bg-secondary text-primary font-bold border-tertiary border-4">
            {user?.name.split(" ").map(function (item, index) { if (index < 2) return item[0] }).join('')}
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
    :
    <div></div>
  )
}