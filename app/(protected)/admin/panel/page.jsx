"use client";

import { Grid } from "@mui/material";
import PanelTable from "@/components/tables/panel";
import { useEffect, useState } from "react";
import { getFuturosEventos } from "@/actions/data/get/get-eventos";
import { getMarcasRegistradas } from "@/actions/data/get/get-marcas";
import { getAtletasRegistrados } from "@/actions/data/get/get-atletas";
import { getEntrenadoresRegistrados } from "@/actions/data/get/get-entrenadores";
import { useSession } from "next-auth/react";

export default function AdminPanel() {

  const session = useSession()
  const isAdmin = session?.data?.user.image === "admin"

  const [datos, setDatos] = useState({})

  useEffect(() => {
    async function fetchData() {
      const eventos = await getFuturosEventos()
      const marcas = await getMarcasRegistradas()
      const atletas = await getAtletasRegistrados()
      const entrenadores = await getEntrenadoresRegistrados()
      setDatos({ eventos, marcas, atletas, entrenadores })
    }
    fetchData()
  }, [])

  return (
    <Grid container spacing={2} sx={{ paddingX: 2, marginY: 2 }}>
      <Grid item key="proximos-eventos-grid-item" xs={12} md={6}>
        <PanelTable
          key="proximos-eventos-table"
          title="Próximos eventos"
          fetch={datos?.eventos}
          action="/admin/editor/eventos"
        />
      </Grid>
      <Grid item key="marcas-registradas-grid-item" xs={12} md={6}>
        <PanelTable
          key="marcas-registradas-table"
          title="Marcas registradas"
          fetch={datos?.marcas}
          action="/admin/editor/marcas"
        />
      </Grid>
      <Grid item key="atletas-registrados-grid-item" xs={12} md={6}>
        <PanelTable
          key="atletas-registrados-table"
          title="Atletas registrados"
          fetch={datos?.atletas}
          action="/auth/register"
        />
      </Grid>
      <Grid item key="entrenadores-registrados-grid-item" xs={12} md={6}>
        <PanelTable
          key="entrenadores-registrados"
          title="Entrenadores registrados"
          fetch={datos?.entrenadores}
          action={isAdmin && "/auth/admin/register"}
          disabled={!isAdmin}
        />
      </Grid>
    </Grid>
  )
}
