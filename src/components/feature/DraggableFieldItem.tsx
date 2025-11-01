import { motion, AnimatePresence } from "framer-motion";
import { FieldEditor } from "./FieldEditor";
import { ChevronDown, ChevronRight, GripVertical, Trash2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AgentPreChatFormFieldType } from "@/types/agent.types";
import { RenderHtml } from "./RenderHtml";

interface DraggableFieldItemProps {
   field: AgentPreChatFormFieldType;
   isEditing: boolean;
   onToggleEdit: (fieldId: string) => void;
   onRemove: (fieldId: string) => void;
}

export const DraggableFieldItem = ({
   field,
   isEditing,
   onToggleEdit,
   onRemove,
}: DraggableFieldItemProps) => {
   const { updateSinglePreChatField } = useAgentConfigStore();
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
   } = useSortable({ id: field.id });

   // Local state to hold the label's value when the editor is opened
   const [staticLabel, setStaticLabel] = useState(field.label);

   useEffect(() => {
      if (!isEditing) {
         setStaticLabel(field.label);
      }
   }, [field.label, isEditing]);

   const isHeader = field.type === "HEADER";
   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 10 : "auto",
   };
   const handleFieldChange = (
      key: keyof AgentPreChatFormFieldType,
      value: any
   ) => {
      updateSinglePreChatField(field.id, { [key]: value });
   };
   return (
      <div
         ref={setNodeRef}
         style={style}
         className={`bg-white rounded-md border border-gray-200 shadow-sm transition-shadow `}
      >
         <div
            {...attributes}
            {...listeners}
            onClick={() => onToggleEdit(field.id)}
            className="flex items-center p-2 pr-3 cursor-grab"
         >
            <div className="text-gray-400 px-2">
               <GripVertical size={16} />
            </div>
            <div className="grow flex items-center gap-1 pointer-events-none">
               <button>
                  {isEditing ? (
                     <ChevronDown size={16} />
                  ) : (
                     <ChevronRight size={16} />
                  )}
               </button>
               {field.type === "HEADER" ? (
                  <p className="font-medium text-gray-800">Information</p>
               ) : (
                  <RenderHtml content={staticLabel} className="text-sm" />
               )}
            </div>
            <div className="flex items-center gap-6 ml-auto">
               {!isHeader && (
                  <div
                     className="flex items-center space-x-1"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <Checkbox
                        id={`required-${field.id}`}
                        checked={field.required}
                        disabled={field.type === "select"}
                        className="h-4 w-4"
                        onCheckedChange={(checked) =>
                           handleFieldChange("required", checked)
                        }
                     />
                     <Label
                        htmlFor={`required-${field.id}`}
                        className="text-sm font-medium cursor-pointer"
                     >
                        Required
                     </Label>
                  </div>
               )}
               <button
                  className="text-black hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                     e.stopPropagation(); // Prevent the main click handler
                     onRemove(field.id);
                  }}
               >
                  <Trash2 size={16} />
               </button>
            </div>
         </div>
         <AnimatePresence>
            {isEditing && (
               <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                     open: { opacity: 1, height: "auto" },
                     collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{
                     duration: 0.3,
                     ease: "easeInOut",
                  }}
                  style={{ overflow: "hidden" }}
               >
                  <FieldEditor field={field} />
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};
