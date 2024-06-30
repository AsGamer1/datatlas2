import { Inter } from "next/font/google";
import Navbar from "./_components/navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Atlas",
  description: "Base de datos de los atletas del CA Atlas"
};

export default async function RootLayout({ children }) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html>
        <head>
          <link rel="manifest" href="/api/manifest" />
        </head>
        <body className={`${inter.className} flex flex-col min-h-[100vh] bg-primary/10`}>
          <Navbar session={session} />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}