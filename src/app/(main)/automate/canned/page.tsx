"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeaderContent from "@/components/layout/HeaderContent";

// Mock data for canned responses
const mockCannedResponses = [
   { id: 1, name: "Greeting", content: "Hello! How can I help you today?" },
   { id: 2, name: "Farewell", content: "Goodbye! Have a great day." },
   {
      id: 3,
      name: "Support",
      content: "Please provide me with your support ticket number.",
   },
];

const CannedResponsePage = () => {
   const [agentId, setAgentId] = useState<string | null>(null);
   const [cannedResponses, setCannedResponses] = useState<any[]>([]);
   const [showAdd, setShowAdd] = useState(false);
   const searchParams = useSearchParams();

   

   useEffect(() => {
      let agentIdFromStorage = localStorage.getItem("agentId");
      if (!agentIdFromStorage) {
         agentIdFromStorage = searchParams.get("agentId");
      }
      setAgentId(agentIdFromStorage);
   }, [searchParams]);

   useEffect(() => {
      if (agentId) {
         // TODO: Fetch canned responses from the backend using the agentId
         console.log(`Fetching canned responses for agentId: ${agentId}`);
         setCannedResponses(mockCannedResponses);
      }
   }, [agentId]);

   return (
      <div className="relative flex flex-1 flex-col bg-slate-50 rounded-2xl overflow-hidden">
         <HeaderContent title="Chat Page" />
         <div className="flex flex-col overflow-auto p-3"></div>
      </div>
   );
};

export default CannedResponsePage;
