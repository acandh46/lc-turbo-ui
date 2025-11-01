"use client";

import { ChatMessageView } from "@/components/chat/ChatMessageView";
import { CustomerChat } from "@/components/chat/CustomerChat";

const ChatPage = () => {
   return (
      <div className="flex flex-row w-full bg-slate-50 rounded-2xl overflow-hidden">
         <CustomerChat />
         <ChatMessageView />
      </div>
   );
};

export default ChatPage;
