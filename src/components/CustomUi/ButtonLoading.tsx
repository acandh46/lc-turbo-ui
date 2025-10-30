import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";

interface ButtonLoadingProps {
   loading?: boolean;
   variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
   disabled?: boolean;
   type?: "submit" | "button";
   children?: React.ReactNode;
   className?: string;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ButtonLoading({
   loading,
   disabled,
   variant = "default",
   children,
   className,
   onClick,
   ...props
}: ButtonLoadingProps) {
   return (
      <Button
         variant={variant}
         disabled={loading || disabled}
         onClick={onClick}
         className={cn("w-full cursor-pointer", className)}
         {...props}
      >
         <Item>
            {loading && (
               <ItemMedia>
                  <Spinner />
               </ItemMedia>
            )}
            <ItemContent className="line-clamp-1">{children}</ItemContent>
         </Item>
      </Button>
   );
}
