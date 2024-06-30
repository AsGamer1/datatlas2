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
import { LoginSchema } from "@/schemas";

// Server actions
import { login } from "@/actions/login";
import DatePicker from "../custom/date-picker";

export function LoginForm() {

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nombre: "",
    }
  });

  function OnSubmit(values) {
    setError("")
    setSuccess("")

    startTransition(()=>{
      login(values)
        .then((data)=>{
          setError(data?.error)
          setSuccess(data?.success)
        })
    })
  }

  return (
    <CardWrapper
      headerHeader="Portal de atletas"
      headerLabel="Si eres atleta del club, ¡ya tienes cuenta!"
      backButtonLabel="¿Aún no eres atleta?"
      backButtonRef="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-6 text-left">
          <div className="space-y-4">
            <FormField control={form.control} name="nombre" render={({field})=>(
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="text"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="fecha" render={({field})=>(
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <DatePicker {...field} disabled={isPending} selectedDate={field.value} setSelectedDate={field.onChange}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button disabled={isPending} type="submit" className="w-full">Iniciar sesión</Button>
        </form>        
      </Form>
    </CardWrapper>
  )
}