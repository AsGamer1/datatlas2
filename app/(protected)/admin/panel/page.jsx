"use client";

import { Grid } from "@mui/material";
import Table from "@/app/_components/custom/admin-tables";
import { useEffect, useState } from "react";
import { getFuturosEventos } from "@/actions/data/get/get-eventos";
import { getMarcasRegistradas } from "@/actions/data/get/get-marcas";
import { getAtletasRegistrados } from "@/actions/data/get/get-atletas";
import { getEntrenadoresRegistrados } from "@/actions/data/get/get-entrenadores";
import { useSession } from "next-auth/react";

export default function AdminPanel() {

  const session = useSession();

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
      <Grid item xs={12} md={6}>
        <Table title="Próximos eventos" fetch={eventosFuturos} action="/admin/editor/eventos" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Table title="Marcas registradas" fetch={marcasRegistradas} action="/admin/editor/marcas" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Table title="Atletas registrados" fetch={atletasRegistrados} action="/auth/register" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Table title="Entrenadores registrados" fetch={entrenadoresRegistrados} action="/auth/admin/register" disabled={session?.data?.user.image !== "admin"} />
      </Grid>
    </Grid>
  )
}
