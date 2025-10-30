"use client";
import { useModalStore } from "@/store/useModalStore";
import { Modal } from "../CustomUi/Modal";
import { useEffect, useState } from "react";
import { AgentItem } from "@/types/agent.types";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const SelectAgentModal = () => {
   const { isOpen, onClose, type, data } = useModalStore();
   const [agents, setAgents] = useState<AgentItem[]>([]);
   const isModalOpen = isOpen && type === "selectAgent";
   const handleSelectAgent = (agentId: string, name: string) => {
      toast.info(`Selected Agent: ${name}`, { position: "top-right" });
      localStorage.setItem("agentId", agentId);
      data.onSuccess?.();
      onClose();
   };

   useEffect(() => {
      if (isModalOpen) {
         setAgents(Array.isArray(data.agent) ? data.agent : []);
      }
   }, [isModalOpen, data]);

   return (
      <Modal
         title="Select a Agent"
         description="Please select an agent to view their canned responses."
         isOpen={isModalOpen}
         onClose={() => onClose()}
      >
         <div className="flex flex-col space-y-2">
            {agents.length === 0 ? (
               <div className="rounded-md bg-red-100 text-red-700 px-4 py-3 text-center font-semibold border border-red-300">
                  No agents found. Please add an agent first.
               </div>
            ) : (
               <div className="flex flex-col space-y-2">
                  {agents.map((agent) => (
                     <Button
                        key={agent.id}
                        variant="outline"
                        className="text-black cursor-pointer hover:bg-blue-200"
                        onClick={() =>
                           handleSelectAgent(agent.id, agent.agentName)
                        }
                     >
                        {agent.agentName.toUpperCase()}
                     </Button>
                  ))}
               </div>
            )}
         </div>
      </Modal>
   );
};
