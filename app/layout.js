import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import Navbar from "@/app/_components/ui/navbar";
import Sidebar from "@/app/_components/ui/sidebar";
import SidebarAdmin from "@/app/_components/ui/sidebar-admin";
import BottomMenu from "@/app/_components/ui/bottom-menu";
import BottomMenuAdmin from "@/app/_components/ui/bottom-menu-admin";
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
              <Navbar session={session} />
              <Container sx={{ color: "white", display: "flex", flexDirection: "column", flex: "1 1 0%", overflowY: "auto", justifyContent: "center", paddingLeft: { md: "56px" }, paddingBottom: { xs: "64px", md: 0 } }}>
                <Toolbar />
                {children}
              </Container>
              {session?.user?.image == "atleta" &&
                <>
                  <Sidebar />
                  <BottomMenu />
                </>
              }
              {(session?.user?.image == "entrenador" || session?.user?.image == "admin") &&
                <>
                  <SidebarAdmin />
                  <BottomMenuAdmin />
                </>
              }
            </Stack>
          </ThemeProvider>
          <ClientOnly />
        </body>
      </html>
    </SessionProvider>
  );
}