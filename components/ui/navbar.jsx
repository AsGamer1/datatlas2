"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AppBar, Avatar, Box, Link, styled, Toolbar, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
const DynamicNavLink = dynamic(() => import("@/components/ui/nav-login-avatar"), {
  ssr: false,
  loading: () =>
    <Avatar sx={{
      backgroundColor: "#7affff",
      border: "4px solid #0BE0E0",
      color: "#008080",
      fontWeight: "600",
      margin: 1,
      cursor: "wait"
    }}
    />
})

export default function Navbar({ session }) {

  const theme = useTheme();

  const Image = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#0be0e0",
    fontSize: "18px"
  })

  return (
    <AppBar enableColorOnDark color="secondary" position="fixed" sx={{ backgroundImage: 'none', zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href={DEFAULT_LOGIN_REDIRECT} underline="none">
          <Image component="img" src="/icons/logo_letras.png" alt="Club Atletisme Atlas" sx={{ height: { xs: "60px", sm: "52px" } }} />
        </Link>
        <DynamicNavLink session={session} />
      </Toolbar>
    </AppBar>
  )
}