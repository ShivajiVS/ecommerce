import { AlertCircle } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/25 text-secondary-foreground text-xs font-medium my-2  p-3 rounded-md flex items-center gap-2">
      <AlertCircle className="w-4 h-4 " />
      <p>{message}</p>
    </div>
  );
};
