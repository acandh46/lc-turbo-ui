"use client";

import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlusCircle, X } from "lucide-react";

interface OptionsEditorProps {
   fieldId: string;
   options: string[];
}

export const OptionsEditor = ({ fieldId, options }: OptionsEditorProps) => {
   const {
      addPreChatFieldOption,
      removePreChatFieldOption,
      updatePreChatFieldOption,
   } = useAgentConfigStore();

   return (
      <div className="space-y-2">
         <p className="text-xs font-medium text-gray-600">Options</p>
         {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
               <Input
                  value={option}
                  onChange={(e) =>
                     updatePreChatFieldOption(fieldId, index, e.target.value)
                  }
                  className="h-8"
               />
               <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={() => removePreChatFieldOption(fieldId, index)}
               >
                  <X size={16} />
               </Button>
            </div>
         ))}
         <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => addPreChatFieldOption(fieldId)}
         >
            <PlusCircle size={16} className="mr-2" />
            Add Option
         </Button>
      </div>
   );
};
