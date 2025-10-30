"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Users } from "lucide-react";

export const SwitchAgent = () => {
   const { user } = useAuth();

   // Dummy data for agents
   const agents = [
      { name: "Agent View", id: "agent" },
      { name: "Supervisor View", id: "supervisor" },
      { name: "Admin View", id: "admin" },
   ];
   const currentAgent = agents[0]; // Assume current is Agent View

   if (user?.role === "agent") {
      return null;
   }

   return (
      <TooltipProvider delayDuration={0}>
         <Popover>
            <Tooltip>
               <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                     <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                        <Users className="h-5 w-5" />
                     </button>
                  </PopoverTrigger>
               </TooltipTrigger>
               <TooltipContent
                  side="right"
                  className="border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
               >
                  <p>Switch Agent</p>
               </TooltipContent>
            </Tooltip>
            <PopoverContent
               side="right"
               align="start"
               className="ml-2 w-60 border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
               <div className="space-y-2">
                  <p className="text-sm font-medium">Switch View</p>
                  {agents.map((agent) => (
                     <div
                        key={agent.id}
                        className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                     >
                        <span>{agent.name}</span>
                        {currentAgent.id === agent.id && (
                           <Check className="h-4 w-4 text-sky-500" />
                        )}
                     </div>
                  ))}
               </div>
            </PopoverContent>
         </Popover>
      </TooltipProvider>
   );
};
