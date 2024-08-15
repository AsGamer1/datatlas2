"use client";

import { usePathname } from "next/navigation";
import { Collapse, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useState } from "react";
import { AddModeratorRounded, EmojiEventsRounded, HomeRounded, PersonAddRounded, WorkspacePremiumRounded } from "@mui/icons-material";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function SidebarAdmin() {

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Drawer onMouseMove={handleOpen} onMouseLeave={handleClose} variant="permanent" open={open} sx={{ display: { xs: "none", sm: "flex" }, "& .MuiDrawer-paper": { borderRight: "none" } }}>
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
      <List>
        <ListItem disablePadding sx={pathname == "/auth/register" && { bgcolor: "#008080" }}>
          <ListItemButton href="/auth/register">
            <ListItemIcon sx={{ minWidth: "0" }}>
              <PersonAddRounded sx={pathname == "/auth/register" && { fill: "#0be0e0" }} />
            </ListItemIcon>
            <Collapse in={open} orientation="horizontal" sx={{ padding: 0 }}>
              <ListItemText sx={{ marginY: 0, textWrap: "nowrap", whiteSpaceCollapse: "preserve" }} primary="    Registrar atleta" primaryTypographyProps={pathname == "/auth/register" && { color: "#0be0e0" }} />
            </Collapse>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={pathname == "/auth/admin/register" && { bgcolor: "#008080" }}>
          <ListItemButton href="/auth/admin/register">
            <ListItemIcon sx={{ minWidth: "0" }}>
              <AddModeratorRounded sx={pathname == "/auth/admin/register" && { fill: "#0be0e0" }} />
            </ListItemIcon>
            <Collapse in={open} orientation="horizontal" sx={{ padding: 0 }}>
              <ListItemText sx={{ marginY: 0, textWrap: "nowrap", whiteSpaceCollapse: "preserve" }} primary="    Registrar entrenador" primaryTypographyProps={pathname == "/auth/admin/register" && { color: "#0be0e0" }} />
            </Collapse>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}