"use client";

import { useState } from "react";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { ContactDetails } from "@/components/dashboard/ContactDetails";
import { ConversationList } from "@/components/dashboard/ConversationList";

const ConversationsPage = () => {
   const [selectedConversation, setSelectedConversation] = useState<number | null>(
      0
   );

   return (
      <div className="flex h-screen text-slate-800 dark:text-slate-50">
         <ConversationList
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
         />
         <ChatPanel
            selectedConversation={selectedConversation}
            onBack={() => setSelectedConversation(null)}
         />
         <ContactDetails />
      </div>
   );
};

export default ConversationsPage;
