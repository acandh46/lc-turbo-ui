"use client";

import { Search, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ConversationListProps {
   selectedConversation: number | null;
   onSelectConversation: (index: number) => void;
}

export const ConversationList = ({
   selectedConversation,
   onSelectConversation,
}: ConversationListProps) => {
   return (
      <aside
         className={cn(
            "flex h-full w-full flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:w-[350px] md:flex",
            {
               "hidden md:flex": selectedConversation !== null,
            }
         )}
      >
         <header className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center gap-2">
               <h1 className="text-lg font-bold">Conversations</h1>
               <Badge className="bg-sky-600">23</Badge>
            </div>
            <Button variant="ghost" size="icon">
               <UserPlus className="h-5 w-5" />
            </Button>
         </header>
         <div className="p-4">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
               <Input
                  placeholder="Search conversations..."
                  className="w-full rounded-full border-slate-300 bg-slate-100 pl-10 dark:border-slate-700 dark:bg-slate-800"
               />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto">
            {[...Array(10)].map((_, i) => (
               <div
                  key={i}
                  onClick={() => onSelectConversation(i)}
                  className={cn(
                     "flex cursor-pointer items-start gap-4 p-4",
                     selectedConversation === i
                        ? "bg-slate-100/80 dark:bg-slate-800/50"
                        : "hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
                  )}
               >
                  <Avatar>
                     <AvatarImage
                        src={`https://i.pravatar.cc/150?u=a042581f4e29026704d${i}`}
                     />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full overflow-hidden">
                     <div className="flex items-center justify-between">
                        <p className="font-semibold">
                           {i === 0 ? "Jane Doe" : "John Smith"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                           2m ago
                        </p>
                     </div>
                     <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                        {i === 0
                           ? "Awesome! I'll check it out. Thanks for the help!"
                           : "Can you help me with my order?"}
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </aside>
   );
};
