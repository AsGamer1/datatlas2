"use client";

import { usePathname } from "next/navigation";
import { Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useState } from "react";
import { AdminPanelSettingsRounded, EmojiEventsRounded, HomeRounded, WorkspacePremiumRounded } from "@mui/icons-material";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Sidebar({ role }) {

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    role === "atleta" ?
      <Drawer onMouseMove={handleOpen} onMouseLeave={handleClose} variant="permanent" open={open} sx={{ display: { xs: "none", md: "flex" }, "& .MuiDrawer-paper": { borderRight: "none" } }}>
        <Toolbar />
        <List>
          <ListItem disablePadding sx={pathname == DEFAULT_LOGIN_REDIRECT && { bgcolor: "#008080" }}>
            <ListItemButton href={DEFAULT_LOGIN_REDIRECT}>
              <ListItemIcon sx={{ minWidth: "0" }}>
                <HomeRounded sx={pathname == DEFAULT_LOGIN_REDIRECT && { fill: "#0be0e0" }} />
              </ListItemIcon>
              <Collapse in={open} orientation="horizontal" sx={{ padding: 0 }}>
                <ListItemText sx={{ marginY: 0, textWrap: "nowrap", whiteSpaceCollapse: "preserve" }} primary="    Inicio" primaryTypographyProps={pathname == DEFAULT_LOGIN_REDIRECT && { color: "#0be0e0" }} />
              </Collapse>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={pathname == "/records" && { bgcolor: "#008080" }}>
            <ListItemButton href="/records">
              <ListItemIcon sx={{ minWidth: "0" }}>
                <EmojiEventsRounded sx={pathname == "/records" && { fill: "#0be0e0" }} />
              </ListItemIcon>
              <Collapse in={open} orientation="horizontal" sx={{ padding: 0 }}>
                <ListItemText sx={{ marginY: 0, textWrap: "nowrap", whiteSpaceCollapse: "preserve" }} primary="    Récords del Club" primaryTypographyProps={pathname == "/records" && { color: "#0be0e0" }} />
              </Collapse>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={pathname == "/marcas-personales" && { bgcolor: "#008080" }}>
            <ListItemButton href="/marcas-personales">
              <ListItemIcon sx={{ minWidth: "0" }}>
                <WorkspacePremiumRounded sx={pathname == "/marcas-personales" && { fill: "#0be0e0" }} />
              </ListItemIcon>
              <Collapse in={open} orientation="horizontal" sx={{ padding: 0 }}>
                <ListItemText sx={{ marginY: 0, textWrap: "nowrap", whiteSpaceCollapse: "preserve" }} primary="    Mis Marcas" primaryTypographyProps={pathname == "/marcas-personales" && { color: "#0be0e0" }} />
              </Collapse>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      : (role === "entrenador" || role === "admin") ?
        <Drawer onMouseMove={handleOpen} onMouseLeave={handleClose} variant="permanent" open={open} sx={{ display: { xs: "none", md: "flex" }, "& .MuiDrawer-paper": { borderRight: "none" } }}>
          <Toolbar />
          <List>
            <ListItem disablePadding sx={pathname == DEFAULT_LOGIN_REDIRECT && { bgcolor: "#008080" }}>
              <ListItemButton href={DEFAULT_LOGIN_REDIRECT}>
                <ListItemIcon sx={{ minWidth: "0" }}>
                  <HomeRounded sx={pathname == DEFAULT_LOGIN_REDIRECT && { fill: "#0be0e0" }} />
                </ListItemIcon>
                <Collapse in={open} orientation="horizontal" sx={{ padding: 0 }}>
                  <ListItemText sx={{ marginY: 0, textWrap: "nowrap", whiteSpaceCollapse: "preserve" }} primary="    Inicio" primaryTypographyProps={pathname == DEFAULT_LOGIN_REDIRECT && { color: "#0be0e0" }} />
                </Collapse>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={pathname == "/records" && { bgcolor: "#008080" }}>
              <ListItemButton href="/records">
                <ListItemIcon sx={{ minWidth: "0" }}>
                  <EmojiEventsRounded sx={pathname == "/records" && { fill: "#0be0e0" }} />
                </ListItemIcon>
                <Collapse in={open} orientation="horizontal" sx={{ padding: 0 }}>
                  <ListItemText sx={{ marginY: 0, textWrap: "nowrap", whiteSpaceCollapse: "preserve" }} primary="    Récords del Club" primaryTypographyProps={pathname == "/records" && { color: "#0be0e0" }} />
                </Collapse>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={pathname == "/marcas-personales" && { bgcolor: "#008080" }}>
              <ListItemButton href="/marcas-personales">
                <ListItemIcon sx={{ minWidth: "0" }}>
                  <WorkspacePremiumRounded sx={pathname == "/marcas-personales" && { fill: "#0be0e0" }} />
                </ListItemIcon>
                <Collapse in={open} orientation="horizontal" sx={{ padding: 0 }}>
                  <ListItemText sx={{ marginY: 0, textWrap: "nowrap", whiteSpaceCollapse: "preserve" }} primary="    Mis Marcas" primaryTypographyProps={pathname == "/marcas-personales" && { color: "#0be0e0" }} />
                </Collapse>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={pathname == "/admin/panel" && { bgcolor: "#008080" }}>
              <ListItemButton href="/admin/panel">
                <ListItemIcon sx={{ minWidth: "0" }}>
                  <AdminPanelSettingsRounded sx={pathname == "/admin/panel" && { fill: "#0be0e0" }} />
                </ListItemIcon>
                <Collapse in={open} orientation="horizontal" sx={{ padding: 0 }}>
                  <ListItemText sx={{ marginY: 0, textWrap: "nowrap", whiteSpaceCollapse: "preserve" }} primary="    Panel de entrenador" primaryTypographyProps={pathname == "/admin/panel" && { color: "#0be0e0" }} />
                </Collapse>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        :
        <></>
  )
}