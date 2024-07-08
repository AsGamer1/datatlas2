import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import Navbar from "@/app/_components/navbar";
import Sidebar from "@/app/_components/sidebar";

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
          <link rel="manifest" href="/api/manifest" />
        </head>
        <body className={`${inter.className} flex flex-col min-h-[100vh] bg-secondary-foreground`}>
          <Navbar />
          <div className="flex flex-row flex-1">
            {session && <Sidebar />}
            {children}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}