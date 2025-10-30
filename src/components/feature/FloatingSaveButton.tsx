"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface FloatingSaveButtonProps {
   onSave: () => void;
   isSaving: boolean;
}

export const FloatingSaveButton = ({
   onSave,
   isSaving,
}: FloatingSaveButtonProps) => {
   return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
         <div className="relative">
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-full animate-pulse-slow" />
            <Button
               onClick={onSave}
               disabled={isSaving}
               size="lg"
               className="relative rounded-full shadow-2xl"
            >
               <Save className="mr-2 h-4 w-4" />
               {isSaving ? "Saving..." : "Save Changes"}
            </Button>
         </div>
      </div>
   );
};
