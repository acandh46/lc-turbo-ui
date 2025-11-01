"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeaderContent from "@/components/layout/HeaderContent";
import { Button } from "@/components/ui/button";
import { Database, PlusCircle, Search, X } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useModalStore } from "@/store/useModalStore";
import { AgentCannedResponse, AgentItem } from "@/types/agent.types";
import { toast } from "sonner";
import { agentApi } from "@/lib/api";
import SelectBox from "@/components/ui/SelectBox";
import { Input } from "@/components/ui/input";
import LoadingComponent from "@/components/CustomUi/LoadingComp";
import { CannedResponseItem } from "@/components/canned-response/CannedResponseItem";

const CannedResponsePage = () => {
   const [agentId, setAgentId] = useState<string | null>(null);
   const [cannedResponses, setCannedResponses] = useState<
      AgentCannedResponse[]
   >([]);
   const [agents, setAgents] = useState<AgentItem[]>([]);

   const [isLoading, setIsLoading] = useState(false);
   const [loadAgent, setLoadAgent] = useState(true);
   const [showAdd, setShowAdd] = useState(false);
   const searchParams = useSearchParams();
   const [searchQuery, setSearchQuery] = useState("");
   const { onOpen, isOpen } = useModalStore();
   const { user } = useAuth();

   const fetchCanned = useCallback(async () => {
      setIsLoading(true);
      let agentIdFromStorage = localStorage.getItem("agentId");
      try {
         const response = await agentApi.getCanned(agentIdFromStorage!);
         setCannedResponses(response);
      } catch (error) {
         toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right",
         });
      } finally {
         setIsLoading(false);
      }
   }, []);

   const fetchAgents = useCallback(async () => {
      setLoadAgent(true);
      try {
         const response = await agentApi.getAgents();
         setAgents(response.data);
      } catch (error) {
         toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right",
         });
      } finally {
         setLoadAgent(false);
      }
   }, []);

   useEffect(() => {
      if (user?.role !== "AGENT" && user?.role !== "AUDIT") {
         fetchAgents();
      }
   }, [user?.role, fetchAgents]);

   useEffect(() => {
      let agentIdFromStorage = localStorage.getItem("agentId");
      if (!agentIdFromStorage) {
         agentIdFromStorage = searchParams.get("agentId");
      }
      setAgentId(agentIdFromStorage);

      if (
         !agentIdFromStorage &&
         user &&
         user.role !== "AGENT" &&
         user.role !== "AUDIT"
      ) {
         onOpen("selectAgent", {
            agent: agents,
            onSuccess: () => {
               let agentIdFromStorage = localStorage.getItem("agentId");
               setAgentId(agentIdFromStorage);
            },
         });
      }
      // Added fetchCanned to dependency array as it is used in this effect
   }, [searchParams, user, onOpen, fetchCanned, agents, fetchAgents]);

   useEffect(() => {
      if (agentId) {
         fetchCanned();
      }
   }, [agentId]);

   const filteredResponses = cannedResponses.filter(
      (response) =>
         response.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (response.shortcut &&
            response.shortcut.toLowerCase().includes(searchQuery.toLowerCase()))
   );

   return (
      <div className="relative flex flex-1 flex-col bg-slate-50 rounded-2xl overflow-hidden">
         <HeaderContent title="Response List" />
         <div className="flex flex-row items-center mb-2 px-5 py-2 justify-between">
            <div className="flex flex-row items-center gap-x-2">
               <Button
                  className="cursor-pointer"
                  disabled={isOpen}
                  onClick={() =>
                     onOpen("cannedResponse", {
                        onSuccess: fetchCanned,
                        agentId: agentId,
                     })
                  }
               >
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Add Response
               </Button>
               {user && user.role !== "AGENT" && user.role !== "AUDIT" && (
                  <SelectBox
                     options={agents.map((agent) => ({
                        value: String(agent.id),
                        label: agent.agentName.toUpperCase(),
                     }))}
                     disabled={isLoading}
                     value={agentId?.toString()}
                     onChange={(value: any) => {
                        localStorage.setItem("agentId", value);
                        setAgentId(value);
                     }}
                     placeholder="Select Agent"
                     className=" focus:ring-transparent border-2 w-40 cursor-pointer border-black dark:bg-slate-900 dark:border-slate-700 dark:text-white "
                  />
               )}
               <div className="bg-gray-300 p-2 items-center rounded-md font-semibold">
                  {`${cannedResponses.length} canned responses`}
               </div>
            </div>
            <div className="relative flex items-center">
               <span className="absolute left-3 text-gray-400 pointer-events-none">
                  {/* Lucide-React Search Icon */}
                  <Search className="w-4 h-4" />
               </span>
               <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search responses..."
                  className="pl-9 pr-8 py-1.5 rounded-lg border border-gray-400 cursor-pointer focus:outline-none focus:ring-1 focus-visible:ring-blue-300 focus:ring-blue-300 bg-white text-black dark:bg-slate-900 dark:text-white dark:border-slate-700"
                  style={{ minWidth: 180 }}
               />
               {searchQuery && (
                  <Button
                     type="button"
                     variant="ghost"
                     size="icon"
                     className="absolute right-2 text-gray-400 hover:text-gray-600 h-auto w-auto p-0"
                     tabIndex={-1}
                     onClick={() => setSearchQuery("")}
                  >
                     <X className="w-4 h-4" />
                  </Button>
               )}
            </div>
         </div>
         <div className="flex flex-col flex-1 overflow-auto px-5 gap-2">
            {isLoading ? (
               <LoadingComponent />
            ) : filteredResponses.length === 0 && searchQuery !== "" ? (
               <div className="flex flex-1 items-center justify-center p-4  text-gray-500 dark:text-gray-400 gap-2">
                  <Database className="h-4 w-4" />
                  No canned responses found matching your search.
               </div>
            ) : (
               filteredResponses.map((item) => (
                  <CannedResponseItem
                     key={item.id}
                     canned={item}
                     refetch={fetchCanned}
                     agentId={agentId!}
                  />
               ))
            )}
         </div>
      </div>
   );
};

export default CannedResponsePage;
