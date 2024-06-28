import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Atlas",
  description: "Base de datos de los atletas del CA Atlas"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="manifest" href="/api/manifest"/>
      </head>
      <body className={`${inter.className} flex flex-col min-h-[100vh]`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}