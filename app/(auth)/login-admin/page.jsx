import { LoginForm } from "@/components/auth/login-admin";
import { Box } from "@mui/material";

export default function LoginPage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <LoginForm />
    </Box>
  )
}