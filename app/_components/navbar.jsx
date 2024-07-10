import Image from "next/image";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
const DynamicUserButton = dynamic(() => import("@/components/auth/nav-links"), { ssr: false })

export default async function Navbar() {

  const session = await auth();

  return (
    <nav className="py-4 px-4 sm:px-10 bg-[#173f3f] flex justify-between items-center shadow-sm">
      <a href={session ? "/inicio" : "/"} className="flex items-center space-x-3 text-tertiary font-bold text-xl">
        <Image width="88" height="88" className="flex flex-row items-center text-center leading-5" src="/icons/logo_letras.png" alt="Club Atletisme Atlas"/>
      </a>
      <div className="flex items-center gap-x-2 md:hidden">
        <DynamicUserButton session={session} />
      </div>
      <div className="hidden gap-x-2 md:flex">
        <DynamicUserButton session={session} />
      </div>
    </nav>
  )
}