"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = {
   socket: Socket | null;
   isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
   socket: null,
   isConnected: false,
});

export const useSocket = () => {
   return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
   const [socket] = useState<Socket | null>(null);
   const [isConnected] = useState(false);
   const { access_token } = useAuthStore();

   useEffect(() => {
      if (!access_token) {
         return;
      }

      // const socketInstance = ClientIO(
      //    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
      //    {
      //       path: "/socket.io",
      //       auth: {
      //          token: access_token,
      //       },
      //    }
      // );

      // socketInstance.on("connect", () => {
      //    console.log("Socket connected");
      //    setIsConnected(true);
      // });

      // socketInstance.on("disconnect", () => {
      //    console.log("Socket disconnected");
      //    setIsConnected(false);
      // });

      // setSocket(socketInstance);

      // return () => {
      //    socketInstance.disconnect();
      // };
   }, [access_token]);

   return (
      <SocketContext.Provider value={{ socket, isConnected }}>
         {children}
      </SocketContext.Provider>
   );
};
