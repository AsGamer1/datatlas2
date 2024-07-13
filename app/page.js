import { History, Medal, Trophy } from "lucide-react";
import { HomeCard } from "@/components/custom/home-card";
import { Box, Container, Typography } from "@mui/material";
import { CurtainsClosedRounded } from "@mui/icons-material";

export default function Home() {
  return (
    <Container sx={{ color: "white", display: "flex", flexDirection: "column", flex: "1 1 0%", justifyContent: "center", marginX: "auto", paddingX: "1.25rem", maxWidth: { lg: "calc(min(100vw - 60px, 1220px))" } }}>
      <Typography variant="h1" sx={{ textAlign: "center", fontSize: { xs: "2rem", lg: "3.5rem" }, lineHeight: "1.2", fontWeight: "600", marginBottom: "1.5rem" }}>
        La <span className="text-secondary">Base</span><span className="text-tertiary"> De </span><span className="text-primary">Datos</span><br /> de tu club favorito
      </Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: "1rem", justifyContent: "center", alignItems: "center" }}>
        <HomeCard route="/marcas-personales" title="Marcas personales" Icon={CurtainsClosedRounded} contentTitle="Temporadas" content="desde 2023 hasta hoy" />
        <HomeCard route="/" title="Récords del club" Icon={Trophy} contentTitle="Pruebas" content="todas las de pista" />
        <HomeCard route="/" title="Historial" Icon={History} contentTitle="Participaciones" content="pista, cross, trail, ruta" />
      </Box>
    </Container>
  );
}
