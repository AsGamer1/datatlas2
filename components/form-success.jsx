import  { CheckCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function FormSuccess({message}) {
  if (!message) {
    return null
  } else {
    return (
      <Alert variant="success">
        <CheckCircleIcon className="h-4 w-4"/>
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    )
  }
}