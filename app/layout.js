import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import BottomMenu from "@/components/ui/bottom-menu";
import Head from "@/app/head";
import ClientOnly from "@/app/client-only";
import { Container, Stack, ThemeProvider, Toolbar } from "@mui/material";
import { atlasTheme } from "./theme";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default async function RootLayout({ children }) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="es">
        <Head />
        <body className={inter.className}>
          <ThemeProvider theme={atlasTheme}>
            <Stack sx={{ minHeight: "100dvh", bgcolor: "#040A0F" }}>
              <Navbar session={session?.user} />
              <Container sx={{ color: "white", display: "flex", flexDirection: "column", flex: "1 1 0%", overflowY: "auto", justifyContent: "center", paddingLeft: { md: "56px" }, paddingBottom: { xs: "64px", md: 0 } }}>
                <Toolbar />
                {children}
              </Container>
              <Sidebar role={session?.user?.image} />
              <BottomMenu role={session?.user?.image} />
            </Stack>
          </ThemeProvider>
          <ClientOnly />
        </body>
      </html>
    </SessionProvider>
  );
}