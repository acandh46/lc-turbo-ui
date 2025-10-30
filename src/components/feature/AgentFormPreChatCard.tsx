import { useMemo, useState, useEffect, useRef } from "react";
import {
   DndContext,
   closestCenter,
   KeyboardSensor,
   PointerSensor,
   useSensor,
   useSensors,
   DragEndEvent,
} from "@dnd-kit/core";
import {
   arrayMove,
   SortableContext,
   sortableKeyboardCoordinates,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { DraggableFieldItem } from "./DraggableFieldItem";
import { Switch } from "@/components/ui/switch";
import { Button } from "../ui/button";
import {
   ChevronDown,
   CircleCheck,
   PlusCircle,
   RemoveFormatting,
   TextAlignStart,
} from "lucide-react";
import { AgentPreChatFormFieldType } from "@/types/agent.types";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const AgentFormPreChatCard = () => {
   const {
      config,
      updatePreChatFields,
      updateAgentConfig,
      removePreChatField,
   } = useAgentConfigStore();
   const [openFieldIds, setOpenFieldIds] = useState<string[]>([]);
   const hasInitialized = useRef(false);

   // On first load, expand all fields by default
   useEffect(() => {
      if (
         config &&
         !hasInitialized.current &&
         config.agentConfig.preChatFormField.length > 0
      ) {
         setOpenFieldIds(config.agentConfig.preChatFormField.map((f) => f.id));
         hasInitialized.current = true;
      }
   }, [config]);

   const sensors = useSensors(
      useSensor(PointerSensor, {
         activationConstraint: {
            distance: 5,
         },
      }),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      })
   );

   if (!config) return null;

   const { preChatFormField, preChatFormEnabled } = config.agentConfig;

   const handleToggleEdit = (fieldId: string) => {
      setOpenFieldIds(
         (currentIds) =>
            currentIds.includes(fieldId)
               ? currentIds.filter((id) => id !== fieldId) // Collapse the clicked one
               : [...currentIds, fieldId] // Expand the clicked one
      );
   };

   const handleDragStart = () => {
      setOpenFieldIds([]); // Collapse all on drag for a cleaner experience
   };

   const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
         const oldIndex = preChatFormField.findIndex(
            (field) => field.id === active.id
         );
         const newIndex = preChatFormField.findIndex(
            (field) => field.id === over.id
         );

         const reorderedFields = arrayMove(
            preChatFormField,
            oldIndex,
            newIndex
         );

         const updatedFieldsWithOrder = reorderedFields.map((field, index) => ({
            ...field,
            order: index + 1,
         }));

         updatePreChatFields(updatedFieldsWithOrder);
      }
   };

   const elementsMenu = useMemo(
      () => [
         {
            key: "information",
            label: "Infomation",
            icon: <TextAlignStart size={20} />,
            type: "HEADER",
         },
         {
            key: "name",
            label: "Name",
            icon: <RemoveFormatting size={20} />,
            type: "TEXT",
         },
         {
            key: "email",
            label: "Email",
            icon: <RemoveFormatting size={20} />,
            type: "EMAIL",
         },
         {
            key: "question",
            label: "Question",
            icon: <RemoveFormatting size={20} />,
            type: "TEXT",
         },
         {
            key: "choice",
            label: "Choice List",
            icon: <CircleCheck size={20} />,
            type: "RADIO",
         },
         {
            key: "dropdown",
            label: "Dropdown",
            icon: <ChevronDown size={20} />,
            type: "SELECT",
         },
      ],
      []
   );

   const handleAddField = (type: string, label: string) => {
      const newField: AgentPreChatFormFieldType = {
         id: crypto.randomUUID(),
         label: label,
         type: type,
         order: preChatFormField.length + 1,
         required: type !== "HEADER",
         placeholder: type !== "HEADER" ? "Enter your answer" : null,
         defaultValue: null,
         options: ["First answer", "Second answer"],
      };

      const updatedFields = [...preChatFormField, newField];
      updatePreChatFields(updatedFields);
   };

   const handleRemoveField = (fieldId: string) => {
      removePreChatField(fieldId);
   };

   return (
      <div className="space-y-6">
         <div className="flex flex-col  p-4 bg-slate-200/50 rounded-lg border gap-y-3">
            <div className="flex flex-row justify-between">
               <div className="flex-col gap-2">
                  <h2 className="text-md font-semibold text-black">
                     Pre-chat form
                  </h2>
                  <span className="text-xs text-gray-400">
                     Collect visitor's information before the chat starts.
                  </span>
               </div>
               <Switch
                  checked={preChatFormEnabled}
                  onCheckedChange={(isEnabled) =>
                     updateAgentConfig({ preChatFormEnabled: isEnabled })
                  }
               />
            </div>

            {preChatFormEnabled && (
               <>
                  <div className="flex justify-start">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button
                              variant="outline"
                              className="cursor-pointer  hover:bg-blue-500 hover:text-white"
                           >
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Element
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-35">
                           <DropdownMenuGroup>
                              {elementsMenu.map((elmnt) => (
                                 <DropdownMenuItem
                                    key={elmnt.key}
                                    className="cursor-pointer"
                                    onClick={() =>
                                       handleAddField(elmnt.type, elmnt.label)
                                    }
                                 >
                                    <span className="flex items-center">
                                       {elmnt.icon}
                                    </span>
                                    <span className="flex-1 text-left">
                                       {elmnt.label}
                                    </span>
                                 </DropdownMenuItem>
                              ))}
                           </DropdownMenuGroup>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
                  <DndContext
                     sensors={sensors}
                     collisionDetection={closestCenter}
                     onDragStart={handleDragStart}
                     onDragEnd={handleDragEnd}
                  >
                     <SortableContext
                        items={preChatFormField.map((field) => field.id)}
                        strategy={verticalListSortingStrategy}
                     >
                        <div className="space-y-1">
                           {preChatFormField
                              .slice()
                              .sort((a, b) => a.order - b.order)
                              .map((field) => (
                                 <DraggableFieldItem
                                    key={field.id}
                                    field={field}
                                    isEditing={openFieldIds.includes(field.id)}
                                    onToggleEdit={handleToggleEdit}
                                    onRemove={handleRemoveField}
                                 />
                              ))}
                        </div>
                     </SortableContext>
                  </DndContext>
               </>
            )}
         </div>
      </div>
   );
};
