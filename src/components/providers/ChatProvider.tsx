"use client";

import { createContext, useContext, useEffect } from "react";
import { useSocket } from "./SocketProvider";

type ChatContextType = object;

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
   const context = useContext(ChatContext);
   if (!context) {
      throw new Error("useChat must be used within a ChatProvider");
   }
   return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
   const { socket } = useSocket();

   useEffect(() => {
      if (!socket) {
         return;
      }

      // Example of listening for a new message
      socket.on("newMessage", (message) => {
         console.log("New message received:", message);
         // Here you would update your chat state
         // e.g., add the message to the correct conversation
      });

      return () => {
         socket.off("newMessage");
      };
   }, [socket]);

   const value = {
      // Pass down chat state and actions
   };

   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
