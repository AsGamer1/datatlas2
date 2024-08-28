"use client";

import { LoginAdminSchema } from "@/schemas";
import { login } from "@/actions/auth/login-admin";
import { ShieldRounded } from "@mui/icons-material";
import Form from "@/components/content/form";

export default function LoginAdminForm() {
  return (
    <Form
      schema={LoginAdminSchema}
      defaultValues={{ dni: "", password: "" }}
      action={login}
      AvatarIcon={ShieldRounded}
      title="Portal de entrenadores"
      buttonText="Iniciar sesión"
      fields={[
        { name: "dni", label: "DNI", type: "text", required: true },
        { name: "password", label: "Contraseña", type: "password", required: true }
      ]}
    />
  )
}