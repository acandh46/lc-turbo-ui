"use client";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { DialogOverlay } from "@radix-ui/react-dialog";

interface ModalProps {
   title: string;
   description: string;
   isOpen: boolean;
   onClose: () => void;
   children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
   title,
   description,
   isOpen,
   onClose,
   children,
}) => {
   const onChange = (open: boolean) => {
      if (!open) {
         onClose();
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={onChange}>
         <DialogOverlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 data-[state=open]:opacity-100 data-[state=closed]:opacity-0" />
         <DialogContent className="border-slate-700 bg-slate-800 text-white">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div>{children}</div>
         </DialogContent>
      </Dialog>
   );
};
