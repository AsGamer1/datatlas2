import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Box, Button, Typography } from "@mui/material";

export default function NotFound() {

  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h1" sx={{ fontSize: { xs: "2rem", lg: "3.5rem" }, lineHeight: "1.2", fontWeight: "600" }}>404</Typography>
        <Typography variant="body1" sx={{ fontSize: "1.125rem", lineHeight: "1.75rem", margin: "0.5rem" }}>No hemos encontrado la página</Typography>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button variant="contained" href={DEFAULT_LOGIN_REDIRECT}>
          Ir a inicio
        </Button>
      </Box>
    </>
  )
}