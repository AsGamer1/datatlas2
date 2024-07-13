import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import Navbar from "@/app/_components/navbar";
import Sidebar from "@/app/_components/sidebar";
import BottomMenu from "@/app/_components/bottom-menu";
import Head from "@/app/head";
import ClientOnly from "@/app/client-only";
import { Container, ThemeProvider, Toolbar } from "@mui/material";
import { atlasTheme } from "./theme";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default async function RootLayout({ children }) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html>
        <Head />
        <body className={inter.className}>
          <ThemeProvider theme={atlasTheme}>
            <Container maxWidth="none" sx={{ height: "100dvh", width: "100%", display: "flex", flexDirection: "column", padding: 0 }}>
              <Navbar session={session} />
              {session && <Sidebar />}
              <Container maxWidth="none" sx={{ flex: "1 1 0%", display: "flex", justifyContent: "center" }}>
                <Toolbar sx={{ display: { xs: "none", sm: "inherit" } }} />
                {children}
              </Container>
              {session && <BottomMenu />}
            </Container>
          </ThemeProvider>
          <ClientOnly />
        </body>
      </html>
    </SessionProvider>
  );
}