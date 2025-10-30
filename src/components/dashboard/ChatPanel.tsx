"use client";

import {
   ArrowLeft,
   MoreVertical,
   Paperclip,
   Send,
   Smile,
   UserCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
   selectedConversation: number | null;
   onBack: () => void;
}

export const ChatPanel = ({ selectedConversation, onBack }: ChatPanelProps) => {
   return (
      <main
         className={cn("flex h-full flex-1 flex-col", {
            "hidden md:flex": selectedConversation === null,
         })}
      >
         <header className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center gap-4">
               <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={onBack}
               >
                  <ArrowLeft className="h-5 w-5" />
               </Button>
               <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d0" />
                  <AvatarFallback>JD</AvatarFallback>
               </Avatar>
               <div>
                  <h2 className="font-bold">Jane Doe</h2>
                  <div className="flex items-center gap-2">
                     <span className="h-2 w-2 rounded-full bg-green-500"></span>
                     <p className="text-xs text-slate-500 dark:text-slate-400">
                        Online
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <Button
                  variant="outline"
                  className="border-slate-300 dark:border-slate-700"
               >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Assign
               </Button>
               <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
               </Button>
            </div>
         </header>
         <div className="flex-1 overflow-y-auto p-6">
            {/* Messages */}
            <div className="space-y-6">
               <div className="flex items-end gap-3">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="https://ui-avatars.com/api/?name=Agent&background=random" />
                     <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="max-w-md rounded-b-xl rounded-tr-xl bg-slate-100 p-3 dark:bg-slate-800">
                     <p className="text-sm">Hi Jane, how can I help you today?</p>
                  </div>
               </div>
               <div className="flex flex-row-reverse items-end gap-3">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d0" />
                     <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="max-w-md rounded-b-xl rounded-tl-xl bg-sky-600 p-3 text-white">
                     <p className="text-sm">
                        I&apos;m having trouble with my recent order. I haven&apos;t
                        received a confirmation email.
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <footer className="border-t border-slate-200 p-4 dark:border-slate-800">
            <div className="relative">
               <Textarea
                  placeholder="Type your message here..."
                  className="w-full resize-none border-slate-300 bg-white pr-28 dark:border-slate-700 dark:bg-slate-800"
               />
               <div className="absolute right-3 top-3 flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                     <Smile className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  </Button>
                  <Button variant="ghost" size="icon">
                     <Paperclip className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  </Button>
                  <Button className="bg-sky-600 hover:bg-sky-700">
                     <Send className="h-4 w-4" />
                  </Button>
               </div>
            </div>
         </footer>
      </main>
   );
};
