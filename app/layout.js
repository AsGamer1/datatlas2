import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import Navbar from "@/app/_components/ui/navbar";
import Sidebar from "@/app/_components/ui/sidebar";
import BottomMenu from "@/app/_components/ui/bottom-menu";
import Head from "@/app/head";
import ClientOnly from "@/app/client-only";
import { Container, Stack, ThemeProvider } from "@mui/material";
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
            <Stack sx={{ minHeight: "100dvh", bgcolor: "#040A0F" }}>
              <Navbar session={session} />
              <Container sx={{ color: "white", display: "flex", flexDirection: "column", flex: "1 1 0%", justifyContent: "center" }}>
                {children}
              </Container>
              {session && <Sidebar />}
              {session && <BottomMenu />}
            </Stack>
          </ThemeProvider>
          <ClientOnly />
        </body>
      </html>
    </SessionProvider>
  );
}