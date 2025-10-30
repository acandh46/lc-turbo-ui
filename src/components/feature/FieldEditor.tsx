import { useState, useEffect } from "react";
import { AgentPreChatFormFieldType } from "@/types/agent.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { OptionsEditor } from "./OptionsEditor";
import { MarkdownEditor } from "./MarkdownEditor";

interface FieldEditorProps {
   field: AgentPreChatFormFieldType;
}

export const FieldEditor = ({ field }: FieldEditorProps) => {
   const { updateSinglePreChatField } = useAgentConfigStore();

   // Local state for inputs to enable native undo/redo
   const [localLabel, setLocalLabel] = useState(field.label);
   const [localPlaceholder, setLocalPlaceholder] = useState(
      field.placeholder || ""
   );

   // Sync local state if global state changes
   useEffect(() => {
      setLocalLabel(field.label);
   }, [field.label]);

   useEffect(() => {
      setLocalPlaceholder(field.placeholder || "");
   }, [field.placeholder]);

   const isHeader = field.type === "HEADER";
   const hasOptions = field.type === "RADIO" || field.type === "SELECT";

   const handleFieldChange = (
      key: keyof AgentPreChatFormFieldType,
      value: any
   ) => {
      updateSinglePreChatField(field.id, { [key]: value });
   };

   return (
      <div className="bg-white p-4 border-t space-y-4">
         <div className="space-y-4">
            <div className="space-y-1">
               <Label
                  htmlFor={`label-${field.id}`}
                  className="text-xs font-semibold"
               >
                  {isHeader ? "Message" : "Label"}
               </Label>
               {isHeader ? (
                  <MarkdownEditor
                     content={localLabel}
                     variant="long"
                     onChange={(newContent) => {
                        setLocalLabel(newContent);
                        handleFieldChange("label", newContent);
                     }}
                  />
               ) : (
                  <Input
                     id={`label-${field.id}`}
                     value={localLabel}
                     onChange={(e) => {
                        setLocalLabel(e.target.value);
                        handleFieldChange("label", e.target.value);
                     }}
                     className="h-8 border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 "
                  />
               )}
            </div>
            {!isHeader && (
               <div className="space-y-1">
                  <Label
                     htmlFor={`placeholder-${field.id}`}
                     className="text-xs text-gray-400"
                  >
                     Placeholder
                  </Label>
                  <Input
                     id={`placeholder-${field.id}`}
                     value={localPlaceholder}
                     onChange={(e) => {
                        setLocalPlaceholder(e.target.value);
                        handleFieldChange("placeholder", e.target.value);
                     }}
                     className="h-8 border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 "
                  />
               </div>
            )}
         </div>

         {hasOptions && (
            <div className="border-t pt-4">
               <OptionsEditor fieldId={field.id} options={field.options} />
            </div>
         )}
      </div>
   );
};
