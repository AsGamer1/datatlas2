import  { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export function FormError({message}) {
  if (!message) {
    return null
  } else {
    return (
      <Alert variant="destructive">
        <AlertTriangleIcon className="h-4 w-4"/>
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    )
  }
}