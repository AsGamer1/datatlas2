"use client";

import { AppBar, Box, Link, styled, Toolbar } from "@mui/material";
import dynamic from "next/dynamic";
const DynamicNavLink = dynamic(() => import("@/app/_components/nav-login-avatar"), { ssr: false })

export default function Navbar({ session }) {

  const Image = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#0be0e0",
    fontSize: "18px"
  })

  return (
    <AppBar enableColorOnDark color="secondary" position="sticky" sx={{ backgroundImage: 'none' }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href={session ? "/inicio" : "/"} underline="none">
          <Image component="img" src="/icons/logo_letras.png" alt="Club Atletisme Atlas" sx={{ height: { xs: "60px", sm: "52px" } }} />
        </Link>
        <DynamicNavLink session={session} />
      </Toolbar>
    </AppBar>
  )
}