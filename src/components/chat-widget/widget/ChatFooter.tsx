"use client";

import { Paperclip, Send, Smile } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatFooterProps {
   message: string;
   activeTab: string;
   setMessage: (msg: string) => void;
   messagePlaceholder: string;
   themeColor: string;
}

export function ChatFooter({
   message,
   setMessage,
   activeTab,
   messagePlaceholder,
   themeColor,
}: ChatFooterProps) {
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = "auto";
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   }, [message]);

   return (
      <div className="bg-white p-1 dark:bg-black">
         {activeTab === "apperance" && (
            <div className="relative flex items-end dark:text-white">
               <button className="absolute left-3 bottom-2.5 text-gray-400 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
                  <Paperclip size={20} />
               </button>
               <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={messagePlaceholder}
                  className="w-full py-2 pl-10 pr-24 text-sm bg-gray-100 border-transparent rounded-md resize-none max-h-24 focus:outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-gray-900"
                  rows={1}
                  style={{ "--theme-color": themeColor } as React.CSSProperties}
               />
               <div className="absolute right-3 bottom-2.5 flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
                     <Smile size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
                     <Send size={20} />
                  </button>
               </div>
            </div>
         )}
         <div className="flex flex-col items-center p-1">
            <a
               href="#"
               className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
            >
               Powered by TurboInc
            </a>
         </div>
      </div>
   );
}
