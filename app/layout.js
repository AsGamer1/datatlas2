import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import Navbar from "@/app/_components/navbar";
import Sidebar from "@/app/_components/sidebar";
import BottomMenu from "@/app/_components/bottom-menu";
import Head from "@/app/head";
import ClientOnly from "@/app/client-only";
import { Box, Stack, ThemeProvider } from "@mui/material";
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
            <Stack sx={{minHeight: "100dvh"}}>
              <Navbar session={session} />
              <Box sx={{flex: "1 1 0%"}}>
                {children}
              </Box>
            </Stack>
          </ThemeProvider>
          <ClientOnly />
        </body>
      </html>
    </SessionProvider>
  );
}