import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { Card, CarFooter, CardHeader, CardFooter } from "@/components/ui/card";

export function ErrorCard() {
  return (
    <Card className="w-full max-w-[380px] shadow-md">
      <CardHeader>
        <Header label="Algo salió mal :(" />
      </CardHeader>
      <CardFooter>
        <BackButton href="/login" label="Volver a iniciar sesión"/>
      </CardFooter>
    </Card>
  )
}