"use client";

import { Alert, Avatar, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginAdminSchema } from "@/schemas";
import { login } from "@/actions/login-admin";
import { useState, useTransition } from "react";
import { Check, Close, ShieldRounded } from "@mui/icons-material";

export default function LoginAdminForm() {

  const [errorResponse, setErrorResponse] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const [isPending, startTransition] = useTransition();

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(LoginAdminSchema),
    defaultValues: {
      dni: "",
      password: ""
    }
  });

  const OnSubmit = (values) => {
    startTransition(() => {
      login(values)
        .then((res) => {
          setErrorResponse(res?.error);
          setSuccessResponse(res?.success);
        })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)} noValidate style={{ flex: "1 1 0%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ padding: 3, minWidth: { sm: "320px" } }} elevation={5}>
          <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}>
            <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 1 }}>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <ShieldRounded />
              </Avatar>
              <Typography variant="h5">Portal de entrenadores</Typography>
            </Stack>
            <TextField {...register("dni")} label="DNI" error={!!errors.dni} helperText={errors.dni?.message} disabled={isPending} fullWidth required />
            <TextField {...register("password")} label="Contraseña" error={!!errors.password} helperText={errors.password?.message} disabled={isPending} fullWidth required type="password" />
            <Button sx={{textTransform: "none", fontWeight: "600"}} type="submit" variant="contained" disabled={isPending} fullWidth>Iniciar sesión</Button>
          </Stack>
        </Paper>
      </form>
      <Snackbar open={!!successResponse} autoHideDuration={4000} onClose={() => setSuccessResponse("")}>
        <Alert icon={<Check />} severity="success" variant="filled">{successResponse}</Alert>
      </Snackbar>
      <Snackbar open={!!errorResponse} autoHideDuration={4000} onClose={() => setErrorResponse("")}>
        <Alert icon={<Close />} severity="error" variant="filled">{errorResponse}</Alert>
      </Snackbar>
    </>
  );
}