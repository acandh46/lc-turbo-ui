"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const CustomToaster = ({ ...props }: ToasterProps) => {
   return (
      <Sonner
         className="toaster group"
         toastOptions={{
            classNames: {
               toast: "group toast group-[.toaster]:bg-slate-800 group-[.toaster]:text-slate-50 group-[.toaster]:border-slate-700 group-[.toaster]:shadow-lg",
               description: "group-[.toast]:text-slate-400",
               actionButton:
                  "group-[.toast]:bg-sky-600 group-[.toast]:text-slate-50",
               cancelButton:
                  "group-[.toast]:bg-slate-700 group-[.toast]:text-slate-400",
               error: "group-[.toast]:bg-red-500/10 group-[.toast]:text-red-400 group-[.toast]:border-red-500/20",
               success:
                  "group-[.toast]:bg-green-500/10 group-[.toast]:text-green-400 group-[.toast]:border-green-500/20",
            },
         }}
         {...props}
      />
   );
};

export { CustomToaster };
