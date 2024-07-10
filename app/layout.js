import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import Navbar from "@/app/_components/navbar";
import Sidebar from "@/app/_components/sidebar";
import BottomMenu from "@/app/_components/bottom-menu";
import Head from "@/app/head";
import ClientOnly from "@/app/client-only";

const inter = Poppins({ subsets: ["latin"], weight: ["600"] });

export default async function RootLayout({ children }) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html>
        <Head />
        <body className={`${inter.className} grid grid-rows-10 xs:flex xs:flex-col sm:flex sm:flex-col h-screen bg-secondary-foreground`}>
          <Navbar />
          <div className="flex flex-row row-span-8 flex-1">
            {session && <Sidebar />}
            {children}
          </div>
          {session && <BottomMenu />}
          <ClientOnly />
        </body>
      </html>
    </SessionProvider>
  );
}