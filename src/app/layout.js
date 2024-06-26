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
    <html lang="es">
      <head>
        <link rel="manifest" href="/api/manifest"/>
      </head>
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}