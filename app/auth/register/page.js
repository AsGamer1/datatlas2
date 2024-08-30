"use client";

import { RegisterUserSchema } from "@/schemas";
import { registerUser } from "@/actions/auth/register";
import { PersonRounded } from "@mui/icons-material";
import Form from "@/components/forms/form";

export default function RegisterForm() {

  return (
    <Form
      schema={RegisterUserSchema}
      defaultValues={{ nombre: "", dni: "" }}
      action={registerUser}
      AvatarIcon={PersonRounded}
      title="Portal de atletas"
      buttonText="Registrar atleta"
      fields={[
        { name: "nombre", label: "Nombre", type: "text", required: true },
        { name: "dni", label: "DNI", type: "text", required: true },
        { name: "nacimiento", label: "Fecha de nacimiento", type: "date", required: true }
      ]}
    />
  )
}