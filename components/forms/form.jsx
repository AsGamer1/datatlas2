"use client";

import { Alert, Avatar, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Check, Close } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/es";

export default function Form({ fields, schema, defaultValues, action, AvatarIcon, title, buttonText }) {

  const [errorResponse, setErrorResponse] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const [isPending, startTransition] = useTransition();

  const { register, formState: { errors }, handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  });

  const OnSubmit = (values) => {
    startTransition(() => {
      action(values)
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
                <AvatarIcon />
              </Avatar>
              <Typography variant="h5">{title}</Typography>
            </Stack>
            {fields.map((field) => (
              field.type === "text" || field.type === "number" || field.type === "password" ? (
                <TextField
                  key={field.name}
                  {...register(field.name)}
                  label={field.label}
                  type={field.type}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  disabled={isPending}
                  fullWidth
                  required={field.required}
                />
              ) : field.type === "date" ? (
                <Controller
                  key={field.name}
                  control={control}
                  name={field.name}
                  rules={{ required: field.required }}
                  render={({ field: controllerField }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <DateField
                        fullWidth
                        enableAccessibleFieldDOMStructure
                        label={field.label}
                        inputRef={controllerField.ref}
                        value={controllerField.value}
                        defaultValue={controllerField.value}
                        onChange={(date) => {
                          controllerField.onChange(date);
                        }}
                        slotProps={{ textField: { error: !!errors[field.name], helperText: errors[field.name]?.message } }}
                      />
                    </LocalizationProvider>
                  )}
                />
              ) : null
            ))}
            <Button sx={{ textTransform: "none", fontWeight: "600" }} type="submit" variant="contained" disabled={isPending} fullWidth>{buttonText}</Button>
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