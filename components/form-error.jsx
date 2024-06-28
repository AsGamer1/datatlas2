import  { AlertTriangleIcon } from "lucide-react";

export function FormError({message}) {
  if (!message) {
    return null
  } else {
    return (
      <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <AlertTriangleIcon className="h-5 w-5" />
        <p>{message}</p>
      </div>
    )
  }
}