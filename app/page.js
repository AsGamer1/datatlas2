import { HomeCard } from "@/app/_components/custom/home-card";
import { Box, Typography } from "@mui/material";
import { WorkspacePremiumRounded, HistoryRounded, EmojiEventsRounded } from "@mui/icons-material";
import { auth } from "@/auth";

export default async function Home() {

  const session = await auth();

  return (
    session ?
      <></>
      :
      <>
        <Typography variant="h1" sx={{ textAlign: "center", fontSize: { xs: "1.8rem", lg: "3.5rem" }, lineHeight: "1.2", fontWeight: "600", marginBottom: "1.5rem" }}>
          La <span style={{ color: "#7AFFFF" }}>Base</span><span style={{ color: "#0BE0E0" }}> De </span><span style={{ color: "#008080" }}>Datos</span><br /> de tu club favorito
        </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "1rem", justifyContent: "center", alignItems: "center" }}>
          <HomeCard route="/marcas-personales" title="Marcas personales" Icon={WorkspacePremiumRounded} contentTitle="Temporadas" content="desde 2023 hasta hoy" />
          <HomeCard route="/records" title="Récords del club" Icon={EmojiEventsRounded} contentTitle="Pruebas" content="todas las de pista" />
          <HomeCard route="/" title="Historial" Icon={HistoryRounded} contentTitle="Participaciones" content="pista, cross, trail, ruta" />
        </Box>
      </>
  );
}
