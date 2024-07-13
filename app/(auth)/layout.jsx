import { Box, Container } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Container sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", flex: "1 1 0%" }}>
      <Box sx={{ width: "100%", paddingX: "1.25rem" }}>
        {children}
      </Box>
    </Container>
  )
}