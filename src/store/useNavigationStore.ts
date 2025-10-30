import { create } from "zustand";

interface NavigationState {
   previousPath: string;
   setPreviousPath: (path: string) => void;
   isSubMenuOpen: boolean;
   setIsSubMenuOpen: (isOpen: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
   previousPath: "/dashboard", // Default path
   isSubMenuOpen: true, // Default to open on desktop
   setPreviousPath: (path) => set({ previousPath: path }),
   setIsSubMenuOpen: (isOpen) => set({ isSubMenuOpen: isOpen }),
}));
