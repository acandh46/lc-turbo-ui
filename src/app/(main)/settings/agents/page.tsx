"use client";
import { AgentItemCard } from "@/components/feature/settings/agents/AgentCardItem";
import HeaderContent from "@/components/layout/HeaderContent";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { agentApi } from "@/lib/api";
import { useModalStore } from "@/store/useModalStore";
import { AgentItem } from "@/types/agent.types";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function AgentsPage() {
   const { onOpen } = useModalStore();
   const [isLoading, setIsLoading] = useState(false);
   const [agents, setAgents] = useState<AgentItem[]>([]);

   const fetchAgents = useCallback(async () => {
      setIsLoading(true);
      try {
         const response = await agentApi.getAgents();
         setAgents(response.data);
         toast.success(response.msg, { position: "top-right" });
      } catch (error) {
         toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right",
         });
      } finally {
         setIsLoading(false);
      }
   }, []);

   useEffect(() => {
      fetchAgents();
   }, [fetchAgents]);

   const EmptyState = memo(() => (
      <div className="col-span-full text-center text-gray-400 dark:text-gray-500 py-16 text-lg font-medium rounded-xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 transition-colors duration-300">
         No agent found.
      </div>
   ));

   const SkeletonState = memo(() => (
      <>
         {Array.from({ length: 3 }).map((_, idx) => (
            <div
               key={idx}
               className="bg-white dark:bg-slate-950 rounded-xl shadow-lg/10 dark:shadow-none p-4 flex items-center gap-3 border border-gray-100 dark:border-slate-800 min-h-[90px] animate-pulse transition-colors duration-300"
            >
               <Skeleton className="h-12 w-12 rounded-full" />
               <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
               </div>
            </div>
         ))}
      </>
   ));

   const agentsList = useMemo(() => {
      if (isLoading) return <SkeletonState />;
      return agents.map((agent) => (
         <AgentItemCard key={agent.id} agent={agent} />
      ));
   }, [isLoading, agents]);

   return (
      <div className="flex flex-1 flex-col bg-slate-50 rounded-2xl overflow-hidden">
         <HeaderContent
            title="Agent Website"
            subAction={
               <Button
                  className="cursor-pointer"
                  onClick={() => onOpen("addAgent", { onSuccess: fetchAgents })}
               >
                  Add Agent
               </Button>
            }
         />
         <div className="flex flex-col gap-2 p-3">
            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-2">
               {agentsList}
            </div>
         </div>
      </div>
   );
}
