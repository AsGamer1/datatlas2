import  { CheckCircleIcon } from "lucide-react";

export function FormSuccess({message}) {
  if (!message) {
    return null
  } else {
    return (
      <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
        <CheckCircleIcon className="h-5 w-5" />
        <p>{message}</p>
      </div>
    )
  }
}