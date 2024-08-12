"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AppBar, Box, Link, styled, Toolbar, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
const DynamicNavLink = dynamic(() => import("@/app/_components/custom/nav-login-avatar"), { ssr: false })

export default function Navbar({ session }) {

  const theme = useTheme();

  const Image = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#0be0e0",
    fontSize: "18px"
  })

  return (
    <AppBar enableColorOnDark color="secondary" position="sticky" sx={{ backgroundImage: 'none', zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href={DEFAULT_LOGIN_REDIRECT} underline="none">
          <Image component="img" src="/icons/logo_letras.png" alt="Club Atletisme Atlas" sx={{ height: { xs: "60px", sm: "52px" } }} />
        </Link>
        <DynamicNavLink session={session} />
      </Toolbar>
    </AppBar>
  )
}