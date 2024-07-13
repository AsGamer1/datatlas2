import { ErrorCard } from "@/components/auth/error-card";
import { Box } from "@mui/material";

export default function AuthErrorPage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ErrorCard />
    </Box>
  )
}