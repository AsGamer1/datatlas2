"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

export function CardWrapper({children,headerHeader,headerLabel,backButtonLabel,backButtonRef}) {
  return(
    <Card className="w-full max-w-[350px] shadow-md">
      <CardHeader>
        <Header header={headerHeader} label={headerLabel}>
        </Header>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonRef} />
      </CardFooter>
    </Card>
  )
}