import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import Navbar from "@/app/_components/navbar";
import Sidebar from "@/app/_components/sidebar";
import BottomMenu from "@/app/_components/bottom-menu";

const inter = Poppins({ subsets: ["latin"], weight: ["600"] });

export const metadata = {
  title: "Atlas",
  description: "Base de datos de atletas del CA Atlas"
};

export default async function RootLayout({ children }) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/api/manifest" />
          <meta name="theme-color" content="#173f3f" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </head>
        <body className={`${inter.className} grid grid-rows-10 xs:flex xs:flex-col sm:flex sm:flex-col h-screen bg-secondary-foreground`}>
          <Navbar/>
          <div className="flex flex-row row-span-8 flex-1">
            {session && <Sidebar />}
            {children}
          </div>
          {session && <BottomMenu />}
        </body>
      </html>
    </SessionProvider>
  );
}