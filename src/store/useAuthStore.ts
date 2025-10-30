import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user.type";
import api from "@/lib/api";
import Cookies from "js-cookie";

type AuthState = {
   access_token: string | null;
   refreshToken: string | null;
   user: User | null;
   isAuthenticated: boolean;
};

type AuthActions = {
   setTokens: (tokens: { access_token: string; refreshToken: string }) => void;
   setUser: (user: User) => void;
   logout: () => Promise<void>;
   login: (data: {
      access_token: string;
      refreshToken: string;
      user: User;
   }) => void;
   refreshAccessToken: () => Promise<string | null>;
};

const initialState: AuthState = {
   access_token: null,
   refreshToken: null,
   user: null,
   isAuthenticated: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
   persist(
      (set, get) => ({
         ...initialState,
         setTokens: ({ access_token, refreshToken }) => {
            set({
               access_token,
               refreshToken,
               isAuthenticated: !!access_token,
            });
            if (access_token) {
               Cookies.set("access_token", access_token);
            } else {
               Cookies.remove("access_token");
            }
         },
         setUser: (user) => set({ user }),
         logout: async () => {
            const { refreshToken } = get();
            try {
               if (refreshToken) {
                  await api.post("/auth/logout", { refreshToken });
               }
            } catch (error) {
               console.error("Logout failed", error);
            } finally {
               Cookies.remove("access_token");
               set(initialState);
            }
         },
         login: (data) => {
            set({
               access_token: data.access_token,
               refreshToken: data.refreshToken,
               user: data.user,
               isAuthenticated: true,
            });
            Cookies.set("access_token", data.access_token);
         },
         refreshAccessToken: async () => {
            const { refreshToken } = get();
            if (!refreshToken) return null;

            try {
               const { data } = await api.post("/api/refresh", {
                  refreshToken,
               });
               if (data.accessToken) {
                  set({ access_token: data.accessToken });
                  Cookies.set("access_token", data.accessToken);
                  return data.accessToken;
               }
               return null;
            } catch (error) {
               console.error("Failed to refresh token", error);
               Cookies.remove("access_token");
               set(initialState); // Logout on refresh failure
               return null;
            }
         },
      }),
      {
         name: "auth-storage",
         storage: createJSONStorage(() => localStorage),
      }
   )
);
