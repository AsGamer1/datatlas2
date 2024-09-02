"use client";

import { logout } from "@/actions/auth/logout";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_LOGOUT_REDIRECT } from "@/routes";
import { Logout } from "@mui/icons-material";
import { AppBar, Avatar, Backdrop, Box, Button, Card, CardActions, CardContent, Link, ListItemIcon, ListItemText, Menu, MenuItem, styled, Toolbar, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";

export default function Navbar({ session }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const anchorEl = useRef();
  const theme = useTheme();

  const Image = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#0be0e0",
    fontSize: "18px"
  })

  const NavButton = styled(Button)({
    textTransform: "none",
    fontWeight: "600",
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
  })

  const UserAvatar = styled(Avatar)({
    backgroundColor: "#7affff",
    border: "4px solid #0BE0E0",
    color: "#008080",
    fontWeight: "600"
  })

  return (
    session ?
      <AppBar enableColorOnDark color="secondary" position="fixed" sx={{ backgroundImage: 'none', zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link href={DEFAULT_LOGIN_REDIRECT} underline="none">
            <Image component="img" src="/icons/logo_letras.png" alt="Club Atletisme Atlas" sx={{ height: { xs: "60px", sm: "52px" } }} />
          </Link>
          <Button ref={anchorEl} onClick={() => setIsMenuOpen(true)} style={{ borderRadius: 8, minWidth: 0, padding: 8 }}>
            <UserAvatar>{session?.name.split(" ").map(function (item, index) { if (index < 2) return item[0] }).join('')}</UserAvatar>
          </Button>
          <Menu anchorEl={anchorEl.current} open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <MenuItem onClick={() => { setIsMenuOpen(false); setIsDialogOpen(true) }}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Cerrar sesión</ListItemText>
            </MenuItem>
          </Menu>
          <Backdrop open={isDialogOpen}>
            <Card sx={{ bgcolor: "white", padding: 1, maxWidth: "500px" }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="600" color="black" marginBottom="8px" fontSize="18px">¿Quieres cerrar sesión?</Typography>
                <Typography variant="body2" fontWeight="600" color="#71717A">Esto hará que tengas que iniciar sesión de nuevo para poder ver tus marcas y estadísticas.</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <NavButton onClick={() => setIsDialogOpen(false)} variant="contained" sx={{ bgcolor: "white", "&:hover": { bgcolor: "#dfdfdf" } }}>Cancelar</NavButton>
                <NavButton onClick={() => { logout(); setIsDialogOpen(false) }} variant="contained">Cerrar sesión</NavButton>
              </CardActions>
            </Card>
          </Backdrop>
        </Toolbar>
      </AppBar>
      :
      <AppBar enableColorOnDark color="secondary" position="fixed" sx={{ backgroundImage: 'none', zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link href={DEFAULT_LOGIN_REDIRECT} underline="none">
            <Image component="img" src="/icons/logo_letras.png" alt="Club Atletisme Atlas" sx={{ height: { xs: "60px", sm: "52px" } }} />
          </Link>
          <NavButton variant="contained" href={DEFAULT_LOGOUT_REDIRECT}>Iniciar sesión</NavButton>
        </Toolbar>
      </AppBar>
  )
}