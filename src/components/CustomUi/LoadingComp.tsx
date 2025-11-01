import { Loader2 } from "lucide-react";
interface LoadingComponentProps {
   className?: string;
}

export default function LoadingComponent({ className }: LoadingComponentProps) {
   return (
      <div className="flex h-full w-full items-center justify-center">
         <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
   );
}
