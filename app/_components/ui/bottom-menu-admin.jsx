"use client";

import { useState } from "react";
import { AdminPanelSettingsRounded, EmojiEventsRounded, HomeRounded, WorkspacePremiumRounded } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function BottomMenuAdmin() {

  const [value, setValue] = useState(usePathname())
  const theme = useTheme();

  return (
    <BottomNavigation sx={{ height: "4rem", bottom: 0, width: "100%", position: "fixed", zIndex: theme.zIndex.drawer, display: { md: "none" } }} value={value} onChange={(event, newValue) => { setValue(newValue); }}>
      <BottomNavigationAction href={DEFAULT_LOGIN_REDIRECT} value={DEFAULT_LOGIN_REDIRECT} label="Inicio" icon={<HomeRounded sx={{ width: "2rem", height: "2rem" }} />} />
      <BottomNavigationAction href="/records" value="/records" label="Récords" icon={<EmojiEventsRounded sx={{ width: "2rem", height: "2rem" }} />} />
      <BottomNavigationAction href="/marcas-personales" value="/marcas-personales" label="Mis marcas" sx={{textWrap: "nowrap"}} icon={<WorkspacePremiumRounded sx={{ width: "2rem", height: "2rem" }} />} />
      <BottomNavigationAction href="/admin/panel" value="/admin/panel" label="Panel" icon={<AdminPanelSettingsRounded sx={{ width: "2rem", height: "2rem" }} />} />
    </BottomNavigation>
  )
}