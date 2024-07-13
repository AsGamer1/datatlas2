"use client";

import { useState } from "react";
import { EmojiEventsRounded, HomeRounded, WorkspacePremiumRounded } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { usePathname } from "next/navigation";

export default function BottomMenu() {

  const [value, setValue] = useState(usePathname())

  return (
    <BottomNavigation sx={{ height: "4rem", bottom: 0, width: "100%", display: { sm: "none" } }} value={value} onChange={(event, newValue) => { setValue(newValue); }}>
      <BottomNavigationAction href="/inicio" value="/inicio" label="Inicio" icon={<HomeRounded sx={{ width: "2rem", height: "2rem" }} />} />
      <BottomNavigationAction href="/records" value="/records" label="Récords" icon={<EmojiEventsRounded sx={{ width: "2rem", height: "2rem" }} />} />
      <BottomNavigationAction href="/marcas-personales" value="/marcas-personales" label="Mis marcas" icon={<WorkspacePremiumRounded sx={{ width: "2rem", height: "2rem" }} />} />
    </BottomNavigation>
  )
}