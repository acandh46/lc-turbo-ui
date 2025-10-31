import { AgentPreChatFormFieldType } from "@/types/agent.types";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { RenderHtml } from "../feature/RenderHtml";

interface PreChatFormBubbleProps {
   preChatFormField: AgentPreChatFormFieldType[];
   actionButton: () => void;
   bubbleStyle: React.CSSProperties;
   themeColor: string;
}
export const PreChatFormBubble = ({
   preChatFormField,
   actionButton,
   bubbleStyle,
   themeColor,
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
               className="text-sm font-normal text-gray-600 dark:text-gray-400 truncate gap-2"
               style={{ maxWidth: "100%" }}
            >
               <span className="inline-block max-w-full truncate align-bottom">
                  <RenderHtml content={field.label} />
               </span>
               {field.required && <span className="text-red-500 ">*</span>}
            </Label>
            {isInputType && (
               <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder || ""}
                  required={field.required}
                  // className="bg-white h-8 text-sm dark:bg-gray-600 w-full focus:outline-none focus:border-0 focus:ring-1 shadow-xs "
                  className="bg-white h-10 border border-input  px-3  focus:border-blue-300 ring-blue-300 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  style={
                     {
                        maxWidth: "100%",
                        "--tw-ring-color": themeColor,
                     } as React.CSSProperties
                  }
               />
            )}

            {field.type == "RADIO" && (
               <RadioGroup className="mt-3">
                  {field.options.map((item: any, idx: number) => (
                     <div key={idx} className="flex items-center gap-2">
                        <RadioGroupItem
                           value={item}
                           id={`radio-${field.id}-${idx}`}
                           className="border-gray-300 border-2 data-[state=checked]:border-[--theme-color]"
                           style={
                              {
                                 "--theme-color": bubbleStyle.backgroundColor,
                              } as React.CSSProperties
                           }
                        />
                        <Label
                           htmlFor={`radio-${field.id}-${idx}`}
                           className="text-sm text-gray-800"
                        >
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
                  className="bg-white h-10 text-sm dark:bg-gray-600 w-full border border-gray-300 rounded px-2 focus:outline-none focus:ring-2 focus:ring-[--theme-color] focus:border-[--theme-color] mt-2"
                  style={
                     {
                        maxWidth: "100%",
                        "--theme-color": bubbleStyle.backgroundColor,
                     } as React.CSSProperties
                  }
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
      <div className="relative flex flex-col w-full max-w-xs p-4 bg-white rounded-t-xl rounded-br-xl space-y-3 dark:bg-gray-700 box-border overflow-hidden">
         <div className="flex flex-col gap-3 w-full">
            {sortedFields.map(renderField)}
         </div>
         <Button
            onClick={actionButton}
            style={bubbleStyle}
            className="w-full h-9 text-white mt-2 cursor-pointer"
         >
            Mulai Obrolan
         </Button>
      </div>
   );
};
