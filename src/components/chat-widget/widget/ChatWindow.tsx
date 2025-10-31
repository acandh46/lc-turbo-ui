"use client";
import { AgentConfigType } from "@/types/agent.types";
import { motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatFooter } from "./ChatFooter";
import { useState } from "react";
import { ChatBody } from "./ChatBody";

interface ChatWindowProps {
   activeTab: string;
   agentName: string;
   onClose: () => void;
   agentConfig: AgentConfigType;
}

export const ChatWindow = ({
   agentConfig,
   activeTab,
   agentName,
   onClose,
}: ChatWindowProps) => {
   const [isPreChatSubmitted, setIsPreChatSubmitted] = useState(false);
   const [message, setMessage] = useState("");

   return (
      <div className="absolute inset-0 z-20 flex items-center justify-center">
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`flex flex-col w-85 h-160 bg-gray-200/50 rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 dark:bg-black dark:border-gray-700/50 ${
               agentConfig.theme === "dark" ? "dark" : ""
            }`}
         >
            <ChatHeader
               agentName={agentName}
               avatarImage={agentConfig.avatarImage}
               themeColor={agentConfig.themeColor}
               theme={agentConfig.theme}
               onClose={onClose}
            />

            <ChatBody
               activeTab={activeTab}
               agentConfig={agentConfig}
               agentName={agentName}
               isPreChatSubmitted={isPreChatSubmitted}
               setIsPreChatSubmitted={() => setIsPreChatSubmitted(true)}
            />

            <ChatFooter
               activeTab={activeTab}
               themeColor={agentConfig.themeColor}
               messagePlaceholder={agentConfig.messagePlaceholder}
               message={message}
               setMessage={(msg) => setMessage(msg)}
            />
         </motion.div>
      </div>
   );
};
