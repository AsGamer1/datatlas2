"use client";

import { Alert, Avatar, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserSchema } from "@/schemas";
import { registerUser } from "@/actions/auth/register";
import { useState, useTransition } from "react";
import { Check, Close, PersonRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/es";

export default function RegisterForm() {

  const [errorResponse, setErrorResponse] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const [isPending, startTransition] = useTransition();

  const { register, formState: { errors }, handleSubmit, control } = useForm({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      nombre: "",
      dni: "",
      nacimiento: dayjs()
    }
  });

  const OnSubmit = (values) => {
    startTransition(() => {
      registerUser(values)
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
                <PersonRounded />
              </Avatar>
              <Typography variant="h5">Portal de atletas</Typography>
            </Stack>
            <TextField {...register("nombre")} label="Nombre" error={!!errors.nombre} helperText={errors.nombre?.message} disabled={isPending} fullWidth required />
            <TextField {...register("dni")} label="DNI" error={!!errors.dni} helperText={errors.dni?.message} disabled={isPending} fullWidth required />
            <Controller
              control={control}
              name="nacimiento"
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es" >
                    <DateField
                      label="Fecha de nacimiento"
                      inputRef={field.ref}
                      value={field.value}
                      defaultValue={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      slotProps={{ textField: { error: !!errors?.nacimiento, helperText: errors.nacimiento?.message } }}
                    />
                  </LocalizationProvider>
                )
              }}
            />
            <Button sx={{ textTransform: "none", fontWeight: "600" }} type="submit" variant="contained" disabled={isPending} fullWidth>Registrar atleta</Button>
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