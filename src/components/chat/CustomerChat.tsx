"use client";

import { useChatStore } from "@/store/useChatStore";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { CustomerItem } from "./CustomerItem";
interface CustomerChatProps {
   // customer:
}

export const CustomerChat = () => {
   const { unreadCount } = useChatStore();
   const [sorted, setSorted] = useState<"newest" | "oldest">("newest");
   const [selectedChat, setSelectedChat] = useState("customer:4");
   const [showChat, setShowChat] = useState(true);
   const handleShowChat = () => {
      setShowChat(!showChat);
   };
   const handleSort = () => {
      setSorted((prev) => (prev === "newest" ? "oldest" : "newest"));
   };
   //    const sortedChats = chats.sort((a, b) => {
   //       if (sorted === "newest") {
   //          return (
   //             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
   //          );
   //       }
   //       return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
   //    });
   return (
      <div className="flex overflow-hidden flex-col h-screen min-w-[320px] border-r-2 border-slate-200">
         <div className="border-b-2 border-slate-200 p-3">
            <h2 className="text-md font-semibold text-black">Chats</h2>
         </div>
         <div className="flex flex-row justify-between px-2 py-1 ">
            <button
               type="button"
               className="flex flex-row items-center gap-1 p-1 px-2 h-8 cursor-pointer hover:rounded-md hover:bg-slate-200 transition-all"
               onClick={handleShowChat}
            >
               {showChat ? (
                  <ChevronDown className="h-4 w-4" />
               ) : (
                  <ChevronRight className="h-4 w-4" />
               )}
               <span className="text-xs font-medium text-black select-none">
                  My chats ({unreadCount})
               </span>
            </button>
            {showChat && (
               <button
                  type="button"
                  className="flex flex-row items-center gap-1 p-1 px-2 h-8 cursor-pointer hover:rounded-md hover:bg-slate-200"
                  onClick={handleSort}
               >
                  <span className="text-xs font-medium text-black select-none">
                     {sorted.charAt(0).toUpperCase() + sorted.slice(1)}
                  </span>
                  <ChevronDown className="h-4 w-4" />
               </button>
            )}
         </div>

         <ScrollArea className="w-full px-3 py-1 min-w-[320px] ">
            <div className={`flex flex-col gap-1 ${!showChat && "invisible"}`}>
               {Array.from({ length: 60 }).map((_, idx) => (
                  <CustomerItem
                     key={idx}
                     id={`customer:${idx}`}
                     name="Jane Doe"
                     lastMessage="I'm having trouble with my recent order. I haven't received a confirmation email"
                     unread={Math.max(0, 20)}
                     isSelected={selectedChat === `customer:${idx}`}
                     onClick={() => {
                        setSelectedChat(`customer:${idx}`);
                     }}
                  />
               ))}
            </div>
         </ScrollArea>
      </div>
   );
};
