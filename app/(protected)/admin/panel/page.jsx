"use client";

import { Grid } from "@mui/material";
import Table from "@/app/_components/custom/admin-tables";
import { useEffect, useState } from "react";
import { getFuturosEventos } from "@/actions/get-eventos";
import { getMarcasRegistradas } from "@/actions/get-marcas";

export default function AdminPanel() {

  const [eventosFuturos, setEventosFuturos] = useState(undefined)
  const [marcasRegistradas, setMarcasRegistradas] = useState(undefined)
  useEffect(() => {
    async function fetchData() {
      const eventos = await getFuturosEventos();
      const marcas = await getMarcasRegistradas()
      setEventosFuturos(eventos)
      setMarcasRegistradas(marcas)
    }
    fetchData();
  }, []);

  return (
    <Grid container spacing={2} sx={{ paddingX: 2, marginY: 2 }}>
      <Grid item xs={12} md={6}>
        <Table title="Próximos eventos" fetch={eventosFuturos} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Table title="Marcas registradas" fetch={marcasRegistradas} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Table title="Atletas registrados" fetch={undefined} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Table title="Entrenadores registrados" fetch={undefined} />
      </Grid>
    </Grid>
  )
}
