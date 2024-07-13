"use client";

import dynamic from "next/dynamic";
import { AppBar, Box, Container, Toolbar, useTheme } from "@mui/material";
import { Link } from "@mui/material";
const DynamicUserButton = dynamic(() => import("@/components/auth/nav-links"), { ssr: false })

export default function Navbar({ session }) {

  const theme = useTheme();

  return (
    <AppBar enableColorOnDark color="secondary" position="static" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundImage: 'none', display: "flex", justifyContent: "center" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href={session ? "/inicio" : "/"}>
            <Box component="img" src="/icons/logo_letras.png" alt="Club Atletisme Atlas" sx={{width: "auto", height: {xs: "60px", sm: "52px"}, color: "#0be0e0", display: "flex", alignItems: "center", textAlign: "center", fontSize: "18px"}}/>
          </Link>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: "0.5rem" }}> 
            <DynamicUserButton session={session} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}