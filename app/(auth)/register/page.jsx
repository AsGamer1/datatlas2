import { RegisterForm } from "@/components/auth/register-form";
import { Box } from "@mui/material";

export default function RegisterPage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <RegisterForm />
    </Box>
  )
}