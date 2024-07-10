"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { Home, Medal, Trophy } from "lucide-react"
import { usePathname } from "next/navigation";

export default function BottomMenu() {

  const pathname = usePathname();
  const inactive = "flex items-center p-2 gap-2 justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
  const active = "flex items-center p-2 gap-2 justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground"

  return (
    <nav className="fixed bottom-0 w-full flex sm:hidden flex-row justify-around border-t bg-background items-center gap-4 p-3">
      <Link href="/inicio" className={pathname == "/inicio" ? active : inactive}>
        <Home className="h-7 w-7" />
        <span className="sr-only">Inicio</span>
      </Link>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/marcas-personales" className={pathname == "/marcas-personales" ? active : inactive}>
              <Medal className="h-7 w-7" />
              <span className="sr-only">Marcas personales</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Marcas personales</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/records" className={pathname == "/records" ? active : inactive}>
              <Trophy className="h-7 w-7" />
              <span className="sr-only">Récords del club</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Récords</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav >
  )
}