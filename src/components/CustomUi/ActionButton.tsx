"use client";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ActionButtonProps = {
   href?: string;
   icon: React.ReactNode;
   disabled?: boolean;
   tooltip: string;
   onClick?: () => void;
   targetBlank?: boolean;
   buttonClass?: string;
   children?: React.ReactNode;
   variant?: "ghost" | undefined;
   className?: string;
   positionTooltip?: "top" | "right" | "bottom";
};

const ActionButton: React.FC<ActionButtonProps> = ({
   href,
   icon,
   tooltip,
   onClick,
   disabled,
   targetBlank,
   children,
   buttonClass = "",
   variant,
   className,
   positionTooltip = "right",
}) => {
   // Styling default + dark mode
   const router = useRouter();
   const baseClass = [
      // Border & bg transparan
      "cursor-pointer bg-transparent hover:text-black",
      // Light mode: border abu, hover bg abu
      "border-gray-200 hover:bg-gray-100",
      // Dark mode: border biru, hover bg biru
      "dark:border-blue-900 dark:hover:bg-blue-900/60",
      // Transition biar smooth
      "transition-all duration-150",
      // Disabled state
      disabled ? "opacity-60 pointer-events-none" : "",
      buttonClass,
   ].join(" ");

   // Tombol utama, tetap dipakai baik link atau bukan
   const button = (
      <Button
         variant={variant}
         size={children ? "sm" : "icon"}
         disabled={disabled}
         className={cn(baseClass, className)}
         onClick={onClick}
         tabIndex={0}
         aria-label={tooltip}
         type="button"
      >
         {icon}
         {children}
      </Button>
   );

   // Jika disabled dan href, jangan render <Link> (biar ga bisa klik/link)
   const content =
      href && !disabled ? (
         <span
            onClick={(e) => {
               if (disabled) {
                  e.preventDefault();
                  return;
               }
               if (targetBlank) {
                  window.open(href, "_blank", "noopener,noreferrer");
               } else {
                  router.push(href);
               }
            }}
            tabIndex={-1}
            aria-disabled={disabled ? "true" : undefined}
            style={
               disabled ? { pointerEvents: "none", opacity: 0.6 } : undefined
            }
         >
            {button}
         </span>
      ) : (
         // Kalau disabled, biar tetap render button disabled
         button
      );

   return (
      <Tooltip delayDuration={10}>
         <TooltipTrigger asChild>{content}</TooltipTrigger>
         <TooltipContent side={positionTooltip} sideOffset={6}>
            {tooltip}
         </TooltipContent>
      </Tooltip>
   );
};

ActionButton.displayName = "ActionButton";

export default React.memo(ActionButton);
