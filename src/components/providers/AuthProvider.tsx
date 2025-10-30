"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types/user.type";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
   user: User | null;
   isAuthenticated: boolean;
   isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
   user: null,
   isAuthenticated: false,
   isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const { user, isAuthenticated } = useAuthStore();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      // The middleware handles redirection, but we still need to wait for
      // the store to be hydrated on the client before rendering children.
      setIsLoading(false);
   }, []);

   return (
      <AuthContext.Provider value={{ user, isAuthenticated, isLoading }}>
         {!isLoading && children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
