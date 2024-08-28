import { Typography } from "@mui/material";

export default function ThreeColorTitle() {
  return (
    <Typography variant="h1" sx={{ textAlign: "center", fontSize: { xs: "1.8rem", lg: "3.5rem" }, lineHeight: "1.2", fontWeight: "600", marginBottom: "1.5rem" }}>
      La <span style={{ color: "#7AFFFF" }}>Base</span><span style={{ color: "#0BE0E0" }}> De </span><span style={{ color: "#008080" }}>Datos</span><br /> de tu club favorito
    </Typography>
  )
}