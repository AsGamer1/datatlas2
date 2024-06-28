"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function LoginForm() {

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nombre: "",
      fecha: "",
    }
  });

  function OnSubmit(values) {
    console.log(values)
  }

  return (
    <CardWrapper
      headerHeader="Portal de atletas"
      headerLabel="Si eres atleta del club, ¡ya tienes cuenta!"
      backButtonLabel="¿Aún no eres atleta?"
      backButtonRef="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="nombre" render={({field})=>(
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input {...field} type="text"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="fecha" render={({field})=>(
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <Input {...field} type="date"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
          </div>
          <FormError message=""/>
          <FormSuccess message=""/>
          <Button type="submit" className="w-full">Iniciar sesión</Button>
        </form>        
      </Form>
    </CardWrapper>
  )
}