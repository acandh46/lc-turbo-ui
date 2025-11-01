import { create } from "zustand";

interface ChatState {
   unreadCount: number;
   incrementUnreadCount: () => void;
   resetUnreadCount: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
   unreadCount: 0,
   incrementUnreadCount: () =>
      set((state) => ({ unreadCount: state.unreadCount + 1 })),
   resetUnreadCount: () => set({ unreadCount: 0 }),
}));
