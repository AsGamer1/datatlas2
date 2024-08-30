import { auth } from "@/auth";
import { Box } from "@mui/material";
import { WorkspacePremiumRounded, HistoryRounded, EmojiEventsRounded } from "@mui/icons-material";
import { HomeCard } from "@/components/ui/home-card";
import ThreeColorTitle from "@/components/font/three-color-title";

function LoggedOutHome() {
  return (
    <>
      <ThreeColorTitle />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "1rem", justifyContent: "center", alignItems: "center" }}>
        <HomeCard route="/marcas-personales" title="Marcas personales" Icon={WorkspacePremiumRounded} contentTitle="Temporadas" content="desde 2023 hasta hoy" />
        <HomeCard route="/records" title="Récords del club" Icon={EmojiEventsRounded} contentTitle="Pruebas" content="todas las de pista" />
        <HomeCard route="/" title="Historial" Icon={HistoryRounded} contentTitle="Participaciones" content="pista, cross, trail, ruta" />
      </Box>
    </>
  )
}

function LoggedInHome() {
  return (
    <>
    </>
  )
}

export default async function Home() {
  const session = await auth()
  return session ? <LoggedInHome /> : <LoggedOutHome />
}