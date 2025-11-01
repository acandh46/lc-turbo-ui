"use client";

import {
   createContext,
   useContext,
   useEffect,
   useState,
   useCallback,
} from "react";
import { useSocket } from "./SocketProvider";
import { useChatStore } from "@/store/useChatStore";

// Define the shape of a message
interface Message {
   id: string;
   text: string;
   sender: "user" | "agent";
}

// Define the shape of the context value
interface ChatContextType {
   messages: Message[];
   chatStatus: "connecting" | "connected" | "disconnected";
   sendMessage: (text: string) => void;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Custom hook to easily access the context
export const useChat = () => {
   const context = useContext(ChatContext);
   if (!context) {
      throw new Error("useChat must be used within a ChatProvider");
   }
   return context;
};

// Helper function to play notification sounds
const playNotificationSound = () => {
   const audio = new Audio("/sounds/notification.mp3");
   audio.play().catch((error) => {
      console.error("Failed to play notification sound:", error);
   });
};

// The provider component that encapsulates all chat logic
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
   const { socket, isConnected } = useSocket();
   const { incrementUnreadCount } = useChatStore();
   const [agentId, setAgentId] = useState<string | null>(null);
   const [messages, setMessages] = useState<Message[]>([]);
   const [chatStatus, setChatStatus] = useState<
      "connecting" | "connected" | "disconnected"
   >("disconnected");

   // Get agentId from localStorage on mount
   useEffect(() => {
      const storedAgentId = localStorage.getItem("agentId");
      if (storedAgentId) {
         setAgentId(storedAgentId);
      }
   }, []);

   // Set up all socket event listeners
   useEffect(() => {
      if (!socket) {
         setChatStatus("disconnected");
         return;
      }

      setChatStatus(isConnected ? "connected" : "connecting");

      const handleNewMessage = (message: Message) => {
         setMessages((prevMessages) => [...prevMessages, message]);
         if (message.sender === "user") {
            incrementUnreadCount();
            playNotificationSound();
         }
      };

      socket.on("newMessage", handleNewMessage);
      socket.on("connect", () => setChatStatus("connected"));
      socket.on("disconnect", () => setChatStatus("disconnected"));

      // Clean up listeners on unmount
      return () => {
         socket.off("newMessage", handleNewMessage);
         socket.off("connect");
         socket.off("disconnect");
      };
   }, [socket, isConnected, incrementUnreadCount]);

   // Function to send a message
   const sendMessage = useCallback(
      (text: string) => {
         if (!socket || !agentId || !text.trim()) {
            console.error(
               "Socket not connected, missing agentId, or empty message."
            );
            return;
         }

         const newMessage: Message = {
            id: `msg_${Date.now()}`, // Temporary client-side ID
            text,
            sender: "agent",
         };

         setMessages((prevMessages) => [...prevMessages, newMessage]);
         socket.emit("agentMessage", { agentId, text });
      },
      [socket, agentId]
   );

   // The value to be provided to consuming components
   const value = {
      messages,
      chatStatus,
      sendMessage,
   };

   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
