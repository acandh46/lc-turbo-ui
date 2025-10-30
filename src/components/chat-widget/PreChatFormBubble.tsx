import { AgentPreChatFormFieldType } from "@/types/agent.types";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { RenderHtml } from "./RenderHtml";

interface PreChatFormBubbleProps {
   preChatFormField: AgentPreChatFormFieldType[];
   actionButton: () => void;
   bubbleStyle: React.CSSProperties;
}
export const PreChatFormBubble = ({
   preChatFormField,
   actionButton,
   bubbleStyle,
}: PreChatFormBubbleProps) => {
   const sortedFields = React.useMemo(
      () =>
         Array.isArray(preChatFormField)
            ? [...preChatFormField].sort((a, b) => a.order - b.order)
            : [],
      [preChatFormField]
   );

   const renderField = React.useCallback((field: AgentPreChatFormFieldType) => {
      if (field.type === "HEADER") {
         return (
            <RenderHtml
               key={field.id}
               content={field.label}
               className="text-sm text-gray-800 dark:text-gray-200 prose dark:prose-invert prose-sm prose-p:my-0 w-full wrapbreak-words"
               style={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  maxWidth: "100%",
               }}
            />
         );
      }

      // Only render Input for supported types
      const isInputType = field.type === "EMAIL" || field.type === "TEXT";
      return (
         <div key={field.id} className="space-y-1 w-full">
            <Label
               htmlFor={field.id}
               className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate gap-2"
               style={{ maxWidth: "100%" }}
            >
               <span className="inline-block max-w-full truncate align-bottom">
                  {field.label} :
               </span>
               {field.required && <span className="text-red-500 ">*</span>}
            </Label>
            {isInputType && (
               <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder || ""}
                  required={field.required}
                  className="bg-white h-8 text-sm dark:bg-gray-600 w-full"
                  style={{ maxWidth: "100%" }}
               />
            )}

            {field.type == "RADIO" && (
               <RadioGroup className="mt-3">
                  {field.options.map((item: any, idx: number) => (
                     <div key={idx} className="flex items-center gap-3">
                        <RadioGroupItem
                           value={item}
                           id="r1"
                           className=" border-black border-2"
                        />
                        <Label htmlFor="r1" className="text-xs text-gray-800">
                           {item}
                        </Label>
                     </div>
                  ))}
               </RadioGroup>
            )}

            {field.type === "SELECT" && (
               <select
                  id={field.id}
                  required={field.required}
                  className="bg-white h-8 text-sm dark:bg-gray-600 w-full border rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
                  style={{ maxWidth: "100%" }}
                  defaultValue=""
               >
                  <option value="" disabled>
                     {field.placeholder || "-- Pilih --"}
                  </option>
                  {field.options.map((option: string, idx: number) => (
                     <option key={idx} value={option}>
                        {option}
                     </option>
                  ))}
               </select>
            )}
         </div>
      );
   }, []);

   return (
      <div className="relative flex flex-col w-full max-w-xs p-4 bg-gray-100 rounded-t-xl rounded-br-xl space-y-3 dark:bg-gray-700 box-border overflow-hidden">
         <div className="flex flex-col gap-3 w-full">
            {sortedFields.map(renderField)}
         </div>
         <Button
            onClick={actionButton}
            style={bubbleStyle}
            className="w-full h-9 text-white mt-2"
         >
            Mulai Obrolan
         </Button>
      </div>
   );
};
