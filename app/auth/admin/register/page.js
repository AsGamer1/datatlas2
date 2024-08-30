"use client";

import { RegisterAdminSchema } from "@/schemas";
import { registerAdmin } from "@/actions/auth/register-admin";
import { ShieldRounded } from "@mui/icons-material";
import Form from "@/components/forms/form";

export default function RegisterAdminForm() {
  return (
    <Form
      schema={RegisterAdminSchema}
      defaultValues={{ nombre: "", dni: "", password: "" }}
      action={registerAdmin}
      AvatarIcon={ShieldRounded}
      title="Portal de entrenadores"
      buttonText="Registrar entrenador"
      fields={[
        { name: "nombre", label: "Nombre", type: "text", required: true },
        { name: "dni", label: "DNI", type: "text", required: true },
        { name: "nacimiento", label: "Fecha de nacimiento", type: "date", required: true },
        { name: "password", label: "Contraseña", type: "password", required: true }
      ]}
    />
  );
}