"use client";

import { LoginUserSchema } from "@/schemas";
import { login } from "@/actions/auth/login";
import { PersonRounded } from "@mui/icons-material";
import Form from "@/components/content/form";

export default function LoginForm() {
  return (
    <Form
      schema={LoginUserSchema}
      defaultValues={{ dni: "" }}
      action={login}
      AvatarIcon={PersonRounded}
      title="Portal de atletas"
      buttonText="Iniciar sesión"
      fields={[
        { name: "dni", label: "DNI", type: "text", required: true },
      ]}
    />
  )
}