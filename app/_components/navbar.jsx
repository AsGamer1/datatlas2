import Image from "next/image";
import { auth } from "@/auth";
import dynamic from "next/dynamic";
const DynamicUserButton = dynamic(() => import("@/components/auth/user-button"), { ssr: false })

export default async function Navbar() {

  const session = await auth();

  return (
    <nav className="py-5 px-10 bg-[#173f3f] flex justify-between items-center shadow-sm">
      <a href="/" className="flex items-center space-x-3 text-tertiary font-bold text-xl">
        <Image width="40" height="40" src="/icons/logo.png" />
        <span>CA Atlas</span>
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