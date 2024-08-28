"use client";

import { Grid } from "@mui/material";
import Table from "@/app/_components/custom/admin/tables";
import { useEffect, useState } from "react";
import { getFuturosEventos } from "@/actions/data/get/get-eventos";
import { getMarcasRegistradas } from "@/actions/data/get/get-marcas";
import { getAtletasRegistrados } from "@/actions/data/get/get-atletas";
import { getEntrenadoresRegistrados } from "@/actions/data/get/get-entrenadores";
import { useSession } from "next-auth/react";

export default function AdminPanel() {

  const session = useSession();
  const isAdmin = session?.data?.user.image === "admin";

  const [eventosFuturos, setEventosFuturos] = useState(undefined)
  const [marcasRegistradas, setMarcasRegistradas] = useState(undefined)
  const [atletasRegistrados, setAtletasRegistrados] = useState(undefined)
  const [entrenadoresRegistrados, setEntrenadoresRegistrados] = useState(undefined)

  useEffect(() => {
    async function fetchData() {
      const eventos = await getFuturosEventos();
      const marcas = await getMarcasRegistradas();
      const atletas = await getAtletasRegistrados();
      const entrenadores = await getEntrenadoresRegistrados();
      setEventosFuturos(eventos)
      setMarcasRegistradas(marcas)
      setAtletasRegistrados(atletas)
      setEntrenadoresRegistrados(entrenadores)
    }
    fetchData();
  }, []);

  return (
    <Grid container spacing={2} sx={{ paddingX: 2, marginY: 2 }}>
      <Grid item key="proximos-eventos-grid-item" xs={12} md={6}>
        <Table key="proximos-eventos-table" title="Próximos eventos" fetch={eventosFuturos} action="/admin/editor/eventos" />
      </Grid>
      <Grid item key="marcas-registradas-grid-item" xs={12} md={6}>
        <Table key="marcas-registradas-table" title="Marcas registradas" fetch={marcasRegistradas} action="/admin/editor/marcas" />
      </Grid>
      <Grid item key="atletas-registrados-grid-item" xs={12} md={6}>
        <Table key="atletas-registrados-table" title="Atletas registrados" fetch={atletasRegistrados} action="/auth/register" />
      </Grid>
      <Grid item key="entrenadores-registrados-grid-item" xs={12} md={6}>
        <Table key="entrenadores-registrados" title="Entrenadores registrados" fetch={entrenadoresRegistrados} action={isAdmin && "/auth/admin/register"} disabled={isAdmin} />
      </Grid>
    </Grid>
  )
}
