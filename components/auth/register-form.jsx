"use client";

// Hooks
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Auth components
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/custom/form-error";
import { FormSuccess } from "@/components/custom/form-success";

// Schemas
import { RegisterSchema } from "@/schemas";

// Server actions
import { register } from "@/actions/register";
import DatePicker from "@/components/custom/date-picker";

export function RegisterForm() {

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState(undefined)

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      nombre: "",
      password: "",
    }
  });

  function OnSubmit(values) {
    setError("")
    setSuccess("")

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
  }

  return (
    <CardWrapper
      headerHeader="Portal de entrenadores"
      headerLabel="Registro temporal para entrenadores del club"
      backButtonLabel="¿Eres atleta?"
      backButtonRef="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-6 text-left">
          <div className="space-y-4">
            <FormField control={form.control} name="nombre" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="fecha" render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <DatePicker {...field} disabled={isPending} setFieldDate={field.onChange} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">Registrar cuenta</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}